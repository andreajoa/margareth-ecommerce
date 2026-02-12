import React from 'react';
import {Link} from 'react-router';
import {Image, Money, CartForm} from '@shopify/hydrogen';
import {useAside} from '~/components/Aside';

export function CartLineItem({line}) {
  const {close} = useAside();
  
  if (!line || !line.merchandise) return null;
  
  const {id, merchandise, quantity} = line;
  const {product, title, image, selectedOptions} = merchandise;

  // Segurança: Se o produto foi removido da loja, não renderiza linha quebrada
  if (!product) return null;

  return (
    <li key={id} style={{display: 'flex', gap: '1rem', padding: '1rem 0', borderBottom: '1px solid rgba(0,0,0,0.05)'}}>
      {/* IMAGEM */}
      <div style={{flexShrink: 0, width: '80px', height: '80px', background: '#fff', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e5e7eb'}}>
        {image && (
          <Image
            data={image}
            width={80}
            height={80}
            style={{width: '100%', height: '100%', objectFit: 'contain'}}
            alt={title}
          />
        )}
      </div>

      {/* INFO */}
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
          <Link 
            to={`/products/${product.handle}`}
            onClick={close}
            style={{fontSize: '0.9rem', fontWeight: 'bold', color: '#0A3D2F', textDecoration: 'none', lineHeight: '1.3', flex: 1, marginRight: '0.5rem'}}
          >
            {product.title}
          </Link>
          <div style={{fontSize: '0.9rem', fontWeight: 'bold', color: '#0A3D2F'}}>
            <Money data={line.cost.totalAmount} />
          </div>
        </div>

        {/* OPÇÕES */}
        <div style={{fontSize: '0.75rem', color: '#6b7280', display: 'flex', flexWrap: 'wrap', gap: '4px'}}>
          {(selectedOptions || []).map((option) => (
            <span key={option.name} style={{background: '#f3f4f6', padding: '2px 6px', borderRadius: '4px'}}>
              {option.name}: {option.value}
            </span>
          ))}
        </div>

        {/* QUANTIDADE */}
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '0.5rem'}}>
          <div style={{display: 'flex', alignItems: 'center', border: '1px solid #d1d5db', borderRadius: '4px', background: 'white'}}>
            <CartForm route="/cart" action={CartForm.ACTIONS.LinesUpdate} inputs={{lines: [{id, quantity: quantity - 1}]}}>
              <button disabled={quantity <= 1} style={{padding: '0 10px', height: '30px', border: 'none', background: 'transparent', cursor: quantity <= 1 ? 'default' : 'pointer', color: '#0A3D2F', fontSize: '1.2rem', lineHeight: 1}}>-</button>
            </CartForm>
            <span style={{fontSize: '0.9rem', padding: '0 4px', fontWeight: '600', minWidth: '20px', textAlign: 'center'}}>{quantity}</span>
            <CartForm route="/cart" action={CartForm.ACTIONS.LinesUpdate} inputs={{lines: [{id, quantity: quantity + 1}]}}>
              <button style={{padding: '0 10px', height: '30px', border: 'none', background: 'transparent', cursor: 'pointer', color: '#0A3D2F', fontSize: '1rem'}}>+</button>
            </CartForm>
          </div>

          <CartForm route="/cart" action={CartForm.ACTIONS.LinesRemove} inputs={{lineIds: [id]}}>
            <button style={{fontSize: '0.75rem', color: '#ef4444', border: 'none', background: 'transparent', cursor: 'pointer', textDecoration: 'underline'}}>Remover</button>
          </CartForm>
        </div>
      </div>
    </li>
  );
}
