import { Link, useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';
import { fetchShopify } from '../lib/shopify.js';
import { COLLECTIONS_QUERY } from '../lib/queries.js';

export const meta = () => ([
  { title: 'BrinqueTEAndo - Brinquedos Educativos para Autismo, TDAH e TEA | Litoral SP' },
  { name: 'description', content: 'Brinquedos que transformam o aprendizado. Benefícios para TEA/TDAH. Entrega no litoral de SP.' },
]);

export async function loader() {
  const data = await fetchShopify(COLLECTIONS_QUERY, { first: 4 }).catch(() => null);
  const collections = data?.collections?.edges?.map((e) => e.node) || [];
  return json({ collections });
}

export default function HomePage() {
  const { collections } = useLoaderData();
  return (
    <div>
      <section style={{
        padding: '40px',
        background: 'var(--brand-blue-light)',
        borderRadius: '16px',
        position: 'relative'
      }}>
        <h1 style={{color: 'var(--brand-blue-dark)'}}>Brinquedos que Transformam o Aprendizado</h1>
        <p>Foco nos benefícios para TEA/TDAH e desenvolvimento infantil.</p>
        <div style={{display:'flex', gap:'12px', marginTop:'16px'}}>
          <Link className="btn-primary" to="/collections/sensory-toys">EXPLORAR BRINQUEDOS</Link>
          <Link className="btn-secondary" to="/about">SOBRE NÓS</Link>
        </div>
        <div aria-hidden style={{position:'absolute', right:20, top:20, opacity:0.2, fontSize:'64px'}}>🐉</div>
      </section>

      <section style={{marginTop:'32px'}}>
        <h2>Coleções em Destaque</h2>
        <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'16px'}}>
          {collections.map(c => (
            <div key={c.id} style={{border:'1px solid #eee', borderRadius:'12px', padding:'16px'}}>
              <h3>{c.title}</h3>
              <p>Explore produtos recomendados para desenvolvimento.</p>
              <Link className="btn-secondary" to={`/collections/${c.handle}`}>VER COLEÇÃO</Link>
            </div>
          ))}
        </div>
      </section>

      <section style={{marginTop:'32px'}}>
        <h2>Mais Amados pelas Famílias</h2>
        <p>Carousel/grid de best sellers (placeholder).</p>
      </section>

      <section style={{marginTop:'32px'}}>
        <h2>Nosso Compromisso Educacional</h2>
        <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'16px'}}>
          {['Desenvolvimento Através da Brincadeira','Recomendados por Terapeutas','Segurança e Qualidade','Entrega Rápida no Litoral de SP'].map((t,i)=> (
            <div key={i} style={{border:'1px solid #eee', borderRadius:'12px', padding:'16px'}}>
              <strong>{t}</strong>
              <p>Conteúdo educativo breve explicando o benefício.</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{marginTop:'32px'}}>
        <h2>Aprenda Conosco</h2>
        <p>Cards de blog/artigos (placeholder).</p>
      </section>

      <section style={{marginTop:'32px', background:'var(--brand-blue-light)', padding:'24px', borderRadius:'12px'}}>
        <h2 style={{color:'var(--brand-blue-dark)'}}>Receba Dicas e Novidades</h2>
        <p>Cadastre-se e receba conteúdo exclusivo sobre desenvolvimento infantil</p>
        <form style={{display:'flex', gap:'12px', flexWrap:'wrap'}} onSubmit={(e)=>e.preventDefault()}>
          <input placeholder="Nome" />
          <input type="email" placeholder="Email" required />
          <input placeholder="WhatsApp" />
          <button className="btn-primary" type="submit">CADASTRAR</button>
        </form>
      </section>
    </div>
  );
}
