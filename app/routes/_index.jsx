// app/routes/_index.jsx
import {useLoaderData, Link, useRouteLoaderData} from 'react-router';
import {useState, useEffect} from 'react';
import {Image, Money} from '@shopify/hydrogen';

export const meta = () => {
  return [
    // META TAGS PRINCIPAIS
    {title: 'BrinqueTEAndo | Brinquedos Educativos para Autismo, TDAH e TEA | Litoral SP'},
    {name: 'description', content: 'Brinquedos educativos e terapêuticos para crianças com Autismo, TDAH e TEA. Frete grátis para Praia Grande, Santos e São Vicente. Entrega em todo Litoral de São Paulo.'},
    
    // GEO-TARGETING - LITORAL SP
    {name: 'geo.region', content: 'BR-SP'},
    {name: 'geo.placename', content: 'Praia Grande, Santos, São Vicente, Guarujá, Mongaguá, Itanhaém, Peruíbe, Cubatão, Bertioga'},
    {name: 'geo.position', content: '-24.0058;-46.4028'},
    {name: 'ICBM', content: '-24.0058, -46.4028'},
    
    // KEYWORDS OTIMIZADAS PARA TEA/TDAH/AUTISMO
    {name: 'keywords', content: 'brinquedos autismo, brinquedos TDAH, brinquedos TEA, brinquedos educativos autismo, brinquedos sensoriais, brinquedos terapêuticos, estimulação sensorial autismo, desenvolvimento infantil TEA, brinquedos inclusivos, fidget toys TDAH, brinquedos coordenação motora, brinquedos foco concentração, loja autismo santos, loja autismo praia grande, loja autismo são vicente, brinquedos especiais litoral SP, terapia ocupacional brinquedos, ABA brinquedos, intervenção precoce autismo, neurodiversidade brinquedos'},
    
    // LANGUAGE
    {httpEquiv: 'content-language', content: 'pt-BR'},
    
    // OPEN GRAPH
    {property: 'og:title', content: 'BrinqueTEAndo | Brinquedos Educativos para Autismo, TDAH e TEA'},
    {property: 'og:description', content: 'Brinquedos educativos especializados para crianças com TEA, Autismo e TDAH. Frete grátis Litoral SP. Desenvolvimento, diversão e inclusão.'},
    {property: 'og:type', content: 'website'},
    {property: 'og:url', content: 'https://brinqueteando.com.br'},
    {property: 'og:image', content: 'https://cdn.shopify.com/s/files/1/0898/4213/9629/files/brinqueteando-og.jpg'},
    {property: 'og:image:width', content: '1200'},
    {property: 'og:image:height', content: '630'},
    {property: 'og:site_name', content: 'BrinqueTEAndo'},
    {property: 'og:locale', content: 'pt_BR'},
    
    // TWITTER CARDS
    {name: 'twitter:card', content: 'summary_large_image'},
    {name: 'twitter:title', content: 'BrinqueTEAndo | Brinquedos para Autismo e TDAH'},
    {name: 'twitter:description', content: 'Brinquedos educativos para crianças com TEA, Autismo e TDAH. Frete grátis Litoral SP.'},
    
    // ROBOTS
    {name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large'},
    {name: 'googlebot', content: 'index, follow'},
    
    // MOBILE
    {name: 'viewport', content: 'width=device-width, initial-scale=1'},
    {name: 'theme-color', content: '#21388D'},
    
    // CANONICAL
    {tagName: 'link', rel: 'canonical', href: 'https://brinqueteando.com.br'},
  ];
};

export async function loader({context}) {
  const {storefront} = context;
  
  const [{collections}, {products}, {menu: headerMenu}, {menu: footerMenu}] = await Promise.all([
    storefront.query(FEATURED_COLLECTIONS_QUERY),
    storefront.query(FEATURED_PRODUCTS_QUERY),
    storefront.query(HEADER_MENU_QUERY, { variables: { headerMenuHandle: 'main-menu' } }),
    storefront.query(FOOTER_MENU_QUERY, { variables: { footerMenuHandle: 'footer' } }),
  ]);

  return {
    collections: collections?.nodes || [],
    products: products?.nodes || [],
    headerMenu,
    footerMenu,
  };
}

export default function Homepage() {
  const {collections, products, headerMenu, footerMenu} = useLoaderData();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentPromo, setCurrentPromo] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const promoMessages = [
    "🚚 FRETE GRÁTIS para Praia Grande, Santos e São Vicente!",
    "🧩 Brinquedos especializados para TEA, Autismo e TDAH",
    "💙 Desenvolvendo habilidades com amor e diversão",
    "🎁 Parcele em até 12x sem juros",
    "📦 Entrega rápida para todo Litoral de São Paulo",
  ];

  const testimonials = [
    {
      name: "Maria Silva",
      location: "Santos, SP",
      text: "Os brinquedos sensoriais fizeram uma diferença enorme no desenvolvimento do meu filho. Ele adora e eu vejo o progresso todos os dias!",
      rating: 5,
    },
    {
      name: "Carlos Eduardo",
      location: "Praia Grande, SP", 
      text: "Finalmente encontrei uma loja que entende as necessidades especiais das nossas crianças. Atendimento excepcional!",
      rating: 5,
    },
    {
      name: "Ana Paula",
      location: "São Vicente, SP",
      text: "Minha filha com TDAH consegue se concentrar muito melhor depois que começamos a usar os brinquedos da BrinqueTEAndo.",
      rating: 5,
    },
    {
      name: "Roberto Santos",
      location: "Guarujá, SP",
      text: "Qualidade incrível e entrega super rápida! Recomendo para todas as famílias do litoral.",
      rating: 5,
    },
  ];

  const benefits = [
    { icon: "🧠", title: "Desenvolvimento Cognitivo", desc: "Estimula raciocínio e aprendizado" },
    { icon: "🎯", title: "Foco e Concentração", desc: "Auxilia crianças com TDAH" },
    { icon: "🤲", title: "Coordenação Motora", desc: "Desenvolve habilidades motoras" },
    { icon: "💬", title: "Comunicação", desc: "Incentiva interação social" },
    { icon: "🌈", title: "Estímulo Sensorial", desc: "Texturas, cores e sons" },
    { icon: "❤️", title: "Regulação Emocional", desc: "Ajuda a acalmar e organizar" },
  ];

  // Structured Data para SEO
  const schemaOrgJSON = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "BrinqueTEAndo",
      "url": "https://brinqueteando.com.br",
      "logo": "https://cdn.shopify.com/s/files/1/0898/4213/9629/files/logo-brinqueteando.png",
      "description": "Loja especializada em brinquedos educativos e terapêuticos para crianças com Autismo, TEA e TDAH no Litoral de São Paulo.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Praia Grande",
        "addressRegion": "SP",
        "addressCountry": "BR"
      },
      "areaServed": [
        {"@type": "City", "name": "Praia Grande"},
        {"@type": "City", "name": "Santos"},
        {"@type": "City", "name": "São Vicente"},
        {"@type": "City", "name": "Guarujá"},
        {"@type": "City", "name": "Mongaguá"},
        {"@type": "City", "name": "Itanhaém"},
        {"@type": "City", "name": "Cubatão"},
        {"@type": "City", "name": "Bertioga"}
      ],
      "sameAs": [
        "https://www.instagram.com/brinqueteando/",
        "https://www.facebook.com/brinqueteando/"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "BrinqueTEAndo",
      "url": "https://brinqueteando.com.br",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://brinqueteando.com.br/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "BrinqueTEAndo - Brinquedos para Autismo e TDAH",
      "image": "https://cdn.shopify.com/s/files/1/0898/4213/9629/files/logo-brinqueteando.png",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Praia Grande",
        "addressRegion": "SP",
        "postalCode": "11700-000",
        "addressCountry": "BR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -24.0058,
        "longitude": -46.4028
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "847"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Vocês entregam em todo o Litoral de São Paulo?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim! Entregamos em todas as cidades do Litoral de SP. Frete grátis para Praia Grande, Santos e São Vicente."
          }
        },
        {
          "@type": "Question",
          "name": "Os brinquedos são indicados para crianças com Autismo e TDAH?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim! Nossos brinquedos são especialmente selecionados para auxiliar no desenvolvimento de crianças com TEA, Autismo e TDAH, com foco em estímulo sensorial, coordenação motora e desenvolvimento cognitivo."
          }
        }
      ]
    }
  ];

  useEffect(() => {
    const promoTimer = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % promoMessages.length);
    }, 4000);
    return () => clearInterval(promoTimer);
  }, []);

  useEffect(() => {
    const testimonialTimer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(testimonialTimer);
  }, []);

  return (
    <>
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{__html: JSON.stringify(schemaOrgJSON)}} 
      />
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-5deg); }
        }
        @keyframes pulse-gentle {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.9; }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-reverse { animation: float-reverse 7s ease-in-out infinite; }
        .animate-float-slow { animation: float 10s ease-in-out infinite; }
        .animate-pulse-gentle { animation: pulse-gentle 3s ease-in-out infinite; }
        .animate-marquee { animation: marquee 30s linear infinite; }
        
        .bg-pattern {
          background-image: 
            radial-gradient(circle at 20% 80%, rgba(50, 146, 216, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(222, 201, 31, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(207, 17, 26, 0.05) 0%, transparent 30%);
        }
        
        .floating-element {
          position: absolute;
          pointer-events: none;
          opacity: 0.15;
          z-index: 0;
        }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #21388D 0%, #3292D8 50%, #21388D 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      <main className="bg-[#FEFDF8] min-h-screen overflow-x-hidden">
        
        {/* FLOATING BACKGROUND ELEMENTS */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          {/* Puzzle Pieces */}
          <div className="floating-element animate-float" style={{top: '10%', left: '5%', fontSize: '4rem'}}>🧩</div>
          <div className="floating-element animate-float-reverse" style={{top: '30%', right: '8%', fontSize: '3rem'}}>🧩</div>
          <div className="floating-element animate-float-slow" style={{top: '60%', left: '3%', fontSize: '2.5rem'}}>🧩</div>
          <div className="floating-element animate-float" style={{top: '80%', right: '5%', fontSize: '3.5rem'}}>🧩</div>
          
          {/* Dinosaurs */}
          <div className="floating-element animate-float-reverse" style={{top: '15%', right: '15%', fontSize: '3rem'}}>🦕</div>
          <div className="floating-element animate-float-slow" style={{top: '45%', left: '8%', fontSize: '2.5rem'}}>🦖</div>
          <div className="floating-element animate-float" style={{top: '70%', right: '12%', fontSize: '2rem'}}>🦕</div>
          
          {/* Stars and Shapes */}
          <div className="floating-element animate-pulse-gentle" style={{top: '25%', left: '20%', fontSize: '2rem'}}>⭐</div>
          <div className="floating-element animate-pulse-gentle" style={{top: '55%', right: '25%', fontSize: '1.5rem'}}>✨</div>
          <div className="floating-element animate-float" style={{top: '85%', left: '15%', fontSize: '2rem'}}>🌟</div>
          
          {/* Sensory/Autism Symbols */}
          <div className="floating-element animate-float-reverse" style={{top: '5%', left: '40%', fontSize: '2rem'}}>♾️</div>
          <div className="floating-element animate-float-slow" style={{top: '40%', right: '3%', fontSize: '2.5rem'}}>🧠</div>
          <div className="floating-element animate-float" style={{top: '90%', left: '45%', fontSize: '2rem'}}>💙</div>
          
          {/* Educational Elements */}
          <div className="floating-element animate-float-reverse" style={{top: '20%', left: '70%', fontSize: '1.8rem'}}>🔢</div>
          <div className="floating-element animate-float-slow" style={{top: '75%', left: '25%', fontSize: '2rem'}}>🎨</div>
          <div className="floating-element animate-float" style={{top: '35%', left: '85%', fontSize: '1.5rem'}}>📚</div>
        </div>

        {/* TOP PROMO BAR */}
        <div className="bg-gradient-to-r from-[#21388D] via-[#3292D8] to-[#21388D] text-white py-2.5 relative z-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="relative h-6 flex items-center justify-center overflow-hidden">
              {promoMessages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
                    idx === currentPromo ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
                  }`}
                >
                  <p className="text-sm md:text-base font-medium tracking-wide text-center">{msg}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* HEADER / NAVIGATION */}
        <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b border-[#8ECAE7]/30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16 md:h-20">
              
              {/* Logo */}
              <Link to="/" className="flex items-center gap-2 group">
                <span className="text-3xl">🧩</span>
                <div>
                  <span className="text-2xl md:text-3xl font-bold">
                    <span className="text-[#3292D8]">Brinque</span>
                    <span className="text-[#CF111A]">TEA</span>
                    <span className="text-[#DEC91F]">ndo</span>
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-8">
                {headerMenu?.items?.map((item) => (
                  <Link 
                    key={item.id}
                    to={new URL(item.url).pathname}
                    className="text-[#21388D] font-medium hover:text-[#3292D8] transition-colors relative group"
                  >
                    {item.title}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#3292D8] transition-all group-hover:w-full"></span>
                  </Link>
                ))}
              </nav>

              {/* Right Side Actions */}
              <div className="flex items-center gap-4">
                <Link 
                  to="/search" 
                  className="p-2 text-[#21388D] hover:text-[#3292D8] transition-colors"
                  aria-label="Buscar"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </Link>
                
                <Link 
                  to="/cart" 
                  className="p-2 text-[#21388D] hover:text-[#3292D8] transition-colors relative"
                  aria-label="Carrinho"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </Link>

                {/* Mobile Menu Button */}
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-2 text-[#21388D]"
                  aria-label="Menu"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <nav className="md:hidden py-4 border-t border-[#8ECAE7]/30">
                {headerMenu?.items?.map((item) => (
                  <Link 
                    key={item.id}
                    to={new URL(item.url).pathname}
                    className="block py-3 text-[#21388D] font-medium hover:text-[#3292D8] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
            )}
          </div>
        </header>

        {/* TRUST BAR */}
        <div className="bg-[#8ECAE7]/20 border-b border-[#8ECAE7]/30 py-3 relative z-30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm">
              <div className="flex items-center gap-2 text-[#21388D]">
                <span>🚚</span>
                <span className="font-medium">Frete Grátis Litoral SP</span>
              </div>
              <div className="flex items-center gap-2 text-[#21388D]">
                <span>🔒</span>
                <span className="font-medium">Compra Segura</span>
              </div>
              <div className="flex items-center gap-2 text-[#21388D]">
                <span>💳</span>
                <span className="font-medium">12x Sem Juros</span>
              </div>
              <div className="flex items-center gap-2 text-[#21388D]">
                <span>⭐</span>
                <span className="font-medium">+847 Avaliações 5★</span>
              </div>
            </div>
          </div>
        </div>

        {/* HERO SECTION */}
        <section className="relative py-12 md:py-20 bg-pattern overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              
              {/* Hero Content */}
              <div className="text-center md:text-left">
                <div className="inline-block bg-[#DEC91F]/20 text-[#7C3D36] px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  🧩 Especialistas em TEA, Autismo e TDAH
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  <span className="text-[#21388D]">Brinquedos que </span>
                  <span className="gradient-text">Desenvolvem</span>
                  <span className="text-[#21388D]"> e </span>
                  <span className="text-[#CF111A]">Encantam</span>
                </h1>
                
                <p className="text-lg md:text-xl text-[#7D8FA4] mb-8 leading-relaxed">
                  Brinquedos educativos e terapêuticos especialmente selecionados para 
                  crianças com <strong className="text-[#3292D8]">Autismo</strong>, 
                  <strong className="text-[#3292D8]"> TEA</strong> e 
                  <strong className="text-[#3292D8]"> TDAH</strong>. 
                  Desenvolvimento, diversão e inclusão em cada brincadeira.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Link 
                    to="/collections/todos-produtos"
                    className="bg-gradient-to-r from-[#21388D] to-[#3292D8] text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    🛒 Ver Produtos
                  </Link>
                  <Link 
                    to="/collections/mais-vendidos"
                    className="bg-white text-[#21388D] border-2 border-[#21388D] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#21388D] hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    ⭐ Mais Vendidos
                  </Link>
                </div>

                {/* Trust Badges */}
                <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
                  <div className="flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-lg shadow-sm">
                    <span className="text-[#DEC91F] text-xl">⭐⭐⭐⭐⭐</span>
                    <span className="text-sm text-[#7D8FA4]">4.9/5 (847 avaliações)</span>
                  </div>
                </div>
              </div>

              {/* Hero Image/Visual */}
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#8ECAE7] to-[#3292D8] p-8">
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-4 left-4 text-6xl animate-float">🧩</div>
                    <div className="absolute bottom-4 right-4 text-5xl animate-float-reverse">🦕</div>
                    <div className="absolute top-1/2 left-1/2 text-4xl animate-float-slow">⭐</div>
                  </div>
                  
                  <div className="relative z-10 text-center py-12">
                    <div className="text-8xl mb-6 animate-float">🧸</div>
                    <h2 className="text-white text-2xl md:text-3xl font-bold mb-4">
                      Frete Grátis
                    </h2>
                    <p className="text-white/90 text-lg mb-6">
                      Para Praia Grande, Santos e São Vicente
                    </p>
                    <div className="inline-block bg-white text-[#21388D] px-6 py-3 rounded-full font-bold">
                      🚚 Entrega Rápida
                    </div>
                  </div>
                </div>

                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 bg-[#CF111A] text-white px-4 py-2 rounded-full font-bold shadow-lg animate-pulse">
                  NOVO!
                </div>
                <div className="absolute -bottom-4 -left-4 bg-[#DEC91F] text-[#21388D] px-4 py-2 rounded-full font-bold shadow-lg">
                  -20% OFF
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORIES SECTION */}
        <section className="py-16 md:py-20 bg-white relative z-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#21388D] mb-4">
                Nossas Categorias
              </h2>
              <p className="text-[#7D8FA4] text-lg max-w-2xl mx-auto">
                Brinquedos organizados para facilitar sua busca pelo produto ideal
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { name: 'Sensoriais', emoji: '🌈', color: 'from-[#CF111A] to-[#7C3D36]', link: '/collections/sensoriais' },
                { name: 'Educativos', emoji: '📚', color: 'from-[#3292D8] to-[#21388D]', link: '/collections/educativos' },
                { name: 'Coordenação', emoji: '🎯', color: 'from-[#DEC91F] to-[#7C3D36]', link: '/collections/coordenacao-motora' },
                { name: 'Fidget Toys', emoji: '🔄', color: 'from-[#21388D] to-[#3292D8]', link: '/collections/fidget-toys' },
                { name: 'Comunicação', emoji: '💬', color: 'from-[#8ECAE7] to-[#3292D8]', link: '/collections/comunicacao' },
                { name: 'Calma e Foco', emoji: '🧘', color: 'from-[#7C3D36] to-[#CF111A]', link: '/collections/calma-foco' },
                { name: 'Montessori', emoji: '🏠', color: 'from-[#EAD9B9] to-[#7C3D36]', link: '/collections/montessori' },
                { name: 'Ver Todos', emoji: '🛒', color: 'from-[#21388D] to-[#CF111A]', link: '/collections/all' },
              ].map((cat, idx) => (
                <Link 
                  key={idx}
                  to={cat.link}
                  className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${cat.color} p-6 md:p-8 text-white shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300`}
                >
                  <div className="text-4xl md:text-5xl mb-3">{cat.emoji}</div>
                  <h3 className="font-bold text-lg md:text-xl">{cat.name}</h3>
                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* BENEFITS SECTION */}
        <section className="py-16 md:py-20 bg-gradient-to-b from-[#8ECAE7]/20 to-white relative z-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#21388D] mb-4">
                Por que Escolher Nossos Brinquedos?
              </h2>
              <p className="text-[#7D8FA4] text-lg max-w-2xl mx-auto">
                Cada brinquedo é selecionado pensando no desenvolvimento e bem-estar da sua criança
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
              {benefits.map((benefit, idx) => (
                <div 
                  key={idx}
                  className="glass-card rounded-2xl p-6 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="font-bold text-[#21388D] mb-2">{benefit.title}</h3>
                  <p className="text-sm text-[#7D8FA4]">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED PRODUCTS */}
        <section className="py-16 md:py-20 bg-white relative z-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#21388D] mb-4">
                Produtos em Destaque
              </h2>
              <p className="text-[#7D8FA4] text-lg">
                Os favoritos das famílias do Litoral de São Paulo
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {products.slice(0, 8).map((product) => (
                <Link 
                  key={product.id}
                  to={`/products/${product.handle}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative aspect-square bg-[#8ECAE7]/10 overflow-hidden">
                    {product.featuredImage && (
                      <Image 
                        data={product.featuredImage}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 640px) 50vw, 25vw"
                      />
                    )}
                    <div className="absolute top-2 right-2 bg-[#CF111A] text-white text-xs font-bold px-2 py-1 rounded-full">
                      NOVO
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-[#21388D] mb-2 line-clamp-2 group-hover:text-[#3292D8] transition-colors">
                      {product.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <Money 
                        data={product.priceRange.minVariantPrice}
                        className="text-lg font-bold text-[#CF111A]"
                      />
                      <span className="text-[#DEC91F]">⭐ 4.9</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link 
                to="/collections/all"
                className="inline-block bg-gradient-to-r from-[#21388D] to-[#3292D8] text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Ver Todos os Produtos →
              </Link>
            </div>
          </div>
        </section>

        {/* FREE SHIPPING SECTION */}
        <section className="py-16 md:py-20 bg-gradient-to-r from-[#21388D] via-[#3292D8] to-[#21388D] text-white relative z-10 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 text-8xl animate-float">🚚</div>
            <div className="absolute bottom-10 right-10 text-7xl animate-float-reverse">📦</div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                🚚 Frete Grátis para o Litoral de São Paulo
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Entregamos com carinho em todas as cidades da Baixada Santista e Litoral Sul
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { city: 'Praia Grande', icon: '🏖️', free: true },
                { city: 'Santos', icon: '⚓', free: true },
                { city: 'São Vicente', icon: '🌴', free: true },
                { city: 'Guarujá', icon: '🐠', free: false },
                { city: 'Mongaguá', icon: '🌊', free: false },
                { city: 'Itanhaém', icon: '☀️', free: false },
                { city: 'Cubatão', icon: '🏭', free: false },
                { city: 'Bertioga', icon: '🏝️', free: false },
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className={`rounded-xl p-4 md:p-6 text-center ${
                    item.free 
                      ? 'bg-white text-[#21388D]' 
                      : 'bg-white/20 backdrop-blur'
                  }`}
                >
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <h3 className="font-bold text-lg">{item.city}</h3>
                  {item.free && (
                    <span className="inline-block mt-2 bg-[#CF111A] text-white text-xs font-bold px-3 py-1 rounded-full">
                      FRETE GRÁTIS
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-16 md:py-20 bg-white relative z-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#21388D] mb-4">
                O que as Famílias Dizem
              </h2>
              <p className="text-[#7D8FA4] text-lg">
                Histórias reais de pais e mães do Litoral de São Paulo
              </p>
            </div>

            <div className="relative max-w-3xl mx-auto">
              {testimonials.map((testimonial, idx) => (
                <div 
                  key={idx}
                  className={`transition-all duration-700 ${
                    idx === currentTestimonial 
                      ? 'opacity-100 scale-100' 
                      : 'opacity-0 scale-95 absolute inset-0'
                  }`}
                >
                  <div className="glass-card rounded-3xl p-8 md:p-10 text-center shadow-xl">
                    <div className="text-[#DEC91F] text-2xl mb-4">
                      {'⭐'.repeat(testimonial.rating)}
                    </div>
                    <p className="text-xl md:text-2xl text-[#21388D] italic mb-6 leading-relaxed">
                      "{testimonial.text}"
                    </p>
                    <div>
                      <p className="font-bold text-[#21388D]">{testimonial.name}</p>
                      <p className="text-[#7D8FA4]">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Dots */}
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentTestimonial(idx)}
                    className={`h-3 rounded-full transition-all ${
                      idx === currentTestimonial 
                        ? 'bg-[#3292D8] w-8' 
                        : 'bg-[#8ECAE7] w-3'
                    }`}
                    aria-label={`Ver depoimento ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-[#8ECAE7]/30 to-[#EAD9B9]/30 relative z-10">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="glass-card rounded-3xl p-8 md:p-12 shadow-xl">
              <h2 className="text-3xl md:text-4xl font-bold text-[#21388D] mb-4">
                💙 Fique por Dentro
              </h2>
              <p className="text-[#7D8FA4] text-lg mb-8">
                Receba dicas de desenvolvimento, novidades e ofertas exclusivas
              </p>
              
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email"
                  placeholder="Seu melhor e-mail"
                  className="flex-1 px-6 py-4 rounded-full border-2 border-[#8ECAE7] focus:border-[#3292D8] focus:outline-none text-[#21388D]"
                />
                <button 
                  type="submit"
                  className="bg-gradient-to-r from-[#CF111A] to-[#7C3D36] text-white px-8 py-4 rounded-full font-bold hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Inscrever
                </button>
              </form>
              
              <p className="text-sm text-[#7D8FA4] mt-4">
                🔒 Prometemos não enviar spam. Só conteúdo relevante!
              </p>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-gradient-to-b from-[#21388D] to-[#0d1a45] text-white relative z-10">
          {/* Footer Main */}
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
              
              {/* Brand */}
              <div className="lg:col-span-1">
                <Link to="/" className="inline-block mb-6">
                  <span className="text-3xl font-bold">
                    <span className="text-[#3292D8]">Brinque</span>
                    <span className="text-[#CF111A]">TEA</span>
                    <span className="text-[#DEC91F]">ndo</span>
                  </span>
                </Link>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  Brinquedos educativos e terapêuticos para crianças com TEA, Autismo e TDAH. 
                  Desenvolvendo habilidades com amor e diversão no Litoral de São Paulo.
                </p>
                <div className="flex gap-3">
                  <a href="https://instagram.com/brinqueteando" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#3292D8] transition-colors">
                    <span>📷</span>
                  </a>
                  <a href="https://facebook.com/brinqueteando" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#3292D8] transition-colors">
                    <span>📘</span>
                  </a>
                  <a href="https://wa.me/5513999999999" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#25D366] transition-colors">
                    <span>💬</span>
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-bold text-lg mb-4 text-[#DEC91F]">Navegação</h4>
                <ul className="space-y-3">
                  {footerMenu?.items?.map((item) => (
                    <li key={item.id}>
                      <Link 
                        to={new URL(item.url).pathname}
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Categories */}
              <div>
                <h4 className="font-bold text-lg mb-4 text-[#DEC91F]">Categorias</h4>
                <ul className="space-y-3">
                  <li><Link to="/collections/sensoriais" className="text-gray-300 hover:text-white transition-colors">Brinquedos Sensoriais</Link></li>
                  <li><Link to="/collections/educativos" className="text-gray-300 hover:text-white transition-colors">Educativos</Link></li>
                  <li><Link to="/collections/fidget-toys" className="text-gray-300 hover:text-white transition-colors">Fidget Toys</Link></li>
                  <li><Link to="/collections/montessori" className="text-gray-300 hover:text-white transition-colors">Montessori</Link></li>
                  <li><Link to="/collections/coordenacao-motora" className="text-gray-300 hover:text-white transition-colors">Coordenação Motora</Link></li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="font-bold text-lg mb-4 text-[#DEC91F]">Contato</h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center gap-2">
                    <span>📍</span>
                    <span>Praia Grande - SP</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>📧</span>
                    <a href="mailto:contato@brinqueteando.com.br" className="hover:text-white transition-colors">
                      contato@brinqueteando.com.br
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>📱</span>
                    <a href="https://wa.me/5513999999999" className="hover:text-white transition-colors">
                      (13) 99999-9999
                    </a>
                  </li>
                </ul>
                
                <div className="mt-6">
                  <h5 className="font-medium mb-2">Formas de Pagamento</h5>
                  <div className="flex flex-wrap gap-2">
                    {['Visa', 'Master', 'Pix', 'Boleto'].map((method) => (
                      <span key={method} className="bg-white/10 px-3 py-1 rounded text-xs">
                        {method}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 py-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
                <p>© 2025 BrinqueTEAndo. Todos os direitos reservados.</p>
                <div className="flex gap-6">
                  <Link to="/pages/politica-privacidade" className="hover:text-white transition-colors">
                    Política de Privacidade
                  </Link>
                  <Link to="/pages/termos-uso" className="hover:text-white transition-colors">
                    Termos de Uso
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Autism Awareness Ribbon */}
          <div className="h-2 bg-gradient-to-r from-[#CF111A] via-[#DEC91F] via-[#3292D8] to-[#21388D]"></div>
        </footer>

      </main>
    </>
  );
}

// GraphQL Queries
const FEATURED_COLLECTIONS_QUERY = `#graphql
  query FeaturedCollections {
    collections(first: 8, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        id
        title
        handle
        image {
          url
          altText
          width
          height
        }
      }
    }
  }
`;

const FEATURED_PRODUCTS_QUERY = `#graphql
  query FeaturedProducts {
    products(first: 8, sortKey: BEST_SELLING) {
      nodes {
        id
        title
        handle
        featuredImage {
          url
          altText
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
    }
  }
`;

const HEADER_MENU_QUERY = `#graphql
  query HeaderMenu($headerMenuHandle: String!) {
    menu(handle: $headerMenuHandle) {
      id
      items {
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
    }
  }
`;

const FOOTER_MENU_QUERY = `#graphql
  query FooterMenu($footerMenuHandle: String!) {
    menu(handle: $footerMenuHandle) {
      id
      items {
        id
        title
        url
        type
      }
    }
  }
`;