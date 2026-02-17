import {useLoaderData, Link} from 'react-router';
import {
  Pagination,
  getPaginationVariables,
  Image,
  Money,
} from '@shopify/hydrogen';
import {useState, useEffect} from 'react';
import {useAside} from '~/components/Aside';
import {useCountdown} from '~/lib/useCountdown'; // ✅ FIX: Importar hook otimizado
import {AddToCartButton} from '~/components/AddToCartButton';

// --- COMPONENTES AUXILIARES ---

// 1. Componente Modal Quick View
/g, '');
  c = c.replace(/\s+/g, ' ').trim();

function QuickViewModal({ product, onClose }) {
  console.log('[QUICK VIEW MODAL] Rendering, product:', product?.title);
  const {open} = useAside();

  // ✅ FIX: Bloquear scroll do body quando modal aberto
  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [product]);

  // ✅ FIX: ESC key para fechar
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && product) {
        onClose();
      }
    };

    if (product) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => document.removeEventListener('keydown', handleEscape);
  }, [product, onClose]);

  if (!product) return null;

  const variantId = product.variants?.nodes?.[0]?.id;
  const availableForSale = product.variants?.nodes?.[0]?.availableForSale ?? true;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-view-title"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col md:flex-row animate-fade-up max-h-[90vh] md:max-h-[80vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-500 hover:bg-[#FB8A38] hover:text-white transition-colors"
          aria-label="Fechar"
        >
          ✕
        </button>

        <div className="w-full md:w-1/2 bg-[#f4f4f4] relative flex-shrink-0">
          {product.featuredImage && (
            <Image
              data={product.featuredImage}
              className="w-full h-full object-cover aspect-square md:aspect-auto"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          )}
          <div className="absolute bottom-2 left-2 bg-[#3A8ECD] text-white text-xs px-2 py-1 rounded font-bold">
            Espiadinha Rápida
          </div>
        </div>

        <div className="w-full md:w-1/2 p-8 flex flex-col justify-between flex-grow">
          <div>
            <h2 id="quick-view-title" className="text-2xl font-black text-[#3A8ECD] mb-2">{product.title}</h2>
            <div className="text-xl font-bold text-[#FB8A38] mb-4">
              <Money data={product.priceRange.minVariantPrice} />
            </div>
            <div className="h-px bg-gray-200 w-full mb-4"></div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Descrição Resumida:</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">{"Confira todos os detalhes na pagina do produto."}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">✓ Em Estoque</span>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">⚡ Envio Imediato</span>
            </div>
          </div>

          {/* ✅ FIX: Adicionar botão de Adicionar ao Carrinho */}
          <div className="flex flex-col gap-3">
            {variantId && (
              <AddToCartButton
                lines={[{merchandiseId: variantId, quantity: 1}]}
                disabled={!availableForSale}
                className="w-full bg-[#3A8ECD] text-white py-3 rounded-lg font-bold hover:bg-[#2c7bb5] transition-colors"
              >
                🛒 Adicionar ao Carrinho
              </AddToCartButton>
            )}
            <Link
              to={`/products/${product.handle}`}
              onClick={onClose}
              className="w-full block text-center border-2 border-[#3A8ECD] text-[#3A8ECD] py-3 rounded-lg font-bold hover:bg-[#3A8ECD] hover:text-white transition-colors"
            >
              Ver Detalhes Completos →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. Componente Card de Produto
