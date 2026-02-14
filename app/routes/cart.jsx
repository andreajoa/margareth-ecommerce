import {CartForm} from '@shopify/hydrogen';
import {data} from 'react-router';

export async function action({request, context}) {
  const {cart, session} = context;
  const formData = await request.formData();

  let cartAction, inputs;

  // Check manual action first
  const manualAction = formData.get('cartAction');
  if (manualAction) {
    cartAction = manualAction;
    if (manualAction === 'LinesAdd') {
      inputs = {lines: JSON.parse(formData.get('lines') || '[]')};
    } else if (manualAction === 'LinesUpdate') {
      inputs = {lines: JSON.parse(formData.get('lines') || '[]')};
    } else if (manualAction === 'LinesRemove') {
      inputs = {lineIds: JSON.parse(formData.get('lineIds') || '[]')};
    }
  } else {
    const parsed = CartForm.getFormInput(formData);
    cartAction = parsed.action;
    inputs = parsed.inputs;
  }

  if (!cartAction) {
    return data({cart: null, errors: ['No cart action provided']}, {status: 400});
  }

  let result;

  try {
    switch (cartAction) {
      case 'LinesAdd':
      case CartForm.ACTIONS.LinesAdd:
        result = await cart.addLines(inputs.lines);
        break;
      case 'LinesUpdate':
      case CartForm.ACTIONS.LinesUpdate:
        result = await cart.updateLines(inputs.lines);
        break;
      case 'LinesRemove':
      case CartForm.ACTIONS.LinesRemove:
        result = await cart.removeLines(inputs.lineIds);
        break;
      case CartForm.ACTIONS.DiscountCodesUpdate:
        result = await cart.updateDiscountCodes(inputs.discountCodes || []);
        break;
      case CartForm.ACTIONS.BuyerIdentityUpdate:
        result = await cart.updateBuyerIdentity(inputs.buyerIdentity);
        break;
      default:
        return data({cart: null, errors: ['Unknown cart action']}, {status: 400});
    }
  } catch (error) {
    console.error('Cart action error:', error);
    return data({cart: null, errors: [error.message]}, {status: 500});
  }

  // Get the updated cart
  const headers = new Headers();
  headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');

  // If we have a new cart, set the cookie
  if (result?.cart?.id) {
    const cartSetHeader = cart.setCartId(result.cart.id);
    if (cartSetHeader) {
      // setCartId might return headers or just set in session
      if (typeof cartSetHeader === 'string') {
        headers.set('Set-Cookie', cartSetHeader);
      }
    }
  }

  // Commit session to save cartId
  if (session && session.isPending) {
    headers.append('Set-Cookie', await session.commit());
  }

  return data(
    {
      cart: result?.cart || null,
      errors: result?.errors || [],
    },
    {headers}
  );
}

export async function loader({context}) {
  const {cart} = context;
  try {
    const cartData = await cart.get();
    return {cart: cartData};
  } catch (e) {
    return {cart: null};
  }
}
