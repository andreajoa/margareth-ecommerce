import { Link } from 'react-router-dom';
import { Instagram, Facebook, MessageCircle, Mail, MapPin, Phone, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background">
      {/* Newsletter Section */}
      <div className="bg-primary py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-2">
            📧 Receba Novidades e Dicas!
          </h3>
          <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
            Cadastre-se e receba conteúdos exclusivos sobre desenvolvimento infantil e promoções especiais.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              className="flex-1 px-4 py-3 rounded-full bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            <button className="btn-hero whitespace-nowrap">
              Quero Receber!
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🧩</span>
              <h4 className="font-display text-xl font-bold">BrincarEAprender</h4>
            </div>
            <p className="text-background/70 text-sm mb-4">
              Loja especializada em brinquedos terapêuticos e educativos para crianças com TEA, TDAH e Autismo. 
              Atendemos todo o litoral de São Paulo com amor e dedicação.
            </p>
            <div className="flex gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-background/10 rounded-full hover:bg-secondary hover:text-secondary-foreground transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-background/10 rounded-full hover:bg-secondary hover:text-secondary-foreground transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://wa.me/5513999999999" target="_blank" rel="noopener noreferrer" className="p-2 bg-background/10 rounded-full hover:bg-secondary hover:text-secondary-foreground transition-colors" aria-label="WhatsApp">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-bold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              {['Brinquedos Sensoriais', 'Brinquedos Educativos', 'Brinquedos Terapêuticos', 'Jogos Pedagógicos', 'Material ABA', 'Novidades'].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-background/70 hover:text-secondary transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-display text-lg font-bold mb-4">Ajuda</h4>
            <ul className="space-y-2">
              {['Como Comprar', 'Formas de Pagamento', 'Política de Troca', 'Política de Privacidade', 'Termos de Uso', 'FAQ'].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-background/70 hover:text-secondary transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-bold mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-background/70">
                <MapPin size={18} className="flex-shrink-0 mt-0.5" />
                <span>Praia Grande, SP - Litoral Paulista</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-background/70">
                <Phone size={18} className="flex-shrink-0" />
                <span>(13) 99999-9999</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-background/70">
                <Mail size={18} className="flex-shrink-0" />
                <span>contato@brincarEAprender.com.br</span>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-background/10 rounded-lg">
              <p className="text-sm font-medium">🚚 Frete Grátis</p>
              <p className="text-xs text-background/70">Praia Grande, Santos e São Vicente</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-background/20 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/60 text-center md:text-left">
            © {currentYear} BrincarEAprender. Todos os direitos reservados. CNPJ: XX.XXX.XXX/0001-XX
          </p>
          <p className="text-sm text-background/60 flex items-center gap-1">
            Feito com <Heart size={14} className="text-tea-coral fill-current" /> no Litoral de São Paulo
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
