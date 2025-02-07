import React from 'react';
import { Github, Linkedin } from 'lucide-react';

interface DeveloperProps {
  name: string;
  image: string;
  linkedin: string;
  github: string;
  role?: string;
}

const DeveloperCard: React.FC<DeveloperProps> = ({
  name,
  image,
  linkedin,
  github,
  role
}) => {
  return (
    <div className="flex flex-col items-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-md transform hover:scale-105 transition-duration-300">
      <img
        src={image}
        alt={name}
        className="w-32 h-32 rounded-full mb-4 object-cover border-4 border-white shadow-lg"
      />
      <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
      {role && <p className="text-gray-600 mb-4">{role}</p>}
      <div className="flex space-x-4">
        <a 
          href={github} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-gray-600 hover:text-blue-600"
        >
          <Github className="w-5 h-5" />
        </a>
        <a 
          href={linkedin} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-gray-600 hover:text-blue-600"
        >
          <Linkedin className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
};

export default DeveloperCard;