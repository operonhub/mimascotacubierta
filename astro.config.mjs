// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// Rutas con noindex — se excluyen del sitemap para no pedirle a Google
// que indexe páginas thin / sin contenido todavía.
const NOINDEX_PATHS = ['/comparar/mexico/', '/razas/perros/', '/razas/gatos/', '/404/'];

// https://astro.build/config
export default defineConfig({
	site: 'https://www.mimascotacubierta.com/',
	integrations: [
		mdx(),
		sitemap({
			filter: (page) => !NOINDEX_PATHS.includes(new URL(page).pathname),
		}),
	],
});
