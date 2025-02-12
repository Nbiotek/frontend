import { Title, Paragraph } from '@/atoms/typographys';
import { useStore } from '@/store';
import { XModal } from '@/atoms/modal';
import { AppModals } from '@/store/AppConfigStore/appModalTypes';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/navigation';
import ROUTES from '@/constants/routes';
import Button from '@/atoms/Buttons';

const LogoutModal = () => {
  const router = useRouter();
  const {
    AppConfigStore: { toggleModals, isOpen },
    AuthStore: { logout, isLoading }
  } = useStore();

  return (
    <XModal
      closeModal={() => toggleModals({ name: AppModals.LOG_OUT_MODAL, open: false })}
      bgClose={false}
      isOpen={isOpen.LOG_OUT_MODAL}
      className="!max-w-[430px]"
    >
      <div className="mx-auto w-full">
        <div className="my-4">
          <Title text="Are you sure you want to log out?" className="text-center font-medium" />

          <Paragraph
            text="No worries, we can get you logged in back easily."
            className="text-center"
          />
        </div>

        <Button
          variant="filled"
          text="No, keep me here"
          disabled={isLoading.login}
          onClick={() => toggleModals({ name: AppModals.LOG_OUT_MODAL, open: false })}
        />
        <div className="my-4"></div>
        <Button
          variant="light"
          text="Yes, Log out"
          isLoading={isLoading.login}
          disabled={isLoading.login}
          onClick={() => {
            logout(() => router.push(ROUTES.LOGIN.path));
          }}
        />
      </div>
    </XModal>
  );
};

export default observer(LogoutModal);
