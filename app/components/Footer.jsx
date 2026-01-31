export default function Footer() {
  const groupStyle = {listStyle:'none', padding:0, margin:0};
  const aStyle = {color:'var(--dark-blue)', textDecoration:'none'};
  return (
    <footer>
      <div className="container" style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'16px'}}>
        <div>
          <strong>🐻 BrinqueTEAndo</strong>
          <ul style={groupStyle}>
            <li><a href="https://brinqueteando.online/pages/quem-e-margareth-almeida" style={aStyle}>Quem é Margareth Almeida</a></li>
            <li><a href="https://brinqueteando.online/pages/levar-a-brinqueteando-ate-voce" style={aStyle}>Leve a BrinqueTEAndo até Você</a></li>
            <li><a href="https://brinqueteando.online/pages/seja-revendedor" style={aStyle}>Seja Revendedor BrinqueTEAndo</a></li>
            <li><a href="https://brinqueteando.online/pages/guias-praticos" style={aStyle}>Guias práticos</a></li>
          </ul>
        </div>
        <div>
          <strong>🔒 Legal</strong>
          <ul style={groupStyle}>
            <li><a href="https://brinqueteando.online/policies/privacy-policy" style={aStyle}>Política de Privacidade</a></li>
            <li><a href="https://brinqueteando.online/policies/cookie-policy" style={aStyle}>Política de Cookies</a></li>
            <li><a href="https://brinqueteando.online/policies/legal-notice" style={aStyle}>Aviso Legal</a></li>
          </ul>
        </div>
        <div>
          <strong>📦 Ajuda</strong>
          <ul style={groupStyle}>
            <li><a href="https://brinqueteando.online/pages/contact" style={aStyle}>Contact</a></li>
            <li><a href="https://brinqueteando.online/policies/shipping-policy" style={aStyle}>Política de Envio</a></li>
            <li><a href="https://brinqueteando.online/policies/return-policy" style={aStyle}>Política de Devolução</a></li>
          </ul>
        </div>
        <div>
          <strong>💡 Conteúdos</strong>
          <ul style={groupStyle}>
            <li><a href="https://brinqueteando.online/pages/como-escolher-brinquedos" style={aStyle}>Como escolher brinquedos</a></li>
            <li><a href="https://brinqueteando.online/pages/dicas-para-tdah-e-tea" style={aStyle}>Dicas para TDAH e TEA</a></li>
            <li><a href="https://brinqueteando.online/pages/faq" style={aStyle}>FAQ</a></li>
          </ul>
        </div>
      </div>
      <div className="container" style={{marginTop:'12px'}}>
        <small>© 2026 BrinqueTEAndo. Todos os direitos reservados.</small>
      </div>
    </footer>
  );
}
