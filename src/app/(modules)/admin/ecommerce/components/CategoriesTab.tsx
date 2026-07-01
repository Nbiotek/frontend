'use client';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import { Plus } from 'lucide-react';
import { useFetchCategories } from '@/hooks/admin/useFetchCategories';
import CategoryCard from './CategoryCard';
import CategoriesLoader from './CategoriesLoader';
import EmptyCategories from './EmptyCategories';

const CategoriesTab = () => {
  const {
    AppConfigStore: { toggleModals }
  } = useStore();

  const { data: categories, isLoading } = useFetchCategories();

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-end">
        <Button
          className="w-fit bg-blue-400"
          onClick={() =>
            toggleModals({ name: AppModals.ADMIN_CREATE_CATEGORY, open: true, id: '' })
          }
        >
          <Plus />
          Add Category
        </Button>
      </div>

      {isLoading && <CategoriesLoader />}

      {!isLoading && categories && (
        <>
          {categories.length > 0 ? (
            <div className="flex flex-col space-y-3">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          ) : (
            <EmptyCategories />
          )}
        </>
      )}
    </div>
  );
};

export default CategoriesTab;
