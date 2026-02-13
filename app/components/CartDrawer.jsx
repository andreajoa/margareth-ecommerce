import {CartMain} from '~/components/CartMain';

/**
 * CartDrawer — receives cart data directly from Aside.
 * Fresh data comes from AddToCartButton via setCartData.
 */
export function CartDrawer({cart, close}) {
  return (
    <div className="h-full bg-[#FEFDF8] flex flex-col">
      <CartMain cart={cart} close={close} />
    </div>
  );
}
