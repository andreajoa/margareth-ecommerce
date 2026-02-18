import {useLoaderData, Link, useFetcher} from 'react-router';
import {useState, useEffect, useRef} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import {
  getSelectedProductOptions,
  useOptimisticVariant,
  getProductOptions,
  getAdjacentAndFirstAvailableVariants,
  useSelectedOptionInUrlParam,
} from '@shopify/hydrogen';
import {useAside} from '~/components/Aside';
import {AddToCartButton} from '~/components/AddToCartButton'; // Usando o componente oficial
import {useCountdown} from '~/lib/useCountdown'; // ✅ FIX: Importar hook otimizado

// --- HELPER: JSON RESPONSE ---
function json(data, init = {}) {
  return new Response(JSON.stringify(data), {
    status: init.status || 200,
    headers: {
      'Content-Type': 'application/json',
      ...init.headers,
    },
  });
}

// --- ACTION: LIDA COM NEWSLETTER (useFetcher) ---
// O AddToCartButton usa route="/cart" então não passa por aqui
// Apenas formulários sem 'action' explícita passam por esta action
export async function action({request, context}) {
  const {storefront} = context;
  const formData = await request.formData();
  const email = formData.get('email');

  // Se não tem email, não é newsletter - retorna erro silencioso
  if (!email) {
    return json({error: 'Email é obrigatório', status: 'error'}, {status: 400});
  }

  // Newsletter subscription
  try {
    const {customerCreate} = await storefront.mutate(CUSTOMER_CREATE_MUTATION, {
      variables: {
        input: { email, acceptsMarketing: true }
      }
    });

    if (customerCreate?.customerUserErrors?.length) {
      return json({error: customerCreate.customerUserErrors[0].message, status: 'error'}, {status: 400});
    }

    return json({status: 'success', message: 'Inscrito com sucesso!'});
  } catch (error) {
    return json({error: 'Erro ao inscrever. Tente novamente.', status: 'error'}, {status: 500});
  }
}

// --- VIDEO REVIEW CARD ---
function VideoReviewCard({ review }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef(null);

  const handleVideoClick = (e) => {
    e.preventDefault();
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      video.muted = false;
      video.controls = true;
      setIsPlaying(true);
    } else {
      video.pause();
      video.muted = true;
      video.controls = false;
      setIsPlaying(false);
    }
  };

  const handleVideoError = () => {
    setHasError(true);
  };

  if (hasError) return null;

  return (
    <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white h-full flex flex-col min-w-[280px] md:min-w-[320px]">
      <div className="relative aspect-[9/16] bg-black">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src={`${review.video}#t=1.5`}
          preload="metadata"
          playsInline
          muted
          loop
          onClick={handleVideoClick}
          onError={handleVideoError}
        />
        {!isPlaying && (
          <div 
            className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer group-hover:bg-black/30 transition-colors"
            onClick={handleVideoClick}
          >
            <span className="text-4xl">▶️</span>
          </div>
        )}
      </div>
      <div className="p-4 bg-white">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-[#3A8ECD] text-white flex items-center justify-center font-bold text-xs">
            {review.initial}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-800">{review.name}</p>
            <p className="text-xs text-green-600 flex items-center gap-1">Verificado</p>
          </div>
        </div>
        <div className="text-yellow-400 text-sm mb-2">★★★★★</div>
        <p className="text-gray-600 text-sm italic">"{review.review}"</p>
        <div className="mt-3 text-xs text-gray-400 flex items-center gap-1">📍 {review.location}</div>
      </div>
    </div>
  );
}

// --- LOADER & META ---
export const headers = () => {
  return {
    'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
  };
};

