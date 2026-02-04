import {CartForm} from '@shopify/hydrogen';
import {useAside} from '~/components/Aside';
import {useRevalidator} from 'react-router';
import {useEffect, useRef} from 'react';

export function AddToCartButton({
  analytics,
  children,
  disabled,
  lines,
  onClick,
  className,
}) {
  const {open, setCartData} = useAside();
  const revalidator = useRevalidator();
  const hasAddedRef = useRef(false);

  return (
    <CartForm route="/cart" inputs={{lines}} action={CartForm.ACTIONS.LinesAdd}>
      {(fetcher) => {
        const isAdding = fetcher.state === 'submitting';
        const data = fetcher.data;
        const hasAdded = data?.cart && fetcher.state === 'idle';

        // ✅ FIX CROSS-BROWSER: Usar useEffect para garantir execução
        useEffect(() => {
          if (hasAdded && !hasAddedRef.current) {
            hasAddedRef.current = true;
            
            // Atualiza cache do cart IMEDIATAMENTE
            if (data.cart) {
              setCartData(data.cart);
            }
            
            // Usa requestAnimationFrame para compatibilidade cross-browser
            requestAnimationFrame(() => {
              revalidator.revalidate();
              open('cart', data.cart);
            });

            // Reset flag após 2 segundos
            setTimeout(() => {
              hasAddedRef.current = false;
            }, 2000);
          }
        }, [hasAdded, data]);

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
              className={className || "bg-[#3A8ECD] text-white py-3 px-6 rounded font-bold w-full hover:bg-[#FB8A38] transition-colors disabled:opacity-50"}
              onClick={(e) => {
                if (typeof window !== 'undefined' && window.fbq) {
                  window.fbq('track', 'AddToCart', {
                    content_ids: lines.map(l => l.merchandiseId),
                    content_type: 'product',
                  });
                }
                if (onClick) onClick(e);
              }}
            >
              {isAdding ? '⏳ Adicionando...' : (hasAdded ? '✓ Adicionado!' : children)}
            </button>
          </>
        );
      }}
    </CartForm>
  );
}
