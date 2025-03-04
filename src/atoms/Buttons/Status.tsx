import { toTitleCase } from '@/utils';
import { HTMLAttributes, useMemo } from 'react';

interface IButtonProps extends HTMLAttributes<HTMLDivElement> {
  variant: string;
}

export enum EnumTestStatus {
  SUBMITTED = 'SUBMITTED',
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS'
}

export enum EnumTestPriority {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW'
}

export enum EnumResultStatus {
  ACCEPTED = 'ACCEPTED',
  PROCESSING = 'PROCESSING',
  REJECTED = 'REJECTED'
}

const Status = ({ variant, className, ...rest }: IButtonProps) => {
  const style = useMemo(() => {
    switch (variant) {
      // Test priority
      case EnumTestPriority.HIGH:
        return 'status-high';
      case EnumTestPriority.MEDIUM:
        return 'status-medium';
      case EnumTestPriority.LOW:
        return 'status-low';

      // Result status
      case EnumResultStatus.ACCEPTED:
        return 'status-failed';
      case EnumResultStatus.PROCESSING:
        return 'status-pending';
      case EnumResultStatus.REJECTED:
        return 'status-passed';

      // Test status
      case EnumTestStatus.SUBMITTED:
        return 'status-submitted';
      case EnumTestStatus.PENDING:
        return 'status-pending';
      case EnumTestStatus.IN_PROGRESS:
        return 'status-pending';
      default:
        break;
    }
  }, [variant]);

  return (
    <div className={`status-badge group ${style} ${className}`} {...rest}>
      {toTitleCase(variant)}
    </div>
  );
};

export default Status;
