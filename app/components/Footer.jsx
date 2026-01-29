export default function Footer({ menu }) {
  return (
    <footer>
      <div className="container" style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'16px'}}>
        <div>
          <strong>BrinqueTEAndo</strong>
          <p>Brinquedos educativos com foco em TEA/TDAH.</p>
        </div>
        <div>
          <strong>Menu</strong>
          <ul style={{listStyle:'none', padding:0}}>
            {(menu?.items || []).map((item)=> (
              <li key={item.id}><a href={item.url || '/'}>{item.title}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <strong>Contato</strong>
          <p>WhatsApp: (xx) xxxx-xxxx</p>
          <p>Email: contato@brinqueteando.com</p>
        </div>
        <div>
          <strong>Newsletter</strong>
          <form onSubmit={(e)=>e.preventDefault()}>
            <input type="email" placeholder="Seu e-mail" required />
            <button className="btn-primary" type="submit">Assinar</button>
          </form>
        </div>
      </div>
      <div className="container" style={{marginTop:'12px'}}>
        <small>© 2026 BrinqueTEAndo. Todos os direitos reservados.</small>
      </div>
    </footer>
  );
}
