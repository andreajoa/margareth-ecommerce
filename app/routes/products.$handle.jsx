import {FooterNewsletterForm} from '~/components/FooterNewsletterForm';
import {useLoaderData, Link} from 'react-router';
import {useState, useEffect, useRef} from 'react';
import {Image, Money, CartForm} from '@shopify/hydrogen';
import {
  getSelectedProductOptions,
  useOptimisticVariant,
  getProductOptions,
  getAdjacentAndFirstAvailableVariants,
  useSelectedOptionInUrlParam,
} from '@shopify/hydrogen';
import {Aside, useAside} from '~/components/Aside';
import {CartMain} from '~/components/CartMain';
import {Suspense} from 'react';
import {Await} from 'react-router';
import {fetchJudgeMeReviews} from '~/lib/judgeme.server';

function CartFormContents({
  fetcher,
  open,
  selectedVariant,
  urgencyNumber,
  fadeClass,
  currentMessageIndex,
}) {
  const isLoading = fetcher.state === 'submitting';
  const isSuccess = fetcher.state === 'idle' && fetcher.data;

  useEffect(() => {
    if (isSuccess) {
      open('cart');
    }
  }, [isSuccess, open]);

  const urgencyMessages = [
    {text: `🔥 ${urgencyNumber} famílias visualizando agora`, color: 'text-orange-600'},
    {text: '🏆 Mais vendido no Brasil', color: 'text-[#FB8A38]'},
    {text: `⚡ Apenas ${urgencyNumber} restantes neste preço!`, color: 'text-red-600'},
    {text: '⚡ Entrega rápida para Baixada Santista', color: 'text-[#3A8ECD]'},
  ];

  return (
    <div className="space-y-3">
      <button
        type="submit"
        disabled={!selectedVariant || !selectedVariant.availableForSale || isLoading}
        className="w-full relative overflow-hidden bg-[#3A8ECD] text-white py-4 px-8 text-lg font-semibold tracking-wide transition-all duration-500 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed group rounded-sm"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-[#FB8A38] to-[#3A8ECD] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out"></span>
        <span className="relative z-10 flex items-center justify-center gap-2">
          {isLoading ? (
            <>
              <span className="inline-block animate-spin">⚙️</span>
              Adicionando ao Carrinho...
            </>
          ) : (
            'Adicionar ao Carrinho'
          )}
        </span>
      </button>
      <button
        type="button"
        onClick={event => {
          event.preventDefault();
          event.stopPropagation();
          open('cart');
        }}
        className="w-full text-center text-[#3A8ECD] hover:text-[#FB8A38] text-sm font-semibold underline transition-colors py-2"
      >
        Ver Carrinho
      </button>
      <p
        className={`text-xs text-center font-semibold transition-opacity duration-500 ${fadeClass} ${urgencyMessages[currentMessageIndex].color}`}
      >
        {urgencyMessages[currentMessageIndex].text}
      </p>
    </div>
  );
}

export const headers = () => {
  return {
    'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
  };
};

function useInView(options = { rootMargin: '200px' }) {
  const [isIntersecting, setIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIntersecting(true);
        if (ref.current) observer.unobserve(entry.target);
        observer.disconnect();
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.disconnect();
    };
  }, []);

  return [ref, isIntersecting];
}

function VideoReviewCard({ review }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef(null);
  const [containerRef, isInView] = useInView();

  const videoSrcWithThumbnail = `${review.video}#t=1.5`;

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
    <div 
      ref={containerRef}
      className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white h-full flex flex-col"
    >
      <div className="aspect-[3/4] relative bg-gradient-to-br from-[#3A8ECD] to-[#82CBB7]">
        {isInView ? (
          <video 
            ref={videoRef}
            className="w-full h-full object-cover"
            src={videoSrcWithThumbnail}
            preload="metadata"
            playsInline
            muted
            loop
            onClick={handleVideoClick}
            onError={handleVideoError}
          />
        ) : (
          <div className="w-full h-full bg-[#3A8ECD] opacity-50 flex items-center justify-center">
            <span className="text-[#FB8A38] text-xs">Carregando...</span>
          </div>
        )}
        
        {(!isPlaying && isInView) && (
          <div 
            className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer group-hover:bg-black/30 transition-colors"
            onClick={handleVideoClick}
          >
            <div className="w-14 h-14 rounded-full bg-[#3A8ECD]/90 backdrop-blur-sm flex items-center justify-center shadow-2xl transform transition-transform group-hover:scale-110 border border-[#FB8A38]">
              <div className="w-0 h-0 border-l-[16px] border-l-[#FB8A38] border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1"></div>
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-white p-4 border-t-2 border-[#FB8A38] flex-1 flex flex-col">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FB8A38] to-[#FBA25C] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {review.initial}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[#3A8ECD] font-semibold text-sm truncate">{review.name}</div>
            <div className="text-[#FB8A38] text-[10px] uppercase tracking-wider font-bold">✓ Verificado</div>
          </div>
        </div>
        
        <div className="flex text-[#FB8A38] text-xs mb-2">
          ★★★★★
        </div>
        
        <p className="text-[#3A8ECD] text-sm leading-relaxed line-clamp-3 mb-2 flex-1">
          {review.review}
        </p>
        
        <p className="text-gray-600 text-xs flex items-center gap-1 mt-auto pt-2 border-t border-gray-100">
          <span>📍</span>
          <span>{review.location}</span>
        </p>
      </div>
    </div>
  );
}

function ReviewsCarousel({ reviews }) {
  const scrollRef = useRef(null);
  
  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -320 : 320;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group/carousel">
      <button 
        onClick={() => scroll('left')}
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-12 h-12 bg-white text-[#3A8ECD] border-2 border-[#FB8A38] rounded-full items-center justify-center shadow-xl opacity-0 group-hover/carousel:opacity-100 transition-all hover:scale-110"
        aria-label="Avaliações anteriores"
      >
        ←
      </button>
      
      <button 
        onClick={() => scroll('right')}
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-12 h-12 bg-white text-[#3A8ECD] border-2 border-[#FB8A38] rounded-full items-center justify-center shadow-xl opacity-0 group-hover/carousel:opacity-100 transition-all hover:scale-110"
        aria-label="Próximas avaliações"
      >
        →
      </button>
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-5 snap-x snap-mandatory pb-8 px-4 -mx-4 md:px-0 md:mx-0"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {reviews.map((review, idx) => (
          <div 
            key={idx} 
            className="snap-center shrink-0 w-[280px] md:w-[320px]"
          >
            <VideoReviewCard review={review} />
          </div>
        ))}
      </div>
    </div>
  );
}

