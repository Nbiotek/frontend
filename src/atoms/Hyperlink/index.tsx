import Link from 'next/link';

interface IHyperLinkProps extends React.HTMLAttributes<HTMLElement> {
  info?: string;
  hrefText: string;
  href?: string;
}

const HyperLink = ({ href, info, hrefText, ...rest }: IHyperLinkProps) => {
  return (
    <p className="font-grotesk text-sm font-light">
      {info}&nbsp;
      <Link href={href || ''} legacyBehavior className="hover:underline">
        <a className="font-grotesk font-medium hover:underline" {...rest}>
          {hrefText}
        </a>
      </Link>
    </p>
  );
};

export default HyperLink;
