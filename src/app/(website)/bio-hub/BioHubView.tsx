'use client';

import { useState } from 'react';
import { Search, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { BioHubCard } from './components/BioItemCard';
import { FeaturedBioHubItem } from './components/FeaturedBioHubItem';

const bioHubData = {
  featured: {
    id: 1,
    title: 'Advanced Genetic Testing: The Future of Personalized Medicine',
    image: '/biohub-featured.png',
    description:
      'Discover how our cutting-edge genetic testing is revolutionizing personalized healthcare and enabling more precise treatment approaches.',
    category: 'Research & Innovation',
    content:
      "Recent advances in genomic sequencing technology have made it possible to analyze an individual's genetic makeup with unprecedented precision. Our lab has pioneered new approaches that reduce processing time by 40% while improving accuracy by 15% compared to standard methods. This breakthrough allows for better identification of disease risk factors and optimal treatment pathways tailored to each patient's unique genetic profile.",
    url: 'https://example.com/genetic-testing'
  },
  items: [
    {
      id: 1,
      title: 'Advanced Genetic Testing',
      image: '/biohub-1.png',
      description:
        'Our new genetic testing platform offers faster results and greater accuracy for detecting hereditary conditions.',
      category: 'Genetic Services',
      url: 'https://example.com/genetic-testing',
      isNew: true
    },
    {
      id: 2,
      title: 'Telemedicine Consultations',
      image: '/biohub2.png',
      description:
        'Connect with our specialists remotely for consultations, follow-ups, and expert medical advice from anywhere.',
      category: 'Digital Health',
      url: 'https://example.com/telemedicine'
    },
    {
      id: 3,
      title: 'Improved Probiotic Formula',
      image: '/biohub3.png',
      description:
        'Our enhanced probiotic blend supports gut health with 15 carefully selected bacterial strains and prebiotic fiber.',
      category: 'Supplements',
      url: 'https://example.com/probiotics'
    },
    {
      id: 4,
      title: 'AI-Powered Health Predictions',
      image: '/biohub4.png',
      description:
        'Utilizing machine learning algorithms to predict health risks based on patient data and recommend preventative measures.',
      category: 'Technology',
      url: 'https://example.com/ai-health',
      isNew: true
    },
    {
      id: 5,
      title: 'Next-Generation Sequencing',
      image: '/biohub5.png',
      description:
        'Our updated NGS platform offers deeper coverage and faster turnaround times for comprehensive genetic analysis.',
      category: 'Laboratory Services',
      url: 'https://example.com/sequencing'
    },
    {
      id: 6,
      title: 'Bioinformatics Pipeline Upgrade',
      image: '/biohub6.png',
      description:
        'Enhanced data processing capabilities enable more accurate interpretation of complex genomic information.',
      category: 'Data Science',
      url: 'https://example.com/bioinformatics'
    }
  ],
  categories: [
    'All',
    'Genetic Services',
    'Digital Health',
    'Supplements',
    'Technology',
    'Laboratory Services',
    'Data Science'
  ]
};

const BioHubView = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = bioHubData.items.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-gray-50 min-h-screen w-full">
      {/* Hero Section */}
      <div className="bg-blue-400/10 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-gray-900 text-3xl font-bold sm:text-4xl md:text-5xl">N-BioHub</h1>
            <p className="text-gray-600 mt-4 text-lg">
              Stay ahead with the latest product updates, research breakthroughs, and innovative
              health solutions to improve patient care and laboratory efficiency.
            </p>

            <div className="relative mx-auto mt-8 max-w-xl">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="text-gray-400 h-5 w-5" />
              </div>
              <input
                type="text"
                className="border-gray-300 text-gray-900 focus:border-blue-500 block w-full rounded-lg border bg-white py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Search for innovations, products, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="mb-16">
          <h2 className="text-gray-900 mb-8 text-2xl font-bold">Featured Innovation</h2>
          <FeaturedBioHubItem item={bioHubData.featured} />
        </section>

        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex space-x-2">
            {bioHubData.categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-blue-400 text-white'
                    : 'text-gray-700 hover:bg-gray-100 bg-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <BioHubCard item={item} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg bg-white p-8 text-center">
            <div className="mb-4 rounded-full bg-blue-100 p-3">
              <Info className="text-blue-500 h-6 w-6" />
            </div>
            <h3 className="text-gray-900 text-lg font-medium">No innovations found</h3>
            <p className="text-gray-600 mt-2">
              We couldnt find any items matching your criteria. Try adjusting your search or
              category selection.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BioHubView;
