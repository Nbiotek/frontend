'use client';
import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import renderEventContent from './EventView';
import { useFetchAprvdAppt } from '@/hooks/recpst/useFetchAppApt';
import { useStore } from '@/store';
import { AppModals } from '@/store/AppConfig/appModalTypes';

export type TEventInfo = { title: string; date: string; id: string };

export default function BookedAppt() {
  const [events, setEvents] = useState<Array<TEventInfo>>([]);
  const { data, isLoading } = useFetchAprvdAppt({});
  const {
    AppConfigStore: { toggleModals }
  } = useStore();

  useEffect(() => {
    if (!isLoading && data !== undefined) {
      const eventContentArg = data.appointment.map((appt) => ({
        title: appt.title,
        date: appt.appointmentDate,
        id: appt.id
      })) as Array<TEventInfo>;
      setEvents(eventContentArg);
    }
  }, [data, isLoading]);

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
        events={events}
        eventClick={function (info) {
          info.jsEvent.preventDefault();
          toggleModals({ name: AppModals.SINGLE_APPOINTMENT, open: true, id: info.event.id });
        }}
      />
    </div>
  );
}
