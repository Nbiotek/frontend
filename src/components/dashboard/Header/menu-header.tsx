import { Text } from '@/lib/utils/Text';
import { Bell, Settings } from 'lucide-react';
import { PiHandbag } from 'react-icons/pi';
const MenuHeader = () => {
  return (
    <div className="mx-1 w-full bg-white p-3 shadow-lg">
      <div className="flex w-[1029px] items-center justify-between">
        <div>
          <Text variant="h3" className="text-blue-400 ">
            Hello Charles
          </Text>
          <Text variant="body" weight="normal" className="text-blue-400">
            Welcome to your dashboard
          </Text>
        </div>
        <div className="flex w-[261px] items-center justify-between">
          <Bell size={32} color="#4044A7" />
          <Settings size={32} color="#4044A7" />
          <div className="flex items-center gap-2">
            <PiHandbag size={32} color="#000" />
            <div>
              <Text variant="body" weight="thin">
                Shopping cart:
              </Text>
              <Text variant="body" weight="bold">
                $57.00
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuHeader;
