import React, { forwardRef, HTMLAttributes } from 'react';
import { Paragraph } from '../typographys';

interface IFieldSetProps extends HTMLAttributes<HTMLFieldSetElement> {
  legend: string;
  text?: string;
}

const FieldSet = forwardRef<HTMLFieldSetElement, IFieldSetProps>(
  ({ legend, text, className, children, ...props }, ref) => {
    return (
      <fieldset ref={ref} {...props} className={`w-full rounded border p-2 ${className}`}>
        <legend className="px-1 text-xs font-medium">{legend}</legend>

        <Paragraph text={text} />

        <div className="w-fit">{children}</div>
      </fieldset>
    );
  }
);

FieldSet.displayName = 'FieldSet';
export default FieldSet;
