import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Search, ExternalLink, Info } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

interface FeaturedBioHubItemProps {
  item: {
    id: number;
    title: string;
    image: string;
    description: string;
    category: string;
    content: string;
    url: string;
  };
}

export const FeaturedBioHubItem = ({ item }: FeaturedBioHubItemProps) => {
  return (
    <div className="rounded-lg border bg-white p-6 shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-blue-800 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium">
          {item.category}
        </span>
        <Link href={item.url} className="text-blue-500 text-sm hover:underline">
          View Source <ExternalLink className="ml-1 inline h-3 w-3" />
        </Link>
      </div>

      <h2 className="text-gray-900 mb-4 text-xl font-bold sm:text-2xl">{item.title}</h2>

      <div className="relative mb-6 h-[240px] w-full overflow-hidden rounded-lg sm:h-[320px]">
        <Image
          src={item.image}
          alt={item.title}
          width={240}
          height={240}
          className="object-cover"
        />
      </div>

      <p className="text-gray-700 mb-4">{item.description}</p>

      <div className="bg-gray-50 mb-6 rounded-lg p-4">
        <p className="text-gray-600 text-sm">{item.content}</p>
      </div>

      <Link
        href={item.url}
        className="hover:bg-blue-500 inline-flex items-center rounded-lg bg-blue-400 px-4 py-2 text-white transition-colors"
      >
        Read Full Article <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </div>
  );
};
