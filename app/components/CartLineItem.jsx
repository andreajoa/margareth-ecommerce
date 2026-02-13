import {Link} from 'react-router';
import {Image, Money, CartForm} from '@shopify/hydrogen';

export function CartLineItem({line}) {
  if (!line || !line.merchandise) return null;

  const {id, merchandise, quantity, cost} = line;
  const {product, title, image, selectedOptions} = merchandise;

  if (!product) return null;

  return (
    <li className="flex gap-3 py-4 border-b-2 border-[#E9E2D2]">
      {/* Product Image */}
      <div className="flex-shrink-0 w-20 h-20 bg-white rounded-xl overflow-hidden border-2 border-[#3A8ECD] shadow-md">
        {image ? (
          <Image
            data={image}
            width={80}
            height={80}
            className="w-full h-full object-contain"
            alt={title || product.title}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl bg-[#f0f7fc]">
            🧸
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col gap-1">
        <div className="flex justify-between items-start">
          <Link
            to={`/products/${product.handle}`}
            className="text-sm font-bold text-[#0A3D2F] no-underline leading-tight flex-1 mr-2"
          >
            {product.title}
          </Link>
          <div className="text-sm font-extrabold text-[#3A8ECD] whitespace-nowrap">
            {cost?.totalAmount && <Money data={cost.totalAmount} />}
          </div>
        </div>

        {/* Variant Options */}
        {selectedOptions?.length > 0 && (
          <div className="text-xs text-gray-500 flex flex-wrap gap-1">
            {selectedOptions.map((option) => (
              <span
                key={option.name}
                className="bg-[#E9E2D2] px-2 py-0.5 rounded-full text-[#0A3D2F] font-semibold text-xs"
              >
                {option.name}: {option.value}
              </span>
            ))}
          </div>
        )}

        {/* Quantity Controls */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex items-center border-2 border-[#3A8ECD] rounded-lg bg-white overflow-hidden">
            <CartForm
              route="/cart"
              action={CartForm.ACTIONS.LinesUpdate}
              inputs={{lines: [{id, quantity: Math.max(0, quantity - 1)}]}}
            >
              <button
                type="submit"
                disabled={quantity <= 1}
                className="px-3 h-8 border-none bg-gray-50 cursor-pointer font-bold text-[#3A8ECD] text-lg"
              >
                −
              </button>
            </CartForm>
            <span className="text-sm px-2 font-bold min-w-6 text-center text-[#0A3D2F]">
              {quantity}
            </span>
            <CartForm
              route="/cart"
              action={CartForm.ACTIONS.LinesUpdate}
              inputs={{lines: [{id, quantity: quantity + 1}]}}
            >
              <button
                type="submit"
                className="px-3 h-8 border-none bg-[#f0f7fc] cursor-pointer font-bold text-[#3A8ECD] text-lg"
              >
                +
              </button>
            </CartForm>
          </div>

          <CartForm
            route="/cart"
            action={CartForm.ACTIONS.LinesRemove}
            inputs={{lineIds: [id]}}
          >
            <button
              type="submit"
              className="text-xs text-[#FB8A38] border-none bg-transparent cursor-pointer font-bold underline"
            >
              Remover
            </button>
          </CartForm>
        </div>
      </div>
    </li>
  );
}
