import Button from '@/atoms/Buttons';
import { Paragraph, SubTitle } from '@/atoms/typographys';
import { Switch } from '@/components/ui/switch';
import React from 'react';

const NotificationView = () => {
  return (
    <div className="flex w-full flex-col space-y-8 rounded-lg bg-white p-3">
      <div className="flex w-full flex-col divide-y">
        <div className="pb-4">
          <SubTitle className="" text="Notifications" />
          <Paragraph text="Select the types of notifications you receive about your activities and recommendations." />
        </div>

        <div className="flex flex-col space-y-3 py-4">
          <div className="flex items-center justify-start space-x-6">
            <div className="w-full max-w-[450px]">
              <Paragraph className="!font-medium" text="New test order" />
              <Paragraph text="Alert when new tests are assigned" />
            </div>

            <Switch />
          </div>

          <div className="flex items-center justify-start space-x-6">
            <div className="w-full max-w-[450px]">
              <Paragraph className="!font-medium" text="Urgent result / Stat request" />
              <Paragraph text="Notifications for high-priority tests or abnormal results." />
            </div>

            <Switch />
          </div>

          <div className="flex items-center justify-start space-x-6">
            <div className="w-full max-w-[450px]">
              <Paragraph className="!font-medium" text="Test completion reminder" />
              <Paragraph text="Reminders for pending or delayed tests." />
            </div>

            <Switch />
          </div>

          <div className="flex items-center justify-start space-x-6">
            <div className="w-full max-w-[450px]">
              <Paragraph className="!font-medium" text="Inventory alerts" />
              <Paragraph text="Low stock or critical supply issues." />
            </div>

            <Switch />
          </div>

          <div className="flex items-center justify-start space-x-6">
            <div className="w-full max-w-[450px]">
              <Paragraph className="!font-medium" text="Maintenance reminder" />
              <Paragraph text="Equipment maintenance schedules or calibration alerts." />
            </div>

            <Switch />
          </div>
        </div>

        <div className="flex items-center justify-start space-x-6 py-4">
          <div className="w-full max-w-[450px]">
            <Paragraph className="!font-medium" text="Email Notification" />
            <Paragraph text="Get emails to find out what is going on when you are not online. You can turn these off." />
          </div>

          <Switch />
        </div>

        <div className="flex items-center justify-start space-x-6 py-4">
          <div className="w-full max-w-[450px]">
            <Paragraph className="!font-medium" text="Push Notification" />
            <Paragraph text="Get push notification in-app to find out what is going on when you are online." />
          </div>

          <Switch />
        </div>
      </div>
      <div className="flex w-full max-w-[450px] flex-col space-y-3 sm:flex-row sm:justify-between sm:space-x-4 sm:space-y-0">
        <Button variant="filled" text="update changes" />
        <Button variant="outlined" text="Cancel" />
      </div>
    </div>
  );
};

export default NotificationView;
