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
  const {open} = useAside();
  const lastStateRef = useRef('idle');

  return (
    <CartForm route="/cart" inputs={{lines}} action={CartForm.ACTIONS.LinesAdd}>
      {(fetcher) => {
        // Detecta quando a action completou
        useEffect(() => {
          if (lastStateRef.current === 'submitting' && fetcher.state === 'idle') {
            // Action completou - abre o carrinho
            console.log('[CART] Item added, opening cart drawer');
            open('cart');
          }
          lastStateRef.current = fetcher.state;
        }, [fetcher.state]);

        return (
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
        );
      }}
    </CartForm>
  );
}