export const meta = ({data}) => {
  const product = data?.product;
  const shopUrl = data?.shopUrl;
  const selectedVariant = data?.selectedVariant;

  const title = product?.seo?.title ?? `brinqueTEAndo | ${product?.title ?? 'Brinquedo Educativo'} - Loja Oficial`;
  const description = product?.seo?.description || product?.description?.substr(0, 160) || 'Descubra brinquedos educativos e sensoriais para TEA e TDAH.';
  const image = selectedVariant?.image?.url || product?.featuredImage?.url;
  const url = shopUrl ? `${shopUrl}/products/${product?.handle}` : null;

  return [
    { charSet: 'utf-8' },
    { title },
    { name: 'description', content: description },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:type', content: 'product' },
    { property: 'og:image', content: image },
    { property: 'og:url', content: url },
    { property: 'og:site_name', content: 'brinqueTEAndo' },
    { property: 'og:price:amount', content: selectedVariant?.price?.amount },
    { property: 'og:price:currency', content: selectedVariant?.price?.currencyCode },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image },
    ...(url ? [{ tagName: "link", rel: "canonical", href: url }] : []),
  ];
};

export async function loader({context, params, request}) {
  const {handle} = params;
  const {storefront} = context;

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  try {
    const [productData, upgradeData] = await Promise.all([
      storefront.query(PRODUCT_QUERY, {
        variables: {
          handle,
          selectedOptions: getSelectedProductOptions(request),
          country: 'BR',
          language: 'PT',
        },
      }),
      storefront.query(UPGRADE_PRODUCTS_QUERY, {
        variables: {
          country: 'BR',
          language: 'PT',
        },
      }).catch(() => ({ giftWrap: null })),
    ]);

    const product = productData?.product;
    if (!product?.id) {
      throw new Response(null, {status: 404});
    }

    const {cart} = context;
    const url = new URL(request.url);
    const shopUrl = `${url.protocol}//${url.host}`;
    const selectedVariant = product.selectedOrFirstAvailableVariant;

    let judgeMeReviews = {reviews: [], rating: 0, reviewCount: 0};
    try {
      const {fetchJudgeMeReviews} = await import('~/lib/judgeme.server');
      globalThis.JUDGEME_API_TOKEN = context.env?.JUDGEME_API_TOKEN;
      globalThis.JUDGEME_SHOP_DOMAIN = context.env?.JUDGEME_SHOP_DOMAIN;
      const judgeMeData = await fetchJudgeMeReviews(product.id, {
        perPage: 20,
        productHandle: handle,
      });
      if (judgeMeData && Array.isArray(judgeMeData.reviews)) {
        judgeMeReviews = judgeMeData;
      } 
    } catch (error) {
      console.error('Judge.me reviews fetch error:', error);
    }

    return {
      product,
      upgradeProducts: upgradeData,
      cart: cart.get(),
      shopUrl,
      selectedVariant,
      judgeMeReviews,
    };
  } catch (error) {
    console.error('Product loader error:', error);
    throw new Response(null, {status: 500});
  }
}

