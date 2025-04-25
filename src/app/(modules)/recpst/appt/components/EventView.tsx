import { EnumTestPriority } from '@/atoms/Buttons/Status';
import { EventContentArg } from '@fullcalendar/core/index.js';

export default function renderEventContent(eventInfo: EventContentArg) {
  const style = () => {
    switch (eventInfo.event.extendedProps.priority) {
      // Test priority
      case EnumTestPriority.HIGH:
        return 'bg-darkRed';
      case EnumTestPriority.MEDIUM:
        return 'bg-amber';
      case EnumTestPriority.LOW:
        return 'bg-teal';
      default:
        return '';
    }
  };

  return (
    <div className={`status-badge group !justify-start !text-left text-white ${style()}`}>
      <b>{eventInfo.event.title}</b>
    </div>
  );
}
