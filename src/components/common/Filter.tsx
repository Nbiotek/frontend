'use client';
import Status, {
  EnumPatientRegStatus,
  EnumResultStatus,
  EnumTestPriority,
  EnumTestStatus
} from '@/atoms/Buttons/Status';
import IconPod from '@/atoms/Icon/IconPod';
import { Paragraph } from '@/atoms/typographys';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { DropdownMenu, DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { ChevronDown, ListFilter } from 'lucide-react';
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import CustomDate from '@/atoms/fields/CustomDate';
import Button from '@/atoms/Buttons';
import { observer } from 'mobx-react-lite';

interface ISearchFilterProps {
  type: 'test' | 'result' | 'patient' | 'appointment';
  query: Partial<TTestQuery>;
  applyQuery: (_query: Partial<TTestQuery>) => void;
  resetQuery?: () => void;
}

const SearchFilter = ({ type, query, applyQuery, resetQuery }: ISearchFilterProps) => {
  const [filter, setFilter] = useState<Partial<TTestQuery>>(query);
  const [reset, setReset] = useState('t');

  const handleReset = () => {
    resetQuery && resetQuery();
    setFilter({});
    setReset(reset === 't' ? 'p' : 't');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <IconPod Icon={ListFilter} />
      </DropdownMenuTrigger>

      <DropdownMenuContent key={reset} className="flex w-fit flex-col space-y-4 ">
        <div className="flex w-[300px] flex-col space-y-2 divide-y divide-neutral-100">
          <Collapsible className="flex w-full flex-col space-y-1" defaultOpen={true}>
            <CollapsibleTrigger className="w-full bg-neutral-50 p-2">
              <div className="flex w-full items-center justify-between">
                <Paragraph className="text-lg !font-medium" text="Status" />
                <ChevronDown size={20} />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <RadioGroup
                defaultValue={filter.status}
                onValueChange={(status) => {
                  setFilter((prev) => ({ ...prev, status }));
                }}
                className="flex flex-wrap items-center justify-start gap-2"
              >
                {type === 'test' &&
                  Object.values(EnumTestStatus).map((testStatus) => (
                    <div key={testStatus} className="flex items-center justify-start space-x-1">
                      <RadioGroupItem value={testStatus} id={testStatus} />
                      <Label htmlFor={testStatus} className="font-regular text-xs">
                        <Status variant={testStatus} />
                      </Label>
                    </div>
                  ))}

                {type === 'result' &&
                  Object.values(EnumResultStatus).map((testStatus) => (
                    <div key={testStatus} className="flex items-center justify-start space-x-1">
                      <RadioGroupItem value={testStatus} id={testStatus} />
                      <Label htmlFor={testStatus} className="font-regular text-xs">
                        <Status variant={testStatus} />
                      </Label>
                    </div>
                  ))}

                {type === 'patient' &&
                  Object.values(EnumPatientRegStatus).map((testStatus) => (
                    <div key={testStatus} className="flex items-center justify-start space-x-1">
                      <RadioGroupItem value={testStatus} id={testStatus} />
                      <Label htmlFor={testStatus} className="font-regular text-xs">
                        <Status variant={testStatus} />
                      </Label>
                    </div>
                  ))}
              </RadioGroup>
            </CollapsibleContent>
          </Collapsible>

          {(type === 'test' || type === 'result') && (
            <Collapsible className="flex w-full flex-col space-y-1" defaultOpen={true}>
              <CollapsibleTrigger className="w-full bg-neutral-50 p-2">
                <div className="flex w-full items-center justify-between">
                  <Paragraph className="text-lg !font-medium" text="Priority" />
                  <ChevronDown size={20} />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="flex flex-wrap items-center justify-start gap-2">
                <RadioGroup
                  defaultValue={filter.priority}
                  onValueChange={(priority) => {
                    setFilter((prev) => ({ ...prev, priority }));
                  }}
                  className="flex flex-wrap items-center justify-start gap-2"
                >
                  {Object.values(EnumTestPriority).map((priority) => (
                    <div key={priority} className="flex items-center justify-start space-x-1">
                      <RadioGroupItem
                        value={priority}
                        id={priority}
                        onChange={(e) => {
                          setFilter((prev) => ({ ...prev, priority }));
                        }}
                      />
                      <Label htmlFor={priority} className="font-regular text-xs">
                        <Status variant={priority} />
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CollapsibleContent>
            </Collapsible>
          )}

          <Collapsible className="flex w-full flex-col space-y-1" defaultOpen={true}>
            <CollapsibleTrigger className="w-full bg-neutral-50 p-2">
              <div className="flex w-full items-center justify-between">
                <Paragraph className="text-lg !font-medium" text="Date" />
                <ChevronDown size={20} />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="flex w-full items-center justify-between space-x-2">
              <CustomDate
                id="startDate"
                className="md:w-[50%]"
                initialValue={filter?.fromDate ?? ''}
                showTime={false}
                placeholder="Jan 1, 2000"
                handleSetDate={(val) => {
                  setFilter((prev) => ({ ...prev, fromDate: val.toISOString() }));
                }}
                label="From"
              />
              <CustomDate
                id="endDate"
                className="md:w-[50%]"
                initialValue={filter?.toDate ?? ''}
                showTime={false}
                placeholder="Jan 1, 2000"
                minDate={filter?.fromDate ? new Date(filter.fromDate) : new Date()}
                handleSetDate={(val) => {
                  setFilter((prev) => ({ ...prev, toDate: val.toISOString() }));
                }}
                label="To"
              />
            </CollapsibleContent>
          </Collapsible>

          <Collapsible className="flex w-full flex-col space-y-1" defaultOpen={true}>
            <CollapsibleTrigger className="w-full bg-neutral-50 p-2">
              <div className="flex w-full items-center justify-between">
                <Paragraph className="text-lg !font-medium" text="Sort Order" />
                <ChevronDown size={20} />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <RadioGroup
                defaultValue={filter.sortOrder}
                onValueChange={(value) => {
                  setFilter((prev) => ({ ...prev, sortOrder: value }));
                }}
                className="flex flex-wrap items-center justify-start gap-2"
              >
                <div className="flex items-center justify-start space-x-1">
                  <RadioGroupItem value="ASC" id="ASC" />
                  <Label htmlFor="ASC" className="font-regular text-xs">
                    Ascending
                  </Label>
                </div>

                <div className="flex items-center justify-start space-x-1">
                  <RadioGroupItem value="DESC" id="DESC" />
                  <Label htmlFor="DESC" className="font-regular text-xs">
                    Descending
                  </Label>
                </div>
              </RadioGroup>
            </CollapsibleContent>
          </Collapsible>
        </div>

        <div className="flex items-center justify-between space-x-2">
          <div className="w-[50%]">
            <Button variant="light" onClick={handleReset}>
              Reset
            </Button>
          </div>

          <DropdownMenuItem className="w-[50%]">
            <Button variant="filled" onClick={() => applyQuery(filter)}>
              Apply
            </Button>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default observer(SearchFilter);
