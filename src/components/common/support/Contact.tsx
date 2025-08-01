import ContactForm from './components/Form';
import ContactInformation from './components/OtherInfo';
import { ContactInfo } from '@/config/ContactInfo';

const Contactus = () => {
  return (
    <div className="mt-[24px] flex space-x-4">
      <ContactForm />
      <ContactInformation contactInfo={ContactInfo} />
    </div>
  );
};

export default Contactus;
