import { action, makeObservable, observable } from 'mobx';
import { RootStore } from '..';
import store from 'store2';
import { Mangle } from '@/constants/mangle';

const persist = <T = string>(key: string, value: T) => {
  store.namespace('notify').local.set(key, value);
  return value;
};

const get = <T = string>(key: string, fallback?: T) => {
  return store.namespace('notify').local.get(key, fallback) as T;
};

const del = <T = string>(key: string, fallback?: T) => {
  return store.namespace('notify').local.remove(key, fallback) as T;
};

class NotificationStore {
  rootStore: RootStore;
  readMoreItem = '';
  unReadNotifyCount: number = 0;

  lastPromptTime = get<number>(Mangle.NOTIFY_PROMPT_TIMER, 0);
  showPrompt = false;

  ONE_WEEK_IN_MS = process.env.NODE_ENV === 'development' ? 3000 : 7 * 24 * 60 * 60 * 1000;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeObservable(this, {
      lastPromptTime: observable,
      showPrompt: observable,
      readMoreItem: observable,
      unReadNotifyCount: observable,

      setLastPromptTimer: action.bound,
      checkNotificationInterval: action.bound,
      togglePrompt: action.bound,
      openPrompt: action.bound,
      clearTimeoutOnUnmount: action.bound,
      clearFCMToken: action.bound,
      setReadMoreItem: action.bound,
      setNotifyUnreadCount: action.bound,
      resetNotification: action.bound
    });
  }

  setLastPromptTimer(_time: number) {
    this.lastPromptTime = persist<number>(Mangle.NOTIFY_PROMPT_TIMER, _time);
  }

  checkNotificationInterval(cbFn: (user_uuid: string) => void) {
    const currentTime = new Date().getTime();
    const TWO_MINUTES_DELAY = process.env.NODE_ENV === 'development' ? 3000 : 50000;

    let timeoutId: NodeJS.Timeout | null = null;

    if (!this.lastPromptTime || currentTime - this.lastPromptTime > this.ONE_WEEK_IN_MS) {
      if (window.Notification) {
        if (window.Notification.permission !== 'granted') {
          setTimeout(() => {
            this.showPrompt = true;
          }, TWO_MINUTES_DELAY);

          this.clearTimeoutOnUnmount(timeoutId);
        } else {
          const user_uuid = this.rootStore.AuthStore.user?.uuid;
          user_uuid && cbFn(user_uuid);
        }
      }
    }
  }

  togglePrompt() {
    this.showPrompt = !this.showPrompt;
  }

  openPrompt() {
    this.showPrompt = true;
  }

  clearTimeoutOnUnmount(_timeoutId: NodeJS.Timeout | null) {
    if (_timeoutId) {
      clearTimeout(_timeoutId);
    }
  }

  clearFCMToken() {
    store.local.remove(Mangle.FCM_TOKEN.replace(':id', this.rootStore.AuthStore.user.uuid!));
  }

  setReadMoreItem(_uuid: string) {
    this.readMoreItem = _uuid;
  }

  setNotifyUnreadCount(_count: number) {
    this.unReadNotifyCount = _count;
  }

  resetNotification(cb?: () => void) {
    this.readMoreItem = '';
    cb && cb();
  }
}

export default NotificationStore;
