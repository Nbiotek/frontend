import { Text } from '@/lib/utils/Text';
import Image from 'next/image';
import Button from '@/atoms/Buttons';
import { LeftIcon } from '@/lib/utils/svg';

const ProfileSide = () => {
  return (
    <div className="mb-5 space-y-4 border-t ">
      <Text weight="semibold" variant="body" className="mt-5 text-neutral-500">
        {' '}
        Profile
      </Text>
      <div className="flex items-center gap-2">
        <Image src="/Avatar.png" alt="Profile image" width={50} height={40} />
        <div className="space-y-1">
          <Text variant="body" weight="normal" className="text-neutral-800">
            Jenny Wilson
          </Text>
          <Text weight="semibold" variant="body" className="text-neutral-400 ">
            jen.wilson@example.com
          </Text>
        </div>
      </div>
      <Button
        text="Log Out"
        type="button"
        variant="secondary"
        leftIcon={<LeftIcon />}
        className="text-base"
      />
    </div>
  );
};

export default ProfileSide;
