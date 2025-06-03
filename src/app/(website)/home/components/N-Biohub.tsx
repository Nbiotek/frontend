import { SubTitle, Title } from '@/atoms/typographys';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const bioHub = [
  {
    title: 'Advanced Genetic Testing',
    image: '/biohub-1.png',
    description:
      "China called the vessel's downing an excessive reaction and said it retains the right to respond...",
    url: 'https://en.wikipedia.org/wiki/The_Starry_Night'
  },
  {
    title: 'Telemedicine Consultations',
    image: '/biohub2.png',
    description:
      "China called the vessel's downing an excessive reaction and said it retains the right to respond...",
    url: 'https://en.wikipedia.org/wiki/Eiffel_Tower'
  },
  {
    title: 'Improved Probiotic Formula',
    image: '/biohub3.png',
    description:
      "China called the vessel's downing an excessive reaction and said it retains the right to respond...",
    url: 'https://en.wikipedia.org/wiki/Great_Barrier_Reef'
  },
  {
    title: 'AI Powered Health Predictions',
    image: '/biohub4.png',
    description:
      "China called the vessel's downing an excessive reaction and said it retains the right to respond...",
    url: 'https://en.wikipedia.org/wiki/Mount_Fuji'
  }
];

const BioHub = () => {
  return (
    <section
      id="bio-hub"
      className="flex min-h-screen flex-col justify-center bg-white px-4 py-20 sm:px-6 md:px-8"
      style={{
        paddingTop: 'calc(var(--header-height, 80px) + 2rem)',
        minHeight: 'calc(100vh - var(--header-height, 80px))'
      }}
    >
      <div className="mx-auto max-w-7xl space-y-4 py-6 sm:py-8 md:py-10">
        <Title text="N- BioHbub" className="text-center" />
        <p className="mx-auto max-w-2xl text-center text-sm sm:text-base">
          Stay Ahead with the Latest Product Updates. Explore new health products and services to
          improve your care.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:gap-5 md:grid-cols-2">
          {bioHub.map((bio, idx) => (
            <div
              className="flex cursor-pointer flex-col overflow-hidden rounded-lg border shadow-lg shadow-blue-400/10 transition-all duration-300 hover:shadow-xl hover:shadow-blue-400/20 sm:flex-row sm:items-center sm:space-x-4"
              key={idx}
            >
              <div className="relative h-[180px] w-full sm:h-auto sm:w-[120px] md:w-[160px] lg:w-[200px]">
                <Image
                  src={bio.image}
                  alt={bio.title}
                  width={200}
                  height={200}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col space-y-2 p-4 sm:p-3 md:space-y-3">
                <SubTitle
                  text={bio.title}
                  className="text-base font-semibold text-black sm:text-lg"
                />
                <p className="text-gray-700 text-sm sm:text-base">{bio.description}</p>
                <Link
                  href={bio.url}
                  className="ml-auto flex items-center text-sm italic text-blue-400 hover:underline"
                >
                  <span>Read more</span>
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BioHub;
