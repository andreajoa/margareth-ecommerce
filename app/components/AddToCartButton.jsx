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

  console.log('🛒 AddToCartButton renderizado com lines:', lines);

  return (
    <CartForm route="/cart" inputs={{lines}} action={CartForm.ACTIONS.LinesAdd}>
      {(fetcher) => {
        const isAdding = fetcher.state === 'submitting';
        const data = fetcher.data;
        const hasAdded = data?.cart && fetcher.state === 'idle';

        // Debug: mostrar dados do fetcher
        console.log('📦 Fetcher state:', fetcher.state);
        console.log('📦 Fetcher data:', data);
        console.log('📦 hasAdded:', hasAdded);

        // Abre o carrinho automaticamente quando adicionar com sucesso
        if (hasAdded && typeof window !== 'undefined') {
          console.log('✅ Produto adicionado! Abrindo carrinho...');
          setTimeout(() => {
            open('cart');
            // Force reload do cart no root
            if (window.__revalidateRoot) window.__revalidateRoot();
          }, 100);
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
                console.log('🔘 Botão clicado! Lines:', lines);
                // Facebook Pixel
                if (typeof window !== 'undefined' && window.fbq) {
                  window.fbq('track', 'AddToCart', {
                    content_ids: lines.map(l => l.merchandiseId),
                    content_type: 'product',
                  });
                }

                if (onClick) onClick(e);
              }}
            >
              {isAdding ? 'Adicionando...' : (hasAdded ? '✓ Adicionado!' : children)}
            </button>
          </>
        );
      }}
    </CartForm>
  );
}
