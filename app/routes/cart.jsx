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
  console.log('🛒 CART ACTION - Inputs:', JSON.stringify(inputs, null, 2));

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
        console.log('✅ Lines added! Result:', JSON.stringify(result, null, 2));
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

    const cartResult = result?.cart;

    // ✅ DEBUG: Mostrar estrutura completa do cart retornado
    console.log('🎉 Cart action completada!');
    console.log('🎉 cartResult:', JSON.stringify(cartResult, null, 2));
    console.log('🎉 cartResult CHAVES:', cartResult ? Object.keys(cartResult) : 'null');
    console.log('🎉 cartResult.lines:', cartResult?.lines);
    console.log('🎉 cartResult.merchandiseLines:', cartResult?.merchandiseLines);

    const {errors, warnings} = result;

    return data(
      {
        cart: cartResult,
        errors,
        warnings,
        analytics: {cartId},
      },
      {headers},
    );

  } catch (error) {
    console.error('❌ Cart Action Error:', error);
    return data({error: error.message}, {status: 500});
  }
}

export async function loader({context}) {
  const {cart} = context;
  const cartData = await cart.get();
  console.log('🛒 CART LOADER - cartData:', JSON.stringify(cartData, null, 2));
  return cartData;
}
