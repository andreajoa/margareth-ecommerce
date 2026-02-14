import {data} from 'react-router';
import {CartForm} from '@shopify/hydrogen';

export async function action({request, context}) {
  const {cart} = context;
  const formData = await request.formData();
  
  console.log('[CART ACTION] Received request');
  
  let action, inputs;
  
  try {
    const parsed = CartForm.getFormInput(formData);
    action = parsed.action;
    inputs = parsed.inputs;
    console.log('[CART ACTION] Parsed:', action, JSON.stringify(inputs));
  } catch (e) {
    console.error('[CART ACTION] Parse error:', e);
    return data({cart: null, errors: [{message: 'Invalid form data'}]}, {status: 400});
  }

  if (!action) {
    console.error('[CART ACTION] No action');
    return data({cart: null, errors: [{message: 'No action provided'}]}, {status: 400});
  }

  let result;

  try {
    switch (action) {
      case CartForm.ACTIONS.LinesAdd:
        console.log('[CART ACTION] Adding lines:', inputs.lines);
        result = await cart.addLines(inputs.lines);
        console.log('[CART ACTION] Add result:', result?.cart?.id);
        break;
      case CartForm.ACTIONS.LinesUpdate:
        result = await cart.updateLines(inputs.lines);
        break;
      case CartForm.ACTIONS.LinesRemove:
        result = await cart.removeLines(inputs.lineIds);
        break;
      default:
        return data({cart: null, errors: [{message: `Unknown action: ${action}`}]}, {status: 400});
    }
  } catch (e) {
    console.error('[CART ACTION] Error:', e);
    return data({cart: null, errors: [{message: e.message}]}, {status: 500});
  }

  const cartId = result?.cart?.id;
  const headers = cartId ? cart.setCartId(result.cart.id) : new Headers();

  console.log('[CART ACTION] Success, cartId:', cartId);

  return data(
    {
      cart: result?.cart,
      errors: result?.errors || [],
    },
    { headers }
  );
}

export async function loader({context}) {
  try {
    const cartData = await context.cart.get();
    console.log('[CART LOADER] Got cart:', cartData?.id);
    return data({cart: cartData});
  } catch (e) {
    console.error('[CART LOADER] Error:', e);
    return data({cart: null});
  }
}