function StickyCTA({ product, selectedVariant, openCart }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const checkCartOpen = () => {
      const cartOverlay = document.querySelector('.overlay.expanded');
      setIsCartOpen(cartOverlay ? true : false);
    };
    checkCartOpen();
    const overlays = document.querySelectorAll('.overlay');
    if (overlays.length > 0) {
      const observer = new MutationObserver(() => {
        checkCartOpen();
      });
      overlays.forEach((overlay) => {
        observer.observe(overlay, {
          attributes: true,
          attributeFilter: ['class'],
        });
      });
      return () => observer.disconnect();
    }
  }, []);

  if (isCartOpen || !isVisible || !selectedVariant?.availableForSale) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#FB8A38] p-4 z-40 md:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] animate-in slide-in-from-bottom duration-300">
      <div className="flex gap-4 items-center">
        <div className="flex-1 min-w-0">
          <p className="text-[#3A8ECD] font-bold truncate text-sm">{product.title}</p>
          <p className="text-[#FB8A38] font-semibold text-sm"><Money data={selectedVariant.price} /></p>
        </div>
        <CartForm
            route="/cart"
            inputs={{lines: [{merchandiseId: selectedVariant.id, quantity: 1}]}}
            action={CartForm.ACTIONS.LinesAdd}
        >
           {(fetcher) => (
             <button 
               type="submit" 
               onClick={() => setTimeout(() => openCart('cart'), 500)}
               className="bg-[#3A8ECD] text-white px-6 py-3 rounded-sm font-bold uppercase tracking-wider text-xs shadow-lg whitespace-nowrap"
             >
               {fetcher.state === 'submitting' ? '...' : 'Adicionar'}
             </button>
           )}
        </CartForm>
      </div>
    </div>
  );
}

