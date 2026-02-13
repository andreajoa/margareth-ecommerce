import {CartForm} from '@shopify/hydrogen';
import {useEffect, useRef} from 'react';
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

  useEffect(() => {
    if (
      prevState.current !== 'idle' &&
      fetcher.state === 'idle' &&
      fetcher.data
    ) {
      // Pass the fresh cart data from the action response to the drawer
      if (fetcher.data.cart) {
        setCartData(fetcher.data.cart);
      }
      open('cart');
    }
    prevState.current = fetcher.state;
  }, [fetcher.state, fetcher.data, open, setCartData]);

  const isAdding = fetcher.state !== 'idle';

  return (
    <>
      <input
        name="analytics"
        type="hidden"
        value={JSON.stringify(analytics)}
      />
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
