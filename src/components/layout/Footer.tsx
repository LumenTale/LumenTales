import React from 'react';
import Link from 'next/link';
import { FiGithub, FiTwitter, FiInstagram, FiLinkedin, FiMail } from 'react-icons/fi';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand and description */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-purple-400">LUMEN</span>
              <span className="text-xl font-bold text-white">TALES</span>
            </Link>
            <p className="mt-4 text-gray-400 max-w-md">
              A tokenized interactive narrative platform where stories become digital assets. 
              Create, collect, and experience interactive stories powered by blockchain technology.
            </p>
            
            {/* Social links */}
            <div className="mt-6 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <FiTwitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Instagram</span>
                <FiInstagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">GitHub</span>
                <FiGithub className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <FiLinkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          {/* Navigation links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Explore</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/marketplace" className="text-base text-gray-400 hover:text-white">
                  Stories
                </Link>
              </li>
              <li>
                <Link href="/character-market" className="text-base text-gray-400 hover:text-white">
                  Characters
                </Link>
              </li>
              <li>
                <Link href="/creators" className="text-base text-gray-400 hover:text-white">
                  Creators
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-base text-gray-400 hover:text-white">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Resources links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/faq" className="text-base text-gray-400 hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-base text-gray-400 hover:text-white">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-base text-gray-400 hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-base text-gray-400 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-base text-gray-400 hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Newsletter subscription */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="max-w-md mb-6 md:mb-0">
              <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                Subscribe to our newsletter
              </h3>
              <p className="mt-2 text-base text-gray-400">
                The latest news, articles, and resources, sent to your inbox weekly.
              </p>
            </div>
            <div className="flex-1 w-full md:w-auto md:flex-initial">
              <form className="sm:flex">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-5 py-3 placeholder-gray-500 focus:ring-purple-500 focus:border-purple-500 sm:max-w-xs border-gray-700 rounded-md bg-gray-800 text-white"
                  placeholder="Enter your email"
                />
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-8 border-t border-gray-800 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            <p className="text-base text-gray-400">
              <Link href="/contact" className="hover:text-white">
                <FiMail className="inline-block mr-2" />
                support@lumentales.com
              </Link>
            </p>
          </div>
          <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
            &copy; {currentYear} Lumen Tales. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 