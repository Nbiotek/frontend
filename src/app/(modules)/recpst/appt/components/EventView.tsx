import { EventContentArg } from '@fullcalendar/core/index.js';

export default function renderEventContent(eventInfo: EventContentArg) {
  return (
    <div className="status-badge group cursor-pointer !justify-start bg-blue-300 !text-left text-white">
      <b>{eventInfo.event.title}</b>
    </div>
  );
}
