import {Link, useLoaderData} from 'react-router';

export async function loader({params, context}) {
  const {storefront} = context;
  const {handle} = params;
  
  const {collection} = await storefront.query(COLLECTION_QUERY, {
    variables: {handle},
  });
  
  if (!collection) {
    throw new Response('Collection not found', {status: 404});
  }
  
  return {collection};
}

export default function Collection() {
  const {collection} = useLoaderData();
  const products = collection.products.nodes;
  
  return (
    <div className="container" style={{padding: '24px 16px'}}>
      <h1>{collection.title}</h1>
      {collection.description && (
        <p style={{color: '#666', marginBottom: '24px'}}>
          {collection.description}
        </p>
      )}
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '24px',
      }}>
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.handle}`}
            style={{
              border: '1px solid #eee',
              borderRadius: '12px',
              padding: '16px',
            }}
          >
            {product.featuredImage && (
              <img
                src={product.featuredImage.url}
                alt={product.title}
                style={{
                  width: '100%',
                  height: '180px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
              />
            )}
            <h3 style={{fontSize: '1rem', marginTop: '12px'}}>
              {product.title}
            </h3>
            <p style={{
              color: 'var(--brand-blue)',
              fontWeight: 'bold',
              marginTop: '8px',
            }}>
              R$ {parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

const COLLECTION_QUERY = `#graphql
  query Collection($handle: String!) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      products(first: 50) {
        nodes {
          id
          handle
          title
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
        }
      }
    }
  }
`;
