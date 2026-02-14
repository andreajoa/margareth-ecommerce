import {data} from 'react-router';
import {CartForm} from '@shopify/hydrogen';

export async function action({request, context}) {
  const {cart} = context;
  const formData = await request.formData();
  
  let action, inputs;
  
  try {
    const parsed = CartForm.getFormInput(formData);
    action = parsed.action;
    inputs = parsed.inputs;
  } catch (e) {
    console.error('CartForm parse error:', e);
    return data({cart: null, errors: [{message: 'Invalid form data'}]}, {status: 400});
  }

  if (!action) {
    return data({cart: null, errors: [{message: 'No action provided'}]}, {status: 400});
  }

  let result;

  try {
    switch (action) {
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
        const discountCodes = inputs.discountCode ? [inputs.discountCode] : [];
        discountCodes.push(...(inputs.discountCodes || []));
        result = await cart.updateDiscountCodes(discountCodes);
        break;
      default:
        return data({cart: null, errors: [{message: `Unknown action: ${action}`}]}, {status: 400});
    }
  } catch (e) {
    console.error('Cart action error:', e);
    return data({cart: null, errors: [{message: e.message}]}, {status: 500});
  }

  const cartId = result?.cart?.id;
  const headers = cartId ? cart.setCartId(result.cart.id) : new Headers();

  return data(
    {
      cart: result?.cart,
      errors: result?.errors || [],
      analytics: { cartId },
    },
    { headers }
  );
}

export async function loader({context}) {
  try {
    const cartData = await context.cart.get();
    return data({cart: cartData});
  } catch (e) {
    console.error('Cart loader error:', e);
    return data({cart: null});
  }
}
