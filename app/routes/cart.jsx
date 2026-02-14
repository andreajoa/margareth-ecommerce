import {CartForm} from '@shopify/hydrogen';
import {data} from 'react-router';

export const headers = () => ({
  'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
});

export async function action({request, context}) {
  const {cart} = context;
  const formData = await request.formData();

  let cartAction, inputs;

  const manualAction = formData.get('cartAction');
  if (manualAction) {
    if (manualAction === 'LinesAdd') {
      cartAction = 'LinesAdd';
      inputs = {lines: JSON.parse(formData.get('lines'))};
    } else if (manualAction === 'LinesUpdate') {
      cartAction = 'LinesUpdate';
      inputs = {lines: JSON.parse(formData.get('lines'))};
    } else if (manualAction === 'LinesRemove') {
      cartAction = 'LinesRemove';
      inputs = {lineIds: JSON.parse(formData.get('lineIds'))};
    }
  } else {
    const parsed = CartForm.getFormInput(formData);
    cartAction = parsed.action;
    inputs = parsed.inputs;
  }

  if (!cartAction) throw new Error('No cart action');

  let result;

  if (cartAction === 'LinesAdd' || cartAction === CartForm.ACTIONS.LinesAdd) {
    result = await cart.addLines(inputs.lines);
  } else if (cartAction === 'LinesUpdate' || cartAction === CartForm.ACTIONS.LinesUpdate) {
    result = await cart.updateLines(inputs.lines);
  } else if (cartAction === 'LinesRemove' || cartAction === CartForm.ACTIONS.LinesRemove) {
    result = await cart.removeLines(inputs.lineIds);
  } else if (cartAction === CartForm.ACTIONS.DiscountCodesUpdate) {
    result = await cart.updateDiscountCodes(inputs.discountCodes || []);
  } else if (cartAction === CartForm.ACTIONS.BuyerIdentityUpdate) {
    result = await cart.updateBuyerIdentity(inputs.buyerIdentity);
  }

  const cartId = result?.cart?.id;
  const headers = cartId ? cart.setCartId(result.cart.id) : new Headers();
  headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');

  let fullCart = result?.cart;
  try {
    const fresh = await cart.get();
    if (fresh?.lines) fullCart = fresh;
  } catch (e) {}

  return data({cart: fullCart, errors: result?.errors, analytics: {cartId}}, {headers});
}

export async function loader() {
  return null;
}
