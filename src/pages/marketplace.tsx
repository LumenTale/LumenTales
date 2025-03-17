import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Tab } from '@headlessui/react';

import StoryCard from '@/components/story/StoryCard';
import WalletConnector from '@/components/wallet/WalletConnector';
import CharacterMarket from '@/components/market/CharacterMarket';
import { useAuth } from '@/hooks/useAuth';
import { Story, Character } from '@/types';

// Marketplace categories
const CATEGORIES = ['All Stories', 'Popular', 'New Releases', 'On Sale', 'Your Purchases'];

const Marketplace: NextPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [stories, setStories] = useState<Story[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  // Fetch stories on component mount
  useEffect(() => {
    fetchStories();
    fetchCharacters();
  }, []);

  // Fetch stories from API
  const fetchStories = async () => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      // const response = await fetch('/api/stories');
      // const data = await response.json();
      // setStories(data.stories);
      
      // Simulated API response
      setTimeout(() => {
        const mockStories: Story[] = [
          {
            id: 'story-1',
            title: 'The Crystal Cavern',
            description: 'Explore the mysterious crystal caverns and discover ancient secrets.',
            coverImage: '/images/stories/crystal-cavern.jpg',
            author: {
              id: 'user-1',
              name: 'Alex Writer',
              email: 'alex@example.com',
              role: 'creator',
              walletAddress: '8zJ3MFU3SRdrSpzoQn9NLpS1VNL7WuD4whCnNvpUNDv1',
              createdAt: '2023-05-15T10:30:00Z',
              updatedAt: '2023-05-15T10:30:00Z',
            },
            genre: ['Fantasy', 'Adventure'],
            tags: ['magic', 'exploration', 'treasure'],
            published: true,
            featured: true,
            tokenId: 'token-1',
            tokenPrice: 5,
            readCount: 1250,
            rating: 4.7,
            createdAt: '2023-05-20T14:30:00Z',
            updatedAt: '2023-06-01T09:15:00Z',
          },
          {
            id: 'story-2',
            title: 'Echoes of Tomorrow',
            description: 'A sci-fi thriller set in a dystopian future where time is a commodity.',
            coverImage: '/images/stories/echoes-tomorrow.jpg',
            author: {
              id: 'user-2',
              name: 'Sam Scribe',
              email: 'sam@example.com',
              role: 'creator',
              walletAddress: '5zJ3MFU3SRdrSpzoQn9NLpS1VNL7WuD4whCnNvpUNDv1',
              createdAt: '2023-04-10T08:20:00Z',
              updatedAt: '2023-04-10T08:20:00Z',
            },
            genre: ['Sci-Fi', 'Thriller'],
            tags: ['future', 'time', 'dystopia'],
            published: true,
            featured: false,
            tokenId: 'token-2',
            tokenPrice: 8,
            readCount: 986,
            rating: 4.5,
            createdAt: '2023-06-05T11:45:00Z',
            updatedAt: '2023-06-10T16:30:00Z',
          },
          {
            id: 'story-3',
            title: 'Whispers in the Mist',
            description: 'A haunting tale of mystery and suspense in a foggy coastal town.',
            coverImage: '/images/stories/whispers-mist.jpg',
            author: {
              id: 'user-3',
              name: 'Jordan Prose',
              email: 'jordan@example.com',
              role: 'creator',
              walletAddress: '3zJ3MFU3SRdrSpzoQn9NLpS1VNL7WuD4whCnNvpUNDv1',
              createdAt: '2023-03-22T15:40:00Z',
              updatedAt: '2023-03-22T15:40:00Z',
            },
            genre: ['Mystery', 'Horror'],
            tags: ['supernatural', 'suspense', 'small town'],
            published: true,
            featured: true,
            tokenId: 'token-3',
            tokenPrice: 6,
            readCount: 1520,
            rating: 4.9,
            createdAt: '2023-04-12T09:20:00Z',
            updatedAt: '2023-05-22T13:10:00Z',
          },
        ];
        
        setStories(mockStories);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Error fetching stories:', error);
      setIsLoading(false);
    }
  };

  // Fetch characters from API
  const fetchCharacters = async () => {
    try {
      // In a real app, this would be an API call
      // const response = await fetch('/api/characters');
      // const data = await response.json();
      // setCharacters(data.characters);
      
      // Simulated API response
      setTimeout(() => {
        const mockCharacters: Character[] = [
          {
            id: 'character-1',
            name: 'Eldrin the Mage',
            description: 'A powerful wizard with mastery over the elements.',
            baseImage: '/images/characters/eldrin.jpg',
            expressions: [
              {
                id: 'expression-1',
                name: 'neutral',
                image: '/images/characters/eldrin-neutral.jpg',
              },
              {
                id: 'expression-2',
                name: 'happy',
                image: '/images/characters/eldrin-happy.jpg',
              },
            ],
            storyId: 'story-1',
            createdAt: '2023-05-18T10:30:00Z',
            updatedAt: '2023-05-18T10:30:00Z',
          },
          {
            id: 'character-2',
            name: 'Nova the Explorer',
            description: 'A brave adventurer with a knack for finding trouble.',
            baseImage: '/images/characters/nova.jpg',
            expressions: [
              {
                id: 'expression-3',
                name: 'neutral',
                image: '/images/characters/nova-neutral.jpg',
              },
              {
                id: 'expression-4',
                name: 'surprised',
                image: '/images/characters/nova-surprised.jpg',
              },
            ],
            storyId: 'story-2',
            createdAt: '2023-06-02T14:45:00Z',
            updatedAt: '2023-06-02T14:45:00Z',
          },
        ];
        
        setCharacters(mockCharacters);
      }, 2000);
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };

  // Filter stories based on search input
  const filteredStories = stories.filter(story => {
    const searchTerms = filter.toLowerCase().split(' ');
    
    return searchTerms.every(term => 
      story.title.toLowerCase().includes(term) ||
      story.description.toLowerCase().includes(term) ||
      story.author.name.toLowerCase().includes(term) ||
      story.genre.some(g => g.toLowerCase().includes(term)) ||
      story.tags.some(t => t.toLowerCase().includes(term))
    );
  });

  // Get stories for the selected category
  const getCategoryStories = (categoryIndex: number) => {
    switch (categoryIndex) {
      case 0: // All Stories
        return filteredStories;
      case 1: // Popular
        return filteredStories.sort((a, b) => b.readCount - a.readCount);
      case 2: // New Releases
        return filteredStories.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case 3: // On Sale
        return filteredStories.filter(story => story.tokenPrice && story.tokenPrice > 0);
      case 4: // Your Purchases
        // In a real app, this would filter for stories the user has purchased
        return user ? filteredStories.filter(story => story.id.includes('1')) : [];
      default:
        return filteredStories;
    }
  };

  return (
    <>
      <Head>
        <title>Lumen Tales Marketplace</title>
        <meta name="description" content="Explore and purchase interactive stories and characters" />
      </Head>

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative bg-purple-700 text-white py-12 mb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="md:flex md:items-center md:justify-between">
              <div className="md:w-1/2">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Discover Interactive Stories
                </h1>
                <p className="mt-3 text-lg">
                  Explore unique interactive narratives and collect characters as NFTs.
                  Write your own adventure and earn tokens.
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => router.push('/create')}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-purple-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Create Your Story
                  </button>
                </div>
              </div>
              <div className="mt-6 md:mt-0 md:w-1/2 flex justify-end">
                <WalletConnector variant="large" />
              </div>
            </div>
          </div>
        </div>

        {/* Marketplace Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          {/* Search and Filter */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="relative w-full md:w-96">
                <input
                  type="text"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  placeholder="Search stories, genres, authors..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  {filteredStories.length} {filteredStories.length === 1 ? 'story' : 'stories'} found
                </span>
                <button
                  onClick={fetchStories}
                  className="p-2 text-gray-500 hover:text-purple-700"
                  title="Refresh"
                >
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <Tab.Group selectedIndex={selectedCategory} onChange={setSelectedCategory}>
            <Tab.List className="flex space-x-1 rounded-xl bg-purple-100 p-1 mb-6">
              {CATEGORIES.map((category) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    `w-full rounded-lg py-2.5 text-sm font-medium leading-5 ${
                      selected
                        ? 'bg-white text-purple-700 shadow'
                        : 'text-purple-500 hover:bg-white/[0.12] hover:text-purple-600'
                    }`
                  }
                >
                  {category}
                </Tab>
              ))}
            </Tab.List>
            
            <Tab.Panels>
              {CATEGORIES.map((category, idx) => (
                <Tab.Panel key={idx} className="focus:outline-none">
                  {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div key={item} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                          <div className="bg-gray-300 h-48 w-full rounded-md mb-4"></div>
                          <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                          <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      {getCategoryStories(idx).length === 0 ? (
                        <div className="text-center py-16">
                          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <h3 className="mt-2 text-sm font-medium text-gray-900">No stories found</h3>
                          <p className="mt-1 text-sm text-gray-500">
                            {idx === 4 && !user 
                              ? 'Connect your wallet to see your purchased stories' 
                              : 'Try adjusting your search or check back later for new additions.'}
                          </p>
                          {idx === 4 && !user && (
                            <div className="mt-6">
                              <WalletConnector variant="small" />
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {getCategoryStories(idx).map((story) => (
                            <StoryCard 
                              key={story.id} 
                              story={story} 
                              onClick={() => router.push(`/story/${story.id}`)}
                            />
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>

          {/* Featured Character NFTs */}
          <div className="mt-16 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Featured Character NFTs</h2>
              <button 
                onClick={() => router.push('/character-market')} 
                className="text-purple-600 hover:text-purple-800 font-medium"
              >
                View All Characters
              </button>
            </div>
            
            <CharacterMarket maxDisplay={3} showFilters={false} title="" />
          </div>
        </div>
      </main>
    </>
  );
};

export default Marketplace; 