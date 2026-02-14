import {data} from 'react-router';
import {CartForm} from '@shopify/hydrogen';

export async function action({request, context}) {
  console.log('[CART] Context keys:', Object.keys(context));
  console.log('[CART] Has cart:', !!context.cart);
  
  const {cart} = context;
  
  if (!cart) {
    console.error('[CART] No cart in context!');
    return data({cart: null, errors: [{message: 'Cart not available'}]}, {status: 500});
  }
  
  const formData = await request.formData();
  
  let actionType, inputs;
  
  // Parse cartFormInput (nosso formato)
  const cartFormInput = formData.get('cartFormInput');
  if (cartFormInput) {
    try {
      const parsed = JSON.parse(cartFormInput);
      actionType = parsed.action;
      inputs = parsed.inputs;
      console.log('[CART] Parsed action:', actionType);
      console.log('[CART] Parsed inputs:', JSON.stringify(inputs));
    } catch (e) {
      console.error('[CART] JSON parse error:', e);
    }
  }
  
  // Fallback para CartForm.getFormInput
  if (!actionType) {
    try {
      const parsed = CartForm.getFormInput(formData);
      actionType = parsed.action;
      inputs = parsed.inputs;
    } catch (e) {
      console.error('[CART] CartForm parse error:', e);
    }
  }

  if (!actionType) {
    return data({cart: null, errors: [{message: 'No action provided'}]}, {status: 400});
  }

  let result;

  try {
    if (actionType === 'LinesAdd' || actionType === CartForm.ACTIONS.LinesAdd) {
      console.log('[CART] Calling cart.addLines with:', JSON.stringify(inputs.lines));
      result = await cart.addLines(inputs.lines);
      console.log('[CART] addLines result:', JSON.stringify(result));
    } else if (actionType === 'LinesUpdate' || actionType === CartForm.ACTIONS.LinesUpdate) {
      result = await cart.updateLines(inputs.lines);
    } else if (actionType === 'LinesRemove' || actionType === CartForm.ACTIONS.LinesRemove) {
      result = await cart.removeLines(inputs.lineIds);
    } else {
      return data({cart: null, errors: [{message: `Unknown action: ${actionType}`}]}, {status: 400});
    }
  } catch (e) {
    console.error('[CART] Action error:', e.message);
    return data({cart: null, errors: [{message: e.message}]}, {status: 500});
  }

  const cartId = result?.cart?.id;
  console.log('[CART] Result cartId:', cartId);
  
  const headers = cartId ? cart.setCartId(result.cart.id) : new Headers();

  return data({cart: result?.cart, errors: result?.errors || []}, {headers});
}

export async function loader({context}) {
  const {cart} = context;
  if (!cart) {
    return {cart: null};
  }
  try {
    const cartData = await cart.get();
    return {cart: cartData};
  } catch (e) {
    console.error('[CART LOADER] Error:', e);
    return {cart: null};
  }
}
