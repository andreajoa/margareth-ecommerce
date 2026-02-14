import {useFetcher} from 'react-router';
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
  const fetcher = useFetcher();
  const {open, setCartData} = useAside();
  const prevStateRef = useRef('idle');

  useEffect(() => {
    const wasWorking = prevStateRef.current !== 'idle';
    const isIdle = fetcher.state === 'idle';

    if (wasWorking && isIdle && fetcher.data) {
      console.log('[CART] Action complete, data:', JSON.stringify(fetcher.data).substring(0, 200));
      if (fetcher.data.cart) {
        setCartData(fetcher.data.cart);
      }
      open('cart');
    }

    prevStateRef.current = fetcher.state;
  }, [fetcher.state, fetcher.data, open, setCartData]);

  const isAdding = fetcher.state !== 'idle';

  const handleSubmit = (e) => {
    e.preventDefault();

    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'AddToCart', {
        content_ids: lines?.map((l) => l.merchandiseId),
        content_type: 'product',
      });
    }

    if (onClick) onClick(e);

    const formData = new FormData();
    formData.append('cartAction', 'LinesAdd');
    formData.append('lines', JSON.stringify(lines));
    if (analytics) {
      formData.append('analytics', JSON.stringify(analytics));
    }

    fetcher.submit(formData, {method: 'POST', action: '/cart'});
  };

  return (
    <button
      type="button"
      disabled={disabled ?? isAdding}
      className={
        className ||
        'bg-[#3A8ECD] text-white py-3 px-6 rounded font-bold w-full hover:bg-[#FB8A38] transition-colors disabled:opacity-50'
      }
      onClick={handleSubmit}
    >
      {isAdding ? '⏳ Adicionando...' : children}
    </button>
  );
}
