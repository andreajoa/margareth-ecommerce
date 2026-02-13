import {CartMain} from '~/components/CartMain';
import {useRouteLoaderData} from 'react-router';

/**
 * CartDrawer — shows cart contents in the Aside drawer.
 * 
 * Gets fresh cart data from the root loader on every render.
 * Falls back to the prop if root data isn't available.
 */
export function CartDrawer({cart: cartProp, close}) {
  // Always get the latest cart from the root loader
  const rootData = useRouteLoaderData('root');
  const cart = rootData?.cart || cartProp;

  return (
    <div className="h-full bg-[#FEFDF8] flex flex-col">
      <CartMain cart={cart} close={close} />
    </div>
  );
}
