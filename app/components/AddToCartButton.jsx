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
      {(fetcher) => (
        <>
          <input
            name="analytics"
            type="hidden"
            value={JSON.stringify(analytics)}
          />
          <button
            type="submit"
            onClick={(e) => {
              if (onClick) onClick(e);
              // Abre o carrinho após adicionar
              setTimeout(() => open('cart'), 100);
            }}
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
