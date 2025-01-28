import { Text } from "@/lib/utils/Text";
import { Bell, Settings } from 'lucide-react'
import { PiHandbag } from "react-icons/pi";
const MenuHeader = () => {
    return (
        <div className="shadow-lg p-3 bg-white w-full mx-1">
            <div className="w-[1029px] flex justify-between items-center">
                <div>
                    <Text variant="h3" className="text-blue-400 ">Hello Charles</Text>
                    <Text variant="body" weight="normal" className="text-blue-400">Welcome to your dashboard</Text>
                </div>
                <div className="flex items-center justify-between w-[261px]">
                    <Bell size={32} color="#4044A7" />
                    <Settings size={32} color="#4044A7" />
                    <div className="flex items-center gap-2">
                        <PiHandbag size={32} color="#000" />
                        <div>
                            <Text variant="body" weight="thin">Shopping cart:</Text>
                            <Text variant="body" weight="bold">$57.00</Text>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MenuHeader;