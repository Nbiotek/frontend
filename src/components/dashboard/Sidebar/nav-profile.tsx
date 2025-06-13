import { Text } from '@/lib/utils/Text';
import Image from 'next/image';
import Button from '@/atoms/Buttons';
import { LeftIcon } from '@/lib/utils/svg';
import { observer } from 'mobx-react-lite';
import { useFetchProfile } from '@/hooks/user/useFetchProfile';
import { useStore } from '@/store';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import { Paragraph, SubTitle } from '@/atoms/typographys';
import { env } from '@/env';
import { EnumRole } from '@/constants/mangle';
import Status from '@/atoms/Buttons/Status';

const ProfileSide = () => {
  const { data } = useFetchProfile();

  const {
    AppConfigStore: { toggleModals }
  } = useStore();

  return (
    <div className="mb-5 space-y-4 border-t ">
      <Text weight="semibold" variant="body" className="mt-5 text-neutral-500">
        Profile
      </Text>
      <div className="flex items-center gap-2">
        <figure className="h-[50px] w-[50px] overflow-clip rounded-full">
          <Image
            src={`${data?.profile_pics ? `${env.NEXT_PUBLIC_BASE_ASSET_URL}${data?.profile_pics}` : '/Avatar.png'}`}
            alt="Profile image"
            width={50}
            height={40}
          />
        </figure>

        <div className="space-y-1">
          <SubTitle
            className="!-mb-2 !text-neutral-800"
            text={`${data?.first_name} ${data?.last_name}`}
          />
          <Paragraph className="!text-neutral-400 " text={data?.email ?? ''} />

          {data?.role && data?.role !== EnumRole.PATIENT && (
            <Status type="secondary" variant={data.role} />
          )}
        </div>
      </div>
      <Button
        text="Log Out"
        type="button"
        variant="secondary"
        leftIcon={<LeftIcon />}
        className="text-base"
        onClick={() => toggleModals({ open: true, name: AppModals.LOG_OUT_MODAL })}
      />
    </div>
  );
};

export default observer(ProfileSide);
