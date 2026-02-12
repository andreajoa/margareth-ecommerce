import {Suspense} from 'react';
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
        <Await resolve={cart}>
          {(resolvedCart) => <CartMain cart={resolvedCart} close={close} />}
        </Await>
      </Suspense>
    </div>
  );
}
