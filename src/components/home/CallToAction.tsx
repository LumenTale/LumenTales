import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const CallToAction: React.FC = () => {
  return (
    <section className="py-20 bg-primary-600 text-white">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Start Your Interactive Journey Today
            </h2>
            <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
              Explore immersive stories, create your own narratives, or invest in the future of interactive fiction.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/explore" className="btn bg-white text-primary-600 hover:bg-primary-50">
                Explore Stories
              </Link>
              <Link href="/create" className="btn bg-primary-500 text-white border border-primary-400 hover:bg-primary-700">
                Create Your Story
              </Link>
              <Link href="/marketplace" className="btn bg-transparent text-white border border-white hover:bg-primary-700">
                Visit Marketplace
              </Link>
            </div>
          </motion.div>
          
          <div className="mt-16 pt-16 border-t border-primary-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">100+ Stories</h3>
                <p className="text-primary-100">
                  Explore our growing library of interactive narratives across multiple genres.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">10,000+ Users</h3>
                <p className="text-primary-100">
                  Join our thriving community of readers, creators, and investors.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">$2M+ Traded</h3>
                <p className="text-primary-100">
                  Our marketplace has facilitated over $2 million in story token transactions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction; 