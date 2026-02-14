import {data} from 'react-router';

const CART_CREATE_MUTATION = `#graphql
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        totalQuantity
        lines(first: 100) {
          nodes {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                image { url altText }
                price { amount currencyCode }
                product { id title handle }
                selectedOptions { name value }
              }
            }
            cost {
              totalAmount { amount currencyCode }
            }
          }
        }
        cost {
          subtotalAmount { amount currencyCode }
          totalAmount { amount currencyCode }
        }
      }
      userErrors { field message }
    }
  }
`;

const CART_ADD_MUTATION = `#graphql
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        totalQuantity
        lines(first: 100) {
          nodes {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                image { url altText }
                price { amount currencyCode }
                product { id title handle }
                selectedOptions { name value }
              }
            }
            cost {
              totalAmount { amount currencyCode }
            }
          }
        }
        cost {
          subtotalAmount { amount currencyCode }
          totalAmount { amount currencyCode }
        }
      }
      userErrors { field message }
    }
  }
`;

const CART_QUERY = `#graphql
  query cart($cartId: ID!) {
    cart(id: $cartId) {
      id
      checkoutUrl
      totalQuantity
      lines(first: 100) {
        nodes {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              image { url altText }
              price { amount currencyCode }
              product { id title handle }
              selectedOptions { name value }
            }
          }
          cost {
            totalAmount { amount currencyCode }
          }
        }
      }
      cost {
        subtotalAmount { amount currencyCode }
        totalAmount { amount currencyCode }
      }
    }
  }
`;

const CART_LINES_UPDATE_MUTATION = `#graphql
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
        totalQuantity
        lines(first: 100) {
          nodes {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                image { url altText }
                price { amount currencyCode }
                product { id title handle }
                selectedOptions { name value }
              }
            }
            cost {
              totalAmount { amount currencyCode }
            }
          }
        }
        cost {
          subtotalAmount { amount currencyCode }
          totalAmount { amount currencyCode }
        }
      }
      userErrors { field message }
    }
  }
`;

const CART_LINES_REMOVE_MUTATION = `#graphql
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
        totalQuantity
        lines(first: 100) {
          nodes {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                image { url altText }
                price { amount currencyCode }
                product { id title handle }
                selectedOptions { name value }
              }
            }
            cost {
              totalAmount { amount currencyCode }
            }
          }
        }
        cost {
          subtotalAmount { amount currencyCode }
          totalAmount { amount currencyCode }
        }
      }
      userErrors { field message }
    }
  }
`;

export async function action({request, context}) {
  const {storefront, session} = context;
  const formData = await request.formData();
  const action = formData.get('cartAction');
  
  let cartId = session.get('cartId');
  let cart = null;
  let errors = [];

  try {
    if (action === 'LinesAdd') {
      const lines = JSON.parse(formData.get('lines') || '[]');
      
      if (!cartId) {
        const {cartCreate} = await storefront.mutate(CART_CREATE_MUTATION, {
          variables: {input: {lines}}
        });
        cart = cartCreate?.cart;
        errors = cartCreate?.userErrors || [];
        if (cart?.id) {
          session.set('cartId', cart.id);
        }
      } else {
        const {cartLinesAdd} = await storefront.mutate(CART_ADD_MUTATION, {
          variables: {cartId, lines}
        });
        cart = cartLinesAdd?.cart;
        errors = cartLinesAdd?.userErrors || [];
      }
    } else if (action === 'LinesUpdate') {
      const lines = JSON.parse(formData.get('lines') || '[]');
      if (cartId) {
        const {cartLinesUpdate} = await storefront.mutate(CART_LINES_UPDATE_MUTATION, {
          variables: {cartId, lines}
        });
        cart = cartLinesUpdate?.cart;
        errors = cartLinesUpdate?.userErrors || [];
      }
    } else if (action === 'LinesRemove') {
      const lineIds = JSON.parse(formData.get('lineIds') || '[]');
      if (cartId) {
        const {cartLinesRemove} = await storefront.mutate(CART_LINES_REMOVE_MUTATION, {
          variables: {cartId, lineIds}
        });
        cart = cartLinesRemove?.cart;
        errors = cartLinesRemove?.userErrors || [];
      }
    }
  } catch (e) {
    errors = [{message: e.message}];
  }

  const headers = new Headers();
  if (session.isPending) {
    headers.append('Set-Cookie', await session.commit());
  }

  return data({cart, errors}, {headers});
}

export async function loader({context}) {
  const {storefront, session} = context;
  const cartId = session.get('cartId');
  
  if (!cartId) return {cart: null};
  
  try {
    const {cart} = await storefront.query(CART_QUERY, {
      variables: {cartId}
    });
    return {cart};
  } catch (e) {
    return {cart: null};
  }
}
