import {useLoaderData, Link, useRouteLoaderData} from 'react-router';
import {useState, useMemo} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import {getProductHandle} from '~/lib/utils';
import {NavigationMenu} from '~/components/NavigationMenu';

export const meta = ({data, params}) => {
const collection = data?.collection;
const handle = params.handle;
// SEO Keywords para TEA/TDAH
const seoKeywords = {
'all': 'Brinquedos TEA TDAH Autismo | BrinqueTEAndo - Produtos Especializados',
'sensorial': 'Brinquedos Sensoriais TEA Autismo | Texturas Luzes Estímulos | São Vicente Santos Praia Grande',
'fidget': 'Fidget Toys TDAH | Foco Atenção Concentração | Brinquedos Terapêuticos',
'comunicacao': 'Comunicação Alternativa Autismo TEA | CAA Pictogramas | Recursos Terapia',
'rotina': 'Rotina Visual TEA TDAH | Agenda Autonomia | Organização Autismo',
'motora': 'Coordenação Motora Autismo TDAH | Motricidade Fina Ampla | Brincadeiras'
  };

const title = collection?.title
  ? `${collection.title} | BrinqueTEAndo - TEA, TDAH e Neurodiversidade`
  : 'BrinqueTEAndo | TEA, TDAH e Autismo - Brinquedos Especializados';
const description = collection?.description
  ? `${collection.description} | Frete grátis para São Vicente, Santos e Praia Grande. Produtos selecionados por terapeutas.`
  : 'Produtos especializados para TEA, TDAH e autismo. Brinquedos sensoriais, comunicação alternativa, rotina visual e mais. Frete grátis para São Vicente, Santos e Praia Grande.';
const keyword = seoKeywords[handle] || 'TEA TDAH Autismo Brinquedos Sensoriais São Vicente Santos Praia Grande';

return [
    {title},
    {name: 'description', content: description},
    {name: 'keywords', content: keyword},
    {name: 'og:title', content: title},
    {name: 'og:description', content: description},
    {name: 'og:type', content: 'website'},
    {name: 'og:site_name', content: 'BrinqueTEAndo'},
// GEO TARGETING - Brasil
    {name: 'geo.region', content: 'BR-SP'},
    {name: 'geo.placename', content: 'São Vicente;Santos;Praia Grande'},
    {name: 'target_market', content: 'BR'},
    {name: 'twitter:title', content: title},
    {name: 'twitter:description', content: description},
    {name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'},
    {name: 'viewport', content: 'width=device-width, initial-scale=1'},
    {name: 'charset', content: 'utf-8'},
    {name: 'theme-color', content: '#87CEEB'},
    {rel: 'canonical', href: `https://brinqueteando.online/collections/${handle}`},
    {rel: 'alternate', href: `https://brinqueteando.online/collections/${handle}`, hreflang: 'pt-br'},
  ];
};

// ✅ NEW: Helper function to fetch ALL products with pagination
async function fetchAllProducts(storefront, handle, country, language) {
let allProducts = [];
let hasNextPage = true;
let cursor = null;

while (hasNextPage) {
const {collection} = await storefront.query(COLLECTION_QUERY, {
variables: {
handle,
country,
language,
cursor,
first: 250, // Max allowed by Shopify per request
      },
    });

if (!collection) break;

allProducts = [...allProducts, ...collection.products.edges.map(edge => edge.node)];
hasNextPage = collection.products.pageInfo.hasNextPage;
cursor = collection.products.pageInfo.endCursor;

// Safety check to prevent infinite loops
if (allProducts.length > 10000) break;
  }

return allProducts;
}

export async function loader({context, params}) {
const {storefront} = context;
// ✅ CHANGED: Fetch ALL products using pagination
const allProducts = await fetchAllProducts(
storefront,
params.handle,
context.storefront.i18n.country,
context.storefront.i18n.language
  );

// Fetch collection info separately
const {collection} = await storefront.query(COLLECTION_INFO_QUERY, {
variables: {
handle: params.handle,
country: context.storefront.i18n.country,
language: context.storefront.i18n.language,
    },
  });

// Fetch footer menu from backend
const {menu: footerMenu} = await storefront.query(FOOTER_MENU_QUERY, {
variables: { footerMenuHandle: 'footer' }
  });

// Fetch main navigation menu from backend
const {menu} = await storefront.query(MENU_QUERY);

if (!collection) {
throw new Response(null, {status: 404});
  }

// Inject products into collection object
collection.products = { nodes: allProducts };

return {collection, menu, footerMenu, handle: params.handle};
}

export default function CollectionPage() {
const {collection, menu, footerMenu, handle} = useLoaderData();
const rootData = useRouteLoaderData('root');
const [quickViewProduct, setQuickViewProduct] = useState(null);
const [sortBy, setSortBy] = useState('newest');



const filteredProducts = useMemo(() => {
  const products = Array.isArray(collection.products?.nodes)
    ? collection.products.nodes
    : [];

  if (handle === 'under-100') {
    return products.filter((product) => {
      const amount = parseFloat(product?.priceRange?.minVariantPrice?.amount);
      return Number.isFinite(amount) && amount < 100;
    });
  }

  return products;
}, [collection.products?.nodes, handle]);

// Sort products based on selection
const sortedProducts = useMemo(() => {
const products = [...filteredProducts];
switch(sortBy) {
case 'price-low':
return products.sort((a, b) =>
parseFloat(a.priceRange.minVariantPrice.amount) - parseFloat(b.priceRange.minVariantPrice.amount)
        );
case 'price-high':
return products.sort((a, b) =>
parseFloat(b.priceRange.minVariantPrice.amount) - parseFloat(a.priceRange.minVariantPrice.amount)
        );
case 'newest':
default:
return products;
    }
  }, [filteredProducts, sortBy]);

const productPrices = Array.isArray(filteredProducts)
  ? filteredProducts
      .map(p => parseFloat(p.priceRange.minVariantPrice.amount))
      .filter(price => Number.isFinite(price))
  : [];

const aggregateOffers =
  productPrices.length > 0
    ? {
        '@type': 'AggregateOffer',
        priceCurrency: 'USD',
        lowPrice: Math.min(...productPrices),
        highPrice: Math.max(...productPrices),
        offerCount: productPrices.length,
        availability: 'https://schema.org/InStock',
        areaServed: ['US', 'GB', 'CA', 'AU'],
      }
    : undefined;

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: collection.title,
  description: collection.description || undefined,
  url: `https://vastara.online/collections/${handle}`,
  image: collection.image?.url || undefined,
  offers: aggregateOffers,
  hasMerchantReturnPolicy: {
    '@type': 'MerchantReturnPolicy',
    returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
    merchantReturnDays: 30,
    returnMethod: 'https://schema.org/ReturnByMail',
    returnFees: 'https://schema.org/FreeReturn',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: `https://vastara.online/search?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

return (
<div className="min-h-screen bg-[#FEFDF8]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}}
      />

      {/* ============ NAVEGAÇÃO PRINCIPAL ============ */}
      <NavigationMenu rootData={rootData} />

      {/* ============ HEADER DA COLEÇÃO - COM TEMA TEA/TDAH ============ */}
      <section
        className="py-12 sm:py-16 px-4 sm:px-6 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #87CEEB 0%, #4A90E2 100%)'
        }}
      >
        {/* Elementos Decorativos - Puzzle Pieces */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-6xl animate-pulse">🧩</div>
          <div className="absolute bottom-10 right-10 text-6xl">⭐</div>
          <div className="absolute top-1/2 left-1/4 text-4xl">💙</div>
          <div className="absolute top-1/3 right-1/3 text-4xl">🌟</div>
          <div className="absolute bottom-1/4 left-1/3 text-4xl">🎯</div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-wide">
            {collection.title}
          </h1>
          {collection.description && (
            <p className="text-white text-base sm:text-lg max-w-2xl mx-auto text-center leading-relaxed opacity-95">
              {collection.description}
            </p>
          )}
          <p className="text-white text-xs sm:text-sm mt-6 font-semibold opacity-90">
            🧩 Mostrando {sortedProducts.length} produtos especializados para TEA e TDAH
          </p>
        </div>
      </section>

      {/* ============ BANNERS PROMOCIONAIS - PUZZLE COLORS ============ */}
      <section className="bg-white py-12 px-6 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Red - Puzzle Piece */}
            <div
              className="text-white p-6 rounded-2xl text-center shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              style={{background: 'linear-gradient(135deg, #FF6B6B 0%, #E53E3E 100%)'}}
            >
              <p className="text-xs tracking-widest uppercase font-bold text-yellow-300 mb-2">🎁 Selecionados</p>
              <p className="text-sm">Por terapeutas</p>
            </div>
            {/* Blue - Puzzle Piece */}
            <div
              className="text-white p-6 rounded-2xl text-center shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              style={{background: 'linear-gradient(135deg, #4A90E2 0%, #2B88D9 100%)'}}
            >
              <p className="text-xs tracking-widest uppercase font-bold text-yellow-300 mb-2">✨ Qualidade</p>
              <p className="text-sm">Materiais seguros</p>
            </div>
            {/* Yellow - Puzzle Piece */}
            <div
              className="p-6 rounded-2xl text-center shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              style={{
                background: 'linear-gradient(135deg, #FFD93D 0%, #FF9F43 100%)',
                color: '#2C3E50'
              }}
            >
              <p className="text-xs tracking-widest uppercase font-bold mb-2">🚚 Frete Grátis</p>
              <p className="text-sm">São Vicente, Santos e Praia Grande</p>
            </div>
            {/* Green - Accent */}
            <div
              className="text-white p-6 rounded-2xl text-center shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              style={{background: 'linear-gradient(135deg, #6BCF7F 0%, #4CAF50 100%)'}}
            >
              <p className="text-xs tracking-widest uppercase font-bold text-yellow-300 mb-2">💚 Parcelamento</p>
              <p className="text-sm">Em até 12x sem juros</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CONTROLES DE ORDENAÇÃO ============ */}
      <section className="max-w-7xl mx-auto px-6 py-6 border-b" style={{borderColor: '#E9ECEF'}}>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <p className="font-semibold" style={{color: '#2C3E50'}}>
            {sortedProducts.length} produtos encontrados
          </p>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium" style={{color: '#2C3E50'}}>
              Ordenar por:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border-2 px-4 py-2 rounded-lg focus:outline-none cursor-pointer text-sm"
              style={{borderColor: '#4A90E2', color: '#2C3E50'}}
            >
              <option value="newest">Mais Recentes</option>
              <option value="price-low">Preço: Menor para Maior</option>
              <option value="price-high">Preço: Maior para Menor</option>
            </select>
          </div>
        </div>
      </section>

      {/* ============ GRID DE PRODUTOS - TEMA TEA/TDAH ============ */}
      <section className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-8 sm:py-12 md:py-16 mb-12 sm:mb-16 md:mb-20">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
          {sortedProducts.map((product, index) => {
            const secondImage = product.media?.nodes?.[1]?.previewImage;
            return (
              <div key={product.id} className="group">
                <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-full flex flex-col">
                  {/* Badge - Especializado */}
                  <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-[#4A90E2] to-[#2B88D9] text-white px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0 shadow-lg">
                    Especializado
                  </div>

                  {/* Container da Imagem */}
                  <div className="relative aspect-square overflow-hidden" style={{background: 'linear-gradient(135deg, #FEFDF8 0%, #FFF9ED 100%)'}}>
                    <Link to={`/products/${getProductHandle(product.handle)}`} className="block w-full h-full">
                      {product.featuredImage && (
                        <div className="relative w-full h-full">
                          <Image
                            data={product.featuredImage}
                            className={`w-full h-full object-cover transition-all duration-700 ease-in-out z-10 relative ${secondImage ? 'group-hover:opacity-0' : 'group-hover:scale-110'}`}
                            alt={`${product.title} - Brinquedo TEA TDAH`}
                            loading={index < 4 ? "eager" : "lazy"}
                            fetchPriority={index < 4 ? "high" : "auto"}
                            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                          />
                          {secondImage && (
                            <Image
                              data={secondImage}
                              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out z-0 scale-105"
                              alt={`${product.title} - Vista Alternativa`}
                              loading="lazy"
                              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                            />
                          )}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"></div>
                    </Link>

                    {/* Botões Interativos */}
                    <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 z-30 pointer-events-none">
                      <button
                        onClick={(e) => { e.preventDefault(); setQuickViewProduct(product); }}
                        className="pointer-events-auto bg-white/95 backdrop-blur-md px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full font-semibold text-[10px] sm:text-xs md:text-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2"
                        style={{color: '#2C3E50', borderColor: '#4A90E2'}}
                        aria-label="Visualização rápida do produto"
                      >
                        Ver Rápido
                      </button>
                      <Link
                        to={`/products/${getProductHandle(product.handle)}`}
                        className="pointer-events-auto p-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2"
                        style={{backgroundColor: '#4A90E2', borderColor: '#4A90E2'}}
                        aria-label="Ver detalhes do produto"
                      >
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>

                    {/* Elemento Decorativo - Canto */}
                    <div className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{background: 'linear-gradient(135deg, #87CEEB 0%, transparent 100%)'}}></div>
                  </div>

                  {/* Informações do Produto */}
                  <div className="p-3 sm:p-4 md:p-6 space-y-2 sm:space-y-3 flex-grow flex flex-col justify-between">
                    <div>
                      {/* Badge de Categoria */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase" style={{background: 'linear-gradient(135deg, #87CEEB15 0%, #4A90E215 100%)', color: '#4A90E2'}}>
                          {product.vendor || 'BrinqueTEAndo'}
                        </span>
                        {/* Estrelas de Avaliação */}
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-3 h-3" style={{color: '#FFD93D'}} fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>

                      {/* Título do Produto */}
                      <Link to={`/products/${getProductHandle(product.handle)}`} className="block">
                        <h3 className="text-xs sm:text-sm md:text-base leading-tight mb-2 line-clamp-2 transition-colors duration-300" style={{color: '#2C3E50'}} classNameHover="#4A90E2">
                          {product.title}
                        </h3>
                      </Link>
                    </div>

                    {/* Preço e CTA */}
                    <div className="flex items-center justify-between pt-3 border-t mt-auto" style={{borderColor: '#E9ECEF'}}>
                      <div>
                        <Money
                          data={product.priceRange.minVariantPrice}
                          className="font-semibold text-lg"
                          style={{color: '#2C3E50'}}
                        />
                        <p className="text-xs mt-0.5" style={{color: '#6BCF7F'}}>Frete Gratis SP</p>
                      </div>
                      <Link
                        to={`/products/${product.handle}`}
                        className="text-sm font-semibold transition-colors flex items-center gap-1 group/link"
                        style={{color: '#4A90E2'}}
                      >
                        <span>Ver</span>
                        <svg className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>

                  {/* Linha de Destaque Inferior */}
                  <div className="h-1 bg-gradient-to-r from-transparent via-[#87CEEB] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-block p-8 bg-white rounded-2xl shadow-lg max-w-md">
              <div className="text-6xl mb-4">🧩</div>
              <p className="text-xl font-bold mb-2" style={{color: '#2C3E50'}}>
                Nenhum produto encontrado
              </p>
              <p style={{color: '#6b7280'}}>
                Esta coleção está sendo preparada. Volte em breve!
              </p>
            </div>
          </div>
        )}
      </section>

      {/* ============ QUICK VIEW MODAL - VISUALIZAÇÃO RÁPIDA ============ */}
      {quickViewProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in zoom-in-95 duration-300">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 z-10 transition-colors text-2xl"
              style={{color: '#2C3E50'}}
              onMouseEnter={(e) => e.target.style.color = '#4A90E2'}
              onMouseLeave={(e) => e.target.style.color = '#2C3E50'}
              aria-label="Fechar visualização rápida"
            >
              ✕
            </button>
            <div className="relative aspect-square overflow-hidden rounded-t-2xl" style={{background: 'linear-gradient(135deg, #FEFDF8 0%, #FFF9ED 100%)'}}>
              {quickViewProduct.featuredImage && (
                <Image
                  data={quickViewProduct.featuredImage}
                  className="w-full h-full object-cover"
                  alt={quickViewProduct.title}
                />
              )}
            </div>
            <div className="p-6">
              <p className="text-xs tracking-widest uppercase font-semibold mb-2" style={{color: '#4A90E2'}}>
                {quickViewProduct.vendor || 'BrinqueTEAndo'}
              </p>
              <h2 className="text-xl font-bold mb-3" style={{color: '#2C3E50'}}>
                {quickViewProduct.title}
              </h2>
              <Money
                data={quickViewProduct.priceRange.minVariantPrice}
                className="font-medium text-lg mb-4"
                style={{color: '#2C3E50'}}
              />
              {/* Descrição Inteligente */}
              <div className="rounded-lg p-4 mb-6" style={{background: '#F8F9FA'}}>
                <p className="text-sm leading-relaxed" style={{color: '#2C3E50'}}>
                  {generateSmartDescription(quickViewProduct)}
                </p>
              </div>
              {/* Características Principais */}
              <div className="mb-6 space-y-2">
                <div className="flex items-center gap-2 text-sm" style={{color: '#2C3E50'}}>
                  <svg className="w-4 h-4" style={{color: '#4A90E2'}} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span>Recomendado por terapeutas</span>
                </div>
                <div className="flex items-center gap-2 text-sm" style={{color: '#2C3E50'}}>
                  <svg className="w-4 h-4" style={{color: '#FFD93D'}} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span>Materiais seguros e duráveis</span>
                </div>
                <div className="flex items-center gap-2 text-sm" style={{color: '#2C3E50'}}>
                  <svg className="w-4 h-4" style={{color: '#6BCF7F'}} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span>Frete grátis para São Vicente, Santos e Praia Grande</span>
                </div>
              </div>
              {/* Botão Ver Detalhes */}
              <Link
                to={`/products/${getProductHandle(quickViewProduct.handle)}`}
                onClick={() => setQuickViewProduct(null)}
                className="w-full py-4 rounded-full font-semibold transition-all text-center block shadow-lg hover:shadow-xl transform hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #4A90E2 0%, #2B88D9 100%)',
                  color: '#FFFFFF'
                }}
              >
                VER DETALHES COMPLETOS →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ============ FOOTER - TEMA TEA/TDAH ============ */}
      <VastaraFooter menu={footerMenu} />
    </div>
  );
}

// Função Geradora de Descrição Inteligente para TEA/TDAH
function generateSmartDescription(product) {
  const title = product.title.toLowerCase();
  const vendor = (product.vendor || '').toLowerCase();

  // Palavras-chave para detectar tipo de produto
  const isSensorial = title.includes('sensorial') || title.includes('textura') || title.includes('luz') || title.includes('som');
  const isFidget = title.includes('fidget') || title.includes('anti-stress') || title.includes('antiestresse');
  const isRotina = title.includes('rotina') || title.includes('agenda') || title.includes('organiza') || title.includes('calendário');
  const isComunicacao = title.includes('comunica') || title.includes('caa') || title.includes('picto') || title.includes('expressão');
  const isMotora = title.includes('motora') || title.includes('coordena') || title.includes('motricidade') || title.includes('movimento');
  const isSocial = title.includes('social') || title.includes('intera') || title.includes('jogo') || title.includes('em conjunto');

  // Gerar descrições contextuais em Português
  if (isSensorial) {
    return "Brinquedo sensorial especialmente desenvolvido para estimular os sentidos de forma segura e divertida. Auxilia na regulação sensorial, no desenvolvimento cognitivo e no processamento de informações sensoriais. Ideal para crianças com TEA e necessidades sensoriais específicas.";
  }
  if (isFidget) {
    return "Fidget toy projetado para melhorar o foco, a atenção e a concentração. Ajuda a canalizar energia excessiva, reduzir a ansiedade e promover autorregulação. Recomendado por terapeutas ocupacionais para crianças com TDAH e necessidade de movimento constante.";
  }
  if (isRotina) {
    return "Ferramenta visual de organização e rotina que ajuda a criar previsibilidade e autonomia. Facilita a compreensão de sequências, reduz ansiedade e promove independência nas atividades diárias. Essencial para estruturação do tempo e organização de tarefas.";
  }
  if (isComunicacao) {
    return "Recurso de comunicação alternativa e aumentativa que apoia o desenvolvimento da linguagem e expressão. Facilita a interação, compreensão e comunicação de necessidades e desejos. Ideal para crianças em desenvolvimento de fala e comunicação não-verbal.";
  }
  if (isMotora) {
    return "Brinquedo focado no desenvolvimento da coordenação motora fina e ampla. Estimula o controle muscular, a destreza manual, o equilíbrio e a percepção espacial. Desenvolvido por terapeutas para tornar o aprendizado motor divertido e efetivo.";
  }
  if (isSocial) {
    return "Jogo educativo que promove habilidades sociais, interação e trabalho em equipe. Desenvolve empatia, tomada de turnos, comunicação e resolução de problemas em grupo. Perfeito para facilitar interações sociais positivas de forma lúdica.";
  }

  // Descrição padrão de fallback
  return "Produto especializado desenvolvido com foco nas necessidades de crianças com TEA, TDAH e neurodiversidade. Materiais seguros, design inclusivo e eficácia comprovada por profissionais da área. Frete grátis para São Vicente, Santos e Praia Grande.";
}

// Componente Footer com tema TEA/TDAH - Puzzle Colors
function VastaraFooter({ menu }) {
  const menuItems = menu?.items || [];
  return (
    <footer
      className="relative text-white overflow-hidden"
      style={{background: 'linear-gradient(135deg, #87CEEB 0%, #4A90E2 100%)'}}  // Sky Blue dominant
    >
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #FFD93D 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-3" style={{color: '#FFD93D'}}>
                🧩 BrinqueTEAndo Newsletter
              </h3>
              <p className="text-white/90 text-base">
                Receba novidades, dicas e ofertas especiais sobre TEA, TDAH e neurodiversidade.
              </p>
            </div>
            <div className="flex gap-2 max-w-md">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 px-4 py-3 rounded-lg text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
              <button
                className="px-6 py-3 rounded-lg font-bold text-white hover:shadow-xl transition-all transform hover:scale-105"
                style={{background: 'linear-gradient(135deg, #FF6B6B 0%, #FFD93D 100%)'}}  // Puzzle gradient
              >
                Inscrever
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo e Sobre */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4 group">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-3xl">
                  🧩
                </div>
                <div>
                  <div className="text-xl font-bold">BrinqueTEAndo</div>
                  <div className="text-xs opacity-90">TEA • TDAH • Neurodiversidade</div>
                </div>
              </div>
            </Link>
            <p className="text-white/90 text-sm leading-relaxed mb-4">
              Produtos especializados para TEA, TDAH e autismo. Brinquedos sensoriais, comunicação alternativa, rotina visual e mais. Frete grátis para São Vicente, Santos e Praia Grande.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-lg">✓</span>
                <span>Recomendado por terapeutas</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-lg">✓</span>
                <span>Frete grátis São Vicente, Santos e Praia Grande</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-lg">✓</span>
                <span>Parcelamento em até 12x sem juros</span>
              </div>
            </div>
          </div>

          {/* Categorias */}
          <div>
            <h3 className="text-sm font-bold mb-4 uppercase tracking-wider" style={{color: '#FFD93D'}}>
              Categorias
            </h3>
            <ul className="space-y-2">
              <li><Link to="/search?q=sensorial" className="text-white/90 hover:text-yellow-300 text-sm transition-all duration-200">Brinquedos Sensoriais</Link></li>
              <li><Link to="/search?q=fidget" className="text-white/90 hover:text-yellow-300 text-sm transition-all duration-200">Fidget Toys</Link></li>
              <li><Link to="/search?q=comunica%C3%A7%C3%A3o" className="text-white/90 hover:text-yellow-300 text-sm transition-all duration-200">Comunicação Alternativa</Link></li>
              <li><Link to="/search?q=rotina" className="text-white/90 hover:text-yellow-300 text-sm transition-all duration-200">Rotina e Organização</Link></li>
              <li><Link to="/search?q=coordena%C3%A7%C3%A3o%20motora" className="text-white/90 hover:text-yellow-300 text-sm transition-all duration-200">Coordenação Motora</Link></li>
            </ul>
          </div>

          {/* Necessidades */}
          <div>
            <h3 className="text-sm font-bold mb-4 uppercase tracking-wider" style={{color: '#FFD93D'}}>
              Por Necessidade
            </h3>
            <ul className="space-y-2">
              <li><Link to="/search?q=tea" className="text-white/90 hover:text-yellow-300 text-sm transition-all duration-200">TEA (Autismo)</Link></li>
              <li><Link to="/search?q=tdah" className="text-white/90 hover:text-yellow-300 text-sm transition-all duration-200">TDAH</Link></li>
              <li><Link to="/search?q=ansiedade" className="text-white/90 hover:text-yellow-300 text-sm transition-all duration-200">Ansiedade Infantil</Link></li>
              <li><Link to="/search?q=socializa%C3%A7%C3%A3o" className="text-white/90 hover:text-yellow-300 text-sm transition-all duration-200">Habilidades Sociais</Link></li>
              <li><Link to="/search?q=desenvolvimento" className="text-white/90 hover:text-yellow-300 text-sm transition-all duration-200">Desenvolvimento Cognitivo</Link></li>
            </ul>
          </div>

          {/* Suporte */}
          <div>
            <h3 className="text-sm font-bold mb-4 uppercase tracking-wider" style={{color: '#FFD93D'}}>
              Ajuda
            </h3>
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.url}
                    className="text-white/90 hover:text-yellow-300 text-sm transition-all duration-200"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
              <li><Link to="/blogs/news" className="text-white/90 hover:text-yellow-300 text-sm transition-all duration-200">Blog & Dicas</Link></li>
              <li><Link to="/pages/contato" className="text-white/90 hover:text-yellow-300 text-sm transition-all duration-200">Fale Conosco</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-white/90">
              © {new Date().getFullYear()} BrinqueTEAndo. Todos os direitos reservados. Feito com 💙 para neurodiversidade.
            </p>
            <div className="flex items-center gap-3">
              <span className="text-yellow-300">★★★★★</span>
              <span className="text-white/90">Recomendado por famílias e terapeutas</span>
            </div>
          </div>
        </div>
      </div>

      <div className="h-1 bg-gradient-to-r from-transparent via-[#FFD93D] to-transparent"></div>
    </footer>
  );
}

// ✅ GRAPHQL UPDATED FOR CUTTING EDGE FEATURE (MEDIA HOVER)
const COLLECTION_QUERY = `#graphql
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $cursor: String
    $first: Int = 250
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      products(first: $first, after: $cursor) {
        edges {
          node {
            id
            title
            handle
            vendor
            description
            featuredImage {
              id
              url
              altText
              width
              height
            }
            # FETCHING 2ND IMAGE FOR HOVER REVEAL EFFECT
            media(first: 2, sortKey: POSITION) {
              nodes {
                ... on MediaImage {
                  previewImage {
                    id
                    url
                    altText
                    width
                    height
                  }
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

const COLLECTION_INFO_QUERY = `#graphql
  query CollectionInfo(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      title
      description
      image {
        url
      }
    }
  }
`;

const FOOTER_MENU_QUERY = `#graphql
  fragment CollectionFooterMenuItem on MenuItem {
    id
    title
    url
    type
    items {
      id
      title
      url
      type
    }
  }
  query CollectionFooterMenu($footerMenuHandle: String!) {
    menu(handle: $footerMenuHandle) {
      id
      items {
        ...CollectionFooterMenuItem
      }
    }
  }
`;

const MENU_QUERY = `#graphql
  query Menu {
    menu(handle: "main-menu") {
      items {
        title
        url
      }
    }
  }
`;
