// Ethereum types
export type Address = string;
export type TransactionHash = string;
export type Wei = string;
export type Ether = string;
export type BlockNumber = number;

// Token types
export interface TokenInfo {
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: string;
  address: Address;
}

// Story NFT types
export interface StoryMetadata {
  name: string;
  description: string;
  image: string;
  attributes: {
    trait_type: string;
    value: string | number;
  }[];
  externalUrl?: string;
  animationUrl?: string;
  genre?: string[];
  creator?: string;
  creationDate?: string;
}

export interface StoryNFT {
  tokenId: number;
  owner: Address;
  creator: Address;
  tokenURI: string;
  metadata: StoryMetadata | null;
  royaltyBps: number;
}

// Character NFT types
export interface CharacterMetadata {
  name: string;
  description: string;
  image: string;
  attributes: {
    trait_type: string;
    value: string | number;
  }[];
  externalUrl?: string;
  animationUrl?: string;
  storyId?: number;
  expressions?: {
    name: string;
    image: string;
  }[];
}

export interface CharacterNFT {
  characterId: number;
  owner: Address;
  creator: Address;
  balance: number;
  metadata: CharacterMetadata | null;
  storyId: number;
  royaltyBps: number;
  maxSupply: number;
}

// Transaction types
export interface TransactionRequest {
  to?: Address;
  from?: Address;
  nonce?: number;
  gasLimit?: number;
  gasPrice?: Wei;
  data?: string;
  value?: Wei;
  chainId?: number;
}

export interface TransactionResponse {
  hash: TransactionHash;
  from: Address;
  to: Address | null;
  gasLimit: Wei;
  gasPrice: Wei;
  value: Wei;
  nonce: number;
  data: string;
  chainId: number;
  confirmations: number;
  wait: (confirmations?: number) => Promise<TransactionReceipt>;
}

export interface TransactionReceipt {
  to: Address | null;
  from: Address;
  contractAddress: Address | null;
  transactionIndex: number;
  gasUsed: Wei;
  blockHash: string;
  transactionHash: TransactionHash;
  blockNumber: BlockNumber;
  status?: number;
}

// Contract event types
export interface StoryCreatedEvent {
  tokenId: number;
  creator: Address;
  uri: string;
}

export interface CharacterCreatedEvent {
  characterId: number;
  name: string;
  storyId: number;
  creator: Address;
  royaltyBps: number;
  maxSupply: number;
} 