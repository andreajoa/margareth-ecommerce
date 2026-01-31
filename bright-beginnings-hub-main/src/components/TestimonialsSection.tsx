import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  city: string;
  text: string;
  rating: number;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Mariana S.',
    city: 'Praia Grande, SP',
    text: 'Os brinquedos sensoriais ajudaram muito meu filho no processo de terapia. A entrega foi super rápida e o atendimento excelente!',
    rating: 5,
    avatar: '👩‍👦',
  },
  {
    name: 'Carlos R.',
    city: 'Santos, SP',
    text: 'Finalmente encontrei uma loja que entende as necessidades de crianças com TEA. Produtos de qualidade e preços justos.',
    rating: 5,
    avatar: '👨‍👧',
  },
  {
    name: 'Ana Paula M.',
    city: 'São Vicente, SP',
    text: 'Minha filha amou o kit de brinquedos educativos! A terapeuta ABA também aprovou. Recomendo demais!',
    rating: 5,
    avatar: '👩‍👧',
  },
  {
    name: 'Roberto L.',
    city: 'Guarujá, SP',
    text: 'Comprei para meu neto com TDAH e a diferença no foco dele durante as brincadeiras é impressionante. Loja nota 10!',
    rating: 5,
    avatar: '👴',
  },
  {
    name: 'Fernanda C.',
    city: 'Bertioga, SP',
    text: 'Atendimento humanizado e produtos que realmente fazem diferença. A loja entende o que as famílias precisam.',
    rating: 5,
    avatar: '👩',
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-8xl">🧩</div>
        <div className="absolute bottom-10 right-10 text-8xl">⭐</div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-primary-foreground/20 text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold mb-4">
            ⭐ Depoimentos
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            O que as Famílias Dizem
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Histórias reais de famílias do litoral paulista que transformaram o desenvolvimento de suas crianças
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Navigation Buttons */}
            <button
              onClick={goToPrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 p-2 bg-primary-foreground/20 rounded-full hover:bg-primary-foreground/30 transition-colors z-10"
              aria-label="Anterior"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 p-2 bg-primary-foreground/20 rounded-full hover:bg-primary-foreground/30 transition-colors z-10"
              aria-label="Próximo"
            >
              <ChevronRight size={24} />
            </button>

            {/* Testimonial Card */}
            <div className="bg-card text-card-foreground rounded-3xl p-8 md:p-12 shadow-strong">
              <Quote className="w-12 h-12 text-secondary mb-6" />
              
              <div className="min-h-[120px]">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.name}
                    className={`transition-all duration-500 ${
                      index === currentIndex
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 absolute translate-y-4'
                    }`}
                  >
                    {index === currentIndex && (
                      <>
                        <p className="text-lg md:text-xl text-foreground mb-6 leading-relaxed">
                          "{testimonial.text}"
                        </p>
                        
                        <div className="flex items-center gap-4">
                          <span className="text-4xl">{testimonial.avatar}</span>
                          <div>
                            <p className="font-display font-bold text-foreground">{testimonial.name}</p>
                            <p className="text-muted-foreground text-sm">{testimonial.city}</p>
                          </div>
                          <div className="ml-auto flex gap-1">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} size={16} className="fill-secondary text-secondary" />
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-primary-foreground w-8'
                      : 'bg-primary-foreground/40 hover:bg-primary-foreground/60'
                  }`}
                  aria-label={`Ir para depoimento ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
          {[
            { value: '500+', label: 'Famílias Atendidas' },
            { value: '4.9', label: 'Avaliação Média' },
            { value: '1000+', label: 'Produtos Vendidos' },
            { value: '100%', label: 'Satisfação' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-3xl md:text-4xl font-bold text-secondary">{stat.value}</p>
              <p className="text-primary-foreground/70 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