// --- COMPONENTE PRINCIPAL DO PRODUTO ---
export default function Product() {
  const {product, upgradeProducts, cart, shopUrl, judgeMeReviews} = useLoaderData();
  const newsletterFetcher = useFetcher();
  const isNewsletterSuccess = newsletterFetcher.data?.status === 'success';
  const newsletterMessage = newsletterFetcher.data?.message || newsletterFetcher.data?.error;

  const [selectedImage, setSelectedImage] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [expandedUpgrades, setExpandedUpgrades] = useState(true);
  const [selectedUpgrades, setSelectedUpgrades] = useState([]);
  const {open} = useAside();

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState('opacity-100');
  const [urgencyNumber, setUrgencyNumber] = useState(13);

  // ✅ FIX: Usar hook useCountdown otimizado com requestAnimationFrame
  const {timeLeft, isMounted} = useCountdown();

  const [currentPromo, setCurrentPromo] = useState(0);

  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    getAdjacentAndFirstAvailableVariants(product),
  );

  useSelectedOptionInUrlParam(selectedVariant.selectedOptions);

  const images = product.images?.edges || [];
  const currentImage = images[selectedImage]?.node;

  const promoMessages = [
    "🚚 Frete grátis para toda Baixada Santista!",
    "⭐ brinqueTEAando REWARDS — Ganhe pontos!",
    "🎁 Trocas e devoluções facilitadas",
    "🧠 Desenvolvimento e diversão para TEA e TDAH",
    "💎 Qualidade e Segurança garantidas",
    "🎅 Use o código BEMVINDO10 e ganhe 10% OFF"
  ];

  const urgencyMessages = [
    {text: `🔥 ${urgencyNumber} famílias visualizando agora`, color: 'text-orange-600'},
    {text: '🏆 Mais vendido no Brasil', color: 'text-[#FB8A38]'},
    {text: `⚡ Apenas ${urgencyNumber} restantes neste preço!`, color: 'text-red-600'},
    {text: '⚡ Entrega rápida para Baixada Santista', color: 'text-[#3A8ECD]'},
  ];

  // ✅ FIX: Removido calculateHolidayCountdown - usando hook useCountdown agora

  useEffect(() => {
    const promoTimer = setInterval(() => setCurrentPromo((p) => (p + 1) % promoMessages.length), 4000);
    return () => clearInterval(promoTimer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeClass('opacity-0');
      setTimeout(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % 4);
        setUrgencyNumber(Math.floor(Math.random() * 42) + 8);
        setFadeClass('opacity-100');
      }, 500);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const generateSmartUpgrades = () => {
    const realUpgrades = [];
    if (upgradeProducts?.giftWrap) {
      const variant = upgradeProducts.giftWrap.variants?.edges?.[0]?.node;
      if (variant) {
        realUpgrades.push({
          id: 'gift-wrap',
          variantId: variant.id,
          name: 'Embrulho para Presente',
          price: parseFloat(variant.price.amount),
          icon: '🎁',
          category: 'apresentação',
          available: variant.availableForSale
        });
      }
    }
    return realUpgrades;
  };

  const upgrades = generateSmartUpgrades();

  const toggleUpgrade = (upgradeId) => {
    setSelectedUpgrades(prev => prev.includes(upgradeId) ? prev.filter(id => id !== upgradeId) : [...prev, upgradeId]);
  };

  const getCartLines = () => {
    const lines = [];
    if (selectedVariant) {
      lines.push({ merchandiseId: selectedVariant.id, quantity: quantity });
    }
    selectedUpgrades.forEach(upgradeId => {
      const upgrade = upgrades.find(u => u.id === upgradeId);
      if (upgrade && upgrade.variantId && upgrade.available) {
        lines.push({ merchandiseId: upgrade.variantId, quantity: 1 });
      }
    });
    return lines;
  };

  const baseReviews = [
    { 
      initial: 'JM', 
      name: 'Juliana Martins', 
      video: 'https://cdn.shopify.com/videos/c/o/v/4783cfb0db084fc8baea9fef9b508357.mp4', 
      review: 'Minha filha com TEA sempre teve dificuldade com texturas, mas desde que descobrimos os brinquedos sensoriais da BrinqueTEAndo, ela está muito mais aberta a explorar. Não é só sobre o brinquedo, é sobre dar a ela ferramentas para se sentir segura no mundo. Estou muito emocionada com o progresso!', 
      location: 'Santos, SP' 
    },
    { 
      initial: 'CF', 
      name: 'Carolina Ferreira', 
      video: 'https://cdn.shopify.com/videos/c/o/v/153f3f9af62a4f36a2be1ebf99d7aafb.mp4', 
      review: 'Meu filho com TDAH sempre foi muito agitado, e encontrar algo que o ajudasse a focar parecia impossível. Os brinquedos daqui não são milagrosos, mas são pensados com tanto carinho que realmente fazem diferença. Ele consegue se concentrar mais nas tarefas, e isso mudou nossa rotina. Gratidão!', 
      location: 'São Paulo, SP' 
    },
    { 
      initial: 'RA', 
      name: 'Renata Alves', 
      video: 'https://cdn.shopify.com/videos/c/o/v/7c1f4f1e45114779bab1702502379142.mp4', 
      review: 'Como mãe de uma criança autista, você aprende a valorizar cada pequena conquista. Ver minha filha interagindo com os brinquedos, criando suas próprias brincadeiras, me enche de esperança. A BrinqueTEAndo entende que não se trata só de entreter, mas de desenvolver. Recomendo de coração!', 
      location: 'Praia Grande, SP' 
    },
    { 
      initial: 'PM', 
      name: 'Patricia Moreira', 
      video: 'https://cdn.shopify.com/videos/c/o/v/1de606cdf183419c85381cc5f28fe1bf.mp4', 
      review: 'Eu sempre busquei coisas que ajudassem meu filho a lidar com a ansiedade do TDAH. Quando conheci a BrinqueTEAndo, percebi que tinham produtos feitos por quem realmente entende. O atendimento foi incrível, e o resultado foi melhor ainda. Ele está mais calmo e consegue brincar por mais tempo. Mudou nossa dinâmica!', 
      location: 'Guarujá, SP' 
    },
    { 
      initial: 'LB', 
      name: 'Luciana Barbosa', 
      video: 'https://cdn.shopify.com/videos/c/o/v/ee2e4b4a2aff414baa7f08df7db54fce.mp4', 
      review: 'Minha jornada como mãe de uma criança com TEA tem sido cheia de desafios, mas também de descobertas lindas. Os brinquedos da BrinqueTEAndo ajudaram muito no desenvolvimento sensorial dela. Não é só diversão, é terapia disfarçada de brincadeira. Ver ela sorrindo enquanto aprende não tem preço!', 
      location: 'São Vicente, SP' 
    },
    { 
      initial: 'BC', 
      name: 'Beatriz Costa', 
      video: 'https://cdn.shopify.com/videos/c/o/v/725d5d576f8b40d58efc4e2c702b7475.mp4', 
      review: 'Eu estava perdida, sem saber como ajudar meu filho com TDAH a canalizar a energia dele. A BrinqueTEAndo não só oferece produtos incríveis, mas também acolhimento. Sinto que estou sendo vista e compreendida. Os brinquedos ajudaram muito na coordenação motora dele, e hoje ele está muito mais confiante!', 
      location: 'Campinas, SP' 
    },
    { 
      initial: 'FS', 
      name: 'Fernanda Santos', 
      video: 'https://cdn.shopify.com/videos/c/o/v/af6aabd4e1b34c5ba086300f058742e4.mp4', 
      review: 'Quando você é mãe de uma criança neurodivergente, cada recurso que ajuda é uma bênção. Os brinquedos da BrinqueTEAndo são mais do que produtos, são aliados na nossa jornada. Minha filha está se comunicando melhor, brincando mais, e isso me deixa muito feliz. Obrigada por existirem!', 
      location: 'Ribeirão Preto, SP' 
    },
  ];

  const reviewsData = [...baseReviews, ...baseReviews.map(r => ({...r, name: r.name + ' (Verificado)'}))];

  return (
    <div className="flex flex-col min-h-screen bg-[#FEFDF8] w-full overflow-x-hidden relative">
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
          @keyframes float-slow {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
          .float-item {
            position: absolute;
            opacity: 0.08;
            pointer-events: none;
            z-index: 0;
            animation: float-slow 6s ease-in-out infinite;
          }
        `}</style>

      {/* OBJETOS FLUTUANTES */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none h-full w-full z-0">
        <div className="float-item top-[5%] left-[5%] text-6xl" style={{animationDelay: '0s'}}>🧩</div>
        <div className="float-item top-[10%] right-[10%] text-7xl text-[#3A8ECD]" style={{animationDelay: '1s'}}>💙</div>
        <div className="float-item top-[25%] left-[15%] text-5xl" style={{animationDelay: '2s'}}>🧸</div>
        <div className="float-item top-[35%] right-[20%] text-6xl" style={{animationDelay: '3s'}}>🎨</div>
        <div className="float-item top-[50%] left-[8%] text-6xl text-[#FB8A38]" style={{animationDelay: '1.5s'}}>⭐</div>
        <div className="float-item top-[60%] right-[5%] text-5xl" style={{animationDelay: '0.5s'}}>🧩</div>
        <div className="float-item top-[45%] left-[40%] text-4xl" style={{animationDelay: '4s'}}>🎯</div>
        <div className="float-item top-[75%] left-[12%] text-6xl text-[#3A8ECD]" style={{animationDelay: '2s'}}>💙</div>
        <div className="float-item top-[85%] right-[15%] text-5xl" style={{animationDelay: '1s'}}>🧸</div>
        <div className="float-item top-[90%] left-[30%] text-7xl" style={{animationDelay: '3s'}}>🎨</div>
      </div>

      {/* HEADER */}
      <div className="bg-[#3A8ECD] text-white py-3 text-center w-full relative z-20">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-4 flex-wrap">
          <span className="text-sm md:text-base font-bold tracking-wide">
            {timeLeft.holiday?.emoji} {timeLeft.holiday?.message} {timeLeft.holiday?.emoji}
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

      <div className="w-full bg-[#3A8ECD] border-y-2 border-[#FB8A38] overflow-hidden py-3 relative z-20 shadow-lg">
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

      <div className="bg-[#FB8A38] text-white py-3 overflow-hidden relative w-full z-20">
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
              <button type="button" onClick={() => open('cart')} className="relative group">
                <span className="text-2xl">🛒</span>
                <span className="absolute -top-2 -right-2 bg-[#FB8A38] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white group-hover:scale-110 transition-transform">
                  {cart?.totalQuantity || 0}
                </span>
              </button>
              <button type="button"
                onClick={() => {
                  const menu = document.getElementById('mobile-menu');
                  if (menu) menu.classList.toggle('hidden');
                }}
                className="lg:hidden text-[#3A8ECD] p-2"
                aria-label="Toggle menu"
              >
                <span className="text-2xl">☰</span>
              </button>
            </div>
          </div>
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
                    if (menu) menu.classList.add('hidden');
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* CONTEÚDO DO PRODUTO */}
      <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-xl border-4 border-[#3A8ECD]/20 relative bg-white group">
              {currentImage && (
                <Image
                  key={currentImage.id}
                  data={currentImage}
                  className="w-full h-full object-cover"
                  alt={product.title}
                  loading="eager"
                  fetchPriority="high"
                  sizes="(min-width: 1024px) 45vw, 95vw"
                  widths={[320, 400, 500, 600, 800, 1000, 1200, 1400]}
                />
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {images.slice(0, 6).map((edge, idx) => (
                  <button type="button"
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square w-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === idx ? 'border-[#3A8ECD] ring-2 ring-[#3A8ECD]/50' : 'border-[#FB8A38]/30 hover:border-[#FB8A38]'
                    }`}
                  >
                    <Image
                      data={edge.node}
                      className="w-full h-full object-cover"
                      alt={`View ${idx + 1}`}
                      loading="lazy"
                      widths={[80, 100]}
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="text-[#FB8A38] font-bold text-sm tracking-widest uppercase mb-2 block">COLEÇÃO BRINQUETEANDO</span>
              <h1 className="text-3xl md:text-4xl font-black text-[#3A8ECD] leading-tight mb-2">
                {product.title}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                {selectedVariant?.price && (
                  <div className="text-3xl font-bold text-[#3A8ECD]">
                    <Money data={selectedVariant.price} />
                  </div>
                )}
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${selectedVariant?.availableForSale ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {selectedVariant?.availableForSale ? '✓ Em Estoque' : '✗ Fora de Estoque'}
                </span>
              </div>
              <p className="text-gray-500 text-sm flex items-center gap-1">
                🚚 <span className="font-semibold text-[#FB8A38]">Frete grátis para Baixada Santista.</span> Envio para todo Brasil.
              </p>
            </div>

            <div className="h-px bg-gray-200" />

            {/* Options */}
            {product.options && product.options.length > 0 && (
              <div className="space-y-4">
                {product.options.map((option) => {
                  const currentValue = selectedVariant?.selectedOptions?.find(opt => opt.name === option.name)?.value || option.optionValues[0]?.name;
                  return (
                    <div key={option.name}>
                      <h3 className="font-bold text-gray-700 mb-2">{option.name}: <span className="text-[#3A8ECD]">{currentValue}</span></h3>
                      <div className="flex flex-wrap gap-3">
                        {option.optionValues.map((optionValue) => {
                          const variant = optionValue.firstSelectableVariant;
                          const isActive = currentValue === optionValue.name;
                          const isAvailable = variant?.availableForSale;
                          const searchParams = new URLSearchParams();
                          selectedVariant?.selectedOptions?.forEach(opt => {
                            if (opt.name !== option.name) searchParams.set(opt.name, opt.value);
                          });
                          searchParams.set(option.name, optionValue.name);
                          const to = `?${searchParams.toString()}`;
                          
                          return (
                            <Link
                              key={optionValue.name}
                              to={to}
                              preventScrollReset
                              replace
                              className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-all relative overflow-hidden ${
                                isActive ? 'border-[#3A8ECD] ring-2 ring-[#FB8A38]' : 
                                isAvailable ? 'border-gray-200 hover:border-[#FB8A38]' : 
                                'border-gray-100 opacity-50 cursor-not-allowed'
                              }`}
                              title={optionValue.name}
                            >
                              {optionValue.swatch?.color ? (
                                <div className="w-full h-full" style={{backgroundColor: optionValue.swatch.color}} />
                              ) : optionValue.swatch?.image?.previewImage?.url ? (
                                <img src={optionValue.swatch.image.previewImage.url} alt={optionValue.name} className="w-full h-full object-cover" />
                              ) : variant?.image?.url ? (
                                <img src={variant.image.url} alt={optionValue.name} className="w-full h-full object-cover" />
                              ) : (
                                <span className="text-xs font-bold">{optionValue.name}</span>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Quantity & Buy Box */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 relative z-20">
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-gray-700">Quantidade</span>
                <div className="flex items-center gap-4">
                  <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100">-</button>
                  <span className="font-bold text-lg">{quantity}</span>
                  <button type="button" onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100">+</button>
                </div>
              </div>

              {/* Gift Wrap */}
              {upgrades.length > 0 && (
                <div className="mb-6 border border-[#FB8A38]/30 rounded-lg overflow-hidden">
                  <button type="button" onClick={() => setExpandedUpgrades(!expandedUpgrades)} className="w-full p-3 flex items-center justify-between bg-[#FFF8F0] text-[#FB8A38] font-bold text-sm">
                    <span className="flex items-center gap-2">🎁 Frequentemente comprados juntos</span>
                    <span>{expandedUpgrades ? '▼' : '▲'}</span>
                  </button>
                  {expandedUpgrades && (
                    <div className="p-3 bg-white space-y-2">
                      {upgrades.map((upgrade) => (
                        <label key={upgrade.id} className="flex items-center justify-between cursor-pointer p-2 hover:bg-gray-5 rounded">
                          <div className="flex items-center gap-2">
                            <input 
                              type="checkbox" 
                              checked={selectedUpgrades.includes(upgrade.id)}
                              onChange={() => toggleUpgrade(upgrade.id)}
                              className="accent-[#3A8ECD] w-4 h-4"
                            />
                            <span className="text-sm text-gray-700">{upgrade.name}</span>
                          </div>
                          <span className="text-sm font-bold text-[#3A8ECD]">+ R$ {upgrade.price.toFixed(2)}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Urgency Message */}
              <div className={`text-xs text-center font-semibold transition-opacity duration-500 mb-2 ${fadeClass} ${urgencyMessages[currentMessageIndex].color}`}>
                {urgencyMessages[currentMessageIndex].text}
              </div>

              {/* ADD TO CART BUTTON OFICIAL */}
              <AddToCartButton
                lines={getCartLines()}
                disabled={!selectedVariant || !selectedVariant.availableForSale}
                className="w-full relative overflow-hidden bg-[#3A8ECD] text-white py-4 px-8 text-lg font-semibold tracking-wide transition-all duration-500 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed group rounded-sm"
              >
                Adicionar ao Carrinho
              </AddToCartButton>

              <button type="button"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  open('cart');
                }}
                className="w-full text-center text-[#3A8ECD] hover:text-[#FB8A38] text-sm font-semibold underline transition-colors py-2 mt-2"
              >
                Ver Carrinho
              </button>
            </div>

            {/* Description */}
            <div className="mt-4">
              <h3 className="font-bold text-gray-800 mb-2 border-b-2 border-[#FB8A38] inline-block pb-1">Sobre Este Brinquedo</h3>
              {product.descriptionHtml && (
                <div className="text-gray-600 prose prose-sm" dangerouslySetInnerHTML={{__html: product.descriptionHtml}} />
              )}
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mb-16 relative z-20">
          <h2 className="text-2xl font-bold text-center text-[#3A8ECD] mb-8">Avaliações de Famílias Satisfeitas</h2>
          <div className="flex overflow-x-auto gap-6 pb-8 snap-x">
            {reviewsData.map((review, i) => (
              <div key={i} className="snap-center">
                <VideoReviewCard review={review} />
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto mb-16 relative z-20">
          <h2 className="text-2xl font-bold text-center text-[#3A8ECD] mb-8">Perguntas Frequentes</h2>
          <div className="space-y-4">
            {[
              {q: 'Vocês entregam para todo o Brasil?', a: 'Sim! Oferecemos frete GRÁTIS para toda Baixada Santista e entregamos para todo Brasil.'},
              {q: 'Os brinquedos são adequados para crianças com TEA e TDAH?', a: 'Sim! Todos os produtos são selecionados por especialistas.'},
              {q: 'Qual a garantia dos produtos?', a: 'Todos os brinquedos incluem garantia contra defeitos de fabricação.'}
            ].map((faq, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden bg-white/90 backdrop-blur-sm">
                <button type="button"
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className={`w-full p-4 text-left font-semibold flex justify-between items-center ${expandedFaq === idx ? 'bg-[#3A8ECD] text-white' : 'bg-white text-[#3A8ECD]'}`}
                >
                  {faq.q}
                  <span>{expandedFaq === idx ? '▲' : '▼'}</span>
                </button>
                {expandedFaq === idx && (
                  <div className="p-4 bg-white text-gray-600 text-sm">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <div className="relative w-full py-12 px-4 md:px-8 overflow-hidden z-20" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, #FB8A38 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}>
        <div className="absolute inset-0 bg-[#FEFDF8]/90"></div>
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

// --- GRAPHQL QUERIES ---
const CUSTOMER_CREATE_MUTATION = `#graphql
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer { id email }
      customerUserErrors { code field message }
    }
  }
`;

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice { amount currencyCode }
    id
    image { id url altText width height }
    price { amount currencyCode }
    product { title handle }
    selectedOptions { name value }
    sku
    title
    unitPrice { amount currencyCode }
  }
`;

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id title vendor handle descriptionHtml description productType
    metafields(identifiers: [{namespace: "judgeme", key: "widget"}, {namespace: "judgeme", key: "review_widget_data"}]) { key value }
    images(first: 20) { edges { node { id url altText width height } } }
    options { name optionValues { name firstSelectableVariant { ...ProductVariant } swatch { color image { previewImage { url } } } } }
    selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) { ...ProductVariant }
    adjacentVariants(selectedOptions: $selectedOptions) { ...ProductVariant }
    seo { description title }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) { ...Product }
  }
  ${PRODUCT_FRAGMENT}
`;

const UPGRADE_PRODUCTS_QUERY = `#graphql
  query UpgradeProducts($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    giftWrap: product(handle: "embrulho-para-presente") {
      id handle title
      featuredImage { url }
      variants(first: 1) { edges { node { id availableForSale price { amount currencyCode } } } }
    }
  }
`;
