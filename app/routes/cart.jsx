import {CartForm} from '@shopify/hydrogen';
import {data} from 'react-router';

export const headers = () => {
  return {
    'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
  };
};

export async function action({request, context}) {
  const {cart, session} = context;
  const formData = await request.formData();

  const {action, inputs} = CartForm.getFormInput(formData);

  console.log('🛒 CART ACTION - Action:', action);
  console.log('🛒 CART ACTION - Inputs:', inputs);

  if (!action) {
    console.error('❌ No cart action defined');
    throw new Error('No cart action defined');
  }

  let result;

  try {
    switch (action) {
      case CartForm.ACTIONS.LinesAdd:
        console.log('➕ Adding lines:', inputs.lines);
        result = await cart.addLines(inputs.lines);
        console.log('✅ Lines added! Result:', result);
        break;
      case CartForm.ACTIONS.LinesUpdate:
        result = await cart.updateLines(inputs.lines);
        break;
      case CartForm.ACTIONS.LinesRemove:
        result = await cart.removeLines(inputs.lineIds);
        break;
      case CartForm.ACTIONS.DiscountCodesUpdate:
        const codes = inputs.discountCodes
          ? inputs.discountCodes.filter(c => c).map(c => c.toUpperCase())
          : [];
        result = await cart.updateDiscountCodes(codes);
        break;
      case CartForm.ACTIONS.BuyerIdentityUpdate:
        result = await cart.updateBuyerIdentity(inputs.buyerIdentity);
        break;
      default:
        throw new Error(`${action} cart action is not defined`);
    }

    // Atualiza ID do carrinho no cookie
    const cartId = result?.cart?.id;
    const headers = cartId ? cart.setCartId(result.cart.id) : new Headers();

    // CRITICAL: Prevenir cache de cart actions
    headers.set('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0');
    headers.set('Pragma', 'no-cache');
    headers.set('Expires', '0');

    console.log('🎉 Cart action completada! Cart:', result.cart);

    const {cart: cartResult, errors, warnings} = result;

    return data(
      {
        cart: cartResult,
        errors,
        warnings,
        analytics: {cartId},
      },
      {status: headers},
    );

  } catch (error) {
    console.error('❌ Cart Action Error:', error);
    return data({error: error.message}, {status: 500});
  }
}

export async function loader({context}) {
  const {cart} = context;
  return await cart.get();
}
