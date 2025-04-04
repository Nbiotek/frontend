'use client';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { PackageTest, SingleTest } from '@/types/test';
import { cartStore } from '@/store/Cart';
import { observer } from 'mobx-react-lite';
import { Toast } from '@/atoms/Toast';
import CartSummary from './CartSummary';

interface TestDetailViewProps {
  test: SingleTest | PackageTest;
  onBack: () => void;
  onAddToCart: () => void;
  onRemoveFromCart: () => void;
  hideCartSummary?: boolean;
}

const TestDetailView = observer(
  ({
    test,
    onBack,
    onAddToCart,
    onRemoveFromCart,
    hideCartSummary = false
  }: TestDetailViewProps) => {
    const isPackage = 'tests' in test;
    const isInCart = cartStore.isInCart(test.id);

    return (
      <div className="flex h-full flex-col">
        <div className="flex items-center border-b bg-white p-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="mr-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold">{test.name}</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-6 rounded-lg border bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-blue-600 text-lg font-medium">
                ₦{test.price.toLocaleString()}
              </span>

              {!isInCart ? (
                <Button variant="default" onClick={onAddToCart}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add to Selection
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  onClick={onRemoveFromCart}
                  className="bg-red-50 text-red-600 hover:text-red-700 hover:bg-red-100"
                >
                  <X className="mr-2 h-4 w-4" />
                  Remove from Selection
                </Button>
              )}
            </div>

            <h3 className="mb-2 text-lg font-medium">Description</h3>
            <p className="text-gray-700">
              {test.description || 'No description available for this test.'}
            </p>

            {isPackage && (
              <div className="mt-6">
                <h3 className="mb-3 text-lg font-medium">Tests Included</h3>
                <div className="space-y-2">
                  {(test as PackageTest).tests?.map((includedTest, index) => (
                    <IncludedTestItem key={index} test={includedTest} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {!hideCartSummary && (
          <CartSummary
            onClose={onBack}
            onRemoveItem={(id, name) => {
              if (id === test.id) {
                onBack(); // Go back to the list view if removing the current test
              } else {
                cartStore.removeItem(id);
                Toast.success(`Removed ${name} from your selection`);
              }
            }}
          />
        )}
      </div>
    );
  }
);

// Component for individual tests inside a package
const IncludedTestItem = ({ test }: { test: SingleTest }) => (
  <div className="rounded-md border p-3">
    <h4 className="font-medium">{test.name}</h4>
    {test.description && <p className="text-gray-600 mt-1 text-sm">{test.description}</p>}
  </div>
);

export default TestDetailView;
