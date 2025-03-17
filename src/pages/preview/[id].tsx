import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { FiArrowLeft, FiBookOpen, FiShoppingCart } from 'react-icons/fi';
import { useAuth } from '@/hooks/useAuth';
import { Story, User, StoryChapter } from '@/types';
import PurchaseStoryButton from '@/components/market/PurchaseStoryButton';

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

const PreviewPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const auth = useAuth() as unknown as AuthContextType;
  const { user } = auth;
  
  const [story, setStory] = useState<Story | null>(null);
  const [chapter, setChapter] = useState<StoryChapter | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [purchaseError, setPurchaseError] = useState<string | null>(null);
  
  // Fetch story data on component mount
  useEffect(() => {
    if (id) {
      fetchStory(id as string);
      fetchPreviewChapter(id as string);
    } else {
      // Use a sample ID if none provided
      const sampleId = "sample-story";
      fetchStory(sampleId);
      fetchPreviewChapter(sampleId);
    }
  }, [id]);
  
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
      }, 800);
    } catch (error) {
      console.error('Error fetching story:', error);
    }
  };
  
  // Fetch preview chapter (first chapter) from API
  const fetchPreviewChapter = async (storyId: string) => {
    try {
      // In a real app, this would be an API call
      // const response = await fetch(`/api/stories/${storyId}/preview`);
      // const data = await response.json();
      // setChapter(data.chapter);
      
      // Simulated API response
      setTimeout(() => {
        // Create a mock chapter
        const mockChapter: StoryChapter = {
          id: 'ch-1',
          title: 'Chapter 1: The Entrance',
          content: '<p>You stand at the entrance to the fabled Crystal Caverns, a maze of sparkling tunnels that twists deep into the heart of Mount Lumina. Legend says that within its depths lies an ancient artifact of immense power, guarded by puzzles and perils that have thwarted many adventurers before you.</p>' +
          '<p>The glow of your lantern catches on the crystalline walls, sending rainbow reflections dancing across your face. The air is cool and still, with a faint scent of mineral and something else—something ancient and mysterious.</p>' +
          '<p>Your guide, an old miner named Thorne, points to two tunnels branching from the entrance chamber. &quot;The left path is longer but safer,&quot; he says, his voice echoing slightly. &quot;The right is more direct, but strange noises have been reported. Those who took that path... well, not all returned.&quot;</p>' +
          '<p>He hands you the map—old and faded, but still legible. &quot;This is as far as I go,&quot; he says. &quot;The caverns have a way of changing a person. Whatever you seek in there, I hope it&apos;s worth the journey.&quot;</p>' +
          '<p>As Thorne departs, you&apos;re left alone with the soft hum of the crystals and the weight of your decision.</p>' +
          '<h3>What do you do?</h3>' +
          '<p>Take the left tunnel, following the safer route.<br/>' +
          'Choose the right tunnel, braving whatever dangers it might hold.<br/>' +
          'Examine the crystalline walls of the entrance chamber more closely before proceeding.</p>' +
          '<div class="mt-8 p-4 bg-purple-50 border border-purple-100 rounded-md">' +
          '<h4 class="text-lg font-semibold text-purple-800">Preview Ends Here</h4>' +
          '<p class="text-purple-700">To continue reading and make choices in this interactive story, please purchase the full version.</p>' +
          '</div>',
          orderIndex: 0,
          storyId: storyId,
          createdAt: '2023-05-20T14:30:00Z',
          updatedAt: '2023-05-20T14:30:00Z',
        };
        
        setChapter(mockChapter);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching chapter:', error);
      setIsLoading(false);
    }
  };
  
  // Handle story purchase success
  const handlePurchaseSuccess = (txId: string) => {
    console.log('Purchase successful. Transaction ID:', txId);
    setPurchaseError(null);
    // Redirect to reader
    router.push(`/reader/${id}`);
  };
  
  // Handle story purchase error
  const handlePurchaseError = (error: Error) => {
    console.error('Purchase error:', error);
    setPurchaseError(error.message);
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
  if (!story || !chapter) {
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
        <title>{`Preview: ${story.title} | Lumen Tales`}</title>
        <meta name="description" content={`Preview of ${story.title} by ${story.author.name}`} />
      </Head>
      
      <header className="sticky top-0 z-10 bg-white border-b shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
          <button
            onClick={() => router.push(`/story/${story.id}`)}
            className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            <FiArrowLeft className="mr-2" />
            Back to Story
          </button>
          
          <h1 className="text-sm font-medium text-gray-900 truncate max-w-[200px] md:max-w-xs">
            Preview: {story.title}
          </h1>
          
          <div className="flex items-center">
            <PurchaseStoryButton
              story={story}
              onSuccess={handlePurchaseSuccess}
              onError={handlePurchaseError}
              variant="small"
            />
          </div>
        </div>
      </header>
      
      <main className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-3xl mx-auto px-4">
          {/* Preview Banner */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-lg mb-8 shadow-md">
            <div className="flex items-start">
              <FiBookOpen className="mr-3 mt-1 flex-shrink-0" size={24} />
              <div>
                <h2 className="font-bold text-lg mb-1">Story Preview</h2>
                <p className="text-sm text-purple-100">
                  You're reading a preview of {story.title}. Purchase the full story to continue your adventure and make choices that matter.
                </p>
              </div>
            </div>
          </div>
          
          {/* Chapter Content */}
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{chapter.title}</h2>
            
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: chapter.content }}
            />
          </div>
          
          {/* Purchase Call to Action */}
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-purple-500">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Ready to continue your adventure?</h3>
            <p className="text-gray-600 mb-6">
              Purchase this story now to unlock all chapters and make choices that shape your unique journey through the narrative.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <PurchaseStoryButton
                story={story}
                onSuccess={handlePurchaseSuccess}
                onError={handlePurchaseError}
                variant="large"
              />
              
              <button
                onClick={() => router.push('/marketplace')}
                className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <FiShoppingCart className="mr-2" />
                Browse More Stories
              </button>
            </div>
            
            {purchaseError && (
              <p className="mt-4 text-red-500 text-sm">{purchaseError}</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default PreviewPage; 