import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

import { useAuth } from '@hooks/useAuth';
import Button from '@components/ui/Button';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { user, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Explore', href: '/explore' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Create', href: '/create' },
    { name: 'Marketplace', href: '/marketplace' },
  ];

  return (
    <header className="bg-white shadow-sm">
      <div className="container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.svg" alt="Lumen Tales Logo" width={40} height={40} />
            <span className="text-xl font-bold text-primary-600">Lumen Tales</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  router.pathname === item.href
                    ? 'text-primary-600'
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard" className="text-sm font-medium text-gray-700 hover:text-primary-600">
                  Dashboard
                </Link>
                <Button variant="outline" size="sm" onClick={logout}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-primary-600">
                  Sign In
                </Link>
                <Button variant="primary" size="sm" href="/register">
                  Get Started
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 text-gray-700 rounded-md hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              onClick={toggleMenu}
            >
              <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
              {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden"
        >
          <div className="container py-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 text-base font-medium rounded-md ${
                  router.pathname === item.href
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 mt-4 border-t border-gray-200">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:text-primary-600 hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full px-3 py-2 mt-2 text-base font-medium text-center text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:text-primary-600 hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="block w-full px-3 py-2 mt-2 text-base font-medium text-center text-white bg-primary-600 rounded-md hover:bg-primary-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header; 