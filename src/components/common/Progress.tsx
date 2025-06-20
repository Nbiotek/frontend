import React, { forwardRef } from 'react';

interface IProgressBarProps extends React.ProgressHTMLAttributes<HTMLProgressElement> {}

const ProgressBar = forwardRef<HTMLProgressElement, IProgressBarProps>(
  ({ value, ...rest }, ref) => {
    return (
      <progress
        ref={ref}
        value={value}
        max="100"
        {...rest}
        className={`progress-bar h-1 w-full ${rest.className}`}
      >
        {value}
      </progress>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';
export default ProgressBar;
