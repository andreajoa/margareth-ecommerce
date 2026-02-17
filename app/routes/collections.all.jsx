import {useLoaderData, Link, useFetcher, data} from 'react-router';
import {useState, useEffect} from 'react';
import {Image, Money, getPaginationVariables, Pagination} from '@shopify/hydrogen';
import {useAside} from '~/components/Aside';
import {AddToCartButton} from '~/components/AddToCartButton';

export async function loader({context, request}) {
  const {storefront, cart} = context;
  const paginationVariables = getPaginationVariables(request, {pageBy: 12});

  // ✅ FIX: Adicionar variáveis country e language para @inContext
  const {products} = await storefront.query(CATALOG_QUERY, {
    variables: {
      country: 'BR',
      language: 'PT',
      ...paginationVariables
    },
  });

  return data({
    products,
    cart: cart.get(), // Precisamos do carrinho para o Header
  });
}

// --- HELPER: JSON RESPONSE (para o footer/newsletter se precisar) ---
function json(data, init = {}) {
  return new Response(JSON.stringify(data), {
    status: init.status || 200,
    headers: {'Content-Type': 'application/json', ...init.headers},
  });
}

// --- QUICK VIEW MODAL COMPONENT ---
function QuickViewModal({ product, onClose }) {
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
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Descricao Resumida:</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              <div className="prose prose-sm max-w-none text-gray-600" dangerouslySetInnerHTML={{__html: (product.descriptionHtml || product.description || "Detalhes disponíveis na página do produto.").replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")}} />
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">✓ Em Estoque</span>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">⚡ Envio Imediato</span>
            </div>
          </div>

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

export default function CollectionAll() {
  const {products, cart} = useLoaderData();
  const {open} = useAside();
  const newsletterFetcher = useFetcher();
  const isNewsletterSuccess = newsletterFetcher.data?.status === 'success';
  const newsletterMessage = newsletterFetcher.data?.message || newsletterFetcher.data?.error;
  
  // Quick View state
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Estados do Header
  const [timeLeft, setTimeLeft] = useState({days: 0, hours: 0, minutes: 0, seconds: 0});
  const [currentHoliday, setCurrentHoliday] = useState({name: 'Evento', emoji: '🎉', message: 'COUNTDOWN'});
  const [currentPromo, setCurrentPromo] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  const promoMessages = [
    "🚚 Frete grátis para toda Baixada Santista!",
    "⭐ brinqueTEAando REWARDS — Ganhe pontos!",
    "🎁 Trocas e devoluções facilitadas",
    "🧠 Desenvolvimento e diversão para TEA e TDAH",
    "💎 Qualidade e Segurança garantidas",
    "🎅 Use o código BEMVINDO10 e ganhe 10% OFF"
  ];

  const calculateHolidayCountdown = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const holidays = [
      {name: 'III Jornada sobre Aprendizagem e Autismo - Baixada Santista', month: 2, day: 29, emoji: '🧩', message: 'III JORNADA AUTISMO BAIXADA SANTISTA - 29/03'},
      {name: 'ExpoTEA 2025 - Maior Feira de Autismo do Mundo', month: 10, day: 28, emoji: '🎪', message: 'EXPOTEA 2025 - MAIOR FEIRA DE AUTISMO DO MUNDO!'},
      {name: 'Dia Mundial do Autismo', month: 3, day: 2, emoji: '💙', message: 'DIA MUNDIAL DO AUTISMO - 02/04'},
    ];

    const upcomingHolidays = holidays.map(holiday => {
      let holidayDate = new Date(currentYear, holiday.month, holiday.day, 23, 59, 59);
      if (holidayDate.getTime() < now.getTime()) {
        holidayDate = new Date(currentYear + 1, holiday.month, holiday.day, 23, 59, 59);
      }
      return { ...holiday, date: holidayDate };
    });

    upcomingHolidays.sort((a, b) => a.date - b.date);
    const nextHoliday = upcomingHolidays[0];

    if (!nextHoliday) return {days: 0, hours: 0, minutes: 0, seconds: 0};

    const difference = nextHoliday.date.getTime() - now.getTime();
    if (difference > 0) {
      return {
        holiday: {
          name: nextHoliday.name,
          emoji: nextHoliday.emoji,
          message: nextHoliday.message
        },
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return {days: 0, hours: 0, minutes: 0, seconds: 0};
  };

  useEffect(() => {
    setIsMounted(true);
    const update = () => {
      const r = calculateHolidayCountdown();
      setTimeLeft({days: r.days, hours: r.hours, minutes: r.minutes, seconds: r.seconds});
      if (r.holiday) setCurrentHoliday(r.holiday);
    };
    update();
    const countdownInterval = setInterval(update, 1000);
    return () => clearInterval(countdownInterval);
  }, []);

  useEffect(() => {
    const promoTimer = setInterval(() => setCurrentPromo((p) => (p + 1) % promoMessages.length), 4000);
    return () => clearInterval(promoTimer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#FEFDF8] w-full overflow-x-hidden relative font-sans">
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

      {/* --- HEADER --- */}
      <div className="bg-[#3A8ECD] text-white py-3 text-center w-full relative z-50">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-4 flex-wrap">
          <span className="text-sm md:text-base font-bold tracking-wide">
            {currentHoliday?.emoji} {currentHoliday?.message} {currentHoliday?.emoji}
          </span>
          {isMounted ? (
            <div className="flex items-center gap-2 border-2 border-white px-4 py-1 bg-white/20">
              <span className="text-2xl font-bold">{String(timeLeft.days).padStart(2, '0')}</span><span className="text-xs">D</span>
              <span className="text-2xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</span><span className="text-xs">H</span>
              <span className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</span><span className="text-xs">M</span>
              <span className="text-2xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</span><span className="text-xs">S</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 border-2 border-white px-4 py-1 bg-white/20 opacity-50">
              <span className="text-2xl font-bold">00</span><span className="text-xs">D</span>
              <span className="text-2xl font-bold">00</span><span className="text-xs">H</span>
              <span className="text-2xl font-bold">00</span><span className="text-xs">M</span>
              <span className="text-2xl font-bold">00</span><span className="text-xs">S</span>
            </div>
          )}
        </div>
      </div>

      <div className="w-full bg-[#3A8ECD] border-y-2 border-[#FB8A38] overflow-hidden py-3 relative z-40 shadow-lg">
        <div className="absolute inset-0 pointer-events-none opacity-10" style={{backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '15px 15px'}}></div>
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

      <div className="bg-[#FB8A38] text-white py-3 overflow-hidden relative w-full z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative h-6 flex items-center justify-center">
            <div className="flex justify-center items-center transition-all duration-500 transform translate-y-0 opacity-100">
              <span className="font-bold text-sm tracking-wide flex items-center gap-2">
                {promoMessages[currentPromo]}
              </span>
            </div>
          </div>
        </div>
      </div>

      <nav className="bg-white shadow-sm sticky top-0 z-50 w-full border-b-4 border-[#3A8ECD]">
        <div className="max-w-7xl mx-auto px-3 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <Link to="/" className="flex items-center group flex-shrink-0">
              <img 
                src="https://cdn.shopify.com/s/files/1/0973/7116/0942/files/ChatGPT_Image_Jan_5__2026__01_21_24_PM-removebg-preview_96f44aed-45b5-43f6-86b1-9b1039d9e94b.png?v=1769926918" 
                alt="brinqueTEAando" 
                className="h-20 sm:h-24 md:h-32 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <div className="hidden lg:flex items-center gap-3 xl:gap-4 flex-1 justify-center overflow-x-auto">
              {[
                {name: 'INÍCIO', href: '/'},
                {name: 'Brinquedos Terapêuticos', href: '/collections/brinquedos-terapeuticos'},
                {name: 'Por Necessidade', href: '/collections/por-necessidade'},
                {name: 'Por Idade', href: '/collections/por-idade'},
                {name: 'Ambiente & Rotina', href: '/collections/ambiente-rotina'},
                {name: 'Apoio aos Pais', href: '/collections/apoio-aos-pais'},
                {name: 'CONTATO', href: '/pages/contact'}
              ].map(item => (
                <Link key={item.name} to={item.href} className="text-[#3A8ECD] text-[10px] xl:text-xs font-semibold tracking-wide hover:text-[#FB8A38] transition-all duration-300 relative group uppercase whitespace-nowrap flex-shrink-0">
                  <span>{item.name}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FB8A38] to-[#FBA25C] group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => open('cart')} className="relative group">
                <span className="text-2xl">🛒</span>
                <span className="absolute -top-2 -right-2 bg-[#FB8A38] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white group-hover:scale-110 transition-transform">
                  {cart?.totalQuantity || 0}
                </span>
              </button>
              <button onClick={() => open('menu')} className="lg:hidden text-[#3A8ECD] p-2" aria-label="Toggle menu">
                <span className="text-2xl">☰</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- CONTEÚDO PRINCIPAL --- */}
      <main className="flex-grow container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-12">
          <span className="text-[#FB8A38] font-bold text-sm tracking-widest uppercase mb-2 block animate-pulse">
            CATÁLOGO COMPLETO
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-[#3A8ECD] mb-4 tracking-tight drop-shadow-sm">
            Todos os Brinquedos
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Explore nossa seleção completa de brinquedos educativos e sensoriais, escolhidos com carinho para o desenvolvimento do seu filho.
          </p>
        </div>

        <Pagination connection={products}>
          {({nodes, isLoading, PreviousLink, NextLink}) => (
            <>
              <div className="flex justify-center mb-10 w-full">
                <PreviousLink className="group flex items-center gap-2 px-8 py-3 bg-white border-2 border-[#3A8ECD] text-[#3A8ECD] font-bold rounded-full hover:bg-[#3A8ECD] hover:text-white transition-all shadow-md hover:shadow-lg disabled:opacity-50">
                  <span>←</span>
                  <span>{isLoading ? 'Carregando...' : 'Página Anterior'}</span>
                </PreviousLink>
              </div>

              {/* GRID DE PRODUTOS APRIMORADA */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
                {nodes.map((product) => (
                  <div
                    key={product.id}
                    className="group flex flex-col bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  >
                    {/* Container de Imagem Quadrado com Padding e Fit Contain */}
                    <div className="aspect-square bg-gray-50 p-6 relative overflow-hidden flex items-center justify-center">
                      {product.featuredImage ? (
                        <Link to={`/products/${product.handle}`}>
                          <Image
                            data={product.featuredImage}
                            aspectRatio="1/1"
                            sizes="(min-width: 45em) 20vw, 50vw"
                            className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out drop-shadow-xl"
                          />
                        </Link>
                      ) : (
                        <div className="text-gray-300 text-4xl">🧸</div>
                      )}
                      
                      {/* Tag de Esgotado */}
                      {!product.availableForSale && (
                        <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                          Esgotado
                        </div>
                      )}
                      
                      {/* Botão Espiar - Sempre visível no mobile, hover no desktop */}
                      <button
                        onClick={() => {
                          console.log('[QUICK VIEW] Button clicked for product:', product.title);
                          setSelectedProduct(product);
                        }}
                        className="absolute bottom-2 left-2 right-2 bg-[#FB8A38] text-white px-3 py-2 rounded-full font-semibold text-sm opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 hover:bg-[#3A8ECD] hover:scale-105 z-10"
                        aria-label={`Espiar ${product.title}`}
                      >
                        👁️ Espiar
                      </button>
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="font-bold text-gray-800 text-lg group-hover:text-[#3A8ECD] transition-colors leading-tight mb-2 min-h-[3.5rem] line-clamp-2">
                        <Link to={`/products/${product.handle}`}>
                          {product.title}
                        </Link>
                      </h3>
                      
                      <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                        <div className="text-[#FB8A38] font-black text-xl">
                          <Money data={product.priceRange.minVariantPrice} />
                        </div>
                        <Link to={`/products/${product.handle}`} className="text-xs font-semibold text-gray-400 uppercase tracking-wider hover:text-[#3A8ECD]">Ver Detalhes</Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center mt-12 w-full">
                <NextLink className="group flex items-center gap-2 px-8 py-3 bg-[#3A8ECD] text-white font-bold rounded-full hover:bg-[#2c7bb0] transition-all shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50">
                  <span>{isLoading ? 'Carregando...' : 'Carregar Mais Produtos'}</span>
                  <span>→</span>
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

      {/* --- FOOTER --- */}
      <div className="relative w-full py-12 px-4 md:px-8 overflow-hidden z-20" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, #FB8A38 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}>
        <div className="absolute inset-0 bg-[#FEFDF8]/95"></div>
        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <span className="text-[#FB8A38] font-black text-6xl opacity-20 absolute -top-10 left-0 animate-bounce">🧩</span>
          <span className="text-[#3A8ECD] font-black text-6xl opacity-20 absolute -bottom-10 right-0 animate-pulse">🎨</span>
          <h2 className="text-3xl md:text-5xl font-black text-[#3A8ECD] tracking-tight">Junte-se à Comunidade</h2>
          <p className="text-gray-600 text-lg md:text-xl font-medium max-w-2xl mx-auto">Receba novidades, dicas e ofertas exclusivas para famílias.</p>
          <newsletterFetcher.Form method="post" className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              name="email" 
              placeholder="Seu melhor e-mail" 
              required
              className="flex-1 px-4 py-3 rounded-full border-2 border-[#FB8A38] focus:outline-none focus:ring-4 focus:ring-[#FB8A38]/30" 
            />
            <button 
              type="submit" 
              disabled={newsletterFetcher.state === 'submitting'}
              className="bg-[#FB8A38] text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform shadow-lg disabled:opacity-50"
            >
              {newsletterFetcher.state === 'submitting' ? 'Enviando...' : 'Inscrever'}
            </button>
          </newsletterFetcher.Form>
          {isNewsletterSuccess && <p className="text-green-600 font-bold">{newsletterMessage}</p>}
          {newsletterFetcher.data?.error && <p className="text-red-600 font-bold">{newsletterFetcher.data.error}</p>}
        </div>
      </div>

      <footer className="bg-[#FEFDF8] pt-16 pb-8 border-t-8 border-[#3A8ECD] relative z-20">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🧸</span>
              <h3 className="font-bold text-[#2a2a2a] text-xl">BrinqueTEAndo</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/pages/about" className="hover:text-[#FB8A38]">Quem é Margareth Almeida</Link></li>
              <li><Link to="/pages/mission" className="hover:text-[#FB8A38]">Leve a BrinqueTEAndo até Você</Link></li>
              <li><Link to="/pages/reseller" className="hover:text-[#FB8A38]">Seja Revendedor BrinqueTEAndo</Link></li>
              <li><Link to="/blogs/news" className="hover:text-[#FB8A38]">Guias práticos</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">💡</span>
              <h3 className="font-bold text-[#2a2a2a] text-xl">Conteúdos</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/pages/how-to-choose" className="hover:text-[#FB8A38]">Como escolher brinquedos</Link></li>
              <li><Link to="/pages/tips-tdah-tea" className="hover:text-[#FB8A38]">Dicas para TDAH e TEA</Link></li>
              <li><Link to="/pages/faq" className="hover:text-[#FB8A38]">FAQ</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📦</span>
              <h3 className="font-bold text-[#2a2a2a] text-xl">Ajuda</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/pages/contact" className="hover:text-[#FB8A38]">Contact</Link></li>
              <li><Link to="/policies/shipping-policy" className="hover:text-[#FB8A38]">Política de Envio</Link></li>
              <li><Link to="/policies/refund-policy" className="hover:text-[#FB8A38]">Política de Devolução</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔐</span>
              <h3 className="font-bold text-[#2a2a2a] text-xl">Legal</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/policies/privacy-policy" className="hover:text-[#FB8A38]">Politica de Privacidade</Link></li>
              <li><Link to="/policies/terms-of-service" className="hover:text-[#FB8A38]">Política de Cookies</Link></li>
              <li><Link to="/policies/legal-notice" className="hover:text-[#FB8A38]">Aviso Legal</Link></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} brinqueTEAndo. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <span>Privacidade</span>
            <span>Termos</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

const CATALOG_QUERY = `#graphql
  query Catalog(
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    products(first: $first, last: $last, before: $startCursor, after: $endCursor) {
      nodes {
        id
        title
        handle
        availableForSale
        description(truncateAt: 300)
        variants(first: 1) {
          nodes {
            id
            availableForSale
          }
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        featuredImage {
          url
          altText
          width
          height
        }
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`;
