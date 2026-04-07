import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import {useVariantUrl} from '~/lib/variants';
import {getProductHandle} from '~/lib/utils';

/**
 * @param {{
 *   product:
 *     | CollectionItemFragment
 *     | ProductItemFragment
 *     | RecommendedProductFragment;
 *   loading?: 'eager' | 'lazy';
 * }}
 */
export function ProductItem({product, loading}) {
  const variantUrl = useVariantUrl(getProductHandle(product.handle));
  const image = product.featuredImage;
  
  return (
    <Link
      className="product-item group flex flex-col h-full bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-[#3A8ECD]"
      key={product.id}
      prefetch="intent"
      to={variantUrl}
      aria-label={`Ver ${product.title}`}
    >
      {/* Product Image Container */}
      <div className="relative aspect-square bg-gradient-to-br from-blue-50 to-orange-50 overflow-hidden">
        {image && (
          <Image
            alt={image.altText || product.title}
            aspectRatio="1/1"
            data={image}
            loading={loading}
            sizes="(min-width: 45em) 400px, 100vw"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        
        {/* Overlay no hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow">
        <h4 className="text-[#3A8ECD] font-semibold text-sm line-clamp-2 group-hover:text-[#2a7cb8] transition-colors mb-2 flex-grow">
          {product.title}
        </h4>
        
        <div className="mt-auto">
          <small className="text-[#3A8ECD] font-bold text-base">
            <Money data={product.priceRange.minVariantPrice} />
          </small>
        </div>

        {/* View Button */}
        <button className="mt-3 w-full bg-[#FB8A38] text-white py-2 rounded-lg font-semibold text-sm hover:bg-[#3A8ECD] transition-colors duration-300">
          Comprar
        </button>
      </div>
    </Link>
  );
}

/** @typedef {import('storefrontapi.generated').ProductItemFragment} ProductItemFragment */
/** @typedef {import('storefrontapi.generated').CollectionItemFragment} CollectionItemFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductFragment} RecommendedProductFragment */