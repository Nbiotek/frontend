import React from 'react';
import { ShoppingBag, Clock, Sparkles, Shield } from 'lucide-react';

const EcommerceComingSoon = () => {
  return (
    <div className="bg-gray-50 min-h-screen bg-blue-200/10 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header with subtle border bottom */}
        <div className="border-gray-200 mb-16 border-b pb-16 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
            <ShoppingBag className="text-blue-500 h-8 w-8" />
          </div>

          <h1 className="text-gray-900 mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Our E-commerce Platform
          </h1>

          <div className="relative mx-auto mb-10 w-fit">
            <p className="text-blue-600 text-xl font-medium">Coming Soon</p>
            <div className="bg-blue-500 absolute -bottom-2 left-0 h-1 w-full"></div>
          </div>

          <p className="text-gray-600 mx-auto max-w-2xl text-lg">
            We &apos;re building a modern shopping experience for all your healthcare needs. Simple,
            reliable, and designed with you in mind.
          </p>
        </div>

        {/* Feature cards with subtle shadows */}
        <div className="mb-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col rounded-lg bg-white p-8 shadow-sm transition-all hover:shadow-md">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-md bg-blue-50">
              <Sparkles className="text-blue-500 h-6 w-6" />
            </div>
            <h3 className="text-gray-900 mb-3 text-lg font-semibold">Premium Products</h3>
            <p className="text-gray-600">
              Carefully selected high-quality healthcare products and services, all in one place.
            </p>
          </div>

          <div className="flex flex-col rounded-lg bg-white p-8 shadow-sm transition-all hover:shadow-md">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-md bg-blue-50">
              <Clock className="text-blue-500 h-6 w-6" />
            </div>
            <h3 className="text-gray-900 mb-3 text-lg font-semibold">Fast Delivery</h3>
            <p className="text-gray-600">
              Reliable and quick delivery options to ensure you receive your items when you need
              them.
            </p>
          </div>

          <div className="flex flex-col rounded-lg bg-white p-8 shadow-sm transition-all hover:shadow-md sm:col-span-2 lg:col-span-1">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-md bg-blue-50">
              <Shield className="text-blue-500 h-6 w-6" />
            </div>
            <h3 className="text-gray-900 mb-3 text-lg font-semibold">Secure Shopping</h3>
            <p className="text-gray-600">
              Enhanced security features and privacy protection for worry-free online shopping.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcommerceComingSoon;
