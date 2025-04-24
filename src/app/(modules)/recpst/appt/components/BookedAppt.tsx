'use client';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

export default function BookedAppt() {
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={[
          { title: 'event 1', date: '2025-04-25' },
          { title: 'event 2', date: '2025-04-30' }
        ]}
      />
    </div>
  );
}
