import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { Address } from '../types';
import { getProvider, getWalletAddress } from '../utils/contract';

interface WalletState {
  address: Address | null;
  balance: string | null;
  chainId: number | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: Error | null;
}

/**
 * Hook for managing wallet connection
 */
export const useWallet = () => {
  const [wallet, setWallet] = useState<WalletState>({
    address: null,
    balance: null,
    chainId: null,
    isConnected: false,
    isConnecting: false,
    error: null,
  });

  // Connect wallet function
  const connect = useCallback(async () => {
    if (!window.ethereum) {
      setWallet(prev => ({
        ...prev,
        error: new Error('No Ethereum wallet detected. Please install MetaMask or another wallet.'),
      }));
      return;
    }

    try {
      setWallet(prev => ({ ...prev, isConnecting: true, error: null }));
      
      // Request accounts
      const provider = getProvider() as ethers.providers.Web3Provider;
      await provider.send('eth_requestAccounts', []);
      
      // Get wallet info
      const address = await getWalletAddress();
      const balance = ethers.utils.formatEther(await provider.getBalance(address));
      const network = await provider.getNetwork();
      
      setWallet({
        address,
        balance,
        chainId: network.chainId,
        isConnected: true,
        isConnecting: false,
        error: null,
      });
    } catch (error) {
      console.error('Error connecting wallet:', error);
      setWallet(prev => ({
        ...prev,
        isConnecting: false,
        error: error instanceof Error ? error : new Error('Unknown error connecting wallet'),
      }));
    }
  }, []);

  // Disconnect wallet function
  const disconnect = useCallback(() => {
    setWallet({
      address: null,
      balance: null,
      chainId: null,
      isConnected: false,
      isConnecting: false,
      error: null,
    });
  }, []);

  // Get updated balance
  const refreshBalance = useCallback(async () => {
    if (!wallet.address) return;
    
    try {
      const provider = getProvider();
      const balance = ethers.utils.formatEther(await provider.getBalance(wallet.address));
      setWallet(prev => ({ ...prev, balance }));
    } catch (error) {
      console.error('Error refreshing balance:', error);
    }
  }, [wallet.address]);

  // Setup event listeners
  useEffect(() => {
    if (typeof window === 'undefined' || !window.ethereum) return;

    const handleAccountsChanged = async (accounts: string[]) => {
      if (accounts.length === 0) {
        // User disconnected their wallet
        disconnect();
      } else if (accounts[0] !== wallet.address) {
        // Account changed, update the state
        connect();
      }
    };

    const handleChainChanged = () => {
      // Reload the page when chain changes
      window.location.reload();
    };

    const handleDisconnect = () => {
      disconnect();
    };

    // Add event listeners
    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);
    window.ethereum.on('disconnect', handleDisconnect);

    // Check if already connected
    if (!wallet.address && !wallet.isConnecting && !wallet.error) {
      const checkConnection = async () => {
        try {
          const provider = getProvider() as ethers.providers.Web3Provider;
          const accounts = await provider.listAccounts();
          
          if (accounts.length > 0) {
            connect();
          }
        } catch (error) {
          console.error('Error checking wallet connection:', error);
        }
      };
      
      checkConnection();
    }

    // Cleanup event listeners
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
        window.ethereum.removeListener('disconnect', handleDisconnect);
      }
    };
  }, [wallet.address, wallet.isConnecting, wallet.error, connect, disconnect]);

  return {
    ...wallet,
    connect,
    disconnect,
    refreshBalance,
  };
}; 