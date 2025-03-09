'use client';
import { Text } from '@/lib/utils/Text';
import Input from '@/atoms/fields/Input';
import { Label } from '@radix-ui/react-dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';

import { usePatientInfo } from '@/hooks/patient/usePatientDashboard';

const PersonalInfoView = () => {
  const { data, isLoading } = usePatientInfo();

  if (isLoading) {
    return (
      <div className="animate-pulse">
        {/* Profile header with avatar skeleton */}
        <div className="relative h-[94px] rounded-lg bg-blue-100">
          <div className="bg-gray-200 absolute left-1/2 top-[6rem] h-[163px] w-[163px] -translate-x-1/2 -translate-y-1/2 transform rounded-full" />
        </div>

        {/* Personal Info Section */}
        <div className="mt-[7rem] rounded-lg bg-white p-[24px]">
          <Skeleton className="mx-auto mb-6 h-8 w-64" />

          <div className="space-y-6">
            {/* Name fields */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <div className="flex flex-col gap-4 sm:flex-row">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 flex-1" />
              </div>
            </div>

            {/* Email field */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>

            {/* Phone & Status */}
            <div className="space-y-2">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            </div>

            {/* Gender & DOB */}
            <div className="space-y-2">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Insurance & Contact sections */}
        <div className="mt-[24px] flex flex-col justify-between gap-[24px] md:flex-row">
          <div className="flex-1 rounded-lg bg-white p-[24px]">
            <Skeleton className="mx-auto mb-6 h-8 w-64" />
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="mb-4 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>

          <div className="flex-1 rounded-lg bg-white p-[24px]">
            <Skeleton className="mx-auto mb-6 h-8 w-64" />
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="mb-4 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="relative h-[94px] rounded-lg bg-blue-400 ">
        <div className="absolute left-1/2 top-[6rem] h-[163px] w-[163px] -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-neutral-100 " />
      </div>
      <div className="mt-[7rem] bg-transparent sm:bg-white sm:p-[10px]  md:p-[16px] lg:p-[24px]">
        <Text variant="title" weight="semibold" align="center" className="mb-4">
          {' '}
          Personal Information{' '}
        </Text>
        <div className="flex flex-col ">
          <Label className="mb-1 text-sm">Full Name</Label>
          <div className="flexBetween flex-col gap-1 sm:flex-row md:gap-4">
            <Input type="text" placeholder="First name" value={data?.data?.personal.firstName} />
            <Input type="text" placeholder="Last name" value={data?.data.personal.lastName} />
          </div>
        </div>
        <Input type="email" label="Email" value={data?.data.personal.email} />
        <div className="flexBetween flex-col gap-1 sm:flex-row md:gap-4">
          <Input type="text" label="Phone Number" value={data?.data.personal.phoneNumber} />
          <Input type="text" label="Married Status" value={data?.data.personal.maritalStatus} />
        </div>
        <div className="flexBetween flex-col gap-1 sm:flex-row md:gap-4">
          <Input type="text" label="Gender" value={data?.data.personal.gender} />
          <Input type="date" label="Date of birth" value={data?.data.personal.dateOfBirth} />
        </div>
        <div className="flexBetween flex-col gap-1 sm:flex-row md:gap-4">
          <Input type="number" label="Weight" value={data?.data.personal.weight} />
          <Input type="number" label="Height" value={data?.data.personal.height} />
        </div>
        <Input type="text" label="Primary Care Physician" />
      </div>

      <div className="mt-[24px] flex justify-between gap-[24px]">
        <div className="mb-8 flex-1 bg-transparent bg-white sm:bg-white sm:p-[10px]  md:p-[16px] lg:p-[24px]">
          <Text variant="title" weight="semibold" align="center" className="mb-4">
            {' '}
            Insurance Information{' '}
          </Text>

          <Input
            type="text"
            label="Primary Insurance Provider"
            value={data?.data.insurance.primaryInsuranceProvider}
          />
          <Input type="text" label="Insurance Plan Name" />
          <div className="flexBetween flex-col gap-1 sm:flex-row md:gap-4">
            <Input type="text" label="Policy Number" value={data?.data.insurance.policyNumber} />
            <Input type="text" label="Group Number" value={data?.data.insurance.groupNumber} />
          </div>
          <Input
            type="text"
            label="Policy Holder Name"
            value={`${data?.data.insurance.policyHolder.firstName} ${data?.data.insurance.policyHolder.lastName} `}
          />
          <Input
            type="text"
            label="Insurance Phone Number"
            value={data?.data.insurance.policyNumber}
          />
          <Input
            type="text"
            label="Policy Holder Phone number"
            value={data?.data.insurance.policyHolder.phoneNumber}
          />
        </div>
        <div className="mb-8 flex-1 bg-transparent bg-white sm:bg-white sm:p-[10px]  md:p-[16px] lg:p-[24px]">
          <Text variant="title" weight="semibold" align="center" className="mb-4">
            {' '}
            Contact Information{' '}
          </Text>

          <Input type="text" label="Home Address" value={data?.data.contact.homeAddress} />
          <div className="flexBetween flex-col gap-1 sm:flex-row md:gap-4">
            <Input type="text" label="City" value={data?.data.contact.city} />
            <Input type="text" label="State" value={data?.data.contact.state} />
          </div>
          <div className="flexBetween flex-col gap-1 sm:flex-row md:gap-4">
            <Input type="text" label="Landark" value={data?.data.contact.landMark} />
            <Input type="text" label="Postal Code" value={data?.data.contact.zipCode} />
          </div>
          <Input
            type="text"
            label="Emergency Contact Information"
            value={`${data?.data.contact.emergencyContact.firstName} ${data?.data.contact.emergencyContact.lastName}`}
          />

          <Input
            type="text"
            label="Emergency Contact Information Address"
            value={data?.data.contact.emergencyContact.address}
          />
          <Input
            type="email"
            label="Emergency Contact Information Phone"
            value={data?.data.contact.emergencyContact.phoneNumber}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoView;
