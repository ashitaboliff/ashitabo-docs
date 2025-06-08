// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// ダミーのNextResponseとNextRequest (型エラー回避のため)
const NextResponse = {
  next: () => ({ headers: new Map(), redirect: (url: URL) => ({ status: 307, headers: { Location: url.toString() } }) }),
  redirect: (url: URL) => ({ status: 307, headers: { Location: url.toString() } }),
};
type NextRequest = {
  nextUrl: URL;
  cookies: { get: (name: string) => ({ value: string } | undefined) };
  url: string;
};

export function middleware(request: NextRequest) {
  // 例: /admin パスへのアクセスに認証が必要な場合
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const authToken = request.cookies.get('auth-token')?.value;
    if (!authToken) {
      // 認証トークンがなければログインページへリダイレクト
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('from', request.nextUrl.pathname); // 元のパスをクエリに
      return NextResponse.redirect(loginUrl);
    }
  }

  // 例: 特定のパスでレスポンスヘッダーを追加
  if (request.nextUrl.pathname === '/api/special') {
    const response = NextResponse.next(); // 次の処理へ進める
    response.headers.set('X-Custom-Header', 'Hello from middleware!');
    return response;
  }

  return NextResponse.next(); // その他の場合はそのまま次の処理へ
}

// ミドルウェアを適用するパスを指定 (省略すると全てのパスに適用)
export const config = {
  matcher: ['/admin/:path*', '/api/special'],
};
