import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Story } from '@/types';

interface StoryCardProps {
  story: Story;
  highlight?: boolean;
  className?: string;
  onClick?: () => void;
}

const StoryCard: React.FC<StoryCardProps> = ({ 
  story, 
  highlight = false,
  className = '',
  onClick
}) => {
  const {
    id,
    title,
    description,
    coverImage,
    author,
    genre,
    tags,
    rating,
    readCount,
    tokenId,
    tokenPrice
  } = story;

  // Format token price if available
  const formattedPrice = tokenPrice ? 
    new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(tokenPrice) : 
    null;

  // Generate tag styles
  const tagColors = [
    'bg-blue-100 text-blue-800',
    'bg-green-100 text-green-800',
    'bg-purple-100 text-purple-800',
    'bg-pink-100 text-pink-800',
    'bg-yellow-100 text-yellow-800'
  ];

  // Truncate description if too long
  const truncateDescription = (text: string, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <div 
      className={`
        relative overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl
        ${highlight ? 'border-2 border-purple-500' : 'border border-gray-200'}
        ${className}
      `}
    >
      {/* Token badge */}
      {tokenId && (
        <div className="absolute top-3 right-3 z-10 bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm3 3a1 1 0 00-1 1v10a1 1 0 002 0V6a1 1 0 00-1-1zm4 0a1 1 0 00-1 1v10a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          NFT
        </div>
      )}
      
      {/* Cover image */}
      <div className="relative w-full h-48">
        <Image 
          src={coverImage}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      
      {/* Content */}
      <div className="p-4">
        {/* Title and rating */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          
          {rating > 0 && (
            <div className="flex items-center text-amber-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        
        {/* Author */}
        <div className="flex items-center mb-3">
          <div className="relative w-6 h-6 rounded-full overflow-hidden mr-2">
            <Image 
              src={author.image || '/images/default-avatar.png'}
              alt={author.name}
              fill
              sizes="24px"
              className="object-cover"
            />
          </div>
          <span className="text-sm text-gray-600">{author.name}</span>
        </div>
        
        {/* Description */}
        <p className="text-sm text-gray-500 mb-3">
          {truncateDescription(description)}
        </p>
        
        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {tags.slice(0, 3).map((tag, index) => (
              <span 
                key={tag} 
                className={`text-xs px-2 py-0.5 rounded ${tagColors[index % tagColors.length]}`}
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-800">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}
        
        {/* Stats and price */}
        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {readCount}
          </div>
          
          {formattedPrice && (
            <div className="text-sm font-medium text-purple-600">
              {formattedPrice}
            </div>
          )}
        </div>
      </div>
      
      {/* Link overlay - conditionally render based on onClick or use Link */}
      {onClick ? (
        <button 
          onClick={onClick} 
          className="absolute inset-0 z-10 w-full h-full cursor-pointer" 
          aria-label={`View story: ${title}`}
        />
      ) : (
        <Link href={`/stories/${id}`} className="absolute inset-0 z-10">
          <span className="sr-only">View story</span>
        </Link>
      )}
    </div>
  );
};

export default StoryCard; 