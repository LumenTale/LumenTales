import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FiFilter, FiGift, FiShoppingCart } from 'react-icons/fi';
import { Character, User } from '@/types';
import { getOwnedNFTs, mintCharacterNFT } from '@/services/blockchain';
import WalletConnector from '@/components/wallet/WalletConnector';
import { useAuth } from '@/hooks/useAuth';
// We'll use a simple notification system until react-toastify is properly installed
// import { toast } from 'react-toastify';

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

// Character rarity levels with color coding
const RARITY_COLORS = {
  common: 'bg-gray-100 text-gray-800',
  uncommon: 'bg-green-100 text-green-800',
  rare: 'bg-blue-100 text-blue-800',
  epic: 'bg-purple-100 text-purple-800',
  legendary: 'bg-yellow-100 text-yellow-800',
};

// Character attributes with icons
const ATTRIBUTE_ICONS = {
  strength: '💪',
  intelligence: '🧠',
  charisma: '✨',
  dexterity: '🏃',
  wisdom: '📚',
  constitution: '❤️',
  luck: '🍀',
};

interface CharacterNFT {
  id: string;
  name: string;
  description: string;
  image: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  price: number;
  attributes: {
    [key: string]: number;
  };
  creator: User;
  mintAddress?: string;
  owner?: string;
  storyId?: string;
  storyTitle?: string;
}

interface CharacterMarketProps {
  initialCharacters?: CharacterNFT[];
  showOwnedOnly?: boolean;
  showFilters?: boolean;
  title?: string;
  maxDisplay?: number;
}

