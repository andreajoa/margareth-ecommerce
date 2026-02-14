import {useFetcher} from 'react-router';
import {CartForm} from '@shopify/hydrogen';
import {useAside} from '~/components/Aside';
import {useEffect, useRef} from 'react';

export function AddToCartButton({
  analytics,
  children,
  disabled,
  lines,
  onClick,
  className,
}) {
  const fetcher = useFetcher();
  const {open} = useAside();
  const prevState = useRef('idle');

  useEffect(() => {
    if (prevState.current !== 'idle' && fetcher.state === 'idle' && fetcher.data?.cart) {
      open('cart');
    }
    prevState.current = fetcher.state;
  }, [fetcher.state, fetcher.data, open]);

  const handleClick = (e) => {
    if (onClick) onClick(e);
    
    const formData = new FormData();
    formData.append('cartFormInput', JSON.stringify({
      action: CartForm.ACTIONS.LinesAdd,
      inputs: {lines},
    }));
    if (analytics) {
      formData.append('analytics', JSON.stringify(analytics));
    }
    
    fetcher.submit(formData, {
      method: 'POST',
      action: '/cart',
    });
  };

  const isAdding = fetcher.state !== 'idle';

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled ?? isAdding}
      className={
        className ||
        'bg-[#3A8ECD] text-white py-3 px-6 rounded font-bold w-full hover:bg-[#FB8A38] transition-colors disabled:opacity-50'
      }
    >
      {isAdding ? '⏳ Adicionando...' : children}
    </button>
  );
}
