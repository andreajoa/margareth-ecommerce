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
    {title: 'Brinquedos Educativos TDAH e Autismo | BrinqueTEAndo'},
    {name: 'description', content: 'Brinquedos educativos especializados para crianças com TDAH e autismo. Desenvolvimento cognitivo e sensorial. Frete grátis para todo Brasil.'},
    
    // GEO-TARGETING META TAGS
    {name: 'geo.region', content: 'BR'},
    {name: 'geo.placename', content: 'São Paulo;Santos;Praia Grande'},
    
    // ENHANCED KEYWORDS (Location-based & Long-tail)
    {name: 'keywords', content: 'brinquedos educativos, tdah, autismo, brinquedos sensoriais, desenvolvimento infantil, terapia ocupacional, inclusão, neurodiversidade, brinquedos adaptados, brinquedos praia grande, brinquedos santos, brinquedos são vicente, brinquedos litoral sp, brinquedos autismo brasil'},
    
    // LANGUAGE TARGETING
    {httpEquiv: 'content-language', content: 'pt-BR'},
    
    // ENHANCED OPEN GRAPH TAGS
    {property: 'og:title', content: 'BrinqueTEAndo - Brinquedos Educativos para TDAH e Autismo'},
    {property: 'og:description', content: 'Descubra brinquedos especializados que ajudam no desenvolvimento de crianças com neurodiversidade. Frete grátis para todo Brasil.'},
    {property: 'og:type', content: 'website'},
    {property: 'og:url', content: 'https://brinqueteando.online'},
    {property: 'og:image', content: 'https://cdn.shopify.com/s/files/1/0778/2921/0327/files/5.avif?v=1765596668'},
    {property: 'og:image:width', content: '1200'},
    {property: 'og:image:height', content: '630'},
    {property: 'og:site_name', content: 'BrinqueTEAndo'},
    {property: 'og:locale', content: 'pt_BR'},
    
    // TWITTER CARDS
    {name: 'twitter:card', content: 'summary_large_image'},
    {name: 'twitter:title', content: 'BrinqueTEAndo | Brinquedos Educativos para TDAH e Autismo'},
    {name: 'twitter:description', content: 'Brinquedos educativos especializados para crianças com TDAH e autismo. Frete grátis para todo Brasil.'},
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
    {tagName: 'link', rel: 'canonical', href: 'https://brinqueteando.online'},
    
    // HREFLANG FOR GEO-TARGETING
    {tagName: 'link', rel: 'alternate', hreflang: 'pt-br', href: 'https://brinqueteando.online'},
    {tagName: 'link', rel: 'alternate', hreflang: 'x-default', href: 'https://brinqueteando.online'},
    
    // PRECONNECT & DNS-PREFETCH
    {tagName: 'link', rel: 'preconnect', href: 'https://cdn.shopify.com'},
    {tagName: 'link', rel: 'dns-prefetch', href: 'https://cdn.shopify.com'},
    
    // PRELOAD CRITICAL RESOURCES
    {tagName: 'link', rel: 'preload', as: 'image', href: 'https://cdn.shopify.com/s/files/1/0778/2921/0327/files/5.avif?v=1765596668', attributes: {fetchpriority: 'high'}},
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
  const [currentHoliday, setCurrentHoliday] = useState({name: 'Feriado', emoji: '🎉', message: 'CONTAGEM REGRESSIVA'});

  // Analytics Script (adapted for BrinqueTEAndo)
  useEffect(() => {
    // Add any analytics scripts here if needed
    return () => {};
  }, []);

  const schemaOrgJSON = [
    // Organization Schema
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "BrinqueTEAndo",
      "url": "https://brinqueteando.online",
      "logo": "https://cdn.shopify.com/s/files/1/0778/2921/0327/files/5.avif?v=1765596668",
      "description": "Especializada em brinquedos educativos para crianças com TDAH, Autismo e TEA. Desenvolvimento cognitivo e sensorial.",
      "foundingDate": "2024",
      "areaServed": [
        {"@type": "Country", "name": "Brazil"}
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+55-13-99999-9999",
        "contactType": "Customer Service",
        "areaServed": "BR",
        "availableLanguage": ["Portuguese"]
      }
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
      "name": "BrinqueTEAndo - Loja Online",
      "image": "https://cdn.shopify.com/s/files/1/0778/2921/0327/files/5.avif?v=1765596668",
      "url": "https://brinqueteando.online",
      "priceRange": "$-$$",
      "currenciesAccepted": "BRL",
      "paymentAccepted": "Credit Card, PIX, Boleto, PayPal",
      "areaServed": [
        {"@type": "Country", "name": "BR"}
      ]
    }
  ];

  const promoMessages = [
    "🚚 FRETE GRÁTIS para todo Brasil!",
    "⭐ Ganhe descontos exclusivos na primeira compra!",
    "🎁 Brinquedos selecionados para desenvolvimento",
    "⏰ Entrega rápida para São Paulo e capitais",
    "💎 Qualidade garantida em todos os produtos",
    "🧒 Pensado para o desenvolvimento infantil",
  ];

  const testimonials = [
    {name: "Maria S.", text: "Os brinquedos ajudaram muito meu filho com TDAH. Recomendo!", rating: 5, image: "https://cdn.shopify.com/s/files/1/0778/2921/0327/files/1.jpg?v=1765938975"},
    {name: "João P.", text: "Excelente qualidade. Minha filha ama os brinquedos sensoriais.", rating: 5, image: "https://cdn.shopify.com/s/files/1/0778/2921/0327/files/2.jpg?v=1765938975"},
    {name: "Ana L.", text: "Atendimento incrível e produtos que realmente funcionam.", rating: 5, image: "https://cdn.shopify.com/s/files/1/0778/2921/0327/files/4.jpg?v=1765938975"},
    {name: "Carlos M.", text: "Melhor investimento para o desenvolvimento do meu filho.", rating: 5, image: "https://cdn.shopify.com/s/files/1/0778/2921/0327/files/3.jpg?v=1765938975"}
  ];

  const calculateHolidayCountdown = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const holidays = [
      {name: 'Dia das Crianças', month: 9, day: 12, emoji: '👶', message: 'CONTAGEM DIA DAS CRIANÇAS'},
      {name: 'Natal', month: 11, day: 25, emoji: '🎄', message: 'CONTAGEM PARA O NATAL'},
      {name: 'Ano Novo', month: 11, day: 31, emoji: '🎉', message: 'CONTAGEM PARA O ANO NOVO'},
      {name: 'Dia das Mães', month: 4, day: 12, emoji: '👩', message: 'CONTAGEM DIA DAS MÃES'},
      {name: 'Dia dos Pais', month: 7, day: 11, emoji: '👨', message: 'CONTAGEM DIA DOS PAIS'}
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

  return (
    <div className="w-full overflow-x-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        * {
          box-sizing: border-box;
        }

        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: fit-content;
          animation: marquee-scroll 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse 3s ease-in-out infinite;
        }
      `}} />

      {/* Inject structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaOrgJSON),
        }}
      />

      <div className="bg-[#FEFDF8] w-full">
        {/* TOP COUNTDOWN BAR */}
        <div className="bg-[#0A3D2F] text-white py-3 text-center w-full">
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

        {/* PROMOTIONAL SCROLL BAR */}
        <div className="w-full bg-gradient-to-r from-[#D4AF69] via-[#F4D03F] to-[#D4AF69] border-y-2 border-[#0A3D2F] overflow-hidden py-3 relative z-20">
          <div className="absolute inset-0 pointer-events-none opacity-10" style={{backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '15px 15px'}}></div>
          <div className="animate-marquee flex items-center">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex items-center mx-8 whitespace-nowrap">
                <span className="text-2xl mr-3">💝</span>
                <span className="text-[#0A3D2F] font-serif italic text-xl tracking-widest font-medium uppercase drop-shadow-md">
                  {promoMessages[currentPromo]}
                </span>
                <span className="text-2xl ml-3">🎁</span>
                
                <div className="ml-8 flex items-center gap-2 opacity-70">
                  <span className="text-[#0A3D2F] text-xs">✦</span>
                  <span className="w-16 h-[1px] bg-[#0A3D2F]"></span>
                  <span className="text-[#0A3D2F] text-xs">✦</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* HERO SECTION WITH VIDEO BACKGROUND */}
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Video Background */}
          <div className="absolute inset-0 z-0">
            <div className="w-full h-full bg-gradient-to-br from-[#0A3D2F] via-[#1a5757] to-[#0A3D2F] opacity-90"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 md:py-32 text-center">
            <h1 className="text-5xl md:text-7xl font-light text-white mb-8 leading-tight animate-fade-in-up">
              Descubra o <span className="font-serif italic text-[#D4AF69] animate-pulse-slow">Poder</span> do Brincar
            </h1>
            <p className="text-2xl md:text-3xl text-[#D4AF69] font-medium mb-10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              Especializados em Desenvolvimento Infantil Neurodivergente
            </p>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-12 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              Brinquedos educativos projetados por especialistas para estimular o crescimento cognitivo, sensorial e emocional de crianças com TDAH, Autismo e TEA.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up" style={{animationDelay: '0.6s'}}>
              <Link to="/collections/all" className="bg-[#D4AF69] hover:bg-[#c49f59] text-[#0A3D2F] font-bold py-5 px-10 rounded-lg transition-all duration-300 transform hover:scale-105 text-center text-lg">
                Explorar Coleções Completas
              </Link>
              <button className="border-2 border-white text-white hover:bg-white hover:text-[#0A3D2F] font-bold py-5 px-10 rounded-lg transition-all duration-300 text-center text-lg">
                Ver Depoimentos Reais
              </button>
            </div>
          </div>
        </div>

        {/* BENEFITS SECTION */}
        <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light text-[#0A3D2F] mb-6">Por Que Escolher a BrinqueTEAndo?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Cada brinquedo é cuidadosamente selecionado e desenvolvido para promover o desenvolvimento saudável de crianças neurodivergentes.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center group">
                <div className="w-24 h-24 bg-[#0A3D2F] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-4xl">🧠</span>
                </div>
                <h3 className="text-2xl font-semibold text-[#0A3D2F] mb-4">Desenvolvimento Cognitivo</h3>
                <p className="text-gray-600 leading-relaxed">
                  Brinquedos que estimulam memória, atenção, resolução de problemas e pensamento lógico. Cada produto é escolhido por terapeutas ocupacionais especializados.
                </p>
              </div>

              <div className="text-center group">
                <div className="w-24 h-24 bg-[#0A3D2F] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-4xl">🎨</span>
                </div>
                <h3 className="text-2xl font-semibold text-[#0A3D2F] mb-4">Estimulação Sensorial</h3>
                <p className="text-gray-600 leading-relaxed">
                  Texturas, cores, sons e materiais cuidadosamente selecionados para cada fase do desenvolvimento sensorial e motor fino.
                </p>
              </div>

              <div className="text-center group">
                <div className="w-24 h-24 bg-[#0A3D2F] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-4xl">💝</span>
                </div>
                <h3 className="text-2xl font-semibold text-[#0A3D2F] mb-4">Inclusão e Empatia</h3>
                <p className="text-gray-600 leading-relaxed">
                  Produtos que promovem a integração social, valorizam a diversidade e ajudam a construir um mundo mais empático e inclusivo.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FEATURED COLLECTIONS */}
        <div className="py-20 bg-[#FEFDF8]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light text-[#0A3D2F] mb-4">Nossas Coleções Especiais</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Cada coleção foi desenvolvida por especialistas para atender necessidades específicas do desenvolvimento infantil neurodivergente.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {collections.nodes.slice(0, 8).map((collection, index) => (
                <Link 
                  key={collection.id} 
                  to={`/collections/${collection.handle}`}
                  className="group block animate-fade-in-up"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                    {collection.image && (
                      <div className="aspect-square overflow-hidden">
                        <Image
                          data={collection.image}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          sizes="(max-width: 768px) 50vw, 25vw"
                          aspectRatio="1/1"
                          alt={collection.image.altText || collection.title}
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-[#0A3D2F] mb-2 group-hover:text-[#1a5757] transition-colors">
                        {collection.title}
                      </h3>
                      <div className="flex items-center text-[#D4AF69] font-medium">
                        <span>Explorar coleção</span>
                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* TESTIMONIALS SECTION */}
        <div className="py-20 bg-[#0A3D2F]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light text-white mb-4">O Que Nossas Famílias Dizem</h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Histórias reais de transformação e esperança compartilhadas por famílias que encontraram diferença através dos nossos brinquedos.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl">
                <div className="text-center mb-8">
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-6 border-4 border-[#D4AF69]">
                    <Image
                      src={testimonials[currentTestimonial].image}
                      alt={testimonials[currentTestimonial].name}
                      className="w-full h-full object-cover"
                      width={96}
                      height={96}
                    />
                  </div>
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <span key={i} className="text-[#D4AF69] text-3xl">★</span>
                    ))}
                  </div>
                  <p className="text-gray-700 text-xl italic mb-6 leading-relaxed">
                    "{testimonials[currentTestimonial].text}"
                  </p>
                  <p className="text-[#0A3D2F] font-bold text-lg">
                    {testimonials[currentTestimonial].name}
                  </p>
                </div>
                
                <div className="flex justify-center space-x-3">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-4 h-4 rounded-full transition-all ${
                        index === currentTestimonial 
                          ? 'bg-[#0A3D2F] scale-125' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FEATURED PRODUCTS */}
        <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light text-[#0A3D2F] mb-4">Brinquedos em Destaque</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Seleção especial de produtos recomendados por terapeutas ocupacionais e especialistas em desenvolvimento infantil neurodivergente.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {products.nodes.slice(0, 12).map((product, index) => (
                <Link 
                  key={product.id} 
                  to={`/products/${getProductHandle(product.handle)}`}
                  className="group block animate-fade-in-up"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="aspect-square overflow-hidden bg-gray-100 relative">
                      {product.featuredImage ? (
                        <Image
                          data={product.featuredImage}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                          aspectRatio="1/1"
                          alt={product.featuredImage.altText || product.title}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                      <div className="absolute top-3 left-3 bg-[#D4AF69] text-[#0A3D2F] text-xs font-bold px-3 py-1 rounded-full">
                        DESTAQUE
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-[#D4AF69] text-xs font-semibold tracking-widest uppercase mb-1">
                        {product.vendor || 'BrinqueTEAndo'}
                      </p>
                      <h3 className="text-[#0A3D2F] font-medium mb-2 line-clamp-2 group-hover:text-[#1a5757] transition-colors">
                        {product.title}
                      </h3>
                      <Money 
                        data={product.priceRange.minVariantPrice} 
                        className="text-[#2a2a2a] font-semibold"
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link 
                to="/collections/all" 
                className="inline-block bg-[#0A3D2F] hover:bg-[#1a5757] text-white font-bold py-5 px-10 rounded-lg transition-all duration-300 transform hover:scale-105 text-lg"
              >
                Ver Todos os Produtos
              </Link>
            </div>
          </div>
        </div>

        {/* PRODUCTS UNDER R$100 */}
        <ProductsUnder100 products={under100Products} />

        {/* EDUCATIONAL VALUE SECTION */}
        <div className="py-20 bg-gradient-to-r from-[#0A3D2F] to-[#1a5757]">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-light text-white mb-6">Valor Educacional Comprovado</h2>
            <p className="text-xl text-gray-200 mb-16 max-w-3xl mx-auto">
              Nossos brinquedos são baseados em pesquisas científicas e práticas terapêuticas reconhecidas internacionalmente.
            </p>
            
            <div className="grid md:grid-cols-3 gap-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="text-5xl mb-4">📊</div>
                <h3 className="text-2xl font-semibold text-white mb-4">Evidência Científica</h3>
                <p className="text-gray-200">
                  Todos os nossos produtos são baseados em estudos científicos sobre desenvolvimento infantil neurodivergente.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="text-5xl mb-4">👨‍⚕️</div>
                <h3 className="text-2xl font-semibold text-white mb-4">Aprovação Profissional</h3>
                <p className="text-gray-200">
                  Recomendado por terapeutas ocupacionais, psicólogos e especialistas em desenvolvimento infantil.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="text-5xl mb-4">🏆</div>
                <h3 className="text-2xl font-semibold text-white mb-4">Qualidade Garantida</h3>
                <p className="text-gray-200">
                  Certificação de segurança e qualidade em todos os materiais e processos de fabricação.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* NEWSLETTER SECTION */}
        <div className="py-20 bg-[#0A3D2F]">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-light text-white mb-6">Receba Novidades e Dicas Especializadas!</h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Cadastre-se e receba conteúdos exclusivos sobre desenvolvimento infantil neurodivergente, novos produtos e promoções especiais.
            </p>
            <div className="bg-white rounded-xl p-8 max-w-2xl mx-auto">
              <FooterNewsletterForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// GraphQL Queries
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
    collections(first: 8, sortKey: UPDATED_AT, reverse: true) {
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
    products(first: 16, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...ProductItem
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
      first: 16,
      sortKey: BEST_SELLING,
      query: "tag:ate-100"
    ) {
      nodes {
        ...ProductUnder100
      }
    }
  }
`;

const FOOTER_MENU_QUERY = `#graphql
  fragment RootFooterMenuItem on MenuItem {
    id
    title
    url
    type
    items { id title url type }
  }
  query RootFooterMenu($footerMenuHandle: String!) {
    menu(handle: $footerMenuHandle) {
      id
      items { ...RootFooterMenuItem }
    }
  }
`;