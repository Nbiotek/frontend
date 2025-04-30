'use client';

import { useState, useEffect } from 'react';
import Button from '@/atoms/Buttons';
import InputSearch from '@/atoms/fields/InputSearch';
import Image from 'next/image';
import { defaultMenuConfig } from '@/config/menuItems';
import { useRouter } from 'next/navigation';
import ROUTES from '@/constants/routes';
import Link from 'next/link';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <>
      {/* Top header section */}
      <div className="bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between p-4">
          <Image src="/logo.png" alt="Logo" width={150} height={100} />
          <InputSearch placeholder="Search" className="!w-[calc(100%-500px)] rounded-full" />
          <div className="flex w-[260px] space-x-2">
            <Button variant="filled">Contact us</Button>
            <Button variant="outlined" onClick={() => router.push(ROUTES.LOGIN.path)}>
              Log in
            </Button>
          </div>
        </div>
      </div>

      <div
        className={`sticky top-0 z-50 transition-all duration-200 ${
          scrolled ? 'bg-white shadow-md' : 'w-full bg-blue-400/10  '
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between p-4 ">
          {defaultMenuConfig.map((item, index) => (
            <ul
              key={index}
              className="flex cursor-pointer items-center p-2 text-[#004AAD]/60 transition-colors hover:text-blue-200"
            >
              <Link href={item.url} className="text-base">
                {item.title}
              </Link>
            </ul>
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;
