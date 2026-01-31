import {FooterNewsletterForm} from '~/components/FooterNewsletterForm';
import {useLoaderData, Link, useRouteLoaderData} from 'react-router';
import {useState, useEffect} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import {getProductHandle} from '~/lib/utils';
import {ProductsUnder100} from '~/components/ProductsUnder100';
import {useAside} from '~/components/Aside';
import {NavigationMenu} from '~/components/NavigationMenu';
import Header from '~/components/Header';
import Footer from '~/components/Footer';

export const meta = () => {
  return [
    {title: 'Brinquedos Educativos TDAH e Autismo | BrinqueTEAndo'},
    {name: 'description', content: 'Brinquedos educativos especializados para crianças com TDAH e autismo. Desenvolvimento cognitivo e sensorial. Frete grátis para todo Brasil.'},
    {name: 'keywords', content: 'brinquedos educativos, tdah, autismo, brinquedos sensoriais, desenvolvimento infantil, terapia ocupacional, inclusão, neurodiversidade, brinquedos adaptados'},
    {property: 'og:title', content: 'BrinqueTEAndo - Brinquedos Educativos para TDAH e Autismo'},
    {property: 'og:description', content: 'Descubra brinquedos especializados que ajudam no desenvolvimento de crianças com neurodiversidade.'},
    {property: 'og:type', content: 'website'},
    {name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=5'},
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
  const {menu: mainMenu} = await storefront.query(MAIN_MENU_QUERY, {
    variables: { mainMenuHandle: 'main-menu' }
  });

  return {
    collections,
    products,
    under100Products: under100Products.nodes,
    footerMenu,
    mainMenu
  };
}

export default function Homepage() {
  const {collections, products, under100Products, footerMenu, mainMenu} = useLoaderData();
  const rootData = useRouteLoaderData('root');
  const {open} = useAside();
  const [currentHero, setCurrentHero] = useState(0);
  const [currentPromo, setCurrentPromo] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [timeLeft, setTimeLeft] = useState({days: 0, hours: 0, minutes: 0, seconds: 0});
  const [currentHoliday, setCurrentHoliday] = useState({name: 'Holiday', emoji: '🎉', message: 'CONTAGEM REGRESSIVA'});

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
    <>
      <style>{`
        header { display: none !important; }
        [class*="Header"] { display: none !important; }
        div[data-testid="header"] { display: none !important; }
        nav[data-testid="header-nav"] { display: none !important; }

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
      `}</style>

      <main role="main" aria-label="BrinqueTEAndo - Brinquedos Educativos" className="bg-[#FEFDF8] flex flex-col min-h-screen w-full overflow-x-hidden">
        <div className="flex-grow w-full">
          {/* Top Bar with Countdown */}
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

          {/* Scroll Bar with Promotions */}
          <div className="w-full bg-[#4CAF50] border-y-2 border-[#D4AF69] overflow-hidden py-3 relative z-20 shadow-lg">
            <div className="animate-marquee flex items-center">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="flex items-center mx-8 whitespace-nowrap">
                   <span className="text-2xl mr-3 filter drop-shadow-md">🎈</span>
                   <span className="text-[#FEFDF8] font-serif italic text-xl tracking-widest font-medium uppercase drop-shadow-md" style={{textShadow: '0 1px 2px rgba(0,0,0,0.5)'}}>
                     🧒 Brinquedos que Transformam o Aprendizado em Diversão
                   </span>
                   <span className="text-2xl ml-3 filter drop-shadow-md">🎁</span>
                   <div className="ml-8 flex items-center gap-2 opacity-70">
                     <span className="text-[#D4AF69] text-xs">✦</span>
                     <span className="w-16 h-[1px] bg-[#D4AF69]"></span>
                     <span className="text-[#D4AF69] text-xs">✦</span>
                   </div>
                </div>
              ))}
            </div>
          </div>

          {/* Intro Section */}
          <div className="grid md:grid-cols-2 gap-0 w-full">
            <div className="bg-gradient-to-r from-[#D4AF69] via-[#F4D03F] to-[#D4AF69] py-8 px-6 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.1) 10px, rgba(255,255,255,.1) 20px)'}}></div>
              <div className="relative z-10 max-w-4xl mx-auto">
                <h2 className="text-[#0A3D2F] text-3xl md:text-4xl font-light mb-6 tracking-wide text-center">
                  🧒 Brinquedos Especiais <span className="text-[#b87333] font-serif italic text-5xl">&</span> Desenvolvimento
                </h2>
                <p className="text-[#0A3D2F] text-lg font-semibold mb-4 text-center">
                  🎁 Especializados para TDAH e Autismo
                </p>
                <p className="text-sm text-[#2a2a2a] text-center">Produtos selecionados por especialistas em desenvolvimento infantil.</p>
              </div>
            </div>

            {/* Benefits Bar */}
            <div className="bg-[#FEFDF8] border-l-2 border-[#D4AF69] py-8 px-4 sm:px-6">
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-center">
                  <div className="w-full sm:w-auto">
                    <h3 className="text-3xl sm:text-4xl font-bold text-[#0A3D2F] mb-1 whitespace-nowrap">Qualidade</h3>
                    <p className="text-xs sm:text-sm text-[#9d8b7c]">Materiais seguros</p>
                  </div>
                  <span className="text-4xl sm:text-5xl text-[#D4AF69] font-serif italic self-center">&</span>
                  <div className="w-full sm:w-auto">
                    <h3 className="text-3xl sm:text-4xl font-bold text-[#0A3D2F] mb-1 whitespace-nowrap">Garantia</h3>
                    <p className="text-xs sm:text-sm text-[#9d8b7c]">Satisfação total</p>
                  </div>
                  <span className="text-xl sm:text-2xl text-[#9d8b7c] font-medium self-center">+</span>
                  <div className="w-full sm:w-auto">
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#0A3D2F] mb-1 whitespace-nowrap">Frete Grátis</h3>
                    <p className="text-xs sm:text-sm text-[#9d8b7c]">Acima de R$150</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Promo Ticker */}
          <div className="bg-[#4CAF50] text-white py-3 overflow-hidden relative w-full">
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
                    <p className="text-[#9d8b7c] text-sm">🚚 Envio em até 48 horas úteis.</p>
                  </div>
                </div>
                <div className="flex items-start justify-center gap-3">
                  <div>
                    <p className="text-[#0A3D2F] font-semibold mb-1"><span className="text-[#b87333]">Melhor</span> Preço</p>
                    <p className="text-[#9d8b7c] text-sm">Preço justo em brinquedos de qualidade.</p>
                  </div>
                </div>
                <div className="flex items-start justify-center md:justify-end gap-3">
                  <div>
                    <p className="text-[#0A3D2F] font-semibold mb-1"><span className="text-[#b87333]">Trocas</span> Fáceis</p>
                    <p className="text-[#9d8b7c] text-sm">Devoluções gratuitas em até 30 dias.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Navigation */}
          <NavigationMenu rootData={{menu: mainMenu}} />

          {/* Hero Banner - Static Image for Now */}
          <section className="mb-12 sm:mb-16 md:mb-20 w-full px-0">
            <div className="max-w-7xl mx-auto mt-4 sm:mt-8 px-2 sm:px-4 md:px-6 w-full">
              <div className="relative h-64 sm:h-80 md:h-96 lg:h-[70vh] overflow-hidden rounded-[10px] shadow-xl sm:shadow-2xl bg-gradient-to-br from-[#4CAF50] to-[#81C784]">
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A3D2F]/60 to-[#4CAF50]/20 z-10"></div>
                <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 sm:px-8 md:px-16">
                  <h1 className="text-white text-2xl sm:text-4xl md:text-6xl font-light tracking-widest mb-2 sm:mb-4">BRINQUETEANDO</h1>
                  <p className="text-[#D4AF69] text-sm sm:text-lg md:text-xl tracking-wider mb-2 sm:mb-4">
                    Brinquedos Educativos para TDAH, Autismo e Neurodiversidade
                  </p>
                  <Link to="/collections/todos-os-brinquedos" className="inline-block border-2 border-[#D4AF69] bg-[#0A3D2F] text-white px-6 sm:px-10 py-2 sm:py-3 rounded-full hover:bg-[#D4AF69] hover:text-[#0A3D2F] hover:border-[#0A3D2F] transition-all font-semibold tracking-wider w-fit mt-2 sm:mt-4 text-xs sm:text-base">
                    VER COLEÇÃO
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Boys'/Girls' Collection */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mb-20 w-full">
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              <div className="relative h-72 sm:h-80 md:h-96 overflow-hidden rounded-[10px] shadow-xl group">
                <img
                  src="https://cdn.shopify.com/s/files/1/0778/2921/0327/files/men_s_collection_dc5c97d6-952f-43c1-9f24-8eadb0693f74.avif?v=1765592942"
                  alt="Brinquedos para Meninos - TDAH e Autismo"
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                  width="800"
                  height="600"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4CAF50]/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-8 text-white">
                  <h2 className="text-2xl sm:text-3xl font-light mb-2 tracking-wide">PARA MENINOS</h2>
                  <p className="text-[#D4AF69] mb-4 text-sm sm:text-base">Brinquedos focados em desenvolvimento motor e cognitivo</p>
                  <Link to="/collections/meninos" className="inline-block bg-white text-[#4CAF50] px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold hover:bg-[#D4AF69] hover:text-white transition-all text-sm sm:text-base">VER AGORA</Link>
                </div>
              </div>
              <div className="relative h-72 sm:h-80 md:h-96 overflow-hidden rounded-[10px] shadow-xl group">
                <img
                  src="https://cdn.shopify.com/s/files/1/0778/2921/0327/files/7.avif?v=1765596667"
                  alt="Brinquedos para Meninas - TDAH e Autismo"
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                  width="800"
                  height="600"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FF9800]/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-8 text-white">
                  <h2 className="text-2xl sm:text-3xl font-light mb-2 tracking-wide">PARA MENINAS</h2>
                  <p className="text-[#D4AF69] mb-4 text-sm sm:text-base">Brinquedos sensoriais e criativos</p>
                  <Link to="/collections/meninas" className="inline-block bg-white text-[#FF9800] px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold hover:bg-[#D4AF69] hover:text-white transition-all text-sm sm:text-base">VER AGORA</Link>
                </div>
              </div>
            </div>
          </section>

          {/* Products Under R$100 Section */}
          <ProductsUnder100 products={under100Products} />

          {/* Gift Budget Cards */}
          <section className="bg-white py-12 sm:py-20 mb-20 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <h2 className="text-[#0A3D2F] text-2xl sm:text-3xl md:text-4xl font-light text-center mb-8 sm:mb-12 tracking-wide">Presentes para Cada Orçamento</h2>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 sm:gap-6">
                {[
                  {title: 'R$50', subtitle: 'ATÉ R$50', url: '/collections/ate-50-reais'},
                  {title: 'R$100', subtitle: 'ATÉ R$100', url: '/collections/ate-100-reais'},
                  {title: 'R$150', subtitle: 'ATÉ R$150', url: '/collections/ate-150-reais'},
                  {title: 'R$200', subtitle: 'ATÉ R$200', url: '/collections/ate-200-reais'},
                  {title: 'R$300', subtitle: 'ATÉ R$300', url: '/collections/ate-300-reais'},
                  {title: 'R$500', subtitle: 'ACIMA DE R$300', url: '/collections/acima-300-reais'}
                ].map((item, idx) => (
                  <Link key={idx} to={item.url} className="group">
                    <div className="relative bg-gradient-to-br from-[#4CAF50] to-[#2E7D32] text-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl text-center transition-all duration-300 hover:scale-110 hover:shadow-2xl"
                         style={{
                           clipPath: 'polygon(15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%, 0% 15%)',
                           boxShadow: '0 8px 25px rgba(46, 125, 50, 0.3)',
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

          {/* Rewards Section - Adapted to BrinqueTEAndo */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-20 w-full">
            <div className="bg-gradient-to-r from-[#0A3D2F] to-[#0F5447] rounded-[10px] shadow-2xl overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="bg-gradient-to-br from-[#0A3D2F] to-[#051F1A] p-8 sm:p-12 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D4AF69] via-[#FEFDF8] to-[#1a5757]"></div>
                  <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-[#D4AF69] via-[#FEFDF8] to-[#1a5757]"></div>
                  <div className="relative z-10 transform -rotate-6 hover:rotate-0 transition-transform duration-500 w-full max-w-[340px] sm:max-w-[400px]">
                    <div className="bg-gradient-to-br from-[#4CAF50] to-[#2E7D32] rounded-xl p-5 sm:p-6 shadow-2xl border-2 border-[#D4AF69] w-full aspect-[1.586/1] flex flex-col justify-between">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#D4AF69] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                        <h3 className="text-white text-base sm:text-xl font-bold tracking-wider">CLUBE BRINQUEANDO</h3>
                      </div>
                      <div className="space-y-1 my-3 sm:my-4">
                        <p className="text-white text-xs sm:text-sm tracking-widest">•••• •••• •••• 0000</p>
                        <p className="text-[#D4AF69] text-xs">SÓCIO DESDE 2024</p>
                      </div>
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-[#D4AF69] text-xs uppercase">MEMBRO</p>
                          <p className="text-white font-semibold text-sm sm:text-base">SEU NOME</p>
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
                  <div className="inline-block bg-[#D4AF69] text-[#0A3D2F] px-4 py-1 rounded-full text-xs font-bold mb-4 w-fit">Economize até R$100!</div>
                  <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-light mb-4 sm:mb-6 tracking-wide">Ganhe <span className="text-[#D4AF69] font-semibold">PONTOS</span></h2>
                  <p className="text-gray-300 text-lg sm:text-xl mb-4 sm:mb-6">em todas as compras de brinquedos hoje</p>
                  <div className="bg-[#D4AF69] text-[#0A3D2F] px-4 sm:px-6 py-3 rounded-lg inline-block mb-4 sm:mb-6 w-fit">
                    <p className="text-xs sm:text-sm mb-1 font-semibold">Use o código:</p>
                    <p className="text-2xl sm:text-3xl font-bold tracking-wider">BRINQUE10</p>
                  </div>
                  <p className="text-gray-400 text-sm mb-4 sm:mb-6">Ao se tornar membro do Clube BrinqueTEAndo. Desconto aplicado no checkout.</p>
                  <Link to="/account" className="bg-[#D4AF69] text-[#0A3D2F] px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-[#F4D03F] hover:scale-105 transition-all text-center w-fit text-sm sm:text-base">Crie Sua Conta</Link>
                  <p className="text-xs text-gray-400 mt-3">Mais benefícios para você.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="bg-white py-12 sm:py-20 mb-20 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <h2 className="text-[#0A3D2F] text-2xl sm:text-3xl md:text-4xl font-light text-center mb-4 tracking-wide">O Que Nossos Clientes Dizem</h2>
              <p className="text-[#9d8b7c] text-center mb-8 sm:mb-12 text-sm sm:text-base">Mais de 1.000 famílias satisfeitas em todo Brasil</p>
              <div className="relative h-auto min-h-[250px] sm:min-h-[280px]">
                {testimonials.map((testimonial, idx) => (
                  <div key={idx} className={`absolute inset-0 transition-all duration-1000 ${idx === currentTestimonial ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    <div className="bg-[#FEFDF8] rounded-[10px] shadow-xl p-6 sm:p-8 max-w-3xl mx-auto">
                      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <img
                            src={testimonial.image}
                            alt={`${testimonial.name} - Cliente BrinqueTEAndo`}
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
                  <button key={idx} onClick={() => setCurrentTestimonial(idx)} className={`h-2 rounded-full transition-all ${idx === currentTestimonial ? 'bg-[#D4AF69] w-8' : 'bg-[#9d8b7c]/30 w-2'}`} aria-label={`Ver depoimento ${idx + 1}`}/>
                ))}
              </div>
            </div>
          </section>


          {/* Shipping Section - Brazil */}
          <section className="bg-gradient-to-b from-white to-[#F5F3ED] py-16 sm:py-20 mb-20 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
              <h2 className="text-[#0A3D2F] text-2xl sm:text-3xl md:text-4xl font-light text-center mb-4 tracking-wide">
                Entregamos em Todo o Brasil
              </h2>
              <p className="text-[#9d8b7c] text-center mb-12 text-sm sm:text-base mx-auto">
                Envio rápido e seguro para todas as capitais e regiões do Brasil
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow">
                  <div className="text-4xl mb-4">📍</div>
                  <h3 className="text-xl font-semibold text-[#0A3D2F] mb-3">São Paulo</h3>
                  <p className="text-[#9d8b7c] text-sm leading-relaxed">
                    Entrega expressa para capital, ABCD, Campinas, Santos e interior
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow">
                  <div className="text-4xl mb-4">🚚</div>
                  <h3 className="text-xl font-semibold text-[#0A3D2F] mb-3">Rio de Janeiro</h3>
                  <p className="text-[#9d8b7c] text-sm leading-relaxed">
                    Entrega rápida para capital, Baixada Fluminense e região serrana
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow">
                  <div className="text-4xl mb-4">📦</div>
                  <h3 className="text-xl font-semibold text-[#0A3D2F] mb-3">Minas Gerais</h3>
                  <p className="text-[#9d8b7c] text-sm leading-relaxed">
                    Envio para Belo Horizonte, Uberlândia, Juiz de Fora e todo estado
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow">
                  <div className="text-4xl mb-4">🌎</div>
                  <h3 className="text-xl font-semibold text-[#0A3D2F] mb-3">Todo Brasil</h3>
                  <p className="text-[#9d8b7c] text-sm leading-relaxed">
                    Cobertura nacional com frete grátis em compras acima de R$150
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Collection Images */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-12 w-full">
            <h2 className="text-[#0A3D2F] text-2xl sm:text-3xl md:text-4xl font-light text-center mb-8 sm:mb-12 tracking-wide">NOSSAS COLEÇÕES</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link to="/collections/novidades" className="group relative h-64 sm:h-72 md:h-80 overflow-hidden rounded-[10px] shadow-lg hover:shadow-2xl transition-shadow">
                <div className="absolute inset-0 bg-gradient-to-br from-[#4CAF50] to-[#81C784]"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <h3 className="text-white text-xl sm:text-2xl font-light tracking-wider mb-2 text-center">NOVIDADES</h3>
                  <span className="text-[#D4AF69] text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">VER AGORA →</span>
                </div>
              </Link>
              <Link to="/collections/sensoriais" className="group relative h-64 sm:h-72 md:h-80 overflow-hidden rounded-[10px] shadow-lg hover:shadow-2xl transition-shadow">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF9800] to-[#F57C00]"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <h3 className="text-white text-xl sm:text-2xl font-light tracking-wider mb-2 text-center">SENSORIAIS</h3>
                  <span className="text-[#D4AF69] text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">VER AGORA →</span>
                </div>
              </Link>
              <Link to="/collections/educativos" className="group relative h-64 sm:h-72 md:h-80 overflow-hidden rounded-[10px] shadow-lg hover:shadow-2xl transition-shadow sm:col-span-2 lg:col-span-1">
                <div className="absolute inset-0 bg-gradient-to-br from-[#9C27B0] to-[#7B1FA2]"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <h3 className="text-white text-xl sm:text-2xl font-light tracking-wider mb-2 text-center">EDUCATIVOS</h3>
                  <span className="text-[#D4AF69] text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">VER AGORA →</span>
                </div>
              </Link>
            </div>
          </section>

          {/* Featured Products */}
          <section className="bg-white py-12 sm:py-16 md:py-20 mb-16 sm:mb-20 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <h2 className="text-[#0A3D2F] text-2xl sm:text-3xl md:text-4xl font-light text-center mb-8 sm:mb-12 tracking-wide">BRINQUEDOS EM DESTAQUE</h2>
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
                      <h3 className="text-[#0A3D2F] font-light mb-2 hover:text-[#1a5757] transition-colors text-xs sm:text-sm line-clamp-2">{p.title}</h3>
                      <Money data={p.priceRange.minVariantPrice} className="text-[#2a2a2a] font-medium text-xs sm:text-sm"/>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

        </div>

        <Footer menu={footerMenu} />

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

const MAIN_MENU_QUERY = `#graphql
  fragment IndexMainMenuItem on MenuItem {
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
  query IndexMainMenu($mainMenuHandle: String!) {
    menu(handle: $mainMenuHandle) {
      id
      items {
        ...IndexMainMenuItem
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
      query: "tag:ate-100"
    ) {
      nodes {
        ...ProductUnder100
      }
    }
  }
`;
