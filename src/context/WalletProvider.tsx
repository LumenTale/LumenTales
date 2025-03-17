import React, { FC, ReactNode, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, SolflareWalletAdapter, TorusWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';

// Import wallet styles
import '@solana/wallet-adapter-react-ui/styles.css';

// Network configuration
const SOLANA_NETWORK = process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet';
const SOLANA_RPC_URL = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || '';

// Props for the SolanaWalletProvider component
interface SolanaWalletProviderProps {
  children: ReactNode;
}

// We need to use dynamic import for the wallet adapter to work with Next.js
// This ensures the component is only loaded on the client side
const SolanaWalletProviderWithDynamicWallets = ({ children }: SolanaWalletProviderProps) => {
  // Determine which network to use
  const network = useMemo(() => {
    switch (SOLANA_NETWORK) {
      case 'mainnet-beta':
        return WalletAdapterNetwork.Mainnet;
      case 'testnet':
        return WalletAdapterNetwork.Testnet;
      case 'devnet':
      default:
        return WalletAdapterNetwork.Devnet;
    }
  }, []);

  // Get the RPC endpoint for the selected network
  const endpoint = useMemo(() => {
    // Use custom RPC URL if provided
    if (SOLANA_RPC_URL) {
      return SOLANA_RPC_URL;
    }
    // Otherwise use Solana's default endpoints
    return clusterApiUrl(network);
  }, [network]);

  // Set up supported wallets
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new TorusWalletAdapter(),
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

// Create a dynamic component that only loads on the client
const SolanaWalletProvider = dynamic(
  () => Promise.resolve(SolanaWalletProviderWithDynamicWallets),
  {
    ssr: false,
    loading: () => <></>,
  }
);

export default SolanaWalletProvider; 