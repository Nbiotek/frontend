import React, { ElementType, forwardRef, HTMLAttributes } from 'react';

interface IConPodProps extends HTMLAttributes<HTMLDivElement> {
  Icon: ElementType;
}

const IconPod = forwardRef<HTMLDivElement, IConPodProps>(({ Icon, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className={`flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-lg border-[1px] border-borderLine bg-white text-neutral-500 hover:bg-blue-400 hover:text-white ${className}`}
    >
      <Icon size={18} />
    </div>
  );
});

IconPod.displayName = 'IconPod';
export default IconPod;
