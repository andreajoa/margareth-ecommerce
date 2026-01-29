import { Link, useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';
import { fetchShopify } from '../lib/shopify.js';
import { PRODUCT_QUERY, PRODUCT_RECOMMENDATIONS_QUERY } from '../lib/queries.js';
import { useCart } from '@shopify/hydrogen-react';

export const meta = ({ data }) => ([
  { title: `${data?.product?.title || 'Produto'} - BrinqueTEAndo` },
  { name: 'description', content: data?.product?.seo?.description || 'Benefícios educacionais para TEA/TDAH, idade recomendada e certificações.' },
]);

export async function loader({ params }) {
  const { handle } = params;
  const product = (await fetchShopify(PRODUCT_QUERY, { handle }))?.product;
  let recommendations = [];
  if (product?.id) {
    const rec = await fetchShopify(PRODUCT_RECOMMENDATIONS_QUERY, { productId: product.id });
    recommendations = rec?.productRecommendations || [];
  }
  return json({ product, recommendations });
}

export default function ProductPage() {
  const { product, recommendations } = useLoaderData();
  const { linesAdd } = useCart();
  const firstVariantId = product?.variants?.edges?.[0]?.node?.id;

  return (
    <div>
      <nav style={{marginBottom:'12px'}}>
        <Link to="/">Início</Link> {'>'} <Link to="/collections/sensory-toys">Coleções</Link> {'>'} <span>{product?.title || 'Produto'}</span>
      </nav>

      <section style={{display:'grid', gridTemplateColumns:'1.2fr 1fr', gap:'24px'}}>
        <div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px'}}>
            {product?.images?.edges?.slice(0,4)?.map(({node}, i) => (
              <img key={node.id || i} src={node.url} alt={node.altText || product?.title} style={{height:180, objectFit:'cover', borderRadius:'8px'}} />
            ))}
          </div>
          <p style={{marginTop:'8px'}}>Galeria (min 5 imagens) e 360° (placeholder).</p>
        </div>

        <div>
          <h1 style={{marginTop:0}}>{product?.title}</h1>
          <div style={{fontSize:'24px', fontWeight:800}}>
            {product?.priceRange?.minVariantPrice?.amount} {product?.priceRange?.minVariantPrice?.currencyCode}
          </div>
          <div style={{color:'#555'}}>Em estoque</div>
          <div style={{marginTop:'12px'}} dangerouslySetInnerHTML={{__html: product?.descriptionHtml || ''}} />

          <div style={{display:'flex', gap:'12px'}}>
            <button className="btn-primary" disabled={!firstVariantId} onClick={() => linesAdd([{ merchandiseId: firstVariantId, quantity: 1 }])}>ADICIONAR AO CARRINHO</button>
          </div>

          <div style={{marginTop:'12px', color:'#555'}}>Entrega estimada: Litoral de SP em 2-4 dias úteis.</div>

          <div style={{marginTop:'16px', display:'flex', gap:'12px'}}>
            <span>🚚 Frete grátis acima de R$ 250</span>
            <span>🔒 Pagamento seguro</span>
            <span>↩️ Devolução fácil</span>
          </div>
        </div>
      </section>

      <section style={{marginTop:'24px'}}>
        <h2>Relacionados</h2>
        <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'12px'}}>
          {recommendations?.map((p) => (
            <div key={p.id} style={{border:'1px solid #eee', borderRadius:'8px', padding:'12px'}}>
              <strong>{p.title}</strong>
              <div>{p.priceRange?.minVariantPrice?.amount} {p.priceRange?.minVariantPrice?.currencyCode}</div>
              <Link className="btn-secondary" style={{marginTop:'8px'}} to={`/products/${p.handle}`}>Ver</Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
