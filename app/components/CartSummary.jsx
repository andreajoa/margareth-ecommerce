import {Money} from '@shopify/hydrogen';

export function CartSummary({cart}) {
  return (
    <div>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '800', color: '#0A3D2F',
      }}>
        <span>Subtotal</span>
        <span style={{color: '#3A8ECD', fontSize: '1.3rem'}}>
          {cart?.cost?.subtotalAmount?.amount ? (
            <Money data={cart.cost.subtotalAmount} />
          ) : 'R$ 0,00'}
        </span>
      </div>

      {cart?.checkoutUrl && (
        <a
          href={cart.checkoutUrl}
          target="_self"
          style={{
            display: 'block', width: '100%',
            backgroundColor: '#3A8ECD', color: '#FEFDF8',
            padding: '1rem', borderRadius: '50px',
            textAlign: 'center', textDecoration: 'none',
            fontWeight: '800', fontSize: '1rem',
            letterSpacing: '0.05em', textTransform: 'uppercase',
            boxShadow: '0 4px 15px rgba(58,142,205,0.3)',
            border: 'none', transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#FB8A38';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(251,138,56,0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#3A8ECD';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(58,142,205,0.3)';
          }}
        >
          Finalizar Compra →
        </a>
      )}

      <p style={{
        fontSize: '0.75rem', textAlign: 'center',
        color: '#0A3D2F', marginTop: '0.75rem', opacity: 0.6,
      }}>
        Frete calculado no checkout
      </p>
    </div>
  );
}
