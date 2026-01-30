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
    // PRIMARY META TAGS
    {title: 'Brinquedos Educativos TEA, TDAH e Autismo | Litoral de São Paulo | BrincarEAprender'},
    {name: 'description', content: 'Loja especializada em brinquedos terapêuticos e educativos para crianças com TEA, TDAH e Autismo. Frete grátis para Praia Grande, Santos e São Vicente. Produtos sensoriais, pedagógicos e de desenvolvimento.'},
    
    // --- VERIFICAÇÕES E OTIMIZAÇÕES ---
    // Facebook Domain Verification
    {name: 'facebook-domain-verification', content: 'SEU_CODIGO_AQUI'},
    
    // GEO-TARGETING META TAGS - LITORAL DE SÃO PAULO
    {name: 'geo.region', content: 'BR-SP'},
    {name: 'geo.placename', content: 'Praia Grande;Santos;São Vicente;Guarujá;Bertioga;Mongaguá;Itanhaém;Peruíbe;Cubatão'},
    {name: 'geo.position', content: '-23.9618;-46.3322'}, // Coordenadas de Praia Grande
    
    // ENHANCED KEYWORDS (Location-based & Long-tail para TEA/TDAH/Autismo)
    {name: 'keywords', content: 'brinquedos TEA, brinquedos autismo, brinquedos TDAH, brinquedos educativos especiais, brinquedos sensoriais praia grande, brinquedos terapêuticos santos, brinquedos pedagógicos são vicente, loja autismo litoral sp, brinquedos inclusivos baixada santista, estimulação sensorial, desenvolvimento infantil TEA, jogos educativos autismo, brinquedos motricidade, integração sensorial, material ABA, brinquedos Montessori TEA'},
    
    // LANGUAGE TARGETING
    {httpEquiv: 'content-language', content: 'pt-BR'},
    
    // ENHANCED OPEN GRAPH TAGS
    {property: 'og:title', content: 'BrincarEAprender | Brinquedos TEA, TDAH e Autismo | Litoral SP'},
    {property: 'og:description', content: 'Brinquedos educativos e terapêuticos para crianças com TEA, TDAH e Autismo. Frete grátis para Praia Grande, Santos e São Vicente. Especialistas em desenvolvimento infantil.'},
    {property: 'og:type', content: 'website'},
    {property: 'og:url', content: 'https://SEU_DOMINIO.com.br'},
    {property: 'og:image', content: 'https://SEU_CDN/imagem-compartilhamento.jpg'},
    {property: 'og:image:width', content: '1200'},
    {property: 'og:image:height', content: '630'},
    {property: 'og:site_name', content: 'BrincarEAprender'},
    {property: 'og:locale', content: 'pt_BR'},
    
    // TWITTER CARDS
    {name: 'twitter:card', content: 'summary_large_image'},
    {name: 'twitter:title', content: 'Brinquedos TEA, TDAH e Autismo - Litoral SP'},
    {name: 'twitter:description', content: 'Brinquedos educativos e sensoriais. Frete grátis para Praia Grande, Santos e São Vicente.'},
    {name: 'twitter:image', content: 'https://SEU_CDN/imagem-compartilhamento.jpg'},
    
    // ENHANCED ROBOTS & INDEXING
    {name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'},
    {name: 'googlebot', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'},
    
    // MOBILE OPTIMIZATION
    {name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=5'},
    {name: 'mobile-web-app-capable', content: 'yes'},
    {name: 'apple-mobile-web-app-capable', content: 'yes'},
    
    // THEME COLOR - Paleta acolhedora e educativa
    {name: 'theme-color', content: '#4A90E2'},
    
    // CANONICAL URL
    {tagName: 'link', rel: 'canonical', href: 'https://SEU_DOMINIO.com.br'},
    
    // HREFLANG - Brasil
    {tagName: 'link', rel: 'alternate', hreflang: 'pt-br', href: 'https://SEU_DOMINIO.com.br'},
    {tagName: 'link', rel: 'alternate', hreflang: 'x-default', href: 'https://SEU_DOMINIO.com.br'},
    
    // PRECONNECT & DNS-PREFETCH
    {tagName: 'link', rel: 'preconnect', href: 'https://cdn.shopify.com'},
    {tagName: 'link', rel: 'dns-prefetch', href: 'https://cdn.shopify.com'},
    
    // PRELOAD CRITICAL RESOURCES
    {tagName: 'link', rel: 'preload', as: 'image', href: 'https://SEU_CDN/hero-image.jpg', attributes: {fetchpriority: 'high'}},
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
  const [currentPromo, setCurrentPromo] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // COMPREHENSIVE STRUCTURED DATA (Multiple Schema Types) - Adaptado para Brinquedos TEA/TDAH
  const schemaOrgJSON = [
    // Organization Schema
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "BrincarEAprender - Brinquedos TEA e Autismo",
      "url": "https://SEU_DOMINIO.com.br",
      "logo": "https://SEU_CDN/logo.png",
      "description": "Loja especializada em brinquedos educativos e terapêuticos para crianças com TEA, TDAH e Autismo no Litoral de São Paulo.",
      "foundingDate": "2024",
      "areaServed": [
        {"@type": "City", "name": "Praia Grande", "addressRegion": "SP", "addressCountry": "BR"},
        {"@type": "City", "name": "Santos", "addressRegion": "SP", "addressCountry": "BR"},
        {"@type": "City", "name": "São Vicente", "addressRegion": "SP", "addressCountry": "BR"},
        {"@type": "City", "name": "Guarujá", "addressRegion": "SP", "addressCountry": "BR"},
        {"@type": "City", "name": "Bertioga", "addressRegion": "SP", "addressCountry": "BR"}
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+55-13-XXXX-XXXX",
        "contactType": "Atendimento ao Cliente",
        "areaServed": "BR",
        "availableLanguage": ["Portuguese"]
      },
      "sameAs": [
        "https://www.instagram.com/SEU_INSTAGRAM/",
        "https://www.facebook.com/SEU_FACEBOOK"
      ]
    },
    // LocalBusiness Schema
    {
      "@context": "https://schema.org",
      "@type": "Store",
      "name": "BrincarEAprender - Loja Online",
      "image": "https://SEU_CDN/loja-image.jpg",
      "url": "https://SEU_DOMINIO.com.br",
      "priceRange": "R$-R$$",
      "currenciesAccepted": "BRL",
      "paymentAccepted": "Cartão de Crédito, PIX, Boleto",
      "address": {
        "@type": "PostalAddress",
        "addressRegion": "SP",
        "addressCountry": "BR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "-23.9618",
        "longitude": "-46.3322"
      },
      "areaServed": [
        {"@type": "City", "name": "Praia Grande"},
        {"@type": "City", "name": "Santos"},
        {"@type": "City", "name": "São Vicente"}
      ]
    },
    // Product Collection Schema
    {
      "@context": "https://schema.org",
      "@type": "OfferCatalog",
      "name": "Catálogo de Brinquedos Educativos TEA e Autismo",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Brinquedos Sensoriais",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "Brinquedos Sensoriais para TEA",
                "description": "Brinquedos para estimulação sensorial e desenvolvimento",
                "offers": {
                  "@type": "AggregateOffer",
                  "priceCurrency": "BRL",
                  "lowPrice": "29.90",
                  "highPrice": "299.90",
                  "availability": "https://schema.org/InStock"
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
                "name": "Brinquedos Educativos para TDAH",
                "description": "Jogos e brinquedos para desenvolvimento cognitivo",
                "offers": {
                  "@type": "AggregateOffer",
                  "priceCurrency": "BRL",
                  "lowPrice": "39.90",
                  "highPrice": "399.90",
                  "availability": "https://schema.org/InStock"
                }
              }
            }
          ]
        }
      ]
    },
    // FAQ Schema - Específico para TEA/TDAH
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Vocês fazem entrega em Praia Grande, Santos e São Vicente?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim! Oferecemos FRETE GRÁTIS para Praia Grande, Santos e São Vicente. Para outras cidades do litoral paulista, consulte as condições especiais."
          }
        },
        {
          "@type": "Question",
          "name": "Os brinquedos são adequados para crianças com autismo?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Todos os nossos produtos são cuidadosamente selecionados por especialistas para atender às necessidades de crianças com TEA, TDAH e Autismo, focando em desenvolvimento sensorial, motor e cognitivo."
          }
        },
        {
          "@type": "Question",
          "name": "Quais brinquedos ajudam no desenvolvimento de crianças com TDAH?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Oferecemos brinquedos que auxiliam na concentração, coordenação motora, controle de impulsos e organização. Nossa equipe pode orientar na escolha ideal para cada criança."
          }
        }
      ]
    }
  ];

  const promoMessages = [
    "🎁 FRETE GRÁTIS para Praia Grande, Santos e São Vicente!",
    "🧩 Brinquedos Sensoriais e Educativos para TEA, TDAH e Autismo",
    "📦 Entrega Rápida no Litoral Paulista",
    "💙 Especialistas em Desenvolvimento Infantil",
    "🎓 Produtos Recomendados por Terapeutas",
    "⭐ Parcele em até 12x sem juros"
  ];

  const testimonials = [
    {
      name: "Marina S., Praia Grande", 
      text: "Os brinquedos sensoriais ajudaram muito meu filho com autismo! A equipe é super atenciosa e entende das necessidades especiais.", 
      rating: 5
    },
    {
      name: "Roberto L., Santos", 
      text: "Encontrei tudo que precisava para a terapia da minha filha com TDAH. Entrega rápida e produtos de qualidade excelente!", 
      rating: 5
    },
    {
      name: "Juliana M., São Vicente", 
      text: "Loja maravilhosa! Os brinquedos educativos fazem toda diferença no desenvolvimento do meu filho. Super recomendo!", 
      rating: 5
    },
    {
      name: "Carlos A., Guarujá", 
      text: "Produtos incríveis e atendimento especializado. Vocês realmente entendem do que as crianças com TEA precisam.", 
      rating: 5
    }
  ];

  useEffect(() => {
    const promoTimer = setInterval(() => setCurrentPromo((p) => (p + 1) % promoMessages.length), 4000);
    return () => clearInterval(promoTimer);
  }, []);

  useEffect(() => {
    const testimonialTimer = setInterval(() => setCurrentTestimonial((p) => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(testimonialTimer);
  }, []);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schemaOrgJSON)}} />
      
      {/* ESTILOS CUSTOMIZADOS - Paleta Acolhedora e Educativa */}
      <style>{`
        header { display: none !important; }
        [class*="Header"] { display: none !important; }
        div[data-testid="header"] { display: none !important; }
        nav[data-testid="header-nav"] { display: none !important; }
        
        /* PREVENT HORIZONTAL SCROLL */
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

        /* Animação para banner rotativo */
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: fit-content;
          animation: marquee-scroll 35s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      <main role="main" aria-label="BrincarEAprender - Brinquedos TEA, TDAH e Autismo" className="bg-gradient-to-b from-[#F0F8FF] to-white flex flex-col min-h-screen w-full overflow-x-hidden">
        <div className="flex-grow w-full">
          
          {/* Top Bar - Frete Grátis */}
          <div className="bg-gradient-to-r from-[#4A90E2] via-[#5BA3F5] to-[#4A90E2] text-white py-3 text-center w-full shadow-md">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-4 flex-wrap">
              <span className="text-sm md:text-base font-bold tracking-wide">
                🎁 FRETE GRÁTIS para Praia Grande, Santos e São Vicente 🚚
              </span>
            </div>
          </div>

          {/* Banner Rotativo Informativo */}
          <div className="w-full bg-gradient-to-r from-[#FFB84D] via-[#FFC670] to-[#FFB84D] border-y-2 border-[#E09F3E] overflow-hidden py-3 relative z-20 shadow-lg">
            <div className="absolute inset-0 pointer-events-none opacity-10" style={{backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '15px 15px'}}></div>
            <div className="animate-marquee flex items-center">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="flex items-center mx-8 whitespace-nowrap">
                   <span className="text-2xl mr-3 filter drop-shadow-md">🧩</span>
                   <span className="text-[#2C3E50] font-semibold text-lg tracking-wide uppercase drop-shadow-sm">
                     Brinquedos Sensoriais • Educativos • Terapêuticos para TEA, TDAH e Autismo
                   </span>
                   <span className="text-2xl ml-3 filter drop-shadow-md">💙</span>
                   
                   <div className="ml-8 flex items-center gap-2 opacity-70">
                     <span className="text-[#4A90E2] text-xs">✦</span>
                     <span className="w-16 h-[1px] bg-[#4A90E2]"></span>
                     <span className="text-[#4A90E2] text-xs">✦</span>
                   </div>
                </div>
              ))}
            </div>
          </div>

          {/* Seção de Destaque - Benefícios */}
          <div className="grid md:grid-cols-2 gap-0 w-full">
            <div className="bg-gradient-to-r from-[#7CB9E8] via-[#4A90E2] to-[#7CB9E8] py-8 px-6 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.1) 10px, rgba(255,255,255,.1) 20px)'}}></div>
              <div className="relative z-10 max-w-4xl mx-auto">
                <h2 className="text-white text-3xl md:text-4xl font-light mb-6 tracking-wide text-center">
                  💙 Desenvolvimento <span className="text-[#FFB84D] font-bold italic text-5xl">&</span> Aprendizado
                </h2>
                <p className="text-white text-lg font-semibold mb-4 text-center">
                  🎁 Brinquedos que transformam o aprendizado em diversão
                </p>
                <p className="text-sm text-white/90 text-center">Produtos selecionados por especialistas em TEA, TDAH e Autismo</p>
              </div>
            </div>

            <div className="bg-gradient-to-b from-white to-[#F0F8FF] border-l-2 border-[#4A90E2] py-8 px-4 sm:px-6">
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-center">
                  <div className="w-full sm:w-auto">
                    <h3 className="text-3xl sm:text-4xl font-bold text-[#2C3E50] mb-1 whitespace-nowrap">Qualidade</h3>
                    <p className="text-xs sm:text-sm text-[#5A6C7D]">Certificada</p>
                  </div>
                  <span className="text-4xl sm:text-5xl text-[#FFB84D] font-serif italic self-center">+</span>
                  <div className="w-full sm:w-auto">
                    <h3 className="text-3xl sm:text-4xl font-bold text-[#2C3E50] mb-1 whitespace-nowrap">Frete Grátis</h3>
                    <p className="text-xs sm:text-sm text-[#5A6C7D]">Litoral SP</p>
                  </div>
                  <span className="text-xl sm:text-2xl text-[#5A6C7D] font-medium self-center">+</span>
                  <div className="w-full sm:w-auto">
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#2C3E50] mb-1 whitespace-nowrap">12x sem juros</h3>
                    <p className="text-xs sm:text-sm text-[#5A6C7D]">Parcele fácil</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Promo Ticker */}
          <div className="bg-[#FF6B6B] text-white py-3 overflow-hidden relative w-full">
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
          <div className="bg-[#F8F9FA] border-b border-[#4A90E2]/30 w-full">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="text-xl font-semibold text-[#2C3E50]">🎯 COMPRE COM CONFIANÇA:</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
                <div className="flex items-start justify-center md:justify-start gap-3">
                  <div>
                    <p className="text-[#2C3E50] font-semibold mb-1"><span className="text-[#4A90E2]">Entrega</span> Garantida</p>
                    <p className="text-[#5A6C7D] text-sm">📦 Frete grátis para Praia Grande, Santos e São Vicente</p>
                  </div>
                </div>
                <div className="flex items-start justify-center gap-3">
                  <div>
                    <p className="text-[#2C3E50] font-semibold mb-1"><span className="text-[#4A90E2]">Produtos</span> Especializados</p>
                    <p className="text-[#5A6C7D] text-sm">Selecionados por terapeutas e educadores</p>
                  </div>
                </div>
                <div className="flex items-start justify-center md:justify-end gap-3">
                  <div>
                    <p className="text-[#2C3E50] font-semibold mb-1"><span className="text-[#4A90E2]">Suporte</span> Especializado</p>
                    <p className="text-[#5A6C7D] text-sm">Orientação na escolha dos brinquedos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Navigation */}
          <NavigationMenu rootData={rootData} />
          <div className="bg-[#2C3E50] text-white py-3 w-full">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <p className="text-sm font-medium tracking-wider">🧩 ESPECIALISTAS EM TEA, TDAH E AUTISMO • FRETE GRÁTIS LITORAL SP 💙</p>
            </div>
          </div>

          {/* HERO SECTION */}
          <section className="mb-12 sm:mb-16 md:mb-20 w-full px-0">
            <div className="max-w-7xl mx-auto mt-4 sm:mt-8 px-2 sm:px-4 md:px-6 w-full">
              <div className="relative h-64 sm:h-80 md:h-96 lg:h-[70vh] overflow-hidden rounded-[10px] shadow-xl sm:shadow-2xl bg-gradient-to-br from-[#4A90E2] to-[#7CB9E8]">
                {/* SUBSTITUA ESTA URL PELA SUA IMAGEM HERO */}
                <img 
                  src="https://SEU_CDN/hero-brinquedos-tea.jpg" 
                  alt="Brinquedos Educativos para TEA, TDAH e Autismo - Litoral de São Paulo"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#2C3E50]/80 to-[#2C3E50]/40 z-10"></div>
                <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 sm:px-8 md:px-16">
                  <h1 className="text-white text-3xl sm:text-5xl md:text-6xl font-bold tracking-wide mb-2 sm:mb-4">
                    Brincar & Aprender
                  </h1>
                  <p className="text-[#FFB84D] text-base sm:text-xl md:text-2xl tracking-wide mb-2 sm:mb-4 font-semibold">
                    Brinquedos Educativos para TEA, TDAH e Autismo
                  </p>
                  <p className="text-white/90 text-sm sm:text-base mb-4">
                    Desenvolvimento sensorial, cognitivo e motor através do brincar
                  </p>
                  <Link to="/collections/todos-os-produtos" className="inline-block border-2 border-[#FFB84D] bg-[#FFB84D] text-[#2C3E50] px-6 sm:px-10 py-2 sm:py-3 rounded-full hover:bg-white hover:border-white transition-all font-bold tracking-wider w-fit mt-2 sm:mt-4 text-xs sm:text-base shadow-lg">
                    EXPLORAR PRODUTOS
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Categorias Principais */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mb-20 w-full">
            <h2 className="text-[#2C3E50] text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 tracking-wide">
              Nossas Categorias Especializadas
            </h2>
            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              <div className="relative h-72 sm:h-80 md:h-96 overflow-hidden rounded-[10px] shadow-xl group">
                <img 
                  src="https://SEU_CDN/categoria-sensoriais.jpg" 
                  alt="Brinquedos Sensoriais para Autismo e TEA" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" 
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4A90E2]/90 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-8 text-white">
                  <h3 className="text-2xl sm:text-3xl font-bold mb-2 tracking-wide">Brinquedos Sensoriais</h3>
                  <p className="text-white/90 mb-4 text-sm sm:text-base">Estimulação sensorial e integração</p>
                  <Link to="/collections/brinquedos-sensoriais" className="inline-block bg-white text-[#4A90E2] px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold hover:bg-[#FFB84D] hover:text-white transition-all text-sm sm:text-base">
                    VER MAIS
                  </Link>
                </div>
              </div>

              <div className="relative h-72 sm:h-80 md:h-96 overflow-hidden rounded-[10px] shadow-xl group">
                <img 
                  src="https://SEU_CDN/categoria-educativos.jpg" 
                  alt="Brinquedos Educativos para TDAH" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" 
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FFB84D]/90 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-8 text-white">
                  <h3 className="text-2xl sm:text-3xl font-bold mb-2 tracking-wide">Brinquedos Educativos</h3>
                  <p className="text-white/90 mb-4 text-sm sm:text-base">Desenvolvimento cognitivo e aprendizado</p>
                  <Link to="/collections/brinquedos-educativos" className="inline-block bg-white text-[#FFB84D] px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold hover:bg-[#4A90E2] hover:text-white transition-all text-sm sm:text-base">
                    VER MAIS
                  </Link>
                </div>
              </div>

              <div className="relative h-72 sm:h-80 md:h-96 overflow-hidden rounded-[10px] shadow-xl group">
                <img 
                  src="https://SEU_CDN/categoria-terapeuticos.jpg" 
                  alt="Brinquedos Terapêuticos para Desenvolvimento Motor" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" 
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FF6B6B]/90 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-8 text-white">
                  <h3 className="text-2xl sm:text-3xl font-bold mb-2 tracking-wide">Brinquedos Terapêuticos</h3>
                  <p className="text-white/90 mb-4 text-sm sm:text-base">Motricidade fina e coordenação</p>
                  <Link to="/collections/brinquedos-terapeuticos" className="inline-block bg-white text-[#FF6B6B] px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold hover:bg-[#4A90E2] hover:text-white transition-all text-sm sm:text-base">
                    VER MAIS
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Products Under 100 Section */}
          <ProductsUnder100 products={under100Products} />

          {/* Seção de Benefícios */}
          <section className="bg-gradient-to-b from-[#F0F8FF] to-white py-12 sm:py-20 mb-20 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <h2 className="text-[#2C3E50] text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 tracking-wide">
                Por Que Escolher Nossa Loja?
              </h2>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow">
                  <div className="text-5xl mb-4">🎓</div>
                  <h3 className="text-xl font-semibold text-[#2C3E50] mb-3">Especialização TEA</h3>
                  <p className="text-[#5A6C7D] text-sm leading-relaxed">
                    Produtos selecionados por terapeutas ocupacionais, fonoaudiólogos e psicopedagogos especializados em TEA, TDAH e Autismo.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow">
                  <div className="text-5xl mb-4">🚚</div>
                  <h3 className="text-xl font-semibold text-[#2C3E50] mb-3">Entrega Rápida</h3>
                  <p className="text-[#5A6C7D] text-sm leading-relaxed">
                    Frete grátis para Praia Grande, Santos e São Vicente. Entrega expressa para todo o litoral paulista.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow">
                  <div className="text-5xl mb-4">💙</div>
                  <h3 className="text-xl font-semibold text-[#2C3E50] mb-3">Atendimento Humanizado</h3>
                  <p className="text-[#5A6C7D] text-sm leading-relaxed">
                    Nossa equipe está preparada para orientar e ajudar na escolha dos melhores produtos para cada necessidade.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="bg-white py-12 sm:py-20 mb-20 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <h2 className="text-[#2C3E50] text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 tracking-wide">
                Depoimentos de Famílias
              </h2>
              <p className="text-[#5A6C7D] text-center mb-8 sm:mb-12 text-sm sm:text-base">
                Milhares de famílias já confiam em nossos produtos
              </p>
              <div className="relative h-auto min-h-[250px] sm:min-h-[280px]">
                {testimonials.map((testimonial, idx) => (
                  <div key={idx} className={`absolute inset-0 transition-all duration-1000 ${idx === currentTestimonial ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    <div className="bg-gradient-to-br from-[#F0F8FF] to-white rounded-[10px] shadow-xl p-6 sm:p-8 max-w-3xl mx-auto border-2 border-[#4A90E2]/20">
                      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#4A90E2] to-[#7CB9E8] flex items-center justify-center text-white text-2xl font-bold">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-[#2C3E50] text-sm sm:text-base">{testimonial.name}</p>
                          <div className="flex gap-1">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFB84D]" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-[#2C3E50] text-base sm:text-lg italic leading-relaxed">"{testimonial.text}"</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-2 mt-6 sm:mt-8">
                {testimonials.map((_, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setCurrentTestimonial(idx)} 
                    className={`h-2 rounded-full transition-all ${idx === currentTestimonial ? 'bg-[#4A90E2] w-8' : 'bg-[#4A90E2]/30 w-2'}`} 
                    aria-label={`Ver depoimento ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Seção de Cidades Atendidas - SEO LOCAL */}
          <section className="bg-gradient-to-b from-white to-[#F0F8FF] py-16 sm:py-20 mb-20 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
              <h2 className="text-[#2C3E50] text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 tracking-wide">
                Atendemos Todo o Litoral de São Paulo
              </h2>
              <p className="text-[#5A6C7D] text-center mb-12 text-sm sm:text-base mx-auto max-w-2xl">
                Entrega rápida e segura de brinquedos educativos, sensoriais e terapêuticos para crianças com TEA, TDAH e Autismo
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
                <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow border-2 border-[#4A90E2]/20">
                  <div className="text-4xl mb-4">🏖️</div>
                  <h3 className="text-xl font-semibold text-[#2C3E50] mb-3">Praia Grande</h3>
                  <p className="text-[#5A6C7D] text-sm leading-relaxed mb-2">
                    <strong>FRETE GRÁTIS</strong> para toda a cidade
                  </p>
                  <p className="text-[#5A6C7D] text-xs">
                    Boqueirão • Guilhermina • Aviação • Caiçara • Mirim • Solemar
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow border-2 border-[#4A90E2]/20">
                  <div className="text-4xl mb-4">⚓</div>
                  <h3 className="text-xl font-semibold text-[#2C3E50] mb-3">Santos</h3>
                  <p className="text-[#5A6C7D] text-sm leading-relaxed mb-2">
                    <strong>FRETE GRÁTIS</strong> para toda a cidade
                  </p>
                  <p className="text-[#5A6C7D] text-xs">
                    Gonzaga • José Menino • Ponta da Praia • Boqueirão • Embaré
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow border-2 border-[#4A90E2]/20">
                  <div className="text-4xl mb-4">🌊</div>
                  <h3 className="text-xl font-semibold text-[#2C3E50] mb-3">São Vicente</h3>
                  <p className="text-[#5A6C7D] text-sm leading-relaxed mb-2">
                    <strong>FRETE GRÁTIS</strong> para toda a cidade
                  </p>
                  <p className="text-[#5A6C7D] text-xs">
                    Centro • Gonzaguinha • Itararé • Vila Valença • Parque das Bandeiras
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow border-2 border-[#FFB84D]/30">
                  <div className="text-4xl mb-4">🏝️</div>
                  <h3 className="text-xl font-semibold text-[#2C3E50] mb-3">Guarujá</h3>
                  <p className="text-[#5A6C7D] text-sm leading-relaxed">
                    Entrega expressa • Enseada • Pitangueiras • Astúrias • Pernambuco
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow border-2 border-[#FFB84D]/30">
                  <div className="text-4xl mb-4">🌴</div>
                  <h3 className="text-xl font-semibold text-[#2C3E50] mb-3">Bertioga</h3>
                  <p className="text-[#5A6C7D] text-sm leading-relaxed">
                    Entrega rápida • Riviera • Centro • Indaiá
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow border-2 border-[#FFB84D]/30">
                  <div className="text-4xl mb-4">🏄</div>
                  <h3 className="text-xl font-semibold text-[#2C3E50] mb-3">Outras Cidades</h3>
                  <p className="text-[#5A6C7D] text-sm leading-relaxed">
                    Mongaguá • Itanhaém • Peruíbe • Cubatão - Consulte condições
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Products */}
          <section className="bg-white py-12 sm:py-16 md:py-20 mb-16 sm:mb-20 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <h2 className="text-[#2C3E50] text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 tracking-wide">
                Produtos em Destaque
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {products.nodes.slice(0, 8).map(p => (
                  <Link key={p.id} to={`/products/${getProductHandle(p.handle)}`} className="group">
                    <div className="relative aspect-square mb-3 sm:mb-4 overflow-hidden rounded-[10px] bg-[#F0F8FF] shadow-md sm:shadow-lg group-hover:shadow-xl transition-shadow border-2 border-[#4A90E2]/10">
                      {p.featuredImage && (
                        <Image 
                          data={p.featuredImage} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                          aspectRatio="1/1"
                          alt={p.featuredImage.altText || `${p.title} - Brinquedo para TEA, TDAH e Autismo`}
                          loading="lazy"
                        />
                      )}
                    </div>
                    <div className="text-center px-2">
                      <p className="text-[#4A90E2] text-xs tracking-widest mb-1 uppercase font-semibold line-clamp-1">{p.vendor || 'BrincarEAprender'}</p>
                      <h3 className="text-[#2C3E50] font-medium mb-2 hover:text-[#4A90E2] transition-colors text-xs sm:text-sm line-clamp-2">{p.title}</h3>
                      <Money data={p.priceRange.minVariantPrice} className="text-[#FF6B6B] font-bold text-sm sm:text-base"/>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Seção Educativa - Conteúdo para SEO */}
          <section className="bg-gradient-to-b from-[#F0F8FF] to-white py-16 sm:py-20 mb-20 w-full">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <h2 className="text-[#2C3E50] text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 tracking-wide">
                Entendendo TEA, TDAH e Autismo
              </h2>
              <div className="prose prose-lg max-w-none">
                <div className="bg-white rounded-lg p-6 sm:p-8 shadow-lg mb-6">
                  <h3 className="text-[#4A90E2] text-xl sm:text-2xl font-bold mb-4">O Poder do Brincar no Desenvolvimento</h3>
                  <p className="text-[#5A6C7D] leading-relaxed mb-4">
                    Os brinquedos educativos e terapêuticos desempenham um papel fundamental no desenvolvimento de crianças com <strong>TEA (Transtorno do Espectro Autista)</strong>, <strong>TDAH (Transtorno do Déficit de Atenção com Hiperatividade)</strong> e outras necessidades especiais.
                  </p>
                  <p className="text-[#5A6C7D] leading-relaxed">
                    Nossa seleção inclui brinquedos sensoriais para estimulação tátil, visual e auditiva, jogos educativos para desenvolvimento cognitivo, materiais para terapia ocupacional e fisioterapia, além de recursos para comunicação alternativa e habilidades sociais.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-6 sm:p-8 shadow-lg">
                  <h3 className="text-[#FFB84D] text-xl sm:text-2xl font-bold mb-4">Atendimento Especializado no Litoral Paulista</h3>
                  <p className="text-[#5A6C7D] leading-relaxed mb-4">
                    Servimos com excelência as famílias de <strong>Praia Grande, Santos, São Vicente, Guarujá, Bertioga</strong> e toda a <strong>Baixada Santista</strong>, oferecendo frete grátis para as principais cidades do litoral de São Paulo.
                  </p>
                  <p className="text-[#5A6C7D] leading-relaxed">
                    Nossa equipe está preparada para orientar pais, cuidadores, terapeutas e educadores na escolha dos melhores recursos para cada fase do desenvolvimento infantil.
                  </p>
                </div>
              </div>
            </div>
          </section>

        </div>

        <BrincarFooter menu={footerMenu} />

      </main>
    </>
  );
}

// QUERIES DO SHOPIFY - MANTIDAS DO ORIGINAL
const FEATURED_COLLECTIONS_QUERY = `#graphql
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

const FEATURED_PRODUCTS_QUERY = `#graphql
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

const PRODUCTS_UNDER_100_QUERY = `#graphql
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

// FOOTER CUSTOMIZADO - Adaptado para o tema da loja
function BrincarFooter({ menu }) {
  const menuItems = menu?.items || [];
  
  return (
    <footer className="relative bg-gradient-to-b from-[#2C3E50] via-[#34495E] to-[#2C3E50] text-white overflow-hidden w-full">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #4A90E2 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      {/* Newsletter Section */}
      <div className="relative border-b border-[#4A90E2]/20 w-full">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-4xl font-bold text-[#FFB84D] mb-3 tracking-wide">
                Fique por Dentro
              </h3>
              <p className="text-gray-300 text-lg">
                Receba dicas, novidades e ofertas especiais sobre brinquedos educativos para TEA, TDAH e Autismo.
              </p>
            </div>
            <FooterNewsletterForm />
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6 group">
              <div className="text-3xl font-bold text-white group-hover:text-[#FFB84D] transition-colors duration-300">
                🧩 BrincarEAprender
              </div>
              <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-[#4A90E2] to-transparent transition-all duration-500 mt-2"></div>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Especialistas em brinquedos educativos e terapêuticos para crianças com TEA, TDAH e Autismo no Litoral de São Paulo.
            </p>
            
            {/* Trust Badges */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-full bg-[#4A90E2]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#FFB84D]">✓</span>
                </div>
                <span className="text-gray-300">Frete Grátis Litoral SP</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-full bg-[#4A90E2]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#FFB84D]">✓</span>
                </div>
                <span className="text-gray-300">Produtos Certificados</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-full bg-[#4A90E2]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#FFB84D]">✓</span>
                </div>
                <span className="text-gray-300">Parcele em 12x</span>
              </div>
            </div>
          </div>

          {/* Produtos */}
          <div>
            <h4 className="text-[#FFB84D] text-sm font-bold mb-6 uppercase tracking-widest relative inline-block">
              Produtos
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#FFB84D] to-transparent"></div>
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/collections/brinquedos-sensoriais" className="text-gray-300 hover:text-[#FFB84D] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Brinquedos Sensoriais
                </Link>
              </li>
              <li>
                <Link to="/collections/brinquedos-educativos" className="text-gray-300 hover:text-[#FFB84D] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Brinquedos Educativos
                </Link>
              </li>
              <li>
                <Link to="/collections/brinquedos-terapeuticos" className="text-gray-300 hover:text-[#FFB84D] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Brinquedos Terapêuticos
                </Link>
              </li>
              <li>
                <Link to="/collections/jogos-pedagogicos" className="text-gray-300 hover:text-[#FFB84D] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Jogos Pedagógicos
                </Link>
              </li>
              <li>
                <Link to="/collections/material-aba" className="text-gray-300 hover:text-[#FFB84D] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Material ABA
                </Link>
              </li>
            </ul>
          </div>

          {/* Atendimento */}
          <div>
            <h4 className="text-[#FFB84D] text-sm font-bold mb-6 uppercase tracking-widest relative inline-block">
              Atendimento
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#FFB84D] to-transparent"></div>
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/pages/sobre-nos" className="text-gray-300 hover:text-[#FFB84D] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/pages/perguntas-frequentes" className="text-gray-300 hover:text-[#FFB84D] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Perguntas Frequentes
                </Link>
              </li>
              <li>
                <Link to="/pages/entrega" className="text-gray-300 hover:text-[#FFB84D] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Política de Entrega
                </Link>
              </li>
              <li>
                <Link to="/pages/trocas-devolucoes" className="text-gray-300 hover:text-[#FFB84D] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Trocas e Devoluções
                </Link>
              </li>
              <li>
                <Link to="/pages/contato" className="text-gray-300 hover:text-[#FFB84D] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Fale Conosco
                </Link>
              </li>
            </ul>
          </div>

          {/* Conteúdo Educativo */}
          <div>
            <h4 className="text-[#FFB84D] text-sm font-bold mb-6 uppercase tracking-widest relative inline-block">
              Aprenda Mais
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#FFB84D] to-transparent"></div>
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/blogs/tea-autismo" className="text-gray-300 hover:text-[#FFB84D] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Blog TEA e Autismo
                </Link>
              </li>
              <li>
                <Link to="/blogs/tdah" className="text-gray-300 hover:text-[#FFB84D] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Blog TDAH
                </Link>
              </li>
              <li>
                <Link to="/pages/guia-compra" className="text-gray-300 hover:text-[#FFB84D] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Guia de Compra
                </Link>
              </li>
              <li>
                <Link to="/pages/atividades" className="text-gray-300 hover:text-[#FFB84D] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Atividades e Dicas
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-[#4A90E2]/20 pt-12">
          <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
            
            {/* Social Media */}
            <div>
              <h4 className="text-[#FFB84D] text-sm font-semibold mb-4 uppercase tracking-wider">
                Siga-nos nas Redes Sociais
              </h4>
              <div className="flex gap-3">
                <a 
                  href="https://www.instagram.com/SEU_INSTAGRAM/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-11 h-11 flex items-center justify-center bg-white/5 backdrop-blur-sm border border-[#4A90E2]/30 rounded-lg hover:bg-[#4A90E2] hover:border-[#4A90E2] transition-all duration-300 hover:scale-110 group"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5 text-[#FFB84D] group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.facebook.com/SEU_FACEBOOK/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-11 h-11 flex items-center justify-center bg-white/5 backdrop-blur-sm border border-[#4A90E2]/30 rounded-lg hover:bg-[#4A90E2] hover:border-[#4A90E2] transition-all duration-300 hover:scale-110 group"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5 text-[#FFB84D] group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a 
                  href="https://wa.me/5513XXXXXXXXX" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-11 h-11 flex items-center justify-center bg-white/5 backdrop-blur-sm border border-[#4A90E2]/30 rounded-lg hover:bg-[#25D366] hover:border-[#25D366] transition-all duration-300 hover:scale-110 group"
                  aria-label="WhatsApp"
                >
                  <svg className="w-5 h-5 text-[#FFB84D] group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="text-right">
              <h4 className="text-[#FFB84D] text-sm font-semibold mb-4 uppercase tracking-wider">
                Formas de Pagamento
              </h4>
              <div className="flex justify-end gap-2 flex-wrap">
                {['Visa', 'Mastercard', 'Elo', 'PIX', 'Boleto'].map((method) => (
                  <div 
                    key={method}
                    className="px-3 py-2 bg-white/10 backdrop-blur-sm border border-[#4A90E2]/20 rounded text-xs text-gray-300 font-medium"
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-[#4A90E2]/20">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
              <p>
                © {new Date().getFullYear()} BrincarEAprender. Todos os direitos reservados. CNPJ: XX.XXX.XXX/0001-XX
              </p>
              <div className="flex items-center gap-4">
                <Link to="/pages/privacidade" className="hover:text-[#FFB84D] transition-colors">
                  Privacidade
                </Link>
                <span>•</span>
                <Link to="/pages/termos" className="hover:text-[#FFB84D] transition-colors">
                  Termos de Uso
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Decorative Line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-[#4A90E2] to-transparent"></div>
    </footer>
  );
}