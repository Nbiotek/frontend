import { Text } from '@/lib/utils/Text';
import { MapPin } from 'lucide-react';
import DropDownAction from '@/components/common/dropdownActions';
import Button from '@/atoms/Buttons';

const PendingTestItem = () => {
  return (
    <>
      <div className="mb-4 rounded-lg bg-white px-[10px] py-[10px]">
        <div className="flex items-start space-x-3">
          <div className="hidden h-7 w-7 rounded-full bg-blue-400 sm:flex" />
          <div className="flex w-full flex-col  space-y-4">
            <div className=" flex w-full items-start justify-between">
              <div>
                <Text> Comprehensive Health Screenelderly</Text>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam alias
                  consequuntur blanditi
                </p>
              </div>
              <DropDownAction />
            </div>

            <div className="sm:flexBetween  w-full">
              <div className="inline-flex w-[500px] space-x-3">
                <Button
                  variant="danger-outlined"
                  text="Cancel"
                  className="py-5 text-lg font-semibold"
                />
                <Button
                  variant="filled"
                  text="Reschedule"
                  className="h-[55px] text-lg  font-semibold"
                />
              </div>
              <span>25 Sept 2024</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PendingTestItem;
