'use client';

import { useState, useEffect } from 'react';
import SearchInput from '@/atoms/fields/SearchInput';
import ReferralTable from './components/ReferralsTable';
import { useDoctorReferral } from '@/hooks/doctor/useReferrals';
import FilterComponent from '../../patient/component/FilterCP';
import SortComponent from '../../patient/component/SortCP';
import { FilterParams } from '@/requests/doctor';
import { format } from 'date-fns';
import { useQueryClient } from '@tanstack/react-query';
import Pagination from '@/atoms/pagination';

const referralFilterOptions = {
  showStatus: true,
  statusOptions: [
    { value: 'PENDING', label: 'Pending' },
    { value: 'ACCEPTED', label: 'Accepted' },
    { value: 'DECLINED', label: 'Declined' },
    { value: 'COMPLETED', label: 'Completed' }
  ],
  sortByOptions: [
    { value: 'createdAt', label: 'Date Created' },
    { value: 'patientName', label: 'Patient Name' },
    { value: 'referredTo', label: 'Referred To' },
    { value: 'status', label: 'Status' }
  ]
};

const ReferralsView = () => {
  const defaultFilters: FilterParams = {
    page: 1,
    limit: 10,
    sortOrder: 'DESC'
  };

  const [filters, setFilters] = useState<FilterParams>(defaultFilters);

  const queryClient = useQueryClient();

  const { data: referPatientsList, isLoading } = useDoctorReferral(filters);

  const [searchInput, setSearchInput] = useState('');

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.fromDate) count++;
    if (filters.toDate) count++;
    if (filters.sortBy) count++;
    if (filters.status) count++;
    return count;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (filters.search !== searchInput) {
        setFilters((prev) => ({
          ...prev,
          search: searchInput,
          page: 1
        }));
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput, filters.search]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleFilterChange = (filterData: {
    fromDate?: Date;
    toDate?: Date;
    sortBy?: string;
    status?: string;
  }) => {
    const formattedFilters: FilterParams = {};

    if (filterData.sortBy) {
      formattedFilters.sortBy = filterData.sortBy;
    }

    if (filterData.fromDate) {
      formattedFilters.fromDate = format(filterData.fromDate, 'yyyy-MM-dd');
    }

    if (filterData.toDate) {
      formattedFilters.toDate = format(filterData.toDate, 'yyyy-MM-dd');
    }

    if (filterData.status) {
      formattedFilters.status = filterData.status;
    }

    setFilters((prev) => ({
      ...prev,
      ...formattedFilters,
      page: 1
    }));
  };

  const handleSortChange = (sortOrder: 'ASC' | 'DESC') => {
    setFilters((prev) => ({
      ...prev,
      sortOrder
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      ...defaultFilters,
      page: filters.page,
      limit: filters.limit
    });
    setSearchInput('');
  };

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
      page: 1
    }));
  };

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['doctor-referrals'] });
  }, [filters, queryClient]);

  const referPatients = referPatientsList?.data.patients || [];
  const total = referPatientsList?.data.pagination?.total || 0;
  const currentPage = filters.page || 1;
  const totalPages = referPatientsList?.data.pagination?.totalPages || 1;

  return (
    <div className="flex-col space-y-[24px]">
      <div className="flex flex-col space-x-2 sm:flex-row sm:items-center sm:justify-between">
        <FilterComponent
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          activeFilters={getActiveFilterCount()}
          options={referralFilterOptions}
        />

        <SearchInput
          className="!w-[calc(100%-80px)]"
          placeholder="Search referrals..."
          value={searchInput}
          onChange={handleSearchChange}
        />

        <SortComponent onSortChange={handleSortChange} />
      </div>

      <ReferralTable referPatientList={referPatients} loading={isLoading} />

      {!isLoading && referPatients.length > 0 && (
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

export default ReferralsView;
