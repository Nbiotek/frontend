import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { EllipsisVertical } from 'lucide-react';
import AppointmentItemDetails from './AppointmentItemDetails';
import Link from 'next/link';

interface DetailsDropDownProps {
  id: string; // Changed from StringDecoder to string
}

const ViewDetailsDropDown = ({ id }: DetailsDropDownProps) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button type="button" className="focus:outline-none">
            <EllipsisVertical />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link href={`/patient/appointment/details/${id}`}>View Details</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ViewDetailsDropDown;
