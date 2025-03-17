import { ethers } from 'ethers';
import { Address } from '../types';

// Import contract ABIs
import LumenTokenABI from '../artifacts/contracts/LumenToken.sol/LumenToken.json';
import StoryNFTABI from '../artifacts/contracts/StoryNFT.sol/StoryNFT.json';
import CharacterNFTABI from '../artifacts/contracts/CharacterNFT.sol/CharacterNFT.json';

// Contract addresses - to be populated from environment variables
const LUMEN_TOKEN_ADDRESS = process.env.NEXT_PUBLIC_LUMEN_TOKEN_ADDRESS || '';
const STORY_NFT_ADDRESS = process.env.NEXT_PUBLIC_STORY_NFT_ADDRESS || '';
const CHARACTER_NFT_ADDRESS = process.env.NEXT_PUBLIC_CHARACTER_NFT_ADDRESS || '';

/**
 * Get ethers provider based on current environment
 */
export const getProvider = (): ethers.providers.Provider => {
  // Check if window is defined (browser environment)
  if (typeof window !== 'undefined' && window.ethereum) {
    return new ethers.providers.Web3Provider(window.ethereum);
  }
  
  // Fallback to a JSON RPC provider for non-browser environments
  const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || 'http://localhost:8545';
  return new ethers.providers.JsonRpcProvider(rpcUrl);
};

/**
 * Get signer for transactions
 */
export const getSigner = async (): Promise<ethers.Signer> => {
  const provider = getProvider();
  
  if (provider instanceof ethers.providers.Web3Provider) {
    // Request account access if needed
    await provider.send('eth_requestAccounts', []);
    return provider.getSigner();
  }
  
  throw new Error('No signer available. Please connect a wallet.');
};

/**
 * Get LumenToken contract instance
 * @param withSigner Whether to connect with a signer for write operations
 */
export const getLumenTokenContract = async (withSigner = false): Promise<ethers.Contract> => {
  if (!LUMEN_TOKEN_ADDRESS) {
    throw new Error('LumenToken contract address not defined');
  }
  
  const provider = getProvider();
  
  if (withSigner) {
    const signer = await getSigner();
    return new ethers.Contract(LUMEN_TOKEN_ADDRESS, LumenTokenABI.abi, signer);
  }
  
  return new ethers.Contract(LUMEN_TOKEN_ADDRESS, LumenTokenABI.abi, provider);
};

/**
 * Get StoryNFT contract instance
 * @param withSigner Whether to connect with a signer for write operations
 */
export const getStoryNFTContract = async (withSigner = false): Promise<ethers.Contract> => {
  if (!STORY_NFT_ADDRESS) {
    throw new Error('StoryNFT contract address not defined');
  }
  
  const provider = getProvider();
  
  if (withSigner) {
    const signer = await getSigner();
    return new ethers.Contract(STORY_NFT_ADDRESS, StoryNFTABI.abi, signer);
  }
  
  return new ethers.Contract(STORY_NFT_ADDRESS, StoryNFTABI.abi, provider);
};

/**
 * Get CharacterNFT contract instance
 * @param withSigner Whether to connect with a signer for write operations
 */
export const getCharacterNFTContract = async (withSigner = false): Promise<ethers.Contract> => {
  if (!CHARACTER_NFT_ADDRESS) {
    throw new Error('CharacterNFT contract address not defined');
  }
  
  const provider = getProvider();
  
  if (withSigner) {
    const signer = await getSigner();
    return new ethers.Contract(CHARACTER_NFT_ADDRESS, CharacterNFTABI.abi, signer);
  }
  
  return new ethers.Contract(CHARACTER_NFT_ADDRESS, CharacterNFTABI.abi, provider);
};

/**
 * Get the connected wallet address
 */
export const getWalletAddress = async (): Promise<Address> => {
  try {
    const signer = await getSigner();
    return await signer.getAddress();
  } catch (error) {
    console.error('Error getting wallet address:', error);
    throw error;
  }
};

/**
 * Format wei to ether
 * @param wei Wei amount as string or BigNumber
 */
export const formatEther = (wei: string | ethers.BigNumber): string => {
  return ethers.utils.formatEther(wei);
};

/**
 * Parse ether to wei
 * @param ether Ether amount as string
 */
export const parseEther = (ether: string): ethers.BigNumber => {
  return ethers.utils.parseEther(ether);
}; 