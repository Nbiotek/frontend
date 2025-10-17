import { Metadata } from 'next';
import { Stethoscope, Users, Award, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | NBiotek',
  description:
    'Learn about NBiotek - Your trusted partner in medical diagnostics and laboratory services. Discover our mission, values, and commitment to healthcare excellence.',
  keywords:
    'NBiotek, medical diagnostics, laboratory services, healthcare, Nigeria, medical testing'
};

const AboutPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="to-blue-800 bg-gradient-to-r from-blue-400 text-white">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-6xl">About NBiotek</h1>
            <p className="mx-auto max-w-3xl text-xl md:text-2xl">
              Leading the way in medical diagnostics and laboratory services across Nigeria
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="rounded-lg bg-white p-8 shadow-lg">
            <div className="mb-4 flex items-center">
              <Stethoscope className="text-blue-600 mr-3 h-8 w-8" />
              <h2 className="text-gray-900 text-2xl font-bold">Our Mission</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              To provide accurate, reliable, and accessible medical diagnostic services that empower
              healthcare professionals and improve patient outcomes across Nigeria.
            </p>
          </div>

          <div className="rounded-lg bg-white p-8 shadow-lg">
            <div className="mb-4 flex items-center">
              <Award className="text-blue-600 mr-3 h-8 w-8" />
              <h2 className="text-gray-900 text-2xl font-bold">Our Vision</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              To be the most trusted and innovative medical diagnostics company in Nigeria, setting
              the standard for excellence in laboratory services and patient care.
            </p>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-gray-900 mb-4 text-3xl font-bold">Our Services</h2>
            <p className="text-gray-600 mx-auto max-w-3xl text-xl">
              Comprehensive medical diagnostic services tailored to meet your healthcare needs
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <Stethoscope className="text-blue-600 h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Medical Testing</h3>
              <p className="text-gray-600">
                Comprehensive laboratory testing including blood work, pathology, and specialized
                diagnostics
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <Users className="text-green-600 h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Patient Care</h3>
              <p className="text-gray-600">
                Personalized patient support and consultation services to guide you through your
                healthcare journey
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <Award className="text-purple-600 h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Quality Assurance</h3>
              <p className="text-gray-600">
                Accredited laboratories with state-of-the-art equipment ensuring accurate and
                reliable results
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Locations */}
      <div className="bg-gray-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-gray-900 mb-4 text-3xl font-bold">Our Locations</h2>
            <p className="text-gray-600 text-xl">
              Serving communities across Nigeria with convenient access to quality healthcare
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow">
              <div className="mb-2 flex items-center">
                <MapPin className="text-blue-600 mr-2 h-5 w-5" />
                <h3 className="font-semibold">Ondo</h3>
              </div>
              <p className="text-gray-600 text-sm">
                our main branch located in the heart of Ondo city
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow">
              <div className="mb-2 flex items-center">
                <MapPin className="text-blue-600 mr-2 h-5 w-5" />
                <h3 className="font-semibold">Ondo</h3>
              </div>
              <p className="text-gray-600 text-sm">
                our main branch located in the heart of Ondo city
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow">
              <div className="mb-2 flex items-center">
                <MapPin className="text-blue-600 mr-2 h-5 w-5" />
                <h3 className="font-semibold">Ondo</h3>
              </div>
              <p className="text-gray-600 text-sm">
                our main branch located in the heart of Ondo city
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-blue-400 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold">Ready to Get Started?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl">
            Contact us today to learn more about our services or schedule your appointment
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="#"
              className="hover:bg-gray-100 rounded-lg bg-white px-8 py-3 font-semibold text-blue-400 transition-colors"
            >
              Contact Us
            </a>
            <a
              href="/patient/appointment/booking"
              className="rounded-lg border-2 border-white px-8 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-blue-400"
            >
              Book Appointment
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
