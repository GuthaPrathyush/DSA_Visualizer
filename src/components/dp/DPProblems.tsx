import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Knapsack } from './knapsack/Knapsack';
import { RodCutting } from './RodCutting';
import { Code2 } from 'lucide-react';

export const DPProblems: React.FC = () => {
  return (
    <div className="pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Dynamic Programming Problems</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link to="0-1-knapsack" className="block">
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <Code2 className="h-6 w-6 text-purple-500" />
                <h3 className="text-xl font-bold text-white">0/1 Knapsack</h3>
              </div>
              <p className="text-gray-300">
                Classic dynamic programming problem to maximize value while keeping weight under constraint
              </p>
            </div>
          </Link>

          <Link to="rod-cutting" className="block">
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <Code2 className="h-6 w-6 text-purple-500" />
                <h3 className="text-xl font-bold text-white">Rod Cutting</h3>
              </div>
              <p className="text-gray-300">
                Optimize cutting a rod into pieces to maximize profit
              </p>
            </div>
          </Link>
        </div>

        <Routes>
          <Route path="0-1-knapsack" element={<Knapsack />} />
          <Route path="rod-cutting" element={<RodCutting />} />
        </Routes>
      </div>
    </div>
  );
};