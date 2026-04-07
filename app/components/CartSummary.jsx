import {Money} from '@shopify/hydrogen';

export function CartSummary({cart}) {
  return (
    <div aria-labelledby="cart-summary">
      {/* Subtotal */}
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 'bold', color: '#0A3D2F'}}>
        <span>Subtotal</span>
        <span>
          {cart?.cost?.subtotalAmount?.amount ? (
            <Money data={cart.cost.subtotalAmount} />
          ) : (
            '-'
          )}
        </span>
      </div>

      {/* Checkout Button */}
      {cart?.checkoutUrl && (
        <a
          href={cart.checkoutUrl}
          target="_self"
          style={{
            display: 'block',
            width: '100%',
            backgroundColor: '#0A3D2F', // Verde da marca
            color: '#FEFDF8', // Branco off-white
            padding: '1rem',
            borderRadius: '0.5rem',
            textAlign: 'center',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '1rem',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: '1px solid #0A3D2F'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#D4AF69'; // Dourado no hover
            e.currentTarget.style.borderColor = '#D4AF69';
            e.currentTarget.style.color = '#0A3D2F'; // Texto verde no hover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#0A3D2F';
            e.currentTarget.style.borderColor = '#0A3D2F';
            e.currentTarget.style.color = '#FEFDF8';
          }}
        >
          Finalizar Compra
        </a>
      )}
      
      <p style={{fontSize: '0.75rem', textAlign: 'center', color: '#0A3D2F', marginTop: '0.75rem', opacity: 0.8}}>
        Taxas e frete calculados no checkout
      </p>
    </div>
  );
}
