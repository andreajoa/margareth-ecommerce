import {useLoaderData, Link} from 'react-router';
import {useState, useEffect} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import {getProductHandle} from '~/lib/utils';



export const meta = () => {
  return [
    // PRIMARY META TAGS
    {title: 'BrinqueTEAndo | Loja TEA, TDAH e Autismo | Brincar com propósito'},
    {name: 'description', content: 'Brinquedos e recursos para TEA, TDAH e autismo. Curadoria terapêutica, acolhimento e frete grátis para São Vicente, Santos e Praia Grande.'},
    
    // --- VERIFICAÇÕES IMPORTADAS DO THEME.LIQUID ---
    // Facebook Domain Verification (Essencial para Anúncios)
    {name: 'facebook-domain-verification', content: 'qbk5t5o0agiy90kflze09te3423xgt'},
    
    // GEO-TARGETING META TAGS
    {name: 'geo.region', content: 'BR'},
    {name: 'geo.placename', content: 'São Vicente;Santos;Praia Grande;Brasil'},
    
    // ENHANCED KEYWORDS (Location-based & Long-tail)
    {name: 'keywords', content: 'brinquedos sensoriais, TEA, TDAH, autismo, brinquedos terapêuticos, coordenação motora, comunicação alternativa, brinquedos para foco, rotina visual, brinquedos inclusivos, neurodiversidade, brinqueteando'},
    
    // LANGUAGE TARGETING
    {httpEquiv: 'content-language', content: 'pt-BR'},
    
    // ENHANCED OPEN GRAPH TAGS
    {property: 'og:title', content: 'BrinqueTEAndo | Loja TEA, TDAH e Autismo'},
    {property: 'og:description', content: 'Brinquedos sensoriais e recursos terapêuticos. Frete grátis para São Vicente, Santos e Praia Grande.'},
    {property: 'og:type', content: 'website'},
    {property: 'og:url', content: 'https://brinqueteando.online'},
    {property: 'og:image', content: 'https://cdn.shopify.com/s/files/1/0778/2921/0327/files/5.avif?v=1765596668'},
    {property: 'og:image:width', content: '1200'},
    {property: 'og:image:height', content: '630'},
    {property: 'og:site_name', content: 'BrinqueTEAndo'},
    {property: 'og:locale', content: 'pt_BR'},
    
    // TWITTER CARDS
    {name: 'twitter:card', content: 'summary_large_image'},
    {name: 'twitter:title', content: ''},
    {name: 'twitter:description', content: 'Loja TEA, TDAH e autismo. Frete grátis para São Vicente, Santos e Praia Grande.'},
    {name: 'twitter:image', content: 'https://cdn.shopify.com/s/files/1/0778/2921/0327/files/5.avif?v=1765596668'},
    
    // ENHANCED ROBOTS & INDEXING
    {name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'},
    {name: 'googlebot', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'},
    
    // MOBILE OPTIMIZATION
    {name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=5'},
    {name: 'mobile-web-app-capable', content: 'yes'},
    {name: 'apple-mobile-web-app-capable', content: 'yes'},
    
    // THEME COLOR
    {name: 'theme-color', content: '#1B998B'},
    
    // CANONICAL URL
    {tagName: 'link', rel: 'canonical', href: 'https://brinqueteando.online'},
    
    // HREFLANG FOR GEO-TARGETING
    {tagName: 'link', rel: 'alternate', hreflang: 'pt-br', href: 'https://brinqueteando.online'},
    {tagName: 'link', rel: 'alternate', hreflang: 'x-default', href: 'https://brinqueteando.online'},
    
    // PRECONNECT & DNS-PREFETCH
    {tagName: 'link', rel: 'preconnect', href: 'https://cdn.shopify.com'},
    {tagName: 'link', rel: 'dns-prefetch', href: 'https://cdn.shopify.com'},
    
    // PRELOAD CRITICAL RESOURCES
    // ✅ FIX: Preload LCP Image (Hero Poster) with high priority
    {tagName: 'link', rel: 'preload', as: 'image', href: 'https://cdn.shopify.com/s/files/1/0778/2921/0327/files/5.avif?v=1765596668', attributes: {fetchpriority: 'high'}},
    {tagName: 'link', rel: 'preload', as: 'video', href: 'https://cdn.shopify.com/videos/c/o/v/288d4004873043ffb9ba58d24ba5a38c.mp4'},
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

const quizOptions = [
  {id: 'sensorial', label: 'Autorregulação sensorial', description: 'Texturas, luzes, pressão e estímulos seguros', query: 'sensorial autismo'},
  {id: 'foco', label: 'Foco e atenção', description: 'Jogos para concentração, memória e planejamento', query: 'foco tdah atenção'},
  {id: 'comunicacao', label: 'Comunicação e linguagem', description: 'CAA, imagens e jogos de expressão', query: 'comunicação alternativa'},
  {id: 'rotina', label: 'Rotina e autonomia', description: 'Organização, previsibilidade e independência', query: 'rotina visual autonomia'},
  {id: 'motora', label: 'Coordenação motora', description: 'Motricidade fina e ampla com brincadeiras guiadas', query: 'coordenação motora'},
  {id: 'social', label: 'Habilidades sociais', description: 'Turnos, empatia e interação', query: 'habilidades sociais autismo'}
];

const marqueeSlots = Array.from({length: 12}, (_, i) => ({id: `marquee-${i}`}));

export default function Homepage() {
  const {products, under100Products, footerMenu} = useLoaderData();
  const [currentPromo, setCurrentPromo] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [timeLeft, setTimeLeft] = useState({days: 0, hours: 0, minutes: 0, seconds: 0});
  const [currentHoliday, setCurrentHoliday] = useState({name: 'Holiday', emoji: '🎉', message: 'COUNTDOWN'});
  const [chatOpen, setChatOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizResult, setQuizResult] = useState(null);
  const promoMessages = [
    "🧩 Frete grátis para São Vicente, Santos e Praia Grande",
    "⭐ Clube BrinqueTEAndo: benefícios para famílias neurodiversas",
    "🎁 Cupom TEA15: 15% OFF em itens sensoriais e de foco",
    "🤝 Atendimento especializado em TEA, TDAH e autismo",
    "🦕 Coleções por finalidade: sensorial, foco, comunicação e rotina",
    "🧠 Indicações personalizadas após o quiz de perfil"
  ];
  const testimonials = [
    {name: "Marina P.", text: "O quiz acertou em cheio. Meu filho amou os brinquedos sensoriais e ficou mais regulado.", rating: 5, image: "https://cdn.shopify.com/s/files/1/0778/2921/0327/files/1.jpg?v=1765938975"},
    {name: "Rafael S.", text: "Atendimento acolhedor e indicação certeira para foco e atenção. Chegou rápido em Santos.", rating: 5, image: "https://cdn.shopify.com/s/files/1/0778/2921/0327/files/2.jpg?v=1765938975"},
    {name: "Camila T.", text: "Produtos de comunicação visual muito bem pensados. Minha filha se engajou mais.", rating: 5, image: "https://cdn.shopify.com/s/files/1/0778/2921/0327/files/4.jpg?v=1765938975"},
    {name: "Eduardo K.", text: "Equipe especialista em TEA e TDAH. Experiência profissional e carinhosa.", rating: 5, image: "https://cdn.shopify.com/s/files/1/0778/2921/0327/files/3.jpg?v=1765938975"}
  ];

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
      "name": "BrinqueTEAndo",
      "url": "https://brinqueteando.online",
      "logo": "https://cdn.shopify.com/s/files/1/0778/2921/0327/files/5.avif?v=1765596668",
      "description": "Loja especializada em brinquedos e recursos terapêuticos para TEA, TDAH e autismo. Curadoria sensorial, foco, comunicação e autonomia.",
      "foundingDate": "2026",
      "areaServed": [
        {"@type": "Country", "name": "Brasil"},
        {"@type": "City", "name": "São Vicente"},
        {"@type": "City", "name": "Santos"},
        {"@type": "City", "name": "Praia Grande"}
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+55-13-0000-0000",
        "contactType": "Atendimento especializado",
        "areaServed": ["BR"],
        "availableLanguage": ["Português"]
      },
      "sameAs": [
        "https://www.instagram.com/neuromargarethapoio/",
        "https://www.tiktok.com/@neuromargarethapoio",
        "https://www.youtube.com/@adhdautismhelp",
  
      ]
    },
    // WebSite Schema with Search Action
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "BrinqueTEAndo",
      "url": "https://brinqueteando.online",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://brinqueteando.online/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    // Store/LocalBusiness Schema
    {
      "@context": "https://schema.org",
      "@type": "Store",
      "name": "BrinqueTEAndo - Loja TEA, TDAH e Autismo",
      "image": "https://cdn.shopify.com/s/files/1/0778/2921/0327/files/5.avif?v=1765596668",
      "url": "https://brinqueteando.online",
      "priceRange": "R$",
      "currenciesAccepted": "BRL",
      "paymentAccepted": "Cartão de Crédito, Pix, Boleto, Carteiras digitais",
      "areaServed": [
        {"@type": "Country", "name": "BR"}
      ]
    },
    // Product Collection Schema
    {
      "@context": "https://schema.org",
      "@type": "OfferCatalog",
      "name": "Coleções BrinqueTEAndo",
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
                "description": "Texturas, luzes e estímulos seguros para autorregulação",
                "offers": {
                  "@type": "AggregateOffer",
                  "priceCurrency": "BRL",
                  "lowPrice": "29",
                  "highPrice": "399",
                  "availability": "https://schema.org/InStock"
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.9",
                  "bestRating": "5",
                  "worstRating": "1",
                  "ratingCount": "1248"
                }
              }
            }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "Foco e Atenção",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "Foco e Atenção",
                "description": "Jogos e recursos para atenção, memória e planejamento",
                "offers": {
                  "@type": "AggregateOffer",
                  "priceCurrency": "BRL",
                  "lowPrice": "39",
                  "highPrice": "449",
                  "availability": "https://schema.org/InStock"
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.9",
                  "bestRating": "5",
                  "worstRating": "1",
                  "ratingCount": "1248"
                }
              }
            }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "Comunicação e Linguagem",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "Comunicação e Linguagem",
                "description": "Recursos visuais, CAA e jogos de expressão",
                "offers": {
                  "@type": "AggregateOffer",
                  "priceCurrency": "BRL",
                  "lowPrice": "29",
                  "highPrice": "399",
                  "availability": "https://schema.org/InStock"
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.9",
                  "bestRating": "5",
                  "worstRating": "1",
                  "ratingCount": "1248"
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
          "name": "Início",
          "item": "https://brinqueteando.online"
        }
      ]
    },
    // Aggregate Rating Schema
    {
      "@context": "https://schema.org",
      "@type": "AggregateRating",
      "itemReviewed": {
        "@type": "Organization",
        "name": "BrinqueTEAndo"
      },
      "ratingValue": "4.9",
      "bestRating": "5",
      "ratingCount": "1248"
    },
    // FAQ Schema
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Vocês entregam para São Vicente, Santos e Praia Grande?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim! Oferecemos frete grátis para São Vicente, Santos e Praia Grande em compras elegíveis."
          }
        },
        {
          "@type": "Question",
          "name": "A loja é especializada em TEA, TDAH e autismo?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim. Nossa curadoria é pensada para necessidades sensoriais, foco, comunicação e rotina, com orientação especializada."
          }
        }
      ]
    }
  ];


  // ✅ CORRIGIDO: Lógica do Countdown Automático
  const calculateHolidayCountdown = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const holidays = [
      {name: 'Dia Mundial de Conscientização do Autismo', month: 3, day: 2, emoji: '🧩', message: 'CONTAGEM PARA O DIA MUNDIAL DO AUTISMO'},
      {name: 'Dia do Orgulho Autista', month: 5, day: 18, emoji: '🌈', message: 'CONTAGEM PARA O DIA DO ORGULHO AUTISTA'},
      {name: 'Dia do TDAH', month: 6, day: 13, emoji: '⚡', message: 'CONTAGEM PARA O DIA DO TDAH'},
      {name: 'Dia Internacional do TDAH', month: 9, day: 13, emoji: '🎯', message: 'CONTAGEM PARA O DIA INTERNACIONAL DO TDAH'},
      {name: 'Mês da Conscientização do Autismo', month: 3, day: 1, emoji: '💙', message: 'ABRIL AZUL: CONSCIENTIZAÇÃO DO AUTISMO'}
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


  const handleQuizSelect = (option) => {
    const result = {
      id: option.id,
      label: option.label,
      link: `/search?q=${encodeURIComponent(option.query)}`
    };
    localStorage.setItem('brinqueteando-quiz-completed', 'true');
    localStorage.setItem('brinqueteando-quiz-result', JSON.stringify(result));
    setQuizCompleted(true);
    setQuizResult(result);
    setQuizOpen(false);
  };

  const handleQuizReset = () => {
    localStorage.removeItem('brinqueteando-quiz-completed');
    localStorage.removeItem('brinqueteando-quiz-result');
    setQuizCompleted(false);
    setQuizResult(null);
    setQuizOpen(true);
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
  }, [promoMessages.length]);

  useEffect(() => {
    const testimonialTimer = setInterval(() => setCurrentTestimonial((p) => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(testimonialTimer);
  }, [testimonials.length]);

  useEffect(() => {
    const existingId = localStorage.getItem('brinqueteando-visit-id');
    if (!existingId) {
      const newId = globalThis.crypto?.randomUUID?.() || `visit-${Date.now()}`;
      localStorage.setItem('brinqueteando-visit-id', newId);
      localStorage.setItem('brinqueteando-first-visit', new Date().toISOString());
    }
    const completed = localStorage.getItem('brinqueteando-quiz-completed') === 'true';
    const storedResult = localStorage.getItem('brinqueteando-quiz-result');
    setQuizCompleted(completed);
    setQuizResult(storedResult ? JSON.parse(storedResult) : null);
    if (!completed) {
      setQuizOpen(true);
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
        .tea-bg {
          background: linear-gradient(180deg, #F8FBFF 0%, #F1F7FF 45%, #FFF7ED 100%);
          position: relative;
        }
        .floating-icons {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 0;
        }
        .floating-icon {
          position: absolute;
          opacity: 0.18;
          font-size: 48px;
          animation: float-slow 18s ease-in-out infinite;
        }
        .floating-icon.fast {
          animation: float-fast 12s ease-in-out infinite;
          opacity: 0.22;
        }
        @keyframes float-slow {
          0% { transform: translateY(0) translateX(0) rotate(0deg); }
          50% { transform: translateY(-20px) translateX(12px) rotate(8deg); }
          100% { transform: translateY(0) translateX(0) rotate(0deg); }
        }
        @keyframes float-fast {
          0% { transform: translateY(0) translateX(0) rotate(0deg); }
          50% { transform: translateY(-28px) translateX(-14px) rotate(-8deg); }
          100% { transform: translateY(0) translateX(0) rotate(0deg); }
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

      <main role="main" aria-label="BrinqueTEAndo - Loja TEA, TDAH e Autismo" className="tea-bg flex flex-col min-h-screen w-full overflow-x-hidden">
        <div className="floating-icons">
          <span className="floating-icon" style={{top: '8%', left: '6%'}}>🦖</span>
          <span className="floating-icon fast" style={{top: '18%', right: '10%'}}>🧩</span>
          <span className="floating-icon" style={{top: '52%', left: '12%'}}>🦕</span>
          <span className="floating-icon fast" style={{top: '64%', right: '8%'}}>🧩</span>
          <span className="floating-icon" style={{top: '78%', left: '50%'}}>🦖</span>
        </div>
        <div className="flex-grow w-full relative z-10">
          {/* Top Bar with Countdown */}
          <div className="bg-[#1B998B] text-white py-3 text-center w-full">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-4 flex-wrap">
              <span className="text-sm md:text-base font-bold tracking-wide">
                {currentHoliday?.emoji} {currentHoliday?.message} {currentHoliday?.emoji}
              </span>
              <div className="flex items-center gap-2 border-2 border-white px-4 py-1 bg-white/10 rounded-full">
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
          <div className="w-full bg-[#7C3AED] border-y-2 border-[#A5B4FC] overflow-hidden py-3 relative z-20 shadow-lg">
            {/* Subtle Texture Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-10" style={{backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '15px 15px'}}></div>
            <div className="animate-marquee-christmas flex items-center">
              {/* Repetimos o conteúdo várias vezes para garantir o loop infinito em telas grandes */}
              {marqueeSlots.map((slot) => (
                <div key={slot.id} className="flex items-center mx-8 whitespace-nowrap">
                   <span className="text-2xl mr-3 filter drop-shadow-md">🧩</span>
                   <span className="text-[#FEFDF8] font-serif italic text-xl tracking-widest font-medium uppercase drop-shadow-md" style={{textShadow: '0 1px 2px rgba(0,0,0,0.5)'}}>
                     BrinqueTEAndo • Brinquedos inclusivos para TEA, TDAH e Autismo
                   </span>
                   <span className="text-2xl ml-3 filter drop-shadow-md">🦕</span>
                   
                   {/* Elegant Separator */}
                   <div className="ml-8 flex items-center gap-2 opacity-70">
                     <span className="text-[#A5B4FC] text-xs">✦</span>
                     <span className="w-16 h-[1px] bg-[#A5B4FC]"></span>
                     <span className="text-[#A5B4FC] text-xs">✦</span>
                   </div>
                </div>
              ))}
            </div>
          </div>
          {/* --- END CHRISTMAS SCROLL BAR --- */}

          {/* Intro Section */}
          <div className="grid md:grid-cols-2 gap-0 w-full">
            <div className="bg-gradient-to-r from-[#FBBF24] via-[#FDE68A] to-[#FBBF24] py-8 px-6 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.1) 10px, rgba(255,255,255,.1) 20px)'}}></div>
              <div className="relative z-10 max-w-4xl mx-auto">
                <h2 className="text-[#1B998B] text-3xl md:text-4xl font-light mb-6 tracking-wide text-center">
                  🦕 Brincar com propósito <span className="text-[#7C3AED] font-serif italic text-5xl">&</span> crescer com autonomia
                </h2>
                <p className="text-[#1B998B] text-lg font-semibold mb-4 text-center">
                  🎯 Cupom: <span className="text-white bg-[#7C3AED] px-4 py-1 rounded-md font-bold">TEA15</span> 15% OFF em sensoriais e foco
                </p>
                <p className="text-sm text-[#2a2a2a] text-center">Frete grátis para São Vicente, Santos e Praia Grande em compras elegíveis.</p>
              </div>
            </div>

            {/* Benefits Bar */}
            <div className="bg-white border-l-2 border-[#A5B4FC] py-8 px-4 sm:px-6">
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-center">
                  <div className="w-full sm:w-auto">
                    <h3 className="text-3xl sm:text-4xl font-bold text-[#1B998B] mb-1 whitespace-nowrap">Acolhimento</h3>
                    <p className="text-xs sm:text-sm text-[#64748B]">Curadoria sensorial e afetiva</p>
                  </div>
                  <span className="text-4xl sm:text-5xl text-[#7C3AED] font-serif italic self-center">&</span>
                  <div className="w-full sm:w-auto">
                    <h3 className="text-3xl sm:text-4xl font-bold text-[#1B998B] mb-1 whitespace-nowrap">Especialistas</h3>
                    <p className="text-xs sm:text-sm text-[#64748B]">TEA, TDAH e autismo</p>
                  </div>
                  <span className="text-xl sm:text-2xl text-[#64748B] font-medium self-center">com</span>
                  <div className="w-full sm:w-auto">
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#1B998B] mb-1 whitespace-nowrap">Frete Local</h3>
                    <p className="text-xs sm:text-sm text-[#64748B]">São Vicente, Santos e Praia Grande</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Promo Ticker */}
          <div className="bg-[#7C3AED] text-white py-3 overflow-hidden relative w-full">
            <div className="max-w-7xl mx-auto px-6">
              <div className="relative h-6 flex items-center justify-center">
                {promoMessages.map((msg, idx) => (
                  <div key={msg} className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${idx === currentPromo ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}>
                    <p className="text-sm md:text-base font-semibold tracking-wide text-center px-4">{msg}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="bg-[#F1F5F9] border-b border-[#A5B4FC] w-full">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="text-xl font-serif text-[#1B998B]">🧩 COMPRE COM CONFIANÇA:</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
                <div className="flex items-start justify-center md:justify-start gap-3">
                  <div>
                    <p className="text-[#1B998B] font-semibold mb-1"><span className="text-[#F97316]">Envio</span> rápido na Baixada Santista</p>
                    <p className="text-[#64748B] text-sm">🚚 Frete grátis para São Vicente, Santos e Praia Grande.</p>
                  </div>
                </div>
                <div className="flex items-start justify-center gap-3">
                  <div>
                    <p className="text-[#1B998B] font-semibold mb-1"><span className="text-[#F97316]">Curadoria</span> terapêutica</p>
                    <p className="text-[#64748B] text-sm">Brinquedos por finalidade para TEA e TDAH.</p>
                  </div>
                </div>
                <div className="flex items-start justify-center md:justify-end gap-3">
                  <div>
                    <p className="text-[#1B998B] font-semibold mb-1"><span className="text-[#F97316]">Atendimento</span> acolhedor</p>
                    <p className="text-[#64748B] text-sm">Equipe especialista em neurodiversidade.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Navigation */}
          <nav className="bg-white/95 backdrop-blur border-y border-[#E2E8F0] w-full">
            <div className="max-w-7xl mx-auto px-6 py-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#7C3AED]">Mega Menu TEA & TDAH</p>
                  <h3 className="text-2xl font-semibold text-[#1B998B]">Encontre brinquedos por finalidade</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => setQuizOpen(true)} className="px-5 py-2 rounded-full bg-[#7C3AED] text-white text-sm font-semibold hover:bg-[#6D28D9] transition-colors">Fazer quiz rápido</button>
                  <Link to="/collections/all" className="px-5 py-2 rounded-full border border-[#1B998B] text-[#1B998B] text-sm font-semibold hover:bg-[#1B998B] hover:text-white transition-colors">Ver todos os brinquedos</Link>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-[#E2E8F0]">
                  <h4 className="text-[#1B998B] font-semibold mb-3">Sensorial e Calma</h4>
                  <ul className="space-y-2 text-sm text-[#475569]">
                    <li><Link to="/search?q=brinquedo%20sensorial" className="hover:text-[#7C3AED]">Texturas e tato</Link></li>
                    <li><Link to="/search?q=brinquedo%20calmante" className="hover:text-[#7C3AED]">Calmantes e relaxamento</Link></li>
                    <li><Link to="/search?q=luz%20sensorial" className="hover:text-[#7C3AED]">Luzes e estímulos visuais</Link></li>
                    <li><Link to="/search?q=pressao%20profunda" className="hover:text-[#7C3AED]">Pressão profunda</Link></li>
                  </ul>
                </div>
                <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-[#E2E8F0]">
                  <h4 className="text-[#1B998B] font-semibold mb-3">Foco e Atenção</h4>
                  <ul className="space-y-2 text-sm text-[#475569]">
                    <li><Link to="/search?q=jogos%20de%20concentracao" className="hover:text-[#7C3AED]">Jogos de concentração</Link></li>
                    <li><Link to="/search?q=memoria%20visual" className="hover:text-[#7C3AED]">Memória e planejamento</Link></li>
                    <li><Link to="/search?q=organizacao%20tdah" className="hover:text-[#7C3AED]">Organização para TDAH</Link></li>
                    <li><Link to="/search?q=tempo%20e%20rotina" className="hover:text-[#7C3AED]">Tempo e rotina</Link></li>
                  </ul>
                </div>
                <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-[#E2E8F0]">
                  <h4 className="text-[#1B998B] font-semibold mb-3">Comunicação</h4>
                  <ul className="space-y-2 text-sm text-[#475569]">
                    <li><Link to="/search?q=CAA" className="hover:text-[#7C3AED]">CAA e comunicação alternativa</Link></li>
                    <li><Link to="/search?q=cartoes%20visuais" className="hover:text-[#7C3AED]">Cartões visuais</Link></li>
                    <li><Link to="/search?q=linguagem%20expressiva" className="hover:text-[#7C3AED]">Linguagem expressiva</Link></li>
                    <li><Link to="/search?q=emocional%20e%20sentimentos" className="hover:text-[#7C3AED]">Emoções e sentimentos</Link></li>
                  </ul>
                </div>
                <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-[#E2E8F0]">
                  <h4 className="text-[#1B998B] font-semibold mb-3">Autonomia e Social</h4>
                  <ul className="space-y-2 text-sm text-[#475569]">
                    <li><Link to="/search?q=habilidades%20sociais" className="hover:text-[#7C3AED]">Habilidades sociais</Link></li>
                    <li><Link to="/search?q=motricidade%20fina" className="hover:text-[#7C3AED]">Motricidade fina</Link></li>
                    <li><Link to="/search?q=autonomia%20diaria" className="hover:text-[#7C3AED]">Autonomia diária</Link></li>
                    <li><Link to="/search?q=brinquedos%20cooperativos" className="hover:text-[#7C3AED]">Brincadeiras cooperativas</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
          <div className="bg-[#1B998B] text-white py-3 w-full">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <p className="text-sm font-medium tracking-wider">🧩 FRETE GRÁTIS PARA SÃO VICENTE, SANTOS E PRAIA GRANDE • ATENDIMENTO ESPECIALIZADO • CURADORIA TEA & TDAH</p>
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
                  preload="auto"
                  className="absolute inset-0 w-full h-full object-cover"
                  poster="https://cdn.shopify.com/s/files/1/0778/2921/0327/files/5.avif?v=1765596668"
                >
                  <source src="https://cdn.shopify.com/videos/c/o/v/288d4004873043ffb9ba58d24ba5a38c.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/70 via-[#0F172A]/40 to-transparent z-10"></div>
                <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 sm:px-8 md:px-16">
                  <div className="mb-4 w-28 sm:w-36 md:w-44">
                    <img
                      src="https://cdn.shopify.com/s/files/1/0778/2921/0327/files/5.avif?v=1765596668"
                      alt="BrinqueTEAndo"
                      className="w-full h-auto drop-shadow-lg"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <p className="text-white/80 text-xs sm:text-sm uppercase tracking-[0.4em] mb-3">BrinqueTEAndo</p>
                  <h1 className="text-white text-2xl sm:text-4xl md:text-6xl font-light tracking-widest mb-2 sm:mb-4">
                    Brinquedos para TEA, TDAH e autismo
                  </h1>
                  <p className="text-[#FCD34D] text-sm sm:text-lg md:text-xl tracking-wider mb-4 sm:mb-6">
                    Curadoria terapêutica por finalidade, com acolhimento e diversão.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link to="/collections/all" className="inline-block border-2 border-[#FCD34D] bg-[#1B998B] text-white px-6 sm:px-10 py-2 sm:py-3 rounded-full hover:bg-[#FCD34D] hover:text-[#1B998B] hover:border-[#1B998B] transition-all font-semibold tracking-wider w-fit text-xs sm:text-base">
                      Ver coleções
                    </Link>
                    <button onClick={() => setQuizOpen(true)} className="inline-block border-2 border-white/70 text-white px-6 sm:px-10 py-2 sm:py-3 rounded-full hover:bg-white hover:text-[#1B998B] transition-all font-semibold tracking-wider w-fit text-xs sm:text-base">
                      Fazer quiz rápido
                    </button>
                  </div>
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
                  alt="Brinquedos sensoriais e autorregulação para TEA e TDAH" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" 
                  width="800" 
                  height="600"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B998B]/85 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-8 text-white">
                  <h2 className="text-2xl sm:text-3xl font-light mb-2 tracking-wide">Sensorial e Calma</h2>
                  <p className="text-[#FDE68A] mb-4 text-sm sm:text-base">Texturas, luzes e autorregulação com segurança</p>
                  <Link to="/search?q=brinquedos%20sensoriais" className="inline-block bg-white text-[#1B998B] px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold hover:bg-[#FDE68A] hover:text-[#1B998B] transition-all text-sm sm:text-base">Explorar</Link>
                </div>
              </div>
              <div className="relative h-72 sm:h-80 md:h-96 overflow-hidden rounded-[10px] shadow-xl group">
                <img 
                  src="https://cdn.shopify.com/s/files/1/0778/2921/0327/files/7.avif?v=1765596667" 
                  alt="Brinquedos para foco, atenção e planejamento em TDAH" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" 
                  width="800" 
                  height="600"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#7C3AED]/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-8 text-white">
                  <h2 className="text-2xl sm:text-3xl font-light mb-2 tracking-wide">Foco e Atenção</h2>
                  <p className="text-[#FDE68A] mb-4 text-sm sm:text-base">Jogos de memória, organização e autocontrole</p>
                  <Link to="/search?q=foco%20tdah" className="inline-block bg-white text-[#7C3AED] px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold hover:bg-[#FDE68A] hover:text-[#7C3AED] transition-all text-sm sm:text-base">Explorar</Link>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white py-12 sm:py-16 mb-20 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-[#1B998B] text-2xl sm:text-3xl md:text-4xl font-light tracking-wide">Queridinhos até R$ 100</h2>
                  <p className="text-[#64748B] text-sm sm:text-base">Seleção acessível para estímulo sensorial, foco e autonomia</p>
                </div>
                <Link to="/search?q=pre%C3%A7o%3A%3C100" className="text-[#7C3AED] text-sm font-semibold hover:text-[#6D28D9]">Ver todos →</Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {under100Products.map((p) => (
                  <Link key={p.id} to={`/products/${getProductHandle(p.handle)}`} className="group">
                    <div className="relative aspect-square mb-3 sm:mb-4 overflow-hidden rounded-[10px] bg-[#F8FAFC] shadow-md sm:shadow-lg group-hover:shadow-xl transition-shadow">
                      {p.featuredImage && (
                        <Image 
                          data={p.featuredImage} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                          aspectRatio="1/1"
                          alt={p.featuredImage.altText || `${p.title} - BrinqueTEAndo`}
                          loading="lazy"
                        />
                      )}
                    </div>
                    <div className="text-center px-2">
                      <p className="text-[#7C3AED] text-xs tracking-widest mb-1 uppercase font-semibold line-clamp-1">{p.vendor || 'BrinqueTEAndo'}</p>
                      <h3 className="text-[#0F172A] font-light mb-2 hover:text-[#1B998B] transition-colors text-xs sm:text-sm line-clamp-2">{p.title}</h3>
                      <Money data={p.priceRange.minVariantPrice} className="text-[#334155] font-medium text-xs sm:text-sm"/>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Gift Budget Cards */}
          <section className="bg-white py-12 sm:py-20 mb-20 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <h2 className="text-[#1B998B] text-2xl sm:text-3xl md:text-4xl font-light text-center mb-8 sm:mb-12 tracking-wide">Faixas de valor acessíveis</h2>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 sm:gap-6">
                {[
                  {title: 'R$ 30', subtitle: 'E MENOS', url: '/search?q=pre%C3%A7o%3A%3C30'},
                  {title: 'R$ 50', subtitle: 'E MENOS', url: '/search?q=pre%C3%A7o%3A%3C50'},
                  {title: 'R$ 80', subtitle: 'E MENOS', url: '/search?q=pre%C3%A7o%3A%3C80'},
                  {title: 'R$ 100', subtitle: 'E MENOS', url: '/search?q=pre%C3%A7o%3A%3C100'},
                  {title: 'R$ 150', subtitle: 'E MENOS', url: '/search?q=pre%C3%A7o%3A%3C150'},
                  {title: 'R$ 200', subtitle: 'E MENOS', url: '/search?q=pre%C3%A7o%3A%3C200'}
                ].map((item) => (
                  <Link key={item.title} to={item.url} className="group">
                    <div className="relative bg-gradient-to-br from-[#1B998B] to-[#0F766E] text-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl text-center transition-all duration-300 hover:scale-110 hover:shadow-2xl" 
                         style={{
                           clipPath: 'polygon(15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%, 0% 15%)',
                           boxShadow: '0 8px 25px rgba(15, 118, 110, 0.3)',
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
                        <p className="text-[#FDE68A] text-xs tracking-widest uppercase font-bold">{item.subtitle}</p>
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
                        <h3 className="text-white text-base sm:text-xl font-bold tracking-wider">BRINQUETEANDO CLUB</h3>
                      </div>
                      <div className="space-y-1 my-3 sm:my-4">
                        <p className="text-white text-xs sm:text-sm tracking-widest">•••• •••• •••• 0000</p>
                        <p className="text-[#D4AF69] text-xs">MEMBRO DESDE 2024</p>
                      </div>
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-[#D4AF69] text-xs uppercase">RESPONSÁVEL</p>
                          <p className="text-white font-semibold text-sm sm:text-base">SUA FAMÍLIA</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[#D4AF69] text-xs uppercase">PONTOS</p>
                          <p className="text-white font-bold text-xl sm:text-2xl">∞</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-8 sm:p-12 flex flex-col justify-center bg-gradient-to-br from-[#1a5757] to-[#2a2a2a]">
                  <div className="inline-block bg-[#D4AF69] text-[#0A3D2F] px-4 py-1 rounded-full text-xs font-bold mb-4 w-fit">Economize até R$ 100!</div>
                  <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-light mb-4 sm:mb-6 tracking-wide">Ganhe <span className="text-[#D4AF69] font-semibold">15% OFF</span></h2>
                  <p className="text-gray-300 text-lg sm:text-xl mb-4 sm:mb-6">em itens sensoriais e de foco selecionados</p>
                  <div className="bg-[#D4AF69] text-[#0A3D2F] px-4 sm:px-6 py-3 rounded-lg inline-block mb-4 sm:mb-6 w-fit">
                    <p className="text-xs sm:text-sm mb-1 font-semibold">Use o cupom:</p>
                    <p className="text-2xl sm:text-3xl font-bold tracking-wider">TEA15</p>
                  </div>
                  <p className="text-gray-400 text-sm mb-4 sm:mb-6">Ao entrar no BrinqueTEAndo Club. Desconto aplicado no checkout.</p>
                  <Link to="/rewards" className="bg-[#D4AF69] text-[#0A3D2F] px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-[#F4D03F] hover:scale-105 transition-all text-center w-fit text-sm sm:text-base">Quero participar</Link>
                  <p className="text-xs text-gray-400 mt-3">Mais vantagens para sua família.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="bg-white py-12 sm:py-20 mb-20 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <h2 className="text-[#0A3D2F] text-2xl sm:text-3xl md:text-4xl font-light text-center mb-4 tracking-wide">O que as famílias dizem</h2>
              <p className="text-[#9d8b7c] text-center mb-8 sm:mb-12 text-sm sm:text-base">Milhares de famílias já encontraram o brinquedo certo</p>
              <div className="relative h-auto min-h-[250px] sm:min-h-[280px]">
                {testimonials.map((testimonial, idx) => (
                  <div key={testimonial.name} className={`absolute inset-0 transition-all duration-1000 ${idx === currentTestimonial ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    <div className="bg-[#FEFDF8] rounded-[10px] shadow-xl p-6 sm:p-8 max-w-3xl mx-auto">
                      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <img 
                            src={testimonial.image} 
                            alt={`${testimonial.name} - Família BrinqueTEAndo`} 
                            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-[#D4AF69]" 
                            width="64" 
                            height="64"
                            loading="lazy"
                            decoding="async"
                        />
                        <div>
                          <p className="font-semibold text-[#0A3D2F] text-sm sm:text-base">{testimonial.name}</p>
                          <div className="flex gap-1">
                            {Array.from({length: testimonial.rating}, (_, i) => `${testimonial.name}-star-${i}`).map((starId) => (
                              <svg key={starId} className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF69]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-[#2a2a2a] text-base sm:text-lg italic leading-relaxed">{testimonial.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-2 mt-6 sm:mt-8">
                {testimonials.map((testimonial, idx) => (
                  <button key={testimonial.name} onClick={() => setCurrentTestimonial(idx)} className={`h-2 rounded-full transition-all ${idx === currentTestimonial ? 'bg-[#D4AF69] w-8' : 'bg-[#9d8b7c]/30 w-2'}`} aria-label={`View testimonial ${idx + 1}`}/>
                ))}
              </div>
            </div>
          </section>

          
          {/* NEW: LOCATION-SPECIFIC SHIPPING SECTION */}
          <section className="bg-gradient-to-b from-white to-[#F5F3ED] py-16 sm:py-20 mb-20 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
              <h2 className="text-[#0A3D2F] text-2xl sm:text-3xl md:text-4xl font-light text-center mb-4 tracking-wide">
                Frete grátis na Baixada Santista
              </h2>
              <p className="text-[#9d8b7c] text-center mb-12 text-sm sm:text-base mx-auto">
                Entrega rápida e cuidadosa para famílias neurodiversas da região
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
                <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow">
                  <div className="text-4xl mb-4">🚚</div>
                  <h3 className="text-xl font-semibold text-[#0A3D2F] mb-3">São Vicente</h3>
                  <p className="text-[#9d8b7c] text-sm leading-relaxed">
                    Frete grátis para compras elegíveis e acompanhamento do pedido.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow">
                  <div className="text-4xl mb-4">🧩</div>
                  <h3 className="text-xl font-semibold text-[#0A3D2F] mb-3">Santos</h3>
                  <p className="text-[#9d8b7c] text-sm leading-relaxed">
                    Entrega rápida para materiais sensoriais, foco e comunicação.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow">
                  <div className="text-4xl mb-4">🦕</div>
                  <h3 className="text-xl font-semibold text-[#0A3D2F] mb-3">Praia Grande</h3>
                  <p className="text-[#9d8b7c] text-sm leading-relaxed">
                    Atendimento local com suporte para escolher o produto ideal.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Collection Images */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-12 w-full">
            <h2 className="text-[#0A3D2F] text-2xl sm:text-3xl md:text-4xl font-light text-center mb-8 sm:mb-12 tracking-wide">Coleções por necessidade</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link to="/search?q=brinquedos%20sensoriais" className="group relative h-64 sm:h-72 md:h-80 overflow-hidden rounded-[10px] shadow-lg hover:shadow-2xl transition-shadow">
                <img 
                  src="https://cdn.shopify.com/s/files/1/0778/2921/0327/files/new_arrival.avif?v=1765510544" 
                  alt="Novidades sensoriais e autorregulação para TEA e TDAH" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="800"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A3D2F]/90 via-transparent to-transparent"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <h3 className="text-white text-xl sm:text-2xl font-light tracking-wider mb-2 text-center">Novidades sensoriais</h3>
                  <span className="text-[#D4AF69] text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">Ver coleção →</span>
                </div>
              </Link>
              <Link to="/search?q=foco%20tdah" className="group relative h-64 sm:h-72 md:h-80 overflow-hidden rounded-[10px] shadow-lg hover:shadow-2xl transition-shadow">
                <img 
                  src="https://cdn.shopify.com/s/files/1/0778/2921/0327/files/sport_collection.avif?v=1765510563" 
                  alt="Jogos de foco, atenção e planejamento para TDAH" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="800"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A3D2F]/90 via-transparent to-transparent"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <h3 className="text-white text-xl sm:text-2xl font-light tracking-wider mb-2 text-center">Foco e atenção</h3>
                  <span className="text-[#D4AF69] text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">Ver coleção →</span>
                </div>
              </Link>
              <Link to="/search?q=comunicacao%20alternativa" className="group relative h-64 sm:h-72 md:h-80 overflow-hidden rounded-[10px] shadow-lg hover:shadow-2xl transition-shadow sm:col-span-2 lg:col-span-1">
                <img 
                  src="https://cdn.shopify.com/s/files/1/0778/2921/0327/files/Fossil.avif?v=1765510524" 
                  alt="Comunicação e linguagem com recursos visuais e CAA" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="800"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A3D2F]/90 via-transparent to-transparent"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <h3 className="text-white text-xl sm:text-2xl font-light tracking-wider mb-2 text-center">Comunicação e linguagem</h3>
                  <span className="text-[#D4AF69] text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">Ver coleção →</span>
                </div>
              </Link>
            </div>
          </section>

          {/* Featured Products */}
          <section className="bg-white py-12 sm:py-16 md:py-20 mb-16 sm:mb-20 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <h2 className="text-[#0A3D2F] text-2xl sm:text-3xl md:text-4xl font-light text-center mb-8 sm:mb-12 tracking-wide">Destaques com propósito</h2>
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
                          alt={p.featuredImage.altText || `${p.title} - BrinqueTEAndo`}
                          loading="lazy"
                        />
                      )}
                    </div>
                    <div className="text-center px-2">
                      <p className="text-[#D4AF69] text-xs tracking-widest mb-1 uppercase font-semibold line-clamp-1">{p.vendor || 'BrinqueTEAndo'}</p>
                      <h3 className="text-[#0A3D2F] font-light mb-2 hover:text-[#1B998B] transition-colors text-xs sm:text-sm line-clamp-2">{p.title}</h3>
                      <Money data={p.priceRange.minVariantPrice} className="text-[#2a2a2a] font-medium text-xs sm:text-sm"/>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {quizCompleted && quizResult && (
            <div className="fixed bottom-24 right-6 z-40 max-w-xs w-full">
              <div className="bg-white border border-[#A5B4FC] shadow-xl rounded-2xl p-4">
                <p className="text-xs uppercase tracking-widest text-[#7C3AED] mb-1">Seu perfil</p>
                <p className="text-[#0F172A] font-semibold mb-2">{quizResult.label}</p>
                <div className="flex gap-2">
                  <Link to={quizResult.link} className="flex-1 text-center bg-[#1B998B] text-white text-sm font-semibold px-3 py-2 rounded-lg hover:bg-[#12877B] transition-colors">
                    Ver indicação
                  </Link>
                  <button onClick={handleQuizReset} className="text-sm text-[#7C3AED] font-semibold px-3 py-2 rounded-lg border border-[#A5B4FC] hover:bg-[#EEF2FF] transition-colors">
                    Refazer
                  </button>
                </div>
              </div>
            </div>
          )}

          {quizOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/70 px-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#7C3AED] mb-2">Quiz rápido</p>
                    <h3 className="text-2xl sm:text-3xl font-semibold text-[#1B998B]">Qual é a principal necessidade hoje?</h3>
                  </div>
                  <button onClick={() => setQuizOpen(false)} className="text-[#475569] hover:text-[#0F172A] font-semibold">
                    Fechar
                  </button>
                </div>
                <p className="text-sm text-[#64748B] mb-6">Escolha uma opção para receber recomendações personalizadas para TEA, TDAH e autismo.</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {quizOptions.map((option) => (
                    <button key={option.id} onClick={() => handleQuizSelect(option)} className="text-left border border-[#E2E8F0] rounded-xl p-4 hover:border-[#7C3AED] hover:shadow-md transition-all">
                      <p className="text-[#1B998B] font-semibold mb-1">{option.label}</p>
                      <p className="text-sm text-[#64748B]">{option.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {chatOpen && (
            <div className="fixed bottom-24 right-6 z-40 w-80 max-w-[90vw]">
              <div className="bg-white border border-[#A5B4FC] shadow-2xl rounded-2xl overflow-hidden">
                <div className="bg-[#1B998B] text-white px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">Chat especialista TEA/TDAH</p>
                    <p className="text-xs opacity-80">Respondemos com acolhimento</p>
                  </div>
                  <button onClick={() => setChatOpen(false)} className="text-white/80 hover:text-white font-semibold">
                    Fechar
                  </button>
                </div>
                <div className="p-4">
                  <p className="text-sm text-[#0F172A] mb-3">Oi! Sou especialista em neurodiversidade e posso orientar a escolha do brinquedo ideal.</p>
                  <div className="flex flex-col gap-2">
                    <button onClick={() => setQuizOpen(true)} className="w-full bg-[#7C3AED] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#6D28D9] transition-colors">
                      Fazer quiz agora
                    </button>
                    <Link to="/collections/all" className="w-full text-center border border-[#1B998B] text-[#1B998B] text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#1B998B] hover:text-white transition-colors">
                      Ver todos os brinquedos
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          <button onClick={() => setChatOpen((open) => !open)} className="fixed bottom-6 right-6 z-40 bg-[#7C3AED] text-white px-4 py-3 rounded-full shadow-xl hover:bg-[#6D28D9] transition-colors font-semibold text-sm">
            {chatOpen ? 'Fechar chat' : 'Chat especialista'}
          </button>

        </div>

        <BrinqueTEAndoFooter menu={footerMenu} />

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

function BrinqueTEAndoFooter() {
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
                Receba novidades inclusivas
              </h3>
              <p className="text-gray-300 text-lg">
                Conteúdos, ofertas e dicas para TEA, TDAH e autismo.
              </p>
            </div>
            <form className="flex flex-col sm:flex-row gap-3 w-full">
              <input
                type="email"
                name="email"
                placeholder="Seu e-mail"
                className="flex-1 bg-white/10 border border-[#D4AF69]/30 text-white placeholder:text-white/60 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF69]"
              />
              <button type="submit" className="bg-[#D4AF69] text-[#0A3D2F] px-6 py-3 rounded-lg font-semibold hover:bg-[#F4D03F] transition-colors">
                Quero receber
              </button>
            </form>
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
                BRINQUETEANDO
              </div>
              <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-[#D4AF69] to-transparent transition-all duration-500 mt-2"></div>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-xs">
              Loja especializada em brinquedos e recursos terapêuticos para TEA, TDAH e autismo. Curadoria sensorial, foco, comunicação e autonomia.
            </p>
            
            {/* Trust Badges */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-full bg-[#D4AF69]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#D4AF69]">✓</span>
                </div>
                <span className="text-gray-300">Atendimento especializado em neurodiversidade</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-full bg-[#D4AF69]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#D4AF69]">✓</span>
                </div>
                <span className="text-gray-300">Frete grátis na Baixada Santista</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-full bg-[#D4AF69]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#D4AF69]">✓</span>
                </div>
                <span className="text-gray-300">Compra segura e suporte humanizado</span>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-[#D4AF69] text-sm font-bold mb-6 uppercase tracking-widest relative inline-block">
              Explorar coleções
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#D4AF69] to-transparent"></div>
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/search?q=novidades%20sensoriais" className="text-gray-300 hover:text-[#D4AF69] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Novidades sensoriais
                </Link>
              </li>
              <li>
                <Link to="/search?q=foco%20tdah" className="text-gray-300 hover:text-[#D4AF69] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Foco e atenção
                </Link>
              </li>
              <li>
                <Link to="/search?q=comunicacao%20alternativa" className="text-gray-300 hover:text-[#D4AF69] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Comunicação e linguagem
                </Link>
              </li>
              <li>
                <Link to="/search?q=rotina%20visual" className="text-gray-300 hover:text-[#D4AF69] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Rotina e autonomia
                </Link>
              </li>
              <li>
                <Link to="/search?q=habilidades%20sociais" className="text-gray-300 hover:text-[#D4AF69] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Habilidades sociais
                </Link>
              </li>
              <li>
                <Link to="/search?q=coordenacao%20motora" className="text-gray-300 hover:text-[#D4AF69] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Coordenação motora
                </Link>
              </li>
              <li>
                <Link to="/blogs/news" className="text-gray-300 hover:text-[#D4AF69] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Dicas e conteúdos
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-[#D4AF69] text-sm font-bold mb-6 uppercase tracking-widest relative inline-block">
              Suporte
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
                  Trocas e devoluções
                </Link>
              </li>
              <li>
                <Link to="/pages/shipping-policy" className="text-gray-300 hover:text-[#D4AF69] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Política de frete
                </Link>
              </li>
              <li>
                <Link to="/pages/contact" className="text-gray-300 hover:text-[#D4AF69] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Fale conosco
                </Link>
              </li>
              <li>
                <Link to="/pages/1-year-warranty" className="text-gray-300 hover:text-[#D4AF69] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Garantias e cuidados
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-[#D4AF69] text-sm font-bold mb-6 uppercase tracking-widest relative inline-block">
              BrinqueTEAndo
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#D4AF69] to-transparent"></div>
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/pages/our-story" className="text-gray-300 hover:text-[#D4AF69] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Nossa história
                </Link>
              </li>
              <li>
                <Link to="/pages/careers" className="text-gray-300 hover:text-[#D4AF69] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Trabalhe conosco
                </Link>
              </li>
              <li>
                <Link to="/pages/press" className="text-gray-300 hover:text-[#D4AF69] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Imprensa
                </Link>
              </li>
              <li>
                <Link to="/pages/privacy-policy" className="text-gray-300 hover:text-[#D4AF69] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Política de privacidade
                </Link>
              </li>
              <li>
                <Link to="/pages/terms-of-service" className="text-gray-300 hover:text-[#D4AF69] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Termos de serviço
                </Link>
              </li>
              <li>
                <Link to="/pages/cookie-policy" className="text-gray-300 hover:text-[#D4AF69] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Política de cookies
                </Link>
              </li>
              <li>
                <Link to="/pages/data-sharing-opt-out" className="text-gray-300 hover:text-[#D4AF69] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Preferências de privacidade
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
                Siga a BrinqueTEAndo
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
                  href="https://www.instagram.com/brinqueteando/" 
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
                  href="https://www.youtube.com/@BrinqueTEAndo" 
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
                  href="https://www.tiktok.com/@brinqueteando" 
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
                  href="https://www.pinterest.com/BrinqueTEAndo/" 
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
                Pagamento seguro
              </h4>
              <div className="flex justify-end gap-2 flex-wrap">
                {['Pix', 'Boleto', 'Visa', 'Mastercard', 'Amex'].map((method) => (
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
                © {new Date().getFullYear()} BrinqueTEAndo. Todos os direitos reservados.
              </p>
              <div className="flex items-center gap-4">
                <span className="text-[#D4AF69]">★★★★★</span>
                <span>Avaliação média 4,9/5 por famílias</span>
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
