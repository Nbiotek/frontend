'use client';

import React, { useState } from 'react';
import { ListFilter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import IconPod from '@/atoms/Icon/IconPod';
import { Badge } from '@/components/ui/badge';
import { DatePickerDemo } from '@/components/ui/date-picker'; // Import the new component

// Filter options for different contexts
export interface FilterOptions {
  showStatus?: boolean;
  statusOptions?: Array<{ value: string; label: string }>;
  sortByOptions?: Array<{ value: string; label: string }>;
}

// Default options
const defaultStatusOptions = [
  { value: 'PENDING', label: 'Pending' },
  { value: 'IN_REVIEW', label: 'In Review' },
  { value: 'COMPLETED', label: 'Completed' }
];

const defaultSortByOptions = [
  { value: 'date', label: 'Date' },
  { value: 'name', label: 'Name' },
  { value: 'status', label: 'Status' }
];

interface FilterComponentProps {
  onFilterChange?: (filters: {
    fromDate?: Date;
    toDate?: Date;
    sortBy?: string;
    status?: string;
  }) => void;
  onClearFilters?: () => void;
  activeFilters?: number; // Number of active filters
  options?: FilterOptions;
}

const FilterComponent: React.FC<FilterComponentProps> = ({
  onFilterChange,
  onClearFilters,
  activeFilters = 0,
  options = {}
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);
  const [sortBy, setSortBy] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<string | undefined>(undefined);

  // Get options with defaults
  const showStatus = options.showStatus ?? false;
  const statusOptions = options.statusOptions || defaultStatusOptions;
  const sortByOptions = options.sortByOptions || defaultSortByOptions;

  const handleApplyFilters = () => {
    if (onFilterChange) {
      const filters: any = {
        fromDate,
        toDate,
        sortBy
      };

      // Only include status if it's enabled and selected
      if (showStatus && status) {
        filters.status = status;
      }

      onFilterChange(filters);
    }
    setIsOpen(false);
  };

  const handleClearFilters = () => {
    setFromDate(undefined);
    setToDate(undefined);
    setSortBy(undefined);
    setStatus(undefined);

    // Notify parent
    if (onClearFilters) {
      onClearFilters();
    }

    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div className="relative">
          <IconPod Icon={ListFilter} />
          {activeFilters > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center p-0 text-xs"
            >
              {activeFilters}
            </Badge>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="start">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Filter</h3>

          <div className="space-y-2">
            <Label htmlFor="sortBy">Sort By</Label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger id="sortBy">
                <SelectValue placeholder="Select field" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {sortByOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Status filter - only shown when showStatus is true */}
          {showStatus && (
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label>Date Range</Label>
            <div className="flex flex-col space-y-2">
              <DatePickerDemo value={fromDate} onChange={setFromDate} placeholder="From date" />

              <DatePickerDemo value={toDate} onChange={setToDate} placeholder="To date" />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleClearFilters}>
              Clear
            </Button>
            <Button onClick={handleApplyFilters}>Apply</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FilterComponent;