export const meta = ({data}) => {
  const product = data?.product;
  const shopUrl = data?.shopUrl;
  const selectedVariant = data?.selectedVariant;

  const title = product?.seo?.title ?? `brinqueTEAndo | ${product?.title ?? 'Brinquedo Educativo'} - Loja Oficial`;
  const description = product?.seo?.description || product?.description?.substr(0, 160) || 'Descubra brinquedos educativos e sensoriais para TEA e TDAH. Desenvolvimento através da brincadeira. Frete grátis para Baixada Santista.';
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
    const [{product}, {menu: footerMenu}, upgradeProducts] = await Promise.all([
      storefront.query(PRODUCT_QUERY, {
        variables: {handle, selectedOptions: getSelectedProductOptions(request)},
      }),
      storefront.query(FOOTER_MENU_QUERY, {
        variables: { footerMenuHandle: 'footer' }
      }),
      storefront.query(UPGRADE_PRODUCTS_QUERY),
    ]);

    if (!product?.id) {
      throw new Response(null, {status: 404});
    }

    const {cart} = context;
    const url = new URL(request.url);
    const shopUrl = `${url.protocol}//${url.host}`;

    const selectedVariant = product.selectedOrFirstAvailableVariant;

    let judgeMeReviews = {reviews: [], rating: 0, reviewCount: 0};
    try {
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
      footerMenu,
      upgradeProducts,
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

export default function Product() {
  const {product, footerMenu, upgradeProducts, cart, shopUrl, judgeMeReviews} = useLoaderData();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [timeLeft, setTimeLeft] = useState({days: 0, hours: 0, minutes: 0, seconds: 0});
  const [currentHoliday, setCurrentHoliday] = useState({name: 'Evento', emoji: '🎉', message: 'COUNTDOWN'});
  const [quantity, setQuantity] = useState(1);
  const [expandedUpgrades, setExpandedUpgrades] = useState(true);
  const [selectedUpgrades, setSelectedUpgrades] = useState([]);
  const {open} = useAside();
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState('opacity-100');
  const [urgencyNumber, setUrgencyNumber] = useState(13);

  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    getAdjacentAndFirstAvailableVariants(product),
  );

  useSelectedOptionInUrlParam(selectedVariant.selectedOptions);

  const productOptions = getProductOptions({
    ...product,
    selectedOrFirstAvailableVariant: selectedVariant,
  });

  const images = product.images?.edges || [];
  const currentImage = images[selectedImage]?.node;

  const hasApiReviews =
    judgeMeReviews &&
    Array.isArray(judgeMeReviews.reviews) &&
    judgeMeReviews.reviews.length > 0;

  useEffect(() => {
    if (typeof window !== 'undefined' && window.jdgm && window.jdgm.widget) {
      const timer = setTimeout(() => {
        console.log('🔄 Judge.me: Triggering widget reload for product', product.id);
        window.jdgm.widget.load();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [product.id]);

  useEffect(() => {
    if (selectedVariant?.image?.id) {
      const variantImageIndex = images.findIndex(
        edge => edge.node?.id === selectedVariant.image.id
      );
      if (variantImageIndex !== -1) {
        setSelectedImage(variantImageIndex);
      }
    }
  }, [selectedVariant?.image?.id, images]);

  const baseReviews = [
    { initial: 'MC', name: 'Maria Clara', video: 'https://cdn.shopify.com/videos/c/o/v/bedc8a64449e432b8c018f4ae4e4eb99.mp4', review: 'Meu filho com TEA adorou! Ajudou muito na coordenação motora dele. Recomendo demais!', location: 'Santos, SP' },
    { initial: 'JS', name: 'João Silva', video: 'https://cdn.shopify.com/videos/c/o/v/26ccc97133a44d8fa6fa0ea44a711de4.mp4', review: 'Produto excelente! Minha filha com TDAH está muito mais focada depois que começou a brincar.', location: 'São Paulo, SP' },
    { initial: 'AP', name: 'Ana Paula', video: 'https://cdn.shopify.com/videos/c/o/v/32f5d47288514f01ba501ba6406468e2.mp4', review: 'Brinquedo sensorial incrível! Nota 10 para a qualidade e entrega rápida.', location: 'Praia Grande, SP' },
    { initial: 'RC', name: 'Roberto Costa', video: 'https://cdn.shopify.com/videos/c/o/v/80044545817c46bcb26b2ef8c913b1a6.mp4', review: 'Excepcional! Meu sobrinho autista não larga. Desenvolvimento visível.', location: 'Guarujá, SP' },
  ];

  const reviewsData = [...baseReviews, ...baseReviews.map(r => ({...r, name: r.name + ' (Verificado)'}))];

  const nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1);
  const priceValidUntil = nextYear.toISOString().split('T')[0];
  
  const productUrl = shopUrl ? `${shopUrl}/products/${product.handle}` : '';
  const cleanId = product.id?.split('/').pop() || ''; 
  const finalSku = selectedVariant?.sku || cleanId;
  const productNumericId = product.id?.split('/').pop() || product.id;

  const schema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.title,
    "image": images.length > 0 ? images.map(img => img.node.url) : [product.featuredImage?.url],
    "description": product.description?.replace(/(<([^>]+)>)/gi, "").substr(0, 160) || "Brinquedo educativo e sensorial da brinqueTEAndo.",
    "sku": finalSku,
    "mpn": finalSku,
    "brand": {
      "@type": "Brand",
      "name": "brinqueTEAndo"
    },
    "offers": {
      "@type": "Offer",
      "url": productUrl,
      "priceCurrency": selectedVariant?.price?.currencyCode || "BRL",
      "price": selectedVariant?.price?.amount,
      "priceValidUntil": priceValidUntil,
      "availability": selectedVariant?.availableForSale ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "itemCondition": "https://schema.org/NewCondition",
      "seller": {
        "@type": "Organization",
        "name": "brinqueTEAndo"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "3498",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

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
    setSelectedUpgrades(prev => 
      prev.includes(upgradeId)
        ? prev.filter(id => id !== upgradeId)
        : [...prev, upgradeId]
    );
  };

  const upgradesTotal = upgrades
    .filter(u => selectedUpgrades.includes(u.id))
    .reduce((sum, u) => sum + u.price, 0);

  const getCartLines = () => {
    const lines = [];
    if (selectedVariant) {
      lines.push({
        merchandiseId: selectedVariant.id,
        quantity: quantity,
      });
    }
    selectedUpgrades.forEach(upgradeId => {
      const upgrade = upgrades.find(u => u.id === upgradeId);
      if (upgrade && upgrade.variantId && upgrade.available) {
        lines.push({
          merchandiseId: upgrade.variantId,
          quantity: 1,
        });
      }
    });
    return lines;
  };

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
      setCurrentHoliday({
        name: nextHoliday.name,
        emoji: nextHoliday.emoji,
        message: nextHoliday.message
      });
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return {days: 0, hours: 0, minutes: 0, seconds: 0};
  };

  useEffect(() => {
    setTimeLeft(calculateHolidayCountdown());
    const countdownInterval = setInterval(() => {
      setTimeLeft(calculateHolidayCountdown());
    }, 1000);
    return () => clearInterval(countdownInterval);
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

  return (
    <Aside.Provider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}} />
      
      <Aside type="cart" heading="CARRINHO">
        <Suspense fallback={<p>Carregando carrinho ...</p>}>
          <Await resolve={cart}>
            {(cart) => {
              return <CartMain cart={cart} layout="aside" />;
            }}
          </Await>
        </Suspense>
      </Aside>
      <div className="min-h-screen bg-[#FEFDF8]">
      
      {/* TRUST BAR */}
      <div className="bg-[#3A8ECD] text-white py-3 text-center sticky top-0 z-[60] shadow-md">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-4 flex-wrap">
          <span className="text-xs md:text-sm font-bold tracking-widest text-[#FB8A38] uppercase animate-pulse">
            FRETE GRÁTIS PARA BAIXADA SANTISTA
          </span>
          <span className="hidden md:inline text-gray-300">|</span>
          <span className="text-sm md:text-base font-bold tracking-wide">
            {currentHoliday?.emoji} {currentHoliday?.message} {currentHoliday?.emoji}
          </span>
          <div className="flex items-center gap-2 border-2 border-white px-4 py-1 bg-white/20">
            <span className="text-2xl font-bold">{String(timeLeft.days).padStart(2, '0')}</span>
            <span className="text-xs">D</span>
            <span className="text-2xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</span>
            <span className="text-xs">H</span>
            <span className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span className="text-xs">M</span>
            <span className="text-2xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</span>
            <span className="text-xs">S</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-0">
        <div className="bg-gradient-to-r from-[#FB8A38] via-[#FBA25C] to-[#FB8A38] py-8 px-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.1) 10px, rgba(255,255,255,.1) 20px)'}}></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-[#3A8ECD] text-3xl md:text-4xl font-light mb-6 tracking-wide text-center">
              💝 Desenvolvimento com Diversão
            </h2>
            <p className="text-[#3A8ECD] text-lg font-semibold mb-4 text-center">
              🎅 Use o código: <span className="text-white bg-[#3A8ECD] px-4 py-1 rounded-md font-bold">TEA25</span> para 25% OFF
            </p>
            <p className="text-sm text-gray-700 text-center">❤️ Brinquedos Selecionados para TEA e TDAH — Disponível Agora.</p>
          </div>
        </div>
        <div className="bg-[#FEFDF8] border-l-2 border-[#FB8A38] py-8 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-6 flex-wrap text-center">
              <div>
                <h3 className="text-4xl font-bold text-[#3A8ECD] mb-1">Qualidade</h3>
                <p className="text-sm text-gray-600">Produtos selecionados</p>
              </div>
              <span className="text-5xl text-[#FB8A38] font-serif italic">&</span>
              <div>
                <h3 className="text-4xl font-bold text-[#3A8ECD] mb-1">Segurança</h3>
                <p className="text-sm text-gray-600">Certificados</p>
              </div>
              <span className="text-2xl text-gray-600 font-medium">Mais</span>
              <div>
                <h3 className="text-3xl font-bold text-[#3A8ECD] mb-1">Frete Grátis</h3>
                <p className="text-sm text-gray-600">Baixada Santista</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#FB8A38] text-white py-3 text-center">
        <p className="text-sm md:text-base font-semibold tracking-wide">
          ⭐ Entre no brinqueTEAndo REWARDS - Ganhe Pontos!
        </p>
      </div>

      <div className="bg-[#F5F3ED] border-b border-[#FB8A38]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-xl font-serif text-[#3A8ECD]">🎁 COMPRE COM CONFIANÇA:</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-start justify-center md:justify-start gap-3">
              <div>
                <p className="text-[#3A8ECD] font-semibold mb-1"><span className="text-[#FB8A38]">Entrega</span> Garantida</p>
                <p className="text-gray-600 text-sm">Envio rápido para todo Brasil. <span className="underline cursor-pointer">Detalhes</span></p>
              </div>
            </div>
            <div className="flex items-start justify-center gap-3">
              <div>
                <p className="text-[#3A8ECD] font-semibold mb-1"><span className="text-[#FB8A38]">Melhor</span> Preço Garantido</p>
                <p className="text-gray-600 text-sm">Garantia de 30 dias. <span className="underline cursor-pointer">Detalhes</span></p>
              </div>
            </div>
            <div className="flex items-start justify-center md:justify-end gap-3">
              <div>
                <p className="text-[#3A8ECD] font-semibold mb-1"><span className="text-[#FB8A38]">Devolução</span> Fácil</p>
                <p className="text-gray-600 text-sm">Trocas facilitadas. <span className="underline cursor-pointer">Detalhes</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav className="bg-white shadow-sm sticky top-[48px] z-50">
        <div className="max-w-7xl mx-auto px-3 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <Link to="/" className="flex items-center group flex-shrink-0" aria-label="brinqueTEAando Homepage">
              <div className="flex items-center gap-1 font-bold text-xl sm:text-2xl md:text-3xl tracking-tight">
                <span className="text-[#3A8ECD]">brinque</span>
                <span className="bg-[#FB8A38] text-white px-1 sm:px-2 rounded-md">TEA</span>
                <span className="text-[#FBA25C]">ando</span>
              </div>
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

            <div className="flex items-center gap-1 sm:gap-2">
              <Link to="/account" className="text-[#3A8ECD] hover:text-[#FB8A38] text-[10px] sm:text-xs font-medium whitespace-nowrap transition-colors px-1 sm:px-2">
                Entrar
              </Link>

              <button 
                onClick={() => {
                  const menu = document.getElementById('mobile-menu');
                  menu.classList.toggle('hidden');
                }}
                className="lg:hidden text-[#3A8ECD] p-2"
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          <div id="mobile-menu" className="hidden lg:hidden mt-4 pb-4 w-full">
            <div className="flex flex-col space-y-2">
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

      <div className="bg-[#3A8ECD] text-white py-3">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-medium tracking-wider">🚚 Frete grátis para Praia Grande, São Vicente e Santos • Envio rápido • Compra segura 🎉</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* PRODUCT IMAGE GALLERY */}
          <div>
            <div className="aspect-square bg-gradient-to-br from-[#F5F3ED] to-[#FEFDF8] rounded-lg overflow-hidden mb-4 border-2 border-[#FB8A38]">
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
              <div className="grid grid-cols-6 gap-2">
                {images.slice(0, 6).map((edge, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded overflow-hidden border-2 transition-all ${
                      selectedImage === idx ? 'border-[#3A8ECD]' : 'border-[#FB8A38]'
                    }`}
                  >
                    <Image 
                      data={edge.node} 
                      className="w-full h-full object-cover"
                      alt={`View ${idx + 1}`}
                      loading="lazy"
                      widths={[80, 100, 150]}
                      sizes="15vw"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* PRODUCT DETAILS */}
          <div>
            <p className="text-[#FB8A38] text-xs font-bold tracking-widest uppercase mb-2">
              COLEÇÃO BRINQUETEANDO
            </p>
            <h1 className="text-4xl md:text-5xl font-light text-[#3A8ECD] mb-4 tracking-wide">
              {product.title}
            </h1>
            
            {selectedVariant?.price && (
              <div className="text-3xl font-bold text-[#3A8ECD] mb-6">
                <Money data={selectedVariant.price} />
              </div>
            )}
            
            <div className="bg-gradient-to-r from-[#FB8A38]/10 to-transparent p-4 rounded-lg mb-6 border-l-4 border-[#FB8A38]">
              <p className="font-semibold text-[#3A8ECD] mb-1">
                {selectedVariant?.availableForSale ? '✓ Em Estoque' : '✗ Fora de Estoque'}
              </p>
              <p className="text-sm text-gray-600">
                Frete grátis para Baixada Santista. Envio para todo Brasil.
              </p>
            </div>

            {product.options && product.options.length > 0 && (
              <div className="mt-6 mb-6">
                {product.options.map((option) => {
                  const currentValue = selectedVariant?.selectedOptions?.find(
                    opt => opt.name === option.name
                  )?.value || option.optionValues[0]?.name;

                  return (
                    <div key={option.name} className="mb-6">
                      <label className="block text-sm font-semibold text-[#3A8ECD] mb-3">
                        {option.name}: <span className="text-[#FB8A38]">{currentValue}</span>
                      </label>
                      <div className="grid grid-cols-4 gap-3">
                        {option.optionValues.map((optionValue) => {
                          const variant = optionValue.firstSelectableVariant;
                          const isActive = currentValue === optionValue.name;
                          const isAvailable = variant?.availableForSale;

                          const searchParams = new URLSearchParams();
                          selectedVariant?.selectedOptions?.forEach(opt => {
                            if (opt.name !== option.name) {
                              searchParams.set(opt.name, opt.value);
                            }
                          });
                          searchParams.set(option.name, optionValue.name);
                          const to = `?${searchParams.toString()}`;

                          return (
                            <Link
                              key={optionValue.name}
                              to={to}
                              preventScrollReset
                              replace
                              className={`aspect-square rounded-lg overflow-hidden border-2 transition-all relative ${
                                isActive
                                  ? 'border-[#3A8ECD] ring-2 ring-[#FB8A38]'
                                  : isAvailable
                                  ? 'border-[#FB8A38] hover:border-[#3A8ECD]'
                                  : 'border-gray-300 opacity-50 cursor-not-allowed'
                              }`}
                              title={optionValue.name}
                            >
                              {variant?.image ? (
                                <Image 
                                  data={variant.image}
                                  className="w-full h-full object-cover"
                                  alt={optionValue.name}
                                  sizes="(max-width: 768px) 20vw, 10vw"
                                  widths={[100, 200]}
                                />
                              ) : optionValue.swatch?.color ? (
                                <div 
                                  className="w-full h-full" 
                                  style={{backgroundColor: optionValue.swatch.color}}
                                ></div>
                              ) : optionValue.swatch?.image?.previewImage?.url ? (
                                <img
                                  src={optionValue.swatch.image.previewImage.url}
                                  alt={optionValue.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full bg-[#F5F3ED] flex items-center justify-center text-xs text-[#3A8ECD] font-semibold text-center p-2">
                                  {optionValue.name}
                                </div>
                              )}
                              {isActive && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                  <div className="bg-white rounded-full p-1">
                                    <svg className="w-4 h-4 text-[#3A8ECD]" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                    </svg>
                                  </div>
                                </div>
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

            <div className="mt-6 mb-6">
              <label className="block text-sm font-semibold text-[#3A8ECD] mb-3">
                Quantidade
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center border-2 border-[#FB8A38] text-[#3A8ECD] hover:bg-[#FB8A38] hover:text-white transition-all rounded-md font-bold"
                >
                  −
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 h-10 text-center border-2 border-[#FB8A38] rounded-md text-[#3A8ECD] font-semibold focus:outline-none focus:ring-2 focus:ring-[#FB8A38]"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center border-2 border-[#FB8A38] text-[#3A8ECD] hover:bg-[#FB8A38] hover:text-white transition-all rounded-md font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {upgrades.length > 0 && (
              <div className="mb-8 bg-white border-2 border-[#FB8A38] rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedUpgrades(!expandedUpgrades)}
                  className="w-full p-4 flex items-center justify-between bg-gradient-to-r from-[#FB8A38]/5 to-transparent hover:from-[#FB8A38]/10 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🎁</span>
                    <span className="font-bold text-[#3A8ECD]">Frequentemente comprados juntos</span>
                    <span className="text-xs bg-[#FB8A38] text-white px-2 py-1 rounded-full font-bold">
                      {upgrades.length}
                    </span>
                  </div>
                  <span className={`text-xl transition-transform ${expandedUpgrades ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                
                {expandedUpgrades && (
                  <div className="p-4 space-y-3 bg-white border-t border-[#FB8A38]">
                    {upgrades.map((upgrade) => (
                      <label
                        key={upgrade.id}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#F5F3ED] transition-all cursor-pointer border border-[#FB8A38]/20"
                      >
                        <input
                          type="checkbox"
                          checked={selectedUpgrades.includes(upgrade.id)}
                          onChange={(e) => {
                            e.stopPropagation();
                            if (upgrade.available) {
                              toggleUpgrade(upgrade.id);
                            }
                          }}
                          disabled={!upgrade.available}
                          className="w-5 h-5 cursor-pointer accent-[#FB8A38]"
                        />
                        <div className="text-3xl">{upgrade.icon}</div>
                        <div className="flex-1">
                          <p className="font-semibold text-[#3A8ECD] text-sm">{upgrade.name}</p>
                          {upgrade.description && (
                            <p className="text-xs text-gray-600 mt-1">{upgrade.description}</p>
                          )}
                          <p className="text-xs text-gray-600 capitalize mt-1">{upgrade.category}</p>
                        </div>
                        <span className="font-bold text-[#FB8A38] text-lg">
                          R$ {upgrade.price.toFixed(2)}
                        </span>
                      </label>
                    ))}
                    {selectedUpgrades.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-[#FB8A38]/30 bg-gradient-to-r from-[#FB8A38]/5 to-transparent p-3 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-[#3A8ECD]">Total de Extras:</span>
                          <span className="text-lg font-bold text-[#FB8A38]">
                            R$ {upgradesTotal.toFixed(2)}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mt-2">✓ Complementos perfeitos para seu brinquedo</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            <CartForm
              route="/cart"
              inputs={{lines: getCartLines()}}
              action={CartForm.ACTIONS.LinesAdd}
            >
              {fetcher => (
                <CartFormContents
                  fetcher={fetcher}
                  open={open}
                  selectedVariant={selectedVariant}
                  urgencyNumber={urgencyNumber}
                  fadeClass={fadeClass}
                  currentMessageIndex={currentMessageIndex}
                />
              )}
            </CartForm>

            {product.descriptionHtml && (
              <div className="mt-8 p-6 bg-[#F5F3ED] rounded-lg">
                <h2 className="text-xl font-bold text-[#3A8ECD] mb-3">
                  Sobre Este Brinquedo
                </h2>
                <div 
                  className="text-gray-600 prose prose-sm"
                  dangerouslySetInnerHTML={{__html: product.descriptionHtml}}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Why brinqueTEAndo Section */}
      <section className="bg-[#3A8ECD] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-light text-[#FB8A38] text-center mb-12 tracking-wide">
            Por que brinqueTEAndo
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {title: 'Curadoria Especializada', desc: 'Produtos selecionados por especialistas em desenvolvimento infantil e neurodiversidade.'},
              {title: 'Desenvolvimento Integral', desc: 'Brinquedos que estimulam coordenação, concentração, habilidades sociais e criatividade.'},
              {title: 'Qualidade Garantida', desc: 'Produtos certificados, seguros e testados para crianças com TEA e TDAH.'}
            ].map((feature, idx) => (
              <div key={idx} className="text-center">
                <h3 className="text-xl font-bold text-[#FB8A38] mb-3">
                  {feature.title}
                </h3>
                <p className="text-white">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS SECTION: CAROUSEL */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-[#3A8ECD] mb-4 tracking-wide">
              Avaliações de Famílias Satisfeitas
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto text-center">
              Junte-se a milhares de famílias que confiam na brinqueTEAndo
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#3A8ECD] to-[#82CBB7] rounded-2xl p-8 md:p-12 mb-16 text-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-4xl md:text-5xl font-bold text-[#FB8A38] mb-2">3.498+</div>
                <div className="text-sm text-white/70 uppercase tracking-widest">Famílias Felizes</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-[#FB8A38] mb-2">4.9</div>
                <div className="text-sm text-white/70 uppercase tracking-widest">Avaliação Média</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-[#FB8A38] mb-2">98%</div>
                <div className="text-sm text-white/70 uppercase tracking-widest">Recomendam</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-[#FB8A38] mb-2">3K+</div>
                <div className="text-sm text-white/70 uppercase tracking-widest">5 Estrelas</div>
              </div>
            </div>
          </div>

          <ReviewsCarousel reviews={reviewsData} />

          <div className="text-center mt-12">
            <button className="bg-[#3A8ECD] text-white px-12 py-4 rounded-md hover:bg-[#FB8A38] transition-all duration-300 font-semibold uppercase tracking-wider shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Carregar Mais Avaliações
            </button>
          </div>
        </div>
      </section>

      {/* Judge.me Reviews Section */}
      <section className="py-16 bg-white border-t border-[#FB8A38]/30" id="product-reviews">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-light text-[#3A8ECD] mb-4 tracking-wide">
              Avaliações de Clientes
            </h2>
            <p className="text-gray-600 text-lg">
              Veja o que nossos clientes estão dizendo sobre este produto
            </p>
          </div>

          {hasApiReviews && (
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4 gap-4">
                <div>
                  <p className="text-sm font-semibold text-[#3A8ECD]">
                    {(() => {
                      const ratingValue =
                        typeof judgeMeReviews.rating === 'number'
                          ? judgeMeReviews.rating
                          : Number(judgeMeReviews.rating || 0);
                      const safeRating = Number.isNaN(ratingValue) ? 0 : ratingValue;
                      return `${safeRating.toFixed(1)} / 5.0`;
                    })()}
                  </p>
                  <p className="text-xs text-gray-600">
                    Baseado em {judgeMeReviews.reviewCount || judgeMeReviews.reviews.length} avaliações
                  </p>
                </div>
                <div className="text-[#FB8A38] text-lg whitespace-nowrap">
                  {(() => {
                    const ratingValue =
                      typeof judgeMeReviews.rating === 'number'
                        ? judgeMeReviews.rating
                        : Number(judgeMeReviews.rating || 0);
                    const safeRating = Number.isNaN(ratingValue) ? 0 : ratingValue;
                    const rounded = Math.round(safeRating);
                    const clamped = Math.max(0, Math.min(5, rounded));
                    const fullStars = '★'.repeat(clamped);
                    const emptyStars = '☆'.repeat(5 - clamped);
                    return fullStars + emptyStars;
                  })()}
                </div>
              </div>

              <div className="space-y-4">
                {judgeMeReviews.reviews.map((review, index) => {
                  const ratingValue =
                    typeof review.rating === 'number'
                      ? review.rating
                      : Number(review.rating || 0);
                  const safeRating = Number.isNaN(ratingValue) ? 0 : ratingValue;
                  const rounded = Math.round(safeRating);
                  const clamped = Math.max(0, Math.min(5, rounded));
                  const fullStars = '★'.repeat(clamped);
                  const emptyStars = '☆'.repeat(5 - clamped);

                  const textBody =
                    review.body ||
                    (typeof review.body_html === 'string'
                      ? review.body_html.replace(/<[^>]+>/g, '')
                      : '');

                  return (
                    <div
                      key={review.id || `${review.created_at || ''}-${index}`}
                      className="p-6 bg-[#FEFDF8] border border-[#FB8A38]/70 rounded-lg shadow-sm flex flex-col gap-4"
                    >
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-4 mb-2">
                          <div>
                            <p className="text-sm font-semibold text-[#3A8ECD]">
                              {review.reviewer_name || 'Cliente Verificado'}
                            </p>
                          </div>
                          <div className="text-[#FB8A38] text-sm whitespace-nowrap">
                            {fullStars}
                            {emptyStars}
                          </div>
                        </div>
                        {textBody && (
                          <p className="text-sm text-[#3A8ECD] leading-relaxed">
                            {textBody}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mb-8">
            <div
              className="jdgm-preview-badge"
              data-shop-domain="kp0zf4-m0.myshopify.com"
              data-id={productNumericId}
              data-product-id={productNumericId}
            ></div>

            {product.metafields?.find(m => m?.key === 'widget')?.value ? (
              <div 
                id="judgeme_product_reviews"
                className="jdgm-widget jdgm-review-widget"
                data-shop-domain="kp0zf4-m0.myshopify.com"
                data-product-title={product.title}
                data-id={productNumericId}
                data-product-id={productNumericId}
                dangerouslySetInnerHTML={{
                  __html: product.metafields.find(m => m?.key === 'widget').value
                }}
              />
            ) : (
              <div
                id="judgeme_product_reviews"
                className="jdgm-widget jdgm-review-widget jdgm-outside-widget"
                data-shop-domain="kp0zf4-m0.myshopify.com"
                data-product-title={product.title}
                data-id={productNumericId}
                data-product-id={productNumericId}
                data-widget="review"
                data-auto-install="false"
                data-entry-point="review_widget.js"
                data-entry-key="review-widget/main.js"
              >
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-[#FEFDF8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-light text-[#3A8ECD] text-center mb-12 tracking-wide">
            Perguntas Frequentes
          </h2>
          <div className="space-y-4">
            {[
              {q: 'Vocês entregam para todo o Brasil?', a: 'Sim! Oferecemos frete GRÁTIS para toda Baixada Santista (Santos, São Vicente, Praia Grande, Mongaguá) e entregamos para todo Brasil.'},
              {q: 'Os brinquedos são adequados para crianças com TEA e TDAH?', a: 'Sim! Todos os produtos são cuidadosamente selecionados por especialistas em desenvolvimento infantil e neurodiversidade, focados em estimular habilidades específicas.'},
              {q: 'Qual a garantia dos produtos?', a: 'Todos os brinquedos incluem garantia contra defeitos de fabricação. Além disso, oferecemos trocas facilitadas em até 30 dias.'},
              {q: 'Quanto tempo leva a entrega?', a: 'Para Baixada Santista: 2-5 dias úteis com frete grátis. Para outras regiões: 7-15 dias úteis. Você receberá código de rastreamento.'},
              {q: 'Os produtos são certificados e seguros?', a: 'Sim. Todos os brinquedos são certificados pelo INMETRO, feitos com materiais atóxicos e seguros para crianças.'}
            ].map((faq, idx) => (
              <div key={idx} className="border border-[#FB8A38] rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className={`w-full p-4 text-left font-semibold flex justify-between items-center transition-colors ${
                    expandedFaq === idx ? 'bg-[#3A8ECD] text-white' : 'bg-white text-[#3A8ECD]'
                  }`}
                >
                  {faq.q}
                  <span className={`transition-transform ${expandedFaq === idx ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {expandedFaq === idx && (
                  <div className="p-4 bg-[#F5F3ED] text-gray-600 border-t border-[#FB8A38]">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="relative bg-gradient-to-b from-[#3A8ECD] via-[#82CBB7] to-[#3A8ECD] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #FB8A38 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="relative border-b border-[#FB8A38]/20">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-4xl font-light text-[#FB8A38] mb-3 tracking-wide">
                  Junte-se à Comunidade
                </h3>
                <p className="text-gray-100 text-lg">
                  Receba novidades, dicas e ofertas exclusivas para famílias.
                </p>
              </div>
              <FooterNewsletterForm />
            </div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="lg:col-span-2">
              <Link to="/" className="inline-block mb-6 group">
                <div className="flex items-center gap-1 font-bold text-3xl tracking-tight">
                  <span className="text-white">brinque</span>
                  <span className="bg-[#FB8A38] text-white px-2 rounded-md">TEA</span>
                  <span className="text-[#FBA25C]">ando</span>
                </div>
              </Link>
              <p className="text-gray-100 text-sm leading-relaxed mb-6 max-w-xs">
                Brinquedos educativos e sensoriais selecionados especialmente para crianças com TEA e TDAH. Desenvolvimento através da brincadeira.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-[#FB8A38]/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#FB8A38]">✓</span>
                  </div>
                  <span className="text-gray-100">Frete Grátis Baixada Santista</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-[#FB8A38]/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#FB8A38]">✓</span>
                  </div>
                  <span className="text-gray-100">Produtos Certificados INMETRO</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-[#FB8A38]/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#FB8A38]">✓</span>
                  </div>
                  <span className="text-gray-100">Trocas Facilitadas</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-[#FB8A38] text-sm font-bold mb-6 uppercase tracking-widest relative inline-block">
                Explorar
              </h3>
              <ul className="space-y-3">
                <li><Link to="/collections/brinquedos-terapeuticos" className="text-gray-100 hover:text-[#FB8A38] text-sm transition-colors">Brinquedos Terapêuticos</Link></li>
                <li><Link to="/collections/por-necessidade" className="text-gray-100 hover:text-[#FB8A38] text-sm transition-colors">Por Necessidade</Link></li>
                <li><Link to="/collections/por-idade" className="text-gray-100 hover:text-[#FB8A38] text-sm transition-colors">Por Idade</Link></li>
                <li><Link to="/collections/ambiente-rotina" className="text-gray-100 hover:text-[#FB8A38] text-sm transition-colors">Ambiente & Rotina</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-[#FB8A38] text-sm font-bold mb-6 uppercase tracking-widest relative inline-block">
                Suporte
              </h3>
              <ul className="space-y-3">
                <li><Link to="/pages/faq" className="text-gray-100 hover:text-[#FB8A38] text-sm transition-colors">FAQ</Link></li>
                <li><Link to="/pages/contact" className="text-gray-100 hover:text-[#FB8A38] text-sm transition-colors">Contato</Link></li>
                <li><Link to="/pages/shipping-policy" className="text-gray-100 hover:text-[#FB8A38] text-sm transition-colors">Política de Envio</Link></li>
                <li><Link to="/pages/privacy-policy" className="text-gray-100 hover:text-[#FB8A38] text-sm transition-colors">Política de Privacidade</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#FB8A38]/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-200">
              <p>© {new Date().getFullYear()} brinqueTEAndo. Todos os direitos reservados.</p>
              <div className="flex items-center gap-4">
                <span className="text-[#FB8A38]">★★★★★</span>
                <span>Avaliado 4.9/5 por 3.498+ famílias</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <StickyCTA product={product} selectedVariant={selectedVariant} openCart={open} />
    </div>
  </Aside.Provider>
  );
}

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
`;

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    productType
    encodedVariantAvailability
    encodedVariantExistence
    metafields(identifiers: [{namespace: "judgeme", key: "widget"}, {namespace: "judgeme", key: "review_widget_data"}]) {
      key
      value
    }
    images(first: 20) {
      edges {
        node {
          id
          url
          altText
          width
          height
        }
      }
    }
    options {
      name
      optionValues {
        name
        firstSelectableVariant {
          ...ProductVariant
        }
        swatch {
          color
          image {
            previewImage {
              url
            }
          }
        }
      }
    }
    selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    adjacentVariants(selectedOptions: $selectedOptions) {
      ...ProductVariant
    }
    seo {
      description
      title
    }
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
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
`;

const UPGRADE_PRODUCTS_QUERY = `#graphql
  query UpgradeProducts($country: CountryCode, $language: LanguageCode) 
  @inContext(country: $country, language: $language) {
    giftWrap: product(handle: "embrulho-para-presente") {
      id
      handle
      title
      featuredImage {
        url
      }
      variants(first: 1) {
        edges {
          node {
            id
            availableForSale
            price {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

const FOOTER_MENU_QUERY = `#graphql
  fragment ProductFooterMenuItem on MenuItem {
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
  
  query ProductFooterMenu($footerMenuHandle: String!) {
    menu(handle: $footerMenuHandle) {
      id
      items {
        ...ProductFooterMenuItem
      }
    }
  }
`;