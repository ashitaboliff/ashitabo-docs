// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'My Docs',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
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
		}),
	],
});
