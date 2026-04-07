import {Link} from 'react-router';

export function ProductFooter({footerMenu}) {
  const currentYear = new Date().getFullYear();
  
  // DEBUG DETALHADO
  console.log('='.repeat(50));
  console.log('FOOTER DEBUG:');
  console.log('='.repeat(50));
  console.log('footerMenu completo:', footerMenu);
  console.log('footerMenu.items:', footerMenu?.items);
  console.log('Numero de items:', footerMenu?.items?.length);
  
  if (footerMenu?.items) {
    footerMenu.items.forEach((item, index) => {
      console.log(`Item ${index + 1}: ${item.title}`);
      console.log('  - ID:', item.id);
      console.log('  - URL:', item.url);
      console.log('  - Sub-items:', item.items?.length || 0);
      if (item.items && item.items.length > 0) {
        item.items.forEach((subItem, subIndex) => {
          console.log(`    ${subIndex + 1}. ${subItem.title} -> ${subItem.url}`);
        });
      }
    });
  }
  console.log('='.repeat(50));

  const shopifyMenus = footerMenu?.items || [];

  return (
    <footer className="bg-[#2C2C2C] text-white w-full">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-[#3A8ECD] to-[#FB8A38] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white text-2xl font-bold mb-2">Join our email list</h3>
              <p className="text-white/90 text-sm">Get exclusive deals and early access to new products.</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input 
                type="email" 
                placeholder="Email address" 
                className="px-4 py-3 rounded-lg flex-1 md:w-80 text-gray-900"
              />
              <button className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors">
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* DEBUG: Aviso se menu vazio */}
        {shopifyMenus.length === 0 && (
          <div className="bg-yellow-500/10 border-2 border-yellow-500 rounded-lg p-6 mb-8">
            <h3 className="text-yellow-300 font-bold text-lg mb-2">Menu do Shopify nao encontrado</h3>
            <p className="text-yellow-200 text-sm mb-2">
              O menu 'footer' esta vazio ou nao foi carregado corretamente.
            </p>
            <p className="text-yellow-100 text-xs">
              Verifique: Shopify Admin - Navigation - Footer menu deve ter handle 'footer'
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {shopifyMenus.length > 0 ? (
            shopifyMenus.map((menu) => (
              <div key={menu.id}>
                <h3 className="text-[#3A8ECD] font-bold text-lg mb-4 flex items-center gap-2">
                  {menu.title.toLowerCase().includes('brinqueteando') && '🧸'}
                  {(menu.title.toLowerCase().includes('conteudo') || menu.title.toLowerCase().includes('conteúdo')) && '💡'}
                  {menu.title.toLowerCase().includes('ajuda') && '📦'}
                  {menu.title.toLowerCase().includes('legal') && '🔒'}
                  <span>{menu.title}</span>
                </h3>
                <ul className="space-y-2 text-sm">
                  {menu.items && menu.items.length > 0 ? (
                    menu.items.map((subItem) => (
                      <li key={subItem.id}>
                        {subItem.url?.startsWith('http') ? (
                          <a
                            href={subItem.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-[#FB8A38] transition-colors block"
                          >
                            {subItem.title}
                          </a>
                        ) : subItem.url ? (
                          <Link
                            to={subItem.url}
                            className="text-gray-400 hover:text-[#FB8A38] transition-colors block"
                          >
                            {subItem.title}
                          </Link>
                        ) : (
                          <span className="text-gray-500">{subItem.title}</span>
                        )}
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500 text-xs italic">
                      Este menu nao tem sub-itens configurados
                    </li>
                  )}
                </ul>
              </div>
            ))
          ) : (
            // Fallback completo
            <>
              <div>
                <h3 className="text-[#3A8ECD] font-bold text-lg mb-4">🧸 BrinqueTEAndo</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/pages/about" className="text-gray-400 hover:text-[#FB8A38] transition-colors">Quem e Margareth Almeida</Link></li>
                  <li><Link to="/pages/leve-a-brinqueteando" className="text-gray-400 hover:text-[#FB8A38] transition-colors">Leve a BrinqueTEAndo ate Voce</Link></li>
                  <li><Link to="/pages/seja-revendedor" className="text-gray-400 hover:text-[#FB8A38] transition-colors">Seja Revendedor</Link></li>
                  <li><Link to="/pages/guias-praticos" className="text-gray-400 hover:text-[#FB8A38] transition-colors">Guias praticos</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="text-[#3A8ECD] font-bold text-lg mb-4">💡 Conteudos</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/pages/como-escolher" className="text-gray-400 hover:text-[#FB8A38] transition-colors">Como escolher brinquedos</Link></li>
                  <li><Link to="/pages/dicas-tdah-tea" className="text-gray-400 hover:text-[#FB8A38] transition-colors">Dicas para TDAH e TEA</Link></li>
                  <li><Link to="/pages/faq" className="text-gray-400 hover:text-[#FB8A38] transition-colors">FAQ</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="text-[#3A8ECD] font-bold text-lg mb-4">📦 Ajuda</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/pages/contact" className="text-gray-400 hover:text-[#FB8A38] transition-colors">Contact</Link></li>
                  <li><Link to="/pages/shipping" className="text-gray-400 hover:text-[#FB8A38] transition-colors">Politica de Envio</Link></li>
                  <li><Link to="/pages/returns" className="text-gray-400 hover:text-[#FB8A38] transition-colors">Politica de Devolucao</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="text-[#3A8ECD] font-bold text-lg mb-4">🔒 Legal</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/pages/privacy" className="text-gray-400 hover:text-[#FB8A38] transition-colors">Politica de Privacidade</Link></li>
                  <li><Link to="/pages/cookies" className="text-gray-400 hover:text-[#FB8A38] transition-colors">Politica de Cookies</Link></li>
                  <li><Link to="/pages/aviso-legal" className="text-gray-400 hover:text-[#FB8A38] transition-colors">Aviso Legal</Link></li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* Social Media */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex justify-center gap-6">
            <a href="https://www.instagram.com/brinqueteaando" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FB8A38] transition-colors" aria-label="Instagram">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="https://www.facebook.com/brinqueteaando" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FB8A38] transition-colors" aria-label="Facebook">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="https://www.tiktok.com/@brinqueteaando" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FB8A38] transition-colors" aria-label="TikTok">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm text-center sm:text-left">
              © {currentYear} brinqueTEAndo. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-gray-500 text-xs">Aceitamos:</span>
              <span className="text-gray-400 text-xs">💳 PIX • Cartao • Boleto</span>
            </div>
          </div>
          <p className="text-gray-500 text-xs text-center mt-4">
            🧩 Especializada em brinquedos para desenvolvimento infantil neurodivergente • TEA • TDAH • Autismo
          </p>
        </div>
      </div>
    </footer>
  );
}