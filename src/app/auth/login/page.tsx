import Link from 'next/link';
import { GoogleIcon, FacebookIcon, AppleIcon } from '@/lib/utils/svg';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { Text } from '@/lib/utils/Text';

export default function LoginPage() {
  return (
    <Card className="w-full border-none bg-transparent shadow-none">
      <CardHeader className="text-center">
        <CardTitle>Sign in to your account</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 rounded-lg bg-white p-8 shadow-lg">
        <div className="flex flex-col items-center">
          <Text className="text-gray_light" weight="light">
            Dont have account?{' '}
            <Link href="/register" className="font-normal text-blue-300">
              Sign me Up
            </Link>
          </Text>
          <div className="my-6 flex w-full items-center">
            <div className="flex-grow border-t border-neutral-200"></div>
            <span className="text-gray-500 mx-4">or</span>
            <div className="flex-grow border-t border-neutral-200"></div>
          </div>
          <div className="flex justify-between gap-[12px]">
            <div className="flex w-[150px] cursor-pointer justify-center rounded-lg border border-[#d0d0d0] bg-white p-[10px]">
              <GoogleIcon />
            </div>
            <div className="flex w-[150px] cursor-pointer justify-center rounded-lg border border-[#d0d0d0] bg-white p-[10px]">
              <FacebookIcon />
            </div>
            <div className="flex w-[150px] cursor-pointer justify-center rounded-lg border border-[#d0d0d0] bg-white p-[10px]">
              <AppleIcon />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className=" w-full ">
        <Text
          variant="small"
          color="warning_cr"
          weight="light"
          align="center"
          className="mt-5 w-full text-gray_light"
        >
          {' '}
          Don’t want to sign in yet? <span className="font-normal text-blue-300">Explore</span>
        </Text>
      </CardFooter>
    </Card>
  );
}
