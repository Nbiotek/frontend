import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postAddToCart } from '@/requests/ecommerce';
import { ECOMMERCE } from '@/constants/api';
import * as ToastLib from '@/atoms/Toast';
import { useStore } from '@/store';
import { useRouter } from 'next/navigation';

export function useAddToCart() {
  const queryClient = useQueryClient();
  const {
    AuthStore: { accessToken }
  } = useStore();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) =>
      postAddToCart({ productId, quantity }),
    onSuccess: () => {
      ToastLib.Toast.success('Added to cart');
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === ECOMMERCE.CART
      });
    },
    onError: () => {
      ToastLib.Toast.error('Failed to add to cart');
    }
  });

  const addToCart = (productId: string, quantity = 1) => {
    if (!accessToken) {
      router.push('/auth/login');
      return;
    }
    mutation.mutate({ productId, quantity });
  };

  return { addToCart, isPending: mutation.isPending };
}
