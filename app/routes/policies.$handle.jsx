import {useLoaderData, Link} from 'react-router';

export async function loader({params, context}) {
  const {handle} = params;
  const {storefront} = context;

  if (!storefront) {
    throw new Response('Erro de configuração do Storefront', {status: 500});
  }

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
    'politica-de-cookies': shop.subscriptionPolicy,
  }[handle];

  if (!policy) {
    throw new Response('Política não encontrada', {status: 404});
  }

  return {policy};
}

export const meta = ({data}) => {
  return [{title: `brinqueTEAndo | ${data?.policy?.title ?? 'Política'}`}];
};

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: 'data:text/css,.shopify-content{color:%23374151!important;font-size:1rem!important;line-height:1.75!important}.shopify-content h1,.shopify-content h2,.shopify-content h3,.shopify-content h4{color:%233A8ECD!important;font-weight:700!important;margin:1.5em 0 .75em!important;line-height:1.3!important}.shopify-content h1{font-size:1.75rem!important}.shopify-content h2{font-size:1.5rem!important}.shopify-content h3{font-size:1.25rem!important}.shopify-content h4{font-size:1.125rem!important}.shopify-content p{margin-bottom:1em!important;line-height:1.75!important}.shopify-content ul{list-style-type:disc!important;margin-left:1.5em!important;padding-left:1em!important;margin-bottom:1em!important}.shopify-content ol{list-style-type:decimal!important;margin-left:1.5em!important;padding-left:1em!important;margin-bottom:1em!important}.shopify-content li{margin-bottom:.5em!important;display:list-item!important;line-height:1.6!important}.shopify-content strong,.shopify-content b{font-weight:700!important;color:%230A3D2F!important}.shopify-content em,.shopify-content i{font-style:italic!important}.shopify-content a{color:%23FB8A38!important;text-decoration:underline!important}.shopify-content table{width:100%!important;border-collapse:collapse!important;margin:1.5em 0!important}.shopify-content th{padding:.75rem 1rem!important;border:1px solid %23e5e7eb!important;background-color:%233A8ECD!important;color:white!important}.shopify-content td{padding:.75rem 1rem!important;border:1px solid %23e5e7eb!important}.shopify-content img{max-width:100%!important;height:auto!important;border-radius:8px!important;margin:1em 0!important}.shopify-content blockquote{border-left:4px solid %23FB8A38!important;padding:.75em 1.25em!important;margin:1.5em 0!important;background-color:%23FFF8F0!important}.shopify-content hr{border:none!important;border-top:2px solid %23e5e7eb!important;margin:2em 0!important}'
    }
  ];
}

export default function Policy() {
  const {policy} = useLoaderData();

  const footerMenu = [
    {
      title: '🧸 BrinqueTEAndo',
      items: [
        {title: 'Quem é Margareth Almeida', url: '/pages/quem-e-margareth-almeida'},
        {title: 'Leve a BrinqueTEAndo até Você', url: '/pages/leve-a-brinqueteando-ate-voce'},
        {title: 'Seja Revendedor BrinqueTEAndo', url: '/pages/seja-revendedor-brinqueteando'},
        {title: 'Guias práticos', url: '/pages/guias-praticos'},
      ],
    },
    {
      title: '💡 Conteúdos',
      items: [
        {title: 'Como escolher brinquedos', url: '/pages/como-escolher-brinquedos'},
        {title: 'Dicas para TDAH e TEA', url: '/pages/dicas-para-tdah-e-tea'},
        {title: 'FAQ', url: '/pages/faq'},
      ],
    },
    {
      title: '📦 Ajuda',
      items: [
        {title: 'Contato', url: '/pages/contact'},
        {title: 'Política de Envio', url: '/policies/politica-de-envio'},
        {title: 'Política de Devolução', url: '/policies/politica-de-devolucao'},
      ],
    },
    {
      title: '🔒 Legal',
      items: [
        {title: 'Política de Privacidade', url: '/policies/politica-de-privacidade'},
        {title: 'Termos de Serviço', url: '/policies/terms-of-service'},
      ],
    },
  ];

  return (
    <div className="bg-[#FEFDF8] flex flex-col min-h-screen w-full">
      {/* HEADER */}
      <nav className="bg-white shadow-sm sticky top-0 z-50 w-full border-b-4 border-[#3A8ECD]">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center group flex-shrink-0">
            <img
              src="https://cdn.shopify.com/s/files/1/0973/7116/0942/files/ChatGPT_Image_Jan_5__2026__01_21_24_PM-removebg-preview_96f44aed-45b5-43f6-86b1-9b1039d9e94b.png?v=1769926918"
              alt="brinqueTEAando"
              className="h-16 sm:h-20 w-auto object-contain"
            />
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/collections/all" className="text-[#3A8ECD] font-bold text-sm hover:text-[#FB8A38] transition-colors">
              PRODUTOS
            </Link>
            <Link to="/" className="text-[#3A8ECD] font-bold text-sm hover:text-[#FB8A38] transition-colors">
              INÍCIO
            </Link>
          </div>
        </div>
      </nav>

      {/* CONTEÚDO */}
      <main className="flex-grow w-full bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <nav className="mb-6 text-sm text-gray-400">
            <Link to="/" className="hover:text-[#3A8ECD]">Início</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-600">{policy.title}</span>
          </nav>

          <header className="mb-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#0A3D2F] mb-4">
              {policy.title}
            </h1>
            <div className="h-1.5 w-20 bg-[#FB8A38] rounded-full mx-auto"></div>
          </header>

          <div className="w-full max-w-4xl mx-auto">
            <div
              className="shopify-content"
              dangerouslySetInnerHTML={{__html: policy.body}}
            />
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#FEFDF8] pt-16 pb-8 border-t-4 border-[#3A8ECD] w-full">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {footerMenu.map((group, idx) => (
            <div key={idx} className="text-center sm:text-left">
              <h3 className="font-bold text-[#0A3D2F] text-sm tracking-widest uppercase mb-4 pb-2 border-b-2 border-transparent hover:border-[#FB8A38] transition-all inline-block">
                {group.title}
              </h3>
              <ul className="flex flex-col gap-3 text-sm text-gray-500">
                {group.items.map((link, i) => (
                  <li key={i}>
                    <Link to={link.url} className="hover:text-[#FB8A38] transition-colors">
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-6 border-t border-gray-200 text-center text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} brinqueTEAndo. Todos os direitos reservados.</p>
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
