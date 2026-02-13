import {QuickView} from "~/components/QuickView";
import {useLoaderData, Link} from 'react-router';
import {useState, useEffect} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import {useAside} from '~/components/Aside';
import {useCountdown} from '~/lib/useCountdown';

export const meta = () => {
  return [
    {title: 'brinqueTEAndo | Brinquedos Educativos e Sensoriais para Autismo e TDAH'},
    {name: 'description', content: 'Loja especializada em brinquedos educativos e sensoriais para crianças com Autismo (TEA) e TDAH. Produtos selecionados para desenvolvimento e inclusão.'},
    {property: 'og:title', content: 'brinqueTEAndo | Brinquedos Educativos e Sensoriais'},
    {property: 'og:description', content: 'Loja especializada em brinquedos para Autismo e TDAH. Desenvolvimento com diversão.'},
    {property: 'og:type', content: 'website'},
    {property: 'og:url', content: 'https://brinqueteando.online'},
    {name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=5'},
  ];
};

export async function loader({context}) {
  const {storefront, cart} = context;
  
  // Queries Executadas em Paralelo para Performance com tratamento de erro
  let collections = {nodes: []};
  let products = {nodes: []};
  
  try {
    const [collectionsResult, productsResult] = await Promise.all([
      storefront.query(FEATURED_COLLECTIONS_QUERY).catch(e => {
        console.error('Error fetching collections:', e);
        return {collections: {nodes: []}};
      }),
      storefront.query(FEATURED_PRODUCTS_QUERY).catch(e => {
        console.error('Error fetching products:', e);
        return {products: {nodes: []}};
      })
    ]);
    
    collections = collectionsResult?.collections || {nodes: []};
    products = productsResult?.products || {nodes: []};
  } catch (error) {
    console.error('Loader error:', error);
  }

  const footerMenu = {
    id: 'custom-footer-manual',
    items: [
      {
        id: 'group-1',
        title: '🧸 BrinqueTEAndo',
        items: [
          { id: 'l1', title: 'Quem é Margareth Almeida', url: '/pages/quem-e-margareth-almeida' },
          { id: 'l2', title: 'Leve a BrinqueTEAndo até Você', url: '/pages/leve-a-brinqueteando-ate-voce' },
          { id: 'l3', title: 'Seja Revendedor BrinqueTEAndo', url: '/pages/seja-revendedor-brinqueteando' },
          { id: 'l4', title: 'Guias práticos', url: '/pages/guias-praticos' },
        ]
      },
      {
        id: 'group-2',
        title: '💡 Conteúdos',
        items: [
          { id: 'l5', title: 'Como escolher brinquedos', url: '/pages/como-escolher-brinquedos' },
          { id: 'l6', title: 'Dicas para TDAH e TEA', url: '/pages/dicas-para-tdah-e-tea' },
          { id: 'l7', title: 'FAQ', url: '/pages/faq' },
        ]
      },
      {
        id: 'group-3',
        title: '📦 Ajuda',
        items: [
          { id: 'l8', title: 'Contact', url: '/pages/contact' },
          { id: 'l9', title: 'Política de Envio', url: '/pages/politica-de-envio' },
          { id: 'l10', title: 'Política de Devolução', url: '/pages/politica-de-devolucao' },
        ]
      },
      {
        id: 'group-4',
        title: '🔒 Legal',
        items: [
          { id: 'l11', title: 'Política de Privacidade', url: '/policies/politica-de-privacidade' },
          { id: 'l12', title: 'Política de Cookies', url: '/policies/politica-de-cookies' },
          { id: 'l13', title: 'Aviso Legal', url: '/pages/aviso-legal' },
        ]
      }
    ]
  };

  return {collections, products, footerMenu, cart: cart ? cart.get() : null};
}

export default function Homepage() {
  const {collections, products, footerMenu, cart} = useLoaderData();
  const [currentPromo, setCurrentPromo] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const {timeLeft} = useCountdown();
  const {open} = useAside();

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
        
        * { box-sizing: border-box; }
        body, html { overflow-x: hidden !important; width: 100% !important; margin: 0 !important; padding: 0 !important; }
        main { width: 100% !important; max-width: 100% !important; overflow-x: hidden !important; margin: 0 !important; padding: 0 !important; }
        
        @keyframes marquee-christmas {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-christmas {
          display: flex;
          width: fit-content;
          animation: marquee-christmas 60s linear infinite;
        }
      `}</style>

      <main role="main" className="bg-[#FEFDF8] flex flex-col min-h-screen w-full overflow-x-hidden">
        <div className="flex-grow w-full">
          
          {/* Top Bar */}
          <div className="bg-[#3A8ECD] text-white py-3 text-center w-full">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-4 flex-wrap">
              <span className="text-sm md:text-base font-bold tracking-wide">
                {timeLeft?.holiday?.emoji || '🎁'} {timeLeft?.holiday?.message || 'Ofertas Especiais'} {timeLeft?.holiday?.emoji || '🎁'}
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="bg-white shadow-sm sticky top-0 z-50 w-full border-b-4 border-[#3A8ECD]">
            <div className="max-w-7xl mx-auto px-3 py-3 sm:px-6 sm:py-4">
              <div className="flex items-center justify-between gap-2 sm:gap-4">
                <Link to="/" className="flex items-center group flex-shrink-0">
                    <img 
                      src="https://cdn.shopify.com/s/files/1/0973/7116/0942/files/ChatGPT_Image_Jan_5__2026__01_21_24_PM-removebg-preview_96f44aed-45b5-43f6-86b1-9b1039d9e94b.png?v=1769926918" 
                      alt="brinqueTEAando" 
                      className="h-20 sm:h-24 md:h-32 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                </Link>

                <div className="hidden lg:flex items-center gap-6 flex-1 justify-center">
                  {[
                    {name: 'INÍCIO', href: '/'},
                    {name: 'Brinquedos Terapêuticos', href: '/collections/brinquedos-terapeuticos'},
                    {name: 'Por Necessidade', href: '/collections/por-necessidade'},
                    {name: 'Por Idade', href: '/collections/por-idade'},
                    {name: 'Ambiente & Rotina', href: '/collections/ambiente-rotina'},
                    {name: 'Apoio aos Pais', href: '/collections/apoio-aos-pais'},
                    {name: 'CONTATO', href: '/pages/contact'}
                  ].map(item => (
                    <Link key={item.name} to={item.href} className="text-[#3A8ECD] font-bold text-sm hover:text-[#FB8A38] hover:underline decoration-2 underline-offset-4 transition-all uppercase tracking-wide whitespace-nowrap">
                      {item.name}
                    </Link>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <Link to="/account" className="text-[#3A8ECD] hover:text-[#FB8A38] text-[10px] sm:text-xs font-medium whitespace-nowrap transition-colors px-1 sm:px-2">Entrar</Link>
                  <button onClick={() => open('cart')} className="relative group">
                      <span className="text-2xl">🛒</span>
                      <span className="absolute -top-2 -right-2 bg-[#FB8A38] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white group-hover:scale-110 transition-transform">
                        {cart?.totalQuantity || 0}
                      </span>
                  </button>
                </div>
              </div>
            </div>
          </nav>

          {/* Hero Video */}
          <section className="mb-12 sm:mb-16 md:mb-20 w-full px-0">
            <div className="max-w-7xl mx-auto mt-4 sm:mt-8 px-2 sm:px-4 md:px-6 w-full">
              <div className="relative h-64 sm:h-80 md:h-96 lg:h-[70vh] overflow-hidden rounded-[10px] shadow-xl sm:shadow-2xl">
                <video id="hero-video" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
                  <source src="https://cdn.shopify.com/videos/c/o/v/288d4004873043ffb9ba58d24ba5a38c.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20 z-10"></div>
                <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 sm:px-8 md:px-16">
                  <p className="text-[#FB8A38] text-sm sm:text-lg md:text-xl tracking-wider mb-2 sm:mb-4">Brinquedos Educativos e Sensoriais para TEA e TDAH</p>
                  <Link to="/collections/all" className="inline-block border-2 border-[#FB8A38] bg-[#3A8ECD] text-white px-6 sm:px-10 py-2 sm:py-3 rounded-full hover:bg-[#FB8A38] hover:text-white hover:border-[#FB8A38] transition-all font-semibold tracking-wider w-fit mt-2 sm:mt-4 text-xs sm:text-base">EXPLORAR PRODUTOS</Link>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Products */}
          <section className="bg-white py-12 sm:py-16 md:py-20 mb-16 sm:mb-20 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <h2 className="text-[#0A3D2F] text-2xl sm:text-3xl md:text-4xl font-light text-center mb-8 sm:mb-12 tracking-wide">ESCOLHAS CONSCIENTES</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {products?.nodes?.slice(0, 8).map(p => (
                  <Link key={p.id} to={`/products/${p.handle}`} className="group">
                    <div className="relative aspect-square mb-3 sm:mb-4 overflow-hidden rounded-[10px] bg-[#FEFDF8] shadow-md sm:shadow-lg group-hover:shadow-xl transition-shadow">
                      {p.featuredImage && (
                        <Image data={p.featuredImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw" aspectRatio="1/1" />
                      )}
                    </div>
                    <div className="text-center px-2">
                      <h3 className="text-[#0A3D2F] font-light mb-2 hover:text-[#1a5757] transition-colors text-xs sm:text-sm line-clamp-2">{p.title}</h3>
                      <Money data={p.priceRange.minVariantPrice} className="text-[#2a2a2a] font-medium text-xs sm:text-sm"/>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Footer Clean */}
          <footer className="bg-[#FEFDF8] pt-20 pb-10 border-t-4 border-[#3A8ECD] w-full">
             <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
                <p className="text-center md:text-left">&copy; {new Date().getFullYear()} brinqueTEAndo. Todos os direitos reservados.</p>
             </div>
          </footer>
        </div>
      </main>

      <QuickView product={quickViewProduct} isOpen={!!quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </>
  );
}

const FEATURED_COLLECTIONS_QUERY = `#graphql
  query FeaturedCollections($country: CountryCode, $language: LanguageCode) 
  @inContext(country: $country, language: $language) {
    collections(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
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
    }
  }
`;

const FEATURED_PRODUCTS_QUERY = `#graphql
  query FeaturedProducts($country: CountryCode, $language: LanguageCode) 
  @inContext(country: $country, language: $language) {
    products(first: 8, sortKey: UPDATED_AT, reverse: true) {
      nodes {
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
    }
  }
`;
