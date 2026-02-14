import {data} from 'react-router';
import {CartForm} from '@shopify/hydrogen';

export async function action({request, context}) {
  const {cart} = context;
  const formData = await request.formData();
  const {action, inputs} = CartForm.getFormInput(formData);

  if (!action) {
    throw new Error('No action provided');
  }

  let result;

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
      throw new Error(`${action} cart action is not defined`);
  }

  const cartId = result?.cart?.id;
  const headers = cartId ? cart.setCartId(result.cart.id) : new Headers();

  return data(
    {
      cart: result?.cart,
      errors: result?.errors,
      analytics: { cartId },
    },
    { headers }
  );
}

export async function loader({context}) {
  const {cart} = context;
  return await cart.get();
}
