import {useLoaderData, Link} from 'react-router';
import {Image} from '@shopify/hydrogen';
import {useAside} from '~/components/Aside';
import {useCountdown} from '~/lib/useCountdown';
import {useState, useEffect} from 'react';

export const meta = ({data}) => [{title: `brinqueTEAndo | ${data?.article?.title ?? 'Artigo'}`}, {name:'description', content: data?.article?.excerpt || ''}];

export async function loader({context, params}) {
  const {blogHandle, articleHandle} = params;
  const {storefront, cart} = context;
  if (!blogHandle || !articleHandle) throw new Response('Not found', {status: 404});
  const {blog} = await storefront.query(ARTICLE_QUERY, {variables: {blogHandle, articleHandle}});
  if (!blog?.articleByHandle) throw new Response('Article not found', {status: 404});
  return {article: blog.articleByHandle, blogTitle: blog.title, blogHandle, cart: await cart.get()};
}

function Content({html}) {
  const clean = raw => raw
    ? raw
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    : '';
  return (
    <div
      style={{maxWidth: '100%', overflowX: 'hidden'}}
      dangerouslySetInnerHTML={{__html: clean(html)}}
    />
  );
}

export default function Article() {
  const {article, blogTitle, blogHandle, cart} = useLoaderData();
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
          {isMounted && <div className="flex items-center gap-1 border-2 border-white px-3 py-1 bg-white/20 text-lg font-bold">{String(timeLeft.days).padStart(2,'0')}d {String(timeLeft.hours).padStart(2,'00')}h {String(timeLeft.minutes).padStart(2,'00')}m {String(timeLeft.seconds).padStart(2,'00')}s</div>}
        </div>
      </div>
      <div className="bg-[#FB8A38] text-white py-2 text-center"><span className="font-bold text-sm">{msgs[promo]}</span></div>
      <nav className="bg-white shadow-sm sticky top-0 z-50 border-b-4 border-[#3A8ECD]">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/"><img src="https://cdn.shopify.com/s/files/1/0973/7116/0942/files/ChatGPT_Image_Jan_5__2026__01_21_24_PM-removebg-preview_96f44aed-45b5-43f6-86b1-9b1039d9e94b.png?v=1769926918" alt="Logo" className="h-16 sm:h-20"/></Link>
          <div className="hidden lg:flex gap-6">
            <Link to="/" className="text-[#3A8ECD] font-bold text-sm uppercase">Início</Link>
            <Link to="/collections/all" className="text-[#3A8ECD] font-bold text-sm uppercase">Produtos</Link>
            <Link to={`/blogs/${blogHandle}`} className="text-[#FB8A38] font-bold text-sm uppercase">Blog</Link>
          </div>
          <button type="button" onClick={() => open('cart')} className="relative">
            <span className="text-2xl">🛒</span>
            <span className="absolute -top-2 -right-2 bg-[#FB8A38] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">{cart?.totalQuantity||0}</span>
          </button>
        </div>
      </nav>
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Content html={article.contentHtml}/>
        </div>
      </main>
      <footer className="bg-[#FEFDF8] pt-12 pb-8 border-t-4 border-[#3A8ECD] text-center text-xs text-gray-400"><p>&copy; {new Date().getFullYear()} brinqueTEAndo</p></footer>
    </div>
  );
}

const ARTICLE_QUERY = `#graphql
  query Article($blogHandle:String!$articleHandle:String!){blog(handle:$blogHandle){title handle articleByHandle(handle:$articleHandle){id title contentHtml publishedAt excerpt image{id url altText width height}}}}
`;
