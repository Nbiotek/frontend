import { HTMLAttributes, useMemo } from 'react';

interface IButtonProps extends HTMLAttributes<HTMLDivElement> {
  variant: string;
}

const Status = ({ variant, className, ...rest }: IButtonProps) => {
  const style = useMemo(() => {
    switch (variant) {
      // Test status
      case 'High':
        return 'status-high';
      case 'Medium':
        return 'status-medium';
      case 'Low':
        return 'status-low';

      // QC status
      case 'Failed':
        return 'status-failed';
      case 'Pending':
        return 'status-pending';
      case 'Passed':
        return 'status-passed';

      // Results status
      case 'Submitted':
        return 'status-submitted';
      case 'Not Submitted':
        return 'status-pending';
      default:
        break;
    }
  }, [variant]);

  return (
    <div className={`status-badge group ${style} ${className}`} {...rest}>
      {variant}
    </div>
  );
};

export default Status;
