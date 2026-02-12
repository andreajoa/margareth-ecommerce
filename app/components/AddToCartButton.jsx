import {CartForm} from '@shopify/hydrogen';
import {useAside} from '~/components/Aside';

export function AddToCartButton({
  analytics,
  children,
  disabled,
  lines,
  onClick,
  className,
}) {
  const {open} = useAside();
  
  return (
    <CartForm route="/cart" inputs={{lines}} action={CartForm.ACTIONS.LinesAdd}>
      {(fetcher) => {
        // Quando o submit for bem-sucedido, abre o carrinho
        const isAdding = fetcher.state === 'submitting';
        const justAdded = fetcher.state === 'idle' && fetcher.data;
        
        // Abre o carrinho após adicionar
        if (justAdded && !isAdding) {
          setTimeout(() => open('cart'), 100);
        }
        
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
                // Pixel do Facebook
                if (typeof window !== 'undefined' && window.fbq) {
                  window.fbq('track', 'AddToCart', {
                    content_ids: lines.map(l => l.merchandiseId),
                    content_type: 'product',
                  });
                }
                
                // Se tiver onClick personalizado, executa
                if (onClick) onClick(e);
              }}
            >
              {isAdding ? 'Adicionando...' : children}
            </button>
          </>
        );
      }}
    </CartForm>
  );
}
