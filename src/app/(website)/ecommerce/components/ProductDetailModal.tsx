'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ShoppingCart, Package, Check, Trash2 } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { putUpdateCartItem } from '@/requests/ecommerce';
import { ECOMMERCE } from '@/constants/api';
import * as ToastLib from '@/atoms/Toast';
import { useFetchProduct } from '@/hooks/admin/useFetchProduct';
import { useFetchCart } from '@/hooks/admin/useFetchCart';
import { useAddToCart } from '@/hooks/admin/useAddToCart';

interface ProductDetailModalProps {
  productId: string | null;
  onClose: () => void;
}

const ProductDetailModal = ({ productId, onClose }: ProductDetailModalProps) => {
  const { data: product, isLoading } = useFetchProduct(productId);
  const { data: cart } = useFetchCart();
  const { addToCart, isPending } = useAddToCart();
  const queryClient = useQueryClient();

  const removeMutation = useMutation({
    mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) =>
      putUpdateCartItem(productId, quantity),
    onSuccess: () => {
      ToastLib.Toast.success('Removed from cart');
      queryClient.invalidateQueries({ predicate: (q) => q.queryKey[0] === ECOMMERCE.CART });
    },
    onError: () => ToastLib.Toast.error('Failed to remove from cart')
  });
  const [imageIndex, setImageIndex] = useState(0);

  const images = product?.images ?? [];
  const hasImages = images.length > 0;

  const prevImage = () => setImageIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const nextImage = () => setImageIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  const outOfStock = product ? product.stock === 0 : false;
  const cartItem = product
    ? (cart?.items ?? []).find((item) => item.productId === product.id)
    : undefined;
  const inCart = !!cartItem;

  return (
    <Dialog open={!!productId} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] w-full max-w-4xl overflow-y-auto p-0">
        {isLoading || !product ? (
          <div className="flex flex-col gap-0 sm:flex-row">
            <Skeleton className="h-64 w-full rounded-none rounded-l-lg sm:h-auto sm:w-72" />
            <div className="flex flex-1 flex-col gap-3 p-6">
              <Skeleton className="h-5 w-24 rounded" />
              <Skeleton className="h-7 w-3/4 rounded" />
              <Skeleton className="h-6 w-1/3 rounded" />
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-5/6 rounded" />
              <Skeleton className="h-4 w-4/6 rounded" />
              <Skeleton className="mt-4 h-10 w-full rounded-lg" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row">
            {/* Image panel */}
            <div className="bg-gray-50 relative flex h-72 w-full flex-shrink-0 items-center justify-center overflow-hidden sm:h-auto sm:w-96">
              {hasImages ? (
                <>
                  <Image
                    src={images[imageIndex]}
                    fill
                    alt={product.name}
                    className="object-contain p-6"
                  />
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1 shadow hover:bg-white"
                      >
                        <ChevronLeft className="text-gray-600 h-4 w-4" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1 shadow hover:bg-white"
                      >
                        <ChevronRight className="text-gray-600 h-4 w-4" />
                      </button>
                      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1">
                        {images.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setImageIndex(i)}
                            className={`h-1.5 rounded-full transition-all ${
                              i === imageIndex ? 'w-4 bg-blue-400' : 'bg-gray-300 w-1.5'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="text-gray-300 flex flex-col items-center gap-2">
                  <Package className="h-16 w-16" />
                  <span className="text-xs">No image</span>
                </div>
              )}

              {/* Thumbnail strip */}
              {images.length > 1 && (
                <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 gap-1 sm:flex">
                  {images.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => setImageIndex(i)}
                      className={`relative h-10 w-10 overflow-hidden rounded border-2 transition-all ${
                        i === imageIndex ? 'border-blue-400' : 'border-transparent'
                      }`}
                    >
                      <Image src={src} fill alt="" className="object-contain p-0.5" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details panel */}
            <div className="flex flex-1 flex-col p-6">
              {product.category && (
                <span className="text-blue-500 mb-2 w-fit rounded-full bg-blue-50 px-3 py-0.5 text-xs font-medium">
                  {product.category.name}
                </span>
              )}

              <h2 className="mb-1 text-xl font-bold text-neutral-900">{product.name}</h2>

              <div className="mb-3 flex items-center gap-3">
                <span className="text-blue-600 text-2xl font-bold">
                  ₦{product.price.toLocaleString()}
                </span>
                {outOfStock ? (
                  <span className="text-red-600 rounded bg-red-100 px-2 py-0.5 text-xs font-medium">
                    Out of Stock
                  </span>
                ) : (
                  <span className="text-green-600 rounded bg-green-100 px-2 py-0.5 text-xs font-medium">
                    {product.stock} in stock
                  </span>
                )}
              </div>

              <p className="text-gray-600 mb-6 text-sm leading-relaxed">{product.description}</p>

              <div className="mt-auto flex flex-col gap-2">
                {inCart && (
                  <p className="text-green-600 text-center text-xs">
                    <Check className="mr-1 inline h-3 w-3" />
                    {cartItem!.quantity} already in your cart
                  </p>
                )}
                <Button
                  className={`w-full ${inCart ? 'hover:bg-green-600 bg-green-500' : 'hover:bg-blue-500 bg-blue-400'}`}
                  disabled={outOfStock || isPending}
                  onClick={() => addToCart(product.id)}
                >
                  {inCart ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Add More to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      {outOfStock ? 'Out of Stock' : 'Add to Cart'}
                    </>
                  )}
                </Button>
                {inCart && (
                  <Button
                    variant="outline"
                    className="hover:bg-red-50 hover:text-red-600 w-full border-red-200 text-red-500"
                    disabled={removeMutation.isPending}
                    onClick={() =>
                      removeMutation.mutate({
                        productId: product.id,
                        quantity: cartItem!.quantity - 1
                      })
                    }
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    {cartItem!.quantity > 1
                      ? `Remove One (${cartItem!.quantity} in cart)`
                      : 'Remove from Cart'}
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
