import { InputHTMLAttributes, forwardRef } from 'react';
import { FiSearch } from 'react-icons/fi';

interface ISearchInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const SearchInput = forwardRef<HTMLInputElement, ISearchInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={`group flex h-[40px] items-center justify-between space-x-2 rounded-lg border-[1px] border-borderLine bg-white px-2 font-roboto focus-within:border-blue-400 hover:border-blue-400 ${className}`}
      >
        <FiSearch className="text-xl text-neutral-300 group-hover:text-black" />
        <input
          ref={ref}
          className="w-full border-none bg-transparent text-sm outline-none placeholder:text-sm focus:outline-none"
          {...props}
        />
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';
export default SearchInput;
