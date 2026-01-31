import {FooterNewsletterForm} from '~/components/FooterNewsletterForm';
import {useLoaderData, Link, useRouteLoaderData} from 'react-router';
import {useState, useEffect} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import {getProductHandle} from '~/lib/utils';
import {ProductsUnder100} from '~/components/ProductsUnder100';
import {useAside} from '~/components/Aside';



export const meta = () => {
  return [
    // PRIMARY META TAGS
    {title: 'Automatic Mens Watch | Elegant & Affordable | VASTARA'},
    {name: 'description', content: 'Explore automatic watches with elegant design. Free shipping and a 1-year warranty'},
    
    // --- VERIFICAÇÕES IMPORTADAS DO THEME.LIQUID ---
    // Facebook Domain Verification (Essencial para Anúncios)
    {name: 'facebook-domain-verification', content: 'qbk5t5o0agiy90kflze09te3423xgt'},
    
    // GEO-TARGETING META TAGS
    {name: 'geo.region', content: 'US;CA;GB;AU'},
    {name: 'geo.placename', content: 'United States;Canada;United Kingdom;Australia'},
    
    // ENHANCED KEYWORDS (Location-based & Long-tail)
    {name: 'keywords', content: 'luxury watches usa, swiss watches canada, automatic watches uk, buy watches australia, mens watches london, womens watches toronto, sport watches sydney, watches new york, watches los angeles, watches vancouver, watches melbourne, luxury timepieces, sapphire crystal watches, mechanical watches, affordable luxury watches, vastara watches, premium watches online'},
    
    // LANGUAGE TARGETING
    {httpEquiv: 'content-language', content: 'en-US'},
    
    // ENHANCED OPEN GRAPH TAGS
    {property: 'og:title', content: 'VASTARA | Premium Luxury Watches | USA, UK, CA, AU'},
    {property: 'og:description', content: 'Discover Swiss-inspired luxury watches. Free shipping USA/UK/Canada/Australia. 1-Year Warranty. Automatic & Quartz movements.'},
    {property: 'og:type', content: 'website'},
    {property: 'og:url', content: 'https://vastara.online'},
    {property: 'og:image', content: 'https://cdn.shopify.com/s/files/1/0778/2921/0327/files/5.avif?v=1765596668'},
    {property: 'og:image:width', content: '1200'},
    {property: 'og:image:height', content: '630'},
    {property: 'og:site_name', content: 'VASTARA Watches'},
    {property: 'og:locale', content: 'en_US'},
    {property: 'og:locale:alternate', content: 'en_GB'},
    {property: 'og:locale:alternate', content: 'en_CA'},
    {property: 'og:locale:alternate', content: 'en_AU'},
    
    // TWITTER CARDS
    {name: 'twitter:card', content: 'summary_large_image'},
    {name: 'twitter:title', content: ''},
    {name: 'twitter:description', content: 'Premium automatic & quartz watches. Free shipping to USA, UK, CA, AU.'},
    {name: 'twitter:image', content: 'https://cdn.shopify.com/s/files/1/0778/2921/0327/files/5.avif?v=1765596668'},
    
    // ENHANCED ROBOTS & INDEXING
    {name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'},
    {name: 'googlebot', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'},
    
    // MOBILE OPTIMIZATION
    {name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=5'},
    {name: 'mobile-web-app-capable', content: 'yes'},
    {name: 'apple-mobile-web-app-capable', content: 'yes'},
    
    // THEME COLOR
    {name: 'theme-color', content: '#0A3D2F'},
    
    // CANONICAL URL
    {tagName: 'link', rel: 'canonical', href: 'https://vastara.online'},
    
    // HREFLANG FOR GEO-TARGETING
    {tagName: 'link', rel: 'alternate', hreflang: 'en-us', href: 'https://vastara.online'},
    {tagName: 'link', rel: 'alternate', hreflang: 'en-ca', href: 'https://vastara.online'},
    {tagName: 'link', rel: 'alternate', hreflang: 'en-gb', href: 'https://vastara.online'},
    {tagName: 'link', rel: 'alternate', hreflang: 'en-au', href: 'https://vastara.online'},
    {tagName: 'link', rel: 'alternate', hreflang: 'x-default', href: 'https://vastara.online'},
    
    // PRECONNECT & DNS-PREFETCH
    {tagName: 'link', rel: 'preconnect', href: 'https://cdn.shopify.com'},
    {tagName: 'link', rel: 'dns-prefetch', href: 'https://cdn.shopify.com'},
    
    // PRELOAD CRITICAL RESOURCES
    // ✅ FIX: Preload LCP Image (Hero Poster) with high priority
    {tagName: 'link', rel: 'preload', as: 'image', href: 'https://cdn.shopify.com/s/files/1/0778/2921/0327/files/5.avif?v=1765596668', attributes: {fetchpriority: 'high'}},
    {tagName: 'link', rel: 'preload', as: 'video', href: 'https://cdn.shopify.com/videos/c/o/v/9788927ebacf4e3ca19449cafd11fc55.mp4'},
  ];
};

export async function loader({context}) {
  const {storefront} = context;
  const {collections} = await storefront.query(FEATURED_COLLECTIONS_QUERY);
  const {products} = await storefront.query(FEATURED_PRODUCTS_QUERY);
  const {products: under100Products} = await storefront.query(PRODUCTS_UNDER_100_QUERY);
  const {menu: footerMenu} = await storefront.query(FOOTER_MENU_QUERY, {
    variables: { footerMenuHandle: 'footer' }
  });

  return {
    collections, 
    products, 
    under100Products: under100Products.nodes,
    footerMenu
  };
}

export default function Homepage() {
  const {collections, products, under100Products, footerMenu} = useLoaderData();
  const rootData = useRouteLoaderData('root');
  const {open} = useAside();
  const [currentHero, setCurrentHero] = useState(0);
  const [currentPromo, setCurrentPromo] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [timeLeft, setTimeLeft] = useState({days: 0, hours: 0, minutes: 0, seconds: 0});
  const [currentHoliday, setCurrentHoliday] = useState({name: 'Holiday', emoji: '🎉', message: 'COUNTDOWN'});

  // Ahrefs Analytics Script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://analytics.ahrefs.com/analytics.js';
    script.async = true;
    script.setAttribute('data-key', 'ffWKXpflS652BvLv6vtybg');
    document.body.appendChild(script);
    return () => {};
  }, []);

  // COMPREHENSIVE STRUCTURED DATA (Multiple Schema Types)
  const schemaOrgJSON = [
    // Organization Schema
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "VASTARA Watches",
      "url": "https://vastara.online",
      "logo": "https://cdn.shopify.com/s/files/1/0778/2921/0327/files/5.avif?v=1765596668",
      "description": "Premium luxury watch retailer specializing in automatic and quartz timepieces for USA, Canada, UK, and Australia.",
      "foundingDate": "2024",
      "areaServed": [
        {"@type": "Country", "name": "United States"},
        {"@type": "Country", "name": "Canada"},
        {"@type": "Country", "name": "United Kingdom"},
        {"@type": "Country", "name": "Australia"}
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-800-VASTARA",
        "contactType": "Customer Service",
        "areaServed": ["US", "CA", "GB", "AU"],
        "availableLanguage": ["English"]
      },
      "sameAs": [
        "https://www.instagram.com/vastarastore/",
        "https://www.facebook.com/profile.php?id=100094888641840",
        "https://www.tiktok.com/@vastara_store",
        "https://www.youtube.com/@VASTARA-STORE",
        "https://www.pinterest.com/VASTARAWATCH/"
      ]
    },
    // WebSite Schema with Search Action
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "VASTARA Watches",
      "url": "https://vastara.online",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://vastara.online/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    // Store/LocalBusiness Schema
    {
      "@context": "https://schema.org",
      "@type": "Store",
      "name": "VASTARA Watches - Online Store",
      "image": "https://cdn.shopify.com/s/files/1/0778/2921/0327/files/5.avif?v=1765596668",
      "url": "https://vastara.online",
      "priceRange": "$$-$$$",
      "currenciesAccepted": "USD, CAD, GBP, AUD",
      "paymentAccepted": "Credit Card, PayPal, Apple Pay, Google Pay",
      "areaServed": [
        {"@type": "Country", "name": "US"},
        {"@type": "Country", "name": "CA"},
        {"@type": "Country", "name": "GB"},
        {"@type": "Country", "name": "AU"}
      ]
    },
    // Product Collection Schema
    {
      "@context": "https://schema.org",
      "@type": "OfferCatalog",
      "name": "VASTARA Luxury Watch Collections",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Men's Automatic Watches",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "Men's Automatic Watches",
                "description": "Swiss-inspired automatic movements for men",
                "offers": {
                  "@type": "AggregateOffer",
                  "priceCurrency": "USD",
                  "lowPrice": "149",
                  "highPrice": "499",
                  "availability": "https://schema.org/InStock"
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.9",
                  "bestRating": "5",
                  "worstRating": "1",
                  "ratingCount": "3498"
                }
              }
            }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "Women's Quartz Watches",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "Women's Quartz Watches",
                "description": "Elegant quartz timepieces for women",
                "offers": {
                  "@type": "AggregateOffer",
                  "priceCurrency": "USD",
                  "lowPrice": "99",
                  "highPrice": "399",
                  "availability": "https://schema.org/InStock"
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.9",
                  "bestRating": "5",
                  "worstRating": "1",
                  "ratingCount": "3498"
                }
              }
            }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "Sport Watches",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "Sport Watches",
                "description": "Durable sport and athletic timepieces",
                "offers": {
                  "@type": "AggregateOffer",
                  "priceCurrency": "USD",
                  "lowPrice": "129",
                  "highPrice": "449",
                  "availability": "https://schema.org/InStock"
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.9",
                  "bestRating": "5",
                  "worstRating": "1",
                  "ratingCount": "3498"
                }
              }
            }
          ]
        }
      ]
    },
    // Breadcrumb Schema
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://vastara.online"
        }
      ]
    },
    // Aggregate Rating Schema
    {
      "@context": "https://schema.org",
      "@type": "AggregateRating",
      "itemReviewed": {
        "@type": "Organization",
        "name": "VASTARA Watches"
      },
      "ratingValue": "4.9",
      "bestRating": "5",
      "ratingCount": "3498"
    },
    // FAQ Schema
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Do you ship watches to USA, Canada, UK, and Australia?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! We offer FREE shipping to USA, UK, Canada, and Australia on all orders."
          }
        },
        {
          "@type": "Question",
          "name": "What warranty do VASTARA watches come with?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "All VASTARA watches include a comprehensive 1-year international warranty covering manufacturing defects."
          }
        }
      ]
    }
  ];

  const promoMessages = [
    "💑 FREE SHIPPING to USA, UK, Canada & Australia!",
    "⭐ Join VASTARA REWARDS - Earn Points on Luxury Watches!",
    "🎁 Extended Valentines Day Returns until March 3st, 2026",
    "⏰ Order by Feb 11th for Valentines Day Delivery",
    "💎 1-YEAR WARRANTY on all premium timepieces",
    "💞 Use code VDAY25 for 25% OFF - Limited time!"
  ];

  const testimonials = [
    {name: "Sarah L.", text: "The quality is exceptional! My VASTARA watch is stunning. Arrived fast to Sydney.", rating: 5, image: "https://cdn.shopify.com/s/files/1/0778/2921/0327/files/1.jpg?v=1765938975"},
    {name: "Michael R.", text: "Best Christmas gift ever! Fast shipping to London and beautiful packaging.", rating: 5, image: "https://cdn.shopify.com/s/files/1/0778/2921/0327/files/2.jpg?v=1765938975"},
    {name: "James T.", text: "Outstanding customer service and the watch exceeded my expectations. Loves from Toronto.", rating: 5, image: "https://cdn.shopify.com/s/files/1/0778/2921/0327/files/4.jpg?v=1765938975"},
    {name: "Emily K.", text: "Elegant design, perfect for daily wear. Highly recommend VASTARA watches!", rating: 5, image: "https://cdn.shopify.com/s/files/1/0778/2921/0327/files/3.jpg?v=1765938975"}
  ];

  // ✅ CORRIGIDO: Lógica do Countdown Automático
  const calculateHolidayCountdown = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const holidays = [
      {name: 'Christmas Eve', month: 11, day: 24, emoji: '💑', message: 'SANTA IS ON HIS WAY!'},
      {name: 'New Years Eve', month: 11, day: 31, emoji: '🎉', message: '🎊 RING IN THE NEW YEAR — ORDER BY 12/27'},
      {name: 'Valentines Day', month: 1, day: 14, emoji: '❤️', message: 'VALENTINES DAY COUNTDOWN!'},
      {name: 'St Patricks Day', month: 2, day: 17, emoji: '☘️', message: 'ST PATRICKS DAY COUNTDOWN!'},
      {name: 'Easter', month: 3, day: 20, emoji: '🐣', message: 'EASTER COUNTDOWN!'},
      {name: 'Mothers Day', month: 4, day: 12, emoji: '👩', message: 'MOTHERS DAY COUNTDOWN!'},
      {name: 'Memorial Day', month: 4, day: 26, emoji: '🇺🇸', message: 'MEMORIAL DAY COUNTDOWN!'},
      {name: 'Independence Day', month: 6, day: 4, emoji: '🎆', message: 'INDEPENDENCE DAY COUNTDOWN!'},
      {name: 'Labor Day', month: 8, day: 1, emoji: '💼', message: 'LABOR DAY COUNTDOWN!'},
      {name: 'Halloween', month: 9, day: 31, emoji: '🎃', message: 'HALLOWEEN COUNTDOWN!'},
      {name: 'Thanksgiving', month: 10, day: 23, emoji: '🦃', message: 'THANKSGIVING COUNTDOWN!'}
    ];
    
    // 1. Cria objetos de data para todos os feriados
    const upcomingHolidays = holidays.map(holiday => {
      // Meses em JS começam em 0 (Janeiro = 0, Dezembro = 11)
      let holidayDate = new Date(currentYear, holiday.month, holiday.day, 23, 59, 59);
      
      // Se a data já passou (ex: Natal 2024), joga para 2025
      if (holidayDate.getTime() < now.getTime()) {
        holidayDate = new Date(currentYear + 1, holiday.month, holiday.day, 23, 59, 59);
      }
      return { ...holiday, date: holidayDate };
    });
    
    // 2. Ordena do mais próximo para o mais distante
    upcomingHolidays.sort((a, b) => a.date - b.date);
    
    // 3. Pega o primeiro da lista
    const nextHoliday = upcomingHolidays[0];
    
    if (!nextHoliday) {
      return {days: 0, hours: 0, minutes: 0, seconds: 0};
    }
    
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
    const promoTimer = setInterval(() => setCurrentPromo((p) => (p + 1) % promoMessages.length), 4000);
    return () => clearInterval(promoTimer);
  }, []);

  useEffect(() => {
    const testimonialTimer = setInterval(() => setCurrentTestimonial((p) => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(testimonialTimer);
  }, []);

  // FORCE VIDEO AUTOPLAY ON MOBILE - AGGRESSIVE APPROACH
  useEffect(() => {
    const video = document.getElementById('hero-video');
    if (video) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.log('Autoplay prevented, setting up touch handler');
          const forcePlay = () => {
            video.play();
            document.removeEventListener('touchstart', forcePlay);
            document.removeEventListener('click', forcePlay);
            document.removeEventListener('scroll', forcePlay);
          };
          document.addEventListener('touchstart', forcePlay, { once: true });
          document.addEventListener('click', forcePlay, { once: true });
          document.addEventListener('scroll', forcePlay, { once: true });
        });
      }
      setTimeout(() => {
        video.play().catch(() => {});
      }, 100);
    }
  }, []);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schemaOrgJSON)}} />
      
      {/* CORREÇÃO DO CSS: Adicionado Keyframes para o Marquee de Natal */}
      <style>{`
        header { display: none !important; }
        [class*="Header"] { display: none !important; }
        div[data-testid="header"] { display: none !important; }
        nav[data-testid="header-nav"] { display: none !important; }
        
        /* PREVENT HORIZONTAL SCROLL - SAFE WAY */
        * {
          box-sizing: border-box;
        }
        
        body, html {
          overflow-x: hidden !important;
          width: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        
        main {
          width: 100% !important;
          max-width: 100% !important;
          overflow-x: hidden !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        /* --- ANIMATION FOR CHRISTMAS MARQUEE --- */
        @keyframes marquee-christmas {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-christmas {
          display: flex;
          width: fit-content;
          animation: marquee-christmas 40s linear infinite;
        }
        .animate-marquee-christmas:hover {
          animation-play-state: paused;
        }
      `}</style>

      <main role="main" aria-label="VASTARA Luxury Watches - Main Content" className="bg-[#FEFDF8] flex flex-col min-h-screen w-full overflow-x-hidden">
        <div className="flex-grow w-full">
          {/* Top Bar with Countdown */}
          <div className="bg-black text-white py-3 text-center w-full">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-4 flex-wrap">
              <span className="text-sm md:text-base font-bold tracking-wide">
                {currentHoliday?.emoji} {currentHoliday?.message} {currentHoliday?.emoji}
              </span>
              <div className="flex items-center gap-2 border-2 border-white px-4 py-1 bg-white/10">
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

          {/* --- CHRISTMAS SCROLL BAR (NEW) --- */}
          <div className="w-full bg-[#8B0000] border-y-2 border-[#D4AF69] overflow-hidden py-3 relative z-20 shadow-lg">
            {/* Subtle Texture Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-10" style={{backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '15px 15px'}}></div>
            <div className="animate-marquee-christmas flex items-center">
              {/* Repetimos o conteúdo várias vezes para garantir o loop infinito em telas grandes */}
              {[...Array(12)].map((_, i) => (
                <div key={i} className="flex items-center mx-8 whitespace-nowrap">
                   <span className="text-2xl mr-3 filter drop-shadow-md">💋</span>
                   <span className="text-[#FEFDF8] font-serif italic text-xl tracking-widest font-medium uppercase drop-shadow-md" style={{textShadow: '0 1px 2px rgba(0,0,0,0.5)'}}>
                     ❤️ This Valentines Day, Gift a Watch They Will Treasure Forever
                   </span>
                   <span className="text-2xl ml-3 filter drop-shadow-md">💝</span>
                   
                   {/* Elegant Separator */}
                   <div className="ml-8 flex items-center gap-2 opacity-70">
                     <span className="text-[#D4AF69] text-xs">✦</span>
                     <span className="w-16 h-[1px] bg-[#D4AF69]"></span>
                     <span className="text-[#D4AF69] text-xs">✦</span>
                   </div>
                </div>
              ))}
            </div>
          </div>
          {/* --- END CHRISTMAS SCROLL BAR --- */}

          {/* Intro Section */}
          <div className="grid md:grid-cols-2 gap-0 w-full">
            <div className="bg-gradient-to-r from-[#D4AF69] via-[#F4D03F] to-[#D4AF69] py-8 px-6 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.1) 10px, rgba(255,255,255,.1) 20px)'}}></div>
              <div className="relative z-10 max-w-4xl mx-auto">
                <h2 className="text-[#0A3D2F] text-3xl md:text-4xl font-light mb-6 tracking-wide text-center">
                  💝 Valentine’s Watch Privileges <span className="text-[#b87333] font-serif italic text-5xl">&</span> Unwrap Luxury
                </h2>
                <p className="text-[#0A3D2F] text-lg font-semibold mb-4 text-center">
                  💋 Use code: <span className="text-white bg-[#0A3D2F] px-4 py-1 rounded-md font-bold">VDAY25</span> for 25% OFF
                </p>
                <p className="text-sm text-[#2a2a2a] text-center">Limited New Year's selection available now! Offer ends soon.</p>
              </div>
            </div>

            {/* Benefits Bar */}
            <div className="bg-[#FEFDF8] border-l-2 border-[#D4AF69] py-8 px-4 sm:px-6">
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-center">
                  <div className="w-full sm:w-auto">
                    <h3 className="text-3xl sm:text-4xl font-bold text-[#0A3D2F] mb-1 whitespace-nowrap">Benefits</h3>
                    <p className="text-xs sm:text-sm text-[#9d8b7c]">Quality timepieces</p>
                  </div>
                  <span className="text-4xl sm:text-5xl text-[#D4AF69] font-serif italic self-center">&</span>
                  <div className="w-full sm:w-auto">
                    <h3 className="text-3xl sm:text-4xl font-bold text-[#0A3D2F] mb-1 whitespace-nowrap">Guaranteed</h3>
                    <p className="text-xs sm:text-sm text-[#9d8b7c]">1 Year Warranty</p>
                  </div>
                  <span className="text-xl sm:text-2xl text-[#9d8b7c] font-medium self-center">Plus</span>
                  <div className="w-full sm:w-auto">
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#0A3D2F] mb-1 whitespace-nowrap">$20 Gift Card</h3>
                    <p className="text-xs sm:text-sm text-[#9d8b7c]">per $100 spent</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Promo Ticker */}
          <div className="bg-[#b91c1c] text-white py-3 overflow-hidden relative w-full">
            <div className="max-w-7xl mx-auto px-6">
              <div className="relative h-6 flex items-center justify-center">
                {promoMessages.map((msg, idx) => (
                  <div key={idx} className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${idx === currentPromo ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}>
                    <p className="text-sm md:text-base font-semibold tracking-wide text-center px-4">{msg}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="bg-[#F5F3ED] border-b border-[#D4AF69] w-full">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="text-xl font-serif text-[#0A3D2F]">🎁 SHOP WATCHES WITH CONFIDENCE:</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
                <div className="flex items-start justify-center md:justify-start gap-3">
                  <div>
                    <p className="text-[#0A3D2F] font-semibold mb-1"><span className="text-[#b87333]">Guaranteed</span> in Time for Valentines Day</p>
                    <p className="text-[#9d8b7c] text-sm">💝 Order by 02/11 at 5PM ET (USA/UK/CAN). <span className="underline cursor-pointer">Details</span></p>
                  </div>
                </div>
                <div className="flex items-start justify-center gap-3">
                  <div>
                    <p className="text-[#0A3D2F] font-semibold mb-1"><span className="text-[#b87333]">Best</span> Watch Price Guarantee</p>
                    <p className="text-[#9d8b7c] text-sm">Price match within 30 days. <span className="underline cursor-pointer">Details</span></p>
                  </div>
                </div>
                <div className="flex items-start justify-center md:justify-end gap-3">
                  <div>
                    <p className="text-[#0A3D2F] font-semibold mb-1"><span className="text-[#b87333]">Easy</span> Returns</p>
                    <p className="text-[#9d8b7c] text-sm">Free returns until 3/03. <span className="underline cursor-pointer">Details</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Navigation */}
          <div className="bg-[#0A3D2F] text-white py-3 w-full">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <p className="text-sm font-medium tracking-wider">🎄 FREE SHIPPING (USA/UK/CA/AU) • 1-YEAR WARRANTY • EASY RETURNS 🎁</p>
            </div>
          </div>

          {/* VIDEO HERO BANNER - AUTO-PLAYING LOOP */}
          <section className="mb-12 sm:mb-16 md:mb-20 w-full px-0">
            <div className="max-w-7xl mx-auto mt-4 sm:mt-8 px-2 sm:px-4 md:px-6 w-full">
              <div className="relative h-64 sm:h-80 md:h-96 lg:h-[70vh] overflow-hidden rounded-[10px] shadow-xl sm:shadow-2xl">
                <video
                  id="hero-video"
                  autoPlay
                  loop
                  muted
                  playsInline
                  webkit-playsinline="true"
                  x-webkit-airplay="allow"
                  preload="auto"
                  className="absolute inset-0 w-full h-full object-cover"
                  poster="https://cdn.shopify.com/s/files/1/0778/2921/0327/files/5.avif?v=1765596668"
                >
                  <source src="https://cdn.shopify.com/videos/c/o/v/9788927ebacf4e3ca19449cafd11fc55.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20 z-10"></div>
                <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 sm:px-8 md:px-16">
                  <h1 className="text-white text-2xl sm:text-4xl md:text-6xl font-light tracking-widest mb-2 sm:mb-4"></h1>
                  <p className="text-[#D4AF69] text-sm sm:text-lg md:text-xl tracking-wider mb-2 sm:mb-4">
                    Premium Swiss-Inspired Automatic & Quartz Timepieces
                  </p>
                  <Link to="/collections/new-arrivals" className="inline-block border-2 border-[#D4AF69] bg-[#0A3D2F] text-white px-6 sm:px-10 py-2 sm:py-3 rounded-full hover:bg-[#D4AF69] hover:text-[#0A3D2F] hover:border-[#0A3D2F] transition-all font-semibold tracking-wider w-fit mt-2 sm:mt-4 text-xs sm:text-base">
                    DISCOVER COLLECTION
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Men's/Women's Collection */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mb-20 w-full">
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              <div className="relative h-72 sm:h-80 md:h-96 overflow-hidden rounded-[10px] shadow-xl group">
                <img 
                  src="https://cdn.shopify.com/s/files/1/0778/2921/0327/files/men_s_collection_dc5c97d6-952f-43c1-9f24-8eadb0693f74.avif?v=1765592942" 
                  alt="Men's Luxury Watches USA, UK, Canada & Australia - Shop Online" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" 
                  width="800" 
                  height="600"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#b91c1c]/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-8 text-white">
                  <h2 className="text-2xl sm:text-3xl font-light mb-2 tracking-wide">MEN'S COLLECTION</h2>
                  <p className="text-[#D4AF69] mb-4 text-sm sm:text-base">Sophisticated timepieces for the modern gentleman</p>
                  <Link to="/collections/mens-watches" className="inline-block bg-white text-[#b91c1c] px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold hover:bg-[#D4AF69] hover:text-white transition-all text-sm sm:text-base">SHOP NOW</Link>
                </div>
              </div>
              <div className="relative h-72 sm:h-80 md:h-96 overflow-hidden rounded-[10px] shadow-xl group">
                <img 
                  src="https://cdn.shopify.com/s/files/1/0778/2921/0327/files/7.avif?v=1765596667" 
                  alt="Women's Luxury Watches USA, UK, Canada & Australia - Shop Online" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" 
                  width="800" 
                  height="600"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A3D2F]/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-8 text-white">
                  <h2 className="text-2xl sm:text-3xl font-light mb-2 tracking-wide">WOMEN'S COLLECTION</h2>
                  <p className="text-[#D4AF69] mb-4 text-sm sm:text-base">Elegant designs that capture timeless beauty</p>
                  <Link to="/collections/womens-watches" className="inline-block bg-white text-[#0A3D2F] px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold hover:bg-[#D4AF69] hover:text-white transition-all text-sm sm:text-base">SHOP NOW</Link>
                </div>
              </div>
            </div>
          </section>

          {/* Products Under $100 Section */}
          <ProductsUnder100 products={under100Products} />

          {/* Gift Budget Cards */}
          <section className="bg-white py-12 sm:py-20 mb-20 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <h2 className="text-[#0A3D2F] text-2xl sm:text-3xl md:text-4xl font-light text-center mb-8 sm:mb-12 tracking-wide">Luxury Watch Gifts for Every Budget</h2>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 sm:gap-6">
                {[
                  {title: '$80', subtitle: 'AND UNDER', url: '/products/vastara-digital-gift-card'},
                  {title: '$100', subtitle: 'AND UNDER', url: '/products/vastara-digital-gift-card'},
                  {title: '$200', subtitle: 'AND UNDER', url: '/products/vastara-digital-gift-card'},
                  {title: '$300', subtitle: 'AND UNDER', url: '/products/vastara-digital-gift-card'},
                  {title: '$400', subtitle: 'AND UNDER', url: '/products/vastara-digital-gift-card'},
                  {title: '$500', subtitle: 'AND UNDER', url: '/products/vastara-digital-gift-card'}
                ].map((item, idx) => (
                  <Link key={idx} to={item.url} className="group">
                    <div className="relative bg-gradient-to-br from-[#c41e3a] to-[#8b0000] text-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl text-center transition-all duration-300 hover:scale-110 hover:shadow-2xl" 
                         style={{
                           clipPath: 'polygon(15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%, 0% 15%)',
                           boxShadow: '0 8px 25px rgba(139, 0, 0, 0.3)',
                           height: '110px',
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'center',
                           flexDirection: 'column'
                         }}>
                      <div className="absolute top-3 sm:top-4 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 text-xs opacity-70">
                        <span>✦</span>
                        <span className="text-base sm:text-lg">✦</span>
                        <span>✦</span>
                      </div>
                      <div className="relative z-10 pt-3 sm:pt-4 flex-grow flex flex-col justify-center">
                        <h3 className="text-base sm:text-lg font-semibold mb-1 leading-tight">{item.title}</h3>
                        <p className="text-[#D4AF69] text-xs tracking-widest uppercase font-bold">{item.subtitle}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Rewards Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-20 w-full">
            <div className="bg-gradient-to-r from-[#0A3D2F] to-[#0F5447] rounded-[10px] shadow-2xl overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="bg-gradient-to-br from-[#0A3D2F] to-[#051F1A] p-8 sm:p-12 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D4AF69] via-[#FEFDF8] to-[#1a5757]"></div>
                  <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-[#D4AF69] via-[#FEFDF8] to-[#1a5757]"></div>
                  <div className="relative z-10 transform -rotate-6 hover:rotate-0 transition-transform duration-500 w-full max-w-[340px] sm:max-w-[400px]">
                    <div className="bg-gradient-to-br from-[#8B1A1A] to-[#4A0E0E] rounded-xl p-5 sm:p-6 shadow-2xl border-2 border-[#D4AF69] w-full aspect-[1.586/1] flex flex-col justify-between">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#D4AF69] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                        <h3 className="text-white text-base sm:text-xl font-bold tracking-wider">VASTARA REWARDS</h3>
                      </div>
                      <div className="space-y-1 my-3 sm:my-4">
                        <p className="text-white text-xs sm:text-sm tracking-widest">•••• •••• •••• 0000</p>
                        <p className="text-[#D4AF69] text-xs">MEMBER SINCE 2024</p>
                      </div>
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-[#D4AF69] text-xs uppercase">CARDHOLDER</p>
                          <p className="text-white font-semibold text-sm sm:text-base">YOUR NAME</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[#D4AF69] text-xs uppercase">POINTS</p>
                          <p className="text-white font-bold text-xl sm:text-2xl">∞</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-8 sm:p-12 flex flex-col justify-center bg-gradient-to-br from-[#1a5757] to-[#2a2a2a]">
                  <div className="inline-block bg-[#D4AF69] text-[#0A3D2F] px-4 py-1 rounded-full text-xs font-bold mb-4 w-fit">Save up to $100!</div>
                  <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-light mb-4 sm:mb-6 tracking-wide">Enjoy <span className="text-[#D4AF69] font-semibold">25% OFF</span></h2>
                  <p className="text-gray-300 text-lg sm:text-xl mb-4 sm:mb-6">on Vastara.online watch purchases today</p>
                  <div className="bg-[#D4AF69] text-[#0A3D2F] px-4 sm:px-6 py-3 rounded-lg inline-block mb-4 sm:mb-6 w-fit">
                    <p className="text-xs sm:text-sm mb-1 font-semibold">Use code:</p>
                    <p className="text-2xl sm:text-3xl font-bold tracking-wider">VDAY25</p>
                  </div>
                  <p className="text-gray-400 text-sm mb-4 sm:mb-6">When you join Vastara Rewards. Discount applied at checkout.</p>
                  <Link to="/rewards" className="bg-[#D4AF69] text-[#0A3D2F] px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-[#F4D03F] hover:scale-105 transition-all text-center w-fit text-sm sm:text-base">Start Earning Rewards</Link>
                  <p className="text-xs text-gray-400 mt-3">More for your money.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="bg-white py-12 sm:py-20 mb-20 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <h2 className="text-[#0A3D2F] text-2xl sm:text-3xl md:text-4xl font-light text-center mb-4 tracking-wide">What Our Customers Say</h2>
              <p className="text-[#9d8b7c] text-center mb-8 sm:mb-12 text-sm sm:text-base">Over 3,498+ happy watch collectors worldwide</p>
              <div className="relative h-auto min-h-[250px] sm:min-h-[280px]">
                {testimonials.map((testimonial, idx) => (
                  <div key={idx} className={`absolute inset-0 transition-all duration-1000 ${idx === currentTestimonial ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    <div className="bg-[#FEFDF8] rounded-[10px] shadow-xl p-6 sm:p-8 max-w-3xl mx-auto">
                      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <img 
                            src={testimonial.image} 
                            alt={`${testimonial.name} - Happy VASTARA Watch Customer`} 
                            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-[#D4AF69]" 
                            width="64" 
                            height="64"
                            loading="lazy"
                            decoding="async"
                        />
                        <div>
                          <p className="font-semibold text-[#0A3D2F] text-sm sm:text-base">{testimonial.name}</p>
                          <div className="flex gap-1">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF69]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-[#2a2a2a] text-base sm:text-lg italic leading-relaxed">"{testimonial.text}"</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-2 mt-6 sm:mt-8">
                {testimonials.map((_, idx) => (
                  <button key={idx} onClick={() => setCurrentTestimonial(idx)} className={`h-2 rounded-full transition-all ${idx === currentTestimonial ? 'bg-[#D4AF69] w-8' : 'bg-[#9d8b7c]/30 w-2'}`} aria-label={`View testimonial ${idx + 1}`}/>
                ))}
              </div>
            </div>
          </section>

          
          {/* NEW: LOCATION-SPECIFIC SHIPPING SECTION */}
          <section className="bg-gradient-to-b from-white to-[#F5F3ED] py-16 sm:py-20 mb-20 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
              <h2 className="text-[#0A3D2F] text-2xl sm:text-3xl md:text-4xl font-light text-center mb-4 tracking-wide">
                Premium Watches Delivered Worldwide
              </h2>
              <p className="text-[#9d8b7c] text-center mb-12 text-sm sm:text-base mx-auto">
                Fast, reliable shipping to all major cities across USA, Canada, UK & Australia
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow">
                  <div className="text-4xl mb-4">🇺🇸</div>
                  <h3 className="text-xl font-semibold text-[#0A3D2F] mb-3">United States</h3>
                  <p className="text-[#9d8b7c] text-sm leading-relaxed">
                    Fast shipping to New York, Los Angeles, Chicago, Houston, Phoenix, Philadelphia, San Antonio, San Diego, Dallas, San Jose & all 50 states
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow">
                  <div className="text-4xl mb-4">🇨🇦</div>
                  <h3 className="text-xl font-semibold text-[#0A3D2F] mb-3">Canada</h3>
                  <p className="text-[#9d8b7c] text-sm leading-relaxed">
                    Quick delivery to Toronto, Montreal, Vancouver, Calgary, Edmonton, Ottawa, Winnipeg, Quebec City & nationwide
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow">
                  <div className="text-4xl mb-4">🇬🇧</div>
                  <h3 className="text-xl font-semibold text-[#0A3D2F] mb-3">United Kingdom</h3>
                  <p className="text-[#9d8b7c] text-sm leading-relaxed">
                    Express shipping to London, Manchester, Birmingham, Leeds, Glasgow, Edinburgh, Liverpool, Bristol & UK-wide
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow">
                  <div className="text-4xl mb-4">🇦🇺</div>
                  <h3 className="text-xl font-semibold text-[#0A3D2F] mb-3">Australia</h3>
                  <p className="text-[#9d8b7c] text-sm leading-relaxed">
                    Reliable delivery to Sydney, Melbourne, Brisbane, Perth, Adelaide, Gold Coast, Canberra & all territories
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Collection Images */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-12 w-full">
            <h2 className="text-[#0A3D2F] text-2xl sm:text-3xl md:text-4xl font-light text-center mb-8 sm:mb-12 tracking-wide">SHOP LUXURY WATCH COLLECTIONS</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link to="/collections/new-arrivals" className="group relative h-64 sm:h-72 md:h-80 overflow-hidden rounded-[10px] shadow-lg hover:shadow-2xl transition-shadow">
                <img 
                  src="https://cdn.shopify.com/s/files/1/0778/2921/0327/files/new_arrival.avif?v=1765510544" 
                  alt="New Arrival Luxury Watches - Latest Timepieces USA UK Canada Australia" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="800"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A3D2F]/90 via-transparent to-transparent"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <h3 className="text-white text-xl sm:text-2xl font-light tracking-wider mb-2 text-center">NEW ARRIVALS</h3>
                  <span className="text-[#D4AF69] text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">SHOP NOW →</span>
                </div>
              </Link>
              <Link to="/collections/sport-watches" className="group relative h-64 sm:h-72 md:h-80 overflow-hidden rounded-[10px] shadow-lg hover:shadow-2xl transition-shadow">
                <img 
                  src="https://cdn.shopify.com/s/files/1/0778/2921/0327/files/sport_collection.avif?v=1765510563" 
                  alt="Sport Watches - Durable & Stylish Athletic Timepieces" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="800"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A3D2F]/90 via-transparent to-transparent"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <h3 className="text-white text-xl sm:text-2xl font-light tracking-wider mb-2 text-center">SPORT WATCHES</h3>
                  <span className="text-[#D4AF69] text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">SHOP NOW →</span>
                </div>
              </Link>
              <Link to="/collections/fossil-watch" className="group relative h-64 sm:h-72 md:h-80 overflow-hidden rounded-[10px] shadow-lg hover:shadow-2xl transition-shadow sm:col-span-2 lg:col-span-1">
                <img 
                  src="https://cdn.shopify.com/s/files/1/0778/2921/0327/files/Fossil.avif?v=1765510524" 
                  alt="Fossil Watches Collection - Authentic Styles" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="800"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A3D2F]/90 via-transparent to-transparent"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <h3 className="text-white text-xl sm:text-2xl font-light tracking-wider mb-2 text-center">FOSSIL WATCHES</h3>
                  <span className="text-[#D4AF69] text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">SHOP NOW →</span>
                </div>
              </Link>
            </div>
          </section>

          {/* Featured Products */}
          <section className="bg-white py-12 sm:py-16 md:py-20 mb-16 sm:mb-20 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <h2 className="text-[#0A3D2F] text-2xl sm:text-3xl md:text-4xl font-light text-center mb-8 sm:mb-12 tracking-wide">SIGNATURE LUXURY TIMEPIECES</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {products.nodes.slice(0, 8).map(p => (
                  <Link key={p.id} to={`/products/${getProductHandle(p.handle)}`} className="group">
                    <div className="relative aspect-square mb-3 sm:mb-4 overflow-hidden rounded-[10px] bg-[#FEFDF8] shadow-md sm:shadow-lg group-hover:shadow-xl transition-shadow">
                      {p.featuredImage && (
                        <Image 
                          data={p.featuredImage} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                          aspectRatio="1/1"
                          alt={p.featuredImage.altText || `${p.title} - Luxury Watch USA UK Canada Australia`}
                          loading="lazy"
                        />
                      )}
                    </div>
                    <div className="text-center px-2">
                      <p className="text-[#D4AF69] text-xs tracking-widest mb-1 uppercase font-semibold line-clamp-1">{p.vendor || 'VASTARA'}</p>
                      <h3 className="text-[#0A3D2F] font-light mb-2 hover:text-[#1a5757] transition-colors text-xs sm:text-sm line-clamp-2">{p.title}</h3>
                      <Money data={p.priceRange.minVariantPrice} className="text-[#2a2a2a] font-medium text-xs sm:text-sm"/>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

        </div>

        <VastaraFooter menu={footerMenu} />

      </main>

    </>

  );

}

const FEATURED_COLLECTIONS_QUERY = '#graphql' + String.raw`
  fragment Collection on Collection {
    id
    title
    handle
    image {
      id
      url
      altText
      width
      height
    }
  }
  query FeaturedCollections(
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    collections(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...Collection
      }
    }
  }
`;

const FEATURED_PRODUCTS_QUERY = '#graphql' + String.raw`
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment ProductItem on Product {
    id
    handle
    title
    vendor
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
    }
  }
  query FeaturedProducts(
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    products(first: 8, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...ProductItem
      }
    }
  }
`;

const FOOTER_MENU_QUERY = `#graphql
  fragment IndexFooterMenuItem on MenuItem {
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
  query IndexFooterMenu($footerMenuHandle: String!) {
    menu(handle: $footerMenuHandle) {
      id
      items {
        ...IndexFooterMenuItem
      }
    }
  }
`;

const PRODUCTS_UNDER_100_QUERY = '#graphql' + String.raw`
  fragment ProductUnder100 on Product {
    id
    handle
    title
    vendor
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
  }
  query ProductsUnder100(
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    products(
      first: 12, 
      sortKey: BEST_SELLING,
      query: "variants.price:<100"
    ) {
      nodes {
        ...ProductUnder100
      }
    }
  }
`;

function VastaraFooter({ menu }) {
  const menuItems = menu?.items || [];
  return (
    <footer className="relative bg-gradient-to-b from-[#0A3D2F] via-[#1a5f4a] to-[#0d2e23] text-white overflow-hidden w-full">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #D4AF69 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      {/* Newsletter Section */}
      <div className="relative border-b border-[#D4AF69]/20 w-full">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-4xl font-light text-[#D4AF69] mb-3 tracking-wide">
                Join The Collection
              </h3>
              <p className="text-gray-300 text-lg">
                Exclusive access to new releases, special offers, and horological insights for watch enthusiasts.
              </p>
            </div>
            <FooterNewsletterForm />
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6 group">
              <div className="text-5xl font-serif text-white tracking-[0.3em] group-hover:text-[#D4AF69] transition-colors duration-300">
                VASTARA
              </div>
              <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-[#D4AF69] to-transparent transition-all duration-500 mt-2"></div>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-xs">
              Crafting timeless elegance in luxury watches. Each timepiece embodies precision engineering and sophisticated design for the discerning collector in USA, UK, Canada, and Australia.
            </p>
            
            {/* Trust Badges */}
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
                <span className="text-gray-300">Free Shipping to USA, UK, CA & AU</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-full bg-[#D4AF69]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#D4AF69]">✓</span>
                </div>
                <span className="text-gray-300">Secure Checkout</span>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-[#D4AF69] text-sm font-bold mb-6 uppercase tracking-widest relative inline-block">
              Explore Watches
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#D4AF69] to-transparent"></div>
            </h4>
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
                  Watch Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-[#D4AF69] text-sm font-bold mb-6 uppercase tracking-widest relative inline-block">
              Support
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#D4AF69] to-transparent"></div>
            </h4>
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
                <Link to="/pages/1-year-warranty" className="text-gray-300 hover:text-[#D4AF69] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Warranty
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-[#D4AF69] text-sm font-bold mb-6 uppercase tracking-widest relative inline-block">
              Company
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#D4AF69] to-transparent"></div>
            </h4>
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
            
            {/* Social Media */}
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

            {/* Payment Methods */}
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

          {/* Copyright */}
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
      
      {/* Bottom Decorative Line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-[#D4AF69] to-transparent"></div>
    </footer>
  );
}
