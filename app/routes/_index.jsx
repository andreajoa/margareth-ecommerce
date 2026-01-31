import {FooterNewsletterForm} from '~/components/FooterNewsletterForm';
import {ProductFooter} from '~/components/ProductFooter';
import {useLoaderData, Link} from 'react-router';
import {useState, useEffect} from 'react';
import {Image, Money} from '@shopify/hydrogen';

export const meta = () => {
  return [
    // PRIMARY META TAGS
    {title: 'brinqueTEAndo | Brinquedos Educativos e Sensoriais para Autismo e TDAH'},
    {name: 'description', content: 'Loja especializada em brinquedos educativos e sensoriais para crianças com Autismo (TEA) e TDAH. Produtos selecionados para desenvolvimento e inclusão.'},
    
    // --- VERIFICAÇÕES IMPORTADAS DO THEME.LIQUID ---
    // Facebook Domain Verification (Essencial para Anúncios)
    {name: 'facebook-domain-verification', content: 'qbk5t5o0agiy90kflze09te3423xgt'},
    
    // GEO-TARGETING META TAGS
    {name: 'geo.region', content: 'BR'},
    {name: 'geo.placename', content: 'Brasil'},
    
    // ENHANCED KEYWORDS (Location-based & Long-tail)
    {name: 'keywords', content: 'brinquedos autismo, brinquedos tdah, brinquedos sensoriais, brinquedos educativos, inclusão, desenvolvimento infantil, tea, autismo brasil, brinqueteaando'},
    
    // LANGUAGE TARGETING
    {httpEquiv: 'content-language', content: 'pt-BR'},
    
    // ENHANCED OPEN GRAPH TAGS
    {property: 'og:title', content: 'brinqueTEAndo | Brinquedos Educativos e Sensoriais'},
    {property: 'og:description', content: 'Loja especializada em brinquedos para Autismo e TDAH. Desenvolvimento com diversão.'},
    {property: 'og:type', content: 'website'},
    {property: 'og:url', content: 'https://brinqueteaando.online'},
    {property: 'og:image', content: 'https://cdn.shopify.com/s/files/1/0778/2921/0327/files/5.avif?v=1765596668'},
    {property: 'og:image:width', content: '1200'},
    {property: 'og:image:height', content: '630'},
    {property: 'og:site_name', content: 'brinqueTEAndo'},
    {property: 'og:locale', content: 'pt_BR'},
    
    // TWITTER CARDS
    {name: 'twitter:card', content: 'summary_large_image'},
    {name: 'twitter:title', content: 'brinqueTEAndo | Brinquedos Educativos e Sensoriais'},
    {name: 'twitter:description', content: 'Brinquedos selecionados para desenvolvimento de crianças com TEA e TDAH.'},
    {name: 'twitter:image', content: 'https://cdn.shopify.com/s/files/1/0778/2921/0327/files/5.avif?v=1765596668'},
    
    // ENHANCED ROBOTS & INDEXING
    {name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'},
    {name: 'googlebot', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'},
    
    // MOBILE OPTIMIZATION
    {name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=5'},
    {name: 'mobile-web-app-capable', content: 'yes'},
    {name: 'apple-mobile-web-app-capable', content: 'yes'},
    
    // THEME COLOR
    {name: 'theme-color', content: '#87CEEB'},
    
    // CANONICAL URL
    {tagName: 'link', rel: 'canonical', href: 'https://brinqueteaando.online'},
    
    // HREFLANG FOR GEO-TARGETING
    {tagName: 'link', rel: 'alternate', hreflang: 'pt-br', href: 'https://brinqueteaando.online'},
    {tagName: 'link', rel: 'alternate', hreflang: 'x-default', href: 'https://brinqueteaando.online'},
    
    // PRECONNECT & DNS-PREFETCH
    {tagName: 'link', rel: 'preconnect', href: 'https://cdn.shopify.com'},
    {tagName: 'link', rel: 'dns-prefetch', href: 'https://cdn.shopify.com'},
    
    // PRELOAD CRITICAL RESOURCES
    {tagName: 'link', rel: 'preload', as: 'video', href: 'https://cdn.shopify.com/videos/c/o/v/9788927ebacf4e3ca19449cafd11fc55.mp4'},
  ];
};

export async function loader({context}) {
  const {storefront} = context;
  const {collections} = await storefront.query(FEATURED_COLLECTIONS_QUERY);
  const {products} = await storefront.query(FEATURED_PRODUCTS_QUERY);
  const {menu: footerMenu} = await storefront.query(FOOTER_MENU_QUERY, {
    variables: { footerMenuHandle: 'footer' }
  });
  return {collections, products, footerMenu};
}

export default function Homepage() {
  const {collections, products, footerMenu} = useLoaderData();
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
      "name": "brinqueTEAndo",
      "url": "https://brinqueteaando.online",
      "logo": "https://cdn.shopify.com/s/files/1/0778/2921/0327/files/5.avif?v=1765596668",
      "description": "Loja especializada em brinquedos sensoriais e educativos para crianças com Autismo e TDAH.",
      "foundingDate": "2024",
      "areaServed": [
        {"@type": "Country", "name": "Brazil"}
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+55-13-99189-9708",
        "contactType": "Customer Service",
        "areaServed": ["BR"],
        "availableLanguage": ["Portuguese"]
      },
      "sameAs": [
        "https://www.instagram.com/brinqueteaando/",
        "https://www.facebook.com/brinqueteaando",
        "https://www.tiktok.com/@brinqueteaando",
      ]
    },
    // WebSite Schema with Search Action
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "brinqueTEAndo",
      "url": "https://brinqueteaando.online",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://brinqueteaando.online/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    // Store/LocalBusiness Schema
    {
      "@context": "https://schema.org",
      "@type": "Store",
      "name": "brinqueTEAndo - Loja Online",
      "image": "https://cdn.shopify.com/s/files/1/0778/2921/0327/files/5.avif?v=1765596668",
      "url": "https://brinqueteaando.online",
      "priceRange": "R$$-R$$$",
      "currenciesAccepted": "BRL",
      "paymentAccepted": "Cartão de Crédito, PIX, Boleto",
      "areaServed": [
        {"@type": "Country", "name": "BR"}
      ]
    },
    // Product Collection Schema
    {
      "@context": "https://schema.org",
      "@type": "OfferCatalog",
      "name": "Coleções de Brinquedos brinqueTEAndo",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Brinquedos Sensoriais",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "Brinquedos Sensoriais",
                "description": "Brinquedos para estimulação sensorial"
              }
            }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "Jogos Educativos",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "Jogos Educativos",
                "description": "Jogos para desenvolvimento cognitivo"
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
          "name": "Início",
          "item": "https://brinqueteaando.online"
        }
      ]
    },
    // Aggregate Rating Schema
    {
      "@context": "https://schema.org",
      "@type": "AggregateRating",
      "itemReviewed": {
        "@type": "Organization",
        "name": "brinqueTEAndo"
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
          "name": "Vocês entregam para todo o Brasil?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim! Oferecemos frete GRÁTIS para toda Baixada Santista!"
          }
        },
        {
          "@type": "Question",
          "name": "Qual a garantia dos produtos?",
          "acceptedAnswer": {
            "@type": "Answer",
                "text": "Todos os produtos brinqueTEAndo incluem garantia contra defeitos de fabricação."
          }
        }
      ]
    },
    // VideoObject Schema for Hero Video
    {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "name": "brinqueTEAndo - Brinquedos Educativos e Sensoriais",
      "description": "Loja especializada em brinquedos educativos e sensoriais para crianças com Autismo (TEA) e TDAH",
      "thumbnailUrl": "https://cdn.shopify.com/s/files/1/0778/2921/0327/files/5.avif?v=1765596668",
      "uploadDate": "2024-01-01",
      "contentUrl": "https://cdn.shopify.com/videos/c/o/v/288d4004873043ffb9ba58d24ba5a38c.mp4",
      "embedUrl": "https://brinqueteaando.online",
      "publisher": {
        "@type": "Organization",
        "name": "brinqueTEAndo",
        "logo": {
          "@type": "ImageObject",
          "url": "https://cdn.shopify.com/s/files/1/0778/2921/0327/files/5.avif?v=1765596668"
        }
      }
    }
  ];

  const promoMessages = [
    "🚚 Frete grátis para toda Baixada Santista!",
    "⭐ brinqueTEAando REWARDS — Ganhe pontos!",
    "🎁 Trocas e devoluções facilitadas",
    "🧠 Desenvolvimento e diversão para TEA e TDAH",
    "💎 Qualidade e Segurança garantidas",
    "🎅 Use o código BEMVINDO10 e ganhe 10% OFF"
  ];

  const testimonials = [
    {name: "Sarah L.", text: "Meu filho adorou os brinquedos! Ajudou muito na concentração.", rating: 5, image: "https://cdn.shopify.com/s/files/1/0778/2921/0327/files/1.jpg?v=1765938975"},
    {name: "Michael R.", text: "Excelente qualidade e entrega rápida. Recomendo para pais atípicos.", rating: 5, image: "https://cdn.shopify.com/s/files/1/0778/2921/0327/files/2.jpg?v=1765938975"},
    {name: "James T.", text: "Atendimento nota 10. A equipe entende nossas necessidades.", rating: 5, image: "https://cdn.shopify.com/s/files/1/0778/2921/0327/files/4.jpg?v=1765938975"},
    {name: "Emily K.", text: "Produtos maravilhosos, meu sobrinho não larga o pop-it.", rating: 5, image: "https://cdn.shopify.com/s/files/1/0778/2921/0327/files/3.jpg?v=1765938975"}
  ];

  // ✅ CORRIGIDO: Lógica do Countdown Automático
  const calculateHolidayCountdown = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const holidays = [
      // TEA/Autismo/TDAH Events in Brazil - Main focus
      {name: 'III Jornada sobre Aprendizagem e Autismo - Baixada Santista', month: 2, day: 29, emoji: '🧩', message: 'III JORNADA AUTISMO BAIXADA SANTISTA - 29/03'}, // March 29, 2026
      {name: 'ExpoTEA 2025 - Maior Feira de Autismo do Mundo', month: 10, day: 28, emoji: '🎪', message: 'EXPOTEA 2025 - MAIOR FEIRA DE AUTISMO DO MUNDO!'}, // November 28, 2026
      
      // Additional TDAH/Autism/TEA Events for 2026
      {name: 'Congresso Brasileiro de TDAH', month: 4, day: 15, emoji: '🧠', message: 'CONGRESSO BRASILEIRO TDAH - 15/05'}, // May 15, 2026
      {name: 'Semana Nacional de Conscientização do Autismo', month: 3, day: 2, emoji: '🌈', message: 'SEMANA AUTISMO BRASIL - 02/04'}, // April 2, 2026
      {name: 'Dia Mundial do Autismo', month: 3, day: 2, emoji: '💙', message: 'DIA MUNDIAL DO AUTISMO - 02/04'}, // April 2, 2026
      {name: 'Feira de Tecnologias Assistivas', month: 6, day: 10, emoji: '🤖', message: 'FEIRA TECNOLOGIAS ASSISTIVAS - 10/07'}, // July 10, 2026
      {name: 'Encontro Nacional de Pais de Autistas', month: 8, day: 25, emoji: '👨‍👩‍👧‍👦', message: 'ENCONTRO PAIS AUTISTAS - 25/09'}, // September 25, 2026
      {name: 'Workshop Terapias Alternativas TDAH', month: 9, day: 5, emoji: '🧘', message: 'WORKSHOP TERAPIAS TDAH - 05/10'}, // October 5, 2026
      {name: 'Feira de Brinquedos Terapêuticos', month: 11, day: 12, emoji: '🧸', message: 'FEIRA BRINQUEDOS TERAPÊUTICOS - 12/12'}, // December 12, 2026
      
      // UPCOMING 2026 EVENTS - Added to ensure countdown works
      {name: 'Evento Especial TDAH Fevereiro', month: 1, day: 15, emoji: '🎯', message: 'EVENTO ESPECIAL TDAH - 15/02'}, // February 15, 2026 (closest!)
      {name: 'Workshop Introdução ao Autismo', month: 1, day: 22, emoji: '🎓', message: 'WORKSHOP INTRODUÇÃO AUTISMO - 22/02'} // February 22, 2026
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

  // FORCE VIDEO AUTOPLAY ON MOBILE - RESPECT ACCESSIBILITY
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (document.documentElement.classList.contains('neurodivergent')) return;
    }
    const video = document.getElementById('hero-video');
    if (video) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.log('Autoplay prevented, setting up touch handler');
          const forcePlay = () => {
            if (!document.documentElement.classList.contains('neurodivergent')) {
              video.play();
            }
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
        if (!document.documentElement.classList.contains('neurodivergent')) {
          video.play().catch(() => {});
        }
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
          animation: marquee-christmas 60s linear infinite;
        }
        .animate-marquee-christmas:hover {
          animation-play-state: paused;
        }
      `}</style>
      <main role="main" aria-label="brinqueTEAando - Brinquedos Educativos e Sensoriais" className="bg-[#FEFDF8] flex flex-col min-h-screen w-full overflow-x-hidden">
        <div className="flex-grow w-full">
          {/* Top Bar with Countdown - Cores brinqueTEAando */}
          <div className="bg-[#3A8ECD] text-white py-3 text-center w-full">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-4 flex-wrap">
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

          {/* --- PROMO SCROLL BAR - Cores brinqueTEAando --- */}
          <div className="w-full bg-[#3A8ECD] border-y-2 border-[#FB8A38] overflow-hidden py-3 relative z-20 shadow-lg">
            {/* Subtle Texture Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-10" style={{backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '15px 15px'}}></div>
            <div className="animate-marquee-christmas flex items-center">
              {/* Repetimos o conteúdo várias vezes para garantir o loop infinito em telas grandes */}
              {[...Array(12)].map((_, i) => (
                <div key={i} className="flex items-center mx-8 whitespace-nowrap">
                   <span className="text-2xl mr-3 filter drop-shadow-md">🎭</span>
                   <span className="text-[#FEFDF8] font-serif italic text-xl tracking-widest font-medium uppercase drop-shadow-md" style={{textShadow: '0 1px 2px rgba(0,0,0,0.5)'}}>
                     🧩 III Jornada Autismo Baixada Santista - 29/03 em Santos! 🎪 ExpoTEA 2025 em Novembro - SP!
                   </span>
                   <span className="text-2xl ml-3 filter drop-shadow-md">🎪</span>
                   
                   {/* Elegant Separator */}
                   <div className="ml-8 flex items-center gap-2 opacity-70">
                     <span className="text-[#FB8A38] text-xs">✦</span>
                     <span className="w-16 h-[1px] bg-[#FB8A38]"></span>
                     <span className="text-[#FB8A38] text-xs">✦</span>
                   </div>
                </div>
              ))}
            </div>
          </div>
          {/* --- END CHRISTMAS SCROLL BAR --- */}

          {/* Códigos de Cupons - Cores brinqueTEAando */}
          <div className="bg-gradient-to-r from-[#3A8ECD] via-[#FB8A38] to-[#82CBB7] py-12 px-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.1) 10px, rgba(255,255,255,.1) 20px)'}}></div>
            <div className="relative z-10 max-w-7xl mx-auto">
              <h2 className="text-white text-3xl md:text-4xl font-light mb-8 tracking-wide text-center">
                🎁 Cupons Especiais brinqueTEAando
                </h2>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 text-center shadow-lg">
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-[#3A8ECD] text-xl font-bold mb-2">PRIMEIRA COMPRA</h3>
                  <p className="text-gray-700 text-lg font-mono font-bold mb-2">BEMVINDO10</p>
                  <p className="text-gray-600 text-sm">10% OFF na primeira compra</p>
              </div>
                <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 text-center shadow-lg">
                  <div className="text-4xl mb-4">⭐</div>
                  <h3 className="text-[#FB8A38] text-xl font-bold mb-2">TEA</h3>
                  <p className="text-gray-700 text-lg font-mono font-bold mb-2">TEA15</p>
                  <p className="text-gray-600 text-sm">15% OFF garanta ja o seu</p>
            </div>
                <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 text-center shadow-lg">
                  <div className="text-4xl mb-4">🚚</div>
                  <h3 className="text-[#FBA25C] text-xl font-bold mb-2">TDAH AUTISMO</h3>
                  <p className="text-gray-700 text-lg font-mono font-bold mb-2">TEA20</p>
                  <p className="text-gray-600 text-sm">Aproveite esse Desconto Imperdivel</p>
                  </div>
                  </div>
              <p className="text-white/90 text-center text-sm">Use os códigos no checkout para aplicar os descontos</p>
            </div>
          </div>

          {/* Promo Ticker - Cor laranja brinqueTEAando */}
          <div className="bg-[#FB8A38] text-white py-3 overflow-hidden relative w-full">
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
                <span className="text-xl font-serif text-[#0A3D2F]">🎁 COMPRE COM CONFIANÇA:</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
                <div className="flex items-start justify-center md:justify-start gap-3">
                  <div>
                    <p className="text-[#0A3D2F] font-semibold mb-1"><span className="text-[#b87333]">Entrega</span> Garantida</p>
                    <p className="text-sm text-[#9d8b7c]">Envio rápido e seguro para todo o Brasil. <span className="underline cursor-pointer">Detalhes</span></p>
                  </div>
                </div>
                <div className="flex items-start justify-center gap-3">
                  <div>
                    <p className="text-[#0A3D2F] font-semibold mb-1"><span className="text-[#b87333]">Melhor</span> Preço Garantido</p>
                    <p className="text-sm text-[#9d8b7c]">Cobrimos ofertas da concorrência em 30 dias. <span className="underline cursor-pointer">Detalhes</span></p>
                  </div>
                </div>
                <div className="flex items-start justify-center md:justify-end gap-3">
                  <div>
                    <p className="text-[#0A3D2F] font-semibold mb-1"><span className="text-[#b87333]">Devolução</span> Fácil</p>
                    <p className="text-sm text-[#9d8b7c]">Devolução grátis até 31/01. <span className="underline cursor-pointer">Detalhes</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Navigation */}
          <nav className="bg-white shadow-sm sticky top-0 z-50 w-full">
            <div className="max-w-7xl mx-auto px-3 py-3 sm:px-6 sm:py-4">
              <div className="flex items-center justify-between gap-2 sm:gap-4">
                <Link to="/" className="flex items-center group flex-shrink-0" aria-label="brinqueTEAando Homepage">
                  <div className="flex items-center gap-1 font-bold text-xl sm:text-2xl md:text-3xl tracking-tight">
                    <span className="text-[#3A8ECD]">brinque</span>
                    <span className="bg-[#FB8A38] text-white px-1 sm:px-2 rounded-md">TEA</span>
                    <span className="text-[#FBA25C]">ando</span>
                  </div>
                </Link>

                {/* Desktop Menu */}
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

                {/* Mobile & Desktop Sign In */}
                <div className="flex items-center gap-1 sm:gap-2">
                  <Link to="/account" className="text-[#3A8ECD] hover:text-[#FB8A38] text-[10px] sm:text-xs font-medium whitespace-nowrap transition-colors px-1 sm:px-2">
                    Entrar
                  </Link>

                  {/* Mobile Menu Button */}
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

              {/* Mobile Menu */}
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

          <div className="bg-[#3A8ECD] text-white py-3 w-full">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <p className="text-sm font-medium tracking-wider">🎁 Frete grátis no Brasil • Garantia de 1 ano • Trocas fáceis 🎉</p>
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
                  <h1 className="text-white text-2xl sm:text-4xl md:text-6xl font-light tracking-widest mb-2 sm:mb-4">brinqueTEAndo - Brinquedos Educativos e Sensoriais</h1>
                  <p className="text-[#FB8A38] text-sm sm:text-lg md:text-xl tracking-wider mb-2 sm:mb-4">
                    Brinquedos Educativos e Sensoriais para TEA e TDAH
                  </p>
                  <Link to="/collections/all" className="inline-block border-2 border-[#FB8A38] bg-[#3A8ECD] text-white px-6 sm:px-10 py-2 sm:py-3 rounded-full hover:bg-[#FB8A38] hover:text-white hover:border-[#FB8A38] transition-all font-semibold tracking-wider w-fit mt-2 sm:mt-4 text-xs sm:text-base">
                    EXPLORAR PRODUTOS
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Men's/Women's Collection */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mb-20 w-full">
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              <div className="relative h-72 sm:h-80 md:h-96 overflow-hidden rounded-[10px] shadow-xl group">
                <img src="https://cdn.shopify.com/s/files/1/0778/2921/0327/files/men_s_collection_dc5c97d6-952f-43c1-9f24-8eadb0693f74.avif?v=1765592942" alt="Men's Luxury Watches USA, UK, Canada & Australia - Shop Online" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" width="800" height="600"/>
                <div className="absolute inset-0 bg-gradient-to-t from-[#b91c1c]/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-8 text-white">
                  <h2 className="text-2xl sm:text-3xl font-light mb-2 tracking-wide">MEN'S COLLECTION</h2>
                  <p className="text-[#D4AF69] mb-4 text-sm sm:text-base">Sophisticated timepieces for the modern gentleman</p>
                  <Link to="/collections/mens-watches" className="inline-block bg-white text-[#b91c1c] px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold hover:bg-[#D4AF69] hover:text-white transition-all text-sm sm:text-base">SHOP NOW</Link>
                </div>
              </div>
              <div className="relative h-72 sm:h-80 md:h-96 overflow-hidden rounded-[10px] shadow-xl group">
                <img src="https://cdn.shopify.com/s/files/1/0778/2921/0327/files/7.avif?v=1765596667" alt="Women's Luxury Watches USA, UK, Canada & Australia - Shop Online" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" width="800" height="600"/>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A3D2F]/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-8 text-white">
                  <h2 className="text-2xl sm:text-3xl font-light mb-2 tracking-wide">WOMEN'S COLLECTION</h2>
                  <p className="text-[#D4AF69] mb-4 text-sm sm:text-base">Elegant designs that capture timeless beauty</p>
                  <Link to="/collections/womens-watches" className="inline-block bg-white text-[#0A3D2F] px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold hover:bg-[#D4AF69] hover:text-white transition-all text-sm sm:text-base">SHOP NOW</Link>
                </div>
              </div>
            </div>
          </section>

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
                        <h3 className="text-white text-base sm:text-xl font-bold tracking-wider">brinqueTEAando REWARDS</h3>
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
                  <div className="inline-block bg-[#D4AF69] text-[#0A3D2F] px-4 py-1 rounded-full text-xs font-bold mb-4 w-fit">Até 25% OFF</div>
                  <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-light mb-4 sm:mb-6 tracking-wide">Ganhe <span className="text-[#D4AF69] font-semibold">25% OFF</span></h2>
                  <p className="text-gray-300 text-lg sm:text-xl mb-4 sm:mb-6">em brinquedos sensoriais e educativos para TEA e TDAH</p>
                  <div className="bg-[#D4AF69] text-[#0A3D2F] px-4 sm:px-6 py-3 rounded-lg inline-block mb-4 sm:mb-6 w-fit">
                    <p className="text-xs sm:text-sm mb-1 font-semibold">Use code:</p>
                    <p className="text-2xl sm:text-3xl font-bold tracking-wider">TEA25</p>
                  </div>
                  <p className="text-gray-400 text-sm mb-4 sm:mb-6">Ao entrar no brinqueTEAndo Rewards. Desconto aplicado no checkout.</p>
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
                        <img src={testimonial.image} alt={`${testimonial.name} - Cliente brinqueTEAando feliz`} className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-[#D4AF69]" width="64" height="64"/>
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
          
          {/* SEÇÃO DE ENVIO - Focada em TEA e Baixada Santista */}
          <section className="bg-gradient-to-b from-white to-[#FEFDF8] py-16 sm:py-20 mb-20 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
              <h2 className="text-[#3A8ECD] text-2xl sm:text-3xl md:text-4xl font-light text-center mb-4 tracking-wide">
                Brinquedos Educativos Entregues em Todo o Brasil
              </h2>
              <p className="text-gray-600 text-center mb-12 text-sm sm:text-base mx-auto max-w-3xl">
                Especializados em desenvolvimento sensorial e cognitivo para crianças com TEA e TDAH. Entregamos com carinho e cuidado em todo o território nacional.
              </p>
              
              {/* DESTAQUE: Baixada Santista - FRETE GRÁTIS */}
              <div className="mb-12">
                <div className="bg-gradient-to-r from-[#3A8ECD] via-[#FB8A38] to-[#FBA25C] rounded-xl p-8 shadow-xl border-4 border-[#FB8A38] relative overflow-hidden">
                  <div className="absolute top-0 right-0 text-8xl opacity-10">🎁</div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <span className="text-5xl">🏖️</span>
                      <div className="text-center">
                        <div className="inline-block bg-white/90 text-[#FB8A38] px-4 py-1 rounded-full text-xs font-bold mb-2 uppercase tracking-wider">
                          FRETE 100% GRÁTIS
                        </div>
                        <h3 className="text-white text-2xl sm:text-3xl font-bold mb-2">Baixada Santista</h3>
                      </div>
                      <span className="text-5xl">🌊</span>
                    </div>
                    <p className="text-white text-center text-lg mb-4 font-medium">
                      Para as famílias da região, oferecemos <span className="font-bold text-xl">FRETE GRÁTIS</span> em todos os pedidos!
                    </p>
                    <div className="bg-white/95 rounded-lg p-4 mt-4">
                      <p className="text-[#3A8ECD] font-semibold text-center mb-3 text-sm uppercase tracking-wide">
                        Cidades Atendidas:
                      </p>
                      <div className="flex flex-wrap justify-center gap-3">
                        {['Santos', 'São Vicente', 'Praia Grande', 'Mongaguá'].map((city, idx) => (
                          <span key={idx} className="bg-[#3A8ECD] text-white px-4 py-2 rounded-full text-sm font-medium">
                            {city}
                          </span>
                        ))}
                </div>
                      <p className="text-gray-700 text-sm text-center mt-4">
                        Brinquedos selecionados para estimulação sensorial, desenvolvimento da comunicação e habilidades sociais de crianças neurodivergentes.
                  </p>
                </div>
                  </div>
                </div>
              </div>

              {/* Outras Regiões do Brasil */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow border-l-4 border-[#3A8ECD]">
                  <div className="text-4xl mb-4 text-center">🏙️</div>
                  <h3 className="text-xl font-semibold text-[#3A8ECD] mb-3 text-center">Grande São Paulo</h3>
                  <p className="text-gray-600 text-sm leading-relaxed text-center">
                    Envio rápido para famílias da capital e região metropolitana. Brinquedos terapêuticos para desenvolvimento de habilidades em crianças com Autismo e TDAH.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow border-l-4 border-[#FB8A38]">
                  <div className="text-4xl mb-4 text-center">🌆</div>
                  <h3 className="text-xl font-semibold text-[#FB8A38] mb-3 text-center">Todo o Brasil</h3>
                  <p className="text-gray-600 text-sm leading-relaxed text-center mb-3">
                    Atendemos todas as regiões com produtos educativos e sensoriais. Frete grátis para Baixada Santista. Especializados em brinquedos para TEA.
                  </p>
                  <div className="bg-gradient-to-r from-[#3A8ECD] to-[#FBA25C] rounded-lg p-3 mt-4">
                    <p className="text-white text-center text-sm font-medium">
                      Conhece seu filho melhor do que ninguém? 💙 Então escolha brinquedos que conversam com o mundo dele. 🧩
                    </p>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow border-l-4 border-[#FBA25C] sm:col-span-2 lg:col-span-1">
                  <div className="text-4xl mb-4 text-center">💙</div>
                  <h3 className="text-xl font-semibold text-[#FBA25C] mb-3 text-center">Curadoria Especializada</h3>
                  <p className="text-gray-600 text-sm leading-relaxed text-center">
                    Todos os produtos são selecionados por especialistas em desenvolvimento infantil, pensados especialmente para crianças neurodivergentes.
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
                  <Link key={p.id} to={`/products/${p.handle}`} className="group">
                    <div className="relative aspect-square mb-3 sm:mb-4 overflow-hidden rounded-[10px] bg-[#FEFDF8] shadow-md sm:shadow-lg group-hover:shadow-xl transition-shadow">
                      {p.featuredImage && (
                        <Image 
                          data={p.featuredImage} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                          aspectRatio="1/1"
                          alt={p.featuredImage.altText || `${p.title} - Luxury Watch USA UK Canada Australia`}
                        />
                      )}
                    </div>
                    <div className="text-center px-2">
                      <p className="text-[#D4AF69] text-xs tracking-widest mb-1 uppercase font-semibold line-clamp-1">{p.vendor || 'brinqueTEAando'}</p>
                      <h3 className="text-[#0A3D2F] font-light mb-2 hover:text-[#1a5757] transition-colors text-xs sm:text-sm line-clamp-2">{p.title}</h3>
                      <Money data={p.priceRange.minVariantPrice} className="text-[#2a2a2a] font-medium text-xs sm:text-sm"/>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </div>
        <ProductFooter />
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
  fragment MenuItem on MenuItem {
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
        ...MenuItem
      }
    }
  }
`;

