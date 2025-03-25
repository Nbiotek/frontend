import { Paragraph, SubTitle, Title } from '@/atoms/typographys';
import { Database } from 'lucide-react';
import React, { forwardRef, HTMLAttributes } from 'react';

interface IEmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
}

const EmptyState = forwardRef<HTMLDivElement, IEmptyStateProps>(({ title }, ref) => {
  return (
    <div ref={ref} className="flex h-[50dvh] w-full flex-col items-center justify-center space-y-2">
      <div className="flex h-[100px] w-[100px] items-center justify-center rounded-full bg-neutral-100 text-neutral-600">
        <Database size={50} />
      </div>

      <div className="mx-auto flex w-full flex-col items-center justify-center text-center md:w-[450px]">
        <SubTitle text={title} />
        <Paragraph text="It looks like there's no data to display. Try adding some new items." />
      </div>
    </div>
  );
});

EmptyState.displayName = 'EmptyState';
export default EmptyState;
