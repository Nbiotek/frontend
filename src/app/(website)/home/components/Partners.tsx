'use client';

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';
import { BoxIcon } from 'lucide-react';
import { useFetchPartnersLanding } from '@/hooks/admin/useFetchPartnersLanding';

const PartnerSection: React.FC = () => {
  const { data, isLoading } = useFetchPartnersLanding();
  const normalizeRemoteUrl = (url: string) => {
    if (!url) return '';
    const withProtocol = url.startsWith('http') ? url : `https://${url}`;
    return withProtocol.replace(/(r2\.dev)(?!\/)/, '$1/');
  };
  const partnerLogos =
    data?.carousel?.map((item) => ({
      id: item.id,
      src: normalizeRemoteUrl(item.media?.[0]?.file_url || ''),
      alt: 'Partner logo',
      width: 140
    })) ?? [];

  const hasPartners = partnerLogos.length > 0;
  const slidesPerView = Math.min(Math.max(partnerLogos.length, 1), 5);

  return (
    <section className="bg-blue-300/10 py-8 sm:py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <h2 className="text-gray-800 mb-6 text-center text-xl font-bold sm:mb-8 md:mb-10 md:text-2xl">
          Partner <span className="text-blue-800">&</span> Friend
        </h2>

        <div className="overflow-hidden">
          {isLoading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={`partner-skeleton-${idx}`}
                  className="sm:h-18 flex h-16 items-center justify-center rounded-lg bg-white/50 p-2 shadow-sm md:h-20"
                >
                  <div className="h-10 w-24 rounded bg-neutral-200 sm:h-12 md:h-14" />
                </div>
              ))}
            </div>
          ) : hasPartners ? (
            <Swiper
              modules={[Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              loop={partnerLogos.length > 1}
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
                  spaceBetween: 30
                },
                1024: {
                  slidesPerView,
                  spaceBetween: 40
                }
              }}
              className="partner-swiper py-2"
            >
              {partnerLogos.map((logo) => (
                <SwiperSlide key={logo.id} className="flex items-center justify-center px-2">
                  <div className="sm:h-18 flex h-16 items-center justify-center rounded-lg bg-white/50 p-2 shadow-sm md:h-20">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={logo.width}
                      height={60}
                      className="h-10 max-w-[80%] object-contain sm:h-12 md:h-14"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-neutral-300 bg-white/60 p-6 text-center text-sm text-neutral-600">
              <BoxIcon className="mb-2 h-5 w-5 text-neutral-400" />
              No partners available yet.
            </div>
          )}
        </div>

        {hasPartners ? (
          <div className="mt-4 flex justify-center md:hidden">
            <div className="flex space-x-1">
              {[...Array(Math.min(5, partnerLogos.length))].map((_, index) => (
                <span
                  key={index}
                  className={`h-1.5 rounded-full transition-all ${
                    index === 0 ? 'bg-blue-500 w-3' : 'bg-gray-300 w-1.5'
                  }`}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default PartnerSection;
