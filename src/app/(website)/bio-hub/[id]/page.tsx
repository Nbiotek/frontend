'use client';

import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ChevronLeft, Eye } from 'lucide-react';
import { useFetchBiohubById } from '@/hooks/admin/useFetchBiohubById';

const BioHubDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const { data, isLoading } = useFetchBiohubById(id);

  const getReadTime = (text: string) => {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min read`;
  };

  const formatDate = (value: string) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="bg-slate-50 min-h-screen">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <div className="border-emerald-200 text-gray-600 rounded-xl border border-dashed bg-white px-6 py-10 text-center">
            Loading BioHub entry...
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-slate-50 min-h-screen">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center">
          <h1 className="text-gray-900 mb-3 text-3xl font-bold">BioHub entry not found</h1>
          <p className="text-gray-600 mb-8">
            The BioHub update you are looking for is unavailable or has been removed.
          </p>
          <Link
            href="/bio-hub"
            className="hover:bg-emerald-700 bg-emerald-600 inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold text-white shadow-lg transition-all"
          >
            Back to BioHub
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="relative h-80 lg:h-[420px]">
        <Image
          src={data.featureImageUrl || '/biohub-featured.png'}
          alt={data.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="bg-slate-900/40 absolute inset-0"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="mx-auto max-w-4xl px-4 text-center text-white">
            <span className="bg-emerald-500/90 mb-4 inline-flex items-center rounded-full px-4 py-1 text-sm font-semibold uppercase tracking-wide">
              {data.categoryName}
            </span>
            <h1 className="mb-6 text-3xl font-bold md:text-5xl">{data.title}</h1>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                <span>{formatDate(data.createdAt)}</span>
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-2" />
                <span>{getReadTime(data.body)}</span>
              </div>
              <div className="flex items-center">
                <Eye size={16} className="mr-2" />
                <span>{data.reads} reads</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-12">
        <Link
          href="/bio-hub"
          className="text-emerald-700 hover:text-emerald-900 mb-8 inline-flex items-center font-medium"
        >
          <ChevronLeft size={16} className="mr-1" />
          Back to BioHub
        </Link>

        <div className="rounded-2xl bg-white p-6 shadow-sm md:p-10">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="bg-emerald-100 text-emerald-700 rounded-full px-4 py-1 text-sm font-semibold">
              {data.categoryName}
            </span>
            <span className="bg-slate-100 text-slate-600 rounded-full px-4 py-1 text-sm font-semibold">
              {data.status.toLowerCase()}
            </span>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed">{data.body}</p>
        </div>
      </div>
    </div>
  );
};

export default BioHubDetailPage;
