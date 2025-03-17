import React from 'react';
import { useWallet } from '@/blockchain/hooks/useWallet';

interface WalletConnectButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const WalletConnectButton: React.FC<WalletConnectButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  className = '',
}) => {
  const { address, balance, isConnected, isConnecting, connect, disconnect } = useWallet();

  // Define styles based on variant and size
  const getButtonStyles = () => {
    const baseStyles = 'rounded-full font-medium transition-all duration-200 flex items-center justify-center';
    
    // Variant styles
    const variantStyles = {
      primary: 'bg-purple-600 text-white hover:bg-purple-700',
      secondary: 'bg-blue-500 text-white hover:bg-blue-600',
      outline: 'bg-transparent border border-purple-600 text-purple-600 hover:bg-purple-50',
    };
    
    // Size styles
    const sizeStyles = {
      small: 'text-sm px-3 py-1.5',
      medium: 'text-base px-4 py-2',
      large: 'text-lg px-6 py-3',
    };
    
    return `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;
  };

  // Format address for display
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Format balance for display
  const formatBalance = (balance: string) => {
    const numBalance = parseFloat(balance);
    return numBalance.toFixed(4);
  };

  // Handle button click
  const handleClick = () => {
    if (isConnected) {
      disconnect();
    } else {
      connect();
    }
  };

  return (
    <button
      className={getButtonStyles()}
      onClick={handleClick}
      disabled={isConnecting}
    >
      {isConnecting ? (
        <span className="flex items-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Connecting Wallet...
        </span>
      ) : isConnected && address ? (
        <div className="flex items-center">
          <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
          <span>
            {formatAddress(address)}
            {balance && ` (${formatBalance(balance)} ETH)`}
          </span>
        </div>
      ) : (
        <span className="flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          Connect Wallet
        </span>
      )}
    </button>
  );
};

export default WalletConnectButton; 