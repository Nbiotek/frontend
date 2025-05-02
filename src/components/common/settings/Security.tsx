import Button from '@/atoms/Buttons';
import Status from '@/atoms/Buttons/Status';
import Input from '@/atoms/fields/Input';
import { Paragraph, SubTitle } from '@/atoms/typographys';

const Security = () => {
  return (
    <div className="flex w-full flex-col space-y-4">
      <div className="pb-4">
        <SubTitle
          className=""
          text="Manage security and privacy settings to protect your account"
        />
        <Paragraph text="Select the types of notifications you receive about your activities and recommendations." />
      </div>

      <div className="flex flex-col justify-start space-y-4 rounded-lg border p-2">
        <SubTitle className="border-b pb-2" text="Account Details" />

        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between space-x-6">
            <div className="w-full max-w-[450px]">
              <Paragraph className="!font-medium" text="Verify Email Address" />
              <Paragraph text="Verify your email address to confirm the credentials" />
            </div>

            <Status variant="VERIFIED" />
          </div>

          <div className="flex w-full max-w-96 flex-col justify-start space-y-3">
            <div className="w-full">
              <Paragraph className="!font-medium" text="Update Password" />
              <Paragraph text="Change your password to update and protect your account" />
            </div>

            <form className="flex flex-col space-y-2">
              <fieldset>
                <Input type="password" placeholder="old password" />
                <Input type="password" placeholder="new password" />
                <Input type="password" placeholder="confirm password" />
              </fieldset>

              <Button variant="filled">Update</Button>
            </form>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-start space-y-4 rounded-lg border p-2">
        <SubTitle className="border-b pb-2" text="Recovery Settings" />

        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between space-x-6">
            <div className="w-full max-w-[450px]">
              <Paragraph className="!font-medium" text="Recovery Email Address" />
              <Paragraph text="Set up recovery email address to secure your Account." />
            </div>

            <Button className="!w-16" size="sm" variant="filled">
              update
            </Button>
          </div>

          <div className="flex items-center justify-between space-x-6">
            <div className="w-full">
              <Paragraph className="!font-medium" text="Recovery Phone Number" />
              <Paragraph text="Add phone number to set up SMS recovery" />
            </div>

            <Button className="!w-16" size="sm" variant="filled">
              update
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;
