#!/bin/bash
# Script to install Solana wallet adapters and other dependencies for LUMEN TALES

echo "Installing Solana wallet adapters and dependencies..."

# Install Solana web3.js
npm install --save @solana/web3.js

# Install Solana wallet adapters
npm install --save \
  @solana/wallet-adapter-base \
  @solana/wallet-adapter-react \
  @solana/wallet-adapter-react-ui \
  @solana/wallet-adapter-wallets

# Install Solana SPL token
npm install --save @solana/spl-token

# Install React components and utilities
npm install --save @headlessui/react react-toastify

echo "Installation complete!"
echo "You may need to restart your development server for changes to take effect." 