'use client';
import Button from '@/atoms/Buttons';
import { Paragraph, Title } from '@/atoms/typographys';
import { EnumRole } from '@/constants/mangle';
import ROUTES from '@/constants/routes';
import { useStore } from '@/store';
import { useRouter } from 'next/navigation';

function DeniedView() {
  const router = useRouter();

  const {
    AuthStore: { user }
  } = useStore();

  return (
    <div className="mx-auto flex h-screen w-full max-w-[250px] flex-col items-center justify-center space-y-6 text-center">
      <div>
        <Title text="Denied" />
        <Paragraph text="You do not have permission to access this page." />
      </div>

      <Button
        onClick={() => router.replace(ROUTES.getRedirectPathByRole(user?.role as EnumRole))}
        variant="filled"
        text="Go back"
      />
    </div>
  );
}

export default DeniedView;
