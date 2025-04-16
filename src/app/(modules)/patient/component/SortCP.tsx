'use client';

import React, { useState } from 'react';
import { ArrowUpDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import IconPod from '@/atoms/Icon/IconPod';

interface SortComponentProps {
  onSortChange?: (sortOrder: 'ASC' | 'DESC') => void;
}

const SortComponent: React.FC<SortComponentProps> = ({ onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('DESC');

  const handleSortChange = (value: string) => {
    const newSortOrder = value as 'ASC' | 'DESC';
    setSortOrder(newSortOrder);
    if (onSortChange) {
      onSortChange(newSortOrder);
    }
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div>
          <IconPod Icon={ArrowUpDown} />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-3" align="end">
        <div className="space-y-2">
          <h3 className="font-medium">Sort Order</h3>
          <Select defaultValue={sortOrder} onValueChange={handleSortChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ASC">Ascending</SelectItem>
              <SelectItem value="DESC">Descending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SortComponent;
