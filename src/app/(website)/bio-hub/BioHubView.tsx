'use client';

import { useMemo, useState } from 'react';
import { Search, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { BioHubCard } from './components/BioItemCard';
import { FeaturedBioHubItem } from './components/FeaturedBioHubItem';
import { useFetchBiohubs } from '@/hooks/admin/useFetchBiohubs';

const BioHubView = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { data, isLoading } = useFetchBiohubs({ page: 1, limit: 10, status: 'ACTIVE' });

  const items = data?.biohubs ?? [];
  const featuredItem = items.find((item) => item.isFeatured) ?? items[0];

  const categories = useMemo(() => {
    const unique = new Set(items.map((item) => item.categoryName).filter(Boolean));
    return ['All', ...Array.from(unique)];
  }, [items]);

  const isNewItem = (value: string) => {
    const created = new Date(value);
    if (Number.isNaN(created.getTime())) return false;
    const days = (Date.now() - created.getTime()) / (1000 * 60 * 60 * 24);
    return days <= 14;
  };

  const mappedItems = useMemo(
    () =>
      items.map((item) => ({
        id: item.id,
        title: item.title,
        image: item.featureImageUrl || '/biohub-1.png',
        description: item.body,
        category: item.categoryName,
        url: `/bio-hub/${item.id}`,
        isNew: isNewItem(item.createdAt)
      })),
    [items]
  );

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return mappedItems.filter((item) => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(query) || item.description.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, mappedItems, searchQuery]);

  const isEmpty = !isLoading && items.length === 0;
  const isNoResults = !isLoading && items.length > 0 && filteredItems.length === 0;

  return (
    <div className="bg-slate-50 min-h-screen w-full">
      {/* Hero Section */}
      <div className="bg-emerald-50 py-12">
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
                className="border-gray-300 text-gray-900 focus:border-emerald-500 focus:ring-emerald-200 block w-full rounded-lg border bg-white py-3 pl-10 pr-4 focus:outline-none focus:ring-2"
                placeholder="Search for innovations, products, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {!isLoading && featuredItem && (
          <section className="mb-16">
            <h2 className="text-gray-900 mb-8 text-2xl font-bold">Featured Innovation</h2>
            <FeaturedBioHubItem
              item={{
                id: featuredItem.id,
                title: featuredItem.title,
                image: featuredItem.featureImageUrl || '/biohub-featured.png',
                description: featuredItem.body,
                category: featuredItem.categoryName,
                content: featuredItem.body,
                url: `/bio-hub/${featuredItem.id}`
              }}
            />
          </section>
        )}

        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex space-x-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-emerald-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100 bg-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {isLoading && (
          <div className="border-emerald-200 text-gray-600 rounded-lg border border-dashed bg-white p-8 text-center">
            Loading BioHub updates...
          </div>
        )}

        {!isLoading && filteredItems.length > 0 ? (
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
        ) : null}

        {isNoResults && (
          <div className="flex flex-col items-center justify-center rounded-lg bg-white p-8 text-center">
            <div className="bg-emerald-100 mb-4 rounded-full p-3">
              <Info className="text-emerald-600 h-6 w-6" />
            </div>
            <h3 className="text-gray-900 text-lg font-medium">No innovations found</h3>
            <p className="text-gray-600 mt-2">
              We couldn&apos;t find any items matching your criteria. Try adjusting your search or
              category selection.
            </p>
          </div>
        )}

        {isEmpty && (
          <div className="border-emerald-200 text-gray-600 mt-8 rounded-lg border border-dashed bg-white p-8 text-center">
            No BioHub entries are available right now. Check back soon.
          </div>
        )}
      </div>
    </div>
  );
};

export default BioHubView;
