'use client';
import { useEffect } from 'react';
import { PromptsContainer } from '@/atoms/ParentPrompts/Prompts';
import { setupFCM } from '@/app/fcm';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/store';
import Button from '@/atoms/Buttons';
import { Paragraph } from '@/atoms/typographys';

const NotificationPrompt = () => {
  const {
    NotificationStore: { showPrompt, togglePrompt, setLastPromptTimer, checkNotificationInterval },
    AuthStore: { user }
  } = useStore();

  function askForNotificationPermission() {
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          setupFCM(user.uuid!);
        } else {
          setLastPromptTimer(new Date().getTime());
        }
      });
    } else {
      console.error('This browser does not support notifications.');
    }
  }

  useEffect(() => {
    checkNotificationInterval(setupFCM);
  }, [checkNotificationInterval]);

  return (
    <PromptsContainer
      isOpen={showPrompt && !!user.uuid}
      closeModal={() => {
        setLastPromptTimer(new Date().getTime());
        togglePrompt();
      }}
      title="Enable notifications"
    >
      <div className="flex flex-col space-y-3">
        <Paragraph
          className="text-neutral-500"
          text="Enable notifications to get the latest updates, alerts, and personalized content directly from us. Never miss important news, offers, or events. You can opt-out anytime in your settings."
        />

        <div className="flex max-w-[320px] items-center justify-start space-x-2">
          <Button
            type="button"
            variant="outlined"
            text="No, thanks"
            onClick={() => {
              setLastPromptTimer(new Date().getTime());
              togglePrompt();
            }}
          />
          <Button
            type="button"
            variant="filled"
            text="Yes, enable"
            onClick={() => {
              togglePrompt();
              askForNotificationPermission();
              setLastPromptTimer(new Date().getTime());
            }}
          />
        </div>
      </div>
    </PromptsContainer>
  );
};

export default observer(NotificationPrompt);
