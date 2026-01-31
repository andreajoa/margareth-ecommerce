import {CartForm} from '@shopify/hydrogen';

/**
 * @param {{
 *   analytics?: unknown;
 *   children: React.ReactNode;
 *   disabled?: boolean;
 *   lines: Array<OptimisticCartLineInput>;
 *   onClick?: () => void;
 * }}
 */
export function AddToCartButton({
  analytics,
  children,
  disabled,
  lines,
  onClick,
}) {

  // --- LÓGICA DO FACEBOOK PIXEL (ADD TO CART) ---
  const handleAddToCart = () => {
    // Verifica se estamos no navegador e se o Pixel está carregado
    if (typeof window !== 'undefined' && window.fbq) {
      
      // Tenta extrair dados ricos (preço, moeda) do objeto analytics se disponível
      // O Hydrogen geralmente passa isso na prop 'analytics'
      let pixelData = {
        content_type: 'product',
        content_ids: lines.map(line => line.merchandiseId), // ID da Variante
      };

      try {
        // Se houver dados de analytics (preço/moeda), adicionamos ao evento
        if (analytics && analytics.products && analytics.products[0]) {
          const product = analytics.products[0];
          pixelData.value = product.price;
          pixelData.currency = product.currency || 'BRL';
          pixelData.content_name = product.name;
        }
      } catch (e) {
        // Se der erro ao ler analytics, envia pelo menos os IDs (sem travar o site)
        console.error('Erro ao ler dados do Pixel:', e);
      }

      // Dispara o evento para o Facebook
      window.fbq('track', 'AddToCart', pixelData);
    }

    // Executa a função original (ex: abrir a gaveta do carrinho)
    if (onClick) {
      onClick();
    }
  };
  // ----------------------------------------------

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
            onClick={handleAddToCart}
            disabled={disabled ?? fetcher.state !== 'idle'}
            className="w-full relative overflow-hidden bg-[#3A8ECD] text-white py-4 px-8 text-lg font-semibold tracking-wide transition-all duration-500 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed group rounded-lg"
            aria-label="Adicionar ao carrinho"
          >
            {/* Gradiente do hover: Azul brinqueTEAndo para Laranja */}
            <span className="absolute inset-0 bg-gradient-to-r from-[#FB8A38] to-[#3A8ECD] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out"></span>
            
            {/* Conteúdo do botão */}
            <span className="relative z-10 flex items-center justify-center gap-2">
              {children}
            </span>
          </button>
        </>
      )}
    </CartForm>
  );
}

/** @typedef {import('react-router').FetcherWithComponents} FetcherWithComponents */
/** @typedef {import('@shopify/hydrogen').OptimisticCartLineInput} OptimisticCartLineInput */