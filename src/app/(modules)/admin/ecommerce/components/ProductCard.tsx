'use client';
import { useStore } from '@/store';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import { Package, Tag, Layers, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: TProductItem;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const {
    AppConfigStore: { toggleModals }
  } = useStore();

  const isOutOfStock = product.stock === 0;

  return (
    <div className="border-gray-100 flex flex-col rounded-lg border bg-white p-4 shadow-sm transition hover:shadow-md sm:flex-row sm:items-start sm:gap-4">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-blue-50">
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full rounded-lg object-cover"
          />
        ) : (
          <Package className="h-8 w-8 text-blue-400" />
        )}
      </div>

      <div className="mt-3 flex flex-1 flex-col space-y-2 sm:mt-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-gray-800 font-semibold">{product.name}</p>
            {product.category && (
              <p className="text-gray-400 flex items-center gap-1 text-xs">
                <Tag className="h-3 w-3" />
                {product.category.name}
              </p>
            )}
          </div>
          <span
            className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
              product.status === 'ACTIVE'
                ? 'text-green-700 bg-green-100'
                : 'bg-gray-100 text-gray-500'
            }`}
          >
            {product.status}
          </span>
        </div>

        <p className="text-gray-500 line-clamp-2 text-sm">{product.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-blue-600 text-base font-bold">
              ₦{product.price.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
            </span>
            <span
              className={`flex items-center gap-1 text-xs ${isOutOfStock ? 'text-red-500' : 'text-gray-500'}`}
            >
              <Layers className="h-3 w-3" />
              {isOutOfStock ? 'Out of stock' : `${product.stock} in stock`}
            </span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="text-blue-500 hover:text-blue-700 h-8 px-2 text-xs"
            onClick={() =>
              toggleModals({
                name: AppModals.ADMIN_CREATE_PRODUCT,
                open: true,
                id: product.id,
                product
              })
            }
          >
            <Pencil className="mr-1 h-3 w-3" />
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
