import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { LinearSearch } from './LinearSearch';
import { BinarySearch } from './BinarySearch';

export const Search: React.FC = () => {
  return (
    <div className="mt-8">
      <h2 className="text-3xl font-bold text-white mb-6">Search Algorithms</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Link to="linear" className="block">
          <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
            <h3 className="text-xl font-bold text-white mb-2">Linear Search</h3>
            <p className="text-gray-300">Sequential search through array elements</p>
          </div>
        </Link>
        
        <Link to="binary" className="block">
          <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
            <h3 className="text-xl font-bold text-white mb-2">Binary Search</h3>
            <p className="text-gray-300">Efficient search in sorted arrays</p>
          </div>
        </Link>
      </div>

      <Routes>
        <Route path="linear" element={<LinearSearch />} />
        <Route path="binary" element={<BinarySearch />} />
      </Routes>
    </div>
  );
};