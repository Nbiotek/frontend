import InputSelect from '@/atoms/fields/InputSelect';
import { Paragraph } from '@/atoms/typographys';
import { Switch } from '@/components/ui/switch';
import { maritalStatus, theme } from '@/constants/data';
import React from 'react';

const Others = () => {
  return (
    <div className="flex w-full flex-col divide-y">
      <div className="flex w-full items-center justify-between space-x-4 pb-4">
        <div className="w-full">
          <Paragraph className="!font-medium" text="Appearance" />
          <Paragraph text="Switch between dark and light mode" />
        </div>

        {/* <InputSelect hideError={true} className="!w-[100px]" id="appearance" items={theme} /> */}
      </div>

      <div className="flex w-full items-center justify-between space-x-4 pt-4">
        <div className="w-full max-w-[450px]">
          <Paragraph className="!font-medium" text="Two - factor Authentication" />
          <Paragraph text="Keep your account secure by enabling 2FA via SMS or using a temporary one-time password (OTP)" />
        </div>

        <Switch />
      </div>
    </div>
  );
};

export default Others;
