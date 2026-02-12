import {CartLineItem} from '~/components/CartLineItem';
import {CartSummary} from '~/components/CartSummary';
import {Link} from 'react-router';
import {useAside} from '~/components/Aside';

export function CartMain({cart, layout, close}) {
  // Recebe 'close' como prop para evitar ciclo, ou usa hook apenas dentro de eventos
  
  // Estrutura segura do carrinho
  const safeCart = cart || {
    id: 'empty-cart',
    lines: { nodes: [] },
    totalQuantity: 0,
    cost: {
      subtotalAmount: { amount: '0', currencyCode: 'BRL' },
      totalAmount: { amount: '0', currencyCode: 'BRL' }
    },
    checkoutUrl: '',
  };

  // Normaliza linhas (Hydrogen v2025 retorna .nodes para conexões)
  const lines = safeCart.lines?.nodes || safeCart.lines || [];
  const hasItems = lines.length > 0;

  return (
    <div style={{height: '100%', display: 'flex', flexDirection: 'column', background: '#FEFDF8'}}>
      {!hasItems ? (
        <CartEmpty close={close} />
      ) : (
        <>
          <div style={{flex: 1, overflowY: 'auto', padding: '0 1rem'}}>
            <ul style={{listStyle: 'none', padding: 0, margin: '1rem 0'}}>
              {lines.map((line) => (
                <CartLineItem key={line.id} line={line} />
              ))}
            </ul>
          </div>
          <div style={{
            flexShrink: 0,
            borderTop: '4px solid #D4AF69',
            background: '#E9E2D2',
            padding: '1.5rem',
            boxShadow: '0 -4px 20px rgba(0,0,0,0.1)'
          }}>
            <CartSummary cart={safeCart} />
          </div>
        </>
      )}
    </div>
  );
}

function CartEmpty({close}) {
  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <div style={{fontSize: '4rem', marginBottom: '1rem'}}>🛒</div>
      <h3 style={{fontSize: '1.5rem', fontWeight: '800', color: '#0A3D2F', marginBottom: '0.5rem'}}>
        Seu carrinho está vazio
      </h3>
      <Link
        to="/collections/all"
        onClick={close}
        style={{
          background: '#0A3D2F',
          color: 'white',
          padding: '0.8rem 2rem',
          borderRadius: '50px',
          textDecoration: 'none',
          fontWeight: 'bold',
          marginTop: '1rem'
        }}
      >
        Ver Brinquedos
      </Link>
    </div>
  );
}
