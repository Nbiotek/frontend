import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import React from 'react';

interface ITableLoaderProps {
  columns: number;
  rows: number;
}

const TableLoader = ({ rows, columns }: ITableLoaderProps) => {
  return (
    <TableBody className="w-full">
      {Array.from({ length: rows }).map((row, rowIndex) => (
        <TableRow key={`${row}-${rowIndex}`} className="hover:bg-gray-50 w-full">
          {Array.from({ length: columns }).map((col, colIndex) => (
            <TableCell key={`${col}-${colIndex}`} className="">
              <div className="bg-neutral-180 h-4 animate-pulse rounded"></div>
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableLoader;
