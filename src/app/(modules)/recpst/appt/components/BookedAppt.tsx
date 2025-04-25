'use client';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import renderEventContent from './EventView';

export default function BookedAppt() {
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        eventContent={renderEventContent}
        headerToolbar={{
          right: 'today prev,next',
          center: 'title',
          left: 'timeGridWeek,dayGridMonth'
        }}
        events={[
          { title: 'Typhoid Test', date: '2025-04-24', extendedProps: { priority: 'HIGH' } },
          {
            title: 'Cardiovascular, Muscle and thigh',
            date: '2025-04-26',
            extendedProps: { priority: 'MEDIUM' }
          },
          { title: 'Typhoid Test', date: '2025-05-08', extendedProps: { priority: 'LOW' } },
          { title: 'Typhoid Test', date: '2025-04-24', extendedProps: { priority: 'HIGH' } },
          { title: 'Typhoid Test', date: '2025-04-26', extendedProps: { priority: 'MEDIUM' } },
          { title: 'Typhoid Test', date: '2025-05-08', extendedProps: { priority: 'LOW' } },
          { title: 'Typhoid Test', date: '2025-04-24', extendedProps: { priority: 'HIGH' } },
          { title: 'Typhoid Test', date: '2025-04-26', extendedProps: { priority: 'MEDIUM' } },
          { title: 'Typhoid Test', date: '2025-05-08', extendedProps: { priority: 'LOW' } }
        ]}
      />
    </div>
  );
}
