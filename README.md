# Lumen Tales - Interactive Narrative Platform on Blockchain

<div align="center">
  <!-- Using direct root path for images -->
  <img src="logo.png" alt="Lumen Tales Logo" width="250">
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
  [![Website](https://img.shields.io/badge/Website-lumentales.com-blue)](https://www.lumentales.com)
  [![Twitter](https://img.shields.io/badge/Twitter-@LumenTales-blue)](https://x.com/LumenTales)
  [![GitHub](https://img.shields.io/badge/GitHub-LumenTale-blue)](https://github.com/LumenTale/LumenTales)
</div>

## 🔑 Overview

Lumen Tales is a tokenized interactive narrative platform that empowers creators to build branching stories while readers can use blockchain tokens to unlock premium content and shape story direction. By leveraging the Solana blockchain, we create a new paradigm for digital storytelling where narrative choices have real economic value.

### Key Features

- **Interactive Storytelling**: Immersive branching narratives where reader choices matter
- **Story Marketplace**: Browse, purchase, and read tokenized interactive stories
- **Character NFTs**: Collect unique character NFTs to use across multiple stories
- **Blockchain Integration**: Solana-powered token economy for seamless transactions
- **Creator Economy**: Sustainable revenue model for story creators
- **User Dashboard**: Manage purchased stories, characters, and tokens in one place

## 🏗️ System Architecture

Lumen Tales employs a modern, efficient architecture focused on performance and user experience.

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Client Applications                          │
│                                                                     │
│   ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐   │
│   │   Web Platform  │   │   Mobile App    │   │   Creator Tools │   │
│   │   (Next.js)     │   │   (Future)      │   │   (Future)      │   │
│   └─────────────────┘   └─────────────────┘   └─────────────────┘   │
└────────────────────────────────┬────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         Application Layer                           │
│                                                                     │
│   ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐   │
│   │  Story Components│   │  Wallet Connect │   │  Market System  │   │
│   │  Reader/Preview  │   │  Authentication │   │  Story & NFTs   │   │
│   └─────────────────┘   └─────────────────┘   └─────────────────┘   │
└────────────────────────────────┬────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                          Service Layer                              │
│                                                                     │
│   ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐   │
│   │ Authentication  │   │  Blockchain     │   │  API Services   │   │
│   │ User Management │   │  Transactions   │   │  Data Management│   │
│   └─────────────────┘   └─────────────────┘   └─────────────────┘   │
└────────────────────────────────┬────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      Blockchain Integration                         │
│                                                                     │
│   ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐   │
│   │ Wallet Adapter  │   │ Token Management│   │ NFT Management  │   │
│   │ Connection      │   │ Transactions    │   │ Metadata Handling│   │
│   └─────────────────┘   └─────────────────┘   └─────────────────┘   │
└────────────────────────────────┬────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       Blockchain Networks                           │
│                                                                     │
│   ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐   │
│   │  Solana Mainnet │   │  Solana Devnet  │   │  RPC Providers  │   │
│   │                 │   │  (Development)  │   │  (Connection)   │   │
│   └─────────────────┘   └─────────────────┘   └─────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

## 💻 Technical Stack

Lumen Tales is built with a modern, efficient technology stack:

### Frontend
- **Framework**: React with Next.js for server-side rendering
- **Styling**: Tailwind CSS for responsive design
- **State Management**: React Context API and hooks
- **Wallet Integration**: Solana wallet adapters (@solana/wallet-adapter)
- **UI Components**: Custom components with Headless UI

### Blockchain Integration
- **Network**: Solana (mainnet and devnet)
- **Token Standards**: SPL Token for fungible tokens
- **Wallet Management**: Multiple wallet support (Phantom, Solflare, etc.)
- **Transaction Handling**: @solana/web3.js for blockchain interactions

### Authentication & Data Management
- **Auth System**: JWT-based authentication
- **User Management**: Custom hooks and context providers
- **Data Storage**: Future integration with MongoDB and/or IPFS

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- A Solana wallet (Phantom, Solflare, etc.)

### Installation

```bash
# Clone the repository
git clone https://github.com/LumenTale/LumenTales.git
cd LumenTales

# Install dependencies
npm install

# Install Solana-related dependencies (if needed)
./install-dependencies.sh

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Start development server
npm run dev
```

The application will be available at http://localhost:3000

## 📊 Core Features

### Interactive Story System

The story system in Lumen Tales is designed to provide seamless branching narratives:

1. **Story Structure**
   - Stories are composed of interconnected nodes
   - Each node contains narrative content and choice options
   - Choices can be free or premium (token-gated)

2. **Reader Experience**
   - Immersive reading interface with theme options
   - Choice-driven progression through narratives
   - Token-based unlocking of premium paths

3. **Marketplace Integration**
   - Browse stories by category, popularity, or recency
   - Purchase stories with LUMEN tokens
   - Preview first chapters before purchase

### Character NFT System

Lumen Tales features a unique character system:

1. **Character Marketplace**
   - Browse and purchase character NFTs
   - Filter by rarity, attributes, and price
   - View character details and ownership history

2. **Character Ownership**
   - Characters are represented as NFTs on Solana
   - Owners can use characters across compatible stories
   - Trade characters in the secondary market

3. **Character Attributes**
   - Each character has unique attributes affecting stories
   - Rarity levels determine character value
   - Special abilities can unlock unique story paths

### Blockchain Integration

Our blockchain integration prioritizes user experience:

1. **Wallet Connection**
   - Seamless wallet connection with multiple providers
   - Wallet-based authentication
   - Transaction signing for purchases

2. **Token Economy**
   - LUMEN token as the platform currency
   - Token-gated premium content
   - Royalties for creators on transactions

3. **Transaction System**
   - Optimized transaction flow for minimal fees
   - Secure purchase verification
   - Transaction history in user dashboard

## 🔒 Security Considerations

Lumen Tales takes security seriously:

1. **Wallet Security**
   - No private key storage on our servers
   - Client-side transaction signing
   - Optional transaction confirmation

2. **Data Protection**
   - JWT-based authentication
   - Minimal personal data collection
   - Secure API endpoints

3. **Smart Contract Security**
   - Best practices for contract development
   - Planned future audits
   - Transparent transaction processes

## 📖 Project Structure

The Lumen Tales codebase is organized for maintainability and scalability:

```
/src
  /blockchain        - Solana blockchain integration code
  /components        - React components
    /home            - Homepage components
    /layout          - Layout components (navbar, footer)
    /market          - Marketplace components
    /story           - Story-related components
    /ui              - Reusable UI components
    /wallet          - Wallet connection components
  /context           - React context providers
  /hooks             - Custom React hooks
  /pages             - Next.js pages
    /preview         - Story preview pages
    /reader          - Story reader pages
    /story           - Story detail pages
  /services          - Service layer (API, blockchain)
  /styles            - Global styles
  /types             - TypeScript type definitions
  /utils             - Utility functions
```

## 🤝 Contributing

Contributions to Lumen Tales are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- Website: [lumentales.com](https://lumentales.com)
- Twitter: [@LumenTales](https://x.com/LumenTales)
- GitHub: [LumenTale/LumenTales](https://github.com/LumenTale/LumenTales)

Built with ❤️ by the Lumen Tales Team 