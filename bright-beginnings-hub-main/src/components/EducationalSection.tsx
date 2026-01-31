import { BookOpen, Heart, Lightbulb, Users } from 'lucide-react';

const EducationalSection = () => {
  const topics = [
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: 'O que é TEA?',
      description: 'O Transtorno do Espectro Autista afeta a comunicação e interação social. Brinquedos adequados podem ajudar no desenvolvimento dessas habilidades.',
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'TDAH e o Brincar',
      description: 'Crianças com TDAH se beneficiam de brinquedos que trabalham foco e coordenação, ajudando a canalizar energia de forma positiva.',
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: 'Terapia ABA',
      description: 'A Análise do Comportamento Aplicada utiliza brinquedos específicos para desenvolver habilidades sociais e cognitivas.',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Apoio às Famílias',
      description: 'Oferecemos orientação na escolha dos melhores brinquedos para as necessidades específicas de cada criança.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-puzzle-pattern opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            💡 Conteúdo Educativo
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Por que Brinquedos Especiais{' '}
            <span className="text-primary">Fazem a Diferença?</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Brincar é fundamental para o desenvolvimento infantil. Para crianças com TEA, TDAH e Autismo, 
            os brinquedos certos podem ser ferramentas poderosas de aprendizado e terapia.
          </p>
        </div>

        {/* Topics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {topics.map((topic, index) => (
            <div
              key={topic.title}
              className="bg-card rounded-3xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4">
                {topic.icon}
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">{topic.title}</h3>
              <p className="text-muted-foreground text-sm">{topic.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Box */}
        <div className="bg-card rounded-3xl p-8 md:p-12 shadow-medium max-w-4xl mx-auto text-center">
          <span className="text-5xl mb-4 block">🌟</span>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
            Servindo o Litoral Paulista com Carinho
          </h3>
          <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">
            Somos uma loja especializada localizada em <strong className="text-primary">Praia Grande</strong>, 
            atendendo famílias de <strong className="text-primary">Santos</strong>, <strong className="text-primary">São Vicente</strong>, 
            <strong className="text-primary"> Guarujá</strong>, <strong className="text-primary">Bertioga</strong> e toda a Baixada Santista. 
            Nossa missão é facilitar o acesso a brinquedos que realmente fazem diferença no desenvolvimento infantil.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/sobre" className="btn-primary">
              Conheça Nossa História
            </a>
            <a href="https://wa.me/5513999999999" target="_blank" rel="noopener noreferrer" className="btn-outline">
              Fale Conosco
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationalSection;
