import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiBookOpen, FiImage, FiGift, FiDollarSign } from 'react-icons/fi';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <FiBookOpen className="w-6 h-6" />,
      title: 'Interactive Storytelling',
      description: 'Immerse yourself in branching narratives where your choices shape the story. Each decision leads to different paths and outcomes.',
      color: 'bg-primary-100 text-primary-700',
    },
    {
      icon: <FiImage className="w-6 h-6" />,
      title: 'AI-Generated Imagery',
      description: 'Experience consistent character visualization across emotional states and scenes, powered by advanced AI technology.',
      color: 'bg-secondary-100 text-secondary-700',
    },
    {
      icon: <FiGift className="w-6 h-6" />,
      title: 'Collect Digital Assets',
      description: 'Acquire unique story tokens and character NFTs that have real value in our ecosystem and can be traded on the marketplace.',
      color: 'bg-accent-100 text-accent-700',
    },
    {
      icon: <FiDollarSign className="w-6 h-6" />,
      title: 'Creator Economy',
      description: 'Support creators directly by purchasing their stories and premium choices, or become a creator yourself and monetize your work.',
      color: 'bg-green-100 text-green-700',
    },
  ];

  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-2 text-gray-900 mb-4">How Lumen Tales Works</h2>
          <p className="text-gray-600">
            Our platform combines interactive storytelling, AI-generated imagery, and blockchain technology to create a unique narrative experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card p-6 flex flex-col items-center text-center"
            >
              <div className={`w-14 h-14 rounded-full ${step.color} flex items-center justify-center mb-4`}>
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-20">
          <div className="bg-gray-50 rounded-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <h3 className="heading-3 text-gray-900 mb-4">The Token Economy</h3>
                <p className="text-gray-600 mb-6">
                  Lumen Tales introduces a sustainable token economy where stories become digital assets with real value. Creators earn from their work, readers invest in narratives they love, and everyone benefits from a thriving ecosystem.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-primary-100 text-primary-700 rounded-full p-1 mr-3 mt-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span className="text-gray-700">Story tokens with potential appreciation value</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary-100 text-primary-700 rounded-full p-1 mr-3 mt-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span className="text-gray-700">Character NFTs with unique attributes and expressions</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary-100 text-primary-700 rounded-full p-1 mr-3 mt-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span className="text-gray-700">Premium choices unlocked with tokens</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary-100 text-primary-700 rounded-full p-1 mr-3 mt-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span className="text-gray-700">Creator royalties for ongoing passive income</span>
                  </li>
                </ul>
              </div>
              <div className="relative h-80 lg:h-auto">
                <Image
                  src="/images/token-economy.jpg"
                  alt="Lumen Tales Token Economy"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks; 