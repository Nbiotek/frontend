import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface BioHubItemProps {
  item: {
    id: number;
    title: string;
    image: string;
    description: string;
    category: string;
    url: string;
    isNew?: boolean;
  };
}

export const BioHubCard = ({ item }: BioHubItemProps) => {
  return (
    <div className="flex cursor-pointer flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition-all duration-300 hover:shadow-md sm:flex-row sm:items-center sm:space-x-4">
      <div className="relative h-[180px] w-full overflow-hidden sm:h-auto sm:w-[120px] md:w-[160px] lg:w-[200px]">
        <Image
          src={item.image}
          alt={item.title}
          width={200}
          height={200}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {item.isNew && (
          <div className="absolute left-0 top-0 bg-green-500 px-2 py-1 text-xs font-semibold text-white">
            NEW
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col space-y-2 p-4 sm:p-3 md:space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-blue-800 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium">
            {item.category}
          </span>
        </div>
        <h3 className="text-base font-semibold text-black sm:text-lg">{item.title}</h3>
        <p className="text-gray-700 text-sm sm:text-base">{item.description}</p>
        <Link
          href={item.url}
          className="ml-auto flex items-center text-sm italic text-blue-400 hover:underline"
        >
          <span>Read more</span>
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};
