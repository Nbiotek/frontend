import Image from 'next/image';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen  ">
      <div className="flex w-full ">
        <div style={{ position: 'relative', width: '40%', height: '100vh' }}>
          <Image
            src="/login_img.png"
            alt="Login Image"
            layout="fill" // Makes the image fill the container
            objectFit="cover" // Ensures the image covers the container without distortion
          />
        </div>
        <div className="flex w-full items-center justify-center bg-[#e8e8e8]">
          <div className="flex w-[523px] flex-col items-center justify-center ">
            <Image src="/logo.png" width={200} height={89} alt="Logo" />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
