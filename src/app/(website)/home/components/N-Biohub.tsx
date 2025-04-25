import { SubTitle, Title } from '@/atoms/typographys';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const bioHub = [
  {
    title: 'Advanced Genetic Testing',
    image: '/biohub-1.png',
    description:
      'China called the vessel’s downing “an excessive reaction” and said it “retains the right to respond...',
    url: 'https://en.wikipedia.org/wiki/The_Starry_Night'
  },
  {
    title: 'Telemedicine Consultations',
    image: '/biohub2.png',
    description:
      'China called the vessel’s downing “an excessive reaction” and said it “retains the right to respond...',
    url: 'https://en.wikipedia.org/wiki/Eiffel_Tower'
  },
  {
    title: 'Improved Probiotic Formula',
    image: '/biohub3.png',
    description:
      'China called the vessel’s downing “an excessive reaction” and said it “retains the right to respond...',
    url: 'https://en.wikipedia.org/wiki/Great_Barrier_Reef'
  },
  {
    title: 'AI Powered Health Predictions',
    image: '/biohub4.png',
    description:
      'China called the vessel’s downing “an excessive reaction” and said it “retains the right to respond...',
    url: 'https://en.wikipedia.org/wiki/Mount_Fuji'
  }
];

const BioHub = () => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl space-y-4 py-10">
        <Title text="N- BioHbub" className="text-center" />
        <p className="text-center">
          Stay Ahead with the Latest Product Updates. Explore new health products and services to
          improve your care.
        </p>
        <div className="grid grid-cols-2 gap-5">
          {bioHub.map((bio, idx) => (
            <div
              className="flex cursor-pointer items-center  justify-between space-x-6 rounded-lg border p-4 shadow-xl shadow-blue-400/20 hover:animate-pulse"
              key={idx}
            >
              <Image src={bio.image} width={200} height={300} alt={bio.title} className="" />
              <div className="flex flex-col space-y-3 ">
                <SubTitle text={bio.title} className="font-semibold text-black" />
                <p>{bio.description}</p>
                <Link href={bio.url} className="ml-auto text-sm italic text-blue-400">
                  {' '}
                  <span className=" hover:underline">Read more</span>{' '}
                  <ArrowRight className="inline" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BioHub;
