'use client';

'use client';

import { useState, useEffect } from 'react';
import { Text } from '@/lib/utils/Text';
import IconPod from '@/atoms/Icon/IconPod';
import { ArrowUpDown, ListFilter, Receipt } from 'lucide-react';
import { useBillingHistory } from '@/hooks/patient/useBilling';
import { BillingFilterParams } from '@/requests/billing';
import FilterComponent from '../../component/FilterCP';
import SortComponent from '../../component/SortCP';
import { format } from 'date-fns';
import { useQueryClient } from '@tanstack/react-query';
import Pagination from '@/atoms/pagination';
import TransactionHistoryTable from './component/TransactionHistoryTable';
import InputSearch from '@/atoms/fields/InputSearch';

const TransactionHistoryView = () => {
  const defaultFilters: BillingFilterParams = {
    page: 1,
    limit: 10,
    sortOrder: 'DESC'
  };

  // Filter state
  const [filters, setFilters] = useState<BillingFilterParams>(defaultFilters);

  // Get the query client for manual invalidation
  const queryClient = useQueryClient();

  // Use the updated hook with filter params
  const { data, isLoading } = useBillingHistory(filters);

  // Debounce search to avoid too many requests
  const [searchInput, setSearchInput] = useState('');

  // Calculate the number of active filters
  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.fromDate) count++;
    if (filters.toDate) count++;
    if (filters.sortBy) count++;
    return count;
  };

  // Pagination handlers
  const handlePageChange = (page: number) => {
    setFilters((prev) => ({
      ...prev,
      page
    }));
  };

  const handleLimitChange = (limit: number) => {
    setFilters((prev) => ({
      ...prev,
      limit,
      page: 1 // Reset to first page when changing limit
    }));
  };

  // Search handler with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (filters.search !== searchInput) {
        setFilters((prev) => ({
          ...prev,
          search: searchInput,
          page: 1 // Reset to first page when searching
        }));
      }
    }, 500); // 500ms debounce delay

    return () => clearTimeout(timer);
  }, [searchInput, filters.search]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  // Handle filter changes (date range and sortBy)
  const handleFilterChange = (filterData: { fromDate?: Date; toDate?: Date; sortBy?: string }) => {
    // Format dates for API if they exist
    const formattedFilters: BillingFilterParams = {};

    if (filterData.sortBy) {
      formattedFilters.sortBy = filterData.sortBy;
    }

    if (filterData.fromDate) {
      formattedFilters.fromDate = format(filterData.fromDate, 'yyyy-MM-dd');
    }

    if (filterData.toDate) {
      formattedFilters.toDate = format(filterData.toDate, 'yyyy-MM-dd');
    }

    setFilters((prev) => ({
      ...prev,
      ...formattedFilters,
      page: 1 // Reset to first page when changing filters
    }));
  };

  // Handle sort order change
  const handleSortChange = (sortOrder: 'ASC' | 'DESC') => {
    setFilters((prev) => ({
      ...prev,
      sortOrder
    }));
  };

  // Handle clearing all filters
  const handleClearFilters = () => {
    setFilters({
      ...defaultFilters,
      page: filters.page, // Keep current page
      limit: filters.limit // Keep current limit
    });
    setSearchInput('');
  };

  // Effect to refetch data when filters change
  useEffect(() => {
    // Invalidate and refetch when filters change
    queryClient.invalidateQueries({ queryKey: ['transaction-history'] });
  }, [filters, queryClient]);

  // Calculate pagination values
  const total = data?.data.pagination?.total || 0;
  const currentPage = filters.page || 1;
  const totalPages = data?.data.pagination?.totalPages || 1;

  return (
    <div className="flex w-full flex-col space-y-6">
      <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center">
          <Receipt className="text-blue-500 mr-2 h-5 w-5" />
          <Text variant="title" weight="semibold">
            Transaction History
          </Text>
        </div>
        <div className="flex w-full items-center justify-end space-x-2 sm:w-[60%]">
          <InputSearch
            className="!w-[calc(100%-80px)]"
            placeholder="Search transactions..."
            value={searchInput}
            onChange={handleSearchChange}
          />
          <FilterComponent
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            activeFilters={getActiveFilterCount()}
          />

          <SortComponent onSortChange={handleSortChange} />
        </div>
      </div>
      <TransactionHistoryTable data={data?.data.payments || []} loading={isLoading} />

      {!isLoading && data?.data.payments && data.data.payments.length > 0 && (
        <Pagination
          total={total}
          siblingCount={1}
          currentPage={currentPage}
          setPage={handlePageChange}
          limit={filters.limit || 10}
          setLimit={handleLimitChange}
          totalPages={totalPages}
        />
      )}
    </div>
  );
};

export default TransactionHistoryView;
