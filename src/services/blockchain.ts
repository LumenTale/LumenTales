import { 
  Connection, 
  PublicKey, 
  Transaction, 
  Keypair, 
  SystemProgram, 
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
  TransactionInstruction 
} from '@solana/web3.js';
import { 
  Token, 
  TOKEN_PROGRAM_ID, 
  ASSOCIATED_TOKEN_PROGRAM_ID, 
  MintLayout, 
  AccountLayout 
} from '@solana/spl-token';
import { toast } from 'react-toastify';
import { WalletContextState } from '@solana/wallet-adapter-react';

// Network configuration
const SOLANA_NETWORK = process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet';
const SOLANA_RPC_URL = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.devnet.solana.com';

// Token configuration
const TOKEN_MINT_ADDRESS = process.env.NEXT_PUBLIC_TOKEN_MINT_ADDRESS || '';
const NFT_PROGRAM_ADDRESS = process.env.NEXT_PUBLIC_NFT_PROGRAM_ADDRESS || '';

// Platform wallet for receiving fees (this would be a real address in production)
const PLATFORM_WALLET = process.env.NEXT_PUBLIC_PLATFORM_WALLET || 'GZyT2PCZiyJjYpxd8AdDypaypL8ctmMDRV1nZFYhCz1X';

// Initialize Solana connection
const connection = new Connection(SOLANA_RPC_URL, 'confirmed');

/**
 * Get Solana balance for a wallet address
 * 
 * @param walletAddress Solana wallet address
 * @returns Balance in SOL
 */
export const getSolanaBalance = async (walletAddress: string): Promise<number> => {
  try {
    // Convert address string to PublicKey
    const publicKey = new PublicKey(walletAddress);
    
    // Get account balance in lamports
    const balance = await connection.getBalance(publicKey);
    
    // Convert lamports to SOL
    return balance / LAMPORTS_PER_SOL;
  } catch (error) {
    console.error('Error getting Solana balance:', error);
    throw error;
  }
};

/**
 * Get token balance for a wallet address
 * 
 * @param walletAddress Solana wallet address
 * @param tokenMintAddress Address of the token mint (optional, uses default if not provided)
 * @returns Token balance
 */
export const getTokenBalance = async (
  walletAddress: string,
  tokenMintAddress: string = TOKEN_MINT_ADDRESS
): Promise<number> => {
  try {
    if (!tokenMintAddress) {
      throw new Error('Token mint address not provided');
    }
    
    // Convert addresses to PublicKeys
    const publicKey = new PublicKey(walletAddress);
    const mintPublicKey = new PublicKey(tokenMintAddress);
    
    // Find the token account address for this wallet
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
      publicKey,
      { mint: mintPublicKey }
    );
    
    // If no token accounts found, return 0
    if (tokenAccounts.value.length === 0) {
      return 0;
    }
    
    // Get the balance from the first token account
    const balance = tokenAccounts.value[0].account.data.parsed.info.tokenAmount.uiAmount;
    return balance;
  } catch (error) {
    console.error('Error getting token balance:', error);
    throw error;
  }
};

/**
 * Find or create an associated token account for a wallet
 * 
 * @param wallet Wallet public key
 * @param tokenMint Token mint public key
 * @param walletSigner Wallet adapter to sign the transaction
 * @returns Associated token account address
 */
export const findOrCreateAssociatedTokenAccount = async (
  wallet: PublicKey,
  tokenMint: PublicKey,
  walletSigner: WalletContextState
): Promise<PublicKey> => {
  // Derive the associated token account address
  const [associatedTokenAddress] = await PublicKey.findProgramAddress(
    [
      wallet.toBuffer(),
      TOKEN_PROGRAM_ID.toBuffer(),
      tokenMint.toBuffer(),
    ],
    ASSOCIATED_TOKEN_PROGRAM_ID
  );
  
  // Check if the account exists
  const account = await connection.getAccountInfo(associatedTokenAddress);
  
  // If account doesn't exist, create it
  if (!account) {
    console.log('Creating associated token account...');
    
    const transaction = new Transaction().add(
      Token.createAssociatedTokenAccountInstruction(
        ASSOCIATED_TOKEN_PROGRAM_ID,
        TOKEN_PROGRAM_ID,
        tokenMint,
        associatedTokenAddress,
        wallet,
        wallet
      )
    );
    
    transaction.feePayer = wallet;
    const { blockhash } = await connection.getRecentBlockhash();
    transaction.recentBlockhash = blockhash;
    
    try {
      const signed = await walletSigner.signTransaction!(transaction);
      const txid = await connection.sendRawTransaction(signed.serialize());
      await connection.confirmTransaction(txid);
      console.log('Associated token account created:', associatedTokenAddress.toString());
    } catch (e) {
      console.error('Error creating associated token account:', e);
      throw e;
    }
  }
  
  return associatedTokenAddress;
};

