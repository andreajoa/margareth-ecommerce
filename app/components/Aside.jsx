import React, {createContext, useContext, useState, useMemo, useCallback} from 'react';
import {CartDrawer} from '~/components/CartDrawer';

const AsideContext = createContext(null);

export function AsideProvider({children}) {
  const [type, setType] = useState('closed');
  const [freshCart, setFreshCart] = useState(null);
  const open = useCallback((mode) => setType(mode), []);
  const close = useCallback(() => setType('closed'), []);
  const setCartData = useCallback((c) => setFreshCart(c), []);
  const value = useMemo(() => ({type, open, close, setCartData, freshCart}), [type, open, close, setCartData, freshCart]);
  return <AsideContext.Provider value={value}>{children}</AsideContext.Provider>;
}

export function useAside() {
  const ctx = useContext(AsideContext);
  if (!ctx) return {type: 'closed', open: () => {}, close: () => {}, setCartData: () => {}, freshCart: null};
  return ctx;
}

export function Aside({cart}) {
  const {type, close, freshCart} = useAside();
  if (type === 'closed') return null;
  const cartToShow = freshCart || cart;

  return (
    <div className="fixed inset-0 z-[9999]" style={{background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)'}} onClick={close}>
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-[#FEFDF8] shadow-2xl flex flex-col" onClick={(e) => e.stopPropagation()} style={{borderLeft: '4px solid #3A8ECD'}}>
        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-[#3A8ECD] bg-[#f0f7fc] flex-shrink-0">
          <h2 className="text-xl font-black text-[#0A3D2F] tracking-wide uppercase">
            {type === 'cart' ? '🛒 Seu Carrinho' : 'Menu'}
          </h2>
          <button onClick={close} className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#0A3D2F] shadow hover:scale-110 transition-transform cursor-pointer border-2 border-[#3A8ECD]" aria-label="Fechar">✕</button>
        </div>
        <div className="flex-1 overflow-hidden relative">
          {type === 'cart' && <CartDrawer cart={cartToShow} close={close} />}
          {type === 'menu' && <div className="p-4">Menu Mobile</div>}
        </div>
      </div>
    </div>
  );
}
