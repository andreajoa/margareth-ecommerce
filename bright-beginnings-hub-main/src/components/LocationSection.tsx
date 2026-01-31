import { MapPin, Truck, Clock } from 'lucide-react';

interface DeliveryZone {
  type: 'free' | 'express';
  cities: string[];
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

const deliveryZones: DeliveryZone[] = [
  {
    type: 'free',
    cities: ['Praia Grande', 'Santos', 'São Vicente'],
    icon: <Truck className="w-8 h-8" />,
    title: 'Frete Grátis',
    subtitle: 'Entrega em até 2 dias úteis',
  },
  {
    type: 'express',
    cities: ['Guarujá', 'Bertioga', 'Mongaguá', 'Itanhaém', 'Peruíbe', 'Cubatão'],
    icon: <Clock className="w-8 h-8" />,
    title: 'Entrega Expressa',
    subtitle: 'Frete a partir de R$ 9,90',
  },
];

const LocationSection = () => {
  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-tea-green/10 text-tea-green px-4 py-2 rounded-full text-sm font-semibold mb-4">
            🚚 Área de Entrega
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Entregamos em Todo o{' '}
            <span className="text-primary">Litoral de São Paulo</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Brinquedos especiais chegando rapidinho na sua casa!
          </p>
        </div>

        {/* Delivery Zones */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {deliveryZones.map((zone) => (
            <div
              key={zone.type}
              className={`rounded-3xl p-6 md:p-8 ${
                zone.type === 'free'
                  ? 'bg-gradient-to-br from-tea-green/10 to-tea-green/5 border-2 border-tea-green/30'
                  : 'bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/30'
              }`}
            >
              <div className="flex items-start gap-4 mb-6">
                <div
                  className={`p-4 rounded-2xl ${
                    zone.type === 'free' ? 'bg-tea-green/20 text-tea-green' : 'bg-primary/20 text-primary'
                  }`}
                >
                  {zone.icon}
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-foreground">{zone.title}</h3>
                  <p className="text-muted-foreground">{zone.subtitle}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {zone.cities.map((city) => (
                  <span
                    key={city}
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium ${
                      zone.type === 'free'
                        ? 'bg-tea-green/20 text-tea-green'
                        : 'bg-primary/20 text-primary'
                    }`}
                  >
                    <MapPin size={14} />
                    {city}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-secondary/10 px-6 py-4 rounded-2xl">
            <span className="text-2xl">📦</span>
            <p className="text-foreground font-medium">
              Enviamos para <strong>todo o Brasil</strong> via Correios e Transportadoras
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
