import { Text } from '@/lib/utils/Text';
import { MapPin } from 'lucide-react';
import DropDownAction from '@/components/common/dropdownActions';

interface AppointmentItemProps {
  fullName: string;
  title: string;
  description: string;
  location: string;
  // items: Array
}

const AppointmentItem = ({ fullName, email, phoneNumber, location }: BookingForm) => {
  return (
    <>
      <div className="pb-3">
        <Text variant="h4" weight="semibold" className="mb-3 mt-2 border-b">
          {' '}
          Today
        </Text>
        <div className="flex items-start space-x-3">
          <div className="hidden h-7 w-7 rounded-full bg-blue-400 sm:flex" />
          <div className="flex w-full flex-col  space-y-2">
            <div className=" flex w-full items-start justify-between">
              <div>
                <Text> Comprehensive Health Screenelderly</Text>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo cumque</p>
              </div>
              <DropDownAction />
            </div>

            <div className="sm:flexBetween  w-full">
              <div>
                <MapPin className="inline" /> Medicare Hospital, 18 Iwaya Rd, Lagos{' '}
              </div>
              <span>25 Sept 2024</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentItem;
