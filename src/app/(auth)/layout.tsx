import Image from "next/image"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen  ">
      <div className="w-full flex ">
        <div style={{ position: "relative", width: "40%", height: "100vh" }}>
          <Image
            src="/login_img.png"
            alt="Login Image"
            layout="fill" // Makes the image fill the container
            objectFit="cover" // Ensures the image covers the container without distortion
          />
        </div>
        <div className="bg-[#e8e8e8] flex justify-center items-center w-full">
          <div className="flex flex-col justify-center items-center w-[523px] ">
            <Image
              src="/logo.png"
              width={200}
              height={89}
              alt="Logo"
            />
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
