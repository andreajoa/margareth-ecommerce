import {Link, useFetcher} from 'react-router';
import {Money, CartForm} from '@shopify/hydrogen';

export function CartLineItem({line}) {
  if (!line?.merchandise) return null;
  const {id, merchandise, quantity, cost} = line;
  const {product, title, image, selectedOptions} = merchandise;
  if (!product) return null;

  return (
    <li style={{display: 'flex', gap: '0.75rem', padding: '1rem 0', borderBottom: '2px solid rgba(58,142,205,0.1)'}}>
      <div style={{flexShrink: 0, width: '85px', height: '85px', background: '#fff', borderRadius: '12px', overflow: 'hidden', border: '2px solid #3A8ECD'}}>
        {image ? (
          <img src={image.url} alt={title || product.title} width={85} height={85} style={{width: '100%', height: '100%', objectFit: 'contain', padding: '4px'}} />
        ) : (
          <div style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem'}}>🧸</div>
        )}
      </div>
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: '0.2rem'}}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <Link to={`/products/${product.handle}`} style={{fontSize: '0.85rem', fontWeight: '700', color: '#0A3D2F', textDecoration: 'none', flex: 1, marginRight: '0.5rem'}}>
            {product.title}
          </Link>
          <div style={{fontSize: '0.9rem', fontWeight: '800', color: '#3A8ECD', whiteSpace: 'nowrap'}}>
            {cost?.totalAmount && <Money data={cost.totalAmount} />}
          </div>
        </div>
        {selectedOptions?.length > 0 && selectedOptions[0]?.value !== 'Default Title' && (
          <div style={{fontSize: '0.7rem', display: 'flex', flexWrap: 'wrap', gap: '4px'}}>
            {selectedOptions.map((opt) => (
              <span key={opt.name} style={{background: '#f0f7fc', padding: '2px 8px', borderRadius: '12px', color: '#3A8ECD', fontWeight: '600'}}>
                {opt.name}: {opt.value}
              </span>
            ))}
          </div>
        )}
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '0.4rem'}}>
          <CartQuantity lineId={id} quantity={quantity} />
          <CartRemove lineId={id} />
        </div>
      </div>
    </li>
  );
}

function CartQuantity({lineId, quantity}) {
  const minus = useFetcher();
  const plus = useFetcher();

  const updateQty = (fetcher, newQty) => {
    const formData = new FormData();
    formData.append('cartFormInput', JSON.stringify({
      action: CartForm.ACTIONS.LinesUpdate,
      inputs: {lines: [{id: lineId, quantity: newQty}]},
    }));
    fetcher.submit(formData, {method: 'POST', action: '/cart'});
  };

  return (
    <div style={{display: 'flex', alignItems: 'center', border: '2px solid #3A8ECD', borderRadius: '8px', background: 'white', overflow: 'hidden'}}>
      <button type="button" disabled={quantity <= 1} onClick={() => updateQty(minus, quantity - 1)} style={{padding: '0 10px', height: '30px', border: 'none', background: '#f0f7fc', cursor: 'pointer', fontWeight: '700', color: '#3A8ECD'}}>−</button>
      <span style={{padding: '0 8px', fontWeight: '700', color: '#0A3D2F'}}>{quantity}</span>
      <button type="button" onClick={() => updateQty(plus, quantity + 1)} style={{padding: '0 10px', height: '30px', border: 'none', background: '#f0f7fc', cursor: 'pointer', fontWeight: '700', color: '#3A8ECD'}}>+</button>
    </div>
  );
}

function CartRemove({lineId}) {
  const fetcher = useFetcher();

  const handleRemove = () => {
    const formData = new FormData();
    formData.append('cartFormInput', JSON.stringify({
      action: CartForm.ACTIONS.LinesRemove,
      inputs: {lineIds: [lineId]},
    }));
    fetcher.submit(formData, {method: 'POST', action: '/cart'});
  };

  return (
    <button type="button" onClick={handleRemove} style={{fontSize: '0.75rem', color: '#FB8A38', border: 'none', background: 'transparent', cursor: 'pointer', fontWeight: '700', textDecoration: 'underline'}}>
      Remover
    </button>
  );
}
