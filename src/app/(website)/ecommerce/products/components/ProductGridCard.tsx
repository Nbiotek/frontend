'use client';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';

export interface ProductGridCardProps {
  id: string;
  title: string;
  price: number;
  image?: string | null;
  salePercent?: number;
  outOfStock?: boolean;
  onAddToCart?: (id: string) => void;
  onProductClick?: (id: string) => void;
}

const ProductGridCard = ({
  id,
  title,
  price,
  image,
  salePercent,
  outOfStock,
  onAddToCart,
  onProductClick
}: ProductGridCardProps) => {
  return (
    <div
      className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-md ${outOfStock ? 'opacity-90' : ''}`}
      onClick={() => onProductClick?.(id)}
    >
      {outOfStock && (
        <span className="absolute right-2 top-2 z-10 rounded bg-red-500 px-2 py-0.5 text-[11px] font-semibold text-white">
          Out of Stock
        </span>
      )}
      {salePercent && !outOfStock && (
        <span className="absolute left-2 top-2 z-10 rounded bg-red-500 px-2 py-0.5 text-[11px] font-semibold text-white">
          Sale {salePercent}%
        </span>
      )}

      <div className="bg-gray-50 relative h-[150px] w-full overflow-hidden sm:h-[170px]">
        {image ? (
          <Image
            src={image}
            fill
            alt={title}
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="text-gray-300 flex h-full items-center justify-center text-xs">
            No image
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3">
        <p className="mb-2 line-clamp-2 text-sm font-medium text-neutral-800">{title}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-sm font-semibold text-neutral-900">₦{price.toLocaleString()}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              !outOfStock && onAddToCart?.(id);
            }}
            disabled={outOfStock}
            className={`flex h-7 w-7 items-center justify-center rounded-full border transition-colors ${
              outOfStock
                ? 'border-gray-100 text-gray-300 cursor-not-allowed'
                : 'border-gray-200 text-gray-400 hover:text-blue-500 hover:border-blue-400'
            }`}
          >
            <ShoppingCart className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductGridCard;
