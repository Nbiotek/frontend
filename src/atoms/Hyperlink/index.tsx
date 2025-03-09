import Link from 'next/link';

interface IHyperLinkProps extends React.HTMLAttributes<HTMLElement> {
  info?: string;
  hrefText: string;
  href?: string;
  className?: string;
}

const HyperLink = ({ href, info, hrefText, className, ...rest }: IHyperLinkProps) => {
  return (
    <p className="font-roboto text-sm">
      {info}&nbsp;
      <Link href={href || ''} legacyBehavior className="text-blue-400 hover:underline">
        <a className={`font-roboto text-blue-400 hover:underline ${className}`} {...rest}>
          {hrefText}
        </a>
      </Link>
    </p>
  );
};

export default HyperLink;
