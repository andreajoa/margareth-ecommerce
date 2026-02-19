import {useLoaderData, Link} from '@remix-run/react';
import {json} from '@shopify/remix-oxygen';
import {Image, Pagination, getPaginationVariables} from '@shopify/hydrogen';
import {useAside} from '~/components/Aside';
import {useCountdown} from '~/lib/useCountdown';

export async function loader({context, params, request}) {
  const {blogHandle} = params;
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {pageBy: 12});

  if (!blogHandle) {
    throw new Response('Blog not found', {status: 404});
  }

  const {blog} = await storefront.query(BLOG_QUERY, {
    variables: {
      blogHandle,
      ...paginationVariables,
    },
  });

  if (!blog) {
    throw new Response('Blog not found', {status: 404});
  }

  return json({blog});
}

export default function Blog() {
  const {blog} = useLoaderData();
  const {open} = useAside();
  const {timeLeft} = useCountdown();

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
            <button type="button" onClick={() => open('cart')} className="relative group">
              <span className="text-2xl">🛒</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Blog Content */}
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <span className="text-[#FB8A38] font-bold text-sm tracking-widest uppercase mb-2 block">BLOG</span>
          <h1 className="text-4xl md:text-5xl font-black text-[#3A8ECD] mb-4">{blog.title}</h1>
        </div>

        <Pagination connection={blog.articles}>
          {({nodes, isLoading, PreviousLink, NextLink}) => (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {nodes.map((article) => (
                  <Link
                    key={article.id}
                    to={`/blogs/${blog.handle}/${article.handle}`}
                    className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all"
                  >
                    {article.image && (
                      <div className="aspect-video overflow-hidden">
                        <Image
                          data={article.image}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-[#0A3D2F] mb-2 group-hover:text-[#3A8ECD] transition-colors">
                        {article.title}
                      </h2>
                      {article.excerpt && (
                        <p className="text-gray-500 text-sm line-clamp-3 mb-4">
                          {article.excerpt}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">
                          {new Date(article.publishedAt).toLocaleDateString('pt-BR')}
                        </span>
                        <span className="text-[#FB8A38] font-bold text-sm">Ler mais →</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="flex justify-center gap-4">
                <PreviousLink className="px-6 py-3 bg-white border-2 border-[#3A8ECD] text-[#3A8ECD] rounded-full hover:bg-[#3A8ECD] hover:text-white transition-colors">
                  {isLoading ? 'Carregando...' : 'Artigos Anteriores'}
                </PreviousLink>
                <NextLink className="px-6 py-3 bg-[#3A8ECD] text-white rounded-full hover:bg-[#2c7bb5] transition-colors">
                  {isLoading ? 'Carregando...' : 'Próximos Artigos'}
                </NextLink>
              </div>
            </>
          )}
        </Pagination>
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

const BLOG_QUERY = `#graphql
  query Blog(
    $blogHandle: String!
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) {
    blog(handle: $blogHandle) {
      title
      handle
      articles(
        first: $first
        last: $last
        before: $startCursor
        after: $endCursor
        sortKey: PUBLISHED_AT
        reverse: true
      ) {
        nodes {
          id
          title
          handle
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
        pageInfo {
          hasPreviousPage
          hasNextPage
          startCursor
          endCursor
        }
      }
    }
  }
`;
