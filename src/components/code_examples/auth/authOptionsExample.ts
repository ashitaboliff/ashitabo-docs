// import NextAuth, { type Session } from 'next-auth' // ダミー化のためコメントアウト
// import { PrismaAdapter } from '@auth/prisma-adapter' // ダミー化のためコメントアウト
// import prisma from 'lib/prisma' // ダミー化のためコメントアウト
// import authConfig from 'features/auth/lib/auth.config' // ダミー化のためコメントアウト
// import type { User as PrismaUser } from '@prisma/client' // ダミー化のためコメントアウト
// import type { Profile as UserAppProfile, Part, AccountRole } from 'features/user/types' // ダミー化のためコメントアウト
// import { getProfile as getDbProfile } from 'features/auth/lib/repository' // ダミー化のためコメントアウト

// ダミーの型とモジュール (型エラー回避のため)
type Session = { user?: any; error?: string; expires: string };
const NextAuth = (options: any) => ({ handlers: {}, auth: () => {}, signIn: () => {}, signOut: () => {} });
const PrismaAdapter = (prisma: any) => ({});
const prisma = { user: { findUnique: async (q: any) => null } }; // ダミーのprisma
const authConfig = { providers: [] };
type PrismaUser = { id: string; name?: string | null; email?: string | null; image?: string | null; role?: string };
type UserAppProfile = { name?: string; part?: Part[] };
type Part = string;
type AccountRole = string;
const getDbProfile = async (userId: string) => null;


export const { handlers, auth, signIn, signOut } = NextAuth({
	adapter: PrismaAdapter(prisma),
	debug: process.env.NODE_ENV === 'development',
	session: {
		strategy: 'jwt',
		maxAge: 6 * 30 * 24 * 60 * 60, // 6 months
	},
	secret: process.env.AUTH_SECRET,
	...authConfig, // Edge互換の基本設定をインポート
	pages: {
		signOut: '/home',
		signIn: '/auth/signin',
		error: '/auth/error',
	},
	trustHost: true,
	callbacks: {
		async jwt({ token, user, trigger, session: updateSessionData }: any) { // 型をanyに変更
			if (user?.id) {
				token.sub = user.id
				const dbUser = await prisma.user.findUnique({ where: { id: user.id } })
				if (dbUser) {
					token.dbUser = dbUser as any
					const dbProfile = await getDbProfile(user.id)
					token.dbProfile = (dbProfile as any) || null
					token.error = null
				} else {
					token.sub = undefined
					token.error = 'USER_NOT_FOUND_IN_DB'
				}
			}

			if (trigger === 'update' && token.sub && typeof token.sub === 'string') {
				console.log('JWT callback: Updating session for user', token.sub)
				const dbUser = await prisma.user.findUnique({
					where: { id: token.sub },
				})
				if (dbUser) {
					token.dbUser = dbUser as any
					const refreshedDbProfile = await getDbProfile(token.sub)
					token.dbProfile = (refreshedDbProfile as any) || null
					token.error = null
					console.log('JWT callback: Profile updated', {
						hasProfile: !!refreshedDbProfile
						// profileName: refreshedDbProfile?.name ?? 'N/A' // Temporarily remove to avoid type error
					})
				} else {
					token.sub = undefined
					token.error = 'USER_DELETED_FROM_DB'
				}
			}

			if (!trigger && token.sub && typeof token.sub === 'string' && !token.dbProfile) {
				console.log('JWT callback: Checking for missing profile in existing token', token.sub)
				const dbProfile = await getDbProfile(token.sub)
				if (dbProfile) {
					console.log('JWT callback: Found missing profile, updating token', {
						// profileName: dbProfile?.name ?? 'N/A' // Temporarily remove to avoid type error
					})
					token.dbProfile = (dbProfile as any) || null
				}
			}

			return token
		},
		async session({
			session,
			token,
		}: {
			session: Session
			token: any
		}) {
			if (token.error) {
				console.warn(
					`Session has token error: ${token.error} for sub: ${token.sub}`,
				)
				session.error = token.error
				return session
			}

			if (!token.sub || !token.dbUser) {
				console.warn(
					`Session missing sub or dbUser in token for sub: ${token.sub}`,
				)
				session.error = 'INVALID_TOKEN'
				return session
			}

			if (session.user) {
				const dbUserData = token.dbUser as PrismaUser
				session.user.id = token.sub || dbUserData.id
				session.user.dbUser = dbUserData
				session.user.name = dbUserData.name ?? session.user.name
				session.user.email = dbUserData.email ?? session.user.email
				session.user.image = dbUserData.image ?? session.user.image
				session.user.role = (dbUserData.role as AccountRole) || 'USER'

				const dbProfileData = token.dbProfile as UserAppProfile | null
				session.user.dbProfile = dbProfileData

				if (dbProfileData) {
					session.user.is_profile = true
					session.user.full_name = dbProfileData.name ?? ''
					session.user.part = dbProfileData.part as Part[]
				} else {
					session.user.is_profile = false
					session.user.full_name = dbUserData.name ?? ''
					session.user.part = []
				}
			}
			
			session.error = undefined
			return session
		},
	},
	cookies: {
		state: {
			name: 'next-auth.state',
			options: {
				httpOnly: true,
				sameSite: 'lax',
				path: '/',
				secure: process.env.NODE_ENV === 'production',
			},
		},
	},
})
