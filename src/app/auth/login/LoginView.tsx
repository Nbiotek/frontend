import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Button from '@/atoms/Buttons';
import GoogleBtn from '@/atoms/Buttons/GoogleBtn';
import FacebookBtn from '@/atoms/Buttons/FacebookBtn';
import Input from '@/atoms/fields/Input';
import HyperLink from '@/atoms/Hyperlink';
import ROUTES from '@/constants/routes';

export default function LoginView() {
  return (
    <Card className="w-full border-none bg-transparent shadow-none">
      <CardHeader className="text-center">
        <CardTitle>Sign in to your account</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4 rounded-2xl bg-white py-8 shadow-lg">
        <div className="flex flex-col space-y-2">
          <GoogleBtn />
          <FacebookBtn />
        </div>

        <div className="flex items-center justify-between text-neutral-200">
          <div className="h-[1px] w-[45%] bg-neutral-100"></div>
          <p>or</p>
          <div className="h-[1px] w-[45%] bg-neutral-100"></div>
        </div>

        <div className="">
          <Input type="email" label="Email Address" placeholder="adeolu@gmail.com" />
          <Input
            type="password"
            label="Password"
            child={
              <HyperLink
                className="!w-full justify-end"
                info="Forgot password ?"
                hrefText="Reset"
                href="/"
              />
            }
          />
        </div>
        <Button type="submit" variant="filled">
          Continue
        </Button>
        <div className="flex flex-col items-center justify-center">
          <HyperLink
            className="my-2 !w-full justify-end"
            info="Don't have an account ?"
            hrefText="Register"
            href={ROUTES.REGISTER.path}
          />
        </div>
      </CardContent>
    </Card>
  );
}
