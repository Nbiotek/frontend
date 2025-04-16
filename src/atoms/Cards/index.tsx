import { Text } from '@/lib/utils/Text';
import { HTMLAttributes } from 'react';

interface CardProp extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  className?: string;
}

const Cards = ({ title, children, className, ...rest }: CardProp) => {
  return (
    <div className={`rounded-lg ${className}`} {...rest}>
      <Text variant="h4" className="text-neutral-950">
        {title}
      </Text>
      {children}
    </div>
  );
};

export default Cards;
