import React, {createContext, useContext, useState, useMemo} from 'react';

const AsideContext = createContext(null);

export function AsideProvider({children}) {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((v) => !v);
  const value = useMemo(() => ({open, setOpen, toggle}), [open]);
  return <AsideContext.Provider value={value}>{children}</AsideContext.Provider>;
}

export function useAside() {
  const ctx = useContext(AsideContext);
  if (!ctx) {
    return {open: false, setOpen: () => {}, toggle: () => {}};
  }
  return ctx;
}

export function Aside() {
  const {open, toggle} = useAside();
  const links = [
    {label: '🧸 Brinquedos Terapêuticos', href: 'https://brinqueteando.online/collections/brinquedos-terapeuticos'},
    {label: '🌈 Por Necessidade', href: 'https://brinqueteando.online/collections/por-necessidade'},
    {label: '🎒 Por Idade', href: 'https://brinqueteando.online/collections/por-idade'},
    {label: '💡 Ambiente & Rotina', href: 'https://brinqueteando.online/collections/ambiente-rotina'},
    {label: '💙 Apoio aos Pais', href: 'https://brinqueteando.online/collections/apoio-aos-pais'},
  ];
  const moreGroups = [
    {
      title: '🐻 BrinqueTEAndo',
      items: [
        {label: 'Quem é Margareth Almeida', href: 'https://brinqueteando.online/pages/quem-e-margareth-almeida'},
        {label: 'Leve a BrinqueTEAndo até Você', href: 'https://brinqueteando.online/pages/levar-a-brinqueteando-ate-voce'},
        {label: 'Seja Revendedor BrinqueTEAndo', href: 'https://brinqueteando.online/pages/seja-revendedor'},
        {label: 'Guias práticos', href: 'https://brinqueteando.online/pages/guias-praticos'},
      ],
    },
    {
      title: '🔒 Legal',
      items: [
        {label: 'Política de Privacidade', href: 'https://brinqueteando.online/policies/privacy-policy'},
        {label: 'Política de Cookies', href: 'https://brinqueteando.online/policies/cookie-policy'},
        {label: 'Aviso Legal', href: 'https://brinqueteando.online/policies/legal-notice'},
      ],
    },
    {
      title: '📦 Ajuda',
      items: [
        {label: 'Contact', href: 'https://brinqueteando.online/pages/contact'},
        {label: 'Política de Envio', href: 'https://brinqueteando.online/policies/shipping-policy'},
        {label: 'Política de Devolução', href: 'https://brinqueteando.online/policies/return-policy'},
      ],
    },
    {
      title: '💡 Conteúdos',
      items: [
        {label: 'Como escolher brinquedos', href: 'https://brinqueteando.online/pages/como-escolher-brinquedos'},
        {label: 'Dicas para TDAH e TEA', href: 'https://brinqueteando.online/pages/dicas-para-tdah-e-tea'},
        {label: 'FAQ', href: 'https://brinqueteando.online/pages/faq'},
      ],
    },
  ];

  return (
    <>
      <div className="hidden lg:block fixed left-4 top-24 z-40">
        <div className="rounded-xl shadow-lg" style={{background:'#E9E2D2', border:'1px solid #D4AF69'}}>
          <ul className="p-3 space-y-2">
            {links.map((item, idx) => (
              <li key={idx}>
                <a href={item.href} className="text-xs font-medium tracking-widest" style={{color:'#0A3D2F'}}>{item.label}</a>
              </li>
            ))}
          </ul>
          <div className="border-t" style={{borderTopColor:'#D4AF69'}}>
            <div className="px-3 py-2 text-xs font-semibold" style={{color:'#0A3D2F'}}>Mais informações</div>
            <div className="px-3 pb-3 space-y-2">
              {moreGroups.map((group, gi) => (
                <div key={gi}>
                  <div className="text-xs font-bold" style={{color:'#0A3D2F'}}>{group.title}</div>
                  <ul className="mt-1 space-y-1">
                    {group.items.map((it, ii) => (
                      <li key={ii}>
                        <a href={it.href} className="text-xs tracking-widest" style={{color:'#0A3D2F'}}>{it.label}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 z-50" style={{background:'rgba(0,0,0,0.35)'}} onClick={toggle}>
          <div className="absolute top-0 left-0 h-full w-72" style={{background:'#E9E2D2', borderRight:'1px solid #D4AF69'}} onClick={(e)=>e.stopPropagation()}>
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-sm font-semibold" style={{color:'#0A3D2F'}}>Menu</span>
              <button onClick={toggle} className="px-2 py-1 rounded" style={{background:'#FEFDF8', color:'#0A3D2F'}}>Fechar</button>
            </div>
            <ul className="px-4 py-2 space-y-2">
              {links.map((item, idx) => (
                <li key={idx}>
                  <a href={item.href} className="block text-sm tracking-widest px-2 py-2 rounded" style={{color:'#0A3D2F', background:'#ffffff80'}}>{item.label}</a>
                </li>
              ))}
            </ul>
            <div className="px-4 py-2 border-t" style={{borderTopColor:'#D4AF69'}}>
              <div className="text-xs font-semibold mb-2" style={{color:'#0A3D2F'}}>Mais informações</div>
              <div className="space-y-3">
                {moreGroups.map((group, gi) => (
                  <div key={gi}>
                    <div className="text-xs font-bold" style={{color:'#0A3D2F'}}>{group.title}</div>
                    <ul className="mt-1 space-y-1">
                      {group.items.map((it, ii) => (
                        <li key={ii}>
                          <a href={it.href} className="block text-xs tracking-widest px-2 py-1 rounded" style={{color:'#0A3D2F', background:'#ffffff80'}}>{it.label}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
