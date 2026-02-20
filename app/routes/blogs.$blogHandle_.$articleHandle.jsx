import {useLoaderData, Link} from 'react-router';
import {Image} from '@shopify/hydrogen';
import {useAside} from '~/components/Aside';
import {useCountdown} from '~/lib/useCountdown';
import {useState, useEffect, useRef} from 'react';

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
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    ref.current.querySelectorAll('[style]').forEach(n => n.removeAttribute('style'));
    ref.current.querySelectorAll('img').forEach(n => { n.style.maxWidth='100%'; n.style.height='auto'; n.style.borderRadius='12px'; n.style.margin='1.5rem auto'; n.style.display='block'; });
  }, [html]);
  const clean = raw => raw ? raw.replace(/<style[^>]*>[\s\S]*?<\/style>/gi,'').replace(/<script[^>]*>[\s\S]*?<\/script>/gi,'').replace(/\s*style\s*=\s*"[^"]*"/gi,'').replace(/\s*class\s*=\s*"[^"]*"/gi,'') : '';
  return <div ref={ref} className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{__html: clean(html)}}/>;
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
          {isMounted && <div className="flex items-center gap-1 border-2 border-white px-3 py-1 bg-white/20 text-lg font-bold">{String(timeLeft.days).padStart(2,'0')}d {String(timeLeft.hours).padStart(2,'0')}h {String(timeLeft.minutes).padStart(2,'0')}m {String(timeLeft.seconds).padStart(2,'0')}s</div>}
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
        {article.image && (
          <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[50vh] relative overflow-hidden">
            <Image data={article.image} className="w-full h-full object-cover" sizes="100vw" loading="eager"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"/>
          </div>
        )}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-16 relative z-10">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 border">
            <nav className="mb-6 text-sm text-gray-400"><Link to="/" className="hover:text-[#3A8ECD]">Início</Link> › <Link to={`/blogs/${blogHandle}`} className="hover:text-[#3A8ECD]">{blogTitle}</Link> › <span className="text-gray-600">{article.title}</span></nav>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0A3D2F] mb-4">{article.title}</h1>
            <div className="text-sm text-gray-400 mb-8 pb-8 border-b">📅 {new Date(article.publishedAt).toLocaleDateString('pt-BR', {day:'2-digit', month:'long', year:'numeric'})}</div>
            <Content html={article.contentHtml}/>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-gradient-to-r from-[#3A8ECD]/5 to-[#FB8A38]/5 rounded-2xl p-6">
            <div><h3 className="text-lg font-bold text-[#0A3D2F]">Gostou?</h3><p className="text-gray-500 text-sm">Compartilhe!</p></div>
            <Link to={`/blogs/${blogHandle}`} className="border-2 border-[#3A8ECD] text-[#3A8ECD] px-4 py-2 rounded-full font-bold text-sm hover:bg-[#3A8ECD] hover:text-white">← Voltar ao Blog</Link>
          </div>
        </div>
        <div className="bg-gradient-to-r from-[#3A8ECD] to-[#21388D] py-16 text-center">
          <h2 className="text-3xl font-black text-white mb-4">Conheça nossos brinquedos</h2>
          <Link to="/collections/all" className="inline-block bg-[#FB8A38] text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform">🧸 Ver Produtos</Link>
        </div>
      </main>
      <footer className="bg-[#FEFDF8] pt-12 pb-8 border-t-4 border-[#3A8ECD] text-center text-xs text-gray-400"><p>&copy; {new Date().getFullYear()} brinqueTEAndo</p></footer>
    </div>
  );
}

const ARTICLE_QUERY = `#graphql
  query Article($blogHandle:String!$articleHandle:String!){blog(handle:$blogHandle){title handle articleByHandle(handle:$articleHandle){id title contentHtml publishedAt excerpt image{id url altText width height}}}}
`;
