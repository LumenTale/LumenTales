import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Button from '@components/ui/Button';

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-white py-20 sm:py-32">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-secondary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-accent-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="heading-1 text-gray-900 mb-6">
              <span className="block text-primary-600">Interactive Stories</span>
              <span className="block">Powered by AI & Blockchain</span>
            </h1>
            <p className="prose prose-lg mb-8">
              Lumen Tales is a groundbreaking platform that fuses AI-generated consistent character imagery with branching narratives, underpinned by a token economy. Influence story direction and witness characters visually evolve as narratives unfold.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="lg" href="/marketplace">
                Explore Stories
              </Button>
              <Button variant="outline" size="lg" href="/character-market">
                Character Market
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary-600">100+</p>
                <p className="text-sm text-gray-600">Interactive Stories</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary-600">10K+</p>
                <p className="text-sm text-gray-600">Active Readers</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary-600">500+</p>
                <p className="text-sm text-gray-600">Creators</p>
              </div>
            </div>
          </motion.div>

          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full h-[500px] rounded-lg shadow-xl overflow-hidden">
              <Image
                src="/images/hero-image.jpg"
                alt="Interactive storytelling with AI characters"
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              {/* Character showcase */}
              <div className="absolute bottom-6 left-6 right-6 flex justify-between">
                <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src="/images/character-1.jpg"
                        alt="Character"
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Aria</h3>
                      <p className="text-xs text-gray-600">Protagonist</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src="/images/character-2.jpg"
                        alt="Character"
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Elian</h3>
                      <p className="text-xs text-gray-600">Companion</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Story choices */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-4 w-[80%]">
              <p className="text-sm text-gray-700 mb-3">What will you do next?</p>
              <div className="space-y-2">
                <Link href="/story/sample-story" className="block">
                  <button className="w-full text-left p-2 text-sm rounded-md bg-primary-50 hover:bg-primary-100 text-primary-700 transition-colors">
                    Investigate the mysterious sound coming from the forest
                  </button>
                </Link>
                <Link href="/preview/sample-story" className="block">
                  <button className="w-full text-left p-2 text-sm rounded-md bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors">
                    Continue along the path toward the village
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 