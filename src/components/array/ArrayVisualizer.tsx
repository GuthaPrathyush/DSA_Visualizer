import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Search } from './search/Search';
import { ArrayOperations } from './ArrayOperations';

export const ArrayVisualizer: React.FC = () => {
  return (
    <div className="pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Array Operations</h1>
        
        <ArrayOperations />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="search" className="block">
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
              <h2 className="text-2xl font-bold text-white mb-2">Search</h2>
              <p className="text-gray-300">Various searching algorithms visualization</p>
            </div>
          </Link>
          {/* Add more array operations here */}
        </div>

        <Routes>
          <Route path="search/*" element={<Search />} />
        </Routes>
      </div>
    </div>
  );
};