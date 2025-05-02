import Button from '@/atoms/Buttons';
import { Paragraph } from '@/atoms/typographys';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

const Others = () => {
  return (
    <div className="flex w-full flex-col divide-y">
      <div className="flex w-full items-center justify-between space-x-4 pb-4">
        <div className="w-full">
          <Paragraph className="!font-medium" text="Appearance" />
          <Paragraph text="Switch between dark and light mode" />
        </div>
      </div>

      <div className="flex w-full items-center justify-between space-x-4 pt-4">
        <div className="w-full max-w-[450px]">
          <Paragraph className="!font-medium" text="Two - factor Authentication" />
          <Paragraph text="Keep your account secure by enabling 2FA via SMS or using a temporary one-time password (OTP)" />
        </div>

        <Switch />
      </div>

      <div className="flex w-full flex-col justify-between space-y-2 pt-4">
        <div className="w-full max-w-[450px]">
          <Paragraph className="!font-medium !text-error-400" text="Delete Account" />
          <Paragraph text="This action can't be reversed" />
        </div>

        <form className="flex flex-col space-y-2">
          <Textarea placeholder="Help us understand why you want to leave..." />
          <Button variant="danger-outlined" className="!w-36">
            Delete Account
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Others;
