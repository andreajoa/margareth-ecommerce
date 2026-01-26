import {Link} from 'react-router';
import {useState} from 'react';
import {teaColors} from '~/styles/tea-colors';

export function NavigationMenuTEA() {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [activeCat, setActiveCat] = useState(null);

  const categories = {
    tea: {
      title: 'TEA (Autismo)',
      icon: '🧩',
      subcategories: [
        { name: 'Brinquedos Sensoriais', link: '/collections/tea-sensoriais' },
        { name: 'Comunicação Alternativa', link: '/collections/tea-comunicacao' },
        { name: 'Organização e Rotina', link: '/collections/tea-rotina' },
        { name: 'Conforto Sensorial', link: '/collections/tea-conforto' }
      ]
    },
    tdah: {
      title: 'TDAH',
      icon: '⚡',
      subcategories: [
        { name: 'Fidget Toys', link: '/collections/tdah-fidget' },
        { name: 'Foco e Concentração', link: '/collections/tdah-foco' },
        { name: 'Organização', link: '/collections/tdah-organizacao' },
        { name: 'Anti-Stress', link: '/collections/tdah-stress' }
      ]
    },
    educacional: {
      title: 'Educacional',
      icon: '📚',
      subcategories: [
        { name: 'Quebra-Cabeças', link: '/collections/educacional-puzzles' },
        { name: 'Jogos Educativos', link: '/collections/educacional-jogos' },
        { name: 'Material Adaptado', link: '/collections/educacional-adaptado' },
        { name: 'Livros e Recursos', link: '/collections/educacional-livros' }
      ]
    },
    terapeutico: {
      title: 'Terapêutico',
      icon: '💙',
      subcategories: [
        { name: 'Integração Sensorial', link: '/collections/terapeutico-sensorial' },
        { name: 'Motricidade', link: '/collections/terapeutico-motricidade' },
        { name: 'Relaxamento', link: '/collections/terapeutico-relaxamento' },
        { name: 'Estimulação', link: '/collections/terapeutico-estimulacao' }
      ]
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div style={{backgroundColor: teaColors.yellow}} className="py-2 text-center">
        <p className="text-xs md:text-sm font-bold" style={{color: teaColors.darkText}}>
          🎉 FRETE GRÁTIS para São Vicente, Praia Grande e Santos | 12x SEM JUROS 🎁
        </p>
      </div>

      {/* Main Navigation */}
      <nav style={{backgroundColor: teaColors.brightBlue}} className="text-white shadow-lg relative z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl">
                🧩
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold">TEA & TDAH Brasil</h1>
                <p className="text-xs opacity-90 hidden md:block">Produtos Especializados</p>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8">
              <button
                onMouseEnter={() => setMegaMenuOpen(true)}
                className="text-sm font-semibold hover:text-yellow-300 transition py-2"
              >
                Categorias ▾
              </button>
              <Link to="/pages/sobre" className="text-sm font-semibold hover:text-yellow-300 transition">
                Sobre Nós
              </Link>
              <Link to="/blogs/news" className="text-sm font-semibold hover:text-yellow-300 transition">
                Blog & Dicas
              </Link>
              <Link to="/pages/contato" className="text-sm font-semibold hover:text-yellow-300 transition">
                Contato
              </Link>
            </div>

            {/* Cart Button */}
            <Link
              to="/cart"
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition flex items-center gap-2"
            >
              <span className="text-xl">🛒</span>
              <span className="hidden md:inline text-sm font-semibold">Carrinho</span>
            </Link>
          </div>
        </div>

        {/* Mega Menu Dropdown */}
        {megaMenuOpen && (
          <div
            onMouseLeave={() => {setMegaMenuOpen(false); setActiveCat(null);}}
            className="absolute top-full left-0 w-full bg-white shadow-2xl border-t-4"
            style={{borderColor: teaColors.yellow}}
          >
            <div className="max-w-7xl mx-auto px-4 py-8">
              <div className="grid grid-cols-4 gap-8">
                {Object.entries(categories).map(([key, cat]) => (
                  <div
                    key={key}
                    onMouseEnter={() => setActiveCat(key)}
                    className={`p-4 rounded-lg transition-all cursor-pointer ${
                      activeCat === key ? 'bg-blue-50 shadow-md' : ''
                    }`}
                  >
                    <h3
                      className="text-lg font-bold mb-4 flex items-center gap-2"
                      style={{color: teaColors.brightBlue}}
                    >
                      <span className="text-2xl">{cat.icon}</span>
                      {cat.title}
                    </h3>
                    <ul className="space-y-2">
                      {cat.subcategories.map(sub => (
                        <li key={sub.link}>
                          <Link
                            to={sub.link}
                            className="text-sm hover:text-blue-600 transition block py-1"
                            style={{color: teaColors.darkText}}
                            onClick={() => setMegaMenuOpen(false)}
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Featured Banner */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="bg-gradient-to-r from-blue-50 to-yellow-50 p-6 rounded-lg flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-lg mb-1" style={{color: teaColors.brightBlue}}>
                      🌟 Novidades da Semana
                    </h4>
                    <p className="text-sm" style={{color: teaColors.darkText}}>
                      Confira os produtos mais recomendados por terapeutas
                    </p>
                  </div>
                  <Link
                    to="/collections/all"
                    className="px-6 py-3 rounded-full font-bold text-white hover:shadow-lg transition"
                    style={{backgroundColor: teaColors.brightBlue}}
                    onClick={() => setMegaMenuOpen(false)}
                  >
                    Ver Agora
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Trust Badges Bar */}
      <div style={{backgroundColor: teaColors.green}} className="py-3">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center gap-8 text-white text-xs md:text-sm font-semibold flex-wrap">
            <div className="flex items-center gap-2">
              <span>✅</span>
              <span>Produtos Certificados</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🏆</span>
              <span>Recomendado por Terapeutas</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🚚</span>
              <span>Frete Grátis - Baixada Santista</span>
            </div>
            <div className="flex items-center gap-2">
              <span>💳</span>
              <span>12x Sem Juros</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
