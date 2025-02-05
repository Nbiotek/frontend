import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const InputSearch = () => {
  return (
    <div className="relative w-full min-w-[200px] max-w-sm">
      <div className="relative w-[314px]">
        <input
          type="email"
          className="text-md ease focus:border-slate-400 hover:border-slate-300 w-full rounded-lg border border-neutral-500 bg-transparent py-2 pl-10 pr-3 text-neutral-900 shadow-sm transition duration-300 placeholder:text-neutral-900 focus:outline-none "
          placeholder="Search "
        />
        <div className="bg-slate-800 focus:bg-slate-700 active:bg-slate-700 hover:bg-slate-700 absolute left-1 top-1 rounded border   border-transparent p-1.5 text-center shadow-sm transition-all hover:shadow focus:shadow-none active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
          <Search size={20} />
        </div>
      </div>
    </div>
  );
};

export default InputSearch;