const CharacterMarket: React.FC<CharacterMarketProps> = ({
  initialCharacters = [],
  showOwnedOnly = false,
  showFilters = true,
  title = "Character NFT Market",
  maxDisplay
}) => {
  const router = useRouter();
  const auth = useAuth() as unknown as AuthContextType;
  const { user } = auth;
  
  const [characters, setCharacters] = useState<CharacterNFT[]>(initialCharacters);
  const [ownedCharacters, setOwnedCharacters] = useState<CharacterNFT[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(initialCharacters.length === 0);
  const [showFiltersPanel, setShowFiltersPanel] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [rarityFilter, setRarityFilter] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState<string>('price-asc');
  const [purchasingId, setPurchasingId] = useState<string | null>(null);

  // Fetch characters if not provided
  useEffect(() => {
    if (initialCharacters.length === 0) {
      fetchCharacters();
    }
    
    if (user?.walletAddress && showOwnedOnly) {
      fetchOwnedCharacters();
    }
  }, [user?.walletAddress, initialCharacters.length, showOwnedOnly]);

  // Fetch characters from API
  const fetchCharacters = async () => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      // const response = await fetch('/api/characters/market');
      // const data = await response.json();
      // setCharacters(data.characters);
      
      // Simulated API response
      setTimeout(() => {
        const mockCharacters: CharacterNFT[] = [
          {
            id: 'char-1',
            name: 'Eldrin the Mage',
            description: 'A powerful wizard with mastery over the elements.',
            image: '/images/characters/eldrin.jpg',
            rarity: 'epic',
            price: 120,
            attributes: {
              intelligence: 85,
              wisdom: 75,
              charisma: 60,
              strength: 40,
              constitution: 50,
              dexterity: 55,
              luck: 65
            },
            creator: {
              id: 'user-1',
              name: 'Alex Writer',
              email: 'alex@example.com',
              role: 'creator',
              walletAddress: '8zJ3MFU3SRdrSpzoQn9NLpS1VNL7WuD4whCnNvpUNDv1',
              createdAt: '2023-05-15T10:30:00Z',
              updatedAt: '2023-05-15T10:30:00Z',
            },
            storyId: 'story-1',
            storyTitle: 'The Crystal Cavern'
          },
          {
            id: 'char-2',
            name: 'Nova the Explorer',
            description: 'A brave adventurer with a knack for finding trouble.',
            image: '/images/characters/nova.jpg',
            rarity: 'rare',
            price: 85,
            attributes: {
              strength: 70,
              dexterity: 80,
              charisma: 65,
              intelligence: 60,
              wisdom: 55,
              constitution: 75,
              luck: 70
            },
            creator: {
              id: 'user-2',
              name: 'Sam Scribe',
              email: 'sam@example.com',
              role: 'creator',
              walletAddress: '5zJ3MFU3SRdrSpzoQn9NLpS1VNL7WuD4whCnNvpUNDv1',
              createdAt: '2023-04-10T08:20:00Z',
              updatedAt: '2023-04-10T08:20:00Z',
            },
            storyId: 'story-2',
            storyTitle: 'Echoes of Tomorrow'
          },
          {
            id: 'char-3',
            name: 'Lyra Shadowheart',
            description: 'A mysterious rogue with a dark past and deadly skills.',
            image: '/images/characters/lyra.jpg',
            rarity: 'legendary',
            price: 250,
            attributes: {
              dexterity: 90,
              intelligence: 75,
              charisma: 70,
              strength: 65,
              wisdom: 80,
              constitution: 60,
              luck: 75
            },
            creator: {
              id: 'user-3',
              name: 'Jordan Prose',
              email: 'jordan@example.com',
              role: 'creator',
              walletAddress: '3zJ3MFU3SRdrSpzoQn9NLpS1VNL7WuD4whCnNvpUNDv1',
              createdAt: '2023-03-22T15:40:00Z',
              updatedAt: '2023-03-22T15:40:00Z',
            },
            storyId: 'story-3',
            storyTitle: 'Whispers in the Mist'
          },
          {
            id: 'char-4',
            name: 'Grom Ironforge',
            description: 'A sturdy dwarven smith with unmatched crafting abilities.',
            image: '/images/characters/grom.jpg',
            rarity: 'uncommon',
            price: 65,
            attributes: {
              strength: 85,
              constitution: 90,
              intelligence: 60,
              wisdom: 65,
              charisma: 50,
              dexterity: 45,
              luck: 55
            },
            creator: {
              id: 'user-1',
              name: 'Alex Writer',
              email: 'alex@example.com',
              role: 'creator',
              walletAddress: '8zJ3MFU3SRdrSpzoQn9NLpS1VNL7WuD4whCnNvpUNDv1',
              createdAt: '2023-05-15T10:30:00Z',
              updatedAt: '2023-05-15T10:30:00Z',
            },
            storyId: 'story-1',
            storyTitle: 'The Crystal Cavern'
          },
          {
            id: 'char-5',
            name: 'Serena Brightsong',
            description: 'A gifted bard whose songs can inspire armies or calm beasts.',
            image: '/images/characters/serena.jpg',
            rarity: 'common',
            price: 40,
            attributes: {
              charisma: 90,
              dexterity: 70,
              intelligence: 65,
              wisdom: 60,
              strength: 45,
              constitution: 50,
              luck: 80
            },
            creator: {
              id: 'user-2',
              name: 'Sam Scribe',
              email: 'sam@example.com',
              role: 'creator',
              walletAddress: '5zJ3MFU3SRdrSpzoQn9NLpS1VNL7WuD4whCnNvpUNDv1',
              createdAt: '2023-04-10T08:20:00Z',
              updatedAt: '2023-04-10T08:20:00Z',
            },
            storyId: 'story-2',
            storyTitle: 'Echoes of Tomorrow'
          }
        ];
        
        setCharacters(mockCharacters);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Error fetching characters:', error);
      setIsLoading(false);
    }
  };

  // Fetch owned characters
  const fetchOwnedCharacters = async () => {
    if (!user?.walletAddress) return;
    
    try {
      const walletAddress = user.walletAddress as string;
      const ownedNFTs = await getOwnedNFTs(walletAddress);
      setOwnedCharacters(ownedNFTs);
    } catch (error) {
      console.error('Error fetching owned characters:', error);
    }
  };

  // Apply filters and sorting to characters
  const filteredCharacters = characters.filter((character) => {
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        character.name.toLowerCase().includes(query) ||
        character.description.toLowerCase().includes(query) ||
        character.creator.name.toLowerCase().includes(query) ||
        (character.storyTitle && character.storyTitle.toLowerCase().includes(query));
      
      if (!matchesSearch) return false;
    }
    
    // Filter by rarity
    if (rarityFilter.length > 0 && !rarityFilter.includes(character.rarity)) {
      return false;
    }
    
    // Filter by price range
    if (character.price < priceRange[0] || character.price > priceRange[1]) {
      return false;
    }
    
    // Filter by ownership if requested
    if (showOwnedOnly) {
      return ownedCharacters.some(owned => owned.id === character.id);
    }
    
    return true;
  }).sort((a, b) => {
    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rarity': {
        const rarityRank = {
          'common': 1,
          'uncommon': 2,
          'rare': 3,
          'epic': 4,
          'legendary': 5
        };
        return rarityRank[b.rarity] - rarityRank[a.rarity];
      }
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  // Display only a maximum number of characters if specified
  const displayCharacters = maxDisplay ? filteredCharacters.slice(0, maxDisplay) : filteredCharacters;

  // Handle character purchase
  const handlePurchase = async (character: CharacterNFT) => {
    if (!user?.walletAddress) {
      // toast.error('Please connect your wallet to purchase this character.');
      alert('Please connect your wallet to purchase this character.');
      return;
    }
    
    setPurchasingId(character.id);
    
    try {
      // In a real app, this would trigger a blockchain transaction
      const walletAddress = user.walletAddress as string;
      const mintAddress = await mintCharacterNFT(
        walletAddress,
        character.id,
        character.name
      );
      
      // toast.success(`Successfully purchased ${character.name}!`);
      alert(`Successfully purchased ${character.name}!`);
      
      // Fetch updated owned characters
      fetchOwnedCharacters();
      
      // In a real app, you might navigate to a character details page
      // router.push(`/characters/${character.id}`);
    } catch (error) {
      console.error('Error purchasing character:', error);
      // toast.error('Failed to purchase character. Please try again.');
      alert('Failed to purchase character. Please try again.');
    } finally {
      setPurchasingId(null);
    }
  };

  // Reset filters to default
  const resetFilters = () => {
    setSearchQuery('');
    setRarityFilter([]);
    setPriceRange([0, 1000]);
    setSortBy('price-asc');
  };

  // Toggle filters panel
  const toggleFilters = () => {
    setShowFiltersPanel(!showFiltersPanel);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        
        {showFilters && (
          <button
            onClick={toggleFilters}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            <FiFilter className="mr-2" />
            Filters
          </button>
        )}
      </div>
      
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search characters, creators, or stories..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Filter Panel */}
      {showFilters && showFiltersPanel && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-900">Filters</h3>
            <button
              onClick={resetFilters}
              className="text-sm text-purple-600 hover:text-purple-800"
            >
              Reset Filters
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Rarity Filter */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700">Rarity</h4>
              <div className="flex flex-wrap gap-2">
                {Object.keys(RARITY_COLORS).map((rarity) => (
                  <button
                    key={rarity}
                    onClick={() => {
                      if (rarityFilter.includes(rarity)) {
                        setRarityFilter(rarityFilter.filter(r => r !== rarity));
                      } else {
                        setRarityFilter([...rarityFilter, rarity]);
                      }
                    }}
                    className={`px-3 py-1 rounded-full text-xs capitalize ${
                      rarityFilter.includes(rarity)
                        ? RARITY_COLORS[rarity as keyof typeof RARITY_COLORS]
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {rarity}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Price Range */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700">Price Range</h4>
              <div className="flex items-center">
                <input
                  type="number"
                  min="0"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                  className="block w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                />
                <span className="mx-2">to</span>
                <input
                  type="number"
                  min={priceRange[0]}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 0])}
                  className="block w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                />
                <span className="ml-2 text-gray-600">LUMEN</span>
              </div>
            </div>
            
            {/* Sort By */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700">Sort By</h4>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              >
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rarity">Rarity</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>
        </div>
      )}
      
      {/* Character Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          // Loading skeletons
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg shadow animate-pulse">
              <div className="h-48 bg-gray-300 rounded-t-lg"></div>
              <div className="p-4">
                <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6 mb-4"></div>
                <div className="h-8 bg-gray-300 rounded w-full"></div>
              </div>
            </div>
          ))
        ) : displayCharacters.length > 0 ? (
          displayCharacters.map((character) => (
            <div 
              key={character.id}
              className="bg-white border border-gray-200 rounded-lg shadow overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${RARITY_COLORS[character.rarity]}`}>
                  {character.rarity}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{character.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{character.description}</p>
                
                {/* Character attributes */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {Object.entries(character.attributes)
                    .sort(([, valueA], [, valueB]) => valueB - valueA)
                    .slice(0, 4)
                    .map(([attribute, value]) => (
                      <div key={attribute} className="flex items-center text-xs">
                        <span className="mr-1">
                          {ATTRIBUTE_ICONS[attribute as keyof typeof ATTRIBUTE_ICONS] || '🔵'}
                        </span>
                        <span className="capitalize">{attribute}:</span>
                        <span className="ml-1 font-medium">{value}</span>
                      </div>
                    ))}
                </div>
                
                {/* Story link */}
                {character.storyTitle && (
                  <div className="text-xs text-gray-500 mb-4">
                    From: <a href={`/story/${character.storyId}`} className="text-purple-600 hover:underline">{character.storyTitle}</a>
                  </div>
                )}
                
                {/* Price and action button */}
                <div className="flex justify-between items-center">
                  <div className="text-purple-700 font-bold">
                    {character.price} LUMEN
                  </div>
                  
                  {/* Action button */}
                  {showOwnedOnly || ownedCharacters.some(owned => owned.id === character.id) ? (
                    <button
                      onClick={() => router.push(`/characters/${character.id}`)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      <FiGift className="mr-1" /> Use in Story
                    </button>
                  ) : (
                    <button
                      onClick={() => handlePurchase(character)}
                      disabled={purchasingId === character.id || !user?.walletAddress}
                      className={`inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white 
                        ${purchasingId === character.id 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : !user?.walletAddress 
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
                        }`}
                    >
                      {purchasingId === character.id ? (
                        <>
                          <span className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></span>
                          Purchasing...
                        </>
                      ) : (
                        <>
                          <FiShoppingCart className="mr-1" /> Buy Now
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          // No results found
          <div className="col-span-full text-center py-16">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No characters found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {showOwnedOnly 
                ? 'You don\'t own any characters yet.' 
                : 'Try adjusting your filters or check back later for new characters.'}
            </p>
            {!user?.walletAddress && (
              <div className="mt-6 flex justify-center">
                <WalletConnector variant="small" />
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* See More button */}
      {maxDisplay && filteredCharacters.length > maxDisplay && (
        <div className="mt-6 text-center">
          <button
            onClick={() => router.push('/character-market')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            See More Characters
          </button>
        </div>
      )}
    </div>
  );
};

export default CharacterMarket; 