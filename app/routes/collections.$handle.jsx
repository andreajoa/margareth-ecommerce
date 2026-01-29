import { Link, useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';
import { fetchShopify } from '../lib/shopify.js';
import { COLLECTION_QUERY } from '../lib/queries.js';

export const meta = ({ data }) => ([
  { title: `${data?.collection?.title || 'Coleção'} - BrinqueTEAndo` },
  { name: 'description', content: data?.collection?.seo?.description || 'Coleção com filtros por preço, idade, habilidades e tipo de produto.' },
]);

export async function loader({ params }) {
  const { handle } = params;
  const data = await fetchShopify(COLLECTION_QUERY, { handle, first: 12, sortKey: 'RELEVANCE', reverse: false });
  return json({ collection: data?.collection });
}

export default function CollectionPage() {
  const { collection } = useLoaderData();
  const products = collection?.products?.edges?.map((e) => e.node) || [];

  return (
    <div>
      <h1 style={{marginTop:0}}>Coleção: {collection?.title}</h1>

      <section style={{display:'grid', gridTemplateColumns:'260px 1fr', gap:'24px'}}>
        <aside style={{border:'1px solid #eee', borderRadius:'12px', padding:'12px'}}>
          <h3>Filtros</h3>
          <div>
            <label>Preço: <input type="range" min={0} max={500} /></label>
          </div>
          <div>
            <strong>Idade</strong>
            <div><label><input type="checkbox"/> 3-5 anos</label></div>
            <div><label><input type="checkbox"/> 6-8 anos</label></div>
            <div><label><input type="checkbox"/> 9-12 anos</label></div>
            <div><label><input type="checkbox"/> 13+</label></div>
          </div>
          <div>
            <strong>Habilidade</strong>
            <div><label><input type="checkbox"/> Motora Fina</label></div>
            <div><label><input type="checkbox"/> Comunicação</label></div>
            <div><label><input type="checkbox"/> Social</label></div>
            <div><label><input type="checkbox"/> Cognitiva</label></div>
          </div>
          <div>
            <label><input type="checkbox"/> Somente em estoque</label>
          </div>
          <div>
            <strong>Ordenar por</strong>
            <select>
              <option>Relevância</option>
              <option>Menor Preço</option>
              <option>Maior Preço</option>
              <option>Mais Vendidos</option>
              <option>Novidades</option>
              <option>Melhor Avaliação</option>
            </select>
          </div>
        </aside>

        <div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'16px'}}>
            {products.map(p => (
              <div key={p.id} style={{border:'1px solid #eee', borderRadius:'12px', padding:'12px'}}>
                <div style={{background:'#f2f2f2', height:160, borderRadius:'8px'}}>
                  {p?.images?.edges?.[0]?.node?.url && (
                    <img src={p.images.edges[0].node.url} alt={p.images.edges[0].node.altText || p.title} style={{width:'100%', height:'100%', objectFit:'cover', borderRadius:'8px'}} />
                  )}
                </div>
                <strong>{p.title}</strong>
                <div>
                  {p.priceRange?.minVariantPrice?.amount} {p.priceRange?.minVariantPrice?.currencyCode}
                </div>
                <div style={{marginTop:'8px', display:'flex', gap:'8px'}}>
                  <Link className="btn-secondary" to={`/products/${p.handle}`}>Ver</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
