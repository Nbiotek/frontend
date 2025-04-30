import ROUTES from '@/constants/routes';
import Image from 'next/image';
import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-full">
      <div className="relative top-0 flex h-full w-full">
        <div className="hidden w-[20%] md:block">
          <Image
            src="/login_img.png"
            alt="Login Image"
            layout="fill"
            className="object-contain object-left"
          />
        </div>
        <div className="right-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-y-scroll bg-neutral-200 md:absolute md:w-[80%] md:rounded-l-3xl">
          <div className="mx-auto flex h-auto w-[90vw] max-w-[450px] flex-col items-center justify-center py-6 md:p-0">
            <Link href={ROUTES.HOME.path}>
              <Image src="/logo.svg" width={150} height={80} alt="Logo" />
            </Link>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
