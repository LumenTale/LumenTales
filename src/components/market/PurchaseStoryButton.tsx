import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { purchaseStory } from '@/services/blockchain';
import { Story } from '@/types';
import WalletConnector from '@/components/wallet/WalletConnector';

interface PurchaseStoryButtonProps {
  story: Story;
  onSuccess?: (txId: string) => void;
  onError?: (error: Error) => void;
  className?: string;
  variant?: 'default' | 'small' | 'large' | 'outlined';
}

const PurchaseStoryButton: React.FC<PurchaseStoryButtonProps> = ({
  story,
  onSuccess,
  onError,
  className = '',
  variant = 'default'
}) => {
  const { publicKey, connected, signTransaction } = useWallet();
  const [isPurchasing, setIsPurchasing] = useState(false);
  
  // Define button styles based on variant
  const getButtonStyles = () => {
    const baseStyles = "inline-flex items-center justify-center rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500";
    
    switch (variant) {
      case 'small':
        return `${baseStyles} px-3 py-1.5 text-sm`;
      case 'large':
        return `${baseStyles} px-6 py-3 text-lg`;
      case 'outlined':
        return `${baseStyles} px-4 py-2 border border-purple-600 text-purple-600 bg-white hover:bg-purple-50`;
      case 'default':
      default:
        return `${baseStyles} px-4 py-2 text-sm`;
    }
  };
  
  // Button style based on state
  const buttonStyle = `${getButtonStyles()} ${
    !connected || isPurchasing
      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
      : 'bg-purple-600 text-white hover:bg-purple-700'
  } ${className}`;
  
  // Handle purchase click
  const handlePurchase = async () => {
    if (!connected || !publicKey || !signTransaction || !story.author.walletAddress) {
      if (onError) {
        onError(new Error('Wallet not connected or author wallet address missing'));
      }
      return;
    }
    
    setIsPurchasing(true);
    
    try {
      // Get token price or default to 5 tokens
      const tokenAmount = story.tokenPrice || 5;
      
      // Call blockchain service to purchase story
      const txId = await purchaseStory(
        publicKey.toString(),
        story.id,
        tokenAmount,
        story.author.walletAddress,
        {
          publicKey,
          connected,
          signTransaction,
        }
      );
      
      // Call success callback
      if (onSuccess) {
        onSuccess(txId);
      }
      
      // Show success message
      alert(`Successfully purchased "${story.title}" for ${tokenAmount} LUMEN tokens!`);
    } catch (error) {
      console.error('Error purchasing story:', error);
      
      // Call error callback
      if (onError && error instanceof Error) {
        onError(error);
      }
      
      // Show error message
      alert(`Failed to purchase story: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsPurchasing(false);
    }
  };
  
  // If not connected, show wallet connect button
  if (!connected) {
    return (
      <div className="space-y-2">
        <p className="text-sm text-gray-600">Connect your wallet to purchase this story</p>
        <WalletConnector variant="small" />
      </div>
    );
  }
  
  return (
    <button
      className={buttonStyle}
      onClick={handlePurchase}
      disabled={isPurchasing || !connected}
    >
      {isPurchasing ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </>
      ) : (
        <>
          <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          Purchase for {story.tokenPrice || 5} LUMEN
        </>
      )}
    </button>
  );
};

export default PurchaseStoryButton; 