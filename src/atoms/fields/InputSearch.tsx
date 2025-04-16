import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import { InputHTMLAttributes, forwardRef, useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';

interface ISearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (term: string) => void;
}

const InputSearch = forwardRef<HTMLInputElement, ISearchInputProps>(
  ({ className, onSearch, ...props }, ref) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Pass search term to parent component
    useEffect(() => {
      if (onSearch) {
        onSearch(searchTerm);
      }
    }, [searchTerm]);

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
      if (props.onChange) {
        props.onChange(e);
      }
    };

    // Clear search
    const handleClear = () => {
      setSearchTerm('');
      if (onSearch) {
        onSearch('');
      }
    };

    return (
      <div
        className={`group flex h-[40px] items-center justify-between space-x-2 rounded-lg border-[1px] border-borderLine bg-white px-2 font-roboto focus-within:border-blue-400 hover:border-blue-400 ${className}`}
      >
        <FiSearch className="text-xl text-neutral-300 group-hover:text-black" />
        <input
          ref={ref}
          className="w-full border-none bg-transparent text-sm outline-none placeholder:text-sm focus:outline-none"
          value={searchTerm}
          onChange={handleInputChange}
          {...props}
        />
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="text-gray-400 hover:bg-gray-100 hover:text-gray-600 flex h-5 w-5 items-center justify-center rounded-full"
          >
            <X size={16} />
          </button>
        )}
      </div>
    );
  }
);

InputSearch.displayName = 'InputSearch';

export default InputSearch;
