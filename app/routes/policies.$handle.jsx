import {useLoaderData, Link} from 'react-router';

export async function loader({params, context}) {
  const {handle} = params;
  const {storefront} = context;

  const {shop} = await storefront.query(POLICIES_QUERY);

  const policy = {
    'privacy-policy': shop.privacyPolicy,
    'politica-de-privacidade': shop.privacyPolicy,
    'shipping-policy': shop.shippingPolicy,
    'politica-de-envio': shop.shippingPolicy,
    'terms-of-service': shop.termsOfService,
    'refund-policy': shop.refundPolicy,
    'politica-de-devolucao': shop.refundPolicy,
    'subscription-policy': shop.subscriptionPolicy,
    'politica-de-cookies': shop.subscriptionPolicy 
  }[handle];

  if (!policy) {
    throw new Response('Política não encontrada', {status: 404});
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

  return {policy, footerMenu};
}

export const meta = ({data}) => {
  return [
    {title: `brinqueTEAndo | ${data?.policy?.title ?? 'Política'}`},
  ];
};

export default function Policy() {
  const {policy, footerMenu} = useLoaderData();

  return (
    <div className="bg-[#FEFDF8] flex flex-col min-h-screen w-full overflow-x-hidden">
      
      {/* HEADER */}
      <nav className="bg-white shadow-sm sticky top-0 z-50 w-full border-b-4 border-[#3A8ECD]">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
             <Link to="/" className="flex items-center group flex-shrink-0">
                <img 
                  src="https://cdn.shopify.com/s/files/1/0973/7116/0942/files/ChatGPT_Image_Jan_5__2026__01_21_24_PM-removebg-preview_96f44aed-45b5-43f6-86b1-9b1039d9e94b.png?v=1769926918" 
                  alt="brinqueTEAando" 
                  className="h-16 sm:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
             </Link>
             <Link to="/" className="text-[#3A8ECD] font-bold text-sm hover:underline">
                Voltar para Início
             </Link>
          </div>
      </nav>

      {/* CONTEÚDO */}
      <div className="flex-grow w-full">
        <div className="w-full" dangerouslySetInnerHTML={{__html: policy.body}} />
      </div>

      {/* FOOTER CLEAN E CENTRALIZADO */}
      <footer className="bg-[#FEFDF8] pt-20 pb-10 border-t-4 border-[#3A8ECD] w-full">
          {/* Grid Centralizado */}
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16 text-center">
             
             {footerMenu.items.map((group) => (
               <div key={group.id} className="flex flex-col items-center">
                  
                  {/* Título Elegante */}
                  <h3 className="font-bold text-[#0A3D2F] text-lg tracking-widest uppercase mb-6 border-b-2 border-transparent hover:border-[#FB8A38] transition-all duration-300 pb-2 inline-block">
                    {group.title}
                  </h3>

                  {/* Lista com Espaçamento Limpo */}
                  <ul className="flex flex-col gap-4 text-sm text-gray-500 w-full">
                    {group.items.map((link) => (
                      <li key={link.id} className="w-full">
                        <Link 
                          to={link.url} 
                          className="hover:text-[#FB8A38] hover:font-medium transition-all duration-200 block py-1"
                        >
                          {link.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
               </div>
             ))}

          </div>

          {/* Copyright Centralizado */}
          <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
              <p className="text-center md:text-left">&copy; {new Date().getFullYear()} brinqueTEAndo. Todos os direitos reservados.</p>
              <div className="flex gap-6 justify-center">
                <span className="cursor-pointer hover:text-[#3A8ECD] transition-colors">Privacidade</span>
                <span className="cursor-pointer hover:text-[#3A8ECD] transition-colors">Termos de Uso</span>
              </div>
          </div>
      </footer>
    </div>
  );
}

const POLICIES_QUERY = `#graphql
  fragment PolicyItem on ShopPolicy {
    id
    title
    handle
    body
  }
  query Policies {
    shop {
      privacyPolicy { ...PolicyItem }
      shippingPolicy { ...PolicyItem }
      termsOfService { ...PolicyItem }
      refundPolicy { ...PolicyItem }
      subscriptionPolicy { ...PolicyItem }
    }
  }
`;
