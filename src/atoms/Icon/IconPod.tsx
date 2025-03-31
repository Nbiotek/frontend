import React, { ElementType, forwardRef, HTMLAttributes } from 'react';
import { Paragraph } from '../typographys';

interface IConPodProps extends HTMLAttributes<HTMLDivElement> {
  Icon: ElementType;
  text?: string;
}

const IconPod = forwardRef<HTMLDivElement, IConPodProps>(
  ({ Icon, text, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className={`flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-lg border-[1px] border-borderLine bg-white text-neutral-500 hover:bg-blue-400 hover:text-white ${className}`}
      >
        <Icon size={18} />
        {text && <Paragraph text={text} />}
      </div>
    );
  }
);

IconPod.displayName = 'IconPod';
export default IconPod;
