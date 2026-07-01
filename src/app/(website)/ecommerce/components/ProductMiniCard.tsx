'use client';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';

interface ProductMiniCardProps {
  id: string;
  title: string;
  image?: string | null;
  onAddToCart?: (id: string) => void;
  onProductClick?: (id: string) => void;
}

const ProductMiniCard = ({
  id,
  title,
  image,
  onAddToCart,
  onProductClick
}: ProductMiniCardProps) => {
  return (
    <div
      className="border-gray-100 flex cursor-pointer items-center space-x-3 rounded-lg border bg-white p-2 transition-shadow hover:shadow-sm"
      onClick={() => onProductClick?.(id)}
    >
      <div className="bg-gray-50 relative h-11 w-11 flex-shrink-0 overflow-hidden rounded-md">
        {image ? (
          <Image src={image} fill alt={title} className="object-contain p-1" />
        ) : (
          <div className="flex h-full items-center justify-center" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="line-clamp-1 text-xs font-medium text-neutral-800">{title}</p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onAddToCart?.(id);
        }}
        className="text-blue-500 flex flex-shrink-0 items-center space-x-0.5 rounded border border-blue-300 px-2 py-1 text-[11px] font-medium transition-colors hover:bg-blue-50"
      >
        <ShoppingCart className="h-3 w-3" />
      </button>
    </div>
  );
};

export default ProductMiniCard;
