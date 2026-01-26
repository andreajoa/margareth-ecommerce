import {Link, NavLink} from 'react-router';
import {useState} from 'react';
import teaColors from '~/lib/tea-colors';

/**
 * NavigationMenu Component - Menu de Navegação Principal
 * Inclui mega menu estratégico para TEA/TDAH
 */
export function NavigationMenu({rootData}) {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCat, setActiveCat] = useState(null);

  const categories = {
    tea: {
      title: 'TEA (Autismo)',
      icon: '🧩',
      color: teaColors.brightBlue,  // #4A90E2 - Main blue action color
      subcategories: [
        {name: 'Brinquedos Sensoriais', link: '/search?q=sensorial%20autismo', desc: 'Texturas, luzes e estímulos'},
        {name: 'Comunicação Alternativa', link: '/search?q=comunica%C3%A7%C3%A3o%20autismo', desc: 'CAA, pictogramas e expressão'},
        {name: 'Organização e Rotina', link: '/search?q=rotina%20visual%20tea', desc: 'Agendas, sequências e autonomia'},
        {name: 'Conforto Sensorial', link: '/search?q=conforto%20sensorial', desc: 'Acalmação e regulação'}
      ]
    },
    tdah: {
      title: 'TDAH',
      icon: '⚡',
      color: teaColors.brightYellow,  // #FFD93D - Puzzle piece yellow
      subcategories: [
        {name: 'Fidget Toys', link: '/search?q=fidget%20tdah', desc: 'Foco e atenção'},
        {name: 'Foco e Concentração', link: '/search?q=foco%20tdah', desc: 'Jogos de atenção'},
        {name: 'Organização', link: '/search?q=organiza%C3%A7%C3%A3o%20tdah', desc: 'Planejamento e rotina'},
        {name: 'Anti-Stress', link: '/search?q=anti%20stress%20tdah', desc: 'Regulação emocional'}
      ]
    },
    habilidades: {
      title: 'Habilidades',
      icon: '🎯',
      color: teaColors.green,  // #6BCF7F - Success accent
      subcategories: [
        {name: 'Coordenação Motora', link: '/search?q=coordena%C3%A7%C3%A3o%20motora', desc: 'Motricidade fina e ampla'},
        {name: 'Habilidades Sociais', link: '/search?q=habilidades%20sociais', desc: 'Interação e empatia'},
        {name: 'Funções Executivas', link: '/search?q=fun%C3%A7%C3%B5es%20executivas', desc: 'Planejamento e organização'},
        {name: 'Linguagem e Fala', link: '/search?q=linguagem%20fala', desc: 'Comunicação e expressão'}
      ]
    },
    idade: {
      title: 'Por Idade',
      icon: '📚',
      color: teaColors.coralRed,  // #FF6B6B - Puzzle piece red
      subcategories: [
        {name: '2-4 anos', link: '/search?q=2-4%20anos', desc: 'Primeiros passos'},
        {name: '5-7 anos', link: '/search?q=5-7%20anos', desc: 'Pré-escolar'},
        {name: '8-10 anos', link: '/search?q=8-10%20anos', desc: 'Fundamental'},
        {name: '11+ anos', link: '/search?q=11%2B%20anos', desc: 'Pré-adolescentes'}
      ]
    },
    ambiente: {
      title: 'Ambiente',
      icon: '🏠',
      color: teaColors.skyBlue,  // #87CEEB - Main background blue
      subcategories: [
        {name: 'Para Escola', link: '/search?q=escola', desc: 'Sala de aula'},
        {name: 'Para Casa', link: '/search?q=casa', desc: 'Ambiente doméstico'},
        {name: 'Para Terapias', link: '/search?q=terapia', desc: 'Clínica e consultório'},
        {name: 'Para Viagens', link: '/search?q=viagem', desc: 'Trânsito e passeios'}
      ]
    }
  };

  return (
    <>
      {/* ============ BARRA SUPERIOR - PUZZLE GRADIENT ============ */}
      <div
        className="py-2 text-center"
        style={{
          background: teaColors.puzzleGradient  // Red → Yellow → Blue gradient
        }}
      >
        <p className="text-xs md:text-sm font-bold text-white drop-shadow-sm">
          🧩 FRETE GRÁTIS São Vicente, Praia Grande e Santos | Parcelamento 12x SEM JUROS 🎁
        </p>
      </div>

      {/* ============ NAVEGAÇÃO PRINCIPAL ============ */}
      <nav
        style={{backgroundColor: teaColors.white}}
        className="shadow-lg relative z-50 border-b-2"
      >
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-lg"
                style={{
                  background: teaColors.skyGradient,  // Sky Blue gradient
                  boxShadow: teaColors.glow
                }}
              >
                🧩
              </div>
              <div>
                <h1
                  className="text-xl md:text-2xl font-bold"
                  style={{color: teaColors.skyBlue}}  // Main sky blue color
                >
                  BrinqueTEAndo
                </h1>
                <p className="text-xs opacity-90 hidden md:block" style={{color: teaColors.darkText}}>
                  TEA • TDAH • Neurodiversidade
                </p>
              </div>
            </Link>

            {/* Menu Desktop */}
            <div className="hidden lg:flex items-center gap-6">
              {/* Mega Menu Trigger */}
              <div
                className="relative"
                onMouseEnter={() => setMegaMenuOpen(true)}
                onMouseLeave={() => {setMegaMenuOpen(false); setActiveCat(null);}}
              >
                <button className="text-sm font-semibold hover:opacity-70 transition py-2 flex items-center gap-1" style={{color: teaColors.darkText}}>
                  Categorias ▾
                </button>

                {/* Mega Menu Panel */}
                {megaMenuOpen && (
                  <div
                    className="absolute top-full left-1/2 transform -translate-x-1/2 w-full max-w-6xl bg-white shadow-2xl border-t-4 rounded-b-2xl overflow-hidden"
                    style={{borderColor: teaColors.yellow}}
                  >
                    <div className="p-6">
                      <div className="grid grid-cols-5 gap-4">
                        {Object.entries(categories).map(([key, cat]) => (
                          <div
                            key={key}
                            onMouseEnter={() => setActiveCat(key)}
                            className={`p-3 rounded-xl transition-all cursor-pointer ${
                              activeCat === key ? 'shadow-lg' : 'hover:shadow-md'
                            }`}
                            style={{
                              backgroundColor: activeCat === key ? `${cat.color}15` : teaColors.lightGray
                            }}
                          >
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-2xl">{cat.icon}</span>
                              <h3
                                className="text-sm font-bold"
                                style={{color: cat.color}}
                              >
                                {cat.title}
                              </h3>
                            </div>
                            <ul className="space-y-2">
                              {cat.subcategories.map((sub, idx) => (
                                <li key={idx}>
                                  <Link
                                    to={sub.link}
                                    className="block text-xs hover:opacity-70 transition py-1"
                                    style={{color: teaColors.darkText}}
                                    onClick={() => setMegaMenuOpen(false)}
                                  >
                                    <div className="font-semibold">{sub.name}</div>
                                    <div className="opacity-70 text-[10px]">{sub.desc}</div>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      {/* Featured Banner */}
                      <div
                        className="mt-4 p-4 rounded-xl flex items-center justify-between"
                        style={{
                          background: teaColors.primaryGradient
                        }}
                      >
                        <div className="text-white">
                          <h4 className="font-bold text-sm mb-1">🌟 Destaques da Semana</h4>
                          <p className="text-xs opacity-90">Produtos recomendados por terapeutas</p>
                        </div>
                        <Link
                          to="/search?q=recomendado"
                          onClick={() => setMegaMenuOpen(false)}
                          className="bg-white px-5 py-2 rounded-full font-bold text-sm hover:shadow-lg transition transform hover:scale-105"
                          style={{color: teaColors.brightBlue}}
                        >
                          Ver Agora
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <NavLink
                to="/pages/sobre"
                className="text-sm font-semibold hover:opacity-70 transition"
                style={{color: teaColors.darkText}}
              >
                Sobre Nós
              </NavLink>
              <NavLink
                to="/blogs/news"
                className="text-sm font-semibold hover:opacity-70 transition"
                style={{color: teaColors.darkText}}
              >
                Blog & Dicas
              </NavLink>
              <NavLink
                to="/pages/contato"
                className="text-sm font-semibold hover:opacity-70 transition"
                style={{color: teaColors.darkText}}
              >
                Contato
              </NavLink>
            </div>

            {/* Cart Button */}
            <Link
              to="/cart"
              className="flex items-center gap-2 px-4 py-2 rounded-full transition hover:shadow-md"
              style={{
                backgroundColor: `${teaColors.brightBlue}15`,
                color: teaColors.brightBlue
              }}
            >
              <span className="text-xl">🛒</span>
              <span className="hidden md:inline text-sm font-semibold">Carrinho</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-2xl p-2"
              style={{color: teaColors.darkText}}
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t" style={{borderColor: teaColors.mediumGray}}>
            <div className="px-4 py-4 space-y-3">
              {Object.entries(categories).map(([key, cat]) => (
                <div key={key} className="border rounded-xl p-3" style={{borderColor: teaColors.mediumGray}}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{cat.icon}</span>
                    <h3 className="font-bold" style={{color: cat.color}}>{cat.title}</h3>
                  </div>
                  <div className="space-y-1 pl-7">
                    {cat.subcategories.map((sub, idx) => (
                      <Link
                        key={idx}
                        to={sub.link}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-xs py-1 hover:opacity-70"
                        style={{color: teaColors.darkText}}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <Link
                to="/pages/sobre"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-semibold py-2"
                style={{color: teaColors.darkText}}
              >
                Sobre Nós
              </Link>
              <Link
                to="/blogs/news"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-semibold py-2"
                style={{color: teaColors.darkText}}
              >
                Blog & Dicas
              </Link>
              <Link
                to="/pages/contato"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-semibold py-2"
                style={{color: teaColors.darkText}}
              >
                Contato
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* ============ BARRA DE CONFIANÇA - CALMING GRADIENT ============ */}
      <div
        style={{
          background: teaColors.calmingGradient  // Sky Blue → Green gradient
        }}
        className="py-2"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center gap-4 md:gap-8 text-white text-[10px] md:text-xs font-semibold flex-wrap">
            <div className="flex items-center gap-1">
              <span>✅</span>
              <span>Produtos Selecionados</span>
            </div>
            <div className="flex items-center gap-1">
              <span>🏆</span>
              <span>Recomendado por Terapeutas</span>
            </div>
            <div className="flex items-center gap-1">
              <span>🚚</span>
              <span>Entrega Rápida</span>
            </div>
            <div className="flex items-center gap-1">
              <span>💳</span>
              <span>Pagamento Seguro</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
