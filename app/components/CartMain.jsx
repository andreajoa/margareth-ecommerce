import {CartLineItem} from '~/components/CartLineItem';
import {CartSummary} from '~/components/CartSummary';
import {Link} from 'react-router';

export function CartMain({cart, close}) {
  const safeCart = cart || {lines: {nodes: []}, totalQuantity: 0, cost: {subtotalAmount: {amount: '0', currencyCode: 'BRL'}, totalAmount: {amount: '0', currencyCode: 'BRL'}}, checkoutUrl: ''};
  const lines = safeCart.lines?.nodes || safeCart.lines || [];
  const hasItems = lines.length > 0;

  return (
    <div style={{height: '100%', display: 'flex', flexDirection: 'column', background: '#FEFDF8'}}>
      {!hasItems ? (
        <div style={{height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center'}}>
          <div style={{fontSize: '4rem', marginBottom: '1rem'}}>🛒</div>
          <h3 style={{fontSize: '1.5rem', fontWeight: '800', color: '#0A3D2F'}}>Seu carrinho está vazio</h3>
          <Link to="/collections/all" onClick={close} style={{background: '#3A8ECD', color: 'white', padding: '0.8rem 2rem', borderRadius: '50px', textDecoration: 'none', fontWeight: 'bold', marginTop: '1rem', boxShadow: '0 4px 12px rgba(58,142,205,0.3)'}}>🧸 Ver Brinquedos</Link>
        </div>
      ) : (
        <>
          <div style={{flex: 1, overflowY: 'auto', padding: '0 1rem'}}>
            <ul style={{listStyle: 'none', padding: 0, margin: '1rem 0'}}>
              {lines.map((line) => <CartLineItem key={line.id} line={line} />)}
            </ul>
          </div>
          <div style={{flexShrink: 0, borderTop: '3px solid #3A8ECD', background: '#f0f7fc', padding: '1.5rem'}}>
            <CartSummary cart={safeCart} />
          </div>
        </>
      )}
    </div>
  );
}
