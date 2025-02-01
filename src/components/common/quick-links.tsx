import Button from '@/atoms/Buttons';
import { QuickActionProps } from '@/config/quickActionItems';
import { Text } from '@/lib/utils/Text';
import { ChevronRight, TestTube, TestTube2 } from 'lucide-react';
import Link from 'next/link';

interface QuickActionComponentProps {
  quickLink: QuickActionProps[];
}

const QuickAction = ({ quickLink }: QuickActionComponentProps) => {
  return (
    <>
      {quickLink.map((item, index) => (
        <div className="flexBetween border-t pb-4 pt-4 " key={index}>
          <div className="flex items-center space-x-3">
            <div className="w-fit rounded-full bg-[#F0F2F5] p-[10px]">{item.icon}</div>
            <div className="">
              <Text variant="title" weight="normal">
                {item.titleLink}
              </Text>
              <Text variant="body" weight="thin">
                {item.subTitle}
              </Text>
            </div>
          </div>
          <Link href={item.href}>
            <ChevronRight width={30} />
          </Link>
        </div>
      ))}
    </>
  );
};

export default QuickAction;
