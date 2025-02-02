import { HTMLAttributes, useMemo } from 'react';

interface IButtonProps extends HTMLAttributes<HTMLDivElement> {
  variant: string;
}

const TestBadge = ({ variant, className, ...rest }: IButtonProps) => {
  const style = useMemo(() => {
    switch (variant) {
      case 'High':
        return 'test-btn-high';
      case 'Medium':
        return 'test-btn-medium';
      case 'Low':
        return 'test-btn-low';
      default:
        break;
    }
  }, [variant]);

  return (
    <div className={`test-btn-badge group ${style} ${className}`} {...rest}>
      {variant}
    </div>
  );
};

export default TestBadge;
