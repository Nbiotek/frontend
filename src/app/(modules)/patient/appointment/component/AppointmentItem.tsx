'use client';

import { Text } from '@/lib/utils/Text';
import { MapPin } from 'lucide-react';
import DropDownAction from '@/components/common/dropdownActions';
import { dateTimeUTC } from '@/utils/date';
import Button from '@/atoms/Buttons';
import { Calendar } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import ViewDetailsDropDown from './ViewDetailsDropDown';
import RescheduleDialog from './RescheduleAppointmentDialog';
import PaymentDialog from '../booking/components/PendingAppointmentPayment';

const AppointmentItem = (props: AppointmentItemProps) => {
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string>('');
  const [selectedAppointmentDate, setSelectedAppointmentDate] = useState<string>('');

  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<{
    id: string;
    title: string;
    price: number;
  }>({ id: '', title: '', price: 0 });

  const handlePayment = (appointment: AppointmentItem) => {
    setPaymentDetails({
      id: appointment.id,
      title: appointment.title,
      price: appointment?.totalAmount || 0
    });
    setIsPaymentOpen(true);
  };

  const handleReschedule = (id: string, date: string) => {
    setSelectedAppointmentId(id);
    setSelectedAppointmentDate(date);
    setIsRescheduleOpen(true);
  };

  function getStatus(status: string) {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-green-400';
      case 'PENDING':
        return 'bg-red-400';
      default:
        return 'bg-blue-300';
    }
  }
  const appointments =
    props.type === 'upcoming'
      ? props.data?.upcomingAppointments
      : props.type === 'pending'
        ? props.data?.pendingAppointments
        : props.data?.pastAppointments;

  if (!appointments || appointments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg bg-white py-16 shadow-sm">
        <div className="bg-gray-100 mb-4 flex h-20 w-20 items-center justify-center rounded-full">
          <Calendar className="text-gray-400 h-10 w-10" />
        </div>
        <h3 className="mb- text-center text-lg font-medium">No appointments found</h3>
        <p className="text-gray-500 mb-6 max-w-sm text-center">
          You don&apos;t have any appointments. When you book appointments, they will appear here.
        </p>
        <Link
          className="w-full rounded-lg bg-blue-400 py-3 text-center text-base font-semibold text-white hover:bg-blue-400/60"
          href="/patient/appointment/booking"
        >
          Book an Appointment
        </Link>
      </div>
    );
  }

  const IsDateToday = (date: string) => {
    const dateNow = new Date();

    if (dateNow.toISOString() === date) {
      return 'Today';
    } else {
      return dateTimeUTC(date, false);
    }
  };

  return (
    <>
      {appointments.map((appointment) => (
        <div className="pb-3" key={appointment.id}>
          <Text variant="h4" weight="semibold" className="mb-3 mt-2 border-b pb-3">
            {IsDateToday(appointment.appointmentDate)}
            {/* {dateTimeUTC(appointment.appointmentDate)} */}
          </Text>
          <div className="flex items-start space-x-3">
            <div
              className={`hidden h-7 w-7 rounded-full ${getStatus(appointment.status)} sm:flex`}
            />
            <div className="flex w-full flex-col  space-y-2">
              <div className=" flex w-full items-start justify-between">
                <div className="space-y-3">
                  <Text>{appointment.title}</Text>
                  <p>{appointment.description}</p>

                  <div className=" w-[250px]">
                    {appointment.paymentStatus === 'PENDING' ? (
                      <Button
                        variant="outlined"
                        className="bg-green-400 text-white"
                        onClick={() => handlePayment(appointment)}
                      >
                        Make Payment
                      </Button>
                    ) : (
                      <Button
                        variant="filled"
                        onClick={() =>
                          handleReschedule(appointment.id, appointment.appointmentDate)
                        }
                      >
                        Reschedule{' '}
                      </Button>
                    )}
                  </div>
                </div>
                <ViewDetailsDropDown id={appointment.id} />
              </div>

              <div className="sm:flexBetween  w-full pt-4">
                <div>
                  <MapPin className="inline" /> ({dateTimeUTC(appointment.appointmentDate, false)}
                  ){' '}
                </div>
                <span>{dateTimeUTC(appointment.appointmentDate).split(', ')[2]}</span>
              </div>
            </div>
          </div>
        </div>
      ))}

      <RescheduleDialog
        open={isRescheduleOpen}
        onClose={() => setIsRescheduleOpen(false)}
        appointmentId={selectedAppointmentId}
        currentDate={selectedAppointmentDate}
      />

      <PaymentDialog
        open={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        appointmentId={paymentDetails.id}
        appointmentDetails={{
          title: paymentDetails.title,
          price: paymentDetails.price
        }}
      />
    </>
  );
};

export default AppointmentItem;
