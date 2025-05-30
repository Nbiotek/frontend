import { DOTS, usePagination } from '@/hooks/usePagination';
import { GoChevronDown } from 'react-icons/go';
import { useState } from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';

const limitsObj: Array<Option<number, string>> = [
  { label: '10/page', value: 10 },
  { label: '20/page', value: 20 },
  { label: '30/page', value: 30 },
  { label: '40/page', value: 40 },
  { label: '50/page', value: 50 },
  { label: '60/page', value: 60 },
  { label: '70/page', value: 70 },
  { label: '80/page', value: 80 },
  { label: '90/page', value: 90 },
  { label: '100/page', value: 100 }
];

interface IPaginationProps {
  limit: number;
  setLimit: (_limit: number) => void;
  currentPage: number;
  setPage: (_page: number) => void;
  total: number;
  totalPages: number;
  siblingCount: number;
}

function Pagination({
  total,
  siblingCount,
  setPage,
  currentPage,
  limit,
  setLimit,
  totalPages
}: IPaginationProps) {
  const paginationRange = usePagination({
    total,
    currentPage,
    siblingCount,
    limit,
    totalPages
  });

  const onNext = () => {
    setPage(currentPage + 1);
  };

  const onPrevious = () => {
    setPage(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(parseInt(event.target.value));
    setPage(1);
  };

  if (totalPages < 2) return <></>;

  return (
    <div className="flex w-full items-center justify-end space-x-4">
      <button
        disabled={currentPage === 1}
        onClick={onPrevious}
        className={`
          flex h-[20px] w-[20px] cursor-pointer items-center justify-center rounded-lg border bg-white disabled:cursor-not-allowed
          disabled:opacity-50 md:h-[30px] md:w-[30px] lg:h-[40px] lg:w-[40px]
        `}
      >
        <RiArrowLeftSLine className={`text-2xl`} />
      </button>
      {paginationRange?.map((page, index) => {
        if (page === DOTS) {
          return <span key="index">&#8230;</span>;
        }

        return (
          <button
            key={index}
            className={`
                flex h-[20px] w-[20px] cursor-pointer items-center justify-center rounded-lg md:h-[30px] md:w-[30px] lg:h-[40px] lg:w-[40px]
                ${currentPage == page ? `border bg-blue-400 text-white` : `bg-transparent hover:bg-blue-400 hover:text-white`}
              `}
            onClick={() => {
              setPage(page);
            }}
          >
            {page}
          </button>
        );
      })}
      <button
        disabled={currentPage === lastPage}
        onClick={onNext}
        className={`
          flex h-[20px] w-[20px] cursor-pointer items-center justify-center rounded-lg border bg-white disabled:cursor-not-allowed disabled:opacity-30 md:h-[30px] md:w-[30px]
          lg:h-[40px] lg:w-[40px]
        `}
      >
        <RiArrowRightSLine className={`text-2xl`} />
      </button>

      <div className="h-[20px] w-[100px] bg-white md:h-[30px] lg:h-[40px]">
        <div className="relative flex h-full w-full flex-col">
          <select
            defaultValue={limit}
            data-testid="select-input"
            className={`focus:border-studio-600 bg-neutralGrey-75 border-neutralGrey-500 h-full cursor-pointer appearance-none rounded-lg border bg-transparent px-3 text-sm font-medium text-neutral-500 placeholder:font-medium placeholder:text-neutral-500 focus:outline-none`}
            onChange={handleOnChange}
          >
            {limitsObj.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className={`cursor-pointer text-secondary ${option.value < total ? 'block' : 'hidden'}`}
              >
                {option.label}
              </option>
            ))}
          </select>

          <div className="pointer-events-none absolute  inset-y-0 right-0 top-0 flex items-center pr-3">
            <GoChevronDown />
          </div>
        </div>
      </div>
    </div>
  );
}

export default observer(Pagination);
