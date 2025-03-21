import React, { forwardRef, HTMLAttributes } from 'react';
import Image from 'next/image';
import NBPeopleImg from '@/app/assets/svgs/people.svg';
import NBCubeImg from '@/app/assets/svgs/cube.svg';
import NBChartImg from '@/app/assets/svgs/line_chart.svg';
import NBTimer from '@/app/assets/svgs/timer.svg';
import NBTTestTube from '@/app/assets/svgs/test_tube.svg';
import NBTTurn from '@/app/assets/svgs/test_turnaround.svg';
import NBTShield from '@/app/assets/svgs/shield.svg';
import { Paragraph, Title } from '@/atoms/typographys';

export enum EnumOverviewIcon {
  PEOPLE = 'PEOPLE',
  CUBE = 'CUBE',
  CHART = 'CHART',
  TIMER = 'TIMER',
  TEST = 'TEST',
  TURN = 'TURN',
  SHIELD = 'SHIELD'
}

interface IOverviewCardProps extends HTMLAttributes<HTMLDivElement> {
  type: EnumOverviewIcon;
  stat: number;
  title: string;
}

const overviewCardIcon: Record<EnumOverviewIcon, string> = {
  [EnumOverviewIcon.PEOPLE]: NBPeopleImg,
  [EnumOverviewIcon.CUBE]: NBCubeImg,
  [EnumOverviewIcon.CHART]: NBChartImg,
  [EnumOverviewIcon.TIMER]: NBTimer,
  [EnumOverviewIcon.TEST]: NBTTestTube,
  [EnumOverviewIcon.TURN]: NBTTurn,
  [EnumOverviewIcon.SHIELD]: NBTShield
};

const OverviewCard = forwardRef<HTMLDivElement, IOverviewCardProps>(
  ({ type, stat, title, ...props }, ref) => {
    return (
      <div ref={ref} className="h-[100px] w-full rounded-[8px] bg-white py-3" {...props}>
        <div className="mx-auto flex h-full w-[90%] items-center justify-between space-y-1">
          <div className="flex flex-col">
            <Paragraph className="!font-medium !text-neutral-400" text={title} />
            <div className="flex items-center justify-start space-x-1">
              <Title className="!font-bold" text={stat.toString()} />
              {type === EnumOverviewIcon.TIMER ? <p>hrs/test</p> : null}
            </div>
          </div>

          <figure className="flex items-center justify-start space-x-2">
            <Image src={overviewCardIcon[type]} alt="" width={60} height={60} />
          </figure>
        </div>
      </div>
    );
  }
);

OverviewCard.displayName = 'OverviewCard';
export default OverviewCard;
