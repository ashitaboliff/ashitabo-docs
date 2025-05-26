// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import tailwindcssVite from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [tailwindcssVite()],
	},
	integrations: [
		starlight({
			title: 'あしたぼコマ表開発ドキュメント',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/ashitabo' }],
			sidebar: [
				{
					label: 'はじめに',
					items: [
						{ label: 'トップページ', slug: 'index' },
					],
				},
				{
					label: '開発ドキュメント',
					items: [
						{ label: 'コーディング規約など', slug: 'coding' },
						{ label: 'デザイン開発', slug: 'design' },
						{ label: 'Docker開発', slug: 'docker' },
						{ label: 'Reactの基礎', slug: 'react' },
						{ label: '実践課題', slug: 'task' },
					],
				},
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', slug: 'guides/example' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
			customCss: [
				'./src/assets/app.css',
			]
		}),
		react(),
	],
});
