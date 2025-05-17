'use client';
import Cards from '@/atoms/Cards';
import { Text } from '@/lib/utils/Text';
import Link from 'next/link';
import Image from 'next/image';
import Spinner from '@/lib/utils/spinner';
import { Calendar, Clock, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { dateTimeUTC } from '@/utils/date';
import ScheduleBtn from '@/atoms/Buttons/ScheduleAppointBtn';
import RescheduleDialog from '../../appointment/component/RescheduleAppointmentDialog';
import RecentAppointmentLoader from '@/atoms/Loaders/RecentAppointmentLoader';

interface RecentAppointmentProps {
  isLoading: boolean;
  recentAppointments: Array<{
    id: string;
    location: {
      type: 'lab' | 'custom';
      address: string;
    };
    appointmentDate: string;
  }>;
}

const RecentAppointment = ({ isLoading, recentAppointments }: RecentAppointmentProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  // reschedule dialog
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string>('');
  const [selectedAppointmentDate, setSelectedAppointmentDate] = useState<string>('');

  const handleReschedule = (id: string, date: string) => {
    setSelectedAppointmentId(id);
    setSelectedAppointmentDate(date);
    setIsRescheduleOpen(true);
  };

  const goToSlide = (index: number) => {
    if (animating) return;

    setAnimating(true);
    setCurrentIndex(index);

    setTimeout(() => {
      setAnimating(false);
    }, 400);
  };

  const goToNext = () => {
    if (recentAppointments.length <= 1) return;
    const newIndex = currentIndex === recentAppointments.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  };

  const goToPrev = () => {
    if (recentAppointments.length <= 1) return;
    const newIndex = currentIndex === 0 ? recentAppointments.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  };

  // carousel
  useEffect(() => {
    if (recentAppointments.length <= 1) return;

    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, recentAppointments.length]);

  return (
    <>
      <div className="w-full bg-white p-4 md:w-full md:p-5 lg:w-2/3 lg:p-6">
        <div className="mb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <Text weight="semibold" variant="title">
            Upcoming Appointment
          </Text>
          <Link href="/patient/appointment/upcoming" className="text-sm text-[#EC7665] underline">
            View All
          </Link>
        </div>
        <div className="relative mt-2 w-full rounded-lg bg-blue-400 p-3 md:p-4">
          <Image
            src="/bell.svg"
            width={50}
            height={40}
            alt="Appointment Notification"
            className="absolute -top-5 right-4 hidden h-auto w-auto sm:block md:-right-3 lg:-right-4"
          />
          {isLoading ? (
            <RecentAppointmentLoader />
          ) : recentAppointments.length > 0 ? (
            <div className="relative">
              {/* Carousel navigation buttons */}
              {recentAppointments.length > 1 && (
                <>
                  <button
                    onClick={goToPrev}
                    className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/30 p-1 text-white hover:bg-white/50"
                    aria-label="Previous appointment"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={goToNext}
                    className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/30 p-1 text-white hover:bg-white/50"
                    aria-label="Next appointment"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              <div className="mx-auto max-w-80 overflow-hidden">
                <div
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {recentAppointments.map((item, index) => (
                    <div key={item.id} className="w-full flex-shrink-0  px-2 ">
                      <div className="mx-auto mt-2 flex w-fit flex-wrap justify-start gap-2 rounded-lg bg-[#EAFFEA] p-2">
                        <Text
                          variant="small"
                          weight="thin"
                          className="flex w-full items-center space-x-1 text-neutral-1000 sm:w-auto"
                        >
                          <Calendar size={23} />
                          <span className="truncate">
                            {dateTimeUTC(item.appointmentDate, false)}
                          </span>
                        </Text>
                        <Text
                          variant="small"
                          weight="thin"
                          className="flex w-full items-center space-x-1 text-neutral-1000 sm:w-auto"
                        >
                          <Clock size={23} />
                          <span className="truncate">
                            {dateTimeUTC(item.appointmentDate).split(', ')[2]}
                          </span>
                        </Text>
                        <Text
                          variant="small"
                          weight="thin"
                          className="flex w-full items-center space-x-1 text-neutral-1000"
                        >
                          <MapPin size={23} className="flex-shrink-0" />
                          <span className="max-w-40 truncate">{item.location.address}</span>
                        </Text>
                      </div>
                      <hr className="mx-auto mt-4 w-full max-w-md" />
                      <div className="mt-2 flex flex-col items-center justify-center space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                        <ScheduleBtn
                          title="View details"
                          className="w-full bg-white sm:w-auto"
                          onClick={() =>
                            (window.location.href = `/patient/appointment/details/${item.id}`)
                          }
                        />
                        <ScheduleBtn
                          title="Reschedule Appointment"
                          className="w-full bg-[#3B883E] text-white hover:bg-green-200/20 sm:w-auto"
                          onClick={() => handleReschedule(item.id, item.appointmentDate)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {recentAppointments.length > 1 && (
                <div className="mt-4 flex justify-center gap-2">
                  {recentAppointments.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`h-2 w-2 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-white/50'}`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="py-8 text-center text-white">
              <p className="mb-4">NO UPCOMING APPOINTMENT</p>
              <ScheduleBtn
                title="Book New Appointment"
                className="mx-auto bg-white text-blue-400 hover:bg-white/90"
                onClick={() => (window.location.href = '/patient/appointment/booking')}
              />
            </div>
          )}
        </div>

        <RescheduleDialog
          open={isRescheduleOpen}
          onClose={() => setIsRescheduleOpen(false)}
          appointmentId={selectedAppointmentId}
          currentDate={selectedAppointmentDate}
        />
      </div>
    </>
  );
};

export default RecentAppointment;
