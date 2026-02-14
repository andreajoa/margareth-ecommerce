import {createHydrogenContext, createCartHandler} from '@shopify/hydrogen';
import {createAppSession} from './session';
import {CART_FRAGMENT} from './queries';

export async function createHydrogenRouterContext(request, env, executionContext) {
  const session = await createAppSession(
    request, 
    env?.SESSION_SECRET ? [env.SESSION_SECRET] : ['fallback-secret']
  );

  const hydrogenContext = createHydrogenContext({
    env: env || {},
    request,
    session,
    waitUntil: executionContext?.waitUntil?.bind(executionContext),
  });

  const cart = createCartHandler({
    storefront: hydrogenContext.storefront,
    getCartId: () => {
      const cartId = session.get('cartId');
      return cartId;
    },
    setCartId: (cartId) => {
      session.set('cartId', cartId);
    },
    cartFragment: CART_FRAGMENT,
  });

  return {
    ...hydrogenContext,
    cart,
  };
}
