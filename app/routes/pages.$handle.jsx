import {useLoaderData, Link} from 'react-router';

export async function loader({params, context}) {
  const {handle} = params;
  const {storefront} = context;

  try {
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
  } catch (error) {
    console.error("Erro no loader da página:", error);
    // Em caso de erro grave, tenta retornar nulo para ser tratado na UI ou lança erro
    throw new Response('Erro ao carregar página', {status: 500});
  }
}

export const meta = ({data}) => {
  return [
    {title: `brinqueTEAndo | ${data?.page?.title ?? 'Página'}`},
    {name: 'description', content: data?.page?.seo?.description || 'Brinquedos Educativos'},
  ];
};

export default function Page() {
  const {page} = useLoaderData();

  // Menu hardcoded para segurança e performance nesta página
  const footerMenu = [
    {
      title: '🧸 BrinqueTEAndo',
      items: [
        { title: 'Quem é Margareth Almeida', url: '/pages/quem-e-margareth-almeida' },
        { title: 'Leve a BrinqueTEAndo até Você', url: '/pages/leve-a-brinqueteando-ate-voce' },
        { title: 'Seja Revendedor BrinqueTEAndo', url: '/pages/seja-revendedor-brinqueteando' },
        { title: 'Guias práticos', url: '/pages/guias-praticos' },
      ]
    },
    {
      title: '💡 Conteúdos',
      items: [
        { title: 'Como escolher brinquedos', url: '/pages/como-escolher-brinquedos' },
        { title: 'Dicas para TDAH e TEA', url: '/pages/dicas-para-tdah-e-tea' },
        { title: 'FAQ', url: '/pages/faq' },
      ]
    },
    {
      title: '📦 Ajuda',
      items: [
        { title: 'Contato', url: '/pages/contact' },
        { title: 'Política de Envio', url: '/pages/politica-de-envio' },
        { title: 'Política de Devolução', url: '/pages/politica-de-devolucao' },
      ]
    },
    {
      title: '🔒 Legal',
      items: [
        { title: 'Política de Privacidade', url: '/policies/politica-de-privacidade' },
        { title: 'Política de Cookies', url: '/policies/politica-de-cookies' },
        { title: 'Aviso Legal', url: '/pages/aviso-legal' },
      ]
    }
  ];

  return (
    <div className="bg-[#FEFDF8] flex flex-col min-h-screen w-full">
      {/* HEADER SIMPLIFICADO - Focado em navegação robusta */}
      <nav className="bg-white shadow-sm sticky top-0 z-50 w-full border-b-4 border-[#3A8ECD]">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img 
              src="https://cdn.shopify.com/s/files/1/0973/7116/0942/files/ChatGPT_Image_Jan_5__2026__01_21_24_PM-removebg-preview_96f44aed-45b5-43f6-86b1-9b1039d9e94b.png?v=1769926918" 
              alt="brinqueTEAando" 
              className="h-16 w-auto"
            />
          </Link>
          <div className="flex items-center gap-6">
            <Link to="/" className="text-[#3A8ECD] font-bold text-sm hover:text-[#FB8A38]">
                INÍCIO
            </Link>
            <Link to="/collections/all" className="text-[#3A8ECD] font-bold text-sm hover:text-[#FB8A38]">
                PRODUTOS
            </Link>
          </div>
        </div>
      </nav>

      {/* CONTEÚDO CENTRALIZADO */}
      <main className="flex-grow w-full bg-white py-12">
        <div className="max-w-4xl mx-auto px-6">
          <header className="mb-10 text-center sm:text-left">
             <h1 className="text-3xl font-bold text-[#0A3D2F] mb-4">{page.title}</h1>
             <div className="h-1.5 w-20 bg-[#FB8A38] rounded-full mx-auto sm:mx-0"></div>
          </header>
          
          <div 
            className="prose prose-lg max-w-none text-gray-600 prose-headings:text-[#3A8ECD] prose-a:text-[#FB8A38] prose-strong:text-[#0A3D2F]"
            dangerouslySetInnerHTML={{__html: page.body}} 
          />
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#FEFDF8] pt-20 pb-10 border-t-4 border-[#3A8ECD] w-full">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {footerMenu.map((group, idx) => (
            <div key={idx}>
              <h3 className="font-bold text-[#0A3D2F] mb-6 uppercase">{group.title}</h3>
              <ul className="flex flex-col gap-3 text-sm text-gray-500">
                {group.items.map((link, i) => (
                  <li key={i}>
                    <Link to={link.url} className="hover:text-[#FB8A38]">
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-8 mt-10 border-t border-gray-200 text-center text-xs text-gray-400">
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
