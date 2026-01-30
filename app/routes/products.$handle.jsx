import {useLoaderData} from 'react-router';

export async function loader({params, context}) {
  const {storefront} = context;
  const {handle} = params;
  
  const {product} = await storefront.query(PRODUCT_QUERY, {
    variables: {handle},
  });
  
  if (!product) {
    throw new Response('Product not found', {status: 404});
  }
  
  return {product};
}

export default function Product() {
  const {product} = useLoaderData();
  const firstVariant = product.variants.nodes[0];
  const price = parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2);
  
  return (
    <div className="container" style={{padding: '24px 16px'}}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '48px',
      }}>
        <div>
          {product.featuredImage && (
            <img
              src={product.featuredImage.url}
              alt={product.title}
              style={{
                width: '100%',
                borderRadius: '12px',
              }}
            />
          )}
        </div>
        
        <div>
          <h1>{product.title}</h1>
          <p style={{
            fontSize: '2rem',
            color: 'var(--brand-blue)',
            fontWeight: 'bold',
            margin: '16px 0',
          }}>
            R$ {price}
          </p>
          
          {product.description && (
            <div
              style={{color: '#666', marginBottom: '24px'}}
              dangerouslySetInnerHTML={{__html: product.descriptionHtml}}
            />
          )}
          
          <button
            style={{
              background: 'var(--brand-blue)',
              color: 'white',
              padding: '16px 32px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
}

const PRODUCT_QUERY = `#graphql
  query Product($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      description
      descriptionHtml
      featuredImage {
        url
        altText
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 1) {
        nodes {
          id
          availableForSale
        }
      }
    }
  }
`;
