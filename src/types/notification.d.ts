import { EnumNotificationType } from '@/constants/mangle';

type TNotificationDatum = {
  create_time: string;
  description: string;
  reference_id: string;
  is_viewed: false;
  name: string;
  notification_type: EnumNotificationType;
  update_time: string;
  user_id: number;
  uuid: string;
};

type TGetAllNotificationRes = INBTServerResp<Array<TNotificationDatum>>;
