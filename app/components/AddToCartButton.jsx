import {CartForm} from '@shopify/hydrogen';
import {useAside} from '~/components/Aside';
import {useEffect, useRef} from 'react';
import {useFetchers} from 'react-router';

export function AddToCartButton({
  analytics,
  children,
  disabled,
  lines,
  onClick,
  className,
}) {
  const {open} = useAside();
  const fetchers = useFetchers();
  const lastFetcherState = useRef(null);

  // Detecta quando qualquer cart action completa e abre o drawer
  useEffect(() => {
    const cartFetcher = fetchers.find(
      (f) => f.formAction === '/cart' && f.state === 'idle' && f.data?.cart
    );
    
    if (cartFetcher && lastFetcherState.current === 'submitting') {
      open('cart');
    }
    
    const submittingFetcher = fetchers.find(
      (f) => f.formAction === '/cart' && f.state === 'submitting'
    );
    
    if (submittingFetcher) {
      lastFetcherState.current = 'submitting';
    } else {
      lastFetcherState.current = 'idle';
    }
  }, [fetchers, open]);

  return (
    <CartForm route="/cart" inputs={{lines}} action={CartForm.ACTIONS.LinesAdd}>
      {(fetcher) => (
        <>
          <input
            name="analytics"
            type="hidden"
            value={JSON.stringify(analytics)}
          />
          <button
            type="submit"
            onClick={onClick}
            disabled={disabled ?? fetcher.state !== 'idle'}
            className={
              className ||
              'bg-[#3A8ECD] text-white py-3 px-6 rounded font-bold w-full hover:bg-[#FB8A38] transition-colors disabled:opacity-50'
            }
          >
            {fetcher.state !== 'idle' ? '⏳ Adicionando...' : children}
          </button>
        </>
      )}
    </CartForm>
  );
}
