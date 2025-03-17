// User types
export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: 'user' | 'creator' | 'admin';
  walletAddress?: string;
  createdAt: string;
  updatedAt: string;
}

// Story types
export interface Story {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  author: User;
  genre: string[];
  tags: string[];
  published: boolean;
  featured: boolean;
  tokenId?: string;
  tokenPrice?: number;
  readCount: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface StoryChapter {
  id: string;
  title: string;
  content: string;
  orderIndex: number;
  storyId: string;
  createdAt: string;
  updatedAt: string;
}

export interface StoryNode {
  id: string;
  storyId: string;
  content: string;
  image?: string;
  characterId?: string | null;
  expression?: string | null;
  backgroundImage?: string | null;
  bgMusicUrl?: string | null;
  choices: Choice[];
  isEnding: boolean;
  isPremium: boolean;
  tokenCost?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Choice {
  id: string;
  text: string;
  nextNodeId: string;
  isPremium: boolean;
  tokenCost?: number;
  conditions?: StoryCondition[];
}

export interface StoryCondition {
  id: string;
  type: 'item' | 'stat' | 'choice' | 'payment';
  target: string;
  operation: '=' | '!=' | '>' | '<' | '>=' | '<=';
  value: string | number | boolean;
}

// Character types
export interface Character {
  id: string;
  name: string;
  description: string;
  baseImage: string;
  expressions: CharacterExpression[];
  storyId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CharacterExpression {
  id: string;
  name: string;
  image: string;
}

// Token types
export interface Token {
  id: string;
  name: string;
  symbol: string;
  contractAddress: string;
  totalSupply: number;
  price: number;
  ownerId: string;
  storyId?: string;
  characterId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TokenTransaction {
  id: string;
  tokenId: string;
  fromAddress: string;
  toAddress: string;
  amount: number;
  transactionHash: string;
  timestamp: string;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Theme types
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

// Form types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'file';
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
  validation?: {
    required?: string;
    minLength?: { value: number; message: string };
    maxLength?: { value: number; message: string };
    pattern?: { value: RegExp; message: string };
  };
} 