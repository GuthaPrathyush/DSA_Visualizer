import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { TopologicalSort } from './TopologicalSort';
import { Dijkstra } from './Dijkstra';
import { Code2 } from 'lucide-react';

export const Graph: React.FC = () => {
  return (
    <div className="pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Graph Algorithms</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link to="topological-sort" className="block">
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors group">
              <div className="flex items-center gap-2 mb-3">
                <Code2 className="h-6 w-6 text-purple-500 group-hover:text-purple-400 transition-colors" />
                <h3 className="text-xl font-bold text-white">Topological Sort</h3>
              </div>
              <p className="text-gray-300">
                Visualize dependency resolution and ordering in directed acyclic graphs
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {['DAG', 'Dependencies', 'Ordering'].map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>

          <Link to="dijkstra" className="block">
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors group">
              <div className="flex items-center gap-2 mb-3">
                <Code2 className="h-6 w-6 text-purple-500 group-hover:text-purple-400 transition-colors" />
                <h3 className="text-xl font-bold text-white">Dijkstra's Algorithm</h3>
              </div>
              <p className="text-gray-300">
                Find shortest paths in weighted graphs using Dijkstra's algorithm
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Shortest Path', 'Weighted Graph', 'Greedy'].map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>

          {/* Placeholder for future graph algorithms */}
          <div className="bg-gray-800/50 rounded-lg p-6 border-2 border-dashed border-gray-700">
            <div className="flex items-center gap-2 mb-3 opacity-50">
              <Code2 className="h-6 w-6 text-gray-400" />
              <h3 className="text-xl font-bold text-gray-400">More Coming Soon</h3>
            </div>
            <p className="text-gray-500">
              Additional graph algorithms like BFS and DFS will be added soon
            </p>
          </div>
        </div>

        <Routes>
          <Route path="topological-sort" element={<TopologicalSort />} />
          <Route path="dijkstra" element={<Dijkstra />} />
        </Routes>
      </div>
    </div>
  );
};