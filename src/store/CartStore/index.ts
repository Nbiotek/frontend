import { makeAutoObservable, runInAction } from 'mobx';
import { SingleTest, PackageTest } from '@/types/test';
import { RootStore } from '..';
import { Toast } from '@/atoms/Toast';

export type CartItemType = 'single' | 'package';

export interface CartItem {
  id: string;
  type: CartItemType;
  item: SingleTest | PackageTest;
  quantity: number;
}

class CartStore {
  rootStore: RootStore;
  items: CartItem[] = [];
  isLoading: boolean = false;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);

    this.rootStore = rootStore;
    // Load cart from local storage on initialization
    this.loadCart();
  }

  // Add item to cart
  addItem = (item: SingleTest | PackageTest, type: CartItemType) => {
    const existingItem = this.items.find(
      (cartItem) => cartItem.id === item.id && cartItem.type === type
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({
        id: item.id,
        type,
        item,
        quantity: 1
      });
    }
    // Show success message
    Toast.success(`Added ${item.name} to your selection`);
    this.saveCart();
  };

  // remove item from cart
  removeItem = (id: string) => {
    this.items = this.items.filter((item) => item.id !== id);
    Toast.info('Item removed from cart');
    this.saveCart();
  };

  // Update quantity
  updateQuantity = (id: string, quantity: number) => {
    const item = this.items.find((item) => item.id === id);

    if (item) {
      item.quantity = Math.max(0, quantity);
      if (item.quantity === 0) {
        this.removeItem(id);
      }

      this.saveCart();
    }
  };

  // Clear cart
  clearCart = () => {
    this.items = [];
    Toast.info('Cart cleared');
    this.saveCart();
  };

  get total(): number {
    return this.items.reduce((sum, item) => {
      const price =
        'discountedPrice' in item.item
          ? (item.item as PackageTest).discountedPrice || item.item.price
          : item.item.price;

      return sum + price * item.quantity;
    }, 0);
  }

  // Get total number of items
  get itemCount(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  // check if an item is in cart
  isInCart = (id: string): boolean => {
    return this.items.some((item) => item.id === id);
  };

  // Get quantity of specific item
  getItemQuantity = (id: string): number => {
    const item = this.items.find((item) => item.id === id);
    return item ? item.quantity : 0;
  };

  // private methos for persistence

  private saveCart = () => {
    try {
      localStorage.setItem('cart', JSON.stringify(this.items));
    } catch (error) {
      console.error('failed to save cart', error);
    }
  };

  private loadCart = () => {
    if (typeof window === 'undefined') return;
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        runInAction(() => {
          this.items = parsedCart;
        });
      }
    } catch (error) {
      console.error('Failed to load cart:', error);
    }
  };
}

//  create and export a single instance

export default CartStore;
