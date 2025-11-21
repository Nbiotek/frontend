import { Metadata } from 'next';
import { Stethoscope, Users, Award, MapPin, Video, Microscope, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | NBiotek Labs',
  description:
    "At NBIOTEK LABS, our patient's best interest is the only interest that matters. Discover our commitment to delivering world-class diagnostic services with integrity, innovation, and excellence.",
  keywords:
    'NBiotek Labs, medical diagnostics, laboratory services, healthcare, Nigeria, telehealth, research and development, medical testing, patient care'
};

const AboutPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="to-blue-800 bg-gradient-to-r from-blue-400 text-white">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-6xl">About NBIOTEK LABS</h1>
            <p className="mx-auto max-w-3xl text-xl md:text-2xl">
              Our patient&apos;s best interest is the only interest that matters
            </p>
          </div>
        </div>
      </div>

      {/* Main About Us Content */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="prose prose-lg mx-auto max-w-none">
          <div className="mb-12 rounded-lg bg-white p-8 shadow-lg">
            {/* <div className="mb-6 flex items-center justify-center">
              <Heart className="text-blue-600 mr-3 h-12 w-12" />
            </div> */}
            <p className="text-gray-700 mb-6 text-center text-lg leading-relaxed">
              At NBIOTEK LABS, we are guided by a simple but powerful belief:{' '}
              <strong>Our patient&apos;s best interest is the only interest that matters.</strong>
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              This principle shapes every aspect of our work driving us to deliver solutions with
              integrity, innovation and excellence while always placing patient care at the center
              with compassion, precision, and personal touch. We aim to leave a lasting positive
              impact on every life we touch.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              We believe that accurate and timely diagnostics are the foundation of effective
              healthcare. That&apos;s why we are committed to delivering world-class laboratory
              services using modern medical technologies in a warm and supportive environment.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Our dedicated team combines deep expertise and advanced technologies to provide
              precise and reliable diagnostic solutions. Every test, every result, and every
              interaction is handled with care ensuring that healthcare providers and patients
              receive the information they need to make confident and informed decisions.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Through global partnerships and continuous innovation, NBIOTEK LABS is bringing
              cutting-edge diagnostics closer to home, making high-quality laboratory services
              accessible, affordable and trustworthy.
            </p>
            <p className="text-gray-700 text-center font-semibold leading-relaxed">
              We strive to redefine the standards of diagnostic excellence because we believe
              healthcare should begin with clarity, compassion and accuracy.
            </p>
          </div>
        </div>
      </div>

      {/* Telehealth Section */}
      <div className="to-indigo-50 bg-gradient-to-br from-blue-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white p-8 shadow-xl">
            <div className="mb-6 flex items-center">
              <Video className="text-blue-600 mr-4 h-10 w-10" />
              <h2 className="text-gray-900 text-3xl font-bold">Telehealth</h2>
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              In today&apos;s fast-changing world, healthcare must be accessible anytime, anywhere.
              At NBIOTEK LABS, our Telehealth services bridge the gap and distance between
              diagnostics and medical care.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Through our secure digital platform, patients and healthcare providers can:
            </p>
            <ul className="text-gray-700 mb-6 space-y-3">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 mt-1">✓</span>
                <span>Access test results remotely.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 mt-1">✓</span>
                <span>Consult with licensed physicians and specialists for interpretation.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 mt-1">✓</span>
                <span>Receive personalized guidance on treatment options.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 mt-1">✓</span>
                <span>Track health history over time for better long-term care.</span>
              </li>
            </ul>
            <p className="text-gray-700 font-medium leading-relaxed">
              By integrating diagnostics with virtual care, we make healthcare more seamless,
              convenient, and patient-centered.
            </p>
          </div>
        </div>
      </div>

      {/* Research & Development Section */}
      <div className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="from-purple-50 to-pink-50 rounded-lg bg-gradient-to-br p-8 shadow-xl">
            <div className="mb-6 flex items-center">
              <Microscope className="text-purple-600 mr-4 h-10 w-10" />
              <h2 className="text-gray-900 text-3xl font-bold">Research & Development</h2>
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Beyond diagnostics, NBIOTEK LABS is also committed to advancing science, education,
              and innovation. Our Research & Development arm provides a collaborative platform for
              students, researchers and institutions.
            </p>
            <div className="mb-6">
              <h3 className="text-gray-900 mb-4 text-xl font-semibold">We:</h3>
              <ul className="text-gray-700 space-y-3">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2 mt-1">•</span>
                  <span>
                    Offer state-of-the-art laboratory facilities for molecular biology,
                    biotechnology, and medical research.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2 mt-1">•</span>
                  <span>
                    Partner with universities, research centers, and healthcare providers to design
                    and execute impactful studies.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2 mt-1">•</span>
                  <span>
                    Support students and faculty with mentorship, training, and access to equipment.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2 mt-1">•</span>
                  <span>
                    Drive innovation by exploring new diagnostic techniques and medical solutions
                    tailored to the African healthcare landscape.
                  </span>
                </li>
              </ul>
            </div>
            <p className="text-gray-700 font-medium leading-relaxed">
              With R&D, we are building a future where Nigeria not only benefits from global
              discoveries but also contributes homegrown innovations to the world of science and
              medicine.
            </p>
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
