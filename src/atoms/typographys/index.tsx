import { HTMLAttributes } from 'react';

interface ITypographyProps<T> extends HTMLAttributes<T> {
  text?: string;
}

export const Title = ({ text, className }: ITypographyProps<HTMLHeadingElement>) => {
  return (
    <h2 className={`font-roboto text-xl font-medium md:text-2xl lg:text-3xl ${className}`}>
      {text}
    </h2>
  );
};

export const SubTitle = ({ text, className }: ITypographyProps<HTMLHeadingElement>) => {
  return <h3 className={`font-roboto text-lg font-medium ${className}`}>{text}</h3>;
};

export const Paragraph = ({ text, className }: ITypographyProps<HTMLParagraphElement>) => {
  return <p className={`font-roboto text-xs font-thin md:text-sm ${className}`}>{text}</p>;
};
