import React, { forwardRef, HTMLAttributes, useMemo } from 'react';

interface IBtnNotifyProps extends HTMLAttributes<HTMLButtonElement> {
  variant: 'filled' | 'light' | 'underline';
}

const NotifyBtn = forwardRef<HTMLButtonElement, IBtnNotifyProps>(
  ({ variant, children, ...props }, ref) => {
    const style = useMemo(() => {
      switch (variant) {
        case 'filled':
          return 'notify-btn-filled';
        case 'light':
          return 'notify-btn-light';
        case 'underline':
          return 'notify-btn-underline';
        default:
          break;
      }
    }, [variant]);

    return (
      <button ref={ref} className={`notify_btn ${style}`} {...props}>
        {children}
      </button>
    );
  }
);

NotifyBtn.displayName = 'NotifyBtn';

export default NotifyBtn;