/**
 * Purchase a story using tokens
 * 
 * @param walletAddress Buyer's wallet address
 * @param storyId ID of the story being purchased
 * @param tokenAmount Amount of tokens to pay
 * @param authorWalletAddress Author's wallet address to receive payment
 * @param walletSigner Wallet adapter to sign the transaction
 * @returns Transaction ID
 */
export const purchaseStory = async (
  walletAddress: string,
  storyId: string,
  tokenAmount: number,
  authorWalletAddress: string,
  walletSigner: WalletContextState
): Promise<string> => {
  try {
    if (!TOKEN_MINT_ADDRESS) {
      throw new Error('Token mint address not configured');
    }
    
    // Check if wallet adapter is connected and can sign
    if (!walletSigner.publicKey || !walletSigner.signTransaction) {
      throw new Error('Wallet not connected or cannot sign transactions');
    }
    
    // Convert addresses to PublicKeys
    const walletPublicKey = new PublicKey(walletAddress);
    const authorPublicKey = new PublicKey(authorWalletAddress);
    const platformPublicKey = new PublicKey(PLATFORM_WALLET);
    const tokenMintPublicKey = new PublicKey(TOKEN_MINT_ADDRESS);
    
    // Get token accounts
    const buyerTokenAccount = await findOrCreateAssociatedTokenAccount(
      walletPublicKey,
      tokenMintPublicKey,
      walletSigner
    );
    
    const authorTokenAccount = await findOrCreateAssociatedTokenAccount(
      authorPublicKey,
      tokenMintPublicKey,
      walletSigner
    );
    
    const platformTokenAccount = await findOrCreateAssociatedTokenAccount(
      platformPublicKey,
      tokenMintPublicKey,
      walletSigner
    );
    
    // Calculate fee split (e.g., 10% to platform, 90% to author)
    const platformFee = tokenAmount * 0.10;
    const authorPayment = tokenAmount - platformFee;
    
    // Create transfer transaction 
    const transaction = new Transaction();
    
    // Add instruction to transfer tokens to author
    transaction.add(
      Token.createTransferInstruction(
        TOKEN_PROGRAM_ID,
        buyerTokenAccount,
        authorTokenAccount,
        walletPublicKey,
        [],
        authorPayment * Math.pow(10, 9) // Convert to smallest units
      )
    );
    
    // Add instruction to transfer fee to platform
    transaction.add(
      Token.createTransferInstruction(
        TOKEN_PROGRAM_ID,
        buyerTokenAccount,
        platformTokenAccount,
        walletPublicKey,
        [],
        platformFee * Math.pow(10, 9) // Convert to smallest units
      )
    );
    
    // Set fee payer and recent blockhash
    transaction.feePayer = walletPublicKey;
    const { blockhash } = await connection.getRecentBlockhash();
    transaction.recentBlockhash = blockhash;
    
    // Sign and send transaction
    const signed = await walletSigner.signTransaction(transaction);
    const txid = await connection.sendRawTransaction(signed.serialize());
    await connection.confirmTransaction(txid);
    
    console.log('Story purchase transaction confirmed:', txid);
    
    // In a real app, you would update the database with purchase information here
    
    return txid;
  } catch (error) {
    console.error('Error purchasing story:', error);
    throw error;
  }
};

/**
 * Mint an NFT for a character
 * 
 * @param walletAddress Owner's wallet address
 * @param characterId ID of the character
 * @param characterName Name of the character
 * @returns NFT mint address
 */
export const mintCharacterNFT = async (
  walletAddress: string,
  characterId: string,
  characterName: string
): Promise<string> => {
  try {
    // In a real implementation, this would:
    // 1. Upload metadata to IPFS or Arweave
    // 2. Create an NFT using a program like Metaplex
    // 3. Sign the transaction client-side using the wallet adapter
    // 4. Send the transaction to the blockchain
    
    // For now, we'll simulate a successful mint
    console.log(`Simulating mint of character NFT for ${characterId}`);
    
    // Simulate some processing time
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Generate a fake NFT mint address
    const mintAddress = new PublicKey(Keypair.generate().publicKey).toString();
    
    return mintAddress;
  } catch (error) {
    console.error('Error minting character NFT:', error);
    throw error;
  }
};

/**
 * Get NFTs owned by a wallet
 * 
 * @param walletAddress Owner's wallet address
 * @returns Array of NFT data
 */
