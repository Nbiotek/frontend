// components/appointments/AppointmentSummary.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Phone,
  User,
  FileText,
  CheckCircle,
  AlarmClock
} from 'lucide-react';
import { dateTimeUTC } from '@/utils/date';
import Button from '@/atoms/Buttons';
import { Text } from '@/lib/utils/Text';
import Cards from '@/atoms/Cards';
import { useGetAppointmentById } from '@/hooks/patient/useAppoitment';
import { useParams } from 'next/navigation';
import Spinner from '@/lib/utils/spinner';

interface AppointmentDetailsProp {
  data: TShowAppointment;
}

const AppointmentSummary = ({ data: appointmentData }: AppointmentDetailsProp) => {
  const router = useRouter();
  const params = useParams();
  const appointmentId = params.id as string;
  const { data, isLoading } = useGetAppointmentById(appointmentId);
  const [appointment, setAppointment] = useState<AppointmentItem | null>(null);

  useEffect(() => {
    if (data && !isLoading) {
      setAppointment(data.data);
    }
  }, [data, isLoading]);

  const handleBack = () => {
    router.back();
  };

  console.log(appointment);

  if (isLoading) {
    return <Spinner />;
  }

  if (!appointment) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center">
        <div className="text-xl">Appointment not found</div>
        <Button variant="outlined" className="mt-4" onClick={handleBack}>
          Go Back
        </Button>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'text-green-300';
      case 'PENDING':
        return 'text-yellow-500';
      case 'COMPLETED':
        return 'text-blue-500';
      case 'CANCELLED':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="container mx-auto max-w-4xl bg-white px-4 py-8">
      <div className="mb-6 flex items-center">
        <button
          onClick={handleBack}
          className="text-blue-500 mr-4 flex items-center hover:underline"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back
        </button>
        <h1 className="text-2xl font-bold">Appointment Summary</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Left column - Appointment details */}
        <div className="md:col-span-2">
          <Cards className="flex flex-col space-y-6 p-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <Text variant="h3" weight="semibold">
                  {appointment.title}
                </Text>
                {/* <p className="text-gray-600">{appointmentData.data.description}</p> */}
              </div>
              <div
                className={`rounded-full px-4 py-1 ${getStatusColor(appointment.status)} border bg-opacity-10`}
              >
                {appointment.status}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-start">
                <Calendar className="text-blue-500 mr-3 h-5 w-5" />
                <div>
                  <Text weight="semibold">Date</Text>
                  <p>{dateTimeUTC(appointment.appointmentDate, false)}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="text-blue-500 mr-3 h-5 w-5" />
                <div>
                  <Text weight="semibold">Time</Text>
                  <p>{dateTimeUTC(appointment.appointmentDate).split(', ')[2]}</p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="text-blue-500 mr-3 h-5 w-5" />
                <div>
                  <Text weight="semibold">Location</Text>
                  <p>{appointment.location.address}</p>
                </div>
              </div>

              <div className="flex items-start">
                <User className="text-blue-500 mr-3 h-5 w-5" />
                <div>
                  <Text weight="semibold">Patient</Text>
                  <p>{appointment.patientName}</p>
                </div>
              </div>
            </div>

            {/* Tests Section */}
            {appointment.tests && appointment.tests.length > 0 && (
              <div className="border-t pt-4">
                <Text variant="h4" weight="semibold" className="mb-3">
                  Requested Tests
                </Text>
                <div className="space-y-3">
                  {appointment.tests.map((test: any, index: number) => (
                    <div key={index} className="bg-gray-50 rounded-lg border p-3">
                      <div className="flex items-center justify-between">
                        <Text weight="semibold">{test.name}</Text>
                        <span className={getStatusColor(test.status)}>{test.status}</span>
                      </div>
                      <p className="text-gray-600 text-sm">{test.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Cards>
        </div>

        {/* Right column - Payment & Actions */}
        <div className="space-y-6">
          <Cards className="p-6">
            <Text variant="h4" weight="semibold" className="mb-4">
              Payment Status
            </Text>
            <div
              className={`flex items-center ${appointment.paymentStatus === 'APPROVED' ? 'text-green-500' : 'text-yellow-500'}`}
            >
              <CheckCircle className="mr-2 h-5 w-5" />
              <span>{appointment.paymentStatus}</span>
            </div>
          </Cards>

          <Cards className="p-6">
            <Text variant="h4" weight="semibold" className="mb-4">
              Actions
            </Text>
            <div className="space-y-3">
              {appointment.paymentStatus === 'PENDING' ? (
                <Button variant="light" className="w-full">
                  Make Payment
                </Button>
              ) : (
                <Button variant="filled" className="w-full">
                  Reschedule Appointment
                </Button>
              )}
              <Button variant="outlined" className="w-full">
                Contact Support
              </Button>
            </div>
          </Cards>

          <Cards className="p-6">
            <Text variant="h4" weight="semibold" className="mb-4">
              Reminders
            </Text>
            <div className="flex items-start">
              <AlarmClock className="text-blue-500 mr-2 h-5 w-5" />
              <div className="text-sm">
                <p className="font-medium">Arrive 15 minutes early</p>
                <p className="text-gray-600">Please bring your ID and insurance card</p>
              </div>
            </div>
          </Cards>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSummary;
