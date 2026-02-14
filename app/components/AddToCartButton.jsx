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
        const isAdding = fetcher.state !== 'idle';
        
        // Abre o carrinho quando termina de adicionar
        if (fetcher.state === 'idle' && fetcher.data?.cart) {
          setTimeout(() => open('cart'), 50);
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
              onClick={onClick}
              disabled={disabled ?? isAdding}
              className={
                className ||
                'bg-[#3A8ECD] text-white py-3 px-6 rounded font-bold w-full hover:bg-[#FB8A38] transition-colors disabled:opacity-50'
              }
            >
              {isAdding ? '⏳ Adicionando...' : children}
            </button>
          </>
        );
      }}
    </CartForm>
  );
}
