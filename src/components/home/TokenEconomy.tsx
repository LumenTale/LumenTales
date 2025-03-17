import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const TokenEconomy: React.FC = () => {
  const tokenFeatures = [
    {
      title: 'Story Tokens',
      description: 'Unique tokens for individual stories with limited editions. Value increases with popularity and reader engagement.',
      icon: '/icons/story-token.svg',
    },
    {
      title: 'Character NFTs',
      description: 'Ownership rights to specific characters with their complete visual library across emotions and scenes.',
      icon: '/icons/character-nft.svg',
    },
    {
      title: 'Premium Choices',
      description: 'Unlock exclusive story paths and endings using tokens, adding depth and replayability to narratives.',
      icon: '/icons/premium-choice.svg',
    },
    {
      title: 'Creator Royalties',
      description: 'Automatic distribution of transaction fees to original creators, ensuring sustainable income.',
      icon: '/icons/creator-royalty.svg',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-primary-50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-2 text-gray-900 mb-4">Token Economy</h2>
          <p className="text-gray-600">
            Our blockchain-powered ecosystem creates value for both creators and readers, turning stories into digital assets with real-world value.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {tokenFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="w-16 h-16 mb-4 mx-auto">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={64}
                  height={64}
                />
              </div>
              <h3 className="text-xl font-semibold text-center text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 lg:p-12">
              <h3 className="heading-3 text-gray-900 mb-6">How Tokens Create Value</h3>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-md bg-primary-100 text-primary-600">
                      <span className="text-xl font-bold">1</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">Initial Story Offering</h4>
                    <p className="mt-2 text-gray-600">Creators launch story tokens at starter values, allowing early supporters to invest in promising narratives.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-md bg-primary-100 text-primary-600">
                      <span className="text-xl font-bold">2</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">Value Appreciation</h4>
                    <p className="mt-2 text-gray-600">As stories gain popularity and reader engagement increases, token values rise, benefiting both creators and early investors.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-md bg-primary-100 text-primary-600">
                      <span className="text-xl font-bold">3</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">Secondary Market</h4>
                    <p className="mt-2 text-gray-600">Tokens and NFTs can be traded on our marketplace, with a percentage of each transaction going back to the original creator.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-md bg-primary-100 text-primary-600">
                      <span className="text-xl font-bold">4</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">Ecosystem Growth</h4>
                    <p className="mt-2 text-gray-600">The platform treasury supports new creators, funds development, and ensures long-term sustainability of the ecosystem.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Link
                  href="/token-economy"
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                >
                  Learn more about our token economy
                  <FiArrowRight className="ml-2" />
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <Image
                src="/images/token-value.jpg"
                alt="Token Value Creation"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TokenEconomy; 