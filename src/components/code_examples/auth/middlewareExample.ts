// import { NextRequest, NextResponse } from 'next/server'
// ダミーのNextResponseとNextRequest (型エラー回避のため)
const NextResponse = {
  next: () => ({ headers: new Map(), redirect: (url: URL) => ({ status: 307, headers: { Location: url.toString() } }) }),
  redirect: (url: URL, options?: { status: number }) => ({ status: options?.status || 307, headers: { Location: url.toString() } }),
};
type NextRequest = {
  nextUrl: URL;
  headers: { get: (name: string) => string | string[] | null };
  cookies: { get: (name: string) => ({ value: string } | undefined) };
  url: string;
  auth?: any; // NextAuthによって注入されるセッション情報
};

// import { auth } from 'features/auth/lib/authOption' // ダミー化のためコメントアウト
// ダミーのauth関数 (型エラー回避のため)
const auth = (middlewareFunc: any) => middlewareFunc;


export const config = {
	matcher: [
		'/((?!_next/static|_next/image|api/auth|favicon.ico|login.jpg|fonts|meta|robots.txt|sitemap.xml|_next|api/youtube|api/generate-ics).*)',
	],
}

// 認証が必要なルート（プロフィール設定完了が必要）
const PROFILE_REQUIRED_ROUTES = [
	'/user',
	'/admin',
	'/booking/new',
	'/booking/[^/]+/edit',
	'/schedule/new',
	'/schedule/[^/]+/edit',
]

// セッションが必要だがプロフィール未設定でもアクセス可能なルート
const SESSION_REQUIRED_ROUTES = ['/auth/signin/setting']

// 完全に公開されているルート
const PUBLIC_ROUTES = [
	'/',
	'/home',
	'/auth/padlock',
	'/auth/signin',
	'/auth/session-expired',
	'/auth/error',
	'/blogs',
	'/schedule',
	'/schedule/[^/]+(?!/edit)',
	'/video',
	'/booking',
	'/booking/[^/]+(?!/edit)',
	'/maintenance',
	'/not-found',
]

// 認証フローのルート（ログイン済みの場合は適切な場所にリダイレクト）
const AUTH_FLOW_ROUTES = ['/auth/padlock', '/auth/signin']

class MiddlewareApp {
	private request: NextRequest
	private isMaintenanceMode: boolean = process.env.MAINTENANCE_MODE === 'true'
	private session: any // 型はNextAuthのSession型を想定

	constructor(request: NextRequest) {
		this.request = request
		this.session = (request as any).auth // NextAuthによってリクエストに注入されるセッション情報
	}

	private matchesRoute(path: string, routePatterns: string[]): boolean {
		return routePatterns.some((pattern) => {
			const regex = new RegExp(`^${pattern}$`)
			return regex.test(path)
		})
	}

	private redirect(path: string, status = 302) {
		return NextResponse.redirect(new URL(path, this.request.url), { status })
	}

	private getIpAddress() {
		const xff = this.request.headers.get('x-forwarded-for')
		return xff ? (Array.isArray(xff) ? xff[0] : xff.split(',')[0]) : '127.0.0.1'
	}

	private getSimpleIpAddress() {
		const ip = this.getIpAddress()
		const index = ip.search(/[0-9]/)
		return index === -1 ? ip : ip.slice(index)
	}

	private getSessionState():
		| 'no-session'
		| 'invalid-session'
		| 'session'
		| 'profile' {
		if (!this.session) {
			return 'no-session'
		}
		if (this.session.error) {
			console.warn('Session has error in middleware:', this.session.error)
			return 'invalid-session'
		}
		if (!this.session.user?.id) {
			console.warn('Session user ID is missing in middleware:', this.session.user)
			return 'invalid-session'
		}
		// 'is_profile' と 'dbProfile' の存在を確認 (実際のセッションオブジェクトの構造に依存)
		if (this.session.user.is_profile && this.session.user.dbProfile) {
			return 'profile'
		}
		return 'session'
	}

	public async run() {
		const { pathname } = this.request.nextUrl

		if (this.isMaintenanceMode) {
			if (pathname === '/maintenance') return NextResponse.next()
			const whitelistIPs = process.env.MAINTENANCE_WHITELIST?.split(',') ?? []
			if (!whitelistIPs.includes(this.getSimpleIpAddress())) {
				return this.redirect('/maintenance')
			}
		} else {
			if (pathname === '/maintenance') {
				return this.redirect('/home')
			}
		}

		if (pathname === '/') {
			return this.redirect('/home', 301)
		}
		if (pathname === '/auth') {
			return this.redirect('/auth/padlock')
		}

		const sessionState = this.getSessionState()

		if (this.matchesRoute(pathname, AUTH_FLOW_ROUTES)) {
			if (sessionState === 'profile') return this.redirect('/user')
			if (sessionState === 'session') return this.redirect('/auth/signin/setting')
			return NextResponse.next()
		}

		if (pathname === '/auth/signin/setting') {
			if (sessionState === 'no-session' || sessionState === 'invalid-session') return this.redirect('/auth/signin')
			if (sessionState === 'profile') return this.redirect('/user')
			return NextResponse.next()
		}

		if (this.matchesRoute(pathname, PROFILE_REQUIRED_ROUTES)) {
			if (sessionState === 'no-session') return this.redirect('/auth/signin')
			if (sessionState === 'invalid-session') {
				console.warn('Redirecting to session-expired from middleware:', {
					pathname, sessionError: this.session?.error, userId: this.session?.user?.id, sessionState,
				})
				return this.redirect('/auth/session-expired')
			}
			if (sessionState === 'session') return this.redirect('/auth/signin/setting')
			return NextResponse.next()
		}

		if (this.matchesRoute(pathname, SESSION_REQUIRED_ROUTES)) {
			if (sessionState === 'no-session') return this.redirect('/auth/signin')
			if (sessionState === 'invalid-session') return this.redirect('/auth/session-expired')
			return NextResponse.next()
		}

		if (this.matchesRoute(pathname, PUBLIC_ROUTES)) {
			return NextResponse.next()
		}
		
		// デフォルトでは認証が必要なページへのアクセスとみなし、セッション状態に応じてリダイレクト
		// (このロジックはプロジェクトの要件に応じて調整が必要。例えば、未定義のパスは404にすべきかなど)
		// ここでは、公開ルート以外はプロフィール必須ルートと同様の扱いとする例
		if (sessionState === 'no-session') return this.redirect('/auth/signin');
		if (sessionState === 'invalid-session') return this.redirect('/auth/session-expired');
		if (sessionState === 'session') return this.redirect('/auth/signin/setting');
		
		return NextResponse.next()
	}
}

export default auth(async function middleware(request: NextRequest) {
	const app = new MiddlewareApp(request)
	return app.run()
})
