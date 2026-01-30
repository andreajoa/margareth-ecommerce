import {Link, useLoaderData} from 'react-router';

export async function loader({context}) {
  const {storefront} = context;
  
  const {collections} = await storefront.query(COLLECTIONS_QUERY);
  const {products} = await storefront.query(PRODUCTS_QUERY);
  
  return {
    collections: collections?.nodes || [],
    products: products?.nodes || [],
  };
}

export default function Index() {
  const {collections, products} = useLoaderData();
  
  return (
    <div className="container" style={{padding: '24px 16px'}}>
      <section style={{textAlign: 'center', marginBottom: '48px'}}>
        <h1 style={{fontSize: '2.5rem', color: 'var(--brand-blue)'}}>
          Bem-vindo à Brinqueteando!
        </h1>
        <p style={{fontSize: '1.2rem', color: '#666'}}>
          Brinquedos educativos para o desenvolvimento do seu filho
        </p>
      </section>

      {collections.length > 0 && (
        <section style={{marginBottom: '48px'}}>
          <h2>Nossas Coleções</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '24px',
            marginTop: '24px',
          }}>
            {collections.slice(0, 4).map((collection) => (
              <Link
                key={collection.id}
                to={`/collections/${collection.handle}`}
                style={{
                  border: '1px solid #eee',
                  borderRadius: '12px',
                  padding: '16px',
                  textAlign: 'center',
                }}
              >
                {collection.image && (
                  <img
                    src={collection.image.url}
                    alt={collection.title}
                    style={{
                      width: '100%',
                      height: '150px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />
                )}
                <h3 style={{marginTop: '12px'}}>{collection.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      {products.length > 0 && (
        <section>
          <h2>Produtos em Destaque</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '24px',
            marginTop: '24px',
          }}>
            {products.slice(0, 8).map((product) => (
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
        </section>
      )}
    </div>
  );
}

const COLLECTIONS_QUERY = `#graphql
  query Collections {
    collections(first: 4) {
      nodes {
        id
        handle
        title
        image {
          url
          altText
        }
      }
    }
  }
`;

const PRODUCTS_QUERY = `#graphql
  query Products {
    products(first: 8) {
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
`;
