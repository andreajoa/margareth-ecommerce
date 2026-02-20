export async function loader() {
  const txt = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /admin/',
    'Disallow: /cart/',
    'Disallow: /account/',
    'Disallow: /api/',
    'Disallow: /checkouts/',
    'Disallow: /orders/',
    'Disallow: /*.json$',
    'Disallow: /search?*',
    'Disallow: /collections/*?*sort_by*',
    'Allow: /blogs/',
    'Allow: /products/',
    'Allow: /collections/',
    'Allow: /pages/',
    'Allow: /cidades/',
    '',
    'Sitemap: https://brinqueteaando.online/sitemap.xml',
    '',
    'User-agent: AhrefsBot',
    'Allow: /',
    'Crawl-delay: 1',
    '',
    'User-agent: SemrushBot',
    'Allow: /',
    'Crawl-delay: 2',
    '',
    'User-agent: Googlebot',
    'Allow: /',
    '',
    'User-agent: Googlebot-Image',
    'Allow: /',
  ].join('\n');

  return new Response(txt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
