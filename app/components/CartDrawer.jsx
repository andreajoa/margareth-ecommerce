import React, {Suspense} from 'react';
import {Await} from 'react-router';
import {CartMain} from '~/components/CartMain';

export function CartDrawer({cart, close}) {
  return (
    <div className="h-full bg-[#FEFDF8] flex flex-col">
      <Suspense fallback={
        <div className="flex-1 flex items-center justify-center p-10 text-[#0A3D2F]">
          <p>Carregando carrinho...</p>
        </div>
      }>
        <Await resolve={cart} errorElement={<div className="p-10 text-red-500">Erro ao carregar</div>}>
          {(resolvedCart) => <CartMain cart={resolvedCart} layout="aside" close={close} />}
        </Await>
      </Suspense>
    </div>
  );
}
