import Image from 'next/image';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative top-0 flex w-full md:h-svh">
      <div className="hidden w-[20%] md:block">
        <Image
          src="/login_img.png"
          alt="Login Image"
          layout="fill"
          className="object-contain object-left"
        />
      </div>
      <div className="right-0 top-0 z-50 flex w-full items-center justify-center bg-neutral-200 md:absolute md:h-full md:w-[80%] md:rounded-l-3xl">
        <div className="mx-auto flex h-full w-[90vw] max-w-[500px] flex-col items-center justify-center py-24 md:p-0">
          <Image src="/logo.png" width={200} height={89} alt="Logo" />
          {children}
        </div>
      </div>
    </div>
  );
}
