import Button from '@/atoms/Buttons';
import { ContactInformationProps } from '@/config/ContactInfo';
import Link from 'next/link';
interface ContactInfoProps {
  contactInfo: ContactInformationProps[];
}

const ContactInformation = ({ contactInfo }: ContactInfoProps) => {
  return (
    <div className="flex flex-col space-y-4 lg:w-[30%] ">
      {contactInfo.map((contact, index) => (
        <div
          className="flex flex-col items-center justify-center space-y-2  rounded-xl bg-white px-6 pb-3 pt-6 shadow-xl"
          key={index}
        >
          {<contact.icon />}
          <span className="text-blue-400">{contact.titleInfo}</span>
          <span className="text-center text-sm font-light text-blue-400">{contact.subTitle}</span>
          <Link
            href={contact.href}
            className="flex h-[50px] w-full items-center justify-center rounded-lg bg-blue-400 py-2 text-white hover:bg-blue-400/80"
          >
            {contact.btnText}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ContactInformation;
