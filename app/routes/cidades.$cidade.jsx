import {useLoaderData, Link} from 'react-router';
import {data as json} from 'react-router';
export async function loader({params, context}) {
  const CIDADES = {"santos":{"nome":"Santos","estado":"SP","regiao":"Baixada Santista","populacao":"433 mil","coordenadas":{"lat":"-23.9608","lng":"-46.3336"},"descricao":"Santos e a maior cidade da Baixada Santista e um polo de atendimento especializado para criancas com TDAH, TEA e autismo no litoral paulista.","especialidades":["APAE Santos","CER Santos","Clinicas de ABA em Santos","Psicopedagogia em Santos"]},"sao-vicente":{"nome":"Sao Vicente","estado":"SP","regiao":"Baixada Santista","populacao":"362 mil","coordenadas":{"lat":"-23.9609","lng":"-46.3922"},"descricao":"Sao Vicente conta com servicos de apoio a criancas com necessidades especiais e familias que buscam brinquedos educativos terapeuticos.","especialidades":["APAE Sao Vicente","CAPS Infanto-Juvenil SV","Escolas inclusivas em Sao Vicente"]},"praia-grande":{"nome":"Praia Grande","estado":"SP","regiao":"Baixada Santista","populacao":"332 mil","coordenadas":{"lat":"-24.0056","lng":"-46.4042"},"descricao":"Praia Grande tem crescido na oferta de servicos terapeuticos para criancas com autismo e TDAH.","especialidades":["APAE Praia Grande","Clinicas de fonoaudiologia PG","Terapia ocupacional Praia Grande"]},"guaruja":{"nome":"Guaruja","estado":"SP","regiao":"Baixada Santista","populacao":"319 mil","coordenadas":{"lat":"-23.9929","lng":"-46.2564"},"descricao":"Guaruja atende familias do litoral que buscam brinquedos educativos e terapeuticos para criancas com necessidades especiais.","especialidades":["APAE Guaruja","CER Guaruja","Psicologia infantil Guaruja"]},"sao-paulo":{"nome":"Sao Paulo","estado":"SP","regiao":"Grande Sao Paulo","populacao":"12,3 milhoes","coordenadas":{"lat":"-23.5505","lng":"-46.6333"},"descricao":"Sao Paulo e o maior mercado do Brasil para brinquedos educativos e terapeuticos.","especialidades":["AACD Sao Paulo","IMREA USP","Instituto de Psiquiatria HC-FMUSP","AMA - Associacao de Amigos do Autista"]},"cubatao":{"nome":"Cubatao","estado":"SP","regiao":"Baixada Santista","populacao":"128 mil","coordenadas":{"lat":"-23.8942","lng":"-46.4253"},"descricao":"Cubatao conta com familias que buscam recursos especializados para criancas com TDAH e autismo.","especialidades":["APAE Cubatao","UBS com atendimento infantil"]},"mongagua":{"nome":"Mongagua","estado":"SP","regiao":"Litoral Sul Paulista","populacao":"55 mil","coordenadas":{"lat":"-24.0883","lng":"-46.6286"},"descricao":"Mongagua atende familias do litoral sul que precisam de brinquedos educativos terapeuticos.","especialidades":["APAE Mongagua","Atendimento via CAPS regional"]},"itanhaem":{"nome":"Itanhaem","estado":"SP","regiao":"Litoral Sul Paulista","populacao":"110 mil","coordenadas":{"lat":"-24.1833","lng":"-46.7897"},"descricao":"Itanhaem e referencia no litoral sul para familias que buscam apoio e recursos para criancas com TDAH, TEA e autismo.","especialidades":["APAE Itanhaem","Escola Municipal Inclusiva"]},"peruibe":{"nome":"Peruibe","estado":"SP","regiao":"Litoral Sul Paulista","populacao":"67 mil","coordenadas":{"lat":"-24.3197","lng":"-47.0058"},"descricao":"Peruibe atende familias do extremo sul do litoral paulista com recursos para criancas com necessidades especiais.","especialidades":["APAE Peruibe","CAPS Peruibe"]}};
  const {cidade} = params;
  const cidadeData = CIDADES[cidade];
  if (!cidadeData) throw new Response('Cidade nao encontrada', {status: 404});
  const {products} = await context.storefront.query(`#graphql
    query FeaturedProducts($first: Int!) {
      products(first: $first, sortKey: BEST_SELLING) {
        nodes { id title handle priceRange { minVariantPrice { amount currencyCode } } featuredImage { url altText } tags }
      }
    }`, {variables: {first: 8}});
  return json({cidade: cidadeData, slug: cidade, products: products.nodes});
}
export function meta({data}) {
  if (!data) return [];
  const {cidade, slug} = data;
  const title = `Brinquedos Educativos para TDAH e Autismo em ${cidade.nome} ${cidade.estado} | brinqueTEAndo`;
  const description = `Brinquedos educativos e terapeuticos para criancas com TDAH, TEA e autismo em ${cidade.nome}. Entregamos em ${cidade.nome} e em toda a ${cidade.regiao}.`;
  const canonical = `https://brinqueteaando.online/cidades/${slug}`;
  return [
    {title},
    {name: 'description', content: description},
    {tagName: 'link', rel: 'canonical', href: canonical},
    {property: 'og:title', content: title},
    {property: 'og:description', content: description},
    {property: 'og:url', content: canonical},
    {property: 'og:type', content: 'website'},
    {property: 'og:locale', content: 'pt_BR'},
    {name: 'geo.region', content: `BR-${cidade.estado}`},
    {name: 'geo.placename', content: cidade.nome},
    {name: 'geo.position', content: `${cidade.coordenadas.lat};${cidade.coordenadas.lng}`},
    {'script:ld+json': JSON.stringify({'@context':'https://schema.org','@type':'LocalBusiness',name:'brinqueTEAndo',description,url:canonical,address:{'@type':'PostalAddress',addressLocality:cidade.nome,addressRegion:cidade.estado,addressCountry:'BR'},geo:{'@type':'GeoCoordinates',latitude:cidade.coordenadas.lat,longitude:cidade.coordenadas.lng},areaServed:{'@type':'AdministrativeArea',name:cidade.regiao}})},
  ];
}
export default function CidadePage() {
  const {cidade, slug, products} = useLoaderData();
  const CIDADES_LIST = ['santos','sao-vicente','praia-grande','guaruja','sao-paulo','cubatao','mongagua','itanhaem','peruibe'];
  return (
    <div>
      <section style={{background:'linear-gradient(135deg,#6366f1,#ec4899)',padding:'60px 20px',color:'white',textAlign:'center'}}>
        <p style={{fontSize:'14px',letterSpacing:'3px',textTransform:'uppercase',opacity:0.8,marginBottom:'12px'}}>Entregamos em {cidade.regiao}</p>
        <h1 style={{fontSize:'clamp(28px,5vw,52px)',fontWeight:700,marginBottom:'20px'}}>
          Brinquedos Educativos para TDAH e Autismo em <span style={{color:'#fde68a'}}>{cidade.nome}</span>
        </h1>
        <p style={{fontSize:'18px',maxWidth:'700px',margin:'0 auto 32px',opacity:0.92}}>{cidade.descricao}</p>
        <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap'}}>
          <Link to="/collections/all" style={{background:'white',color:'#6366f1',padding:'14px 28px',borderRadius:'50px',fontWeight:700,textDecoration:'none'}}>Ver Brinquedos</Link>
          <Link to="/pages/brinquedos-para-autismo-tea" style={{border:'2px solid white',color:'white',padding:'14px 28px',borderRadius:'50px',fontWeight:600,textDecoration:'none'}}>Guia para TEA</Link>
        </div>
      </section>
      <section style={{padding:'60px 20px',maxWidth:'1200px',margin:'0 auto'}}>
        <h2 style={{fontSize:'28px',fontWeight:700,textAlign:'center',marginBottom:'12px'}}>Brinquedos mais pedidos em {cidade.nome}</h2>
        <p style={{textAlign:'center',color:'#6b7280',marginBottom:'40px'}}>Selecionados por terapeutas e especialistas em desenvolvimento infantil</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:'24px'}}>
          {products.map(p => (
            <Link key={p.id} to={`/products/${p.handle}`} style={{textDecoration:'none',color:'inherit'}}>
              <div style={{border:'1px solid #e5e7eb',borderRadius:'16px',overflow:'hidden',background:'white'}}>
                {p.featuredImage && <img src={p.featuredImage.url} alt={p.featuredImage.altText||p.title} style={{width:'100%',height:'200px',objectFit:'cover'}} loading="lazy"/>}
                <div style={{padding:'16px'}}>
                  <p style={{fontSize:'14px',fontWeight:600,marginBottom:'8px'}}>{p.title}</p>
                  <p style={{fontSize:'16px',fontWeight:700,color:'#6366f1'}}>R$ {parseFloat(p.priceRange.minVariantPrice.amount).toFixed(2).replace('.',',')}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div style={{textAlign:'center',marginTop:'40px'}}>
          <Link to="/collections/all" style={{background:'linear-gradient(135deg,#6366f1,#8b5cf6)',color:'white',padding:'16px 40px',borderRadius:'50px',fontWeight:700,textDecoration:'none',display:'inline-block'}}>Ver todos os brinquedos</Link>
        </div>
      </section>
      <section style={{background:'#f0fdf4',padding:'40px 20px',textAlign:'center'}}>
        <h2 style={{fontSize:'22px',fontWeight:700,marginBottom:'20px'}}>Centros de apoio em {cidade.nome}</h2>
        <div style={{display:'flex',gap:'12px',flexWrap:'wrap',justifyContent:'center'}}>
          {cidade.especialidades.map(e => <span key={e} style={{background:'white',border:'1px solid #86efac',color:'#166534',padding:'8px 18px',borderRadius:'50px',fontSize:'14px'}}>✓ {e}</span>)}
        </div>
      </section>
      <section style={{background:'#faf5ff',padding:'40px 20px',textAlign:'center'}}>
        <h3 style={{fontSize:'18px',fontWeight:600,color:'#6b7280',marginBottom:'20px'}}>Tambem entregamos em</h3>
        <div style={{display:'flex',gap:'10px',justifyContent:'center',flexWrap:'wrap'}}>
          {CIDADES_LIST.filter(s=>s!==slug).map(s=><Link key={s} to={`/cidades/${s}`} style={{background:'white',border:'1px solid #ddd6fe',color:'#6366f1',padding:'8px 16px',borderRadius:'50px',textDecoration:'none',fontSize:'14px'}}>{s}</Link>)}
        </div>
      </section>
    </div>
  );
}
