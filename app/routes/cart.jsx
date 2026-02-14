import {CartForm} from '@shopify/hydrogen';
import {data} from 'react-router';

export const headers = () => ({
  'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
});

export async function action({request, context}) {
  const {cart} = context;
  const formData = await request.formData();
  const {action: cartAction, inputs} = CartForm.getFormInput(formData);

  if (!cartAction) {
    throw new Error('No cart action defined');
  }

  let result;

  switch (cartAction) {
    case CartForm.ACTIONS.LinesAdd:
      result = await cart.addLines(inputs.lines);
      break;
    case CartForm.ACTIONS.LinesUpdate:
      result = await cart.updateLines(inputs.lines);
      break;
    case CartForm.ACTIONS.LinesRemove:
      result = await cart.removeLines(inputs.lineIds);
      break;
    case CartForm.ACTIONS.DiscountCodesUpdate: {
      const codes = inputs.discountCodes
        ? inputs.discountCodes.filter(Boolean).map((c) => c.toUpperCase())
        : [];
      result = await cart.updateDiscountCodes(codes);
      break;
    }
    case CartForm.ACTIONS.BuyerIdentityUpdate:
      result = await cart.updateBuyerIdentity(inputs.buyerIdentity);
      break;
    default:
      throw new Error(`${cartAction} cart action is not defined`);
  }

  const cartId = result?.cart?.id;
  const headers = cartId ? cart.setCartId(result.cart.id) : new Headers();
  headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');

  // After mutation, fetch fresh cart with all line items
  let fullCart = result?.cart;
  if (cartId && (!fullCart?.lines?.nodes?.length)) {
    try {
      fullCart = await cart.get();
    } catch (e) {
      // keep mutation result
    }
  }

  return data(
    {
      cart: fullCart,
      errors: result?.errors,
      warnings: result?.warnings,
      analytics: {cartId},
    },
    {headers},
  );
}

// DO NOT redirect — that causes the page to navigate away
// Just return null for GET requests to /cart
export async function loader() {
  return null;
}
