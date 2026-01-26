import {useLoaderData, Link} from 'react-router';
import {useState, useMemo} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import {NavigationMenuTEA} from '~/components/NavigationMenuTEA';
import {teaColors} from '~/styles/tea-colors';

export const meta = ({data, params}) => {
  const collection = data?.collection;
  const handle = params.handle;
  const title = collection?.title ? \`\${collection.title} | TEA & TDAH Brasil\` : 'TEA & TDAH Brasil';
  const description = collection?.description || \`Produtos para TEA e TDAH. Frete grátis São Vicente, Praia Grande e Santos.\`;
  return [
    {title},
    {name: 'description', content: description},
    {name: 'keywords', content: 'TEA, TDAH, Autismo, Brinquedos Sensoriais'},
  ];
};

async function fetchAllProducts(storefront, handle, country, language) {
  let allProducts = [];
  let hasNextPage = true;
  let cursor = null;
  while (hasNextPage) {
    const {collection} = await storefront.query(COLLECTION_QUERY, {
      variables: { handle, country, language, cursor, first: 250 },
    });
    if (!collection) break;
    allProducts = [...allProducts, ...collection.products.edges.map(e => e.node)];
    hasNextPage = collection.products.pageInfo.hasNextPage;
    cursor = collection.products.pageInfo.endCursor;
    if (allProducts.length > 10000) break;
  }
  return allProducts;
}

export async function loader({context, params}) {
  const {storefront} = context;
  const allProducts = await fetchAllProducts(
    storefront, params.handle,
    context.storefront.i18n.country,
    context.storefront.i18n.language
  );
  const {collection} = await storefront.query(COLLECTION_INFO_QUERY, {
    variables: {
      handle: params.handle,
      country: context.storefront.i18n.country,
      language: context.storefront.i18n.language,
    },
  });
  if (!collection) throw new Response(null, {status: 404});
  collection.products = { nodes: allProducts };
  return {collection, handle: params.handle};
}

export default function CollectionPage() {
  const {collection} = useLoaderData();
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [sortBy, setSortBy] = useState('relevancia');

  const sortedProducts = useMemo(() => {
    const products = [...(collection.products?.nodes || [])];
    switch(sortBy) {
      case 'menor-preco':
        return products.sort((a, b) =>
          parseFloat(a.priceRange.minVariantPrice.amount) - 
          parseFloat(b.priceRange.minVariantPrice.amount)
        );
      case 'maior-preco':
        return products.sort((a, b) =>
          parseFloat(b.priceRange.minVariantPrice.amount) - 
          parseFloat(a.priceRange.minVariantPrice.amount)
        );
      default: return products;
    }
  }, [collection.products?.nodes, sortBy]);

  return (
    <div className="min-h-screen bg-white">
      <NavigationMenuTEA />
      <section className="py-16 px-4 relative overflow-hidden" style={{background: \`linear-gradient(135deg, \${teaColors.skyBlue} 0%, \${teaColors.brightBlue} 100%)\`}}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-6xl">🧩</div>
          <div className="absolute bottom-10 right-10 text-6xl">🎨</div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">{collection.title}</h1>
          {collection.description && (<p className="text-lg max-w-3xl mx-auto text-white/95">{collection.description}</p>)}
          <p className="text-white/90 text-sm mt-6">{sortedProducts.length} produtos</p>
        </div>
      </section>
      <section className="py-8 px-4" style={{backgroundColor: teaColors.lightGray}}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {icon: '🏆', title: 'Recomendado', desc: 'Por terapeutas'},
              {icon: '✅', title: 'Qualidade', desc: 'Certificada'},
              {icon: '🚚', title: 'Frete Grátis', desc: 'Baixada Santista'},
              {icon: '💳', title: '12x', desc: 'Sem juros'}
            ].map((badge, idx) => (
              <div key={idx} className="p-6 rounded-2xl text-center shadow-md bg-white">
                <div className="text-4xl mb-2">{badge.icon}</div>
                <h3 className="font-bold text-sm mb-1" style={{color: teaColors.brightBlue}}>{badge.title}</h3>
                <p className="text-xs" style={{color: teaColors.darkText}}>{badge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 py-6 border-b">
        <div className="flex items-center justify-between">
          <p className="font-semibold" style={{color: teaColors.darkText}}>{sortedProducts.length} produtos</p>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border-2 px-4 py-2 rounded-lg" style={{borderColor: teaColors.brightBlue}}>
            <option value="relevancia">Relevância</option>
            <option value="menor-preco">Menor Preço</option>
            <option value="maior-preco">Maior Preço</option>
          </select>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product, index) => {
            const secondImage = product.media?.nodes?.[1]?.previewImage;
            return (
              <div key={product.id} className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative aspect-square overflow-hidden" style={{backgroundColor: teaColors.lightGray}}>
                  <Link to={\`/products/\${product.handle}\`} className="block w-full h-full">
                    {product.featuredImage && (
                      <div className="relative w-full h-full">
                        <Image data={product.featuredImage} className={\`w-full h-full object-cover transition-all duration-700 \${secondImage ? 'group-hover:opacity-0' : 'group-hover:scale-110'}\`} alt={product.title} loading={index < 4 ? "eager" : "lazy"} />
                        {secondImage && (<Image data={secondImage} className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-all duration-700" alt={\`\${product.title} - Vista 2\`} loading="lazy" />)}
                      </div>
                    )}
                  </Link>
                  <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all">
                    <button onClick={() => setQuickViewProduct(product)} className="px-4 py-2 rounded-full font-semibold text-white shadow-xl text-sm" style={{backgroundColor: teaColors.brightBlue}}>Ver Rápido</button>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs font-bold mb-2" style={{color: teaColors.brightBlue}}>{product.vendor || 'TEA & TDAH'}</p>
                  <Link to={\`/products/\${product.handle}\`}><h3 className="font-semibold text-sm mb-3 line-clamp-2 hover:underline" style={{color: teaColors.darkText}}>{product.title}</h3></Link>
                  <div className="flex gap-1 mb-3">{[...Array(5)].map((_, i) => (<span key={i} className="text-sm" style={{color: teaColors.yellow}}>★</span>))}</div>
                  <Money data={product.priceRange.minVariantPrice} className="text-lg font-bold block mb-3" style={{color: teaColors.darkText}} />
                  <Link to={\`/products/\${product.handle}\`} className="w-full block text-center py-3 rounded-lg font-semibold text-white transition-all" style={{backgroundColor: teaColors.brightBlue}}>Ver Detalhes</Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      {quickViewProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button onClick={() => setQuickViewProduct(null)} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white hover:bg-red-500 hover:text-white z-10 font-bold">✕</button>
            <div className="relative aspect-square" style={{backgroundColor: teaColors.lightGray}}>
              {quickViewProduct.featuredImage && (<Image data={quickViewProduct.featuredImage} className="w-full h-full object-cover" alt={quickViewProduct.title} />)}
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4" style={{color: teaColors.darkText}}>{quickViewProduct.title}</h2>
              <Money data={quickViewProduct.priceRange.minVariantPrice} className="text-3xl font-bold mb-6" style={{color: teaColors.darkText}} />
              <div className="p-4 rounded-lg mb-6" style={{backgroundColor: teaColors.lightGray}}>
                <h3 className="font-bold mb-3" style={{color: teaColors.brightBlue}}>Benefícios:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2"><span style={{color: teaColors.green}}>✓</span><span>Desenvolvido por especialistas</span></li>
                  <li className="flex items-start gap-2"><span style={{color: teaColors.green}}>✓</span><span>Material seguro e durável</span></li>
                </ul>
              </div>
              <Link to={\`/products/\${quickViewProduct.handle}\`} onClick={() => setQuickViewProduct(null)} className="w-full block text-center py-4 rounded-lg font-bold text-white text-lg" style={{backgroundColor: teaColors.brightBlue}}>Ver Detalhes Completos →</Link>
            </div>
          </div>
        </div>
      )}
      <footer style={{backgroundColor: teaColors.darkText}} className="text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4"><span className="text-3xl">🧩</span><h3 className="font-bold text-xl">TEA & TDAH Brasil</h3></div>
              <p className="text-sm opacity-80">Produtos especializados para TEA e TDAH.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4" style={{color: teaColors.yellow}}>Categorias</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><Link to="/collections/all">Todos</Link></li>
                <li><Link to="/collections/tea">TEA</Link></li>
                <li><Link to="/collections/tdah">TDAH</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4" style={{color: teaColors.yellow}}>Suporte</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><Link to="/pages/faq">FAQ</Link></li>
                <li><Link to="/pages/contato">Contato</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4" style={{color: teaColors.yellow}}>Newsletter</h4>
              <input type="email" placeholder="Seu e-mail" className="w-full px-4 py-2 rounded-lg text-gray-800 text-sm" />
            </div>
          </div>
          <div className="border-t border-white/20 pt-6 text-center text-sm opacity-80"><p>© 2025 TEA & TDAH Brasil</p></div>
        </div>
      </footer>
    </div>
  );
}

const COLLECTION_QUERY = \`#graphql
  query Collection(\$handle: String!, \$country: CountryCode, \$language: LanguageCode, \$cursor: String, \$first: Int = 250) 
  @inContext(country: \$country, language: \$language) {
    collection(handle: \$handle) {
      id
      products(first: \$first, after: \$cursor) {
        edges {
          node {
            id
            title
            handle
            vendor
            featuredImage { id url altText width height }
            media(first: 2, sortKey: POSITION) {
              nodes {
                ... on MediaImage {
                  previewImage { id url altText width height }
                }
              }
            }
            priceRange {
              minVariantPrice { amount currencyCode }
            }
          }
        }
        pageInfo { hasNextPage endCursor }
      }
    }
  }
\`;

const COLLECTION_INFO_QUERY = \`#graphql
  query CollectionInfo(\$handle: String!, \$country: CountryCode, \$language: LanguageCode) 
  @inContext(country: \$country, language: \$language) {
    collection(handle: \$handle) {
      id
      title
      description
      image { url }
    }
  }
\`;
