import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const CreatorShowcase: React.FC = () => {
  const creators = [
    {
      id: '1',
      name: 'Elena Rivers',
      role: 'Fantasy Author',
      image: '/images/creator-1.jpg',
      stories: 12,
      followers: '5.2K',
      quote: 'Lumen Tales has transformed how I create and share my stories. The ability to visualize characters consistently across different emotional states has brought my narratives to life in ways I never imagined possible.',
    },
    {
      id: '2',
      name: 'Marcus Chen',
      role: 'Sci-Fi Writer',
      image: '/images/creator-2.jpg',
      stories: 8,
      followers: '3.8K',
      quote: 'The token economy has allowed me to build a sustainable income from my creative work. My readers become investors in my stories, creating a community that grows together.',
    },
    {
      id: '3',
      name: 'Sophia Williams',
      role: 'Mystery Author',
      image: '/images/creator-3.jpg',
      stories: 15,
      followers: '7.1K',
      quote: 'The branching narrative tools make it easy to craft complex storylines with multiple endings. My readers love the interactive experience, and I love seeing which choices they make.',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-2 text-gray-900 mb-4">Meet Our Creators</h2>
          <p className="text-gray-600">
            Talented storytellers who are redefining interactive fiction with AI-powered characters and branching narratives.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {creators.map((creator, index) => (
            <motion.div
              key={creator.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative h-64">
                <Image
                  src={creator.image}
                  alt={creator.name}
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl font-semibold">{creator.name}</h3>
                  <p className="text-sm text-gray-200">{creator.role}</p>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between mb-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary-600">{creator.stories}</p>
                    <p className="text-sm text-gray-600">Stories</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary-600">{creator.followers}</p>
                    <p className="text-sm text-gray-600">Followers</p>
                  </div>
                </div>
                
                <blockquote className="italic text-gray-700 border-l-4 border-primary-200 pl-4 py-2">
                  "{creator.quote}"
                </blockquote>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="heading-3 text-gray-900 mb-6">Join Our Creator Community</h3>
          <div className="max-w-2xl mx-auto">
            <p className="text-gray-600 mb-8">
              Become part of a thriving ecosystem of storytellers, artists, and readers. Create interactive narratives, monetize your creativity, and build a loyal following.
            </p>
            <button className="btn btn-primary">Apply to Become a Creator</button>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <div className="bg-white rounded-full p-2 shadow-md">
              <Image
                src="/images/creator-badge-1.png"
                alt="Creator Badge"
                width={60}
                height={60}
              />
            </div>
            <div className="bg-white rounded-full p-2 shadow-md">
              <Image
                src="/images/creator-badge-2.png"
                alt="Creator Badge"
                width={60}
                height={60}
              />
            </div>
            <div className="bg-white rounded-full p-2 shadow-md">
              <Image
                src="/images/creator-badge-3.png"
                alt="Creator Badge"
                width={60}
                height={60}
              />
            </div>
            <div className="bg-white rounded-full p-2 shadow-md">
              <Image
                src="/images/creator-badge-4.png"
                alt="Creator Badge"
                width={60}
                height={60}
              />
            </div>
            <div className="bg-white rounded-full p-2 shadow-md">
              <Image
                src="/images/creator-badge-5.png"
                alt="Creator Badge"
                width={60}
                height={60}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreatorShowcase; 