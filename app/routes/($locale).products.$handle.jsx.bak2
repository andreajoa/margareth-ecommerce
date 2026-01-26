import {useLoaderData, Link, useRouteLoaderData} from 'react-router';
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
import {NavigationMenu} from '~/components/NavigationMenu';

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
    {text: `🔥 ${urgencyNumber} famílias estão vendo este produto agora`, color: 'text-orange-600'},
    {text: '🏆 Mais vendido para TEA e TDAH', color: 'text-[#FFD93D]'},
    {text: `⚡ Apenas ${urgencyNumber} unidades neste preço!`, color: 'text-red-600'},
    {text: '🚚 Frete grátis para São Vicente, Santos e Praia Grande', color: 'text-[#4A90E2]'},
  ];

  return (
    <div className="space-y-3">
      <button
        type="submit"
        disabled={!selectedVariant || !selectedVariant.availableForSale || isLoading}
        className="w-full relative overflow-hidden text-white py-4 px-8 text-lg font-semibold tracking-wide transition-all duration-500 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed group rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, #4A90E2 0%, #2B88D9 100%)'
        }}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {isLoading ? (
            <>
              <span className="inline-block animate-spin">⚙️</span>
              Adicionando ao carrinho...
            </>
          ) : (
            <>
              <span>🛒 Adicionar ao Carrinho</span>
            </>
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
        className="w-full text-center text-sm font-semibold underline transition-colors py-2"
        style={{color: '#4A90E2'}}
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

/* 
   -----------------------------------------------------------------------
   HEADERS: CACHE CONTROL (Novo: Resolve aviso de Cache Policy)
   -----------------------------------------------------------------------
*/
export const headers = () => {
  return {
    'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
  };
};

/* 
   -----------------------------------------------------------------------
   HOOK: UseInView (For Lazy Loading Videos)
   -----------------------------------------------------------------------
*/
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

/* 
   -----------------------------------------------------------------------
   COMPONENT: VideoReviewCard
   -----------------------------------------------------------------------
*/
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
      <div className="aspect-[3/4] relative bg-gradient-to-br from-[#0A3D2F] to-[#1a5f4a]">
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
          <div className="w-full h-full bg-[#0A3D2F] opacity-50 flex items-center justify-center">
            <span className="text-[#D4AF69] text-xs">Loading...</span>
          </div>
        )}
        
        {(!isPlaying && isInView) && (
          <div 
            className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer group-hover:bg-black/30 transition-colors"
            onClick={handleVideoClick}
          >
            <div className="w-14 h-14 rounded-full bg-[#0A3D2F]/90 backdrop-blur-sm flex items-center justify-center shadow-2xl transform transition-transform group-hover:scale-110 border border-[#D4AF69]">
              <div className="w-0 h-0 border-l-[16px] border-l-[#D4AF69] border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1"></div>
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-white p-4 border-t-2 border-[#D4AF69] flex-1 flex flex-col">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4AF69] to-[#b87333] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {review.initial}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[#0A3D2F] font-semibold text-sm truncate">{review.name}</div>
            <div className="text-[#D4AF69] text-[10px] uppercase tracking-wider font-bold">✓ Verified</div>
          </div>
        </div>
        
        <div className="flex text-[#D4AF69] text-xs mb-2">
          ★★★★★
        </div>
        
        <p className="text-[#0A3D2F] text-sm leading-relaxed line-clamp-3 mb-2 flex-1">
          {review.review}
        </p>
        
        <p className="text-[#9d8b7c] text-xs flex items-center gap-1 mt-auto pt-2 border-t border-gray-100">
          <span>📍</span>
          <span>{review.location}</span>
        </p>
      </div>
    </div>
  );
}

/* 
   -----------------------------------------------------------------------
   COMPONENT: ReviewsCarousel
   -----------------------------------------------------------------------
*/
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
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-12 h-12 bg-white text-[#0A3D2F] border-2 border-[#D4AF69] rounded-full items-center justify-center shadow-xl opacity-0 group-hover/carousel:opacity-100 transition-all hover:scale-110"
        aria-label="Previous reviews"
      >
        ←
      </button>
      
      <button 
        onClick={() => scroll('right')}
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-12 h-12 bg-white text-[#0A3D2F] border-2 border-[#D4AF69] rounded-full items-center justify-center shadow-xl opacity-0 group-hover/carousel:opacity-100 transition-all hover:scale-110"
        aria-label="Next reviews"
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

/*
   -----------------------------------------------------------------------
   COMPONENT: JudgemeReviews (Real Judge.me API Integration)
   -----------------------------------------------------------------------
*/
/*
   -----------------------------------------------------------------------
   COMPONENT: JudgemeReviews (Enhanced with Debugging)
   -----------------------------------------------------------------------
   API-based reviews display with comprehensive error handling and debugging
   This serves as a fallback/enhancement to the official Judge.me widget
*/
/*
   -----------------------------------------------------------------------
   COMPONENT: StickyCTA
   -----------------------------------------------------------------------*/
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
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#D4AF69] p-4 z-40 md:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] animate-in slide-in-from-bottom duration-300">
      <div className="flex gap-4 items-center">
        <div className="flex-1 min-w-0">
          <p className="text-[#0A3D2F] font-bold truncate text-sm">{product.title}</p>
          <p className="text-[#D4AF69] font-semibold text-sm"><Money data={selectedVariant.price} /></p>
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
               className="bg-[#0A3D2F] text-white px-6 py-3 rounded-sm font-bold uppercase tracking-wider text-xs shadow-lg whitespace-nowrap"
             >
               {fetcher.state === 'submitting' ? '...' : 'Add to Cart'}
             </button>
           )}
        </CartForm>
      </div>
    </div>
  );
}

