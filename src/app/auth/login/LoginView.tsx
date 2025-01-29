import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Button from '@/atoms/Buttons';
import GoogleBtn from '@/atoms/Buttons/GoogleBtn';
import FacebookBtn from '@/atoms/Buttons/FacebookBtn';
import Input from '@/atoms/Input';
import HyperLink from '@/atoms/Hyperlink';

export default function LoginView() {
  return (
    <Card className="w-full border-none bg-transparent shadow-none">
      <CardHeader className="text-center">
        <CardTitle>Sign in to your account</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 rounded-lg bg-white p-8 shadow-lg">
        <GoogleBtn />
        <FacebookBtn />
        <div className="flex items-center justify-between text-neutral-200">
          <div className="h-[1px] w-[48%] bg-neutral-100"></div>
          <p>or</p>
          <div className="h-[1px] w-[48%] bg-neutral-100"></div>
        </div>

        <div className="">
          <Input type="email" label="Email Address" placeholder="adeolu@gmail.com" />
          <Input type="password" label="Password" />
          <div className="mb-6 flex justify-end">
            <HyperLink info="forgot Password?" href="" hrefText=" Click here" />
          </div>

          <Button type="submit" form="login-form" variant="filled">
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
