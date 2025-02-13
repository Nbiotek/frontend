'use client';
import { CircleX, EllipsisVertical, Upload } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import Status from '@/atoms/Buttons/Status';
import { tests } from '@/constants/data';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup
} from '@/components/ui/dropdown-menu';
import { useStore } from '@/store';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import { observer } from 'mobx-react-lite';

const TestsTable = () => {
  const {
    AppConfigStore: { toggleModals }
  } = useStore();
  return (
    <div className="w-full overflow-clip rounded-lg bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Test type</TableHead>
            <TableHead>Requested Date</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead className="w-[80px]">Priority</TableHead>
            <TableHead className="w-[20px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tests.map((test) => (
            <TableRow key={test.name}>
              <TableCell className="font-medium">{test.name}</TableCell>
              <TableCell>{test.type}</TableCell>
              <TableCell>{test.req_date}</TableCell>
              <TableCell>{test.due_date}</TableCell>
              <TableCell>
                <Status variant={test.level} />
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <EllipsisVertical size={16} className="cursor-pointer text-neutral-400" />
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="">
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        onClick={() =>
                          toggleModals({
                            open: true,
                            name: AppModals.RESULT_UPLOAD_MODAL,
                            test_uuid: ''
                          })
                        }
                      >
                        <Upload />
                        <p>Upload result</p>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-400">
                        <CircleX />
                        <p>Cancel test</p>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default observer(TestsTable);
