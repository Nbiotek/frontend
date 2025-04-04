'use client';
import { Button } from '@/components/ui/button';
import { Info, Plus, X } from 'lucide-react';
import { PackageTest, SingleTest } from '@/types/test';
import { observer } from 'mobx-react-lite';

interface TestCardProps {
  test: SingleTest | PackageTest;
  isPackage?: boolean;
  onView: () => void;
  onAdd: () => void;
  onRemove: () => void;
  isInCart: boolean;
}

const TestCard = observer(
  ({ test, isPackage = false, onView, onAdd, onRemove, isInCart }: TestCardProps) => {
    return (
      <div className="rounded-lg border bg-white p-4 shadow-sm transition hover:shadow-md">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-medium">{test.name}</h3>
            <p className="text-gray-600 mt-1 line-clamp-2 text-sm">
              {test.description || 'No description available'}
            </p>

            {isPackage && (
              <div className="mt-2">
                <span className="text-gray-500 text-xs">
                  {(test as PackageTest).tests?.length || 0} tests included
                </span>
              </div>
            )}

            <div className="mt-3 flex items-center justify-between">
              <span className="text-blue-600 font-medium">₦{test.price.toLocaleString()}</span>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={onView}>
                  <Info className="mr-1 h-4 w-4" />
                  Details
                </Button>

                {!isInCart ? (
                  <Button variant="default" size="sm" onClick={onAdd}>
                    <Plus className="mr-1 h-4 w-4" />
                    Add
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={onRemove}
                    className="bg-red-50 text-red-600 hover:text-red-700 hover:bg-red-100"
                  >
                    <X className="mr-1 h-4 w-4" />
                    Remove
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default TestCard;
