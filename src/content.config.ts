import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		category: z.string(),
		categorySlug: z.string(),
		pubDate: z.coerce.date(),
		author: z.string().default('Equipo MiMascotaCubierta'),
		image: z.string().optional(),
		imageAlt: z.string().optional(),
		tags: z.array(z.string()).optional(),
		faq: z
			.array(
				z.object({
					question: z.string(),
					answer: z.string(),
				}),
			)
			.optional(),
		draft: z.boolean().default(false),
	}),
});

export const collections = { blog };
