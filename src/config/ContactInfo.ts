import { Speech, PhoneCall, ShieldQuestion } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export interface ContactInformationProps {
  icon: LucideIcon;
  titleInfo: string;
  subTitle: string;
  btnText: string;
  href: string;
}

export const ContactInfo: ContactInformationProps[] = [
  {
    icon: Speech,
    titleInfo: 'Chat with Agent',
    subTitle: 'Start a conversation with our suppport agent now!',
    btnText: 'Submit a Request',
    href: ''
  },
  {
    icon: PhoneCall,
    titleInfo: 'Call NBIOTEK',
    subTitle: 'Make a call with our support agent now!',
    btnText: 'Call now',
    href: ''
  },
  {
    icon: ShieldQuestion,
    titleInfo: 'Questions Asked',
    subTitle:
      'You can access some of the frequently asked questions here. You can find solutions to your queries.',
    btnText: 'View',
    href: ''
  }
];