function ProductCard({product, onQuickView}) {
  const {open} = useAside();

  const variantId = product.variants?.nodes?.[0]?.id;
  const availableForSale = product.variants?.nodes?.[0]?.availableForSale ?? true;

  return (
    <div className="group bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-[#3A8ECD]/30 transition-all duration-300 flex flex-col">
      <div className="relative aspect-square overflow-hidden rounded-t-xl bg-gray-100">
        {product.featuredImage && (
          <Image
            data={product.featuredImage}
            aspectRatio="1/1"
            sizes="(min-width: 45em) 20vw, 50vw"
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
          />
        )}
        <div
          className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-end justify-center pb-4 cursor-pointer"
        >
          <button 
            className="z-50 opacity-100 md:opacity-0 md:group-hover:opacity-100 transform translate-y-4 md:translate-y-0 md:group-hover:translate-y-0 transition-all duration-300 bg-[#FB8A38] text-white font-bold px-4 py-2 rounded-full shadow-lg hover:bg-[#3A8ECD] hover:scale-105"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('[QUICK VIEW] Button clicked for product:', product.title);
              onQuickView(product);
            }}
          >
            👁️ Espiar
          </button>
        </div>
        {product.compareAtPriceRange?.minVariantPrice?.amount > product.priceRange.minVariantPrice.amount && (
            <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded">
                OFERTA
            </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-[#3A8ECD] font-bold text-sm mb-1 line-clamp-2 min-h-[2.5rem]">
          <Link to={`/products/${product.handle}`} className="hover:underline">
            {product.title}
          </Link>
        </h3>
        <div className="mt-auto pt-2 flex items-center justify-between gap-2">
          <span className="text-gray-900 font-bold text-lg">
            <Money data={product.priceRange.minVariantPrice} />
          </span>
          <div className="flex items-center gap-2">
            {/* ✅ FIX: Botão de adicionar ao carrinho */}
            {variantId && (
              <AddToCartButton
                lines={[{merchandiseId: variantId, quantity: 1}]}
                disabled={!availableForSale}
                className="w-8 h-8 rounded-full bg-[#3A8ECD] text-white flex items-center justify-center hover:bg-[#2c7bb5] transition-colors p-0 disabled:opacity-50"
              >
                +
              </AddToCartButton>
            )}
            <Link
               to={`/products/${product.handle}`}
               className="w-8 h-8 rounded-full bg-[#FB8A38] text-white flex items-center justify-center hover:bg-[#e07b30] transition-colors text-sm"
            >
              →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- LOADER & META ---

export const meta = ({data}) => {
  return [
    {title: `brinqueTEAndo | ${data?.collection?.title ?? 'Coleção'}`},
    {name: 'description', content: data?.collection?.description ?? 'Brinquedos educativos e sensoriais.'},
  ];
};

export async function loader({context, params, request}) {
  const {handle} = params;
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 8, 
  });

  if (!handle) {
    throw new Response(null, {
        status: 302,
        headers: { Location: '/collections' }
    });
  }

  // ✅ FIX: Adicionar variáveis country e language para @inContext
  const {collection} = await storefront.query(COLLECTION_QUERY, {
    variables: {
      handle,
      country: 'BR',
      language: 'PT',
      ...paginationVariables
    },
  });

  if (!collection) {
    throw new Response('Collection Not Found', {status: 404});
  }

  // --- MANUAL FALLBACK MENU (Para garantir que apareça) ---
  const footerMenu = {
    id: 'custom-footer-manual',
    items: [
      {
        id: 'group-1',
        title: '🧸 BrinqueTEAndo',
        items: [
          { id: 'l1', title: 'Quem é Margareth Almeida', url: '/pages/quem-e-margareth-almeida' },
          { id: 'l2', title: 'Leve a BrinqueTEAndo até Você', url: '/pages/leve-a-brinqueteando-ate-voce' },
          { id: 'l3', title: 'Seja Revendedor BrinqueTEAndo', url: '/pages/seja-revendedor-brinqueteando' },
          { id: 'l4', title: 'Guias práticos', url: '/pages/guias-praticos' },
        ]
      },
      {
        id: 'group-2',
        title: '💡 Conteúdos',
        items: [
          { id: 'l5', title: 'Como escolher brinquedos', url: '/pages/como-escolher-brinquedos' },
          { id: 'l6', title: 'Dicas para TDAH e TEA', url: '/pages/dicas-para-tdah-e-tea' },
          { id: 'l7', title: 'FAQ', url: '/pages/faq' },
        ]
      },
      {
        id: 'group-3',
        title: '📦 Ajuda',
        items: [
          { id: 'l8', title: 'Contact', url: '/pages/contact' },
          { id: 'l9', title: 'Política de Envio', url: '/pages/politica-de-envio' },
          { id: 'l10', title: 'Política de Devolução', url: '/pages/politica-de-devolucao' },
        ]
      },
      {
        id: 'group-4',
        title: '🔒 Legal',
        items: [
          { id: 'l11', title: 'Política de Privacidade', url: '/policies/politica-de-privacidade' },
          { id: 'l12', title: 'Política de Cookies', url: '/policies/politica-de-cookies' },
          { id: 'l13', title: 'Aviso Legal', url: '/pages/aviso-legal' },
        ]
      }
    ]
  };

  const {cart} = context;

  return {
    collection,
    footerMenu,
    cart: cart.get(),
  };
}

// --- COMPONENTE PRINCIPAL ---

export default function Collection() {
  const {collection, footerMenu, cart} = useLoaderData();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const {open} = useAside();

  // Estados do Header
  // ✅ FIX: Usar hook useCountdown otimizado com requestAnimationFrame
  const {timeLeft, isMounted} = useCountdown();

  const [currentPromo, setCurrentPromo] = useState(0);

  const promoMessages = [
    "🚚 Frete grátis para toda Baixada Santista!",
    "⭐ brinqueTEAando REWARDS — Ganhe pontos!",
    "🎁 Trocas e devoluções facilitadas",
    "🎅 Use o código BEMVINDO10 e ganhe 10% OFF"
  ];

  // ✅ FIX: Removido calculateHolidayCountdown - usando hook useCountdown agora

  useEffect(() => {
    const promoTimer = setInterval(() => setCurrentPromo((p) => (p + 1) % promoMessages.length), 4000);
    return () => clearInterval(promoTimer);
  }, []);

  return (
      <div className="flex flex-col min-h-screen bg-[#FEFDF8]">
        
        {/* --- HEADER --- */}
        
        {/* Top Bar with Countdown */}
        <div className="bg-[#3A8ECD] text-white py-3 text-center w-full">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-4 flex-wrap">
              <span className="text-sm md:text-base font-bold tracking-wide">
                {timeLeft.holiday?.emoji} {timeLeft.holiday?.message} {timeLeft.holiday?.emoji}
              </span>
              <div className="flex items-center gap-2 border-2 border-white px-4 py-1 bg-white/20">
                <span className="text-2xl font-bold">{String(timeLeft.days).padStart(2, '0')}</span><span className="text-xs">D</span>
                <span className="text-2xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</span><span className="text-xs">H</span>
                <span className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</span><span className="text-xs">M</span>
                <span className="text-2xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</span><span className="text-xs">S</span>
              </div>
            </div>
        </div>

        {/* Promo Marquee */}
        <div className="w-full bg-[#3A8ECD] border-y-2 border-[#FB8A38] overflow-hidden py-3 relative z-20 shadow-lg">
            <div className="absolute inset-0 pointer-events-none opacity-10" style={{backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '15px 15px'}}></div>
            <style>{`
                @keyframes marquee-christmas {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
                .animate-marquee-christmas {
                  display: flex;
                  width: fit-content;
                  animation: marquee-christmas 60s linear infinite;
                }
                .animate-marquee-christmas:hover {
                  animation-play-state: paused;
                }
            `}</style>
            <div className="animate-marquee-christmas flex items-center">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="flex items-center mx-8 whitespace-nowrap">
                  <span className="text-2xl mr-3 filter drop-shadow-md">🎭</span>
                  <span className="text-[#FEFDF8] font-serif italic text-xl tracking-widest font-medium uppercase drop-shadow-md" style={{textShadow: '0 1px 2px rgba(0,0,0,0.5)'}}>
                     🧩 III Jornada Autismo Baixada Santista - 29/03 em Santos! 🎪 ExpoTEA 2025 em Novembro - SP! 🎤 Congresso Vozes do Autismo - Datas em Breve Disponível
                  </span>
                  <span className="text-2xl ml-3 filter drop-shadow-md">🎪</span>
                  <div className="ml-8 flex items-center gap-2 opacity-70">
                    <span className="text-[#FB8A38] text-xs">✦</span>
                    <span className="w-16 h-[1px] bg-[#FB8A38]"></span>
                    <span className="text-[#FB8A38] text-xs">✦</span>
                  </div>
                </div>
              ))}
            </div>
        </div>

        {/* Main Navigation - ORGANIZADA E COM LOGO NOVA */}
        <nav className="bg-white shadow-sm sticky top-0 z-50 w-full border-b-4 border-[#3A8ECD]">
          <div className="max-w-7xl mx-auto px-3 py-3 sm:px-6 sm:py-4">
             <div className="flex items-center justify-between gap-2 sm:gap-4">
                
                {/* LOGO */}
                <Link to="/" className="flex items-center group flex-shrink-0">
                    <img 
                      src="https://cdn.shopify.com/s/files/1/0973/7116/0942/files/ChatGPT_Image_Jan_5__2026__01_21_24_PM-removebg-preview_96f44aed-45b5-43f6-86b1-9b1039d9e94b.png?v=1769926918" 
                      alt="brinqueTEAando" 
                      className="h-16 sm:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                </Link>

                {/* Desktop Menu - Organizado e com espaçamento */}
                <div className="hidden lg:flex items-center gap-6 flex-1 justify-center">
                   {[
                     {name: 'INÍCIO', href: '/'},
                     {name: 'Brinquedos Terapêuticos', href: '/collections/brinquedos-terapeuticos'},
                     {name: 'Por Necessidade', href: '/collections/por-necessidade'},
                     {name: 'Por Idade', href: '/collections/por-idade'},
                     {name: 'Ambiente & Rotina', href: '/collections/ambiente-rotina'},
                     {name: 'Apoio aos Pais', href: '/collections/apoio-aos-pais'},
                     {name: 'CONTATO', href: '/pages/contact'}
                   ].map(item => (
                     <Link key={item.name} to={item.href} className="text-[#3A8ECD] font-bold text-sm hover:text-[#FB8A38] hover:underline decoration-2 underline-offset-4 transition-all uppercase tracking-wide whitespace-nowrap">
                       {item.name}
                     </Link>
                   ))}
                </div>

                {/* Cart & Mobile Toggle */}
                <div className="flex items-center gap-4">
                   <Link to="/account" className="text-[#3A8ECD] hover:text-[#FB8A38] text-[10px] sm:text-xs font-medium whitespace-nowrap transition-colors px-1 sm:px-2">Entrar</Link>
                   <button onClick={() => open('cart')} className="relative group">
                      <span className="text-2xl">🛒</span>
                      <span className="absolute -top-2 -right-2 bg-[#FB8A38] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white group-hover:scale-110 transition-transform">
                        {cart?.totalQuantity || 0}
                      </span>
                   </button>
                   <button 
                    onClick={() => {
                      const menu = document.getElementById('mobile-menu');
                      menu.classList.toggle('hidden');
                    }}
                    className="lg:hidden text-[#3A8ECD] p-2"
                    aria-label="Toggle menu"
                   >
                    <span className="text-2xl">☰</span>
                   </button>
                </div>
             </div>

             {/* Mobile Menu - COMPLETO */}
             <div id="mobile-menu" className="hidden lg:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-xl z-50">
                <div className="flex flex-col p-4">
                   {[
                     {name: 'INÍCIO', href: '/'},
                     {name: 'Brinquedos Terapêuticos', href: '/collections/brinquedos-terapeuticos'},
                     {name: 'Por Necessidade', href: '/collections/por-necessidade'},
                     {name: 'Por Idade', href: '/collections/por-idade'},
                     {name: 'Ambiente & Rotina', href: '/collections/ambiente-rotina'},
                     {name: 'Apoio aos Pais', href: '/collections/apoio-aos-pais'},
                     {name: 'CONTATO', href: '/pages/contact'}
                   ].map(item => (
                     <Link 
                       key={item.name} 
                       to={item.href} 
                       className="text-[#3A8ECD] text-sm font-semibold tracking-wide hover:text-[#FB8A38] transition-colors py-2 border-b border-gray-200 uppercase"
                       onClick={() => {
                         const menu = document.getElementById('mobile-menu');
                         menu.classList.add('hidden');
                       }}
                     >
                       {item.name}
                     </Link>
                   ))}
                </div>
             </div>
          </div>
        </nav>

        {/* Promo Bar (Laranja) */}
        <div className="bg-[#FB8A38] text-white py-2 overflow-hidden shadow-md relative z-40">
           <div className="flex justify-center items-center transition-all duration-500 transform translate-y-0 opacity-100">
             <span className="font-bold text-sm tracking-wide flex items-center gap-2">
               {promoMessages[currentPromo]}
             </span>
           </div>
        </div>

        {/* --- MAIN CONTENT: COLEÇÃO --- */}
        <main className="flex-grow container mx-auto px-4 py-8">
            
            {/* Banner/Título da Coleção */}
            <div className="mb-8 text-center bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h1 className="text-3xl md:text-5xl font-black text-[#3A8ECD] mb-4">
                    {collection.title}
                </h1>
                {collection.description && (
                    <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        {collection.description}
                    </p>
                )}
            </div>

            {/* Grid de Produtos */}
            <Pagination connection={collection.products}>
                {({nodes, isLoading, PreviousLink, NextLink}) => (
                <>
                    <div className="flex justify-center mb-6">
                       <PreviousLink className="px-4 py-2 bg-white border border-[#3A8ECD] text-[#3A8ECD] rounded-full hover:bg-[#3A8ECD] hover:text-white transition-colors">
                          ← Carregar Anteriores
                       </PreviousLink>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                        {nodes.map((product) => (
                            <ProductCard 
                                key={product.id} 
                                product={product} 
                                onQuickView={setSelectedProduct} 
                            />
                        ))}
                    </div>
                    <div className="flex justify-center mt-8">
                       <NextLink className="px-6 py-3 bg-[#3A8ECD] text-white font-bold rounded-full shadow-lg hover:bg-[#2c7bb5] transition-transform hover:scale-105">
                          Carregar Mais Brinquedos ↓
                       </NextLink>
                    </div>
                </>
                )}
            </Pagination>
        </main>

        {/* --- QUICK VIEW MODAL --- */}
        {selectedProduct && (
            <QuickViewModal 
                product={selectedProduct} 
                onClose={() => setSelectedProduct(null)} 
            />
        )}

        {/* FOOTER CLEAN E CENTRALIZADO */}
        <footer className="bg-[#FEFDF8] pt-20 pb-10 border-t-4 border-[#3A8ECD] w-full">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16 text-center">
             
             {footerMenu.items.map((group) => (
               <div key={group.id} className="flex flex-col items-center">
                  
                  {/* Título Clean */}
                  <h3 className="font-bold text-[#0A3D2F] text-lg tracking-widest uppercase mb-6 border-b-2 border-transparent hover:border-[#FB8A38] transition-all duration-300 pb-2 inline-block">
                    {group.title}
                  </h3>

                  {/* Lista Centralizada */}
                  <ul className="flex flex-col gap-4 text-sm text-gray-500 w-full">
                    {group.items.map((link) => (
                      <li key={link.id} className="w-full">
                        <Link 
                          to={link.url} 
                          className="hover:text-[#FB8A38] hover:font-medium transition-all duration-200 block py-1"
                        >
                          {link.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
               </div>
             ))}

          </div>

          {/* Copyright Centralizado */}
          <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
              <p className="text-center md:text-left">&copy; {new Date().getFullYear()} brinqueTEAndo. Todos os direitos reservados.</p>
              <div className="flex gap-6 justify-center">
                <span className="cursor-pointer hover:text-[#3A8ECD] transition-colors">Privacidade</span>
                <span className="cursor-pointer hover:text-[#3A8ECD] transition-colors">Termos de Uso</span>
              </div>
          </div>
        </footer>
      </div>
  );
}

// --- GRAPHQL ---

const COLLECTION_QUERY = `#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment ProductItem on Product {
    id
    handle
    title
    # FETCH REAL DA DESCRIÇÃO - TRUNCADO EM 300 CARACTERES
    description(truncateAt: 300) 
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
    compareAtPriceRange {
      minVariantPrice {
        ...MoneyProductItem
      }
    }
    variants(first: 1) {
      nodes {
        id
        availableForSale
        selectedOptions {
          name
          value
        }
      }
    }
  }
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
        nodes {
          ...ProductItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          startCursor
          endCursor
        }
      }
    }
  }
`;

const FOOTER_MENU_QUERY = `#graphql
  fragment FooterMenuItem on MenuItem {
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
  query FooterMenu($footerMenuHandle: String!) {
    menu(handle: $footerMenuHandle) {
      id
      items {
        ...FooterMenuItem
      }
    }
  }
`;
