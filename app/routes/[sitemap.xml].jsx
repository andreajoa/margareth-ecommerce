const SHOP_DOMAIN = 'https://brinqueteaando.online';
export async function loader({context}) {
  const {storefront} = context;
  const [pd, cd, pgd, bd] = await Promise.all([
    storefront.query(`#graphql query P($first:Int!){products(first:$first,sortKey:UPDATED_AT){nodes{handle updatedAt title featuredImage{url}}}}`,{variables:{first:250}}).catch(()=>({products:{nodes:[]}})),
    storefront.query(`#graphql query C($first:Int!){collections(first:$first,sortKey:UPDATED_AT){nodes{handle updatedAt}}}`,{variables:{first:50}}).catch(()=>({collections:{nodes:[]}})),
    storefront.query(`#graphql query Pg($first:Int!){pages(first:$first){nodes{handle}}}`,{variables:{first:50}}).catch(()=>({pages:{nodes:[]}})),
    storefront.query(`#graphql query B($first:Int!){blogs(first:$first){nodes{handle articles(first:100){nodes{handle publishedAt title image{url}}}}}}`,{variables:{first:10}}).catch(()=>({blogs:{nodes:[]}})),
  ]);
  const products = pd?.products?.nodes??[];
  const collections = cd?.collections?.nodes??[];
  const pages = pgd?.pages?.nodes??[];
  const blogs = bd?.blogs?.nodes??[];
  const esc = s=>(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const staticUrls = [
    {url:'/',p:'1.0',c:'daily'},{url:'/collections/all',p:'0.9',c:'daily'},
    {url:'/collections/brinquedos-terapeuticos',p:'0.9',c:'weekly'},
    {url:'/collections/por-necessidade',p:'0.8',c:'weekly'},
    {url:'/collections/por-idade',p:'0.8',c:'weekly'},
    {url:'/collections/ambiente-rotina',p:'0.8',c:'weekly'},
    {url:'/collections/apoio-aos-pais',p:'0.8',c:'weekly'},
    {url:'/blogs/blog',p:'0.8',c:'daily'},
    {url:'/cidades/santos',p:'0.9',c:'monthly'},
    {url:'/cidades/sao-vicente',p:'0.9',c:'monthly'},
    {url:'/cidades/praia-grande',p:'0.9',c:'monthly'},
    {url:'/cidades/guaruja',p:'0.9',c:'monthly'},
    {url:'/cidades/sao-paulo',p:'0.9',c:'monthly'},
    {url:'/cidades/cubatao',p:'0.8',c:'monthly'},
    {url:'/cidades/mongagua',p:'0.8',c:'monthly'},
    {url:'/cidades/itanhaem',p:'0.8',c:'monthly'},
    {url:'/cidades/peruibe',p:'0.8',c:'monthly'},
    {url:'/pages/brinquedos-para-autismo-tea',p:'0.9',c:'monthly'},
    {url:'/pages/brinquedos-para-tdah',p:'0.9',c:'monthly'},
    {url:'/pages/dicas-para-tdah-e-tea',p:'0.7',c:'monthly'},
    {url:'/pages/como-escolher-brinquedos',p:'0.7',c:'monthly'},
    {url:'/pages/faq',p:'0.6',c:'monthly'},
  ];
  const today = new Date().toISOString().split('T')[0];
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${staticUrls.map(({url,p,c})=>`<url><loc>${SHOP_DOMAIN}${url}</loc><changefreq>${c}</changefreq><priority>${p}</priority></url>`).join('\n')}
${products.map(pr=>`<url><loc>${SHOP_DOMAIN}/products/${pr.handle}</loc><lastmod>${pr.updatedAt?pr.updatedAt.split('T')[0]:today}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority>${pr.featuredImage?.url?`<image:image><image:loc>${pr.featuredImage.url}</image:loc><image:title>${esc(pr.title)}</image:title></image:image>`:''}</url>`).join('\n')}
${collections.map(cl=>`<url><loc>${SHOP_DOMAIN}/collections/${cl.handle}</loc><lastmod>${cl.updatedAt?cl.updatedAt.split('T')[0]:today}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>`).join('\n')}
${pages.map(pg=>`<url><loc>${SHOP_DOMAIN}/pages/${pg.handle}</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>`).join('\n')}
${blogs.flatMap(bl=>(bl.articles?.nodes??[]).map(ar=>`<url><loc>${SHOP_DOMAIN}/blogs/${bl.handle}/${ar.handle}</loc><lastmod>${ar.publishedAt?ar.publishedAt.split('T')[0]:today}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority>${ar.image?.url?`<image:image><image:loc>${ar.image.url}</image:loc><image:title>${esc(ar.title)}</image:title></image:image>`:''}</url>`)).join('\n')}
</urlset>`;
  return new Response(xml,{status:200,headers:{'Content-Type':'application/xml; charset=utf-8','Cache-Control':'public, max-age=3600, stale-while-revalidate=86400','X-Robots-Tag':'noindex'}});
}
