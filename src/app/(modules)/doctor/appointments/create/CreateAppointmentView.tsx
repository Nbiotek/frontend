'use client';
import { Text } from '@/lib/utils/Text';
import { Title } from '@/atoms/typographys';
import Cards from '@/atoms/Cards';
import Input from '@/atoms/fields/Input';
import Button from '@/atoms/Buttons';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useState, useEffect } from 'react';

import { useStore } from '@/store';

import AppointmentConfirmation from './components/AppointmentConfirmation';
import TestModalDialog from '@/app/(modules)/patient/appointment/booking/components/TestModal';
import { DateTimePicker } from '@/components/ui/DateTimePicker';

type LocationType = 'Lab' | 'Custom';

const CreateAppointmentView = () => {
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [isBookingConfirmationDialogOpen, setIsBookingConfirmationDialogOpen] = useState(false);

  const [errors, setErrors] = useState<Partial<Record<keyof BookingForm, string>>>({});

  const {
    CartStore: { items, total }
  } = useStore();

  const handleTestModal = () => {
    setIsTestModalOpen(true);
  };

  const [formData, setFormData] = useState<BookingForm>({
    fullName: '',
    email: '',
    phoneNumber: '',
    location: {
      type: 'Lab' as LocationType,
      address: 'Medicare Hospital, 18 Iwaya Rd, Lagos'
    },
    availableDate: new Date(),
    paymentMethod: 'via_card',
    testRequests: []
  });

  // Update testRequests when cart items change
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      testRequests: items.map((item) => ({
        entityType: item.type.toUpperCase(),
        testId: item.id
      }))
    }));
  }, [items, isTestModalOpen]);

  const validateForm = () => {
    const newErrors: Partial<Record<keyof BookingForm, string>> = {};
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    }
    if (!formData.location.address.trim()) {
      newErrors.location = ' Location is  required';
    }

    if (!formData.availableDate) {
      newErrors.availableDate = 'Please select a date';
    } else {
      // Convert the ISO string back to a Date object for comparison
      const selectedDate = new Date(formData.availableDate);
      selectedDate.setHours(0, 0, 0, 0); // Remove time component

      if (selectedDate < currentDate) {
        newErrors.availableDate = 'Date cannot be in the past';
      }
    }

    if (formData.testRequests.length === 0) {
      newErrors.testRequests = 'Please select at least one test';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBookingConfirmation = () => {
    if (validateForm()) {
      console.log('Form data at submission:', formData);
      setIsBookingConfirmationDialogOpen(true);
    }
  };

  const handleLocationChange = (value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      location: {
        type: value as LocationType,
        address: value === 'Lab' ? 'Medicare Hospital, 18 Iwaya Rd, Lagos' : ''
      }
    }));
  };

  const handlePaymentMethod = (value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      paymentMethod: value
    }));
  };

  const handleDateSelect = (date: Date | undefined) => {
    setFormData((prev: any) => ({
      ...prev,
      availableDate: date ? date.toISOString() : undefined
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev: any) => ({
      ...prev,
      [name]: value
    }));
  };
  return (
    <>
      <Cards className="p-[5px] sm:bg-white sm:p-[10px] md:p-[45px] ">
        <Title text="Book appointment for patients" />
        <Text variant="body" className="mb-4">
          So our team can reach out to you on time
        </Text>
        <form action="" id="bookingForm">
          <div className="flex flex-col gap-1 md:flex-row md:gap-4">
            <Input
              type="text"
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              error={errors.fullName}
            />
            <div className="w-[100%]">
              <Label className="pb-10 font-normal">Available Date</Label>
              <DateTimePicker
                value={formData.availableDate}
                hourCycle={12}
                onChange={handleDateSelect}
                hidden={{ before: new Date() }}
              />
              {errors.availableDate && (
                <span className="mt-1 text-sm text-red-500">{errors.availableDate}</span>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1 md:flex-row md:gap-4">
            <Input
              type="text"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
            />
            <Input
              type="text"
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              error={errors.phoneNumber}
            />
          </div>
          <div className="flex flex-col gap-1 md:flex-row md:gap-4">
            <div className="flex w-full flex-col ">
              <Label className="mb-2">Available Test</Label>
              <Button
                variant="secondary"
                type="button"
                className="bg-blue-50/50"
                onClick={handleTestModal}
              >
                Select Test
              </Button>

              {items.length === 0 ? (
                <></>
              ) : (
                <>
                  <div className="mt-3 flex h-[100px] flex-col overflow-auto border-2">
                    {items.map((item) => (
                      <div className="flexBetween items-center p-3" key={item.id}>
                        <p>
                          {item.item.name}{' '}
                          <span className="ml-5 text-red-200">
                            {' '}
                            ₦{item.item.price.toLocaleString()}
                          </span>
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {errors.testRequests && (
                <div className="mt-1 text-sm text-red-500">{errors.testRequests}</div>
              )}
            </div>
            <div className="flex w-full flex-col">
              <Label className="mb-3">Location</Label>
              <RadioGroup value={formData.location.type} onValueChange={handleLocationChange}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Lab" id="r1" />
                  <Label htmlFor="r1">Lab</Label>
                  <div className="rounded-md bg-neutral-300/30 p-3">
                    Medicare Hospital, 18 Iwaya Rd, Lagos
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Custom" id="r2" />
                  <Label htmlFor="r2">Custom</Label>
                  <div className="w-80  rounded-md pt-4">
                    <Input
                      type="text"
                      placeholder="Enter your location"
                      value={formData.location.type === 'Custom' ? formData.location.address : ''}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          location: {
                            ...prev.location,
                            address: e.target.value
                          }
                        }))
                      }
                    />
                  </div>
                  {errors.location && (
                    <div className="mt-1 text-sm text-red-500">{errors.location}</div>
                  )}
                </div>
              </RadioGroup>
            </div>
          </div>
          <div className="mt-3 w-full">
            <div className="flex w-full flex-col">
              <Label className="mb-3">Payment Method</Label>
              <RadioGroup
                value={formData.paymentMethod}
                onValueChange={handlePaymentMethod}
                className="flex"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="via_card" id="r3" />
                  <Label htmlFor="r3">Online</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="location" id="r4" />
                  <Label htmlFor="r4">Pay at location</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <div className="mt-5">
            <Button
              variant="filled"
              type="button"
              text="Confirm"
              onClick={handleBookingConfirmation}
              disabled={items.length === 0}
              form="bookingForm"
            />
          </div>
        </form>
      </Cards>
      <TestModalDialog open={isTestModalOpen} onClose={() => setIsTestModalOpen(false)} />
      {isBookingConfirmationDialogOpen && (
        <AppointmentConfirmation
          open={isBookingConfirmationDialogOpen}
          onClose={() => setIsBookingConfirmationDialogOpen(false)}
          bookingData={formData}
          // onConfirm={handleFinalBooking}
        />
      )}
    </>
  );
};

export default CreateAppointmentView;
