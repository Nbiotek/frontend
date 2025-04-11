import React from 'react';

const RecentAppointmentLoader = () => {
  return (
    <div className="animate-pulse rounded-lg bg-blue-400 p-3 md:p-4">
      {/* Appointment content skeleton */}
      <div className="mx-auto mt-2 flex flex-wrap justify-start gap-2 rounded-lg bg-blue-300/50 p-4">
        {/* Date row */}
        <div className="flex w-full items-center space-x-2 sm:w-auto">
          <div className="h-6 w-6 rounded-full bg-blue-200"></div>
          <div className="h-4 w-32 rounded bg-blue-200"></div>
        </div>

        {/* Time row */}
        <div className="flex w-full items-center space-x-2 sm:w-auto">
          <div className="h-6 w-6 rounded-full bg-blue-200"></div>
          <div className="h-4 w-24 rounded bg-blue-200"></div>
        </div>

        {/* Location row */}
        <div className="flex w-full items-center space-x-2">
          <div className="h-6 w-6 rounded-full bg-blue-200"></div>
          <div className="h-4 w-48 rounded bg-blue-200"></div>
        </div>
      </div>

      <div className="mx-auto mt-4 h-px w-full max-w-md bg-blue-300"></div>

      {/* Buttons skeleton */}
      <div className="mt-4 flex flex-col items-center justify-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
        <div className="h-10 w-full rounded-md bg-white/60 sm:w-32"></div>
        <div className="h-10 w-full rounded-md bg-green-500/60 sm:w-48"></div>
      </div>

      {/* Indicator dots */}
      <div className="mt-4 flex justify-center gap-2">
        <div className="h-2 w-2 rounded-full bg-white"></div>
        <div className="h-2 w-2 rounded-full bg-white/50"></div>
        <div className="h-2 w-2 rounded-full bg-white/50"></div>
      </div>
    </div>
  );
};

export default RecentAppointmentLoader;