/* 
   -----------------------------------------------------------------------
   SEO META CONFIGURATION
   -----------------------------------------------------------------------
*/
export const meta = ({data}) => {
  const product = data?.product;
  const shopUrl = data?.shopUrl;
  const selectedVariant = data?.selectedVariant;

  const title = product?.seo?.title ?? `BrinqueTEAndo | ${product?.title ?? 'Brinquedo TEA TDAH'} - Produtos Especializados`;
  const description = product?.seo?.description || product?.description?.substr(0, 160) || 'Produtos especializados para TEA, TDAH e autismo. Brinquedos sensoriais, comunicação alternativa, rotina visual e mais. Frete grátis para São Vicente, Santos e Praia Grande. Recomendado por terapeutas.';
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
    { property: 'og:site_name', content: 'BrinqueTEAndo' },
    { property: 'og:locale', content: 'pt_BR' },
    { property: 'og:price:amount', content: selectedVariant?.price?.amount },
    { property: 'og:price:currency', content: selectedVariant?.price?.currencyCode },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image },
    { name: 'theme-color', content: '#87CEEB' },
    ...(url ? [{ tagName: "link", rel: "canonical", href: url }] : []),
  ];
};

/*
   -----------------------------------------------------------------------
   SHOULD REVALIDATE - For real-time cart updates
   -----------------------------------------------------------------------
*/
export const shouldRevalidate = ({
  currentUrl,
  nextUrl,
  formMethod,
  defaultShouldRevalidate,
}) => {
  // Always revalidate after POST/PUT/PATCH/DELETE (cart actions)
  if (formMethod && formMethod !== 'GET') {
    return true;
  }

  // Always revalidate cart actions
  if (currentUrl.searchParams.has('cart') || nextUrl.searchParams.has('cart')) {
    return true;
  }

  return defaultShouldRevalidate;
};

/*
   -----------------------------------------------------------------------
   LOADER
   -----------------------------------------------------------------------
*/
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

