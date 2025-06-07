// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import tailwindcssVite from '@tailwindcss/vite';

export default defineConfig({
	vite: {
		plugins: [tailwindcssVite()],
	},
	integrations: [
		starlight({
			title: 'あしたぼホームページ開発ドキュメント',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/ashitaboliff' }],
			locales: {
				root: {
					label: '日本語',
					lang: 'ja',
				},
			},
			sidebar: [
				{
					label: 'トップ',
					items: [
						// slug 'index' は docs/index.mdx を指すので、トップページのラベルはこれでOK
						{ label: 'トップページ', slug: 'index' },
						// 'getstart/index.mdx' は編集しない指示だったので、'はじめに' は 'getstart/はじめに.mdx' を指すようにする
						{ label: 'はじめに', slug: 'getstart/はじめに' },
						{ label: '用語集', slug: 'getstart/term' }, // term.mdx を指す
					],
				},
				{
					label: '開発スタート⚡',
					autogenerate: { directory: 'setup' }, // setup/index.mdx がこのセクションのトップ
				},
				{
					label: 'Git, GitHub',
					autogenerate: { directory: 'git' }, // git/index.mdx がこのセクションのトップ
				},
				{
					label: 'Web開発の基礎（座学編）',
					autogenerate: { directory: 'web' }, // web/index.mdx がこのセクションのトップ
				},
				{
					label: 'Web開発実践編', // ラベル変更
					autogenerate: { directory: 'web-practice' }, // web-practice/index.mdx がこのセクションのトップ
				},
				{
					label: 'Web開発応用編（座学）', // 新規追加
					autogenerate: { directory: 'web-advanced' }, // web-advanced/index.mdx がこのセクションのトップ
				},
				{
					label: 'Web開発応用実践編', // 新規追加
					autogenerate: { directory: 'web-advanced-practice' }, // web-advanced-practice/index.mdx がこのセクションのトップ
				},
				// { // task ディレクトリは今回の指示に含まれていないためコメントアウト
				// 	label: 'Web開発の基礎（実践）',
				// 	autogenerate: { directory: 'task' },
				// },
			],
			customCss: [
				'./src/assets/app.css',
			],
			credits: true,
		}),
		react(),
	],
});
