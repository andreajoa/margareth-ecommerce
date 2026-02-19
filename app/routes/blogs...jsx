import {useLoaderData, Link} from '@remix-run/react';
import {json} from '@shopify/remix-oxygen';
import {Image} from '@shopify/hydrogen';
import {useAside} from '~/components/Aside';
import {useCountdown} from '~/lib/useCountdown';

export async function loader({context, params}) {
  const {blogHandle, articleHandle} = params;
  const {storefront} = context;

  if (!blogHandle || !articleHandle) {
    throw new Response('Article not found', {status: 404});
  }

  const {blog} = await storefront.query(ARTICLE_QUERY, {
    variables: {
      blogHandle,
      articleHandle,
    },
  });

  const article = blog?.articleByHandle;

  if (!article) {
    throw new Response('Article not found', {status: 404});
  }

  return json({article, blog});
}

export default function Article() {
  const {article, blog} = useLoaderData();
  const {open} = useAside();
  const {timeLeft} = useCountdown();

  // Função para limpar HTML da Shopify e garantir responsividade
  const cleanHtml = (html) => {
    if (!html) return '';

    // Remove estilos inline
    let clean = html.replace(/\sstyle="[^"]*"/g, '');
    clean = clean.replace(/\sstyle='[^']*'/g, '');

    // Remove classes
    clean = clean.replace(/\sclass="[^"]*"/g, '');
    clean = clean.replace(/\sclass='[^']*'/g, '');

    // Remove width/height fixos
    clean = clean.replace(/\swidth="[^"]*"/g, '');
    clean = clean.replace(/\sheight="[^"]*"/g, '');

    // Remove scripts e estilos
    clean = clean.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
    clean = clean.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');

    return clean;
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FEFDF8]">
      {/* Header */}
      <div className="bg-[#3A8ECD] text-white py-3 text-center w-full">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-4 flex-wrap">
          <span className="text-sm md:text-base font-bold tracking-wide">
            {timeLeft.holiday?.emoji} {timeLeft.holiday?.message} {timeLeft.holiday?.emoji}
          </span>
        </div>
      </div>

      {/* Navigation */}
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
            <Link to={`/blogs/${blog.handle}`} className="text-[#3A8ECD] font-bold text-sm hover:text-[#FB8A38] transition-colors">
              VOLTAR AO BLOG
            </Link>
            <button type="button" onClick={() => open('cart')} className="relative group">
              <span className="text-2xl">🛒</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Article Content */}
      <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
        <article className="bg-white rounded-2xl shadow-lg p-8">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm text-gray-400">
            <Link to="/" className="hover:text-[#3A8ECD]">Início</Link>
            <span className="mx-2">›</span>
            <Link to={`/blogs/${blog.handle}`} className="hover:text-[#3A8ECD]">{blog.title}</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-600">{article.title}</span>
          </nav>

          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-black text-[#0A3D2F] mb-4">
              {article.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
              <span>📅 {new Date(article.publishedAt).toLocaleDateString('pt-BR')}</span>
            </div>
          </header>

          {/* Article Image */}
          {article.image && (
            <div className="mb-8 rounded-xl overflow-hidden">
              <Image
                data={article.image}
                className="w-full h-auto object-cover"
                sizes="100vw"
              />
            </div>
          )}

          {/* Article Content - Cleaned HTML */}
          <div
            className="prose max-w-none shopify-content"
            dangerouslySetInnerHTML={{__html: cleanHtml(article.contentHtml)}}
          />
        </article>
      </main>

      {/* Footer */}
      <footer className="bg-[#FEFDF8] pt-16 pb-8 border-t-4 border-[#3A8ECD]">
        <div className="max-w-7xl mx-auto px-6 text-center text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} brinqueTEAndo. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

const ARTICLE_QUERY = `#graphql
  query Article($blogHandle: String!, $articleHandle: String!) {
    blog(handle: $blogHandle) {
      title
      handle
      articleByHandle(handle: $articleHandle) {
        id
        title
        contentHtml
        publishedAt
        excerpt
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
