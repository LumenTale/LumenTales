import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useAuth } from '@/hooks/useAuth';
import { truncateAddress } from '@/utils/format';

interface WalletConnectorProps {
  showBalance?: boolean;
  variant?: 'default' | 'small' | 'large';
  onConnected?: (publicKey: string) => void;
}

const WalletConnector: React.FC<WalletConnectorProps> = ({
  showBalance = true,
  variant = 'default',
  onConnected,
}) => {
  const { publicKey, connected, connecting, disconnect } = useWallet();
  const { user, updateUser } = useAuth();
  const [solBalance, setSolBalance] = useState<number | null>(null);
  const [tokenBalance, setTokenBalance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Check if wallet is connected and fetch balances
  useEffect(() => {
    if (connected && publicKey) {
      fetchBalances();
      
      // Update user's wallet address if not already set
      if (user && (!user.walletAddress || user.walletAddress !== publicKey.toString())) {
        updateWalletAddress(publicKey.toString());
      }
      
      // Trigger onConnected callback
      if (onConnected) {
        onConnected(publicKey.toString());
      }
    } else {
      setSolBalance(null);
      setTokenBalance(null);
    }
  }, [connected, publicKey, user]);

  // Fetch SOL and token balances
  const fetchBalances = async () => {
    if (!publicKey) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call to fetch the balance
      // const response = await fetch(`/api/wallet/balance?address=${publicKey.toString()}`);
      // const data = await response.json();
      // setSolBalance(data.solBalance);
      // setTokenBalance(data.tokenBalance);
      
      // Simulated API response
      setTimeout(() => {
        setSolBalance(2.5);
        setTokenBalance(100);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching wallet balances:', error);
      setError('Failed to fetch wallet balances');
      setIsLoading(false);
    }
  };

  // Update user's wallet address in the database
  const updateWalletAddress = async (address: string) => {
    try {
      // In a real app, this would be an API call to update the user
      // await updateUser({ walletAddress: address });
      
      // For now, we'll just log it
      console.log('Updated wallet address:', address);
    } catch (error) {
      console.error('Error updating wallet address:', error);
    }
  };

  // Render different variants
  if (variant === 'small') {
    return (
      <div className="inline-flex items-center">
        <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700 !rounded-md !h-9 !text-xs" />
        
        {connected && publicKey && showBalance && (
          <div className="ml-2 text-xs">
            {isLoading ? (
              <span className="text-gray-500">Loading...</span>
            ) : (
              <span className="font-medium text-gray-700">
                {solBalance !== null ? `${solBalance} SOL` : ''}
                {tokenBalance !== null ? ` | ${tokenBalance} LUM` : ''}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }

  if (variant === 'large') {
    return (
      <div className="rounded-lg bg-white shadow-md p-4">
        {!connected ? (
          <div className="text-center py-4">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Connect Wallet</h3>
            <p className="text-gray-600 mb-4 max-w-sm mx-auto">
              Connect your Solana wallet to access premium content and manage your tokens
            </p>
            <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700 !rounded-md" />
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-800">Wallet Connected</h3>
              <button
                onClick={() => disconnect()}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Disconnect
              </button>
            </div>
            
            <div className="bg-gray-50 rounded-md p-3 mb-4">
              <div className="flex items-center">
                <div className="bg-purple-100 rounded-full p-2 mr-3">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Address</div>
                  <div className="font-medium text-gray-800">
                    {truncateAddress(publicKey.toString())}
                  </div>
                </div>
              </div>
            </div>
            
            {showBalance && (
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-md p-3">
                  <div className="text-sm text-gray-500 mb-1">SOL Balance</div>
                  {isLoading ? (
                    <div className="h-5 bg-gray-200 animate-pulse rounded"></div>
                  ) : (
                    <div className="font-medium text-gray-800">
                      {solBalance !== null ? `${solBalance} SOL` : 'N/A'}
                    </div>
                  )}
                </div>
                
                <div className="bg-gray-50 rounded-md p-3">
                  <div className="text-sm text-gray-500 mb-1">LUM Balance</div>
                  {isLoading ? (
                    <div className="h-5 bg-gray-200 animate-pulse rounded"></div>
                  ) : (
                    <div className="font-medium text-gray-800">
                      {tokenBalance !== null ? `${tokenBalance} LUM` : 'N/A'}
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {error && (
              <div className="mt-3 text-sm text-red-600">
                {error} - <button onClick={fetchBalances} className="underline">Retry</button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // Default variant
  return (
    <div className="flex items-center gap-4">
      <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700 !rounded-md" />
      
      {connected && publicKey && showBalance && (
        <div className="text-sm">
          {isLoading ? (
            <span className="text-gray-500">Loading balances...</span>
          ) : (
            <div className="flex items-center gap-3">
              <span className="font-medium text-gray-700">
                {solBalance !== null ? `${solBalance} SOL` : 'N/A'}
              </span>
              <span className="font-medium text-purple-700">
                {tokenBalance !== null ? `${tokenBalance} LUM` : 'N/A'}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WalletConnector; 