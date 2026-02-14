import {Link} from 'react-router';
import {Image, Money, CartForm} from '@shopify/hydrogen';

export function CartLineItem({line}) {
  if (!line || !line.merchandise) return null;

  const {id, merchandise, quantity, cost} = line;
  const {product, title, image, selectedOptions} = merchandise;

  if (!product) return null;

  return (
    <li style={{
      display: 'flex',
      gap: '0.75rem',
      padding: '1rem 0',
      borderBottom: '2px solid rgba(58,142,205,0.1)',
    }}>
      <div style={{
        flexShrink: 0,
        width: '85px',
        height: '85px',
        background: '#fff',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '2px solid #3A8ECD',
        boxShadow: '0 2px 8px rgba(58,142,205,0.15)',
      }}>
        {image ? (
          <Image
            data={image}
            width={85}
            height={85}
            style={{width: '100%', height: '100%', objectFit: 'contain', padding: '4px'}}
            alt={title || product.title}
          />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2rem', background: '#f0f7fc',
          }}>🧸</div>
        )}
      </div>

      <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: '0.2rem'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
          <Link
            to={`/products/${product.handle}`}
            style={{
              fontSize: '0.85rem', fontWeight: '700', color: '#0A3D2F',
              textDecoration: 'none', lineHeight: '1.3', flex: 1, marginRight: '0.5rem',
            }}
          >
            {product.title}
          </Link>
          <div style={{fontSize: '0.9rem', fontWeight: '800', color: '#3A8ECD', whiteSpace: 'nowrap'}}>
            {cost?.totalAmount && <Money data={cost.totalAmount} />}
          </div>
        </div>

        {selectedOptions?.length > 0 && selectedOptions[0]?.value !== 'Default Title' && (
          <div style={{fontSize: '0.7rem', display: 'flex', flexWrap: 'wrap', gap: '4px'}}>
            {selectedOptions.map((option) => (
              <span key={option.name} style={{
                background: '#f0f7fc', padding: '2px 8px', borderRadius: '12px',
                color: '#3A8ECD', fontWeight: '600', border: '1px solid rgba(58,142,205,0.2)',
              }}>
                {option.name}: {option.value}
              </span>
            ))}
          </div>
        )}

        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginTop: 'auto', paddingTop: '0.4rem',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center',
            border: '2px solid #3A8ECD', borderRadius: '8px',
            background: 'white', overflow: 'hidden',
          }}>
            <CartForm route="/cart" action={CartForm.ACTIONS.LinesUpdate}
              inputs={{lines: [{id, quantity: Math.max(0, quantity - 1)}]}}>
              <button type="submit" disabled={quantity <= 1} style={{
                padding: '0 10px', height: '30px', border: 'none',
                background: quantity <= 1 ? '#f3f4f6' : '#f0f7fc',
                cursor: quantity <= 1 ? 'default' : 'pointer',
                fontWeight: '700', color: '#3A8ECD', fontSize: '1rem',
              }}>−</button>
            </CartForm>
            <span style={{
              fontSize: '0.9rem', padding: '0 8px', fontWeight: '700',
              minWidth: '24px', textAlign: 'center', color: '#0A3D2F',
            }}>{quantity}</span>
            <CartForm route="/cart" action={CartForm.ACTIONS.LinesUpdate}
              inputs={{lines: [{id, quantity: quantity + 1}]}}>
              <button type="submit" style={{
                padding: '0 10px', height: '30px', border: 'none',
                background: '#f0f7fc', cursor: 'pointer',
                fontWeight: '700', color: '#3A8ECD', fontSize: '1rem',
              }}>+</button>
            </CartForm>
          </div>

          <CartForm route="/cart" action={CartForm.ACTIONS.LinesRemove}
            inputs={{lineIds: [id]}}>
            <button type="submit" style={{
              fontSize: '0.75rem', color: '#FB8A38', border: 'none',
              background: 'transparent', cursor: 'pointer',
              fontWeight: '700', textDecoration: 'underline',
            }}>Remover</button>
          </CartForm>
        </div>
      </div>
    </li>
  );
}
