import React from 'react';

interface ADTCardProps {
  title: string;
  description: string;
  operations: string[];
  image: string;
}

export const ADTCard: React.FC<ADTCardProps> = ({ title, description, operations, image }) => {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-gray-800 p-6 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl">
      <div className="absolute inset-0">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover opacity-20 transition-all duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
      </div>
      
      <div className="relative">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300 mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-2">
          {operations.map((operation, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30"
            >
              {operation}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};