import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

interface PartnerLogo {
  id: number;
  src: string;
  alt: string;
  width: number;
}

const partnerLogos: PartnerLogo[] = [
  {
    id: 1,
    src: '/partner1.png',
    alt: 'Karmen Pet Hospital',
    width: 120
  },
  {
    id: 2,
    src: '/partner2.png',
    alt: 'Ciputra',
    width: 110
  },
  {
    id: 3,
    src: '/partner3.png',
    alt: "St. Kale Children's Hospital",
    width: 110
  },
  {
    id: 4,
    src: '/partner4.png',
    alt: 'Mayapada Hospital',
    width: 130
  },
  {
    id: 5,
    src: '/partner5.png',
    alt: 'Siloam Hospitals',
    width: 140
  },
  // Duplicate logos for seamless scrolling effect
  {
    id: 6,
    src: '/partner1.png',
    alt: 'Karmen Pet Hospital',
    width: 120
  },
  {
    id: 7,
    src: '/partner2.png',
    alt: 'Ciputra',
    width: 110
  },
  {
    id: 6,
    src: '/partner1.png',
    alt: 'Karmen Pet Hospital',
    width: 120
  },
  {
    id: 7,
    src: '/partner2.png',
    alt: 'Ciputra',
    width: 110
  }
];

const PartnerSection: React.FC = () => {
  return (
    <section className="bg-blue-300/10 py-12">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-gray-800 mb-10 text-center text-2xl font-bold">
          Partner <span className="text-blue-800">&</span> Friend
        </h2>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={50}
          slidesPerView={partnerLogos.length > 3 ? 4 : partnerLogos.length}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 30
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 40
            },
            1024: {
              slidesPerView: partnerLogos.length > 3 ? 4 : partnerLogos.length,
              spaceBetween: 50
            }
          }}
          className="partner-swiper"
        >
          {partnerLogos.map((logo) => (
            <SwiperSlide key={logo.id} className="flex items-center justify-center">
              <div className="flex h-20 items-center justify-center">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={60}
                  className="h-16 object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default PartnerSection;
