import {Money} from '@shopify/hydrogen';

/**
 * @param {{
 *   price?: MoneyV2;
 *   compareAtPrice?: MoneyV2 | null;
 * }}
 */
export function ProductPrice({price, compareAtPrice}) {
  return (
    <div className="product-price">
      {compareAtPrice ? (
        <div className="product-price-on-sale flex items-center gap-3">
          {price ? (
            <span className="text-2xl font-bold text-[#3A8ECD]">
              <Money data={price} />
            </span>
          ) : null}
          <s className="text-lg text-gray-400">
            <Money data={compareAtPrice} />
          </s>
          {/* Badge de desconto */}
          <span className="inline-block bg-[#FB8A38] text-white px-3 py-1 rounded-full text-sm font-semibold">
            Desconto!
          </span>
        </div>
      ) : price ? (
        <span className="text-2xl font-bold text-[#3A8ECD]">
          <Money data={price} />
        </span>
      ) : (
        <span>&nbsp;</span>
      )}
    </div>
  );
}

/** @typedef {import('@shopify/hydrogen/storefront-api-types').MoneyV2} MoneyV2 */