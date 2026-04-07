import {CartForm} from '@shopify/hydrogen';
import {useAside} from '~/components/Aside';
import {useEffect, useRef} from 'react';

/**
 * Botão de Adicionar ao Carrinho
 * Usa CartForm do Hydrogen para compatibilidade total
 */
export function AddToCartButton({
  analytics,
  children,
  disabled,
  lines,
  onClick,
  className,
}) {
  const {open, setCartData} = useAside();
  const hasAddedRef = useRef(false);

  return (
    <CartForm route="/cart" inputs={{lines}} action={CartForm.ACTIONS.LinesAdd}>
      {(fetcher) => {
        const isAdding = fetcher.state === 'submitting';
        const data = fetcher.data;
        const hasAdded = data?.cart && fetcher.state === 'idle' && data?.cart?.totalQuantity > 0;

        // ✅ FIX: Atualizar carrinho quando adicionado com sucesso
        useEffect(() => {
          if (hasAdded && !hasAddedRef.current) {
            hasAddedRef.current = true;

            console.log('✅ Produto adicionado ao carrinho!', data.cart);

            // Atualiza cache do cart IMEDIATAMENTE
            if (data.cart) {
              setCartData(data.cart);
            }

            // Abrir carrinho após curto delay
            setTimeout(() => {
              open('cart', data.cart);
            }, 300);

            // Reset flag após 2 segundos
            setTimeout(() => {
              hasAddedRef.current = false;
            }, 2000);
          }
        }, [hasAdded, data, open, setCartData]);

        // Debug
        useEffect(() => {
          if (fetcher.state === 'idle' && fetcher.data) {
            console.log('🛒 Fetcher state:', fetcher.state, 'Data:', fetcher.data);
          }
        }, [fetcher.state, fetcher.data]);

        return (
          <>
            <input
              name="analytics"
              type="hidden"
              value={JSON.stringify(analytics || {})}
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