export const getOwnedNFTs = async (walletAddress: string): Promise<any[]> => {
  try {
    // In a real implementation, this would:
    // 1. Query the NFT program (e.g., Metaplex) for NFTs owned by this wallet
    // 2. Fetch metadata for each NFT
    // 3. Return formatted data
    
    // For now, we'll return simulated NFT data
    console.log(`Simulating fetching NFTs for wallet ${walletAddress}`);
    
    // Simulate some processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulated NFT data
    return [
      {
        id: 'nft1',
        name: 'Heroic Knight',
        description: 'A valiant knight from the kingdom of Lumeria',
        image: '/images/characters/knight.jpg',
        rarity: 'rare',
        attributes: {
          strength: 85,
          dexterity: 70,
          intelligence: 60,
          wisdom: 65,
          charisma: 75,
          constitution: 80,
          luck: 60
        },
        creator: {
          id: 'user-1',
          name: 'Alex Writer',
          email: 'alex@example.com',
          role: 'creator',
          walletAddress: '8zJ3MFU3SRdrSpzoQn9NLpS1VNL7WuD4whCnNvpUNDv1',
          createdAt: '2023-05-15T10:30:00Z',
          updatedAt: '2023-05-15T10:30:00Z',
        },
        mintAddress: new PublicKey(Keypair.generate().publicKey).toString(),
        storyId: 'story-1',
        storyTitle: 'The Crystal Cavern'
      },
      {
        id: 'nft2',
        name: 'Wise Mage',
        description: 'A powerful mage specializing in elemental magic',
        image: '/images/characters/mage.jpg',
        rarity: 'epic',
        attributes: {
          strength: 50,
          dexterity: 65,
          intelligence: 90,
          wisdom: 85,
          charisma: 70,
          constitution: 60,
          luck: 75
        },
        creator: {
          id: 'user-2',
          name: 'Sam Scribe',
          email: 'sam@example.com',
          role: 'creator',
          walletAddress: '5zJ3MFU3SRdrSpzoQn9NLpS1VNL7WuD4whCnNvpUNDv1',
          createdAt: '2023-04-10T08:20:00Z',
          updatedAt: '2023-04-10T08:20:00Z',
        },
        mintAddress: new PublicKey(Keypair.generate().publicKey).toString(),
        storyId: 'story-2',
        storyTitle: 'Echoes of Tomorrow'
      },
    ];
  } catch (error) {
    console.error('Error getting owned NFTs:', error);
    throw error;
  }
};

/**
 * Send tokens to another wallet
 * 
 * @param senderAddress Sender's wallet address
 * @param recipientAddress Recipient's wallet address
 * @param amount Amount of tokens to send
 * @param walletSigner Wallet adapter to sign the transaction
 * @returns Transaction ID
 */
export const sendTokens = async (
  senderAddress: string,
  recipientAddress: string,
  amount: number,
  walletSigner: WalletContextState
): Promise<string> => {
  try {
    if (!TOKEN_MINT_ADDRESS) {
      throw new Error('Token mint address not configured');
    }
    
    // Check if wallet adapter is connected and can sign
    if (!walletSigner.publicKey || !walletSigner.signTransaction) {
      throw new Error('Wallet not connected or cannot sign transactions');
    }
    
    // Convert addresses to PublicKeys
    const senderPublicKey = new PublicKey(senderAddress);
    const recipientPublicKey = new PublicKey(recipientAddress);
    const tokenMintPublicKey = new PublicKey(TOKEN_MINT_ADDRESS);
    
    // Get token accounts
    const senderTokenAccount = await findOrCreateAssociatedTokenAccount(
      senderPublicKey,
      tokenMintPublicKey,
      walletSigner
    );
    
    const recipientTokenAccount = await findOrCreateAssociatedTokenAccount(
      recipientPublicKey,
      tokenMintPublicKey,
      walletSigner
    );
    
    // Create transfer transaction
    const transaction = new Transaction();
    
    // Add instruction to transfer tokens
    transaction.add(
      Token.createTransferInstruction(
        TOKEN_PROGRAM_ID,
        senderTokenAccount,
        recipientTokenAccount,
        senderPublicKey,
        [],
        amount * Math.pow(10, 9) // Convert to smallest units
      )
    );
    
    // Set fee payer and recent blockhash
    transaction.feePayer = senderPublicKey;
    const { blockhash } = await connection.getRecentBlockhash();
    transaction.recentBlockhash = blockhash;
    
    // Sign and send transaction
    const signed = await walletSigner.signTransaction(transaction);
    const txid = await connection.sendRawTransaction(signed.serialize());
    await connection.confirmTransaction(txid);
    
    console.log('Token transfer transaction confirmed:', txid);
    
    return txid;
  } catch (error) {
    console.error('Error sending tokens:', error);
    throw error;
  }
}; 