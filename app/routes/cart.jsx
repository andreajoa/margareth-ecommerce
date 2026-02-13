import {CartForm} from '@shopify/hydrogen';
import {data, redirect} from 'react-router';

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
    case CartForm.ACTIONS.DiscountCodesUpdate:
      const codes = inputs.discountCodes
        ? inputs.discountCodes.filter(Boolean).map((c) => c.toUpperCase())
        : [];
      result = await cart.updateDiscountCodes(codes);
      break;
    case CartForm.ACTIONS.BuyerIdentityUpdate:
      result = await cart.updateBuyerIdentity(inputs.buyerIdentity);
      break;
    default:
      throw new Error(`${cartAction} cart action is not defined`);
  }

  const cartId = result?.cart?.id;
  const headers = cartId ? cart.setCartId(result.cart.id) : new Headers();
  headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');

  const {cart: cartResult, errors, warnings} = result;

  // If the mutation response doesn't include full cart data with lines,
  // fetch the complete cart
  let fullCart = cartResult;
  if (cartResult && (!cartResult.lines || !cartResult.lines.nodes?.length) && cartResult.totalQuantity > 0) {
    try {
      fullCart = await cart.get();
    } catch (e) {
      console.error('Failed to fetch full cart:', e);
    }
  }

  return data(
    {cart: fullCart, errors, warnings, analytics: {cartId}},
    {headers},
  );
}

export async function loader() {
  return redirect('/');
}
