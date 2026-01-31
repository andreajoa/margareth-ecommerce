import { useEffect, useState } from 'react';

interface PromoBarProps {
  messages?: string[];
}

const PromoBar = ({ messages }: PromoBarProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const defaultMessages = [
    "🎁 FRETE GRÁTIS para Praia Grande, Santos e São Vicente!",
    "🧩 Brinquedos Sensoriais e Educativos para TEA, TDAH e Autismo",
    "📦 Entrega Rápida no Litoral Paulista",
    "💙 Especialistas em Desenvolvimento Infantil",
    "⭐ Parcele em até 12x sem juros",
    "💎 Produtos Recomendados por Terapeutas",
  ];

  const promoMessages = messages || defaultMessages;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % promoMessages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [promoMessages.length]);

  return (
    <div className="bg-secondary text-secondary-foreground py-2.5 overflow-hidden relative">
      <div className="container mx-auto px-4">
        <div className="relative h-6 flex items-center justify-center">
          {promoMessages.map((msg, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
                idx === currentIndex
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
            >
              <p className="text-sm md:text-base font-semibold tracking-wide text-center px-4">
                {msg}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromoBar;
