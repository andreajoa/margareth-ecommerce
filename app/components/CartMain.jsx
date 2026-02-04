import {useAside} from '~/components/Aside';
import {CartLineItem} from '~/components/CartLineItem';
import {CartSummary} from '~/components/CartSummary';
import {Link} from 'react-router';

export function CartMain({cart, layout}) {
  // Debug: mostra estrutura COMPLETA do cart
  if (typeof window !== 'undefined' && cart) {
    console.log('🛒 CartMain recebeu:', cart);
    console.log('🛒 Cart CHAVES:', Object.keys(cart));
    console.log('🛒 Cart.lines:', cart.lines);
    console.log('🛒 Cart.lines é array?', Array.isArray(cart.lines));
    console.log('🛒 JSON:', JSON.stringify(cart, null, 2));
  }

  // ✅ FIX: A estrutura correta do cart no Hydrogen é:
  // - lines: Array<CartLine> (DIRETO, não .nodes!)
  // - totalQuantity: number
  // - cost: { subtotalAmount, totalAmount, ... }
  // - checkoutUrl: string

  // SEGURANÇA: Se cart for nulo/undefined, usa um objeto vazio seguro
  const safeCart = cart || {
    id: 'empty-cart',
    lines: [],
    totalQuantity: 0,
    cost: {
      subtotalAmount: { amount: '0', currencyCode: 'BRL' },
      totalAmount: { amount: '0', currencyCode: 'BRL' }
    },
    checkoutUrl: '',
    note: '',
    discountCodes: [],
  };

  // ✅ FIX CORRIGIDO: Extrai linhas diretamente de lines (array)
  // O Hydrogen retorna lines como Array<CartLine>, não como {nodes: [...]}
  const lines = Array.isArray(safeCart.lines) ? safeCart.lines : [];

  // Fallback: tenta merchandiseLines se lines estiver vazio
  const finalLines = lines.length > 0 ? lines : (safeCart.merchandiseLines || []);

  const hasItems = finalLines.length > 0;

  console.log('🛒 Linhas extraídas:', finalLines, 'Has items:', hasItems);

  return (
    <div style={{height: '100%', display: 'flex', flexDirection: 'column', background: '#FEFDF8'}}>
      {!hasItems ? (
        <CartEmpty />
      ) : (
        <>
          {/* LISTA DE PRODUTOS */}
          <div style={{flex: 1, overflowY: 'auto', padding: '0 1rem'}}>
            <ul style={{listStyle: 'none', padding: 0, margin: '1rem 0'}}>
              {finalLines.map((line) => (
                <CartLineItem key={line.id} line={line} />
              ))}
            </ul>
          </div>

          {/* CHECKOUT E RESUMO */}
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

function CartEmpty() {
  const {close} = useAside();
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
      <p style={{color: '#6b7280', marginBottom: '2rem'}}>
        Nenhum produto adicionado ainda.
      </p>
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
          transition: 'all 0.3s'
        }}
      >
        Ver Brinquedos
      </Link>
    </div>
  );
}
