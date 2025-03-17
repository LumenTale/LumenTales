export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: 'user' | 'creator' | 'admin';
  walletAddress?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StoryNode {
  id: string;
  content: string;
  imageUrl?: string;
  choices: StoryChoice[];
}

export interface StoryChoice {
  id: string;
  text: string;
  nextNodeId: string;
  isPremium: boolean;
  tokenCost?: number;
  conditions?: ChoiceCondition[];
}

export interface ChoiceCondition {
  type: 'inventory' | 'attribute' | 'choice' | 'token';
  value: string;
  operator: '==' | '!=' | '>' | '<' | '>=' | '<=';
  target: string | number;
}

export interface Story {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  author: User;
  genre: string[];
  tags: string[];
  readTime?: string;
  rating?: number;
  readers?: number;
  readCount: number;
  published: boolean;
  featured: boolean;
  tokenPrice?: number;
  royaltyPercentage?: number;
  nodes?: StoryNode[];
  createdAt: string;
  updatedAt: string;
}

export interface CharacterNFT {
  id: string;
  name: string;
  description: string;
  image: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  attributes: {
    [key: string]: string | number;
  };
  mintAddress: string;
  owner: string;
  creator: User;
  createdAt: string;
  updatedAt: string;
} 