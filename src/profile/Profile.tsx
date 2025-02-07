import React from 'react';
import DeveloperCard from '../components/DeveloperCard';

const developers = [
  {
    name: "♞ Yaswanth Sai V",
    image: "/yaswanth.jpg",
    linkedin: "https://www.linkedin.com/in/yaswanth-sai-43ab47258/",
    github: "https://github.com/yaswanth-142004"
  },
  {
    name: "♞ Shakeer S",
    image: "/shakeer.jpg",
    linkedin: "https://www.linkedin.com/in/shakeer-samanthapudi/",
    github: "https://github.com/Samanthapudi-Shakeer/"
  },
  {
    name: "♞ Prathyush G",
    image: "/prathyush.jpg",
    linkedin: "https://www.linkedin.com/in/gutha-prathyush-6215ba255/",
    github: "https://github.com/GuthaPrathyush"
  },
  {
    name: "♞ N.S.K.S Harshitha",
    image: "/harshitha.jpg",
    linkedin: "https://www.linkedin.com/in/harshitha-nalla-877001259/",
    github: "https://github.com/harshitha-nalla"
  }
];

function Profile() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-lg w-full max-w-7xl">
        <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Meet the Neural Knights ♞
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {developers.map((dev, index) => (
            <DeveloperCard
              key={index}
              {...dev}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;