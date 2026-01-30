import React from 'react';

export function ProductsUnder100() {
  const links = [
    {label: '🧸 Brinquedos Terapêuticos', href: 'https://brinqueteando.online/collections/brinquedos-terapeuticos'},
    {label: '🌈 Por Necessidade', href: 'https://brinqueteando.online/collections/por-necessidade'},
    {label: '🎒 Por Idade', href: 'https://brinqueteando.online/collections/por-idade'},
    {label: '💡 Ambiente & Rotina', href: 'https://brinqueteando.online/collections/ambiente-rotina'},
    {label: '💙 Apoio aos Pais', href: 'https://brinqueteando.online/collections/apoio-aos-pais'},
  ];

  return (
    <section className="w-full py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {links.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              className="font-medium text-xs tracking-widest transition-colors px-3 py-2 rounded-full"
              style={{color:'#0A3D2F', background:'rgba(255,255,255,0.6)'}}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
