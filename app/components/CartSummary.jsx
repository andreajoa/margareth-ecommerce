import {Money} from '@shopify/hydrogen';

export function CartSummary({cart}) {
  return (
    <div aria-labelledby="cart-summary">
      <div className="flex justify-between items-center mb-4 text-lg font-extrabold text-[#0A3D2F]">
        <span>Subtotal</span>
        <span className="text-xl text-[#3A8ECD]">
          {cart?.cost?.subtotalAmount?.amount ? (
            <Money data={cart.cost.subtotalAmount} />
          ) : (
            'R$ 0,00'
          )}
        </span>
      </div>

      {cart?.checkoutUrl && (
        <a
          href={cart.checkoutUrl}
          target="_self"
          className="block w-full bg-[#3A8ECD] text-[#FEFDF8] py-4 px-6 rounded-full text-center no-underline font-extrabold text-base uppercase tracking-wide transition-all duration-300 shadow-lg border-none"
          style={{
            boxShadow: '0 4px 15px rgba(58,142,205,0.3)',
          }}
        >
          Finalizar Compra →
        </a>
      )}

      <p className="text-xs text-center text-[#0A3D2F] mt-3 opacity-70">
        Frete calculado no checkout
      </p>
    </div>
  );
}
