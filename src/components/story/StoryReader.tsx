import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Story, StoryNode, Choice, Character, CharacterExpression, User } from '@/types';
import { useAuth } from '@/hooks/useAuth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
}

interface StoryReaderProps {
  story: Story;
  initialNode?: StoryNode;
  characters?: Character[];
}

const StoryReader: React.FC<StoryReaderProps> = ({ 
  story, 
  initialNode,
  characters = [],
}) => {
  const router = useRouter();
  const auth = useAuth();
  const user = auth?.user;
  
  // State management
  const [currentNode, setCurrentNode] = useState<StoryNode | null>(initialNode || null);
  const [history, setHistory] = useState<StoryNode[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [bgMusic, setBgMusic] = useState<HTMLAudioElement | null>(null);
  const [autoplayMusic, setAutoplayMusic] = useState<boolean>(true);
  const [animateText, setAnimateText] = useState<boolean>(true);
  const [textAnimationComplete, setTextAnimationComplete] = useState<boolean>(false);
  const [textDisplaySpeed, setTextDisplaySpeed] = useState<number>(30); // ms per character
  
  // Character and expression management
  const [activeCharacter, setActiveCharacter] = useState<Character | null>(null);
  const [activeExpression, setActiveExpression] = useState<CharacterExpression | null>(null);
  
  // Load the initial node if not provided
  useEffect(() => {
    if (!initialNode && story) {
      fetchStartNode();
    }
  }, [story, initialNode]);
  
  // Update active character and expression when node changes
  useEffect(() => {
    if (!currentNode || !characters?.length) return;
    
    // Reset text animation on node change
    setTextAnimationComplete(false);
    
    // Find the character if one is specified
    if (currentNode.characterId) {
      const character = characters.find(c => c.id === currentNode.characterId);
      setActiveCharacter(character || null);
      
      // Find the expression if one is specified
      if (character && currentNode.expression) {
        const expression = character.expressions.find(e => e.name === currentNode.expression);
        setActiveExpression(expression || null);
      } else {
        // Default to the first expression or null
        setActiveExpression(character?.expressions[0] || null);
      }
    } else {
      setActiveCharacter(null);
      setActiveExpression(null);
    }
    
    // Handle background music
    handleBackgroundMusic();
  }, [currentNode, characters]);
  
  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (bgMusic) {
        bgMusic.pause();
        bgMusic.src = '';
      }
    };
  }, [bgMusic]);
  
  // Handle background music changes
  const handleBackgroundMusic = () => {
    if (!currentNode) return;
    
    // If there's background music specified in the node
    if (currentNode.bgMusicUrl) {
      // Create a new audio element if we don't have one
      if (!bgMusic) {
        const audio = new Audio();
        audio.loop = true;
        setBgMusic(audio);
      }
      
      // If the source is different from what's currently playing
      if (bgMusic && bgMusic.src !== currentNode.bgMusicUrl) {
        bgMusic.pause();
        bgMusic.src = currentNode.bgMusicUrl;
        
        if (autoplayMusic) {
          // We need to handle the play promise due to autoplay restrictions
          const playPromise = bgMusic.play();
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              console.error('Autoplay prevented:', error);
              // Show a UI indicator that music is muted/paused
            });
          }
        }
      }
    } else if (bgMusic) {
      // If no music is specified in the node but we have an audio element
      bgMusic.pause();
    }
  };
  
  // Fetch the starting node for the story
  const fetchStartNode = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      // const response = await fetch(`/api/stories/${story.id}/start`);
      // const data = await response.json();
      // setCurrentNode(data.node);
      
      // Simulated API response
      setTimeout(() => {
        const startNode: StoryNode = {
          id: 'node-start',
          storyId: story.id,
          content: 'Your journey begins here. The path ahead is shrouded in mystery...',
          choices: [
            {
              id: 'choice-1',
              text: 'Take the path to the left',
              nextNodeId: 'node-left',
              isPremium: false,
            },
            {
              id: 'choice-2',
              text: 'Take the path to the right',
              nextNodeId: 'node-right',
              isPremium: false,
            },
          ],
          isEnding: false,
          isPremium: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        setCurrentNode(startNode);
        setHistory([startNode]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching start node:', error);
      setError('Failed to load story. Please try again.');
      setIsLoading(false);
    }
  };
  
  // Handle node transitions when a choice is made
  const handleChoiceSelect = async (choice: Choice) => {
    if (!currentNode) return;
    
    // Check if the choice is premium and the user hasn't paid
    if (choice.isPremium && (!user || !user.walletAddress)) {
      // Show a modal or prompt to connect wallet / pay
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call
      // const response = await fetch(`/api/stories/nodes/${choice.nextNodeId}`);
      // const data = await response.json();
      // const nextNode = data.node;
      
      // Simulated API response
      setTimeout(() => {
        const nextNode: StoryNode = {
          id: choice.nextNodeId,
          storyId: story.id,
          content: choice.nextNodeId === 'node-left' 
            ? 'You took the path to the left and found a mysterious cave. The darkness within seems to be hiding something valuable...'
            : 'You took the path to the right and arrived at a serene meadow. In the distance, you see a small village.',
          choices: choice.nextNodeId === 'node-left' ? [
            {
              id: 'choice-3',
              text: 'Enter the cave',
              nextNodeId: 'node-cave',
              isPremium: true,
              tokenCost: 5,
            },
            {
              id: 'choice-4',
              text: 'Look for another path',
              nextNodeId: 'node-forest',
              isPremium: false,
            },
          ] : [
            {
              id: 'choice-5',
              text: 'Go to the village',
              nextNodeId: 'node-village',
              isPremium: false,
            },
            {
              id: 'choice-6',
              text: 'Rest in the meadow',
              nextNodeId: 'node-meadow',
              isPremium: false,
            },
          ],
          characterId: choice.nextNodeId === 'node-left' ? characters[0]?.id : null,
          expression: choice.nextNodeId === 'node-left' ? 'surprised' : null,
          backgroundImage: choice.nextNodeId === 'node-left' 
            ? '/images/cave-entrance.jpg' 
            : '/images/meadow.jpg',
          isEnding: false,
          isPremium: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        setCurrentNode(nextNode);
        setHistory(prev => [...prev, nextNode]);
        setIsLoading(false);
      }, 800);
    } catch (error) {
      console.error('Error fetching next node:', error);
      setError('Failed to progress in the story. Please try again.');
      setIsLoading(false);
    }
  };
  
  // Go back to the previous node
  const handleGoBack = () => {
    if (history.length <= 1) return;
    
    const previousHistory = [...history];
    previousHistory.pop(); // Remove current node
    
    const previousNode = previousHistory[previousHistory.length - 1];
    setCurrentNode(previousNode);
    setHistory(previousHistory);
  };
  
  // Toggle text animation setting
  const toggleTextAnimation = () => {
    setAnimateText(!animateText);
    setTextAnimationComplete(true); // Show full text immediately when toggling off
  };
  
  // Toggle background music setting
  const toggleMusic = () => {
    if (!bgMusic) return;
    
    setAutoplayMusic(!autoplayMusic);
    
    if (autoplayMusic) {
      bgMusic.pause();
    } else if (currentNode?.bgMusicUrl) {
      bgMusic.play().catch(error => {
        console.error('Could not play audio:', error);
      });
    }
  };
  
  // Render the animated text content
  const renderContent = () => {
    if (!currentNode || !currentNode.content) return null;
    
    if (!animateText || textAnimationComplete) {
      return <p className="text-gray-800">{currentNode.content}</p>;
    }
    
    // We'll use a simple CSS animation for the text typing effect
    return (
      <p 
        className="text-gray-800 typing-animation"
        style={{ 
          animationDuration: `${currentNode.content.length * textDisplaySpeed / 1000}s`,
          animationTimingFunction: 'steps(1, end)',
        }}
        onAnimationEnd={() => setTextAnimationComplete(true)}
      >
        {currentNode.content}
      </p>
    );
  };
  
  // Skip the text animation
  const handleSkipAnimation = () => {
    setTextAnimationComplete(true);
  };
  
  // Return to the story dashboard
  const handleExitStory = () => {
    if (bgMusic) {
      bgMusic.pause();
      bgMusic.src = '';
    }
    router.push('/dashboard');
  };
  
  // If there's an error, display it
  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-700">{error}</p>
          <button 
            className="mt-2 text-red-700 underline"
            onClick={fetchStartNode}
          >
            Try Again
          </button>
        </div>
        <button
          onClick={handleExitStory}
          className="inline-flex items-center text-purple-700 hover:text-purple-900"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Return to Dashboard
        </button>
      </div>
    );
  }
  
  // Render the story reader
  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Background image */}
      {currentNode?.backgroundImage && (
        <div className="fixed inset-0 z-0">
          <Image
            src={currentNode.backgroundImage}
            alt="Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
      )}
      
      {/* Story header */}
      <header className="relative z-10 bg-white bg-opacity-90 shadow-md py-3">
        <div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800 truncate">{story.title}</h1>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTextAnimation}
              className="p-2 rounded-full hover:bg-gray-200"
              title={animateText ? "Turn off text animation" : "Turn on text animation"}
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </button>
            
            <button
              onClick={toggleMusic}
              className="p-2 rounded-full hover:bg-gray-200" 
              title={autoplayMusic ? "Mute music" : "Play music"}
            >
              {autoplayMusic ? (
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
              )}
            </button>
            
            <button
              onClick={handleExitStory}
              className="p-2 rounded-full hover:bg-gray-200"
              title="Exit story"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="relative z-10 max-w-5xl mx-auto p-4 py-6">
        <div className="bg-white bg-opacity-95 rounded-lg shadow-lg p-6 mb-6">
          {/* Character display */}
          {activeCharacter && activeExpression && (
            <div className="mb-6 flex justify-center">
              <div className="relative w-48 h-48">
                <Image
                  src={activeExpression.image}
                  alt={`${activeCharacter.name} - ${activeExpression.name}`}
                  width={192}
                  height={192}
                  className="rounded-lg"
                />
                <p className="text-center mt-2 font-medium text-gray-700">
                  {activeCharacter.name}
                </p>
              </div>
            </div>
          )}
          
          {/* Story text content */}
          <div className="prose prose-lg max-w-none">
            {isLoading ? (
              <div className="flex justify-center py-10">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-700"></div>
              </div>
            ) : (
              <>
                {renderContent()}
                
                {!textAnimationComplete && animateText && (
                  <button
                    onClick={handleSkipAnimation}
                    className="mt-2 text-sm text-purple-600 hover:text-purple-800"
                  >
                    Skip
                  </button>
                )}
              </>
            )}
          </div>
          
          {/* Choices */}
          {!isLoading && currentNode && currentNode.choices && currentNode.choices.length > 0 && textAnimationComplete && (
            <div className="mt-8 space-y-3">
              <h3 className="text-lg font-medium text-gray-800">What will you do?</h3>
              
              <div className="space-y-2">
                {currentNode.choices.map((choice) => (
                  <button
                    key={choice.id}
                    onClick={() => handleChoiceSelect(choice)}
                    className={`w-full text-left p-4 rounded-lg border hover:border-purple-500 transition-colors ${
                      choice.isPremium
                        ? 'bg-yellow-50 border-yellow-300 hover:bg-yellow-100'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }`}
                    disabled={isLoading}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-gray-800">{choice.text}</span>
                      
                      {choice.isPremium && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {choice.tokenCost} Tokens
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Navigation buttons */}
        <div className="flex justify-between">
          <button
            onClick={handleGoBack}
            disabled={history.length <= 1 || isLoading}
            className={`inline-flex items-center px-4 py-2 rounded-md text-sm 
              ${history.length <= 1 || isLoading
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white text-purple-700 hover:bg-purple-50'
              }`}
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back
          </button>
        </div>
      </main>
    </div>
  );
};

export default StoryReader; 