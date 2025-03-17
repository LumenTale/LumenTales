import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import CharacterMarket from '@/components/market/CharacterMarket';
import WalletConnector from '@/components/wallet/WalletConnector';

const CharacterMarketPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Character NFT Market | Lumen Tales</title>
        <meta name="description" content="Browse and purchase unique character NFTs for your interactive stories" />
      </Head>
      
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative bg-purple-700 text-white py-12 mb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="md:flex md:items-center md:justify-between">
              <div className="md:w-1/2">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Character NFT Marketplace
                </h1>
                <p className="mt-3 text-lg">
                  Purchase unique character NFTs to use in your stories. Each character comes
                  with unique attributes and can be used across multiple stories.
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => window.location.href = '/create-character'}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-purple-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Create Your Character
                  </button>
                </div>
              </div>
              <div className="mt-6 md:mt-0 md:w-1/2 flex justify-end">
                <WalletConnector variant="large" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Market Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {/* How It Works */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mb-4">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Browse Characters</h3>
                <p className="text-gray-600">
                  Explore our marketplace of unique character NFTs created by talented storytellers.
                  Filter by rarity, attributes, and price to find your perfect character.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mb-4">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Purchase NFTs</h3>
                <p className="text-gray-600">
                  Connect your wallet and purchase character NFTs using LUMEN tokens.
                  Each character is unique and ownership is recorded on the blockchain.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mb-4">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Use in Stories</h3>
                <p className="text-gray-600">
                  Use your characters in interactive stories. Characters' attributes will
                  influence story options and outcomes, creating unique experiences.
                </p>
              </div>
            </div>
          </div>
          
          {/* Character Market */}
          <CharacterMarket title="Browse All Characters" showFilters={true} />
        </div>
      </main>
    </>
  );
};

export default CharacterMarketPage; 