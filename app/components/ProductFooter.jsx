import {Link} from 'react-router';

export function ProductFooter({footerMenu}) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2C2C2C] text-white w-full">
      {/* Top Footer - Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Coluna 1 - Sobre */}
          <div>
            <h3 className="text-[#3A8ECD] font-bold text-lg mb-4">Sobre a brinqueTEAndo</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Especializada em brinquedos educativos e sensoriais para crianças com Autismo (TEA) e TDAH. 
              Desenvolvimento com diversão e inclusão.
            </p>
            <div className="flex gap-4">
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

          {/* Coluna 2 - Links Rápidos */}
          <div>
            <h3 className="text-[#3A8ECD] font-bold text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-400 hover:text-[#FB8A38] transition-colors">Início</Link></li>
              <li><Link to="/collections/all" className="text-gray-400 hover:text-[#FB8A38] transition-colors">Todos os Produtos</Link></li>
              <li><Link to="/collections/new-arrivals" className="text-gray-400 hover:text-[#FB8A38] transition-colors">Lançamentos</Link></li>
              <li><Link to="/rewards" className="text-gray-400 hover:text-[#FB8A38] transition-colors">Programa Rewards</Link></li>
              <li><Link to="/pages/contact" className="text-gray-400 hover:text-[#FB8A38] transition-colors">Contato</Link></li>
            </ul>
          </div>

          {/* Coluna 3 - Menu do Shopify (Footer Menu) */}
          <div>
            <h3 className="text-[#3A8ECD] font-bold text-lg mb-4">
              {footerMenu?.items?.[0]?.title || 'Atendimento'}
            </h3>
            <ul className="space-y-2 text-sm">
              {footerMenu?.items?.length > 0 ? (
                footerMenu.items.map((item) => (
                  item.url?.startsWith('http') ? (
                    <li key={item.id}>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-[#FB8A38] transition-colors"
                      >
                        {item.title}
                      </a>
                    </li>
                  ) : (
                    <li key={item.id}>
                      <Link
                        to={item.url || '#'}
                        className="text-gray-400 hover:text-[#FB8A38] transition-colors"
                      >
                        {item.title}
                      </Link>
                    </li>
                  )
                ))
              ) : (
                <>
                  <li><Link to="/pages/faq" className="text-gray-400 hover:text-[#FB8A38] transition-colors">Perguntas Frequentes</Link></li>
                  <li><Link to="/pages/shipping" className="text-gray-400 hover:text-[#FB8A38] transition-colors">Política de Envio</Link></li>
                  <li><Link to="/pages/returns" className="text-gray-400 hover:text-[#FB8A38] transition-colors">Trocas e Devoluções</Link></li>
                  <li><Link to="/pages/privacy" className="text-gray-400 hover:text-[#FB8A38] transition-colors">Política de Privacidade</Link></li>
                  <li><Link to="/pages/terms" className="text-gray-400 hover:text-[#FB8A38] transition-colors">Termos de Uso</Link></li>
                </>
              )}
            </ul>
          </div>

          {/* Coluna 4 - Contato */}
          <div>
            <h3 className="text-[#3A8ECD] font-bold text-lg mb-4">Fale Conosco</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-[#FB8A38] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>contato@brinqueteaando.com.br</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-[#FB8A38] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>(11) 99999-9999</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-[#FB8A38] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Baixada Santista, SP - Brasil</span>
              </li>
            </ul>
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
              <div className="flex gap-2">
                <span className="text-gray-400 text-xs">💳 PIX • Cartão • Boleto</span>
              </div>
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

