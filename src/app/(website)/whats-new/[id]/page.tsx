'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, Share2, Facebook, Twitter, Linkedin, ChevronLeft } from 'lucide-react';

// Sample blog post data
const blogPost = {
  id: 1,
  title: 'Understanding Preventive Healthcare: A Comprehensive Guide',
  excerpt:
    'Learn how preventive care can help you maintain good health and reduce healthcare costs in the long run.',
  content: `
    <p>Preventive healthcare involves taking measures to prevent diseases rather than curing them or treating their symptoms. It includes regular check-ups, screenings, immunizations, and lifestyle modifications that can help maintain good health and reduce the risk of disease.</p>
    
    <h2>Why Preventive Healthcare Matters</h2>
    
    <p>Preventive care is one of the most effective ways to stay healthy and avoid chronic diseases. It can help detect health problems early when they're easier to treat, potentially saving lives and reducing healthcare costs in the long run.</p>
    
    <p>According to the Centers for Disease Control and Prevention (CDC), chronic diseases that are avoidable through preventive care account for 75% of the nation's healthcare spending.</p>
    
    <h2>Key Components of Preventive Healthcare</h2>
    
    <h3>Regular Health Screenings</h3>
    
    <p>Health screenings help detect potential health problems before they become serious. These may include:</p>
    
    <ul>
      <li>Blood pressure screenings</li>
      <li>Cholesterol screenings</li>
      <li>Diabetes screenings</li>
      <li>Cancer screenings (breast, cervical, colorectal, etc.)</li>
      <li>Bone density tests</li>
    </ul>
    
    <h3>Immunizations</h3>
    
    <p>Vaccines help protect against serious and potentially life-threatening diseases. The CDC recommends different vaccines throughout life, starting in childhood and continuing through adulthood.</p>
    
    <h3>Healthy Lifestyle Choices</h3>
    
    <p>Preventive healthcare also involves making healthy lifestyle choices:</p>
    
    <ul>
      <li>Eating a balanced diet rich in fruits, vegetables, and whole grains</li>
      <li>Exercising regularly</li>
      <li>Maintaining a healthy weight</li>
      <li>Not smoking or using tobacco products</li>
      <li>Limiting alcohol consumption</li>
      <li>Managing stress effectively</li>
    </ul>
    
    <h2>Preventive Healthcare by Age Group</h2>
    
    <h3>Children and Adolescents</h3>
    
    <p>Children and adolescents should receive regular check-ups that include height and weight measurements, developmental assessments, and age-appropriate screenings and immunizations.</p>
    
    <h3>Adults</h3>
    
    <p>Adults should have regular check-ups that include screenings for high blood pressure, cholesterol, diabetes, and certain cancers. The frequency of these screenings depends on age, gender, and risk factors.</p>
    
    <h3>Older Adults</h3>
    
    <p>Older adults may need additional screenings for conditions such as osteoporosis, colorectal cancer, and cognitive impairment. They should also receive vaccines for influenza, pneumonia, and shingles.</p>
    
    <h2>The Role of Technology in Preventive Healthcare</h2>
    
    <p>Technology is playing an increasingly important role in preventive healthcare. Wearable devices and mobile apps can help individuals track health metrics like physical activity, heart rate, and sleep quality. Telemedicine allows for virtual check-ups, making healthcare more accessible.</p>
    
    <h2>Conclusion</h2>
    
    <p>Preventive healthcare is a crucial component of maintaining good health and preventing disease. By taking proactive steps such as getting regular check-ups, screenings, and immunizations, and making healthy lifestyle choices, individuals can significantly improve their chances of living longer, healthier lives.</p>
    
    <p>Remember, the best time to start focusing on preventive healthcare is now. Speak with your healthcare provider about which preventive measures are right for you based on your age, gender, family history, and other risk factors.</p>
  `,
  author: {
    name: 'Dr. Sarah Johnson',
    role: 'Chief Medical Officer',
    avatar: '/avatar.png'
  },
  date: 'May 2, 2025',
  readTime: '5 min read',
  image: '/blog.png',
  relatedPosts: [
    {
      id: 7,
      title: 'The Importance of Regular Health Check-ups',
      excerpt:
        "Why you shouldn't skip your annual physical and what to expect during these appointments.",
      image: '/blog.png',
      date: 'April 10, 2025'
    },
    {
      id: 8,
      title: 'Preventive Screenings: When and Why You Need Them',
      excerpt:
        "A guide to common health screenings and when they're recommended based on age and risk factors.",
      image: '/blog.png',
      date: 'March 28, 2025'
    },
    {
      id: 9,
      title: 'Boosting Your Immune System Naturally',
      excerpt: 'Natural ways to strengthen your immune system and protect yourself from illness.',
      image: '/blog.png',
      date: 'March 15, 2025'
    }
  ]
};

const SimplifiedBlogDetailPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="relative h-96 lg:h-[500px]">
        <Image src={blogPost.image} alt={blogPost.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h1 className="mb-6 text-3xl font-bold text-white md:text-5xl">{blogPost.title}</h1>
            <div className="flex items-center justify-center space-x-4 text-white">
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                <span>{blogPost.date}</span>
              </div>
              <span>•</span>
              <div className="flex items-center">
                <Clock size={16} className="mr-2" />
                <span>{blogPost.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-12">
        {/* Back to blogs link */}
        <Link
          href="/blog"
          className="text-blue-600 hover:text-blue-800 mb-8 inline-flex items-center"
        >
          <ChevronLeft size={16} className="mr-1" />
          Back to all articles
        </Link>

        {/* Author info - minimized */}
        <div className="border-gray-200 mb-8 flex items-center border-b pb-6">
          <div className="relative mr-3 h-10 w-10 overflow-hidden rounded-full">
            <Image
              src={blogPost.author.avatar}
              alt={blogPost.author.name}
              fill
              className="object-cover"
            />
          </div>
          <span className="text-gray-700">
            Written by <span className="text-gray-900 font-medium">{blogPost.author.name}</span>
          </span>
        </div>

        <Image src="/blog.png" alt="image" height={600} width={600} className="w-full" />

        <div
          className="prose prose-blue mb-10 max-w-none"
          dangerouslySetInnerHTML={{ __html: blogPost.content }}
        ></div>

        <div className="border-gray-200 mb-10 flex items-center space-x-4 border-t pt-6">
          <span className="text-gray-700 font-medium">Share this article:</span>
          <button className="bg-blue-600 hover:bg-blue-700 flex h-8 w-8 items-center justify-center rounded-full text-white">
            <Facebook size={16} />
          </button>
          <button className="hover:bg-blue-500 flex h-8 w-8 items-center justify-center rounded-full bg-blue-400 text-white">
            <Twitter size={16} />
          </button>
          <button className="bg-blue-700 hover:bg-blue-800 flex h-8 w-8 items-center justify-center rounded-full text-white">
            <Linkedin size={16} />
          </button>
          <button className="bg-gray-100 text-gray-700 hover:bg-gray-200 flex h-8 w-8 items-center justify-center rounded-full">
            <Share2 size={16} />
          </button>
        </div>

        <div className="mb-10">
          <h3 className="text-gray-900 mb-6 text-xl font-bold">Continue Reading</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {blogPost.relatedPosts.map((post) => (
              <div
                key={post.id}
                className="overflow-hidden rounded-lg bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="relative h-48">
                  <Image src={post.image} alt={post.title} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h4 className="text-gray-900 mb-2 line-clamp-2 font-bold">
                    <Link href={`/blog/${post.id}`} className="hover:text-blue-600">
                      {post.title}
                    </Link>
                  </h4>
                  <span className="text-gray-500 text-sm">{post.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-blue-100 bg-blue-50 p-6">
          <div className="flex flex-col justify-between md:flex-row md:items-center">
            <div className="mb-4 md:mb-0 md:mr-4">
              <h3 className="text-gray-900 mb-1 text-lg font-bold">
                Stay updated with our newsletter
              </h3>
              <p className="text-gray-600">
                Get the latest health tips and articles delivered to your inbox
              </p>
            </div>
            <div className="flex flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Your email address"
                className="border-gray-300 mb-2 rounded-md border px-4 py-2 focus:outline-none sm:mb-0 sm:mr-2 sm:rounded-r-none"
              />
              <button className="bg-blue-600 hover:bg-blue-700 rounded-md px-4 py-2 text-white transition sm:rounded-l-none">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimplifiedBlogDetailPage;
