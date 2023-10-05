import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	const websiteFull = 'https://www.drahsanahmad.com';
	const website = 'https://drahsanahmad.com';
	const pages = [`about`, `treatments`];
	return new Response(
		`<?xml version="1.0" encoding="UTF-8" ?>
			<urlset
				xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
				xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
				xmlns:xhtml="https://www.w3.org/1999/xhtml"
				xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
				xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
				xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
			>
				<url>
					<loc>${website}</loc>
					<changefreq>daily</changefreq>
					<priority>1</priority>
				</url>
				${pages
					.map(
						(page) => `
				<url>
					<loc>${website}/${page}</loc>
					<changefreq>daily</changefreq>
					<priority>0.7</priority>
				</url>`
					)
					.join('')}
					<url>
					<loc>${websiteFull}</loc>
					<changefreq>daily</changefreq>
					<priority>1</priority>
				</url>
				${pages
					.map(
						(page) => `
				<url>
					<loc>${websiteFull}/${page}</loc>
					<changefreq>daily</changefreq>
					<priority>0.7</priority>
				</url>`
					)
					.join('')}
			</urlset>`.trim(),
		{
			headers: {
				'Cache-Control': 'max-age=3600, s-maxage=3600',
				'Content-Type': 'application/xml'
			},
			status: 200
		}
	);
};
