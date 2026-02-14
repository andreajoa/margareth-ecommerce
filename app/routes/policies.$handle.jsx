import {useLoaderData, Link} from 'react-router';

export async function loader({params, context}) {
  const {handle} = params;
  const {storefront} = context;

  if (!storefront) {
    throw new Response('Erro de configuração do Storefront', {status: 500});
  }

  const {shop} = await storefront.query(POLICIES_QUERY);

  let policy = {
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

  // 🔥 EXTRAI APENAS O CONTEÚDO DO BODY
  if (policy.body) {
    let cleanBody = policy.body;
    
    // Remove tudo antes de <body> incluindo <body>
    cleanBody = cleanBody.replace(/^[\s\S]*?<body[^>]*>/i, '');
    
    // Remove </body> e tudo depois
    cleanBody = cleanBody.replace(/<\/body>[\s\S]*$/i, '');
    
    // Remove tags <style> e seu conteúdo (vamos usar nosso CSS)
    cleanBody = cleanBody.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
    
    // Remove tags <script> e seu conteúdo
    cleanBody = cleanBody.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
    
    // Remove meta tags
    cleanBody = cleanBody.replace(/<meta[^>]*>/gi, '');
    
    // Remove link tags (exceto se for importante)
    cleanBody = cleanBody.replace(/<link[^>]*>/gi, '');
    
    policy = {...policy, body: cleanBody.trim()};
  }

  return {policy};
}

export const meta = ({data}) => {
  return [{title: `brinqueTEAndo | ${data?.policy?.title ?? 'Política'}`}];
};

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

      <main className="flex-grow w-full">
        <div className="w-full">
          {/* Renderiza o HTML limpo da Shopify */}
          <div dangerouslySetInnerHTML={{__html: policy.body}} />
        </div>
      </main>

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
