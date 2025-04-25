import React, { useState } from 'react';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    quote:
      'Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget.',
    name: 'Robert Fox',
    role: 'Patient',
    avatar: '/avatar.jpg',
    rating: 5
  },
  {
    id: 2,
    quote:
      'Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget.',
    name: 'Dianne Russell',
    role: 'Doctor',
    avatar: '/avatar.jpg',
    rating: 5
  },
  {
    id: 3,
    quote:
      'Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget.',
    name: 'Eleanor Pena',
    role: 'Patient',
    avatar: '/avatar.jpg',
    rating: 5
  }
];

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleIndices = [
    currentIndex % testimonials.length,
    (currentIndex + 1) % testimonials.length,
    (currentIndex + 2) % testimonials.length
  ];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  // Generate star rating
  const renderStars = (rating: any) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 ${i < rating ? 'text-yellow' : 'text-yellow-300'}`}
          viewBox="0 0 20 20"
          fill="#FFC300"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ));
  };

  return (
    <div className="bg-[#F2F2F2] px-4 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-start justify-between">
          <div className="max-w-2xl">
            <h2 className="text-gray-900 text-3xl font-bold">
              What Our Users Are Saying: Hear from patients and doctors about their experiences with
              NBIOTEK.
            </h2>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handlePrev}
              className="rounded-full border border-neutral-300 p-2 transition hover:bg-green-400 hover:text-white"
              aria-label="Previous testimonial"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="rounded-full border border-neutral-300 p-2  transition hover:bg-green-400 hover:text-white"
              aria-label="Next testimonial"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {visibleIndices.map((index, i) => {
            const testimonial = testimonials[index];
            return (
              <div
                key={testimonial.id}
                className={`"border-2 border-blue-400" : "" } rounded-lg bg-white
                p-6`}
              >
                <div className="mb-4">
                  <svg
                    className="h-8 w-8 text-green-100"
                    fill="'"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                  >
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                </div>
                <p className="text-gray-600 mb-6">{testimonial.quote}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="relative mr-3 h-10 w-10 overflow-hidden rounded-full">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-gray-900 font-medium">{testimonial.name}</h4>
                      <p className="text-gray-500 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex">{renderStars(testimonial.rating)}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;
