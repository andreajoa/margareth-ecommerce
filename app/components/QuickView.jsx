import {useState, useEffect} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import {AddToCartButton} from '~/components/AddToCartButton';
import {Link} from 'react-router';

/**
 * QuickView modal for collection pages.
 *
 * FIX: Was accessing variants.edges[0].node (old GraphQL format).
 *      Hydrogen 2025.x returns variants.nodes[0].
 *      Also fixed priceV2 → price.
 */
export function QuickView({product, isOpen, onClose}) {
  // ✅ FIX: Support both .nodes[] and .edges[].node formats
  const getFirstVariant = () =>
    product?.variants?.nodes?.[0] ||
    product?.variants?.edges?.[0]?.node ||
    null;

  const [selectedVariant, setSelectedVariant] = useState(getFirstVariant);

  // Update variant when product changes
  useEffect(() => {
    setSelectedVariant(getFirstVariant());
  }, [product]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  // ESC key to close
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const variant = selectedVariant || getFirstVariant();
  const availableForSale = variant?.availableForSale ?? true;

  // ✅ FIX: Support both .price and .priceV2 (old API versions)
  const priceData =
    variant?.price ||
    variant?.priceV2 ||
    product?.priceRange?.minVariantPrice;

  // ✅ FIX: If no variant ID, we can't add to cart
  const canAddToCart = !!variant?.id && availableForSale;

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-2 sm:p-4"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-view-title"
    >
      <div
        className="relative bg-white rounded-xl sm:rounded-2xl w-full max-w-sm sm:max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{animation: 'qvFadeIn 0.2s ease-out'}}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 w-12 h-12 sm:w-10 sm:h-10 flex items-center justify-center bg-white rounded-full shadow-lg text-2xl sm:text-xl font-bold hover:scale-110 transition-all"
          aria-label="Fechar visualização rápida"
          type="button"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-8">
          {/* Image */}
          <div className="aspect-square bg-gray-50 rounded-lg p-4 sm:p-8 flex items-center justify-center">
            {product.featuredImage ? (
              <Image
                data={product.featuredImage}
                className="object-contain w-full h-full"
                sizes="(max-width: 640px) 90vw, 40vw"
              />
            ) : (
              <div className="text-6xl sm:text-8xl">🧸</div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <div>
              <p className="text-[#FB8A38] text-xs sm:text-sm font-bold uppercase mb-1">
                {product.vendor || 'brinqueTEAndo'}
              </p>
              <h2
                id="quick-view-title"
                className="text-xl sm:text-3xl font-bold text-[#0A3D2F] mb-2"
              >
                {product.title}
              </h2>
              {priceData && (
                <div className="text-2xl sm:text-3xl font-black text-[#3A8ECD]">
                  <Money data={priceData} />
                </div>
              )}
            </div>

            {product.description && (
              <p className="text-gray-600 text-sm line-clamp-3 sm:line-clamp-4">
                {product.description}
              </p>
            )}

            <div className="flex flex-col gap-2 mt-auto pt-3 border-t">
              {canAddToCart ? (
                <AddToCartButton
                  lines={[{merchandiseId: variant.id, quantity: 1}]}
                  className="w-full bg-[#3A8ECD] text-white py-3 px-4 rounded-full font-bold text-sm sm:text-base hover:bg-[#FB8A38] transition-colors"
                >
                  🛒 Adicionar
                </AddToCartButton>
              ) : (
                <button
                  disabled
                  className="w-full bg-gray-300 text-gray-500 py-3 px-4 rounded-full font-bold text-sm sm:text-base cursor-not-allowed"
                >
                  Esgotado
                </button>
              )}

              <Link
                to={`/products/${product.handle}`}
                onClick={onClose}
                className="w-full border-2 border-[#3A8ECD] text-[#3A8ECD] py-3 px-4 rounded-full font-bold text-center text-sm sm:text-base hover:bg-[#3A8ECD] hover:text-white transition-all"
              >
                📄 Ver Página
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes qvFadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
        `,
        }}
      />
    </div>
  );
}
