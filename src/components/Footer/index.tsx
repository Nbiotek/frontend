import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import { FaFacebook } from 'react-icons/fa6';
import { PiTwitterLogo } from 'react-icons/pi';
import { FiInstagram } from 'react-icons/fi';

const Footer = () => {
  return (
    <>
      {/* Newsletter Section */}
      <div className="border-gray-200 w-full border-t py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between px-4 md:flex-row">
          <div className="mb-6 md:mb-0">
            <Image
              src="/logo.png"
              alt="NBIOTEK Logo"
              width={160}
              height={60}
              className="object-contain"
            />
          </div>

          <div className="max-w-xl">
            <h2 className="text-gray-800 mb-2 text-2xl font-semibold">Subcribe our Newsletter</h2>
            <p className="text-gray-600 mb-4">
              Pellentesque eu nibh eget mauris congue mattis matti.
            </p>
          </div>

          <div className="flex w-full md:w-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="border-gray-300 focus:ring-blue-500 flex-grow rounded-l-md border px-4 py-3 focus:outline-none focus:ring-2"
            />
            <button className="hover:bg-blue-800 rounded-r-md bg-blue-400 px-6 py-3 text-white transition duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <footer className="text-gray-300 bg-[#1A1A1A] pb-8 pt-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* About Column */}
            <div>
              <h3 className="mb-6 text-xl font-semibold text-white">About Nbiotek</h3>
              <p className="mb-6 text-[#808080]">
                Morbi cursus porttitor enim lobortis molestic. Duis gravida turpis dui, eget
                bibendum magna congue nec.
              </p>
              <div className="flex flex-wrap items-center">
                <a
                  href="tel:+12195550114"
                  className="mb-2 mr-3 border-b border-green-500 font-medium text-white"
                >
                  (219) 555-0114
                </a>
                <span className="text-gray-500 mx-2">or</span>
                <a
                  href="mailto:Proxy@gmail.com"
                  className="mb-2 border-b border-green-500 font-medium text-white"
                >
                  nbiotek@gmail.com
                </a>
              </div>
            </div>

            <div>
              <h3 className="mb-6 text-xl font-semibold text-white">My Account</h3>
              <ul className="space-y-4 text-[#808080]">
                <li>
                  <Link href="#" className="transition hover:text-white">
                    Book Appointment
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition hover:text-white">
                    Order Test
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition hover:text-white">
                    Result
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition hover:text-white">
                    Ask for Review
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-6 text-xl font-semibold text-white">Links</h3>
              <ul className="space-y-4 text-[#808080]">
                <li>
                  <Link href="#" className="transition hover:text-white">
                    Lab Tests
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition hover:text-white">
                    Special Package
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition hover:text-white">
                    Advance Imaging
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition hover:text-white">
                    Molecular Diagnostics
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition hover:text-white">
                    Contact us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-6 text-xl font-semibold text-white ">Research and Innovation</h3>
              <ul className="mb-8 space-y-4 text-[#808080]">
                <li>
                  <Link href="#" className="transition hover:text-white">
                    Ecommerce
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition hover:text-white">
                    Bio Hub
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition hover:text-white">
                    What&apos;s Newt
                  </Link>
                </li>
              </ul>

              {/* <h3 className="text-xl font-semibold mb-6 text-white">Download our Mobile App</h3>
              <div className="flex flex-wrap gap-4">
                <Link href="#" className="bg-gray-800 hover:bg-gray-700 rounded-lg px-3 py-2 inline-flex items-center transition">
                  <Image src="/app-store.png" alt="App Store" width={30} height={30} className="mr-2" />
                  <div>
                    <div className="text-xs">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </Link>
                
                <Link href="#" className="bg-gray-800 hover:bg-gray-700 rounded-lg px-3 py-2 inline-flex items-center transition">
                  <Image src="/google-play.png" alt="Google Play" width={30} height={30} className="mr-2" />
                  <div>
                    <div className="text-xs">Download on the</div>
                    <div className="text-sm font-semibold">Google play</div>
                  </div>
                </Link>
              </div> */}
            </div>
          </div>

          <hr className="border-gray-800 my-10" />

          <div className="flex flex-col items-center justify-between md:flex-row ">
            <div className="mb-6 flex space-x-4 md:mb-0">
              <a
                href="#"
                className="bg-gray-800 flex h-10 w-10 items-center justify-center rounded-full text-neutral-200 hover:bg-blue-400  hover:text-white"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="#"
                className="bg-gray-800 flex h-10 w-10 items-center justify-center rounded-full text-neutral-200 transition hover:bg-blue-400 hover:text-white"
              >
                <PiTwitterLogo size={20} className="" />
              </a>
              <a
                href="#"
                className="bg-gray-800 flex h-10 w-10 items-center justify-center rounded-full text-neutral-200 transition hover:bg-blue-400 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.441 16.892c-2.102.144-6.784.144-8.883 0-2.276-.156-2.541-1.27-2.558-4.892.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0 2.277.156 2.541 1.27 2.559 4.892-.018 3.629-.285 4.736-2.559 4.892zm-6.441-7.234l4.917 2.338-4.917 2.346v-4.684z" />
                </svg>
              </a>
              <a
                href="#"
                className="bg-gray-800 flex h-10 w-10 items-center justify-center rounded-full text-neutral-200 transition hover:bg-blue-400 hover:text-white"
              >
                <FiInstagram size={20} />
              </a>
            </div>

            <div className="mb-6 text-center text-sm text-[#808080] md:mb-0 md:text-left">
              Nbiotek © 2021. All Rights Reserved
            </div>

            {/* <div className="flex items-center space-x-3">
              <Image src="/apple-pay.png" alt="Apple Pay" width={40} height={25} />
              <Image src="/visa.png" alt="Visa" width={40} height={25} />
              <Image src="/discover.png" alt="Discover" width={40} height={25} />
              <Image src="/mastercard.png" alt="Mastercard" width={40} height={25} />
              <div className="flex items-center bg-gray-800 px-2 py-1 rounded-md">
                <Image src="/secure.png" alt="Secure" width={15} height={15} className="mr-1" />
                <span className="text-xs text-[#808080]">Secure Payment</span>
              </div>
            </div> */}
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
