import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { FiArrowLeft, FiArrowRight, FiBookmark, FiSettings, FiHome } from 'react-icons/fi';
import { useAuth } from '@/hooks/useAuth';
import { Story, User, StoryChapter } from '@/types';

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

const ReaderPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const auth = useAuth() as unknown as AuthContextType;
  const { user } = auth;
  
  const [story, setStory] = useState<Story | null>(null);
  const [chapters, setChapters] = useState<StoryChapter[]>([]);
  const [currentChapterIndex, setCurrentChapterIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasAccess, setHasAccess] = useState<boolean>(false);
  const [fontSizeClass, setFontSizeClass] = useState<string>('text-base');
  const [theme, setTheme] = useState<string>('light');
  const [showSettings, setShowSettings] = useState<boolean>(false);
  
  // Fetch story data on component mount
  useEffect(() => {
    if (id && user) {
      fetchStory(id as string);
      checkUserAccess(id as string);
    } else if (id) {
      // Redirect to story page if not logged in
      router.push(`/story/${id}`);
    } else {
      // Use a sample ID if none provided
      const sampleId = "sample-story";
      if (user) {
        fetchStory(sampleId);
        checkUserAccess(sampleId);
      } else {
        router.push(`/story/${sampleId}`);
      }
    }
  }, [id, user]);
  
  // Check if user has access to this story
  const checkUserAccess = async (storyId: string) => {
    // In a real app, this would be an API call to check purchase status
    // For now, we'll simulate that the user has access
    setHasAccess(true);
  };
  
  // Fetch story and chapters from API
  const fetchStory = async (storyId: string) => {
    setIsLoading(true);
    try {
      // In a real app, these would be API calls
      // const storyResponse = await fetch(`/api/stories/${storyId}`);
      // const storyData = await storyResponse.json();
      // setStory(storyData.story);
      
      // const chaptersResponse = await fetch(`/api/stories/${storyId}/chapters`);
      // const chaptersData = await chaptersResponse.json();
      // setChapters(chaptersData.chapters);
      
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
        
        // Create mock chapters
        const mockChapters: StoryChapter[] = [
          {
            id: 'ch-1',
            title: 'Chapter 1: The Entrance',
            content: `<p>You stand at the entrance to the fabled Crystal Caverns, a maze of sparkling tunnels that twists deep into the heart of Mount Lumina. Legend says that within its depths lies an ancient artifact of immense power, guarded by puzzles and perils that have thwarted many adventurers before you.</p>
            <p>The glow of your lantern catches on the crystalline walls, sending rainbow reflections dancing across your face. The air is cool and still, with a faint scent of mineral and something else—something ancient and mysterious.</p>
            <p>Your guide, an old miner named Thorne, points to two tunnels branching from the entrance chamber. &quot;The left path is longer but safer,&quot; he says, his voice echoing slightly. &quot;The right is more direct, but strange noises have been reported. Those who took that path... well, not all returned.&quot;</p>
            <p>He hands you the map—old and faded, but still legible. &quot;This is as far as I go,&quot; he says. &quot;The caverns have a way of changing a person. Whatever you seek in there, I hope it&apos;s worth the journey.&quot;</p>
            <p>As Thorne departs, you&apos;re left alone with the soft hum of the crystals and the weight of your decision.</p>
            <h3>What do you do?</h3>
            <p>Take the left tunnel, following the safer route.<br>
            Choose the right tunnel, braving whatever dangers it might hold.<br>
            Examine the crystalline walls of the entrance chamber more closely before proceeding.</p>`,
            orderIndex: 0,
            storyId: storyId,
            createdAt: '2023-05-20T14:30:00Z',
            updatedAt: '2023-05-20T14:30:00Z',
          },
          {
            id: 'ch-2',
            title: 'Chapter 2: Crystal Whispers',
            content: `<p>You decide to examine the crystalline walls more closely before venturing deeper into the caverns. As you approach, the crystals seem to pulse with an inner light, almost as if responding to your presence.</p>
            <p>Running your fingers along the smooth surface, you feel a gentle vibration. The crystals are warm to the touch, despite the cool air of the cave. Leaning closer, you hear something—a whisper so faint it might be your imagination.</p>
            <p><em>&quot;Seeker... balance... beware the heart...&quot;</em></p>
            <p>The words fade as quickly as they came, leaving you wondering if the legends of the cavern&apos;s magic might be true after all.</p>
            <p>As you step back, you notice something you missed before: subtle etchings in the wall between the two tunnels. They show simple symbols: a sun above the left tunnel and a moon above the right. Below them both, an inscription reads: &quot;As above, so below. The path of balance leads to wisdom.&quot;</p>
            <p>With this new information, you reconsider your options. The crystalline whispers and ancient etchings have given you pause, but ultimately, a choice must be made.</p>
            <h3>What do you do now?</h3>
            <p>Take the left tunnel, the path of the sun.<br>
            Choose the right tunnel, the path of the moon.<br>
            Look for a third, hidden path that might represent balance.</p>`,
            orderIndex: 1,
            storyId: storyId,
            createdAt: '2023-05-20T14:30:00Z',
            updatedAt: '2023-05-20T14:30:00Z',
          },
          {
            id: 'ch-3',
            title: 'Chapter 3: The Hidden Path',
            content: `<p>Trusting your instincts, you search for a third path—one that might represent the balance mentioned in the inscription. The wall between the two obvious tunnels draws your attention again.</p>
            <p>You press your hands against the cool stone, feeling along its surface for any irregularities. Near the bottom, your fingers catch on a small indentation. Kneeling down, you discover a symbol etched into the stone: a perfect circle with a horizontal line through its center—a symbol of balance.</p>
            <p>When you press the symbol, a grinding sound echoes through the chamber. The wall slowly slides aside, revealing a narrow passage that would have been easy to miss. Unlike the other two tunnels, this one isn&apos;t lined with crystals. Instead, it&apos;s a smooth, natural stone passage that curves gently downward.</p>
            <p>The air flowing from this hidden path feels different—neither warm nor cool, but perfectly balanced between the two. There&apos;s a sense of rightness about it that the other paths lacked.</p>
            <p>As you step into the passage, the entrance slides closed behind you, leaving no option but to move forward. The path descends in a gentle spiral, taking you deeper into the mountain than you expected. After what feels like an hour of walking, the tunnel opens into a breathtaking sight.</p>
            <p>You&apos;ve entered an enormous underground chamber, its ceiling so high it disappears into darkness. At the center stands a lake of perfect stillness, its surface reflecting the light from crystals embedded in the walls like stars. On the far shore, a small island rises from the water, holding what appears to be a stone pedestal.</p>
            <p>The only way forward seems to be across the lake, but there&apos;s no obvious path or boat. The water is clear enough to see that the lake is deeper than should be possible—a bottomless pool descending into darkness.</p>
            <h3>What do you do?</h3>
            <p>Look for a way to cross the lake to reach the island.<br>
            Test the water to see if it&apos;s safe to touch or swim in.<br>
            Call out to see if anyone or anything inhabits this chamber.</p>`,
            orderIndex: 2,
            storyId: storyId,
            createdAt: '2023-05-20T14:30:00Z',
            updatedAt: '2023-05-20T14:30:00Z',
          },
        ];
        
        setChapters(mockChapters);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Error fetching story data:', error);
      setIsLoading(false);
    }
  };
  
  // Navigate to previous chapter
  const goToPreviousChapter = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(currentChapterIndex - 1);
      window.scrollTo(0, 0);
    }
  };
  
  // Navigate to next chapter
  const goToNextChapter = () => {
    if (currentChapterIndex < chapters.length - 1) {
      setCurrentChapterIndex(currentChapterIndex + 1);
      window.scrollTo(0, 0);
    }
  };
  
  // Toggle font size
  const toggleFontSize = () => {
    const sizes = ['text-sm', 'text-base', 'text-lg', 'text-xl'];
    const currentIndex = sizes.indexOf(fontSizeClass);
    const nextIndex = (currentIndex + 1) % sizes.length;
    setFontSizeClass(sizes[nextIndex]);
  };
  
  // Toggle theme (light/dark)
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  // Handle return to marketplace
  const handleReturnToMarketplace = () => {
    router.push('/marketplace');
  };
  
  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }
  
  // Access denied state
  if (!hasAccess && !isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen p-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-6 text-center">
          You need to purchase this story to read it.
        </p>
        <button
          onClick={() => router.push(`/story/${id}`)}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          Go to Story Page
        </button>
      </div>
    );
  }
  
  // If no story or chapters found
  if (!story || chapters.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen p-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Story Not Found</h1>
        <p className="text-gray-600 mb-6 text-center">
          The story you are looking for does not exist or has been removed.
        </p>
        <button
          onClick={handleReturnToMarketplace}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          Browse Stories
        </button>
      </div>
    );
  }
  
  const currentChapter = chapters[currentChapterIndex];
  
  return (
    <>
      <Head>
        <title>{`${currentChapter.title} | ${story.title} | Lumen Tales`}</title>
        <meta name="description" content={`Reading ${story.title} by ${story.author.name}`} />
      </Head>
      
      <div className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark' 
          ? 'bg-gray-900 text-gray-100' 
          : 'bg-gray-50 text-gray-900'
      }`}>
        {/* Reader Header */}
        <header className={`sticky top-0 z-10 ${
          theme === 'dark' 
            ? 'bg-gray-800 text-gray-100 border-gray-700' 
            : 'bg-white text-gray-900 border-gray-200'
        } border-b shadow-sm`}>
          <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
            <button
              onClick={() => router.push(`/story/${story.id}`)}
              className="flex items-center text-sm font-medium"
            >
              <FiArrowLeft className="mr-2" />
              Back to Story
            </button>
            
            <h1 className="text-sm font-medium truncate max-w-[200px] md:max-w-xs">
              {story.title}
            </h1>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                aria-label="Settings"
              >
                <FiSettings />
              </button>
              
              <button
                onClick={handleReturnToMarketplace}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                aria-label="Return to Marketplace"
              >
                <FiHome />
              </button>
            </div>
          </div>
          
          {/* Settings Panel */}
          {showSettings && (
            <div className={`${
              theme === 'dark' 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            } border-t px-4 py-3`}>
              <div className="max-w-4xl mx-auto flex flex-wrap justify-between items-center gap-4">
                <div>
                  <p className="text-sm font-medium mb-1">Font Size</p>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={toggleFontSize}
                      className={`px-3 py-1 rounded ${
                        theme === 'dark' 
                          ? 'bg-gray-700 hover:bg-gray-600' 
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {fontSizeClass === 'text-sm' ? 'Small' : 
                       fontSizeClass === 'text-base' ? 'Medium' : 
                       fontSizeClass === 'text-lg' ? 'Large' : 'Extra Large'}
                    </button>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-1">Theme</p>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={toggleTheme}
                      className={`px-3 py-1 rounded ${
                        theme === 'dark' 
                          ? 'bg-gray-700 hover:bg-gray-600' 
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
                    </button>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-1">Progress</p>
                  <div className="text-sm">
                    Chapter {currentChapterIndex + 1} of {chapters.length}
                  </div>
                </div>
              </div>
            </div>
          )}
        </header>
        
        {/* Chapter Content */}
        <main className="max-w-3xl mx-auto px-4 py-8 md:py-12">
          <h2 className={`text-2xl font-bold mb-6 ${
            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
          }`}>
            {currentChapter.title}
          </h2>
          
          <div 
            className={`prose max-w-none ${fontSizeClass} ${
              theme === 'dark' ? 'prose-invert' : ''
            }`}
            dangerouslySetInnerHTML={{ __html: currentChapter.content }}
          />
          
          {/* Chapter Navigation */}
          <div className="mt-12 flex justify-between items-center border-t pt-6 border-gray-200 dark:border-gray-700">
            <button
              onClick={goToPreviousChapter}
              disabled={currentChapterIndex === 0}
              className={`flex items-center px-4 py-2 rounded ${
                currentChapterIndex === 0 
                  ? 'opacity-50 cursor-not-allowed' 
                  : theme === 'dark' 
                    ? 'bg-gray-700 hover:bg-gray-600' 
                    : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <FiArrowLeft className="mr-2" />
              Previous Chapter
            </button>
            
            <div className="text-sm">
              {currentChapterIndex + 1} / {chapters.length}
            </div>
            
            <button
              onClick={goToNextChapter}
              disabled={currentChapterIndex === chapters.length - 1}
              className={`flex items-center px-4 py-2 rounded ${
                currentChapterIndex === chapters.length - 1 
                  ? 'opacity-50 cursor-not-allowed' 
                  : theme === 'dark' 
                    ? 'bg-gray-700 hover:bg-gray-600' 
                    : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Next Chapter
              <FiArrowRight className="ml-2" />
            </button>
          </div>
        </main>
      </div>
    </>
  );
};

export default ReaderPage; 