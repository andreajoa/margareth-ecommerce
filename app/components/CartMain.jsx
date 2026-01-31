import { useOptimisticCart, CartForm } from '@shopify/hydrogen';
import { Link, useFetcher } from 'react-router-dom';
import { useAside } from '~/components/Aside';
import { CartLineItem } from '~/components/CartLineItem';
import { useEffect, useState } from 'react';

export function CartMain({ layout, cart: originalCart }) {
  const [recommendations, setRecommendations] = useState([]);
  const cart = useOptimisticCart(originalCart);
  const fetcher = useFetcher();
  const linesCount = Boolean(cart?.lines?.nodes?.length || 0);
  const withDiscount =
    cart &&
    Boolean(cart?.discountCodes?.filter((code) => code.applicable)?.length);
  const className = `cart-main ${withDiscount ? 'with-discount' : ''}`;
  const cartHasItems = cart?.totalQuantity ? cart.totalQuantity > 0 : false;
  const subtotal = parseFloat(cart?.cost?.subtotalAmount?.amount || 0);
  const freeShippingThreshold = 150;
  const progressPercentage = Math.min(
    (subtotal / freeShippingThreshold) * 100,
    100,
  );
  const amountToFreeShipping = Math.max(freeShippingThreshold - subtotal, 0);

  const recommendationsFetcher = useFetcher();

  // Fetch cart data when cart drawer opens or after actions
  useEffect(() => {
    if (layout === 'aside') {
      // Initial fetch when drawer opens
      if (!fetcher.data && fetcher.state === 'idle') {
        fetcher.load('/cart');
      }
    }
  }, [layout]);

  useEffect(() => {
    if (cart?.lines?.nodes?.length > 0 && layout === 'aside') {
      const firstProductId = cart.lines.nodes[0].merchandise.product.id;
      recommendationsFetcher.load(
        `/api/product-recommendations?productId=${firstProductId}`,
      );
    }
  }, [cart?.lines?.nodes?.[0]?.merchandise?.product?.id, layout]);

  useEffect(() => {
    if (recommendationsFetcher.data?.recommendations) {
      const cartProductIds =
        cart?.lines?.nodes?.map((line) => line.merchandise.product.id) || [];
      const filtered = recommendationsFetcher.data.recommendations
        .filter((product) => !cartProductIds.includes(product.id))
        .slice(0, 2);
      setRecommendations(filtered);
    }
  }, [recommendationsFetcher.data, cart?.lines?.nodes]);

  // Use fresh cart data from fetcher if available, otherwise use original cart
  const displayCart = fetcher.data?.cart || cart;

  return (
    <div
      className={className}
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <CartEmpty hidden={linesCount} layout={layout} />

      {cartHasItems && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            maxHeight: '100vh',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          {/* ÁREA DE SCROLL */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              overflowX: 'hidden',
              WebkitOverflowScrolling: 'touch',
              paddingBottom: '0.5rem',
            }}
          >
            {/* Free Shipping Bar - brinqueTEAndo colors */}
            <div
              style={{
                background: 'linear-gradient(to right, #3A8ECD, #82CBB7)',
                padding: '0.875rem 1rem',
                margin: '1rem 1rem 0.75rem 1rem',
                borderRadius: '0.5rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.5rem',
                }}
              >
                <svg
                  style={{
                    width: '1.125rem',
                    height: '1.125rem',
                    color: '#FB8A38',
                    flexShrink: 0,
                  }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
                <span
                  style={{
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '0.8125rem',
                  }}
                >
                  {progressPercentage >= 100
                    ? '🎉 FRETE GRÁTIS BAIXADA SANTISTA!'
                    : `R$ ${amountToFreeShipping.toFixed(2)} para FRETE GRÁTIS`}
                </span>
              </div>
              <div
                style={{
                  width: '100%',
                  height: '0.5rem',
                  backgroundColor: 'rgba(254, 253, 248, 0.2)',
                  borderRadius: '9999px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    background: 'linear-gradient(to right, #FB8A38, #FBA25C)',
                    width: `${progressPercentage}%`,
                    transition: 'width 0.7s ease-out',
                    borderRadius: '9999px',
                  }}
                />
              </div>
            </div>

            {/* DISCOUNT CODE */}
            <div style={{ padding: '0 1rem' }}>
              <DiscountCodeInput cart={displayCart} />
            </div>

            {/* LISTA DE PRODUCTOS */}
            <div style={{ padding: '0 1rem' }}>
              <div aria-labelledby="cart-lines">
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.875rem',
                  }}
                >
                  {(displayCart?.lines?.nodes ?? []).map((line) => (
                    <CartLineItem
                      key={line.id}
                      line={line}
                      layout={layout}
                      onCartUpdate={() => fetcher.load('/cart')}
                    />
                  ))}
                </ul>
              </div>

              {/* RECOMENDAÇÕES */}
              {layout === 'aside' && recommendations.length > 0 && (
                <div
                  style={{
                    marginTop: '1.25rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid #e5e7eb',
                  }}
                >
                  <h3
                    style={{
                      fontSize: '0.9375rem',
                      fontWeight: '600',
                      color: '#3A8ECD',
                      marginBottom: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <svg
                      style={{
                        width: '1.125rem',
                        height: '1.125rem',
                        color: '#FB8A38',
                      }}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Frequentemente Comprados Juntos
                  </h3>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem',
                    }}
                  >
                    {recommendations.map((product) => (
                      <RecommendationCard
                        key={product.id}
                        product={product}
                        onCartUpdate={() => fetcher.load('/cart')}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* PROMO CODE BANNER */}
              <PromoCodeBanner />

              {/* TRUST BADGES */}
              <TrustBadges />
            </div>
          </div>

          {/* CHECKOUT SECTION - FIXED NO MORE WHITE SPACE */}
          <div
            style={{
              flexShrink: 0,
              borderTop: '1px solid #e5e7eb',
              padding: '0.75rem 1rem',
              backgroundColor: 'white',
              boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.08)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem',
              }}
            >
              <span
                style={{
                  fontSize: '0.875rem',
                  color: '#6b7280',
                  fontWeight: '500',
                }}
              >
                Subtotal
              </span>
              <span
                style={{
                  fontSize: '1.125rem',
                  fontWeight: '700',
                  color: '#3A8ECD',
                }}
              >
                R$ {subtotal.toFixed(2)}
              </span>
            </div>
            <a
              href={displayCart.checkoutUrl}
              style={{
                display: 'block',
                width: '100%',
                backgroundColor: '#3A8ECD',
                color: 'white',
                padding: '0.75rem',
                borderRadius: '0.375rem',
                textAlign: 'center',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '0.9375rem',
                transition: 'all 0.2s',
                border: 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FB8A38';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#3A8ECD';
              }}
            >
              Finalizar Compra →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

// DISCOUNT CODE INPUT - brinqueTEAndo themed
export function DiscountCodeInput({ cart }) {
  const [discountCode, setDiscountCode] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const appliedDiscounts =
    cart?.discountCodes?.filter((code) => code.applicable) || [];

  return (
    <div
      style={{
        backgroundColor: '#F5F3ED',
        borderRadius: '0.5rem',
        padding: '0.75rem',
        marginBottom: '0.75rem',
      }}
    >
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: '0.25rem',
        }}
      >
        <span
          style={{
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#3A8ECD',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <svg
            style={{ width: '1rem', height: '1rem', color: '#FB8A38' }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
            />
          </svg>
          Aplicar Código de Desconto
        </span>
        <svg
          style={{
            width: '1.25rem',
            height: '1.25rem',
            color: '#3A8ECD',
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)',
            transition: 'transform 0.2s',
          }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isExpanded && (
        <div style={{ marginTop: '0.75rem' }}>
          <CartForm
            route="/cart"
            action={CartForm.ACTIONS.DiscountCodesUpdate}
            inputs={{
              // Optimistically append new code to existing codes to avoid removing them
              discountCodes: [
                ...cart.discountCodes?.map((c) => c.code) || [],
                discountCode,
              ],
            }}
          >
            {({ state }) => {
              const isApplying = state === 'submitting';
              return (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    name="discountCode"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    placeholder="Digite o código"
                    disabled={isApplying}
                    style={{
                      flex: 1,
                      padding: '0.5rem 0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem',
                      backgroundColor: 'white',
                    }}
                  />
                  <button
                    type="submit"
                    disabled={!discountCode.trim() || isApplying}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#3A8ECD',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      cursor:
                        discountCode.trim() && !isApplying
                          ? 'pointer'
                          : 'not-allowed',
                      opacity: discountCode.trim() && !isApplying ? 1 : 0.5,
                      transition: 'background-color 0.2s',
                    }}
                  >
                    {isApplying ? '...' : 'Aplicar'}
                  </button>
                </div>
              );
            }}
          </CartForm>

          {appliedDiscounts.length > 0 && (
            <div
              style={{
                marginTop: '0.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              {appliedDiscounts.map((discount) => (
                <CartForm
                  key={discount.code}
                  route="/cart"
                  action={CartForm.ACTIONS.DiscountCodesUpdate}
                  inputs={{
                    discountCodes: appliedDiscounts
                      .filter((d) => d.code !== discount.code)
                      .map((d) => d.code),
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.5rem',
                      backgroundColor: '#FB8A38',
                      borderRadius: '0.25rem',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.8125rem',
                        fontWeight: '600',
                        color: 'white',
                      }}
                    >
                      ✓ {discount.code}
                    </span>
                    <button
                      type="submit"
                      style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: 'white',
                        cursor: 'pointer',
                        padding: '0.125rem',
                        fontSize: '1rem',
                        lineHeight: 1,
                      }}
                    >
                      ×
                    </button>
                  </div>
                </CartForm>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// RECOMMENDATION CARD - brinqueTEAndo themed
function RecommendationCard({ product, onCartUpdate }) {
  const price = product.priceRange.minVariantPrice;
  const compareAtPrice = product.compareAtPriceRange?.minVariantPrice;
  const hasDiscount =
    compareAtPrice &&
    parseFloat(compareAtPrice.amount) > parseFloat(price.amount);
  const image = product.images.nodes[0];
  const variantId = product.variants.nodes[0]?.id;

  if (!variantId) return null;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.75rem',
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        border: '1px solid #e5e7eb',
        transition: 'border-color 0.2s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#FB8A38')}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#e5e7eb')}
    >
      {image && (
        <div style={{ flexShrink: 0 }}>
          <img
            src={image.url}
            alt={image.altText || product.title}
            style={{
              width: '3.5rem',
              height: '3.5rem',
              objectFit: 'cover',
              borderRadius: '0.25rem',
            }}
            loading="lazy"
          />
        </div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <h4
          style={{
            fontSize: '0.8125rem',
            fontWeight: '500',
            color: '#111827',
            margin: '0',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {product.title}
        </h4>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginTop: '0.25rem',
          }}
        >
          {hasDiscount && (
            <span
              style={{
                fontSize: '0.6875rem',
                color: '#9ca3af',
                textDecoration: 'line-through',
              }}
            >
              R$ {compareAtPrice.amount}
            </span>
          )}
          <span
            style={{
              fontSize: '0.8125rem',
              fontWeight: '600',
              color: hasDiscount ? '#dc2626' : '#3A8ECD',
            }}
          >
            R$ {price.amount}
          </span>
        </div>
      </div>

      <CartForm
        route="/cart"
        action={CartForm.ACTIONS.LinesAdd}
        inputs={{
          lines: [{ merchandiseId: variantId, quantity: 1 }],
        }}
      >
        {({ state }) => {
          const isAdding = state === 'submitting';
          return (
            <button
              type="submit"
              disabled={isAdding}
              onClick={() => {
                // Wait for form submission, then refresh cart
                setTimeout(() => onCartUpdate?.(), 500);
              }}
              style={{
                flexShrink: 0,
                width: '2.25rem',
                height: '2.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#3A8ECD',
                color: 'white',
                borderRadius: '9999px',
                border: 'none',
                cursor: isAdding ? 'not-allowed' : 'pointer',
                opacity: isAdding ? 0.5 : 1,
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) =>
                !isAdding && (e.currentTarget.style.backgroundColor = '#FB8A38')
              }
              onMouseLeave={(e) =>
                !isAdding && (e.currentTarget.style.backgroundColor = '#3A8ECD')
              }
            >
              {isAdding ? (
                <svg
                  style={{
                    animation: 'spin 1s linear infinite',
                    width: '0.875rem',
                    height: '0.875rem',
                  }}
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    style={{ opacity: 0.25 }}
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    style={{ opacity: 0.75 }}
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <svg
                  style={{ width: '1.125rem', height: '1.125rem' }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              )}
            </button>
          );
        }}
      </CartForm>
    </div>
  );
}

export function PromoCodeBanner() {
  return (
    <div
      style={{
        backgroundColor: '#FEFDF8',
        border: '2px solid #FB8A38',
        borderRadius: '0.5rem',
        padding: '0.625rem',
        margin: '0.875rem 0',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div
          style={{
            backgroundColor: '#3A8ECD',
            color: 'white',
            padding: '0.3125rem 0.625rem',
            borderRadius: '0.25rem',
            fontWeight: 'bold',
            fontSize: '0.6875rem',
            flexShrink: 0,
          }}
        >
          TEA25
        </div>
        <div style={{ minWidth: 0 }}>
          <p
            style={{
              color: '#3A8ECD',
              fontWeight: '600',
              fontSize: '0.8125rem',
              margin: '0 0 0.125rem 0',
            }}
          >
            25% OFF - Brinquedos TEA/TDAH!
          </p>
          <p style={{ fontSize: '0.6875rem', color: '#9d8b7c', margin: 0 }}>
            Use o código no checkout
          </p>
        </div>
      </div>
    </div>
  );
}

export function TrustBadges() {
  return (
    <div
      style={{
        margin: '0.875rem 0 1rem 0',
        padding: '0.875rem',
        backgroundColor: '#F5F3ED',
        borderRadius: '0.5rem',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0.625rem',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>🔒</div>
          <p
            style={{
              fontSize: '0.6875rem',
              fontWeight: 'bold',
              color: '#3A8ECD',
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            Checkout Seguro
          </p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>↩️</div>
          <p
            style={{
              fontSize: '0.6875rem',
              fontWeight: 'bold',
              color: '#3A8ECD',
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            Trocas Fáceis
          </p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>✅</div>
          <p
            style={{
              fontSize: '0.6875rem',
              fontWeight: 'bold',
              color: '#3A8ECD',
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            Certificado INMETRO
          </p>
        </div>
      </div>
    </div>
  );
}

export function CartEmpty({ hidden = false }) {
  const { close } = useAside();
  return (
    <div hidden={hidden} style={{ textAlign: 'center', padding: '3rem 1rem' }}>
      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛒</div>
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: '300',
          color: '#3A8ECD',
          marginBottom: '1rem',
        }}
      >
        Seu Carrinho está Vazio
      </h2>
      <p style={{ color: '#9d8b7c', marginBottom: '1.5rem' }}>
        Descubra nossos brinquedos educativos e encontre o perfeito para seu filho
      </p>
      <Link
        to="/collections/brinquedos-terapeuticos"
        onClick={close}
        prefetch="viewport"
        style={{
          display: 'inline-block',
          backgroundColor: '#3A8ECD',
          color: 'white',
          padding: '0.75rem 2rem',
          borderRadius: '0.25rem',
          textDecoration: 'none',
          transition: 'background-color 0.3s',
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = '#FB8A38')
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = '#3A8ECD')
        }
      >
        Comprar Agora →
      </Link>
    </div>
  );
}