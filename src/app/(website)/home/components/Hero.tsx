import Button from '@/atoms/Buttons';
import { Text } from '@/lib/utils/Text';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const analytics = [
  {
    title: 'Technicians',
    number: 1000,
    icons: '/test.png'
  },
  {
    title: 'Doctors',
    number: 1000,
    icons: '/doctor.png'
  },
  {
    title: 'Customers',
    number: 6000,
    icons: '/customer.png'
  }
];

const carouselImages = [
  {
    src: '/hero1.png',
    title: 'Conference',
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati illum rem fugiat laborum hic fuga sint',
    buttonText: 'View More',
    buttonColor: 'bg-red-300'
  },
  {
    src: '/hero2.png',
    title: 'Research',
    description:
      'Our cutting-edge research facilities enable groundbreaking discoveries in healthcare and biotechnology',
    buttonText: 'Learn More',
    buttonColor: 'bg-blue-300'
  },
  {
    src: '/hero3.png',
    title: 'Laboratory',
    description:
      'State-of-the-art equipment and expert technicians ensure accurate and reliable test results',
    buttonText: 'Tour Lab',
    buttonColor: 'bg-green-300'
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Navigation functions
  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const goToSlide = (index: any) => {
    setCurrentSlide(index);
  };

  return (
    <div className="bg-blue-400/50 py-[4rem]" id="home">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
        <div className="flex w-[50%] flex-col space-y-6">
          <h1 className="text-4xl font-bold text-neutral-900">
            <span className="text-blue-400"> Streamline </span>Your Healthcare and Research
            Experience with <span className="text-blue-400"> NBIOTEK.</span>
          </h1>
          <p className="text-md">
            Get instant access to your medical test and result, and the latest Research &
            Development in one place{' '}
          </p>
          <div className="flex w-[500px] space-x-2">
            <Button variant="filled" className="rounded-sm px-[10px] py-4">
              Book a Test
            </Button>
            <Button
              variant="outlined"
              className="rounded-sm border-none bg-green-400 text-white hover:bg-green-400/60"
            >
              Learn More About R&D
            </Button>
          </div>
          <div className="flex w-[450px] items-center justify-between">
            {analytics.map((item, index) => (
              <div
                key={index}
                className="flex w-fit items-center space-x-2 space-y-2 rounded-lg bg-neutral-100 px-3 py-1.5 shadow-sm"
              >
                <Image src={item.icons} alt="Logo" width={25} height={30} />
                <div className="">
                  <Text variant="h4" className="text-blue-400">
                    {item.number}
                  </Text>
                  <Text className="text-neutral-800">{item.title}</Text>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Carousel image section */}
        <div className="relative ">
          <div className="relative h-[500px] w-[600px] overflow-hidden rounded-xl">
            {carouselImages.map((image, index) => (
              <div
                key={index}
                className={`absolute h-full w-full transition-opacity duration-500 ${
                  index === currentSlide ? 'opacity-100' : 'pointer-events-none opacity-0'
                }`}
              >
                <Image
                  src={image.src}
                  alt={`Slide ${index + 1}`}
                  width={700}
                  height={700}
                  className="h-[500px] w-[600px] object-cover"
                />
                <div className="absolute left-0 top-0 flex h-full w-full flex-col justify-end">
                  {/* overlay at the bottom */}
                  <div className="w-full space-y-4 bg-gradient-to-t from-black/80 via-black/50 to-transparent px-5 pb-5 pt-12 text-white">
                    <Text variant="title">{image.title}</Text>
                    <p className="max-w-[500px]">{image.description}</p>
                    <Button variant="outlined" className={`w-32 border-none ${image.buttonColor}`}>
                      {image.buttonText}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel controls */}
          <div className="absolute left-0 right-0 top-1/2 flex -translate-y-1/2 justify-between px-4">
            <button
              onClick={goToPrevSlide}
              className="rounded-full bg-white/30 p-2 text-white transition hover:bg-white/50"
              aria-label="Previous slide"
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
              onClick={goToNextSlide}
              className="rounded-full bg-white/30 p-2 text-white transition hover:bg-white/50"
              aria-label="Next slide"
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

          {/* Carousel indicators */}
          <div className="absolute bottom-2 left-0 right-0">
            <div className="flex justify-center space-x-2">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 w-2 rounded-full transition-all ${
                    index === currentSlide ? 'w-4 bg-neutral-300' : 'bg-white/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
