import { SubTitle } from '@/atoms/typographys';
import { Switch } from '@/components/ui/switch';
import React from 'react';

const NotificationView = () => {
  return (
    <div className="w-full rounded-lg bg-white p-3">
      <div className="border-b pb-2">
        <SubTitle
          className=""
          text="Select the kind of notification you get about your activities and recommendations"
        />
      </div>
    </div>
  );
};

export default NotificationView;
