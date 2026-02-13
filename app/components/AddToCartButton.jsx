import {CartForm} from '@shopify/hydrogen';
import {useEffect, useRef} from 'react';
import {useFetcher} from 'react-router';
import {useAside} from '~/components/Aside';

export function AddToCartButton({
  analytics,
  children,
  disabled,
  lines,
  onClick,
  className,
}) {
  return (
    <CartForm route="/cart" inputs={{lines}} action={CartForm.ACTIONS.LinesAdd}>
      {(fetcher) => (
        <AddToCartInner
          fetcher={fetcher}
          analytics={analytics}
          disabled={disabled}
          className={className}
          onClick={onClick}
          lines={lines}
        >
          {children}
        </AddToCartInner>
      )}
    </CartForm>
  );
}

function AddToCartInner({
  fetcher,
  analytics,
  children,
  disabled,
  className,
  onClick,
  lines,
}) {
  const {open, setCartData} = useAside();
  const prevState = useRef(fetcher.state);
  
  // Secondary fetcher to load full cart data after adding
  const cartFetcher = useFetcher();

  useEffect(() => {
    if (
      prevState.current !== 'idle' &&
      fetcher.state === 'idle' &&
      fetcher.data
    ) {
      const cartData = fetcher.data.cart;
      
      if (cartData?.lines?.nodes?.length > 0) {
        // Action returned full cart with line items — use directly
        setCartData(cartData);
        open('cart');
      } else if (cartData?.id) {
        // Cart exists but lines are empty in response — fetch full cart
        // Use a GET to the root loader which calls cart.get()
        cartFetcher.load('/cart?_data=root');
        open('cart');
      } else {
        // Still open cart even if data is weird
        open('cart');
      }
    }
    prevState.current = fetcher.state;
  }, [fetcher.state, fetcher.data, open, setCartData]);

  // When the secondary fetch completes, update cart data
  useEffect(() => {
    if (cartFetcher.state === 'idle' && cartFetcher.data?.cart) {
      setCartData(cartFetcher.data.cart);
    }
  }, [cartFetcher.state, cartFetcher.data, setCartData]);

  const isAdding = fetcher.state !== 'idle';

  return (
    <>
      <input name="analytics" type="hidden" value={JSON.stringify(analytics)} />
      <button
        type="submit"
        disabled={disabled ?? isAdding}
        className={
          className ||
          'bg-[#3A8ECD] text-white py-3 px-6 rounded font-bold w-full hover:bg-[#FB8A38] transition-colors disabled:opacity-50'
        }
        onClick={(e) => {
          if (typeof window !== 'undefined' && window.fbq) {
            window.fbq('track', 'AddToCart', {
              content_ids: lines?.map((l) => l.merchandiseId),
              content_type: 'product',
            });
          }
          if (onClick) onClick(e);
        }}
      >
        {isAdding ? 'Adicionando...' : children}
      </button>
    </>
  );
}
