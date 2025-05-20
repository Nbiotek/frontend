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

export enum EnumResultStatus { // same as qc status
  FAILED = 'FAILED',
  PENDING = 'PENDING',
  PASSED = 'PASSED',
  UNDER_REVIEW = 'UNDER_REVIEW'
}

export enum EnumTPatientResult {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED'
}

export enum EnumTPatientPayment {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED'
}

export enum EnumTDoctorReview {
  IN_REVIEW = 'IN_REVIEW',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED'
}

const Status = ({ variant, className, ...rest }: IButtonProps) => {
  const style = useMemo(() => {
    switch (variant) {
      // Test priority
      case EnumTestPriority.HIGH:
        return 'status-red';
      case EnumTestPriority.MEDIUM:
        return 'status-amber';
      case EnumTestPriority.LOW:
        return 'status-teal';

      case 'VERIFIED':
        return 'status-green';

      // Result status | Quality Control
      case EnumResultStatus.PASSED:
        return 'status-green';
      case EnumResultStatus.PENDING:
        return 'status-violet';
      case EnumResultStatus.FAILED:
        return 'status-red';
      case EnumResultStatus.UNDER_REVIEW:
        return 'status-teal';

      // Test status
      case EnumTestStatus.SUBMITTED:
        return 'status-green';
      case EnumTestStatus.PENDING:
        return 'status-violet';
      case EnumTestStatus.IN_PROGRESS:
        return 'status-amber';
      default:
        break;

      // Patient Test Result
      case EnumTPatientResult.PENDING:
        return 'status-violet';
      case EnumTPatientResult.COMPLETED:
        return 'status-green';

      case EnumTPatientPayment.PENDING:
        return 'status-violet';
      case EnumTPatientPayment.COMPLETED:
        return 'status-green';
      case EnumTPatientPayment.FAILED:
        return 'status-red';

      case EnumTDoctorReview.IN_REVIEW:
        return 'status-violet';
      case EnumTDoctorReview.COMPLETED:
        return 'status-green';
      case EnumTDoctorReview.FAILED:
        return 'status-red';

      case 'APPROVED':
        return 'status-blue';
      case 'INCOMPLETED':
        return 'status-amber';
    }
  }, [variant]);

  return (
    <div className={`status-badge group ${style} ${className}`} {...rest}>
      {toTitleCase(variant)}
    </div>
  );
};

export default Status;
