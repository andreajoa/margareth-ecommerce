import {useLoaderData, Link} from 'react-router';

export async function loader({params, context}) {
  const {handle} = params;
  const {storefront} = context;

  if (!handle) {
    throw new Response('Missing page handle', {status: 404});
  }

  const {page} = await storefront.query(PAGE_QUERY, {
    variables: {handle},
  });

  if (!page) {
    throw new Response('Página não encontrada', {status: 404});
  }

  return {page};
}

export const meta = ({data}) => {
  return [
    {title: `brinqueTEAndo | ${data?.page?.title ?? 'Página'}`},
    {name: 'description', content: data?.page?.seo?.description || 'Brinquedos Educativos'},
  ];
};

export default function Page() {
  const {page} = useLoaderData();

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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <nav className="mb-6 text-sm text-gray-400">
            <Link to="/" className="hover:text-[#3A8ECD]">Início</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-600">{page.title}</span>
          </nav>

          <header className="mb-8 text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0A3D2F] mb-3">
              {page.title}
            </h1>
            <div className="h-1.5 w-20 bg-[#FB8A38] rounded-full mx-auto sm:mx-0"></div>
          </header>

          <div
            className="shopify-content"
            dangerouslySetInnerHTML={{__html: page.body}}
          />
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

const PAGE_QUERY = `#graphql
  query Page($handle: String!) {
    page(handle: $handle) {
      id
      title
      body
      seo {
        description
        title
      }
    }
  }
`;
