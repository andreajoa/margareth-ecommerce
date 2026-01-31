import { Link } from 'react-router-dom';
import categoriaSensoriais from '@/assets/categoria-sensoriais.jpg';
import categoriaEducativos from '@/assets/categoria-educativos.jpg';
import categoriaTerapeuticos from '@/assets/categoria-terapeuticos.jpg';

interface Category {
  title: string;
  description: string;
  image: string;
  href: string;
  icon: string;
  color: string;
}

const categories: Category[] = [
  {
    title: 'Brinquedos Sensoriais',
    description: 'Estimulação tátil, visual e auditiva para desenvolvimento sensorial',
    image: categoriaSensoriais,
    href: '/sensoriais',
    icon: '🌈',
    color: 'from-tea-blue to-tea-blue-light',
  },
  {
    title: 'Brinquedos Educativos',
    description: 'Aprendizado lúdico com cores, formas, números e letras',
    image: categoriaEducativos,
    href: '/educativos',
    icon: '📚',
    color: 'from-tea-orange to-tea-orange-light',
  },
  {
    title: 'Brinquedos Terapêuticos',
    description: 'Apoio para terapias ABA, ocupacional e fonoaudiologia',
    image: categoriaTerapeuticos,
    href: '/terapeuticos',
    icon: '💙',
    color: 'from-tea-purple to-accent',
  },
];

const CategoriesSection = () => {
  return (
    <section className="py-16 md:py-24 section-gradient">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            🧩 Nossas Categorias
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Encontre o Brinquedo Ideal
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Produtos cuidadosamente selecionados para auxiliar no desenvolvimento de crianças com TEA, TDAH e Autismo
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <Link
              key={category.title}
              to={category.href}
              className="card-category group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={category.image}
                  alt={`${category.title} para Autismo e TEA - BrincarEAprender`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-40 group-hover:opacity-50 transition-opacity`} />
                <div className="absolute top-4 left-4 text-4xl">{category.icon}</div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {category.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {category.description}
                </p>
                <span className="inline-flex items-center text-primary font-semibold text-sm group-hover:gap-2 transition-all">
                  Ver Produtos
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
