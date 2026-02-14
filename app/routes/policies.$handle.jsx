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
  return [
    {title: `brinqueTEAndo | ${data?.policy?.title ?? 'Política'}`},
  ];
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
        {title: 'Política de Envio', url: '/pages/politica-de-envio'},
        {title: 'Política de Devolução', url: '/pages/politica-de-devolucao'},
      ],
    },
    {
      title: '🔒 Legal',
      items: [
        {title: 'Política de Privacidade', url: '/policies/politica-de-privacidade'},
        {title: 'Política de Cookies', url: '/policies/politica-de-cookies'},
        {title: 'Aviso Legal', url: '/pages/aviso-legal'},
      ],
    },
  ];

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

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-grow w-full bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

          {/* Breadcrumb */}
          <nav className="mb-6 text-sm text-gray-400">
            <Link to="/" className="hover:text-[#3A8ECD] transition-colors">Início</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-600">{policy.title}</span>
          </nav>

          {/* Título */}
          <header className="mb-8 text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0A3D2F] mb-3">
              {policy.title}
            </h1>
            <div className="h-1.5 w-20 bg-[#FB8A38] rounded-full mx-auto sm:mx-0"></div>
          </header>

          {/* Corpo da Política - com CSS que estiliza o HTML da Shopify */}
          <div
            className="policy-content"
            dangerouslySetInnerHTML={{__html: policy.body}}
          />
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#FEFDF8] pt-16 pb-8 border-t-4 border-[#3A8ECD] w-full">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {footerMenu.map((group, idx) => (
            <div key={idx} className="text-center sm:text-left">
              <h3 className="font-bold text-[#0A3D2F] text-sm tracking-widest uppercase mb-4 pb-2 border-b-2 border-transparent hover:border-[#FB8A38] transition-all duration-300 inline-block">
                {group.title}
              </h3>
              <ul className="flex flex-col gap-3 text-sm text-gray-500">
                {group.items.map((link, i) => (
                  <li key={i}>
                    <Link
                      to={link.url}
                      className="hover:text-[#FB8A38] transition-colors"
                    >
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

      {/* CSS CRÍTICO para renderizar HTML da Shopify corretamente */}
      <style dangerouslySetInnerHTML={{__html: `
        /* ===== RESET do HTML da Shopify dentro de .policy-content ===== */
        .policy-content {
          color: #374151;
          font-size: 1rem;
          line-height: 1.75;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }

        /* Headings */
        .policy-content h1,
        .policy-content h2,
        .policy-content h3,
        .policy-content h4,
        .policy-content h5,
        .policy-content h6 {
          color: #3A8ECD;
          font-weight: 700;
          margin-top: 1.5em;
          margin-bottom: 0.75em;
          line-height: 1.3;
        }
        .policy-content h1 { font-size: 1.75rem; }
        .policy-content h2 { font-size: 1.5rem; }
        .policy-content h3 { font-size: 1.25rem; }
        .policy-content h4 { font-size: 1.125rem; }

        /* Parágrafos */
        .policy-content p {
          margin-bottom: 1em;
          line-height: 1.75;
        }

        /* Links */
        .policy-content a {
          color: #FB8A38;
          text-decoration: underline;
          transition: color 0.2s;
        }
        .policy-content a:hover {
          color: #3A8ECD;
        }

        /* Listas */
        .policy-content ul,
        .policy-content ol {
          margin-left: 1.5em;
          margin-bottom: 1em;
          padding-left: 1em;
        }
        .policy-content ul { list-style-type: disc; }
        .policy-content ol { list-style-type: decimal; }
        .policy-content li {
          margin-bottom: 0.5em;
          line-height: 1.6;
        }
        .policy-content li ul,
        .policy-content li ol {
          margin-top: 0.5em;
        }

        /* Negrito e itálico */
        .policy-content strong,
        .policy-content b {
          font-weight: 700;
          color: #0A3D2F;
        }
        .policy-content em,
        .policy-content i {
          font-style: italic;
        }

        /* ===== TABELAS da Shopify ===== */
        .policy-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5em 0;
          font-size: 0.875rem;
          display: block;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        .policy-content thead {
          background-color: #3A8ECD;
          color: white;
        }
        .policy-content th {
          padding: 0.75rem 1rem;
          text-align: left;
          font-weight: 600;
          white-space: nowrap;
        }
        .policy-content td {
          padding: 0.75rem 1rem;
          border-bottom: 1px solid #e5e7eb;
          vertical-align: top;
        }
        .policy-content tbody tr:nth-child(even) {
          background-color: #f9fafb;
        }
        .policy-content tbody tr:hover {
          background-color: #f0f7ff;
        }

        /* ===== Imagens ===== */
        .policy-content img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 1em 0;
        }

        /* ===== Blockquotes ===== */
        .policy-content blockquote {
          border-left: 4px solid #FB8A38;
          padding: 0.75em 1.25em;
          margin: 1.5em 0;
          background-color: #FFF8F0;
          border-radius: 0 8px 8px 0;
          color: #555;
          font-style: italic;
        }

        /* ===== HR ===== */
        .policy-content hr {
          border: none;
          border-top: 2px solid #e5e7eb;
          margin: 2em 0;
        }

        /* ===== Código ===== */
        .policy-content code {
          background-color: #f3f4f6;
          padding: 0.15em 0.4em;
          border-radius: 4px;
          font-size: 0.875em;
        }
        .policy-content pre {
          background-color: #1f2937;
          color: #f9fafb;
          padding: 1em;
          border-radius: 8px;
          overflow-x: auto;
          margin: 1.5em 0;
        }
        .policy-content pre code {
          background: none;
          padding: 0;
          color: inherit;
        }

        /* ===== Shopify inline styles override ===== */
        .policy-content [style] {
          max-width: 100% !important;
        }
        .policy-content div[style*="overflow"] {
          overflow-x: auto !important;
          overflow-y: visible !important;
        }

        /* ===== iFrames (vídeos embeddados) ===== */
        .policy-content iframe {
          max-width: 100%;
          border-radius: 8px;
          margin: 1em 0;
        }

        /* ===== Mobile responsivo ===== */
        @media (max-width: 640px) {
          .policy-content {
            font-size: 0.9375rem;
          }
          .policy-content h1 { font-size: 1.5rem; }
          .policy-content h2 { font-size: 1.25rem; }
          .policy-content h3 { font-size: 1.125rem; }

          .policy-content table {
            font-size: 0.8125rem;
          }
          .policy-content th,
          .policy-content td {
            padding: 0.5rem 0.75rem;
          }
        }
      `}} />
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
