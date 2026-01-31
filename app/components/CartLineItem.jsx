import { CartForm, Image } from '@shopify/hydrogen';
import { useVariantUrl } from '~/lib/variants';
import { Link } from 'react-router-dom';
import { ProductPrice } from './ProductPrice';
import { useAside } from './Aside';
import { getProductHandle } from '~/lib/utils';

export function CartLineItem({ layout, line, onCartUpdate }) {
  const { id, merchandise } = line;
  const { product, title, image, selectedOptions } = merchandise;
  const lineItemUrl = useVariantUrl(getProductHandle(product.handle), selectedOptions);
  const { close } = useAside();

  return (
    <li
      key={id}
      style={{
        display: 'flex',
        gap: '0.75rem',
        padding: '0.75rem',
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        border: '1px solid #e5e7eb',
        listStyle: 'none',
      }}
    >
      {image && (
        <Link
          to={lineItemUrl}
          onClick={() => {
            if (layout === 'aside') {
              close();
            }
          }}
          style={{
            flexShrink: 0,
            display: 'block',
            width: '100px',
            height: '100px',
          }}
        >
          <Image
            alt={title}
            aspectRatio="1/1"
            data={image}
            height={100}
            loading="lazy"
            width={100}
            style={{
              borderRadius: '0.375rem',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Link>
      )}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}
      >
        <Link
          prefetch="intent"
          to={lineItemUrl}
          onClick={() => {
            if (layout === 'aside') {
              close();
            }
          }}
          style={{
            textDecoration: 'none',
            color: '#3A8ECD',
            display: 'block',
          }}
        >
          <p
            style={{
              fontWeight: '600',
              fontSize: '0.875rem',
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            <strong>{product.title}</strong>
          </p>
        </Link>
        <div
          style={{
            fontSize: '0.9375rem',
            fontWeight: '700',
            color: '#3A8ECD',
          }}
        >
          {line?.cost?.totalAmount ? (
            <ProductPrice price={line.cost.totalAmount} />
          ) : null}
        </div>
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.375rem',
          }}
        >
          {selectedOptions.map((option) => (
            <li
              key={option.name}
              style={{
                fontSize: '0.75rem',
                color: '#6b7280',
                backgroundColor: '#f3f4f6',
                padding: '0.125rem 0.5rem',
                borderRadius: '0.25rem',
              }}
            >
              <small>
                {option.name}: {option.value}
              </small>
            </li>
          ))}
        </ul>
        <CartLineQuantity line={line} onCartUpdate={onCartUpdate} />
      </div>
    </li>
  );
}

function CartLineQuantity({ line, onCartUpdate }) {
  // Safety check to prevent errors if line is undefined
  if (!line || typeof line?.quantity === 'undefined') return null;

  const { id: lineId, quantity, isOptimistic } = line;
  const prevQuantity = Math.max(0, quantity - 1);
  const nextQuantity = quantity + 1;

  // Function to handle cart action completion
  const handleCartAction = () => {
    // Trigger cart refresh after a short delay to allow server action to complete
    setTimeout(() => {
      onCartUpdate?.();
    }, 300);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginTop: '0.25rem',
        flexWrap: 'wrap',
      }}
    >
      <small
        style={{
          fontSize: '0.875rem',
          fontWeight: '500',
          color: '#6b7280',
          marginRight: '0.25rem',
        }}
      >
        Qtd: {quantity}
      </small>

      {/* DECREASE BUTTON - brinqueTEAndo colors */}
      <CartForm
        key={`decrease-${lineId}`}
        route="/cart"
        action={CartForm.ACTIONS.LinesUpdate}
        inputs={{
          lines: [{ id: lineId, quantity: prevQuantity }],
        }}
      >
        {({ state }) => {
          const isSubmitting = state === 'submitting';
          // Disable button if quantity is 1 OR if already submitting
          const isDisabled = quantity <= 1 || isSubmitting;

          return (
            <button
              aria-label="Diminuir quantidade"
              disabled={isDisabled}
              type="submit"
              onClick={handleCartAction}
              style={{
                all: 'unset',
                boxSizing: 'border-box',
                width: '2rem',
                height: '2rem',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #d1d5db',
                borderRadius: '0.25rem',
                backgroundColor: isDisabled ? '#f3f4f6' : 'white',
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#3A8ECD',
                opacity: isDisabled ? 0.5 : 1,
                userSelect: 'none',
                WebkitTapHighlightColor: 'transparent',
                transition: 'all 0.2s ease',
              }}
            >
              <span style={{ pointerEvents: 'none' }}>−</span>
            </button>
          );
        }}
      </CartForm>

      {/* INCREASE BUTTON - brinqueTEAndo colors */}
      <CartForm
        key={`increase-${lineId}`}
        route="/cart"
        action={CartForm.ACTIONS.LinesUpdate}
        inputs={{
          lines: [{ id: lineId, quantity: nextQuantity }],
        }}
      >
        {({ state }) => {
          const isSubmitting = state === 'submitting';
          const isDisabled = isSubmitting;

          return (
            <button
              aria-label="Aumentar quantidade"
              type="submit"
              disabled={isDisabled}
              onClick={handleCartAction}
              style={{
                all: 'unset',
                boxSizing: 'border-box',
                width: '2rem',
                height: '2rem',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #d1d5db',
                borderRadius: '0.25rem',
                backgroundColor: isDisabled ? '#f3f4f6' : 'white',
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#3A8ECD',
                opacity: isDisabled ? 0.5 : 1,
                userSelect: 'none',
                WebkitTapHighlightColor: 'transparent',
                transition: 'all 0.2s ease',
              }}
            >
              <span style={{ pointerEvents: 'none' }}>+</span>
            </button>
          );
        }}
      </CartForm>

      {/* REMOVE BUTTON - brinqueTEAndo colors */}
      <CartForm
        key={`remove-${lineId}`}
        route="/cart"
        action={CartForm.ACTIONS.LinesRemove}
        inputs={{ lineIds: [lineId] }}
      >
        {({ state }) => {
          const isSubmitting = state === 'submitting';
          const isDisabled = isSubmitting;

          return (
            <button
              disabled={isDisabled}
              type="submit"
              onClick={handleCartAction}
              style={{
                all: 'unset',
                boxSizing: 'border-box',
                padding: '0.375rem 0.875rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.25rem',
                backgroundColor: isDisabled ? '#f3f4f6' : 'white',
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                fontSize: '0.8125rem',
                fontWeight: '600',
                color: '#dc2626',
                opacity: isDisabled ? 0.5 : 1,
                whiteSpace: 'nowrap',
                display: 'inline-block',
                textAlign: 'center',
                userSelect: 'none',
                WebkitTapHighlightColor: 'transparent',
                transition: 'all 0.2s ease',
              }}
            >
              Remover
            </button>
          );
        }}
      </CartForm>
    </div>
  );
}