/* 
   -----------------------------------------------------------------------
   MAIN PRODUCT COMPONENT
   -----------------------------------------------------------------------
*/
export default function Product() {
  const {product, footerMenu, upgradeProducts, cart, shopUrl, judgeMeReviews} = useLoaderData();
  const rootData = useRouteLoaderData('root');
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [timeLeft, setTimeLeft] = useState({days: 0, hours: 0, minutes: 0, seconds: 0});
  const [currentHoliday, setCurrentHoliday] = useState({name: 'Holiday', emoji: '🎉', message: 'COUNTDOWN'});
  const [quantity, setQuantity] = useState(1);
  const [expandedUpgrades, setExpandedUpgrades] = useState(true);
  const [selectedUpgrades, setSelectedUpgrades] = useState(['vastara-care']);
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

  // --- JUDGE.ME WIDGET RE-RENDER ---
  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined' && window.jdgm && window.jdgm.widget) {
      // Small delay to ensure DOM is ready
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

  // --- REVIEWS DATA ---
  const baseReviews = [
    { initial: 'JS', name: 'James Sullivan', video: 'https://cdn.shopify.com/videos/c/o/v/bedc8a64449e432b8c018f4ae4e4eb99.mp4', review: 'The quality exceeded all my expectations. This watch is a true statement piece that combines elegance with precision.', location: 'New York, USA' },
    { initial: 'EC', name: 'Eddy Collins', video: 'https://cdn.shopify.com/videos/c/o/v/26ccc97133a44d8fa6fa0ea44a711de4.mp4', review: 'Absolutely stunning! The attention to detail is remarkable. I\'ve owned luxury watches before, but this is on another level.', location: 'London, UK' },
    { initial: 'DM', name: 'David Martinez', video: 'https://cdn.shopify.com/videos/c/o/v/32f5d47288514f01ba501ba6406468e2.mp4', review: 'Perfect for both business meetings and casual outings. The craftsmanship is exceptional and worth every penny.', location: 'Toronto, Canada' },
    { initial: 'JS', name: 'John Steven', video: 'https://cdn.shopify.com/videos/c/o/v/80044545817c46bcb26b2ef8c913b1a6.mp4', review: 'Truly breathtaking! The level of detail is exceptional.', location: 'Sidney, Australia' },
    { initial: 'MR', name: 'Michael Reynolds', video: 'https://cdn.shopify.com/videos/c/o/v/19e7fa0ffe4c44a88c426e428f7b16eb.mp4', review: 'From the packaging to the craftsmanship, everything feels premium. I get compliments every time I wear it.', location: 'Los Angeles, USA' },
    { initial: 'DL', name: 'Daniel Lopez', video: 'https://cdn.shopify.com/videos/c/o/v/fc973cd2e6b44464a1a9118c6db6be37.mp4', review: 'This watch delivers luxury without compromise. Solid build, smooth movement, and an elegant finish.', location: 'Miami, USA' },
    { initial: 'AW', name: 'Andrew Wilson', video: 'https://cdn.shopify.com/videos/c/o/v/12db1a8ea2f846028b443cd72f88741c.mp4', review: 'I own several high-end watches, and this one genuinely stands out. Exceptional value for the quality.', location: 'London, UK' },
    { initial: 'TB', name: 'Thomas Becker', video: 'https://cdn.shopify.com/videos/c/o/v/fd87699babb84387824020d0e45d67d5.mp4', review: 'The attention to detail is impressive. It feels refined, balanced, and incredibly well made.', location: 'Berlin, Germany' },
    { initial: 'RC', name: 'Ryan Cooper', video: 'https://cdn.shopify.com/videos/c/o/v/9daaea1d0cb2415c8a52a929bc594d69.mp4', review: 'I was surprised by how premium it feels on the wrist. Comfortable, stylish, and built to last.', location: 'Toronto, Canada' },
    { initial: 'JM', name: 'Julien Martin', video: 'https://cdn.shopify.com/videos/c/o/v/e330830e55cd4c498192e7d5ba060be3.mp4', review: 'A perfect blend of modern design and classic elegance. Easily one of my favorite watches.', location: 'Paris, France' },
    { initial: 'AL', name: 'Alexandre Lefèvre', video: 'https://cdn.shopify.com/videos/c/o/v/952e7b4fdd4d467fa1d73da226e04bd7.mp4', review: 'Exceptional craftsmanship and a refined look that stands out without being flashy. Truly impressive quality.', location: 'Lyon, France' },
    { initial: 'MR', name: 'Michael Rossi', video: 'https://cdn.shopify.com/videos/c/o/v/1d752817bc7d496f8cc64a9da02cc6d2.mp4', review: 'Timeless design with a premium feel on the wrist. You can immediately tell it’s built with attention to detail.', location: 'Milan, Italy' }
  ];

  const reviewsData = [...baseReviews, ...baseReviews.map(r => ({...r, name: r.name + ' (Verified)'}))];

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
    "description": product.description?.replace(/(<([^>]+)>)/gi, "").substr(0, 160) || "Luxury watch by Vastara.",
    "sku": finalSku,
    "mpn": finalSku,
    "brand": {
      "@type": "Brand",
      "name": "Vastara"
    },
    "offers": {
      "@type": "Offer",
      "url": productUrl,
      "priceCurrency": selectedVariant?.price?.currencyCode || "USD",
      "price": selectedVariant?.price?.amount,
      "priceValidUntil": priceValidUntil,
      "availability": selectedVariant?.availableForSale ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "itemCondition": "https://schema.org/NewCondition",
      "seller": {
        "@type": "Organization",
        "name": "Vastara"
      },
      "hasMerchantReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "applicableCountry": ["US", "GB", "CA", "AU"],
        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
        "merchantReturnDays": 30,
        "returnMethod": "https://schema.org/ReturnByMail",
        "returnFees": "https://schema.org/FreeReturn"
      },
      "shippingDetails": { 
         "@type": "OfferShippingDetails",
         "shippingRate": { "@type": "MonetaryAmount", "value": 0, "currency": "USD" },
         "shippingDestination": [
           { "@type": "DefinedRegion", "addressCountry": "US" },
           { "@type": "DefinedRegion", "addressCountry": "GB" },
           { "@type": "DefinedRegion", "addressCountry": "CA" },
           { "@type": "DefinedRegion", "addressCountry": "AU" }
         ],
         "deliveryTime": {
           "@type": "ShippingDeliveryTime",
           "businessDays": { "@type": "OpeningHoursSpecification", "dayOfWeek": ["https://schema.org/Monday", "https://schema.org/Friday"] },
           "cutoffTime": "17:00:00Z",
           "handlingTime": { "@type": "QuantitativeValue", "minValue": 0, "maxValue": 1, "unitCode": "d" },
           "transitTime": { "@type": "QuantitativeValue", "minValue": 3, "maxValue": 7, "unitCode": "d" }
         }
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "3498",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": reviewsData.slice(0, 5).map(r => ({
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": r.name
      },
      "reviewBody": r.review,
      "datePublished": "2024-01-15"
    }))
  };

  const generateSmartUpgrades = () => {
    const realUpgrades = [];
    if (upgradeProducts?.watchBox) {
      const variant = upgradeProducts.watchBox.variants?.edges?.[0]?.node;
      if (variant) {
        realUpgrades.push({
          id: 'premium-box',
          variantId: variant.id,
          name: 'Premium Watch Box',
          price: parseFloat(variant.price.amount),
          icon: '🎁',
          category: 'presentation',
          available: variant.availableForSale
        });
      }
    }
    if (upgradeProducts?.repairKit) {
      const variant = upgradeProducts.repairKit.variants?.edges?.[0]?.node;
      if (variant) {
        realUpgrades.push({
          id: 'repair-kit',
          variantId: variant.id,
          name: 'Watch Repair Tool Kit',
          price: parseFloat(variant.price.amount),
          icon: '🔧',
          category: 'maintenance',
          available: variant.availableForSale
        });
      }
    }
    realUpgrades.push({
      id: 'vastara-care',
      variantId: null,
      name: 'Vastara Care',
      description: 'Digital guide to care for your watch (sent by email)',
      price: 0.00,
      icon: '💎',
      category: 'care',
      available: true,
      isDefault: true
    });
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
      {name: 'Christmas Eve', month: 11, day: 24, emoji: '🎄', message: 'SANTA IS ON HIS WAY!!'},
      {name: 'New Years Eve', month: 11, day: 31, emoji: '🎉', message: 'TIME IS RUNNING OUT FOR GIFTING!'},
      {name: 'Valentines Day', month: 1, day: 14, emoji: '❤️', message: 'TIME TO CELEBRATE LOVE!'},
      {name: 'St Patricks Day', month: 2, day: 17, emoji: '☘️', message: 'ST PATRICKS DAY COUNTDOWN!'},
      {name: 'Easter', month: 3, day: 20, emoji: '🐣', message: 'EASTER COUNTDOWN!'},
      {name: 'Mothers Day', month: 4, day: 12, emoji: '👩', message: 'MOTHERS DAY COUNTDOWN!'},
      {name: 'Memorial Day', month: 4, day: 26, emoji: '🇺🇸', message: 'MEMORIAL DAY COUNTDOWN!'},
      {name: 'Independence Day', month: 6, day: 4, emoji: '🎆', message: 'INDEPENDENCE DAY COUNTDOWN!'},
      {name: 'Labor Day', month: 8, day: 1, emoji: '💼', message: 'LABOR DAY COUNTDOWN!'},
      {name: 'Halloween', month: 9, day: 31, emoji: '🎃', message: 'HALLOWEEN COUNTDOWN!'},
      {name: 'Thanksgiving', month: 10, day: 23, emoji: '🦃', message: 'THANKSGIVING COUNTDOWN!'}
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
      
      <Aside type="cart" heading="CART">
        <Suspense fallback={<p>Loading cart ...</p>}>
          <Await resolve={cart}>
            {(cart) => {
              return <CartMain cart={cart} layout="aside" />;
            }}
          </Await>
        </Suspense>
      </Aside>
      <div className="min-h-screen bg-[#FEFDF8] overflow-x-hidden">
      
      {/* BARRA DE CONFIANÇA */}
      <div className="sticky top-0 z-[60] shadow-md py-3 text-center text-white" style={{background: 'linear-gradient(135deg, #4A90E2 0%, #2B88D9 100%)'}}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-4 flex-wrap">
          <span className="text-xs md:text-sm font-bold tracking-widest text-yellow-300 uppercase animate-pulse">
            🎁 FRETE GRÁTIS
          </span>
          <span className="hidden md:inline">|</span>
          <span className="text-sm md:text-base font-bold tracking-wide">
            🧩 Produtos Especializados para TEA e TDAH
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-0">
        <div className="py-8 px-6 relative overflow-hidden" style={{background: 'linear-gradient(135deg, #87CEEB 0%, #4A90E2 100%)'}}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 text-6xl">🧩</div>
            <div className="absolute bottom-10 right-10 text-6xl">⭐</div>
          </div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-6 tracking-wide text-center">
              BrinqueTEAndo
            </h2>
            <p className="text-white text-lg font-semibold mb-4 text-center">
              🎉 Produtos especializados para neurodiversidade
            </p>
            <p className="text-sm text-white/90 text-center">💙 Recomendado por terapeutas • Frete grátis para São Vicente, Santos e Praia Grande</p>
          </div>
        </div>
        <div className="bg-[#FEFDF8] py-8 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-6 flex-wrap text-center">
              <div>
                <h3 className="text-4xl font-bold mb-1" style={{color: '#87CEEB'}}>Produtos</h3>
                <p className="text-sm" style={{color: '#6b7280'}}>Especializados</p>
              </div>
              <span className="text-5xl" style={{color: '#FFD93D'}}>&</span>
              <div>
                <h3 className="text-4xl font-bold mb-1" style={{color: '#6BCF7F'}}>Seguros</h3>
                <p className="text-sm" style={{color: '#6b7280'}}>Materiais certificados</p>
              </div>
              <span className="text-2xl font-medium" style={{color: '#6b7280'}}>+</span>
              <div>
                <h3 className="text-3xl font-bold mb-1" style={{color: '#4A90E2'}}>Frete Grátis</h3>
                <p className="text-sm" style={{color: '#6b7280'}}>São Vicente, Santos, Praia Grande</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="text-white py-3 text-center"
        style={{background: 'linear-gradient(135deg, #FF6B6B 0%, #FFD93D 50%, #4A90E2 100%)'}}  // Puzzle gradient
      >
        <p className="text-sm md:text-base font-semibold tracking-wide">
          🧩 Newsletter - Receba novidades e dicas sobre TEA, TDAH e neurodiversidade!
        </p>
      </div>

      <div className="bg-[#F8F9FA] border-b" style={{borderColor: '#E9ECEF'}}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-xl font-bold" style={{color: '#2C3E50'}}>✨ COMPRE COM CONFIANÇA:</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-start justify-center md:justify-start gap-3">
              <div>
                <p className="font-semibold mb-1"><span style={{color: '#4A90E2'}}>Recomendado</span> por Terapeutas</p>
                <p className="text-sm" style={{color: '#6b7280'}}>✓ Produtos selecionados por profissionais</p>
              </div>
            </div>
            <div className="flex items-start justify-center gap-3">
              <div>
                <p className="font-semibold mb-1"><span style={{color: '#FFD93D'}}>Melhor</span> Preço Garantido</p>
                <p className="text-sm" style={{color: '#6b7280'}}>Parcelamento em até 12x sem juros</p>
              </div>
            </div>
            <div className="flex items-start justify-center md:justify-end gap-3">
              <div>
                <p className="font-semibold mb-1">Trocas <span style={{color: '#4A90E2'}}>Fáceis</span></p>
                <p className="text-sm" style={{color: '#6b7280'}}>Política de troca simplificada</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <NavigationMenu rootData={rootData} />
      <div className="text-white py-3" style={{background: 'linear-gradient(135deg, #6BCF7F 0%, #4CAF50 100%)'}}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-medium tracking-wider">🎁 FRETE GRÁTIS São Vicente, Santos e Praia Grande • PARCELAMENTO 12x SEM JUROS • TROCAS FÁCEIS 🧩</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* PRODUCT IMAGE GALLERY */}
          <div>
            <div className="aspect-square bg-gradient-to-br from-[#F5F3ED] to-[#FEFDF8] rounded-lg overflow-hidden mb-4 border-2 border-[#D4AF69]">
                {currentImage && (
                    <Image 
                    key={currentImage.id}
                    data={currentImage} 
                    className="w-full h-full object-cover"
                    alt={product.title}
                    // ✅ LCP & SIZING OPTIMIZATION (Updated)
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
                      selectedImage === idx ? 'border-[#0A3D2F]' : 'border-[#D4AF69]'
                    }`}
                  >
                    <Image 
                      data={edge.node} 
                      className="w-full h-full object-cover"
                      alt={`View ${idx + 1}`}
                      // Thumbnails should be lazy
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
            <p className="text-[#D4AF69] text-xs font-bold tracking-widest uppercase mb-2">
              VASTARA COLLECTION
            </p>
            <h1 className="text-4xl md:text-5xl font-light text-[#0A3D2F] mb-4 tracking-wide">
              {product.title}
            </h1>
            
            {selectedVariant?.price && (
              <div className="text-3xl font-bold text-[#1a5757] mb-6">
                <Money data={selectedVariant.price} />
              </div>
            )}
            
            <div className="bg-gradient-to-r from-[#D4AF69]/10 to-transparent p-4 rounded-lg mb-6 border-l-4 border-[#D4AF69]">
              <p className="font-semibold text-[#0A3D2F] mb-1">
                {selectedVariant?.availableForSale ? '✓ In Stock' : '✗ Out of Stock'}
              </p>
              <p className="text-sm text-[#9d8b7c]">
                Free express shipping to United States, Canada, UK & Australia.
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
                      <label className="block text-sm font-semibold text-[#0A3D2F] mb-3">
                        {option.name}: <span className="text-[#D4AF69]">{currentValue}</span>
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
                                  ? 'border-[#0A3D2F] ring-2 ring-[#D4AF69]'
                                  : isAvailable
                                  ? 'border-[#D4AF69] hover:border-[#0A3D2F]'
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
                                <div className="w-full h-full bg-[#F5F3ED] flex items-center justify-center text-xs text-[#0A3D2F] font-semibold text-center p-2">
                                  {optionValue.name}
                                </div>
                              )}
                              {isActive && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                  <div className="bg-white rounded-full p-1">
                                    <svg className="w-4 h-4 text-[#0A3D2F]" fill="currentColor" viewBox="0 0 20 20">
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
              <label className="block text-sm font-semibold text-[#0A3D2F] mb-3">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center border-2 border-[#D4AF69] text-[#0A3D2F] hover:bg-[#D4AF69] hover:text-white transition-all rounded-md font-bold"
                >
                  −
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 h-10 text-center border-2 border-[#D4AF69] rounded-md text-[#0A3D2F] font-semibold focus:outline-none focus:ring-2 focus:ring-[#D4AF69]"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center border-2 border-[#D4AF69] text-[#0A3D2F] hover:bg-[#D4AF69] hover:text-white transition-all rounded-md font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {upgrades.length > 0 && (
              <div className="mb-8 bg-white border-2 border-[#D4AF69] rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedUpgrades(!expandedUpgrades)}
                  className="w-full p-4 flex items-center justify-between bg-gradient-to-r from-[#D4AF69]/5 to-transparent hover:from-[#D4AF69]/10 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">👑</span>
                    <span className="font-bold text-[#0A3D2F]">Frequently bought together</span>
                    <span className="text-xs bg-[#D4AF69] text-[#0A3D2F] px-2 py-1 rounded-full font-bold">
                      {upgrades.length}
                    </span>
                  </div>
                  <span className={`text-xl transition-transform ${expandedUpgrades ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                
                {expandedUpgrades && (
                  <div className="p-4 space-y-3 bg-white border-t border-[#D4AF69]">
                    {upgrades.map((upgrade) => (
                      <label
                        key={upgrade.id}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#F5F3ED] transition-all cursor-pointer border border-[#D4AF69]/20"
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
                          className="w-5 h-5 cursor-pointer accent-[#D4AF69]"
                        />
                        <div className="text-3xl">{upgrade.icon}</div>
                        <div className="flex-1">
                          <p className="font-semibold text-[#0A3D2F] text-sm">{upgrade.name}</p>
                          {upgrade.description && (
                            <p className="text-xs text-[#9d8b7c] mt-1">{upgrade.description}</p>
                          )}
                          <p className="text-xs text-[#9d8b7c] capitalize mt-1">{upgrade.category}</p>
                        </div>
                        <span className="font-bold text-[#D4AF69] text-lg">
                          {upgrade.price === 0 ? 'FREE' : `${upgrade.price.toFixed(2)}`}
                        </span>
                      </label>
                    ))}
                    {selectedUpgrades.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-[#D4AF69]/30 bg-gradient-to-r from-[#D4AF69]/5 to-transparent p-3 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-[#0A3D2F]">Add-ons Total:</span>
                          <span className="text-lg font-bold text-[#D4AF69]">
                            {upgradesTotal === 0 ? 'FREE' : `${upgradesTotal.toFixed(2)}`}
                          </span>
                        </div>
                        <p className="text-xs text-[#9d8b7c] mt-2">✓ Perfect additions for your watch</p>
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
                <h2 className="text-xl font-bold text-[#0A3D2F] mb-3">
                  About This Timepiece
                </h2>
                <div 
                  className="text-[#9d8b7c] prose prose-sm"
                  dangerouslySetInnerHTML={{__html: product.descriptionHtml}}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Why VASTARA Section */}
      <section className="bg-[#0A3D2F] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-light text-[#D4AF69] text-center mb-12 tracking-wide">
            Why VASTARA
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {title: 'Effortless Style', desc: 'Elevated design meets timeless elegance. Sophisticated craftsmanship.'},
              {title: 'Precision Engineering', desc: 'Swiss-inspired mechanism with ceramic bezel and chronograph movement.'},
              {title: 'Premium Materials', desc: 'Stainless steel case with sapphire crystal. Water-resistant 300m.'}
            ].map((feature, idx) => (
              <div key={idx} className="text-center">
                <h3 className="text-xl font-bold text-[#D4AF69] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[#9d8b7c]">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS SECTION: CAROUSEL IMPLEMENTATION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#0A3D2F] mb-4 tracking-wide leading-tight">
              Raving Reviews From VASTARA Collectors
            </h2>
            <p className="text-base sm:text-lg text-[#9d8b7c] max-w-3xl mx-auto leading-relaxed px-4 sm:px-6">
              Join thousands of satisfied watch enthusiasts who trust VASTARA for timeless elegance
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#0A3D2F] to-[#1a5f4a] rounded-2xl p-8 md:p-12 mb-16 text-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-4xl md:text-5xl font-bold text-[#D4AF69] mb-2">3,498+</div>
                <div className="text-sm text-white/70 uppercase tracking-widest">Happy Collectors</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-[#D4AF69] mb-2">4.9</div>
                <div className="text-sm text-white/70 uppercase tracking-widest">Average Rating</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-[#D4AF69] mb-2">98%</div>
                <div className="text-sm text-white/70 uppercase tracking-widest">Would Recommend</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-[#D4AF69] mb-2">3K+</div>
                <div className="text-sm text-white/70 uppercase tracking-widest">5-Star Reviews</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-2xl mb-16 shadow-lg border-l-4 border-[#D4AF69]">
            <div className="text-2xl md:text-3xl font-light text-[#0A3D2F] italic mb-6 leading-relaxed">
              "This is the most exquisite watch I've ever owned. The craftsmanship is unparalleled, and I receive compliments everywhere I go. VASTARA has truly mastered the art of luxury timepieces."
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AF69] to-[#b87333] flex items-center justify-center text-white text-xl font-bold">
                MR
              </div>
              <div>
                <div className="text-lg font-semibold text-[#0A3D2F]">Michael Robertson</div>
                <div className="text-sm text-[#9d8b7c]">CEO, Tech Innovators Inc. • Verified Collector</div>
              </div>
            </div>
          </div>

          {/* NEW: CAROUSEL COMPONENT */}
          <ReviewsCarousel reviews={reviewsData} />

          <div className="text-center mt-12">
            <button className="bg-[#0A3D2F] text-white px-12 py-4 rounded-md hover:bg-[#D4AF69] transition-all duration-300 font-semibold uppercase tracking-wider shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Load More Reviews
            </button>
          </div>
        </div>
      </section>

      {/* ================================================================
           REVIEWS SECTION: DUAL MODE - Judge.me Widget + API Fallback
          ================================================================ */}
      <section className="py-16 bg-white border-t border-[#D4AF69]/30" id="product-reviews">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-light text-[#0A3D2F] mb-4 tracking-wide">
              Customer Reviews
            </h2>
            <p className="text-[#9d8b7c] text-lg">
              See what our customers are saying about this product
            </p>
          </div>

          {hasApiReviews && (
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4 gap-4">
                <div>
                  <p className="text-sm font-semibold text-[#0A3D2F]">
                    {(() => {
                      const ratingValue =
                        typeof judgeMeReviews.rating === 'number'
                          ? judgeMeReviews.rating
                          : Number(judgeMeReviews.rating || 0);
                      const safeRating = Number.isNaN(ratingValue) ? 0 : ratingValue;
                      return `${safeRating.toFixed(1)} / 5.0`;
                    })()}
                  </p>
                  <p className="text-xs text-[#9d8b7c]">
                    Based on {judgeMeReviews.reviewCount || judgeMeReviews.reviews.length} reviews
                  </p>
                </div>
                <div className="text-[#D4AF69] text-lg whitespace-nowrap">
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

                  const reviewImages = [];
                  if (Array.isArray(review.pictures)) {
                    review.pictures.forEach((pic) => {
                      let url = null;
                      const urls = pic.urls;

                      if (Array.isArray(urls) && urls.length > 0) {
                        url = urls[0];
                      } else if (urls && typeof urls === 'object') {
                        url =
                          urls.compact ||
                          urls.small ||
                          urls.medium ||
                          urls.large ||
                          urls.original ||
                          null;
                      }

                      if (!url && pic.url) {
                        url = pic.url;
                      }

                      if (url) reviewImages.push(url);
                    });
                  }
                  if (reviewImages.length === 0 && review.review_picture_url) {
                    reviewImages.push(review.review_picture_url);
                  }
                  if (reviewImages.length === 0 && review.featured_image_url) {
                    reviewImages.push(review.featured_image_url);
                  }

                  return (
                    <div
                      key={review.id || `${review.created_at || ''}-${index}`}
                      className="p-6 bg-[#FEFDF8] border border-[#D4AF69]/70 rounded-lg shadow-sm flex flex-col gap-4"
                    >
                      {reviewImages.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-1">
                          {reviewImages.map((imageUrl, imgIdx) => (
                            <div
                              key={imgIdx}
                              className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 border-2 border-[#D4AF69]/60 hover:border-[#D4AF69] transition-all cursor-pointer hover:scale-105 hover:shadow-lg"
                              onClick={() => window.open(imageUrl, '_blank')}
                              title="Click to view full size"
                            >
                              <img
                                src={imageUrl}
                                alt={`Review image ${imgIdx + 1}`}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-4 mb-2">
                          <div>
                            <p className="text-sm font-semibold text-[#0A3D2F]">
                              {review.reviewer_name || 'Verified Customer'}
                            </p>
                          </div>
                          <div className="text-[#D4AF69] text-sm whitespace-nowrap">
                            {fullStars}
                            {emptyStars}
                          </div>
                        </div>
                        {textBody && (
                          <p className="text-sm text-[#0A3D2F] leading-relaxed">
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

          {/* METHOD 1: Official Judge.me Widget (Primary) */}
          <div className="mb-8">
            {/* Judge.me Preview Badge */}
            <div
              className="jdgm-preview-badge"
              data-shop-domain="kp0zf4-m0.myshopify.com"
              data-id={productNumericId}
              data-product-id={productNumericId}
            ></div>

          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-[#FEFDF8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-light text-[#0A3D2F] text-center mb-12 tracking-wide">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {q: 'Do you ship to the US, UK, Canada, and Australia?', a: 'Yes, we ship to the US, UK, Canada, and Australia — and we offer free shipping to all of these countries.'},
              {q: 'What makes VASTARA watches unique?', a: 'VASTARA stands out by curating premium watches from the best brands — selected for their design, quality, and craftsmanship, all in one refined destination.'},
              {q: 'What is the warranty coverage?', a: 'All watches sold on VASTARA include a manufacturers warranty. As an online store, we provide full support and assistance to help customers with any warranty-related needs.'},
              {q: 'How long does delivery take?', a: 'Orders usually arrive within 7 to 12 business days. Once your order ships, you will receive tracking details so you can follow it every step of the way.'},
              {q: 'Are the watches authentic and brand-new?', a: 'Yes. All watches sold on VASTARA are 100% authentic, brand-new, and sourced from trusted brands and suppliers.'}
            ].map((faq, idx) => (
              <div key={idx} className="border border-[#D4AF69] rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className={`w-full p-4 text-left font-semibold flex justify-between items-center transition-colors ${
                    expandedFaq === idx ? 'bg-[#0A3D2F] text-white' : 'bg-white text-[#0A3D2F]'
                  }`}
                >
                  {faq.q}
                  <span className={`transition-transform ${expandedFaq === idx ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {expandedFaq === idx && (
                  <div className="p-4 bg-[#F5F3ED] text-[#9d8b7c] border-t border-[#D4AF69]">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="relative bg-gradient-to-b from-[#0A3D2F] via-[#1a5f4a] to-[#0d2e23] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #D4AF69 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="relative border-b border-[#D4AF69]/20">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-4xl font-light text-[#D4AF69] mb-3 tracking-wide">
                  Join The Collection
                </h3>
                <p className="text-gray-300 text-lg">
                  Exclusive access to new releases, special offers, and horological insights.
                </p>
              </div>
              <FooterNewsletterForm />
            </div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            <div className="lg:col-span-2">
              <Link to="/" className="inline-block mb-6 group">
                <div className="text-5xl font-serif text-white tracking-[0.3em] group-hover:text-[#D4AF69] transition-colors duration-300">
                  VASTARA
                </div>
                <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-[#D4AF69] to-transparent transition-all duration-500 mt-2"></div>
              </Link>
              <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-xs">
                Crafting timeless elegance since our inception. Each timepiece embodies precision engineering and sophisticated design for the discerning collector.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-[#D4AF69]/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#D4AF69]">✓</span>
                  </div>
                  <span className="text-gray-300">1-Year International Warranty</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-[#D4AF69]/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#D4AF69]">✓</span>
                  </div>
                  <span className="text-gray-300">Free Worldwide Shipping</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-[#D4AF69]/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#D4AF69]">✓</span>
                  </div>
                  <span className="text-gray-300">Secure Checkout</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-[#D4AF69] text-sm font-bold mb-6 uppercase tracking-widest relative inline-block">
                Explore
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#D4AF69] to-transparent"></div>
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/collections/new-arrivals" className="text-gray-300 hover:text-[#D4AF69] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link to="/collections/mens-watches" className="text-gray-300 hover:text-[#D4AF69] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                    Men's Watches
                  </Link>
                </li>
                <li>
                  <Link to="/collections/womens-watches" className="text-gray-300 hover:text-[#D4AF69] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                    Women's Watches
                  </Link>
                </li>
                <li>
                  <Link to="/collections/sport-watches" className="text-gray-300 hover:text-[#D4AF69] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                    Sport Watches
                  </Link>
                </li>
                <li>
                  <Link to="/collections/automatic-watches" className="text-gray-300 hover:text-[#D4AF69] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                    Automatic
                  </Link>
                </li>
                <li>
                  <Link to="/collections/quartz-watches" className="text-gray-300 hover:text-[#D4AF69] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                    Quartz
                  </Link>
                </li>
                <li>
                  <Link to="/blogs/news" className="text-gray-300 hover:text-[#D4AF69] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-[#D4AF69] text-sm font-bold mb-6 uppercase tracking-widest relative inline-block">
                Support
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#D4AF69] to-transparent"></div>
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/pages/faq" className="text-gray-300 hover:text-[#D4AF69] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/pages/returns" className="text-gray-300 hover:text-[#D4AF69] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                    Returns & Refunds
                  </Link>
                </li>
                <li>
                  <Link to="/pages/shipping-policy" className="text-gray-300 hover:text-[#D4AF69] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                    Shipping Policy
                  </Link>
                </li>
                <li>
                  <Link to="/pages/contact" className="text-gray-300 hover:text-[#D4AF69] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/pages/warranty" className="text-gray-300 hover:text-[#D4AF69] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                    Warranty
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-[#D4AF69] text-sm font-bold mb-6 uppercase tracking-widest relative inline-block">
                Company
                <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#D4AF69] to-transparent"></div>
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/pages/our-story" className="text-gray-300 hover:text-[#D4AF69] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link to="/pages/careers" className="text-gray-300 hover:text-[#D4AF69] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/pages/press" className="text-gray-300 hover:text-[#D4AF69] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                    Press
                  </Link>
                </li>
                <li>
                  <Link to="/pages/privacy-policy" className="text-gray-300 hover:text-[#D4AF69] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/pages/terms-of-service" className="text-gray-300 hover:text-[#D4AF69] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/pages/cookie-policy" className="text-gray-300 hover:text-[#D4AF69] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link to="/pages/data-sharing-opt-out" className="text-gray-300 hover:text-[#D4AF69] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                    Your Privacy Choices
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#D4AF69]/20 pt-12">
            <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
              <div>
                <h4 className="text-[#D4AF69] text-sm font-semibold mb-4 uppercase tracking-wider">
                  Follow Our Journey
                </h4>
                <div className="flex gap-3">
                  <a 
                    href="https://www.facebook.com/profile.php?id=100094888641840&sk=reels_tab" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-11 h-11 flex items-center justify-center bg-white/5 backdrop-blur-sm border border-[#D4AF69]/30 rounded-lg hover:bg-[#D4AF69] hover:border-[#D4AF69] transition-all duration-300 hover:scale-110 group"
                    aria-label="Facebook"
                  >
                    <svg className="w-5 h-5 text-[#D4AF69] group-hover:text-[#0A3D2F]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.instagram.com/vastarastore/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-11 h-11 flex items-center justify-center bg-white/5 backdrop-blur-sm border border-[#D4AF69]/30 rounded-lg hover:bg-[#D4AF69] hover:border-[#D4AF69] transition-all duration-300 hover:scale-110 group"
                    aria-label="Instagram"
                  >
                    <svg className="w-5 h-5 text-[#D4AF69] group-hover:text-[#0A3D2F]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.youtube.com/@VASTARA-STORE" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-11 h-11 flex items-center justify-center bg-white/5 backdrop-blur-sm border border-[#D4AF69]/30 rounded-lg hover:bg-[#D4AF69] hover:border-[#D4AF69] transition-all duration-300 hover:scale-110 group"
                    aria-label="YouTube"
                  >
                    <svg className="w-5 h-5 text-[#D4AF69] group-hover:text-[#0A3D2F]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.tiktok.com/@vastara_store" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-11 h-11 flex items-center justify-center bg-white/5 backdrop-blur-sm border border-[#D4AF69]/30 rounded-lg hover:bg-[#D4AF69] hover:border-[#D4AF69] transition-all duration-300 hover:scale-110 group"
                    aria-label="TikTok"
                  >
                    <svg className="w-5 h-5 text-[#D4AF69] group-hover:text-[#0A3D2F]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.pinterest.com/VASTARAWATCH/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-11 h-11 flex items-center justify-center bg-white/5 backdrop-blur-sm border border-[#D4AF69]/30 rounded-lg hover:bg-[#D4AF69] hover:border-[#D4AF69] transition-all duration-300 hover:scale-110 group"
                    aria-label="Pinterest"
                  >
                    <svg className="w-5 h-5 text-[#D4AF69] group-hover:text-[#0A3D2F]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0a12 12 0 0 0-4.37 23.17c-.1-.86-.19-2.27 0-3.25l1.24-5.36s-.31-.63-.31-1.56c0-1.46.85-2.55 1.9-2.55.9 0 1.33.67 1.33 1.47 0 .9-.57 2.24-.86 3.48-.25 1.02.51 1.85 1.51 1.85 1.81 0 3.21-1.91 3.21-4.66 0-2.44-1.75-4.15-4.25-4.15-2.9 0-4.6 2.17-4.6 4.42 0 .87.34 1.81.76 2.32.08.1.19.07.29l-.28 1.16c-.04.18-.15.22-.34.13-1.27-.59-2.06-2.44-2.06-3.93 0-3.21 2.33-6.15 6.72-6.15 3.53 0 6.27 2.51 6.27 5.87 0 3.5-2.21 6.32-5.27 6.32-1.03 0-2-.53-2.33-1.16l-.63 2.41c-.23.88-.85 1.98-1.27 2.65A12 12 0 1 0 12 0z"/>
                    </svg>
                  </a>
                </div>
              </div>
              <div className="text-right">
                <h4 className="text-[#D4AF69] text-sm font-semibold mb-4 uppercase tracking-wider">
                  Secure Payment
                </h4>
                <div className="flex justify-end gap-2 flex-wrap">
                  {['Visa', 'Mastercard', 'Amex', 'PayPal', 'Apple Pay', 'Google Pay'].map((method) => (
                    <div 
                      key={method}
                      className="px-3 py-2 bg-white/10 backdrop-blur-sm border border-[#D4AF69]/20 rounded text-xs text-gray-300 font-medium"
                    >
                      {method}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="pt-8 border-t border-[#D4AF69]/20">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
                <p>
                  © {new Date().getFullYear()} VASTARA. All rights reserved. Curated Luxury Watches.
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-[#D4AF69]">★★★★★</span>
                  <span>Rated 4.9/5 by 3,498+ collectors</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-1 bg-gradient-to-r from-transparent via-[#D4AF69] to-transparent"></div>
      </footer>

      <StickyCTA product={product} selectedVariant={selectedVariant} openCart={open} />
    </div>
  </Aside.Provider>
  );
}

// GraphQL Queries (Unchanged)
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
    watchBox: product(handle: "vintage-leather-watch-watch-case") {
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
    repairKit: product(handle: "watch-repair-tool-kit") {
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
