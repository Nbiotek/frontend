'use client';

import Status from '@/atoms/Buttons/Status';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { useFetchPatientAppt } from '@/hooks/user/useFetchPatientAppt';
import { formatTestDate } from '@/utils/date';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { Banknote, CreditCard, EllipsisVertical, MapPin } from 'lucide-react';

const PatientApptView = ({ id }: { id: string }) => {
  const { data, isLoading, status } = useFetchPatientAppt(id);

  console.log(data, isLoading);
  return (
    <div className="flex h-[80vh] w-full flex-col space-y-4 overflow-y-scroll">
      {status === 'pending' &&
        Array(10)
          .fill(1)
          .map((item) => <Skeleton key={item} className="h-40 w-full" />)}
      {status === 'success' &&
        data &&
        data.appointments.map((datum) => (
          <Card key={datum.id} className="w-full">
            <CardHeader className="w-full pb-2">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center justify-start space-x-2">
                  <CardTitle>{datum.title}</CardTitle>
                  <CardDescription>| {formatTestDate(datum.appointmentDate)}</CardDescription>
                </div>

                <div className="flex items-center justify-start space-x-2">
                  <Status variant={datum.status} />

                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <EllipsisVertical size={16} className="cursor-pointer text-neutral-400" />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <CardDescription>{datum.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <Collapsible>
                <CollapsibleTrigger>
                  <small className="hover:text-blue text-sm font-medium leading-none underline">
                    See booked tests
                  </small>
                </CollapsibleTrigger>
                <CollapsibleContent className="flex flex-col space-y-3 p-2">
                  {datum.tests.map((test, id) => (
                    <Card key={id}>
                      <CardHeader className="p-3">
                        <div className="flex items-center justify-start space-x-2">
                          <CardTitle>{test.name}</CardTitle>
                          <Status variant={test.priority} />
                        </div>

                        <CardDescription>{test.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
            <CardFooter className="flex w-full items-center justify-start space-x-4">
              <CardDescription className="flex items-center justify-start space-x-1">
                <MapPin size={18} /> <p>{datum.location.address}</p>
              </CardDescription>

              <CardDescription className="flex items-center justify-start space-x-1">
                <Banknote size={18} />
                <Status variant={datum.paymentStatus} />
              </CardDescription>

              <CardDescription className="flex items-center justify-start space-x-1">
                <CreditCard size={18} />
                <p>{datum.paymentMethod}</p>
              </CardDescription>
            </CardFooter>
          </Card>
        ))}
    </div>
  );
};

export default PatientApptView;
