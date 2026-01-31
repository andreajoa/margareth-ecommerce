import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import {useState} from 'react';

export function ProductCard({product, showBrand = true, priority = false}) {
  const [imageError, setImageError] = useState(false);
  
  if (!product) return null;
  
  const {
    id,
    title,
    handle,
    vendor,
    featuredImage,
    priceRange
  } = product;

  return (
    <Link 
      to={`/products/${handle}`} 
      className="group block h-full"
      aria-label={`Ver ${title}`}
    >
      <div className="flex flex-col h-full bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-[#3A8ECD]">
        {/* Product Image */}
        <div className="relative aspect-square bg-gradient-to-br from-blue-50 to-orange-50 overflow-hidden">
          {featuredImage && !imageError ? (
            <Image
              data={featuredImage}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              aspectRatio="1/1"
              alt={featuredImage.altText || `${title} - brinqueTEAndo`}
              loading={priority ? 'eager' : 'lazy'}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          
          {/* Quick View Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#FB8A38] text-white px-6 py-2 rounded-full font-semibold text-sm">
              Ver Detalhes
            </span>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 flex flex-col flex-grow">
          {showBrand && vendor && (
            <p className="text-[#FB8A38] text-xs tracking-widest mb-2 uppercase font-semibold line-clamp-1">
              {vendor}
            </p>
          )}
          
          <h3 className="text-[#3A8ECD] font-semibold mb-2 hover:text-[#2a7cb8] transition-colors text-sm line-clamp-2 flex-grow">
            {title}
          </h3>
          
          <div className="mt-auto">
            {priceRange?.minVariantPrice && (
              <Money 
                data={priceRange.minVariantPrice} 
                className="text-[#3A8ECD] font-bold text-lg"
              />
            )}
          </div>

          {/* Shop Now Button */}
          <button className="mt-3 w-full relative overflow-hidden bg-[#3A8ECD] text-white py-2 rounded-lg hover:shadow-lg transition-all duration-300 font-semibold text-sm group/btn">
            <span className="absolute inset-0 bg-gradient-to-r from-[#FB8A38] to-[#3A8ECD] transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500"></span>
            <span className="relative z-10">Comprar Agora</span>
          </button>
        </div>
      </div>
    </Link>
  );
}