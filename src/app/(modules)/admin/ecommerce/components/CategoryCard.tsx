'use client';
import { useStore } from '@/store';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import { Layers, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CategoryCardProps {
  category: TProductCategoryItem;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const {
    AppConfigStore: { toggleModals }
  } = useStore();

  return (
    <div className="border-gray-100 flex items-start gap-4 rounded-lg border bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-50">
        {category.image ? (
          <img
            src={category.image}
            alt={category.name}
            className="h-full w-full rounded-lg object-cover"
          />
        ) : (
          <Layers className="h-6 w-6 text-blue-400" />
        )}
      </div>

      <div className="flex flex-1 items-start justify-between gap-2">
        <div>
          <p className="text-gray-800 font-semibold">{category.name}</p>
          <p className="text-gray-500 line-clamp-2 text-sm">{category.description}</p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="text-blue-500 hover:text-blue-700 h-8 shrink-0 px-2 text-xs"
          onClick={() =>
            toggleModals({
              name: AppModals.ADMIN_CREATE_CATEGORY,
              open: true,
              id: category.id,
              category
            })
          }
        >
          <Pencil className="mr-1 h-3 w-3" />
          Edit
        </Button>
      </div>
    </div>
  );
};

export default CategoryCard;
