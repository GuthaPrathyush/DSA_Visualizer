import React from 'react';
import { Brain, Menu, X } from 'lucide-react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { ADTCard } from './components/ADTCard';
import { ArrayVisualizer } from './components/array/ArrayVisualizer';
import { StackVisualizer } from './components/stack/StackVisualizer';
import { QueueVisualizer } from './components/queue/QueueVisualizer';
import { DPProblems } from './components/dp/DPProblems';
import { OpenHashing } from './components/hashing/OpenHashing';
import { Graph } from './components/graph/Graph';
import { useState } from 'react';
import Profile from './profile/Profile';

const dataStructures = [
  {
    title: 'Stack',
    description: 'Last-In-First-Out (LIFO) data structure',
    operations: ['Push', 'Pop', 'Peek', 'isEmpty', 'isFull'],
    image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=1000',
    route: '/stack'
  },
  {
    title: 'Queue',
    description: 'First-In-First-Out (FIFO) data structure',
    operations: ['Enqueue', 'Dequeue', 'Front', 'Rear', 'isEmpty'],
    image: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&q=80&w=1000',
    route: '/queue'
  },
  {
    title: 'Array',
    description: 'Collection of elements stored at contiguous memory locations',
    operations: ['Insert', 'Delete', 'Search', 'Update', 'Sort'],
    image: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?auto=format&fit=crop&q=80&w=1000',
    route: '/array'
  },
  {
    title: 'Dynamic Programming',
    description: 'Solving complex problems by breaking them into simpler subproblems',
    operations: ['0/1 Knapsack', 'LCS', 'Matrix Chain', 'Edit Distance'],
    image: 'https://images.unsplash.com/photo-1553152531-b98a2fc8d3bf?auto=format&fit=crop&q=80&w=1000',
    route: '/dp-problems'
  },
  {
    title: 'Hashing',
    description: 'Collision resolution using open hashing (separate chaining)',
    operations: ['Insert', 'Search', 'Delete', 'Hash Function'],
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1000',
    route: '/hashing'
  },
  {
    title: 'Graph Algorithms',
    description: 'Visualize and understand graph-based algorithms',
    operations: ['Topological Sort', 'DFS', 'BFS', 'Shortest Path'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1000',
    route: '/graph'
  }
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Navigation */}
      <nav className="bg-gray-900/50 backdrop-blur-sm fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center">
              <Brain className="h-8 w-8 text-purple-500" />
              <span className="ml-2 text-xl font-bold text-white">Neural Knights</span>
            </Link>
            
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/" className="text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                <Link to="/about" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</Link>
              </div>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" className="text-white block px-3 py-2 rounded-md text-base font-medium">Home</Link>
              <Link to="/about" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">About</Link>
              <Link to="/contact" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Contact</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Data Structure Visualizations
              </h1>
              <p className="text-gray-300 text-lg">
                Interactive visualizations to help you understand data structures and algorithms
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {dataStructures.map((ds, index) => (
                <div key={index} onClick={() => navigate(ds.route)} className="cursor-pointer">
                  <ADTCard {...ds} />
                </div>
              ))}
            </div>
          </main>
        } />
        <Route path='/about' element={<Profile/>}></Route>
        <Route path="/array/*" element={<ArrayVisualizer />} />
        <Route path="/stack" element={<StackVisualizer />} />
        <Route path="/queue" element={<QueueVisualizer />} />
        <Route path="/dp-problems/*" element={<DPProblems />} />
        <Route path="/hashing" element={<OpenHashing />} />
        <Route path="/graph/*" element={<Graph />} />
      </Routes>
    </div>
  );
}

export default App;