import {CartMain} from '~/components/CartMain';

export function CartDrawer({cart, close}) {
  return (
    <div className="h-full bg-[#FEFDF8] flex flex-col">
      <CartMain cart={cart} close={close} />
    </div>
  );
}
