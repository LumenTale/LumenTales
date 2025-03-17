import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiClock, FiStar, FiUsers, FiArrowRight } from 'react-icons/fi';

import StoryCard from '@components/story/StoryCard';

const FeaturedStories: React.FC = () => {
  // Mock data for featured stories
  const featuredStories = [
    {
      id: '1',
      title: 'The Crystal Caverns',
      description: 'Explore the mysterious underground world filled with magical crystals and ancient secrets.',
      coverImage: '/images/story-1.jpg',
      author: {
        id: '1',
        name: 'Elena Rivers',
        image: '/images/author-1.jpg',
      },
      genre: ['Fantasy', 'Adventure'],
      readTime: '15 min',
      rating: 4.8,
      readers: 1250,
    },
    {
      id: '2',
      title: 'Neon Shadows',
      description: 'Navigate the dangerous streets of a cyberpunk metropolis where technology and crime intertwine.',
      coverImage: '/images/story-2.jpg',
      author: {
        id: '2',
        name: 'Marcus Chen',
        image: '/images/author-2.jpg',
      },
      genre: ['Sci-Fi', 'Thriller'],
      readTime: '20 min',
      rating: 4.6,
      readers: 980,
    },
    {
      id: '3',
      title: 'Whispers of the Past',
      description: 'Uncover family secrets and solve a decades-old mystery in this atmospheric historical tale.',
      coverImage: '/images/story-3.jpg',
      author: {
        id: '3',
        name: 'Sophia Williams',
        image: '/images/author-3.jpg',
      },
      genre: ['Mystery', 'Historical'],
      readTime: '18 min',
      rating: 4.7,
      readers: 1100,
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="heading-2 text-gray-900">Featured Stories</h2>
            <p className="text-gray-600 mt-2">Discover our most popular interactive narratives</p>
          </div>
          <Link
            href="/explore"
            className="flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            View all stories
            <FiArrowRight className="ml-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <StoryCard story={story} />
            </motion.div>
          ))}
        </div>

        <div className="mt-16 bg-primary-50 rounded-xl p-8 border border-primary-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="heading-3 text-primary-900 mb-4">Create Your Own Story</h3>
              <p className="text-gray-700 mb-6">
                Become a creator and build interactive narratives with our powerful tools. Design characters, craft branching storylines, and monetize your creativity.
              </p>
              <Link
                href="/create"
                className="btn btn-primary"
              >
                Start Creating
              </Link>
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image
                src="/images/creator-tools.jpg"
                alt="Story creation tools"
                fill
                style={{ objectFit: 'cover' }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/30 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedStories; 