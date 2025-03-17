import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { FiClock, FiUser, FiStar, FiBookOpen, FiTag } from 'react-icons/fi';
import PurchaseStoryButton from '@/components/market/PurchaseStoryButton';
import WalletConnector from '@/components/wallet/WalletConnector';
import { useAuth } from '@/hooks/useAuth';
import { Story, User } from '@/types';

// Type for Auth Context
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
}

const StoryDetailPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const auth = useAuth() as unknown as AuthContextType;
  const { user } = auth;
  
  const [story, setStory] = useState<Story | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasUserPurchased, setHasUserPurchased] = useState<boolean>(false);
  const [purchaseError, setPurchaseError] = useState<string | null>(null);
  
  // Fetch story data on component mount
  useEffect(() => {
    if (id) {
      fetchStory(id as string);
    } else {
      // Use a sample ID if none provided
      const sampleId = "sample-story";
      fetchStory(sampleId);
    }
  }, [id]);
  
  // Check if user has purchased this story
  useEffect(() => {
    if (user && story) {
      // In a real app, this would be an API call to check purchase status
      // For now, we'll simulate random ownership
      const hasPurchased = Math.random() > 0.5;
      setHasUserPurchased(hasPurchased);
    }
  }, [user, story]);
  
  // Fetch story from API
  const fetchStory = async (storyId: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      // const response = await fetch(`/api/stories/${storyId}`);
      // const data = await response.json();
      // setStory(data.story);
      
      // Simulated API response
      setTimeout(() => {
        // Create a mock story
        const mockStory: Story = {
          id: storyId,
          title: 'The Crystal Cavern',
          description: 'Explore the mysterious crystal caverns and discover ancient secrets. Your choices will determine your fate in this magical adventure through a world of wonder and danger.',
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
          tags: ['magic', 'exploration', 'treasure', 'puzzles', 'mythology'],
          published: true,
          featured: true,
          tokenId: 'token-1',
          tokenPrice: 5,
          readCount: 1250,
          rating: 4.7,
          createdAt: '2023-05-20T14:30:00Z',
          updatedAt: '2023-06-01T09:15:00Z',
        };
        
        setStory(mockStory);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching story:', error);
      setIsLoading(false);
    }
  };
  
  // Handle story purchase success
  const handlePurchaseSuccess = (txId: string) => {
    console.log('Purchase successful. Transaction ID:', txId);
    setHasUserPurchased(true);
    setPurchaseError(null);
    // In a real app, you might want to reload the story data or redirect to the reader
  };
  
  // Handle story purchase error
  const handlePurchaseError = (error: Error) => {
    console.error('Purchase error:', error);
    setPurchaseError(error.message);
  };
  
  // Handle read button click
  const handleReadClick = () => {
    if (story) {
      router.push(`/reader/${story.id}`);
    }
  };
  
  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }
  
  // Error state if story not found
  if (!story) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Story Not Found</h1>
        <p className="text-gray-600 mb-6">The story you are looking for does not exist or has been removed.</p>
        <button
          onClick={() => router.push('/marketplace')}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          Browse Stories
        </button>
      </div>
    );
  }
  
  return (
    <>
      <Head>
        <title>{story.title} | Lumen Tales</title>
        <meta name="description" content={story.description} />
        {/* Open Graph metadata */}
        <meta property="og:title" content={`${story.title} | Lumen Tales`} />
        <meta property="og:description" content={story.description} />
        <meta property="og:image" content={story.coverImage} />
        <meta property="og:type" content="book" />
      </Head>
      
      <main className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Story Header */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden mb-10">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
              {/* Cover Image */}
              <div className="md:col-span-1 h-64 md:h-full relative">
                <Image
                  src={story.coverImage}
                  alt={story.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Story Details */}
              <div className="md:col-span-2 lg:col-span-3 p-6">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{story.title}</h1>
                    
                    {/* Author */}
                    <div className="flex items-center mb-4">
                      <FiUser className="text-gray-500 mr-2" />
                      <span className="text-gray-700">by {story.author.name}</span>
                    </div>
                    
                    {/* Story Meta */}
                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="flex items-center text-gray-600">
                        <FiStar className="text-yellow-500 mr-1" />
                        <span>{story.rating}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <FiBookOpen className="mr-1" />
                        <span>{story.readCount} reads</span>
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <FiClock className="mr-1" />
                        <span>Published {new Date(story.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    {/* Story Description */}
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">Description</h2>
                      <p className="text-gray-700">{story.description}</p>
                    </div>
                    
                    {/* Genres & Tags */}
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {story.genre.map((genre) => (
                          <span 
                            key={genre} 
                            className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {story.tags.map((tag) => (
                          <span 
                            key={tag} 
                            className="flex items-center bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs"
                          >
                            <FiTag className="mr-1" size={12} />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="mt-6 flex flex-col sm:flex-row gap-4">
                    {/* Purchase Button (or Read Button if already purchased) */}
                    {hasUserPurchased ? (
                      <button
                        onClick={handleReadClick}
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      >
                        <FiBookOpen className="mr-2" /> Read Story
                      </button>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <PurchaseStoryButton
                          story={story}
                          onSuccess={handlePurchaseSuccess}
                          onError={handlePurchaseError}
                          variant="large"
                        />
                        
                        {!user && (
                          <div className="flex items-center justify-center sm:justify-start">
                            <WalletConnector variant="small" />
                          </div>
                        )}
                        
                        {purchaseError && (
                          <p className="text-red-500 text-sm">{purchaseError}</p>
                        )}
                      </div>
                    )}
                    
                    {/* Preview Button */}
                    <button
                      onClick={() => router.push(`/preview/${story.id}`)}
                      className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      Preview First Chapter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Related Stories Section */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {/* This would normally be populated with actual related stories */}
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-40 bg-gray-300 relative">
                    {/* Placeholder for story cover */}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">Related Story {i}</h3>
                    <p className="text-gray-600 text-sm mb-2">Short description of related story...</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Author Name</span>
                      <span className="text-purple-600 font-semibold">5 LUMEN</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default StoryDetailPage; 