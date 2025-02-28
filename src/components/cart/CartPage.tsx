// types/cart.ts
interface CartProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  status?: 'in_stock' | 'out_of_stock' | 'sold_out';
}

// components/cart/CartPage.tsx
import Image from 'next/image';
import { Minus, Plus, X } from 'lucide-react';
import Button from '@/atoms/Buttons';
import Link from 'next/link';

export const CartPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Cart Content */}
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Product List */}
        <div className="flex-1 rounded-lg bg-white">
          {/* Table Header */}
          <div className="grid grid-cols-[2fr,1fr,1fr,1fr] gap-4 border-b px-3 py-5">
            <div className="text-gray-500">PRODUCT</div>
            <div className="text-gray-500">PRICE</div>
            <div className="text-gray-500">QUANTITY</div>
            <div className="text-gray-500">SUBTOTAL</div>
          </div>

          {/* Products */}
          <div className="divide-y">
            {/* UV Spectrophotometer */}
            <div className="grid grid-cols-[2fr,1fr,1fr,1fr] items-center gap-4 py-4">
              <div className="flex gap-4">
                <div className="relative h-20 w-20">
                  <Image
                    src="/uv-spectro.jpg"
                    alt="UV Spectrophotometer"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">UV Spectrophotometer</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#1e56b0]">$14.99</span>
                <span className="text-gray-400 line-through">$20.99</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="rounded border p-1">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center">5</span>
                <button className="rounded border p-1">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span>$90.00</span>
                <button className="text-gray-400 hover:text-gray-600">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Glass Test Tube Rack */}
            <div className="grid grid-cols-[2fr,1fr,1fr,1fr] items-center gap-4 py-4">
              <div className="flex gap-4">
                <div className="relative h-20 w-20">
                  <Image
                    src="/test-tube-rack.jpg"
                    alt="Glass Test Tube Rack"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">Glass Test Tube Rack</div>
              </div>
              <div>$14.00</div>
              <div className="flex items-center gap-2">
                <button className="rounded border p-1">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center">5</span>
                <button className="rounded border p-1">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span>$24.00</span>
                <button className="text-gray-400 hover:text-gray-600">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Compound Microscope */}
            <div className="grid grid-cols-[2fr,1fr,1fr,1fr] items-center gap-4 py-4 opacity-50">
              <div className="flex gap-4">
                <div className="relative h-20 w-20">
                  <Image
                    src="/microscope.jpg"
                    alt="Compound Microscope"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">Compound Microscope</div>
              </div>
              <div>$14.00</div>
              <div>
                <span className="text-red-600 rounded bg-red-100 px-3 py-1">Out of Stock</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="bg-gray-100 rounded px-3 py-1">Sold Out</span>
                <button className="text-gray-400 hover:text-gray-600">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex gap-4">
            <button className="bg-gray-100 rounded-lg px-6 py-3">Continuing Shopping</button>
            <button className="bg-gray-100 rounded-lg px-6 py-3">Update Cart</button>
          </div>

          {/* Coupon */}
          <div className="mt-8 flex gap-4">
            <input
              type="text"
              placeholder="Enter code"
              className="flex-1 rounded-lg border px-4 py-3"
            />
            <button className="rounded-lg bg-[#3b7d3b] px-6 py-3 text-white">Apply Coupon</button>
          </div>
        </div>

        {/* Cart Total */}
        <div className="w-full lg:w-96">
          <div className="rounded-lg bg-white p-6">
            <h2 className="mb-6 text-xl font-semibold">Cart Total</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>$114.00</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total:</span>
                <span>$114.00</span>
              </div>
              <Link
                href="/patient/appointment/booking"
                className="mt-4 w-full rounded-lg bg-[#1e56b0] py-3 text-white"
              >
                Proceed to checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
