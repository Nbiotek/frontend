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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="w-full overflow-x-hidden bg-blue-400/50 py-8 md:py-[4rem]" id="home">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="w-full md:w-1/2">
            <div className="flex flex-col space-y-4 md:space-y-6">
              <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl md:text-4xl">
                <span className="text-blue-400">Streamline</span> Your Healthcare and Research
                Experience with <span className="text-blue-400">NBIOTEK.</span>
              </h1>
              <p className="text-sm md:text-base">
                Get instant access to your medical test and result, and the latest Research &
                Development in one place
              </p>

              <div className="flex w-full flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                <Button
                  variant="filled"
                  className="rounded-sm px-4 py-2 text-sm sm:px-5 sm:py-3 md:px-6 md:py-4"
                >
                  Book a Test
                </Button>
                <Button
                  variant="outlined"
                  className="rounded-sm border-none bg-green-400 px-4 py-2 text-sm text-white hover:bg-green-400/60 sm:px-5 sm:py-3 md:px-6 md:py-4"
                >
                  Learn More About R&D
                </Button>
              </div>

              <div className="xs:grid-cols-2 mt-4 grid w-full grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-2 md:mt-6">
                {analytics.map((item, index) => (
                  <div
                    key={index}
                    className="flex w-full items-center space-x-2 rounded-lg bg-neutral-100 px-3 py-2 shadow-sm"
                  >
                    <Image
                      src={item.icons}
                      alt={item.title}
                      width={25}
                      height={30}
                      className="h-[25px] w-[25px] object-contain"
                    />
                    <div>
                      <Text variant="h4" className="text-blue-400">
                        {item.number}
                      </Text>
                      <Text className="text-sm text-neutral-800">{item.title}</Text>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative w-full md:w-1/2">
            <div className="relative mx-auto h-[300px] w-full overflow-hidden rounded-xl sm:h-[350px] md:h-[400px] lg:h-[500px]">
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
                    priority={index === currentSlide}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute left-0 top-0 flex h-full w-full flex-col justify-end">
                    <div className="w-full space-y-2 bg-gradient-to-t from-black/80 via-black/50 to-transparent px-4 pb-4 pt-8 text-white md:space-y-4 md:px-5 md:pb-5 md:pt-12">
                      <Text variant="title" className="text-lg md:text-xl lg:text-2xl">
                        {image.title}
                      </Text>
                      <p className="text-sm md:text-base">{image.description}</p>
                      <Button
                        variant="outlined"
                        className={`w-24 border-none text-sm md:w-32 ${image.buttonColor}`}
                      >
                        {image.buttonText}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute left-0 right-0 top-1/2 flex -translate-y-1/2 justify-between px-2 md:px-4">
              <button
                onClick={goToPrevSlide}
                className="rounded-full bg-white/30 p-1 text-white transition hover:bg-white/50 md:p-2"
                aria-label="Previous slide"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 md:h-6 md:w-6"
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
                className="rounded-full bg-white/30 p-1 text-white transition hover:bg-white/50 md:p-2"
                aria-label="Next slide"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 md:h-6 md:w-6"
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

            {/* Carousel inicators */}
            <div className="absolute bottom-2 left-0 right-0">
              <div className="flex justify-center space-x-2">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-1.5 rounded-full transition-all md:h-2 ${
                      index === currentSlide
                        ? 'w-3 bg-neutral-300 md:w-4'
                        : 'w-1.5 bg-white/50 md:w-2'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
