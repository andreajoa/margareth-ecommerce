import {CartForm} from '@shopify/hydrogen';
import {data} from 'react-router';

export async function action({request, context}) {
  const {cart, session} = context;
  const formData = await request.formData();
  const action = formData.get('cartAction');
  
  let result;

  if (action === 'LinesAdd') {
    const lines = JSON.parse(formData.get('lines') || '[]');
    result = await cart.addLines(lines);
  } else if (action === 'LinesUpdate') {
    const lines = JSON.parse(formData.get('lines') || '[]');
    result = await cart.updateLines(lines);
  } else if (action === 'LinesRemove') {
    const lineIds = JSON.parse(formData.get('lineIds') || '[]');
    result = await cart.removeLines(lineIds);
  }

  const headers = new Headers();
  
  if (result?.cart?.id) {
    session.set('cartId', result.cart.id);
  }
  
  if (session.isPending) {
    headers.append('Set-Cookie', await session.commit());
  }

  return data({cart: result?.cart || null, errors: result?.errors || []}, {headers});
}

export async function loader({context}) {
  const cartData = await context.cart.get();
  return {cart: cartData};
}
