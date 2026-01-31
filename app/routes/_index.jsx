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
    {title: 'Brinquedos Educativos TDAH e Autismo | BrinqueTEAndo'},
    {name: 'description', content: 'Brinquedos educativos especializados para crianças com TDAH e autismo. Desenvolvimento cognitivo e sensorial. Frete grátis para todo Brasil.'},
    {name: 'keywords', content: 'brinquedos educativos, tdah, autismo, brinquedos sensoriais, desenvolvimento infantil, terapia ocupacional, inclusão, neurodiversidade'},
    {property: 'og:title', content: 'BrinqueTEAndo - Brinquedos Educativos para TDAH e Autismo'},
    {property: 'og:description', content: 'Descubra brinquedos especializados que ajudam no desenvolvimento de crianças com neurodiversidade. Frete grátis para todo Brasil.'},
    {property: 'og:image', content: 'https://cdn.shopify.com/s/files/1/0778/2921/0327/files/5.avif?v=1765596668'},
    {name: 'twitter:card', content: 'summary_large_image'},
    {name: 'theme-color', content: '#0A3D2F'},
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
    const promoTimer = setInterval(() => setCurrentPromo((p) => (p + 1) % promoMessages.length), 4000);
    return () => clearInterval(promoTimer);
  }, []);

  useEffect(() => {
    const testimonialTimer = setInterval(() => setCurrentTestimonial((p) => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(testimonialTimer);
  }, []);

  return (
    <main role="main" className="bg-[#FEFDF8] flex flex-col min-h-screen w-full">
      <style>{\`
        header { display: none !important; }
        [class*="Header"] { display: none !important; }
        div[data-testid="header"] { display: none !important; }
        nav[data-testid="header-nav"] { display: none !important; }
      \`}</style>

      {/* Top Countdown Bar */}
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

      {/* Rest of the homepage content would go here */}
      
      <BrinqueTEAndoFooter menu={footerMenu} />
    </main>
  );
}

// GraphQL Queries
const FEATURED_COLLECTIONS_QUERY = '#graphql' + String.raw\`
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
    \$country: CountryCode
    \$language: LanguageCode
  ) @inContext(country: \$country, language: \$language) {
    collections(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...Collection
      }
    }
  }
\`;

const FEATURED_PRODUCTS_QUERY = '#graphql' + String.raw\`
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
    \$country: CountryCode
    \$language: LanguageCode
  ) @inContext(country: \$country, language: \$language) {
    products(first: 8, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...ProductItem
      }
    }
  }
\`;

const PRODUCTS_UNDER_100_QUERY = '#graphql' + String.raw\`
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
    \$country: CountryCode
    \$language: LanguageCode
  ) @inContext(country: \$country, language: \$language) {
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
\`;

const FOOTER_MENU_QUERY = \`#graphql
  fragment RootFooterMenuItem on MenuItem {
    id
    title
    url
    type
    items { id title url type }
  }
  query RootFooterMenu(\$footerMenuHandle: String!) {
    menu(handle: \$footerMenuHandle) {
      id
      items { ...RootFooterMenuItem }
    }
  }
\`;

function BrinqueTEAndoFooter({ menu }) {
  const menuItems = menu?.items || [];
  return (
    <footer className="relative bg-gradient-to-b from-[#0A3D2F] via-[#1a5f4a] to-[#0d2e23] text-white overflow-hidden w-full">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: \`radial-gradient(circle at 2px 2px, #D4AF69 1px, transparent 0)\`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      <div className="relative border-b border-[#D4AF69]/20 w-full">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-4xl font-light text-[#D4AF69] mb-3 tracking-wide">
                Junte-se à Nossa Comunidade
              </h3>
              <p className="text-gray-300 text-lg">
                Receba dicas exclusivas, novidades e promoções especiais para o desenvolvimento infantil.
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
                BRINQUETEANDO
              </div>
              <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-[#D4AF69] to-transparent transition-all duration-500 mt-2"></div>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-xs">
              Especializados em brinquedos educativos para TDAH, Autismo e TEA. Cada brinquedo é uma oportunidade de desenvolvimento para crianças neurodiversas em todo o Brasil.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-full bg-[#D4AF69]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#D4AF69]">✓</span>
                </div>
                <span className="text-gray-300">Garantia de Satisfação</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-full bg-[#D4AF69]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#D4AF69]">✓</span>
                </div>
                <span className="text-gray-300">Frete Grátis Acima de R$150</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-full bg-[#D4AF69]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#D4AF69]">✓</span>
                </div>
                <span className="text-gray-300">Compra Segura</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-[#D4AF69] text-sm font-bold mb-6 uppercase tracking-widest relative inline-block">
              Categorias
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#D4AF69] to-transparent"></div>
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/collections/novidades" className="text-gray-300 hover:text-[#D4AF69] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Novidades
                </Link>
              </li>
              <li>
                <Link to="/collections/sensoriais" className="text-gray-300 hover:text-[#D4AF69] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Brinquedos Sensoriais
                </Link>
              </li>
              <li>
                <Link to="/collections/educativos" className="text-gray-300 hover:text-[#D4AF69] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Brinquedos Educativos
                </Link>
              </li>
              <li>
                <Link to="/collections/terapeuticos" className="text-gray-300 hover:text-[#D4AF69] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Brinquedos Terapêuticos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#D4AF69] text-sm font-bold mb-6 uppercase tracking-widest relative inline-block">
              Ajuda
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#D4AF69] to-transparent"></div>
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/pages/faq" className="text-gray-300 hover:text-[#D4AF69] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/pages/trocas-devolucoes" className="text-gray-300 hover:text-[#D4AF69] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Trocas e Devoluções
                </Link>
              </li>
              <li>
                <Link to="/pages/politica-frete" className="text-gray-300 hover:text-[#D4AF69] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Política de Frete
                </Link>
              </li>
              <li>
                <Link to="/pages/contato" className="text-gray-300 hover:text-[#D4AF69] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#D4AF69] text-sm font-bold mb-6 uppercase tracking-widest relative inline-block">
              Institucional
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#D4AF69] to-transparent"></div>
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/pages/quem-somos" className="text-gray-300 hover:text-[#D4AF69] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Quem Somos
                </Link>
              </li>
              <li>
                <Link to="/pages/missao" className="text-gray-300 hover:text-[#D4AF69] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Nossa Missão
                </Link>
              </li>
              <li>
                <Link to="/pages/parcerias" className="text-gray-300 hover:text-[#D4AF69] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Parcerias com Terapeutas
                </Link>
              </li>
              <li>
                <Link to="/pages/politica-privacidade" className="text-gray-300 hover:text-[#D4AF69] text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#D4AF69]/20 pt-12">
          <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
            <div>
              <h4 className="text-[#D4AF69] text-sm font-semibold mb-4 uppercase tracking-wider">
                Siga Nosso Trabalho
              </h4>
              <div className="flex gap-3">
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
                  href="https://www.facebook.com/brinqueteando" 
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
                  href="https://wa.me/5513999999999" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-11 h-11 flex items-center justify-center bg-white/5 backdrop-blur-sm border border-[#D4AF69]/30 rounded-lg hover:bg-[#D4AF69] hover:border-[#D4AF69] transition-all duration-300 hover:scale-110 group"
                  aria-label="WhatsApp"
                >
                  <svg className="w-5 h-5 text-[#D4AF69] group-hover:text-[#0A3D2F]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="text-right">
              <h4 className="text-[#D4AF69] text-sm font-semibold mb-4 uppercase tracking-wider">
                Pagamento Seguro
              </h4>
              <div className="flex justify-end gap-2 flex-wrap">
                {['Visa', 'Mastercard', 'PIX', 'Boleto', 'PayPal'].map((method) => (
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
                © {new Date().getFullYear()} BrinqueTEAndo. Todos os direitos reservados.
              </p>
              <div className="flex items-center gap-4">
                <span className="text-[#D4AF69]">★★★★★</span>
                <span>Mais de 1.000 famílias satisfeitas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="h-1 bg-gradient-to-r from-transparent via-[#D4AF69] to-transparent"></div>
    </footer>
  );
}
