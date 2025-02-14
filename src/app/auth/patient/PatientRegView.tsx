'use client';
import { EnumPatientForm } from '@/constants/mangle';
import InsuranceForm from './components/Insurance';
import ContactForm from './components/Contact';
import PersonalForm from './components/Personal';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';

const PatientRegView = () => {
  const {
    PatientStore: { currentForm }
  } = useStore();
  const switchDetails = (key: EnumPatientForm) => {
    switch (key) {
      case EnumPatientForm.PEROSNAL:
        return <PersonalForm />;
      case EnumPatientForm.CONTACT:
        return <ContactForm />;
      case EnumPatientForm.INSURANCE:
        return <InsuranceForm />;
      default:
        break;
    }
  };
  return <> {switchDetails(currentForm)} </>;
};

export default observer(PatientRegView);
