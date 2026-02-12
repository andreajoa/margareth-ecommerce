import { Link } from 'react-router';

export default function Header({ menu }) {
  return (
    <header style={{background:'#fff', borderBottom:'1px solid var(--gray-blue)'}}>
      <div className="container" style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 0'}}>
        <a href="/" className="brand" aria-label="Página inicial" style={{display:'inline-flex', alignItems:'center'}}>
          <img src="/logo-brinqueteando.png" alt="BrinqueTEAndo" style={{height:'48px'}} />
        </a>
        <nav style={{display:'flex', gap:'16px', flexWrap:'wrap'}}>
          {menu?.items?.length ? (
            menu.items.map((item) => (
              item.url?.startsWith('http') ? (
                <a key={item.id} href={item.url} rel="noopener" style={{color:'var(--dark-blue)'}}>{item.title}</a>
              ) : (
                <Link key={item.id} to={item.url || '/'} style={{color:'var(--dark-blue)'}}>{item.title}</Link>
              )
            ))
          ) : (
            <>
              <Link to="/" style={{color:'var(--dark-blue)'}}>Início</Link>
              <Link to="/collections/sensory-toys" style={{color:'var(--dark-blue)'}}>Coleções</Link>
              <Link to="/collections/by-age" style={{color:'var(--dark-blue)'}}>Por Idade</Link>
              <Link to="/collections/by-skill" style={{color:'var(--dark-blue)'}}>Por Habilidade</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
