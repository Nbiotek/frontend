'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Calendar, ArrowRight } from 'lucide-react';
import { useFetchBlogs } from '@/hooks/admin/useFetchBlogs';

const BlogListingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data, isLoading } = useFetchBlogs({ page: 1, limit: 10, status: 'ACTIVE' });

  const blogs = data?.blogs ?? [];

  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return blogs;

    return blogs.filter((post) => {
      return (
        post.title.toLowerCase().includes(query) ||
        post.body.toLowerCase().includes(query) ||
        post.categoryName.toLowerCase().includes(query)
      );
    });
  }, [blogs, searchQuery]);

  const featuredPost = filteredPosts.find((post) => post.isFeatured);
  const regularPosts = filteredPosts.filter((post) => !post.isFeatured);
  const isEmpty = !isLoading && blogs.length === 0;
  const isNoResults = !isLoading && blogs.length > 0 && filteredPosts.length === 0;

  const getReadTime = (text: string) => {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min read`;
  };

  const getExcerpt = (text: string, maxLength = 180) => {
    const normalized = text.trim();
    if (normalized.length <= maxLength) return normalized;
    return `${normalized.slice(0, maxLength).trim()}...`;
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

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-emerald-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-gray-900 mb-6 text-center text-4xl font-bold">NBIOTEK Health Blog</h1>
          <p className="text-gray-600 mx-auto mb-8 max-w-3xl text-center text-xl">
            Stay informed with the latest insights, tips, and news in healthcare and medical
            research.
          </p>
          <div className="relative mx-auto max-w-2xl">
            <input
              type="text"
              placeholder="Search articles..."
              className="border-gray-300 focus:ring-emerald-500 w-full rounded-full border px-6 py-4 pr-12 focus:outline-none focus:ring-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search
              className="text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 transform"
              size={20}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12">
        {isLoading && (
          <div className="border-emerald-200 text-gray-600 rounded-xl border border-dashed bg-white px-6 py-10 text-center">
            Loading latest articles...
          </div>
        )}

        {!isLoading && featuredPost && (
          <div className="mb-16">
            <h2 className="text-gray-900 mb-6 text-2xl font-bold">Featured Article</h2>
            <div className="overflow-hidden rounded-xl bg-white shadow-lg">
              <div className="md:flex">
                <div className="relative h-64 md:h-auto md:w-1/2">
                  <Image
                    src={featuredPost.featureImageUrl || '/blog.png'}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </div>
                <div className="p-8 md:w-1/2">
                  <div className="mb-4 flex items-center">
                    <span className="text-gray-500 flex items-center text-sm">
                      <Calendar size={14} className="mr-1" />
                      {formatDate(featuredPost.createdAt)}
                    </span>
                    <span className="text-gray-400 mx-2">•</span>
                    <span className="text-gray-500 text-sm">{getReadTime(featuredPost.body)}</span>
                    <span className="text-gray-400 mx-2">•</span>
                    <span className="text-gray-500 text-sm">{featuredPost.reads} reads</span>
                  </div>
                  <h3 className="text-gray-900 mb-4 text-2xl font-bold">{featuredPost.title}</h3>
                  <p className="text-gray-600 mb-6">{getExcerpt(featuredPost.body, 220)}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-emerald-100 text-emerald-700 mr-3 flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold">
                        {featuredPost.categoryName
                          .split(' ')
                          .map((word) => word[0])
                          .join('')
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>
                      <span className="text-gray-900 font-medium">{featuredPost.categoryName}</span>
                    </div>
                    <Link
                      href={`/whats-new/${featuredPost.id}`}
                      className="bg-emerald-600 hover:bg-emerald-700 flex items-center rounded-md px-4 py-2 text-white transition"
                    >
                      Read More
                      <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {!isLoading && regularPosts.length > 0 && (
          <div>
            <h2 className="text-gray-900 mb-6 text-2xl font-bold">Latest Articles</h2>
            <div className="space-y-8">
              {regularPosts.map((post) => (
                <div
                  key={post.id}
                  className="overflow-hidden rounded-xl bg-white shadow-md transition hover:shadow-lg"
                >
                  <div className="md:flex">
                    <div className="relative h-48 md:h-auto md:w-1/3">
                      <Image
                        src={post.featureImageUrl || '/blog.png'}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(min-width: 768px) 33vw, 100vw"
                      />
                    </div>
                    <div className="p-6 md:w-2/3">
                      <div className="mb-3 flex items-center">
                        <span className="text-gray-500 flex items-center text-sm">
                          <Calendar size={14} className="mr-1" />
                          {formatDate(post.createdAt)}
                        </span>
                        <span className="text-gray-400 mx-2">•</span>
                        <span className="text-gray-500 text-sm">{getReadTime(post.body)}</span>
                        <span className="text-gray-400 mx-2">•</span>
                        <span className="text-gray-500 text-sm">{post.reads} reads</span>
                      </div>
                      <h3 className="text-gray-900 mb-3 text-xl font-bold">{post.title}</h3>
                      <p className="text-gray-600 mb-4">{getExcerpt(post.body)}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="bg-emerald-100 text-emerald-700 mr-2 flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold">
                            {post.categoryName
                              .split(' ')
                              .map((word) => word[0])
                              .join('')
                              .slice(0, 2)
                              .toUpperCase()}
                          </div>
                          <span className="text-gray-900 font-medium">{post.categoryName}</span>
                        </div>
                        <Link
                          href={`/whats-new/${post.id}`}
                          className="text-emerald-700 hover:text-emerald-900 flex items-center font-medium"
                        >
                          Read Article
                          <ArrowRight size={16} className="ml-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {isNoResults && (
          <div className="border-emerald-200 text-gray-600 rounded-xl border border-dashed bg-white px-6 py-10 text-center">
            No articles match your search. Try different keywords.
          </div>
        )}

        {isEmpty && (
          <div className="mx-auto max-w-3xl py-20 text-center">
            <div className="mb-8">
              <div className="bg-emerald-100 mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full">
                <Calendar className="text-emerald-600 h-10 w-10" />
              </div>
              <h2 className="text-gray-900 mb-4 text-4xl font-bold">Blog Coming Soon</h2>
              <p className="text-gray-600 mb-8 text-xl">
                We&apos;re preparing insightful articles about healthcare innovation, medical
                research, and wellness tips. Stay tuned for expert insights from NBIOTEK LABS.
              </p>
              <div className="mb-8 flex justify-center gap-2">
                <div className="bg-emerald-500 h-3 w-3 animate-pulse rounded-full"></div>
                <div className="bg-amber-500 h-3 w-3 animate-pulse rounded-full delay-75"></div>
                <div className="bg-rose-500 h-3 w-3 animate-pulse rounded-full delay-150"></div>
              </div>
              <Link
                href="/"
                className="hover:bg-emerald-700 bg-emerald-600 inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold text-white shadow-lg transition-all"
              >
                Back to Home
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogListingPage;
