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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { Banknote, CreditCard, EllipsisVertical, MapPin } from 'lucide-react';
import { formatTestDate } from '@/utils/date';
import { observer } from 'mobx-react-lite';
import { forwardRef, HTMLAttributes } from 'react';
import { useStore } from '@/store';
import { format } from 'date-fns';
import { ccyFormatter } from '@/utils/currency';
import { AppModals } from '@/store/AppConfig/appModalTypes';

interface ITestCardProps extends HTMLAttributes<HTMLDivElement> {
  datum: TAdminTestItem;
}
const TestCard = forwardRef<HTMLDivElement, ITestCardProps>(({ datum, ...props }, ref) => {
  const {
    AppConfigStore: { toggleModals }
  } = useStore();
  return (
    <Card key={datum.id} className={`w-full shadow-none ${props.className}`}>
      <CardHeader className="w-full pb-2">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center justify-start space-x-1">
            <CardTitle>{datum.name}</CardTitle>
          </div>

          <div className="flex items-center justify-start space-x-2">
            <Status variant={datum.status} />

            <DropdownMenu>
              <DropdownMenuTrigger>
                <EllipsisVertical size={16} className="cursor-pointer text-neutral-400" />
              </DropdownMenuTrigger>

              <DropdownMenuContent className="">
                <DropdownMenuItem
                  onClick={() => {
                    if (datum.tests) {
                      return;
                    } else {
                      toggleModals({
                        name: AppModals.ADMIN_SINGLE_TEST,
                        open: true,
                        testId: datum.id
                      });
                    }
                  }}
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <CardDescription>{datum.description}</CardDescription>
        <div className="flex flex-col text-sm md:flex-row md:space-x-2">
          <div className="flex justify-start space-x-2">
            <span className="">Old Price: </span>
            <span
              data-discount={datum.discountedPrice ? true : false}
              className="font-medium text-neutral-500 data-[discount=true]:line-through"
            >
              {ccyFormatter(datum.price)}
            </span>
          </div>

          <div className="flex justify-start space-x-2">
            <span className="">New Price: </span>
            <span className="font-medium text-green-400">
              {ccyFormatter(datum.discountedPrice)}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        {datum.requirements.length > 0 && (
          <Collapsible>
            <CollapsibleTrigger>
              <small className="hover:text-blue text-sm font-medium leading-none underline">
                See Requirements:
              </small>
            </CollapsibleTrigger>
            <CollapsibleContent className="flex flex-col space-y-3 p-2">
              <ol className="list-inside list-decimal">
                {datum.requirements.map((req, id) => (
                  <li key={id} className="text-sm text-neutral-600">
                    {req}
                  </li>
                ))}
              </ol>
            </CollapsibleContent>
          </Collapsible>
        )}
        {datum.tests && (
          <Collapsible>
            <CollapsibleTrigger>
              <small className="hover:text-blue text-sm font-medium leading-none underline">
                See All tests
              </small>
            </CollapsibleTrigger>
            <CollapsibleContent className="flex flex-col space-y-3 py-2">
              {datum.tests.map((test, id) => (
                <div key={id} className="flex items-start justify-start space-x-1">
                  <div>{id + 1}.</div>
                  <div key={id} className="flex w-full flex-col space-y-1">
                    <div className="flex w-full items-center justify-between">
                      <CardTitle>{test.name}</CardTitle>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <EllipsisVertical size={16} className="cursor-pointer text-neutral-400" />
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="">
                          <DropdownMenuItem
                            onClick={() => {
                              toggleModals({
                                name: AppModals.ADMIN_SINGLE_TEST,
                                open: true,
                                testId: test.id
                              });
                            }}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardDescription>{test.description}</CardDescription>

                    <div className="flex flex-col text-sm md:flex-row md:space-x-2">
                      <div className="flex justify-start space-x-2">
                        <span className="">Old Price: </span>
                        <span
                          data-discount={test.discountedPrice ? true : false}
                          className="font-medium text-neutral-500 data-[discount=true]:line-through"
                        >
                          {ccyFormatter(test.price)}
                        </span>
                      </div>

                      <div className="flex justify-start space-x-2">
                        <span className="">New Price: </span>
                        <span className="font-medium text-green-400">
                          {ccyFormatter(test.discountedPrice)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        )}
      </CardContent>

      <CardFooter>
        <div className="flex w-full flex-col justify-end text-xs text-neutral-500 md:flex-row md:space-x-2">
          <div className="flex justify-start space-x-2">
            <span className="">Created: </span>
            <span className="font-medium">{format(new Date(datum.createdAt), 'dd MMM, yy')}</span>
          </div>

          <div className="flex justify-start space-x-2">
            <span className="">Updated: </span>
            <span className="font-medium">{format(new Date(datum.updatedAt), 'dd MMM, yy')}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
});

TestCard.displayName = 'TestCard';
export default observer(TestCard);
