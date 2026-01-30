import {FooterNewsletterForm} from '~/components/FooterNewsletterForm';
import {useLoaderData, Link, useRouteLoaderData} from 'react-router';
import {useState, useEffect} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import {getProductHandle} from '~/lib/utils';
import {ProductsUnder100} from '~/components/ProductsUnder100';
import {useAside} from '~/components/Aside';
import {NavigationMenu} from '~/components/NavigationMenu';



export const meta = () => {
  return [
    // META TAGS PRIMÁRIAS
    {title: 'Brinquedos Terapêuticos | TDAH, Autismo e TEA | BrinqueTEAndo'},
    {name: 'description', content: 'Explore brinquedos terapêuticos para crianças com TDAH, Autismo e TEA. Frete grátis e garantia de 1 ano'},
    
    // --- VERIFICAÇÕES IMPORTADAS DO THEME.LIQUID ---
    // Facebook Domain Verification (Essencial para Anúncios)
    {name: 'facebook-domain-verification', content: 'qbk5t5o0agiy90kflze09te3423xgt'},
    
    // GEO-TARGETING META TAGS
    {name: 'geo.region', content: 'BR'},
    {name: 'geo.placename', content: 'Brasil'},
    
    // PALAVRAS-CHAVE APRIMORADAS (Baseadas em Localização e Long-tail)
    {name: 'keywords', content: 'brinquedos terapêuticos, brinquedos autismo, brinquedos tdah, brinquedos tea, brinquedos sensoriais, brinquedos educativos especiais, terapia ocupacional infantil, desenvolvimento infantil, brinquedos inclusivos, brinquedos para crianças especiais, brinquedos calmantes, fidget toys, brinquedos montessori, estimulação sensorial, briqueteando'},
    
    // SEGMENTAÇÃO DE IDIOMA
    {httpEquiv: 'content-language', content: 'pt-BR'},
    
    // OPEN GRAPH TAGS APRIMORADAS
    {property: 'og:title', content: 'BrinqueTEAndo | Brinquedos Terapêuticos para TDAH, Autismo e TEA'},
    {property: 'og:description', content: 'Descubra brinquedos terapêuticos especiais. Frete grátis para todo Brasil. Garantia de 1 ano. Desenvolvimento e diversão.'},
    {property: 'og:type', content: 'website'},
    {property: 'og:url', content: 'https://briqueteando.com.br'},
    {property: 'og:image', content: 'https://cdn.shopify.com/s/files/1/0778/2921/0327/files/5.avif?v=1765596668'},
    {property: 'og:image:width', content: '1200'},
    {property: 'og:image:height', content: '630'},
    {property: 'og:site_name', content: 'BrinqueTEAndo'},
    {property: 'og:locale', content: 'pt_BR'},
    
    // TWITTER CARDS
    {name: 'twitter:card', content: 'summary_large_image'},
    {name: 'twitter:title', content: 'BrinqueTEAndo | Brinquedos Terapêuticos'},
    {name: 'twitter:description', content: 'Brinquedos terapêuticos premium para TDAH, Autismo e TEA. Frete grátis para todo Brasil.'},
    {name: 'twitter:image', content: 'https://cdn.shopify.com/s/files/1/0778/2921/0327/files/5.avif?v=1765596668'},
    
    // ROBOTS & INDEXAÇÃO APRIMORADOS
    {name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'},
    {name: 'googlebot', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'},
    
    // OTIMIZAÇÃO MOBILE
    {name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=5'},
    {name: 'mobile-web-app-capable', content: 'yes'},
    {name: 'apple-mobile-web-app-capable', content: 'yes'},
    
    // COR DO TEMA
    {name: 'theme-color', content: '#21388D'},
    
    // URL CANÔNICA
    {tagName: 'link', rel: 'canonical', href: 'https://briqueteando.com.br'},
    
    // HREFLANG PARA GEO-TARGETING
    {tagName: 'link', rel: 'alternate', hreflang: 'pt-br', href: 'https://briqueteando.com.br'},
    {tagName: 'link', rel: 'alternate', hreflang: 'x-default', href: 'https://briqueteando.com.br'},
    
    // PRECONNECT & DNS-PREFETCH
    {tagName: 'link', rel: 'preconnect', href: 'https://cdn.shopify.com'},
    {tagName: 'link', rel: 'dns-prefetch', href: 'https://cdn.shopify.com'},
    
    // PRELOAD RECURSOS CRÍTICOS
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
  const {menu: headerMenu} = await storefront.query(HEADER_MENU_QUERY, {
    variables: { headerMenuHandle: 'main-menu' }
  });

  return {
    collections, 
    products, 
    under100Products: under100Products.nodes,
    footerMenu,
    headerMenu
  };
}

export default function Homepage() {
  const {collections, products, under100Products, footerMenu, headerMenu} = useLoaderData();
  const rootData = useRouteLoaderData('root');
  const {open} = useAside();
  const [currentHero, setCurrentHero] = useState(0);
  const [currentPromo, setCurrentPromo] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [timeLeft, setTimeLeft] = useState({days: 0, hours: 0, minutes: 0, seconds: 0});
  const [currentHoliday, setCurrentHoliday] = useState({name: 'Feriado', emoji: '🎉', message: 'CONTAGEM REGRESSIVA'});

  // Ahrefs Analytics Script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://analytics.ahrefs.com/analytics.js';
    script.async = true;
    script.setAttribute('data-key', 'ffWKXpflS652BvLv6vtybg');
    document.body.appendChild(script);
    return () => {};
  }, []);

  // DADOS ESTRUTURADOS COMPLETOS (Múltiplos Tipos de Schema)
  const schemaOrgJSON = [
    // Schema da Organização
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "BrinqueTEAndo",
      "url": "https://briqueteando.com.br",
      "logo": "https://cdn.shopify.com/s/files/1/0778/2921/0327/files/5.avif?v=1765596668",
      "description": "Loja especializada em brinquedos terapêuticos para crianças com TDAH, Autismo e TEA no Brasil.",
      "foundingDate": "2024",
      "areaServed": [
        {"@type": "Country", "name": "Brasil"}
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+55-11-99999-9999",
        "contactType": "Atendimento ao Cliente",
        "areaServed": ["BR"],
        "availableLanguage": ["Português"]
      },
      "sameAs": [
        "https://www.instagram.com/briqueteando/",
        "https://www.facebook.com/briqueteando",
        "https://www.tiktok.com/@briqueteando",
        "https://www.youtube.com/@briqueteando",
        "https://www.pinterest.com/briqueteando/"
      ]
    },
    // Schema do WebSite com Ação de Busca
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "BrinqueTEAndo",
      "url": "https://briqueteando.com.br",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://briqueteando.com.br/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    // Schema de Loja/LocalBusiness
    {
      "@context": "https://schema.org",
      "@type": "Store",
      "name": "BrinqueTEAndo - Loja Online",
      "image": "https://cdn.shopify.com/s/files/1/0778/2921/0327/files/5.avif?v=1765596668",
      "url": "https://briqueteando.com.br",
      "priceRange": "R$-R$$",
      "currenciesAccepted": "BRL",
      "paymentAccepted": "Cartão de Crédito, PIX, Boleto",
      "areaServed": [
        {"@type": "Country", "name": "BR"}
      ]
    },
    // Schema de Coleção de Produtos
    {
      "@context": "https://schema.org",
      "@type": "OfferCatalog",
      "name": "Coleções de Brinquedos Terapêuticos BrinqueTEAndo",
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
                "description": "Brinquedos para estimulação sensorial em crianças com TDAH e TEA",
                "offers": {
                  "@type": "AggregateOffer",
                  "priceCurrency": "BRL",
                  "lowPrice": "49",
                  "highPrice": "299",
                  "availability": "https://schema.org/InStock"
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.9",
                  "bestRating": "5",
                  "worstRating": "1",
                  "ratingCount": "2847"
                }
              }
            }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "Brinquedos Calmantes",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "Brinquedos Calmantes",
                "description": "Brinquedos para acalmar e regular emoções",
                "offers": {
                  "@type": "AggregateOffer",
                  "priceCurrency": "BRL",
                  "lowPrice": "39",
                  "highPrice": "199",
                  "availability": "https://schema.org/InStock"
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.9",
                  "bestRating": "5",
                  "worstRating": "1",
                  "ratingCount": "2847"
                }
              }
            }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "Brinquedos Educativos",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "Brinquedos Educativos",
                "description": "Brinquedos para desenvolvimento cognitivo e motor",
                "offers": {
                  "@type": "AggregateOffer",
                  "priceCurrency": "BRL",
                  "lowPrice": "59",
                  "highPrice": "349",
                  "availability": "https://schema.org/InStock"
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.9",
                  "bestRating": "5",
                  "worstRating": "1",
                  "ratingCount": "2847"
                }
              }
            }
          ]
        }
      ]
    },
    // Schema de Breadcrumb
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Início",
          "item": "https://briqueteando.com.br"
        }
      ]
    },
    // Schema de Avaliação Agregada
    {
      "@context": "https://schema.org",
      "@type": "AggregateRating",
      "itemReviewed": {
        "@type": "Organization",
        "name": "BrinqueTEAndo"
      },
      "ratingValue": "4.9",
      "bestRating": "5",
      "ratingCount": "2847"
    },
    // Schema de FAQ
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Vocês entregam para todo o Brasil?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim! Oferecemos FRETE GRÁTIS para todo o Brasil em todos os pedidos."
          }
        },
        {
          "@type": "Question",
          "name": "Qual a garantia dos brinquedos BrinqueTEAndo?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Todos os brinquedos BrinqueTEAndo incluem garantia de 1 ano cobrindo defeitos de fabricação."
          }
        }
      ]
    }
  ];

  const promoMessages = [
    "💙 FRETE GRÁTIS para todo o Brasil!",
    "⭐ Junte-se ao Programa de Fidelidade BrinqueTEAndo - Ganhe Pontos!",
    "🎁 Devoluções estendidas do Dia das Crianças até 31 de Outubro",
    "⏰ Peça até dia 10 para garantir entrega no Dia das Crianças",
    "💎 GARANTIA DE 1 ANO em todos os brinquedos",
    "💞 Use o código TEAAMO15 para 15% OFF - Tempo limitado!"
  ];

  const testimonials = [
    {name: "Maria S.", text: "A qualidade é excepcional! O brinquedo sensorial ajudou muito meu filho com autismo. Chegou super rápido em São Paulo.", rating: 5, image: "https://cdn.shopify.com/s/files/1/0778/2921/0327/files/1.jpg?v=1765938975"},
    {name: "João R.", text: "Melhor presente que já dei! Minha filha com TDAH adora os fidgets. Embalagem linda e entrega rápida no Rio.", rating: 5, image: "https://cdn.shopify.com/s/files/1/0778/2921/0327/files/2.jpg?v=1765938975"},
    {name: "Ana T.", text: "Atendimento incrível e os brinquedos superaram as expectativas. Recomendo muito a BrinqueTEAndo!", rating: 5, image: "https://cdn.shopify.com/s/files/1/0778/2921/0327/files/4.jpg?v=1765938975"},
    {name: "Pedro K.", text: "Design elegante e funcional, perfeito para o dia a dia. Meu filho ama brincar!", rating: 5, image: "https://cdn.shopify.com/s/files/1/0778/2921/0327/files/3.jpg?v=1765938975"}
  ];

  // ✅ CORRIGIDO: Lógica do Countdown Automático
  const calculateHolidayCountdown = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const holidays = [
      {name: 'Véspera de Natal', month: 11, day: 24, emoji: '🎄', message: 'O PAPAI NOEL ESTÁ A CAMINHO!'},
      {name: 'Véspera de Ano Novo', month: 11, day: 31, emoji: '🎉', message: '🎊 FELIZ ANO NOVO — PEÇA ATÉ 27/12'},
      {name: 'Dia das Mães', month: 4, day: 12, emoji: '👩', message: 'CONTAGEM DIA DAS MÃES!'},
      {name: 'Dia das Crianças', month: 9, day: 12, emoji: '🧸', message: 'CONTAGEM DIA DAS CRIANÇAS!'},
      {name: 'Dia dos Pais', month: 7, day: 10, emoji: '👨', message: 'CONTAGEM DIA DOS PAIS!'},
      {name: 'Páscoa', month: 3, day: 20, emoji: '🐣', message: 'CONTAGEM PÁSCOA!'},
      {name: 'Dia do Autismo', month: 3, day: 2, emoji: '💙', message: 'DIA MUNDIAL DO AUTISMO!'},
      {name: 'Carnaval', month: 1, day: 25, emoji: '🎭', message: 'CONTAGEM CARNAVAL!'},
      {name: 'Dia das Crianças', month: 9, day: 12, emoji: '🎈', message: 'CONTAGEM DIA DAS CRIANÇAS!'},
      {name: 'Black Friday', month: 10, day: 29, emoji: '🛒', message: 'CONTAGEM BLACK FRIDAY!'},
      {name: 'Cyber Monday', month: 11, day: 2, emoji: '💻', message: 'CONTAGEM CYBER MONDAY!'}
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

  // FORÇAR AUTOPLAY DO VÍDEO NO MOBILE - ABORDAGEM AGRESSIVA
  useEffect(() => {
    const video = document.getElementById('hero-video');
    if (video) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.log('Autoplay prevenido, configurando handler de toque');
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
      
      {/* CORREÇÃO DO CSS: Adicionado Keyframes para o Marquee */}
      <style>{`
        header { display: none !important; }
        [class*="Header"] { display: none !important; }
        div[data-testid="header"] { display: none !important; }
        nav[data-testid="header-nav"] { display: none !important; }
        
        /* PREVENIR SCROLL HORIZONTAL - FORMA SEGURA */
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
        /* --- ANIMAÇÃO PARA O MARQUEE --- */
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-scroll {
          display: flex;
          width: fit-content;
          animation: marquee-scroll 40s linear infinite;
        }
        .animate-marquee-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      <main role="main" aria-label="BrinqueTEAndo Brinquedos Terapêuticos - Conteúdo Principal" className="bg-[#EAD9B9] flex flex-col min-h-screen w-full overflow-x-hidden">
        <div className="flex-grow w-full">
          {/* Barra Superior com Contagem Regressiva */}
          <div className="bg-[#21388D] text-white py-3 text-center w-full">
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

          {/* --- BARRA DE SCROLL ANIMADA --- */}
          <div className="w-full bg-[#3292D8] border-y-2 border-[#DEC91F] overflow-hidden py-3 relative z-20 shadow-lg">
            {/* Overlay de Textura Sutil */}
            <div className="absolute inset-0 pointer-events-none opacity-10" style={{backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '15px 15px'}}></div>
            <div className="animate-marquee-scroll flex items-center">
              {/* Repetimos o conteúdo várias vezes para garantir o loop infinito em telas grandes */}
              {[...Array(12)].map((_, i) => (
                <div key={i} className="flex items-center mx-8 whitespace-nowrap">
                   <span className="text-2xl mr-3 filter drop-shadow-md">🧩</span>
                   <span className="text-[#EAD9B9] font-serif italic text-xl tracking-widest font-medium uppercase drop-shadow-md" style={{textShadow: '0 1px 2px rgba(0,0,0,0.5)'}}>
                     💙 Brinquedos que Transformam Vidas - TDAH, Autismo e TEA
                   </span>
                   <span className="text-2xl ml-3 filter drop-shadow-md">🌈</span>
                   
                   {/* Separador Elegante */}
                   <div className="ml-8 flex items-center gap-2 opacity-70">
                     <span className="text-[#DEC91F] text-xs">✦</span>
                     <span className="w-16 h-[1px] bg-[#DEC91F]"></span>
                     <span className="text-[#DEC91F] text-xs">✦</span>
                   </div>
                </div>
              ))}
            </div>
          </div>
          {/* --- FIM BARRA DE SCROLL --- */}

          {/* Seção de Introdução */}
          <div className="grid md:grid-cols-2 gap-0 w-full">
            <div className="bg-gradient-to-r from-[#DEC91F] via-[#F4E053] to-[#DEC91F] py-8 px-6 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.1) 10px, rgba(255,255,255,.1) 20px)'}}></div>
              <div className="relative z-10 max-w-4xl mx-auto">
                <h2 className="text-[#21388D] text-3xl md:text-4xl font-light mb-6 tracking-wide text-center">
                  🧸 Privilégios Especiais <span className="text-[#CF111A] font-serif italic text-5xl">&</span> Desenvolva com Amor
                </h2>
                <p className="text-[#21388D] text-lg font-semibold mb-4 text-center">
                  💙 Use o código: <span className="text-white bg-[#21388D] px-4 py-1 rounded-md font-bold">TEAAMO15</span> para 15% OFF
                </p>
                <p className="text-sm text-[#7C3D36] text-center">Seleção especial de brinquedos terapêuticos disponível agora! Oferta por tempo limitado.</p>
              </div>
            </div>

            {/* Barra de Benefícios */}
            <div className="bg-[#EAD9B9] border-l-2 border-[#DEC91F] py-8 px-4 sm:px-6">
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-center">
                  <div className="w-full sm:w-auto">
                    <h3 className="text-3xl sm:text-4xl font-bold text-[#21388D] mb-1 whitespace-nowrap">Benefícios</h3>
                    <p className="text-xs sm:text-sm text-[#7D8FA4]">Brinquedos de qualidade</p>
                  </div>
                  <span className="text-4xl sm:text-5xl text-[#DEC91F] font-serif italic self-center">&</span>
                  <div className="w-full sm:w-auto">
                    <h3 className="text-3xl sm:text-4xl font-bold text-[#21388D] mb-1 whitespace-nowrap">Garantido</h3>
                    <p className="text-xs sm:text-sm text-[#7D8FA4]">Garantia de 1 Ano</p>
                  </div>
                  <span className="text-xl sm:text-2xl text-[#7D8FA4] font-medium self-center">Mais</span>
                  <div className="w-full sm:w-auto">
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#21388D] mb-1 whitespace-nowrap">Vale R$20</h3>
                    <p className="text-xs sm:text-sm text-[#7D8FA4]">a cada R$100 gastos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ticker Promocional */}
          <div className="bg-[#CF111A] text-white py-3 overflow-hidden relative w-full">
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

          {/* Indicadores de Confiança */}
          <div className="bg-[#8ECAE7] border-b border-[#DEC91F] w-full">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="text-xl font-serif text-[#21388D]">🎁 COMPRE BRINQUEDOS COM CONFIANÇA:</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
                <div className="flex items-start justify-center md:justify-start gap-3">
                  <div>
                    <p className="text-[#21388D] font-semibold mb-1"><span className="text-[#CF111A]">Garantido</span> Entrega no Dia das Crianças</p>
                    <p className="text-[#7D8FA4] text-sm">🧸 Peça até 10/10 às 17h (Brasil). <span className="underline cursor-pointer">Detalhes</span></p>
                  </div>
                </div>
                <div className="flex items-start justify-center gap-3">
                  <div>
                    <p className="text-[#21388D] font-semibold mb-1"><span className="text-[#CF111A]">Melhor</span> Garantia de Preço</p>
                    <p className="text-[#7D8FA4] text-sm">Igualamos o preço em 30 dias. <span className="underline cursor-pointer">Detalhes</span></p>
                  </div>
                </div>
                <div className="flex items-start justify-center md:justify-end gap-3">
                  <div>
                    <p className="text-[#21388D] font-semibold mb-1"><span className="text-[#CF111A]">Fácil</span> Devolução</p>
                    <p className="text-[#7D8FA4] text-sm">Devoluções grátis até 31/10. <span className="underline cursor-pointer">Detalhes</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navegação Principal */}
          <BrinqueTEAndoNavigation menu={headerMenu} />
          <div className="bg-[#21388D] text-white py-3 w-full">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <p className="text-sm font-medium tracking-wider">🧸 FRETE GRÁTIS BRASIL • GARANTIA 1 ANO • DEVOLUÇÕES FÁCEIS 🎁</p>
            </div>
          </div>

          {/* BANNER HERO COM VÍDEO - LOOP AUTOMÁTICO */}
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
                  Seu navegador não suporta a tag de vídeo.
                </video>
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20 z-10"></div>
                <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 sm:px-8 md:px-16">
                  <h1 className="text-white text-2xl sm:text-4xl md:text-6xl font-light tracking-widest mb-2 sm:mb-4"></h1>
                  <p className="text-[#DEC91F] text-sm sm:text-lg md:text-xl tracking-wider mb-2 sm:mb-4">
                    Brinquedos Terapêuticos Premium para TDAH, Autismo e TEA
                  </p>
                  <Link to="/collections/lancamentos" className="inline-block border-2 border-[#DEC91F] bg-[#21388D] text-white px-6 sm:px-10 py-2 sm:py-3 rounded-full hover:bg-[#DEC91F] hover:text-[#21388D] hover:border-[#21388D] transition-all font-semibold tracking-wider w-fit mt-2 sm:mt-4 text-xs sm:text-base">
                    DESCOBRIR COLEÇÃO
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Coleção TDAH/Autismo */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mb-20 w-full">
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              <div className="relative h-72 sm:h-80 md:h-96 overflow-hidden rounded-[10px] shadow-xl group">
                <img 
                  src="https://cdn.shopify.com/s/files/1/0778/2921/0327/files/men_s_collection_dc5c97d6-952f-43c1-9f24-8eadb0693f74.avif?v=1765592942" 
                  alt="Brinquedos para TDAH - Compre Online Brasil" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" 
                  width="800" 
                  height="600"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#CF111A]/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-8 text-white">
                  <h2 className="text-2xl sm:text-3xl font-light mb-2 tracking-wide">BRINQUEDOS TDAH</h2>
                  <p className="text-[#DEC91F] mb-4 text-sm sm:text-base">Brinquedos que ajudam no foco e concentração</p>
                  <Link to="/collections/tdah" className="inline-block bg-white text-[#CF111A] px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold hover:bg-[#DEC91F] hover:text-white transition-all text-sm sm:text-base">COMPRAR AGORA</Link>
                </div>
              </div>
              <div className="relative h-72 sm:h-80 md:h-96 overflow-hidden rounded-[10px] shadow-xl group">
                <img 
                  src="https://cdn.shopify.com/s/files/1/0778/2921/0327/files/7.avif?v=1765596667" 
                  alt="Brinquedos para Autismo e TEA - Compre Online Brasil" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" 
                  width="800" 
                  height="600"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#21388D]/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-8 text-white">
                  <h2 className="text-2xl sm:text-3xl font-light mb-2 tracking-wide">BRINQUEDOS AUTISMO</h2>
                  <p className="text-[#DEC91F] mb-4 text-sm sm:text-base">Estimulação sensorial e desenvolvimento</p>
                  <Link to="/collections/autismo-tea" className="inline-block bg-white text-[#21388D] px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold hover:bg-[#DEC91F] hover:text-white transition-all text-sm sm:text-base">COMPRAR AGORA</Link>
                </div>
              </div>
            </div>
          </section>

          {/* Seção Produtos Abaixo de R$100 */}
          <ProductsUnder100 products={under100Products} />

          {/* Cards de Orçamento para Presente */}
          <section className="bg-white py-12 sm:py-20 mb-20 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <h2 className="text-[#21388D] text-2xl sm:text-3xl md:text-4xl font-light text-center mb-8 sm:mb-12 tracking-wide">Brinquedos Terapêuticos para Cada Orçamento</h2>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 sm:gap-6">
                {[
                  {title: 'R$50', subtitle: 'E ABAIXO', url: '/products/vale-presente-briqueteando'},
                  {title: 'R$100', subtitle: 'E ABAIXO', url: '/products/vale-presente-briqueteando'},
                  {title: 'R$150', subtitle: 'E ABAIXO', url: '/products/vale-presente-briqueteando'},
                  {title: 'R$200', subtitle: 'E ABAIXO', url: '/products/vale-presente-briqueteando'},
                  {title: 'R$300', subtitle: 'E ABAIXO', url: '/products/vale-presente-briqueteando'},
                  {title: 'R$500', subtitle: 'E ABAIXO', url: '/products/vale-presente-briqueteando'}
                ].map((item, idx) => (
                  <Link key={idx} to={item.url} className="group">
                    <div className="relative bg-gradient-to-br from-[#3292D8] to-[#21388D] text-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl text-center transition-all duration-300 hover:scale-110 hover:shadow-2xl" 
                         style={{
                           clipPath: 'polygon(15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%, 0% 15%)',
                           boxShadow: '0 8px 25px rgba(33, 56, 141, 0.3)',
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
                        <p className="text-[#DEC91F] text-xs tracking-widest uppercase font-bold">{item.subtitle}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Seção de Recompensas */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-20 w-full">
            <div className="bg-gradient-to-r from-[#21388D] to-[#3292D8] rounded-[10px] shadow-2xl overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="bg-gradient-to-br from-[#21388D] to-[#0F1A47] p-8 sm:p-12 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#DEC91F] via-[#EAD9B9] to-[#3292D8]"></div>
                  <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-[#DEC91F] via-[#EAD9B9] to-[#3292D8]"></div>
                  <div className="relative z-10 transform -rotate-6 hover:rotate-0 transition-transform duration-500 w-full max-w-[340px] sm:max-w-[400px]">
                    <div className="bg-gradient-to-br from-[#3292D8] to-[#21388D] rounded-xl p-5 sm:p-6 shadow-2xl border-2 border-[#DEC91F] w-full aspect-[1.586/1] flex flex-col justify-between">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#DEC91F] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                        <h3 className="text-white text-base sm:text-xl font-bold tracking-wider">RECOMPENSAS BRIQUETEANDO</h3>
                      </div>
                      <div className="space-y-1 my-3 sm:my-4">
                        <p className="text-white text-xs sm:text-sm tracking-widest">•••• •••• •••• 0000</p>
                        <p className="text-[#DEC91F] text-xs">MEMBRO DESDE 2024</p>
                      </div>
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-[#DEC91F] text-xs uppercase">TITULAR</p>
                          <p className="text-white font-semibold text-sm sm:text-base">SEU NOME</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[#DEC91F] text-xs uppercase">PONTOS</p>
                          <p className="text-white font-bold text-xl sm:text-2xl">∞</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-8 sm:p-12 flex flex-col justify-center bg-gradient-to-br from-[#3292D8] to-[#7C3D36]">
                  <div className="inline-block bg-[#DEC91F] text-[#21388D] px-4 py-1 rounded-full text-xs font-bold mb-4 w-fit">Economize até R$50!</div>
                  <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-light mb-4 sm:mb-6 tracking-wide">Ganhe <span className="text-[#DEC91F] font-semibold">15% OFF</span></h2>
                  <p className="text-gray-300 text-lg sm:text-xl mb-4 sm:mb-6">em compras de brinquedos na BrinqueTEAndo hoje</p>
                  <div className="bg-[#DEC91F] text-[#21388D] px-4 sm:px-6 py-3 rounded-lg inline-block mb-4 sm:mb-6 w-fit">
                    <p className="text-xs sm:text-sm mb-1 font-semibold">Use o código:</p>
                    <p className="text-2xl sm:text-3xl font-bold tracking-wider">TEAAMO15</p>
                  </div>
                  <p className="text-gray-400 text-sm mb-4 sm:mb-6">Ao se juntar ao Programa de Recompensas. Desconto aplicado no checkout.</p>
                  <Link to="/recompensas" className="bg-[#DEC91F] text-[#21388D] px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-[#F4E053] hover:scale-105 transition-all text-center w-fit text-sm sm:text-base">Começar a Ganhar Pontos</Link>
                  <p className="text-xs text-gray-400 mt-3">Mais valor para você.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Depoimentos */}
          <section className="bg-white py-12 sm:py-20 mb-20 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <h2 className="text-[#21388D] text-2xl sm:text-3xl md:text-4xl font-light text-center mb-4 tracking-wide">O Que Nossos Clientes Dizem</h2>
              <p className="text-[#7D8FA4] text-center mb-8 sm:mb-12 text-sm sm:text-base">Mais de 2.847 famílias felizes em todo o Brasil</p>
              <div className="relative h-auto min-h-[250px] sm:min-h-[280px]">
                {testimonials.map((testimonial, idx) => (
                  <div key={idx} className={`absolute inset-0 transition-all duration-1000 ${idx === currentTestimonial ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    <div className="bg-[#EAD9B9] rounded-[10px] shadow-xl p-6 sm:p-8 max-w-3xl mx-auto">
                      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <img 
                            src={testimonial.image} 
                            alt={`${testimonial.name} - Cliente Feliz BrinqueTEAndo`} 
                            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-[#DEC91F]" 
                            width="64" 
                            height="64"
                            loading="lazy"
                            decoding="async"
                        />
                        <div>
                          <p className="font-semibold text-[#21388D] text-sm sm:text-base">{testimonial.name}</p>
                          <div className="flex gap-1">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-[#DEC91F]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-[#7C3D36] text-base sm:text-lg italic leading-relaxed">"{testimonial.text}"</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-2 mt-6 sm:mt-8">
                {testimonials.map((_, idx) => (
                  <button key={idx} onClick={() => setCurrentTestimonial(idx)} className={`h-2 rounded-full transition-all ${idx === currentTestimonial ? 'bg-[#DEC91F] w-8' : 'bg-[#7D8FA4]/30 w-2'}`} aria-label={`Ver depoimento ${idx + 1}`}/>
                ))}
              </div>
            </div>
          </section>

          
          {/* NOVA: SEÇÃO DE ENTREGA POR REGIÃO */}
          <section className="bg-gradient-to-b from-white to-[#8ECAE7] py-16 sm:py-20 mb-20 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
              <h2 className="text-[#21388D] text-2xl sm:text-3xl md:text-4xl font-light text-center mb-4 tracking-wide">
                Brinquedos Terapêuticos Entregues em Todo Brasil
              </h2>
              <p className="text-[#7D8FA4] text-center mb-12 text-sm sm:text-base mx-auto">
                Entrega rápida e confiável para todas as regiões do país
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow">
                  <div className="text-4xl mb-4">🏙️</div>
                  <h3 className="text-xl font-semibold text-[#21388D] mb-3">Sudeste</h3>
                  <p className="text-[#7D8FA4] text-sm leading-relaxed">
                    Entrega expressa para São Paulo, Rio de Janeiro, Belo Horizonte, Campinas, Vitória e toda região Sudeste
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow">
                  <div className="text-4xl mb-4">🌴</div>
                  <h3 className="text-xl font-semibold text-[#21388D] mb-3">Nordeste</h3>
                  <p className="text-[#7D8FA4] text-sm leading-relaxed">
                    Entrega rápida para Salvador, Recife, Fortaleza, Natal, João Pessoa, Maceió e toda região Nordeste
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow">
                  <div className="text-4xl mb-4">🌲</div>
                  <h3 className="text-xl font-semibold text-[#21388D] mb-3">Sul</h3>
                  <p className="text-[#7D8FA4] text-sm leading-relaxed">
                    Entrega ágil para Curitiba, Porto Alegre, Florianópolis, Joinville, Londrina e toda região Sul
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow">
                  <div className="text-4xl mb-4">🌎</div>
                  <h3 className="text-xl font-semibold text-[#21388D] mb-3">Centro-Oeste e Norte</h3>
                  <p className="text-[#7D8FA4] text-sm leading-relaxed">
                    Entrega confiável para Brasília, Goiânia, Manaus, Belém, Cuiabá e todo Centro-Oeste e Norte
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Imagens das Coleções */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-12 w-full">
            <h2 className="text-[#21388D] text-2xl sm:text-3xl md:text-4xl font-light text-center mb-8 sm:mb-12 tracking-wide">COMPRE COLEÇÕES DE BRINQUEDOS TERAPÊUTICOS</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link to="/collections/lancamentos" className="group relative h-64 sm:h-72 md:h-80 overflow-hidden rounded-[10px] shadow-lg hover:shadow-2xl transition-shadow">
                <img 
                  src="https://cdn.shopify.com/s/files/1/0778/2921/0327/files/new_arrival.avif?v=1765510544" 
                  alt="Novos Brinquedos Terapêuticos - Lançamentos Brasil" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="800"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#21388D]/90 via-transparent to-transparent"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <h3 className="text-white text-xl sm:text-2xl font-light tracking-wider mb-2 text-center">LANÇAMENTOS</h3>
                  <span className="text-[#DEC91F] text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">COMPRAR →</span>
                </div>
              </Link>
              <Link to="/collections/sensoriais" className="group relative h-64 sm:h-72 md:h-80 overflow-hidden rounded-[10px] shadow-lg hover:shadow-2xl transition-shadow">
                <img 
                  src="https://cdn.shopify.com/s/files/1/0778/2921/0327/files/sport_collection.avif?v=1765510563" 
                  alt="Brinquedos Sensoriais - Estimulação e Desenvolvimento" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="800"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#21388D]/90 via-transparent to-transparent"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <h3 className="text-white text-xl sm:text-2xl font-light tracking-wider mb-2 text-center">SENSORIAIS</h3>
                  <span className="text-[#DEC91F] text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">COMPRAR →</span>
                </div>
              </Link>
              <Link to="/collections/fidgets" className="group relative h-64 sm:h-72 md:h-80 overflow-hidden rounded-[10px] shadow-lg hover:shadow-2xl transition-shadow sm:col-span-2 lg:col-span-1">
                <img 
                  src="https://cdn.shopify.com/s/files/1/0778/2921/0327/files/Fossil.avif?v=1765510524" 
                  alt="Fidget Toys - Brinquedos Anti-Stress e Calmantes" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="800"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#21388D]/90 via-transparent to-transparent"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <h3 className="text-white text-xl sm:text-2xl font-light tracking-wider mb-2 text-center">FIDGET TOYS</h3>
                  <span className="text-[#DEC91F] text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">COMPRAR →</span>
                </div>
              </Link>
            </div>
          </section>

          {/* Produtos em Destaque */}
          <section className="bg-white py-12 sm:py-16 md:py-20 mb-16 sm:mb-20 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <h2 className="text-[#21388D] text-2xl sm:text-3xl md:text-4xl font-light text-center mb-8 sm:mb-12 tracking-wide">BRINQUEDOS TERAPÊUTICOS EM DESTAQUE</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {products.nodes.slice(0, 8).map(p => (
                  <Link key={p.id} to={`/products/${getProductHandle(p.handle)}`} className="group">
                    <div className="relative aspect-square mb-3 sm:mb-4 overflow-hidden rounded-[10px] bg-[#EAD9B9] shadow-md sm:shadow-lg group-hover:shadow-xl transition-shadow">
                      {p.featuredImage && (
                        <Image 
                          data={p.featuredImage} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                          aspectRatio="1/1"
                          alt={p.featuredImage.altText || `${p.title} - Brinquedo Terapêutico Brasil`}
                          loading="lazy"
                        />
                      )}
                    </div>
                    <div className="text-center px-2">
                      <p className="text-[#DEC91F] text-xs tracking-widest mb-1 uppercase font-semibold line-clamp-1">{p.vendor || 'BRIQUETEANDO'}</p>
                      <h3 className="text-[#21388D] font-light mb-2 hover:text-[#3292D8] transition-colors text-xs sm:text-sm line-clamp-2">{p.title}</h3>
                      <Money data={p.priceRange.minVariantPrice} className="text-[#7C3D36] font-medium text-xs sm:text-sm"/>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

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

const HEADER_MENU_QUERY = `#graphql
  fragment IndexHeaderMenuItem on MenuItem {
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
  query IndexHeaderMenu($headerMenuHandle: String!) {
    menu(handle: $headerMenuHandle) {
      id
      items {
        ...IndexHeaderMenuItem
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

function BrinqueTEAndoNavigation({ menu }) {
  const menuItems = menu?.items || [];
  
  // Menu padrão caso não tenha menu da Shopify
  const defaultMenuItems = [
    { title: 'Início', url: '/' },
    { title: '🧸 Brinquedos Terapêuticos', url: '/collections/brinquedos-terapeuticos' },
    { title: '🌈 Por Necessidade', url: '/collections/por-necessidade' },
    { title: '🎒 Por Idade', url: '/collections/por-idade' },
    { title: '💡 Ambiente & Rotina', url: '/collections/ambiente-rotina' },
    { title: '💙 Apoio aos Pais', url: '/pages/apoio-aos-pais' }
  ];

  const navItems = menuItems.length > 0 ? menuItems : defaultMenuItems;

  return (
    <nav className="bg-[#EAD9B9] border-y border-[#DEC91F] py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl sm:text-3xl font-bold text-[#21388D] tracking-wider hover:text-[#3292D8] transition-colors">
            BrinqueTEAndo
          </Link>
          
          {/* Menu Desktop */}
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item, idx) => (
              <Link
                key={item.id || idx}
                to={item.url?.replace('https://briqueteando.com.br', '').replace('https://briqueteando.myshopify.com', '') || '/'}
                className="text-[#21388D] hover:text-[#CF111A] font-medium text-sm tracking-wide transition-colors whitespace-nowrap"
              >
                {item.title}
              </Link>
            ))}
          </div>

          {/* Ícones */}
          <div className="flex items-center gap-4">
            <Link to="/search" className="text-[#21388D] hover:text-[#CF111A] transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>
            <Link to="/account" className="text-[#21388D] hover:text-[#CF111A] transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>
            <Link to="/cart" className="text-[#21388D] hover:text-[#CF111A] transition-colors relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l1.5 6m6-6v6m-3-6v6m6-6l1.5 6" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Menu Mobile */}
        <div className="lg:hidden mt-4 flex flex-wrap gap-2 justify-center">
          {navItems.map((item, idx) => (
            <Link
              key={item.id || idx}
              to={item.url?.replace('https://briqueteando.com.br', '').replace('https://briqueteando.myshopify.com', '') || '/'}
              className="text-[#21388D] hover:text-[#CF111A] font-medium text-xs tracking-wide transition-colors bg-white/50 px-3 py-2 rounded-full"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

function BrinqueTEAndoFooter({ menu }) {
  const menuItems = menu?.items || [];
  return (
    <footer className="relative bg-gradient-to-b from-[#21388D] via-[#3292D8] to-[#21388D] text-white overflow-hidden w-full">
      {/* Padrão de Fundo Decorativo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #DEC91F 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      {/* Seção de Newsletter */}
      <div className="relative border-b border-[#DEC91F]/20 w-full">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-4xl font-light text-[#DEC91F] mb-3 tracking-wide">
                Junte-se à Nossa Comunidade
              </h3>
              <p className="text-gray-300 text-lg">
                Acesso exclusivo a lançamentos, ofertas especiais e dicas para pais de crianças com TDAH, Autismo e TEA.
              </p>
            </div>
            <FooterNewsletterForm />
          </div>
        </div>
      </div>

      {/* Conteúdo Principal do Footer */}
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Seção da Marca */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6 group">
              <div className="text-5xl font-serif text-white tracking-[0.3em] group-hover:text-[#DEC91F] transition-colors duration-300">
                BRIQUETEANDO
              </div>
              <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-[#DEC91F] to-transparent transition-all duration-500 mt-2"></div>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-xs">
              Criando alegria e desenvolvimento através de brinquedos terapêuticos. Cada brinquedo é pensado para ajudar crianças com TDAH, Autismo e TEA a se desenvolverem com amor e diversão.
            </p>
            
            {/* Selos de Confiança */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-full bg-[#DEC91F]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#DEC91F]">✓</span>
                </div>
                <span className="text-gray-300">Garantia de 1 Ano</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-full bg-[#DEC91F]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#DEC91F]">✓</span>
                </div>
                <span className="text-gray-300">Frete Grátis para Todo Brasil</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-full bg-[#DEC91F]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#DEC91F]">✓</span>
                </div>
                <span className="text-gray-300">Checkout Seguro</span>
              </div>
            </div>
          </div>

          {/* Links de Compras */}
          <div>
            <h4 className="text-[#DEC91F] text-sm font-bold mb-6 uppercase tracking-widest relative inline-block">
              Explorar Brinquedos
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#DEC91F] to-transparent"></div>
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/collections/lancamentos" className="text-gray-300 hover:text-[#DEC91F] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Lançamentos
                </Link>
              </li>
              <li>
                <Link to="/collections/tdah" className="text-gray-300 hover:text-[#DEC91F] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Brinquedos TDAH
                </Link>
              </li>
              <li>
                <Link to="/collections/autismo-tea" className="text-gray-300 hover:text-[#DEC91F] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Brinquedos Autismo/TEA
                </Link>
              </li>
              <li>
                <Link to="/collections/sensoriais" className="text-gray-300 hover:text-[#DEC91F] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Sensoriais
                </Link>
              </li>
              <li>
                <Link to="/collections/fidgets" className="text-gray-300 hover:text-[#DEC91F] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Fidget Toys
                </Link>
              </li>
              <li>
                <Link to="/collections/calmantes" className="text-gray-300 hover:text-[#DEC91F] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Calmantes
                </Link>
              </li>
              <li>
                <Link to="/blogs/dicas" className="text-gray-300 hover:text-[#DEC91F] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Blog de Dicas
                </Link>
              </li>
            </ul>
          </div>

          {/* Links de Suporte */}
          <div>
            <h4 className="text-[#DEC91F] text-sm font-bold mb-6 uppercase tracking-widest relative inline-block">
              Suporte
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#DEC91F] to-transparent"></div>
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/pages/faq" className="text-gray-300 hover:text-[#DEC91F] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Perguntas Frequentes
                </Link>
              </li>
              <li>
                <Link to="/pages/devolucoes" className="text-gray-300 hover:text-[#DEC91F] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Devoluções e Reembolsos
                </Link>
              </li>
              <li>
                <Link to="/pages/politica-envio" className="text-gray-300 hover:text-[#DEC91F] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Política de Envio
                </Link>
              </li>
              <li>
                <Link to="/pages/contato" className="text-gray-300 hover:text-[#DEC91F] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Fale Conosco
                </Link>
              </li>
              <li>
                <Link to="/pages/garantia" className="text-gray-300 hover:text-[#DEC91F] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Garantia
                </Link>
              </li>
            </ul>
          </div>

          {/* Links da Empresa */}
          <div>
            <h4 className="text-[#DEC91F] text-sm font-bold mb-6 uppercase tracking-widest relative inline-block">
              Empresa
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#DEC91F] to-transparent"></div>
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/pages/nossa-historia" className="text-gray-300 hover:text-[#DEC91F] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Nossa História
                </Link>
              </li>
              <li>
                <Link to="/pages/carreiras" className="text-gray-300 hover:text-[#DEC91F] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Carreiras
                </Link>
              </li>
              <li>
                <Link to="/pages/imprensa" className="text-gray-300 hover:text-[#DEC91F] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Imprensa
                </Link>
              </li>
              <li>
                <Link to="/pages/politica-privacidade" className="text-gray-300 hover:text-[#DEC91F] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link to="/pages/termos-servico" className="text-gray-300 hover:text-[#DEC91F] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Termos de Serviço
                </Link>
              </li>
              <li>
                <Link to="/pages/politica-cookies" className="text-gray-300 hover:text-[#DEC91F] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Política de Cookies
                </Link>
              </li>
              <li>
                <Link to="/pages/lgpd" className="text-gray-300 hover:text-[#DEC91F] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Suas Escolhas de Privacidade
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-[#DEC91F]/20 pt-12">
          <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
            
            {/* Redes Sociais */}
            <div>
              <h4 className="text-[#DEC91F] text-sm font-semibold mb-4 uppercase tracking-wider">
                Siga Nossa Jornada
              </h4>
              <div className="flex gap-3">
                <a 
                  href="https://www.facebook.com/briqueteando" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-11 h-11 flex items-center justify-center bg-white/5 backdrop-blur-sm border border-[#DEC91F]/30 rounded-lg hover:bg-[#DEC91F] hover:border-[#DEC91F] transition-all duration-300 hover:scale-110 group"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5 text-[#DEC91F] group-hover:text-[#21388D]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.instagram.com/briqueteando/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-11 h-11 flex items-center justify-center bg-white/5 backdrop-blur-sm border border-[#DEC91F]/30 rounded-lg hover:bg-[#DEC91F] hover:border-[#DEC91F] transition-all duration-300 hover:scale-110 group"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5 text-[#DEC91F] group-hover:text-[#21388D]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.youtube.com/@briqueteando" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-11 h-11 flex items-center justify-center bg-white/5 backdrop-blur-sm border border-[#DEC91F]/30 rounded-lg hover:bg-[#DEC91F] hover:border-[#DEC91F] transition-all duration-300 hover:scale-110 group"
                  aria-label="YouTube"
                >
                  <svg className="w-5 h-5 text-[#DEC91F] group-hover:text-[#21388D]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.tiktok.com/@briqueteando" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-11 h-11 flex items-center justify-center bg-white/5 backdrop-blur-sm border border-[#DEC91F]/30 rounded-lg hover:bg-[#DEC91F] hover:border-[#DEC91F] transition-all duration-300 hover:scale-110 group"
                  aria-label="TikTok"
                >
                  <svg className="w-5 h-5 text-[#DEC91F] group-hover:text-[#21388D]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.pinterest.com/briqueteando/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-11 h-11 flex items-center justify-center bg-white/5 backdrop-blur-sm border border-[#DEC91F]/30 rounded-lg hover:bg-[#DEC91F] hover:border-[#DEC91F] transition-all duration-300 hover:scale-110 group"
                  aria-label="Pinterest"
                >
                  <svg className="w-5 h-5 text-[#DEC91F] group-hover:text-[#21388D]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0a12 12 0 0 0-4.37 23.17c-.1-.86-.19-2.27 0-3.25l1.24-5.36s-.31-.63-.31-1.56c0-1.46.85-2.55 1.9-2.55.9 0 1.33.67 1.33 1.47 0 .9-.57 2.24-.86 3.48-.25 1.02.51 1.85 1.51 1.85 1.81 0 3.21-1.91 3.21-4.66 0-2.44-1.75-4.15-4.25-4.15-2.9 0-4.6 2.17-4.6 4.42 0 .87.34 1.81.76 2.32.08.1.19.07.29l-.28 1.16c-.04.18-.15.22-.34.13-1.27-.59-2.06-2.44-2.06-3.93 0-3.21 2.33-6.15 6.72-6.15 3.53 0 6.27 2.51 6.27 5.87 0 3.5-2.21 6.32-5.27 6.32-1.03 0-2-.53-2.33-1.16l-.63 2.41c-.23.88-.85 1.98-1.27 2.65A12 12 0 1 0 12 0z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Métodos de Pagamento */}
            <div className="text-right">
              <h4 className="text-[#DEC91F] text-sm font-semibold mb-4 uppercase tracking-wider">
                Pagamento Seguro
              </h4>
              <div className="flex justify-end gap-2 flex-wrap">
                {['Visa', 'Mastercard', 'PIX', 'Boleto', 'Elo', 'Hipercard'].map((method) => (
                  <div 
                    key={method}
                    className="px-3 py-2 bg-white/10 backdrop-blur-sm border border-[#DEC91F]/20 rounded text-xs text-gray-300 font-medium"
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Direitos Autorais */}
          <div className="pt-8 border-t border-[#DEC91F]/20">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
              <p>
                © {new Date().getFullYear()} BrinqueTEAndo. Todos os direitos reservados. Brinquedos Terapêuticos com Amor.
              </p>
              <div className="flex items-center gap-4">
                <span className="text-[#DEC91F]">★★★★★</span>
                <span>Avaliado 4.9/5 por 2.847+ famílias</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Linha Decorativa Inferior */}
      <div className="h-1 bg-gradient-to-r from-transparent via-[#DEC91F] to-transparent"></div>
    </footer>
  );
}