// import type { NextAuthConfig } from 'next-auth' // ダミー化のためコメントアウト
// import Line from 'next-auth/providers/line' // ダミー化のためコメントアウト

// ダミーの型とプロバイダ (型エラー回避のため)
type NextAuthConfig = { providers: any[] };
const Line = (options: any) => ({ id: 'line', name: 'Line', type: 'oauth', options });

export default {
	providers: [
		Line({
			checks: ['state'],
		}),
	],
} satisfies NextAuthConfig;
