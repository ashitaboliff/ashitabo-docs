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
			title: 'あしたぼコマ表開発ドキュメント',
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
						{ label: 'トップページ', slug: 'index' },
						{ label: 'はじめに', slug: 'getstart' },
						{ label: '用語集', slug: 'getstart/term' },
					],
				},
				{
					label: '開発スタート',
					autogenerate: { directory: 'setup' },
				},
				{
					label: 'Git, GitHub',
					autogenerate: { directory: 'git' },
				},
				{
					label: 'Web開発の基礎（座学）',
					autogenerate: { directory: 'web' },
				},
				{
					label: 'Web開発の基礎（実践）',
					autogenerate: { directory: 'task' },
				},
			],
			customCss: [
				'./src/assets/app.css',
			],
			credits: true,
		}),
		react(),
	],
});
