import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiMenu, FiX, FiUser, FiShoppingCart, FiBook, FiHome, FiUsers } from 'react-icons/fi';
import WalletConnector from '@/components/wallet/WalletConnector';
import { useAuth } from '@/hooks/useAuth';

// Type for Auth Context
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
}

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: 'user' | 'creator' | 'admin';
  walletAddress?: string;
  createdAt: string;
  updatedAt: string;
}

const Navbar: React.FC = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const auth = useAuth() as unknown as AuthContextType;
  const { user } = auth;
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  const isActive = (path: string) => {
    return router.pathname === path;
  };
  
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and main navigation */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                <span className="text-xl font-bold text-purple-600">LUMEN</span>
                <span className="text-xl font-bold text-gray-900">TALES</span>
              </Link>
            </div>
            
            {/* Desktop navigation */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link 
                href="/" 
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/') 
                    ? 'border-purple-500 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <FiHome className="mr-1" />
                Home
              </Link>
              
              <Link 
                href="/marketplace" 
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/marketplace') 
                    ? 'border-purple-500 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <FiBook className="mr-1" />
                Stories
              </Link>
              
              <Link 
                href="/character-market" 
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/character-market') 
                    ? 'border-purple-500 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <FiUsers className="mr-1" />
                Characters
              </Link>
            </div>
          </div>
          
          {/* Right side navigation */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <WalletConnector variant="small" />
            
            {user ? (
              <Link 
                href="/dashboard" 
                className={`inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md ${
                  isActive('/dashboard') 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                }`}
              >
                <FiUser className="mr-1" />
                Dashboard
              </Link>
            ) : (
              <Link 
                href="/login" 
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              >
                <FiUser className="mr-1" />
                Sign In
              </Link>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <FiX className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <FiMenu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link 
              href="/" 
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                isActive('/') 
                  ? 'bg-purple-50 border-purple-500 text-purple-700' 
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              }`}
              onClick={closeMenu}
            >
              <div className="flex items-center">
                <FiHome className="mr-2" />
                Home
              </div>
            </Link>
            
            <Link 
              href="/marketplace" 
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                isActive('/marketplace') 
                  ? 'bg-purple-50 border-purple-500 text-purple-700' 
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              }`}
              onClick={closeMenu}
            >
              <div className="flex items-center">
                <FiBook className="mr-2" />
                Stories
              </div>
            </Link>
            
            <Link 
              href="/character-market" 
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                isActive('/character-market') 
                  ? 'bg-purple-50 border-purple-500 text-purple-700' 
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              }`}
              onClick={closeMenu}
            >
              <div className="flex items-center">
                <FiUsers className="mr-2" />
                Characters
              </div>
            </Link>
            
            <div className="pl-3 pr-4 py-2">
              <WalletConnector variant="small" />
            </div>
            
            {user ? (
              <Link 
                href="/dashboard" 
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  isActive('/dashboard') 
                    ? 'bg-purple-50 border-purple-500 text-purple-700' 
                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                }`}
                onClick={closeMenu}
              >
                <div className="flex items-center">
                  <FiUser className="mr-2" />
                  Dashboard
                </div>
              </Link>
            ) : (
              <Link 
                href="/login" 
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                onClick={closeMenu}
              >
                <div className="flex items-center">
                  <FiUser className="mr-2" />
                  Sign In
                </div>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 