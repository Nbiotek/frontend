import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { UseMutateFunction } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { EllipsisVerticalIcon } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

interface IActionCardProps {
  uuid: string;
  setCurrItem: Dispatch<SetStateAction<string>>;
  readMutate: UseMutateFunction<AxiosResponse<INBTServerResp<null>, any>, Error, string, unknown>;
}

export default function ActionCard({ uuid, setCurrItem, readMutate }: IActionCardProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button size="sm" variant="ghost">
          <EllipsisVerticalIcon className="cursor-pointer text-neutral-500" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            setCurrItem(uuid);
            readMutate(uuid);
          }}
        >
          Mark as read
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
