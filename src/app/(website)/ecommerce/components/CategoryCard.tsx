import Image from 'next/image';
import { Layers } from 'lucide-react';

interface CategoryCardProps {
  name: string;
  image?: string | null;
}

const CategoryCard = ({ name, image }: CategoryCardProps) => {
  return (
    <div className="group flex cursor-pointer flex-col items-center space-y-2">
      <div className="border-gray-100 bg-gray-50 relative h-[90px] w-full overflow-hidden rounded-lg border transition-all group-hover:border-blue-200 group-hover:shadow-md sm:h-[110px]">
        {image ? (
          <Image
            src={image}
            fill
            alt={name}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Layers className="text-gray-300 h-8 w-8" />
          </div>
        )}
      </div>
      <p className="text-center text-xs font-medium text-neutral-700 sm:text-sm">{name}</p>
    </div>
  );
};

export default CategoryCard;
