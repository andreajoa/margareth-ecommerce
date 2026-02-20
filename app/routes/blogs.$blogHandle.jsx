import {useLoaderData, Link} from 'react-router';
import {getPaginationVariables, Pagination, Image} from '@shopify/hydrogen';
import {useAside} from '~/components/Aside';
import {useCountdown} from '~/lib/useCountdown';
import {useState, useEffect} from 'react';

export const meta = ({data}) => [{title: `brinqueTEAndo | ${data?.blog?.title ?? 'Blog'}`}];

export async function loader({context, params, request}) {
  const {blogHandle} = params;
  const {storefront, cart} = context;
  const paginationVariables = getPaginationVariables(request, {pageBy: 12});
  if (!blogHandle) throw new Response('Blog not found', {status: 404});
  const {blog} = await storefront.query(BLOG_QUERY, {variables: {blogHandle, ...paginationVariables}});
  if (!blog) throw new Response('Blog not found', {status: 404});
  return {blog, cart: await cart.get()};
}

export default function Blog() {
  const {blog, cart} = useLoaderData();
  const {open} = useAside();
  const {timeLeft, isMounted} = useCountdown();
  const [promo, setPromo] = useState(0);
  const msgs = ["🚚 Frete grátis Baixada Santista!", "⭐ REWARDS — Ganhe pontos!", "🎁 Trocas facilitadas", "🎅 BEMVINDO10 = 10% OFF"];
  useEffect(() => { const t = setInterval(() => setPromo(p => (p+1)%msgs.length), 4000); return () => clearInterval(t); }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#FEFDF8]">
      <div className="bg-[#3A8ECD] text-white py-3 text-center">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-4 flex-wrap">
          <span className="text-sm font-bold">{timeLeft.holiday?.emoji} {timeLeft.holiday?.message}</span>
          {isMounted && (
            <div className="flex items-center gap-1 border-2 border-white px-3 py-1 bg-white/20 text-lg font-bold">
              {String(timeLeft.days).padStart(2,'0')}d {String(timeLeft.hours).padStart(2,'0')}h {String(timeLeft.minutes).padStart(2,'0')}m {String(timeLeft.seconds).padStart(2,'0')}s
            </div>
          )}
        </div>
      </div>
      <div className="bg-[#FB8A38] text-white py-2 text-center"><span className="font-bold text-sm">{msgs[promo]}</span></div>
      <nav className="bg-white shadow-sm sticky top-0 z-50 border-b-4 border-[#3A8ECD]">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/"><img src="https://cdn.shopify.com/s/files/1/0973/7116/0942/files/ChatGPT_Image_Jan_5__2026__01_21_24_PM-removebg-preview_96f44aed-45b5-43f6-86b1-9b1039d9e94b.png?v=1769926918" alt="Logo" className="h-16 sm:h-20"/></Link>
          <div className="hidden lg:flex gap-6">
            <Link to="/" className="text-[#3A8ECD] font-bold text-sm uppercase">Início</Link>
            <Link to="/collections/all" className="text-[#3A8ECD] font-bold text-sm uppercase">Produtos</Link>
            <Link to={`/blogs/${blog.handle}`} className="text-[#FB8A38] font-bold text-sm uppercase">Blog</Link>
          </div>
          <button type="button" onClick={() => open('cart')} className="relative">
            <span className="text-2xl">🛒</span>
            <span className="absolute -top-2 -right-2 bg-[#FB8A38] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">{cart?.totalQuantity||0}</span>
          </button>
        </div>
      </nav>
      <div className="bg-gradient-to-r from-[#3A8ECD] to-[#21388D] py-16 text-center">
        <span className="text-[#FB8A38] font-bold text-sm uppercase">Blog</span>
        <h1 className="text-4xl md:text-5xl font-black text-white mt-2">{blog.title}</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-gray-400">
        <Link to="/" className="hover:text-[#3A8ECD]">Início</Link> › <span className="text-gray-600">{blog.title}</span>
      </div>
      <main className="flex-grow max-w-7xl mx-auto px-4 pb-20">
        <Pagination connection={blog.articles}>
          {({nodes, PreviousLink, NextLink}) => (
            <>
              <div className="flex justify-center mb-8"><PreviousLink className="px-6 py-2 border-2 border-[#3A8ECD] text-[#3A8ECD] rounded-full font-bold hover:bg-[#3A8ECD] hover:text-white">← Anteriores</PreviousLink></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {nodes.map(a => (
                  <Link key={a.id} to={`/blogs/${blog.handle}/${a.handle}`} className="group bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-xl transition-all">
                    {a.image && <div className="aspect-video overflow-hidden"><Image data={a.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform" sizes="(min-width:1024px)33vw,(min-width:768px)50vw,100vw"/></div>}
                    <div className="p-6">
                      <span className="text-gray-400 text-xs">{new Date(a.publishedAt).toLocaleDateString('pt-BR')}</span>
                      <h2 className="text-xl font-bold text-[#0A3D2F] mt-2 group-hover:text-[#3A8ECD] line-clamp-2">{a.title}</h2>
                      {a.excerpt && <p className="text-gray-500 text-sm line-clamp-3 mt-2">{a.excerpt}</p>}
                      <span className="text-[#FB8A38] font-bold text-sm mt-4 block">Ler mais →</span>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="flex justify-center mt-12"><NextLink className="px-8 py-3 bg-[#3A8ECD] text-white font-bold rounded-full shadow-lg hover:scale-105 transition-transform">Carregar Mais ↓</NextLink></div>
            </>
          )}
        </Pagination>
      </main>
      <footer className="bg-[#FEFDF8] pt-12 pb-8 border-t-4 border-[#3A8ECD] text-center text-xs text-gray-400">
        <p>&copy; {new Date().getFullYear()} brinqueTEAndo</p>
      </footer>
    </div>
  );
}

const BLOG_QUERY = `#graphql
  query Blog($blogHandle:String!$first:Int$last:Int$startCursor:String$endCursor:String){
    blog(handle:$blogHandle){title handle articles(first:$first,last:$last,before:$startCursor,after:$endCursor,sortKey:PUBLISHED_AT,reverse:true){nodes{id title handle publishedAt excerpt image{id url altText width height}}pageInfo{hasPreviousPage hasNextPage startCursor endCursor}}}
  }
`;
