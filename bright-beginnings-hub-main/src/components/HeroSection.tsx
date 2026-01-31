import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import heroImage from '@/assets/hero-brinquedos-tea.jpg';

const HeroSection = () => {
  return (
    <section className="relative min-h-[600px] md:min-h-[700px] overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/10">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-puzzle-pattern opacity-30" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 text-6xl animate-float opacity-20">🧩</div>
      <div className="absolute top-40 right-20 text-5xl animate-float opacity-20" style={{ animationDelay: '1s' }}>⭐</div>
      <div className="absolute bottom-40 left-20 text-4xl animate-float opacity-20" style={{ animationDelay: '2s' }}>🎨</div>
      <div className="absolute bottom-20 right-10 text-5xl animate-float opacity-20" style={{ animationDelay: '0.5s' }}>🌈</div>

      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div className="relative z-10 text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary-foreground px-4 py-2 rounded-full mb-6">
              <span className="animate-bounce-soft">💙</span>
              <span className="text-sm font-medium">Especialistas em Desenvolvimento Infantil</span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Brinquedos que{' '}
              <span className="text-gradient-hero">Transformam</span>
              <br />
              o Aprendizado
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              Descubra nossa coleção de brinquedos sensoriais, educativos e terapêuticos, 
              especialmente selecionados para crianças com <strong className="text-primary">TEA</strong>, 
              <strong className="text-primary"> TDAH</strong> e <strong className="text-primary">Autismo</strong>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/produtos" className="btn-hero inline-flex items-center justify-center gap-2 group">
                Ver Coleção
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/sobre" className="btn-outline inline-flex items-center justify-center">
                Conheça Nossa História
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="text-tea-green text-xl">✓</span>
                <span>Frete Grátis SP</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="text-tea-green text-xl">✓</span>
                <span>Troca Fácil</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="text-tea-green text-xl">✓</span>
                <span>12x s/ Juros</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative order-1 lg:order-2">
            <div className="relative rounded-3xl overflow-hidden shadow-strong">
              <img
                src={heroImage}
                alt="Brinquedos Educativos e Sensoriais para TEA, TDAH e Autismo - Litoral de São Paulo"
                className="w-full h-auto object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-4 -left-4 bg-card rounded-2xl p-4 shadow-medium animate-float">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🚚</span>
                </div>
                <div>
                  <p className="font-display font-bold text-foreground">Frete Grátis</p>
                  <p className="text-sm text-muted-foreground">Litoral Paulista</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
