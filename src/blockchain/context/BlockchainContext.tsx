import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useWallet } from '../hooks/useWallet';
import { TokenInfo, Address } from '../types';
import { getLumenTokenContract } from '../utils/contract';

interface BlockchainContextType {
  isInitialized: boolean;
  tokenInfo: TokenInfo | null;
  userTokenBalance: string;
  isLoadingTokenInfo: boolean;
  refreshTokenInfo: () => Promise<void>;
  mintStory: (to: Address, uri: string, royaltyBps: number) => Promise<number>;
  mintCharacter: (
    name: string,
    storyId: number,
    royaltyBps: number,
    maxSupply: number
  ) => Promise<number>;
}

// Create context with default values
const BlockchainContext = createContext<BlockchainContextType>({
  isInitialized: false,
  tokenInfo: null,
  userTokenBalance: '0',
  isLoadingTokenInfo: false,
  refreshTokenInfo: async () => {},
  mintStory: async () => 0,
  mintCharacter: async () => 0,
});

export const useBlockchain = () => useContext(BlockchainContext);

export const BlockchainProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { address, isConnected } = useWallet();
  const [isInitialized, setIsInitialized] = useState(false);
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null);
  const [userTokenBalance, setUserTokenBalance] = useState('0');
  const [isLoadingTokenInfo, setIsLoadingTokenInfo] = useState(false);

  // Initialize blockchain data
  useEffect(() => {
    const initialize = async () => {
      try {
        await refreshTokenInfo();
        setIsInitialized(true);
      } catch (error) {
        console.error('Error initializing blockchain data:', error);
      }
    };

    if (typeof window !== 'undefined' && !isInitialized) {
      initialize();
    }
  }, [isInitialized]);

  // Update token balance when address changes
  useEffect(() => {
    if (isConnected && address) {
      getUserTokenBalance();
    } else {
      setUserTokenBalance('0');
    }
  }, [address, isConnected]);

  // Get token information
  const refreshTokenInfo = async () => {
    try {
      setIsLoadingTokenInfo(true);
      const tokenContract = await getLumenTokenContract();
      
      const [name, symbol, decimals, totalSupply] = await Promise.all([
        tokenContract.name(),
        tokenContract.symbol(),
        tokenContract.decimals(),
        tokenContract.totalSupply(),
      ]);
      
      setTokenInfo({
        name,
        symbol,
        decimals,
        totalSupply: ethers.utils.formatUnits(totalSupply, decimals),
        address: tokenContract.address,
      });
      
      if (isConnected && address) {
        await getUserTokenBalance();
      }
    } catch (error) {
      console.error('Error fetching token info:', error);
    } finally {
      setIsLoadingTokenInfo(false);
    }
  };

  // Get user's token balance
  const getUserTokenBalance = async () => {
    if (!address) return;
    
    try {
      const tokenContract = await getLumenTokenContract();
      const balance = await tokenContract.balanceOf(address);
      const decimals = await tokenContract.decimals();
      setUserTokenBalance(ethers.utils.formatUnits(balance, decimals));
    } catch (error) {
      console.error('Error fetching user token balance:', error);
    }
  };

  // Mint a new story NFT
  const mintStory = async (to: Address, uri: string, royaltyBps: number): Promise<number> => {
    try {
      const storyContract = await getLumenTokenContract(true);
      const tx = await storyContract.createStory(to, uri, royaltyBps);
      const receipt = await tx.wait();
      
      // Find the StoryCreated event and get the tokenId
      const event = receipt.events?.find(e => e.event === 'StoryCreated');
      return event?.args?.tokenId.toNumber() || 0;
    } catch (error) {
      console.error('Error minting story:', error);
      throw error;
    }
  };

  // Mint a new character
  const mintCharacter = async (
    name: string,
    storyId: number,
    royaltyBps: number,
    maxSupply: number
  ): Promise<number> => {
    try {
      const characterContract = await getLumenTokenContract(true);
      const tx = await characterContract.createCharacter(name, storyId, royaltyBps, maxSupply);
      const receipt = await tx.wait();
      
      // Find the CharacterCreated event and get the characterId
      const event = receipt.events?.find(e => e.event === 'CharacterCreated');
      return event?.args?.characterId.toNumber() || 0;
    } catch (error) {
      console.error('Error minting character:', error);
      throw error;
    }
  };

  const value = {
    isInitialized,
    tokenInfo,
    userTokenBalance,
    isLoadingTokenInfo,
    refreshTokenInfo,
    mintStory,
    mintCharacter,
  };

  return (
    <BlockchainContext.Provider value={value}>
      {children}
    </BlockchainContext.Provider>
  );
}; 