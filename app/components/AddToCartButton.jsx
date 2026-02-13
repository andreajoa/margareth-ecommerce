import {CartForm} from '@shopify/hydrogen';
import {useEffect, useRef} from 'react';
import {useAside} from '~/components/Aside';

/**
 * AddToCartButton — submits to /cart action via CartForm.
 *
 * FIX: The old code called open('cart') inside the CartForm render prop,
 * which triggered a state update during render → infinite re-render loop.
 *
 * Solution: Extract an inner component that can use useEffect properly.
 */
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
        >
          {children}
        </AddToCartInner>
      )}
    </CartForm>
  );
}

/**
 * Inner component — can use hooks (useEffect) safely.
 * Opens the cart drawer exactly once when the action completes.
 */
function AddToCartInner({
  fetcher,
  analytics,
  children,
  disabled,
  className,
  onClick,
}) {
  const {open} = useAside();
  const prevState = useRef(fetcher.state);

  useEffect(() => {
    // Only open cart when transitioning FROM submitting/loading TO idle WITH data
    if (
      prevState.current !== 'idle' &&
      fetcher.state === 'idle' &&
      fetcher.data
    ) {
      open('cart');
    }
    prevState.current = fetcher.state;
  }, [fetcher.state, fetcher.data, open]);

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
