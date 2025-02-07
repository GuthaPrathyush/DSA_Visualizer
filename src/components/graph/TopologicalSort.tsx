import React, { useEffect, useRef, useState } from 'react';
import Template from '../Template';

import algorithmData from '../../data/algorithms.json';

const COLORS = {
  background: '#f3f4f6', // gray-100
  node: {
    fill: '#3b82f6', // blue-500
    active: '#ef4444', // red-500
    text: '#ffffff', // white
    processed: '#10b981', // emerald-500
  },
  edge: {
    primary: '#1f2937', // gray-800
    secondary: '#ec4899', // pink-500
    highlight: '#8b5cf6', // violet-500
  },
  stack: {
    background: '#10b981', // emerald-500
    item: {
      background: '#1f2937', // gray-800
      text: '#ffffff', // white
      border: '#ffffff', // white
    }
  }
};

const CANVAS_CONFIG = {
  width: 1000,
  height: 600,
  nodeSize: 22,
  spacing: 15,
  stackWidth: 120,
  stackMargin: 20,
  stackItemHeight: 60
};

interface Node {
  id: number;
  label: string;
  processed: boolean;
  position: number; // Random position for x-coordinate
}

export const TopologicalSort: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<number[][]>([]);
  const [sortedNodes, setSortedNodes] = useState<number[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const generateRandomEdges = (size: number) => {
    const edges: number[][] = Array(size).fill(0).map(() => Array(size).fill(0));
    let count = 0;
    const limit = 20;

    // Generate random edges ensuring DAG property (only forward edges)
    for (let i = 0; i < size; i++) {
      if (count >= limit) break;
      for (let j = i + 1; j < size; j++) {
        if (count >= limit) break;
        if (Math.random() < 0.5) { // 50% chance of edge
          edges[i][j] = Math.floor(Math.random() * 49) + 1; // Random weight 1-50
          count++;
        }
      }
    }

    return edges;
  };

  const initializeGraph = () => {
    const size = 5;
    // Initialize nodes with random positions
    const initialNodes = ['a', 'b', 'c', 'd', 'e'].map((label, id) => ({
      id,
      label,
      processed: false,
      position: Math.floor(Math.random() * (size - 1)) + 1
    }));
    setNodes(initialNodes);

    // Generate random edges
    const initialEdges = generateRandomEdges(size);
    setEdges(initialEdges);
  };

  useEffect(() => {
    initializeGraph();
  }, []);

  useEffect(() => {
    if (nodes.length > 0) {
      drawGraph();
    }
  }, [nodes, edges, sortedNodes]);

  const drawGraph = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = COLORS.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw stack first
    drawStack(ctx);

    // Calculate available space for graph
    const graphStartX = CANVAS_CONFIG.stackWidth + CANVAS_CONFIG.stackMargin;
    const graphWidth = canvas.width - graphStartX;

    // Draw edges first
    edges.forEach((row, i) => {
      row.forEach((weight, j) => {
        if (weight > 0) {
          drawEdge(ctx, i, j, graphStartX, graphWidth, weight);
        }
      });
    });

    // Draw nodes on top
    nodes.forEach((node) => {
      if (!node.processed) {
        drawNode(ctx, node, graphStartX, graphWidth);
      }
    });
  };

  const drawNode = (ctx: CanvasRenderingContext2D, node: Node, startX: number, graphWidth: number) => {
    const dx = graphWidth / nodes.length;
    const dy = CANVAS_CONFIG.height / nodes.length;
    
    const x = startX + node.position * dx + CANVAS_CONFIG.nodeSize;
    const y = node.id * dy + CANVAS_CONFIG.nodeSize * 2;

    // Draw circle
    ctx.beginPath();
    ctx.fillStyle = node.processed ? COLORS.node.processed : COLORS.node.fill;
    ctx.arc(x, y, CANVAS_CONFIG.nodeSize, 0, Math.PI * 2);
    ctx.fill();

    // Draw label
    ctx.fillStyle = COLORS.node.text;
    ctx.font = 'bold 20px ubuntu';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(node.label.toUpperCase(), x, y);
  };

  const drawEdge = (
    ctx: CanvasRenderingContext2D,
    from: number,
    to: number,
    startX: number,
    graphWidth: number,
    weight: number
  ) => {
    const fromNode = nodes[from];
    const toNode = nodes[to];
    const dx = graphWidth / nodes.length;
    const dy = CANVAS_CONFIG.height / nodes.length;

    const x1 = startX + fromNode.position * dx + CANVAS_CONFIG.nodeSize;
    const y1 = from * dy + CANVAS_CONFIG.nodeSize * 2;
    const x2 = startX + toNode.position * dx + CANVAS_CONFIG.nodeSize;
    const y2 = to * dy + CANVAS_CONFIG.nodeSize * 2;

    // Draw main edge
    ctx.beginPath();
    ctx.strokeStyle = COLORS.edge.primary;
    ctx.lineWidth = 10;
    ctx.moveTo(x1, y1);
    
    // Draw curved edge
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    ctx.lineTo(midX, midY);
    ctx.stroke();

    // Draw second part of the edge
    ctx.beginPath();
    ctx.strokeStyle = COLORS.edge.secondary;
    ctx.lineWidth = 3;
    ctx.moveTo(midX, midY);
    ctx.lineTo(x2, y2);
    
    // Draw arrow
    const angle = Math.atan2(y2 - midY, x2 - midX);
    const arrowLength = 10;
    ctx.lineTo(x2 - arrowLength * Math.cos(angle - Math.PI / 6),
               y2 - arrowLength * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - arrowLength * Math.cos(angle + Math.PI / 6),
               y2 - arrowLength * Math.sin(angle + Math.PI / 6));
    ctx.stroke();
  };

  const drawStack = (ctx: CanvasRenderingContext2D) => {
    // Draw stack container
    ctx.fillStyle = COLORS.stack.background;
    ctx.fillRect(0, 0, CANVAS_CONFIG.stackWidth, CANVAS_CONFIG.height);

    // Draw stack items
    sortedNodes.forEach((nodeId, index) => {
      const y = CANVAS_CONFIG.height - (index + 1) * CANVAS_CONFIG.stackItemHeight;
      
      // Draw item background
      ctx.fillStyle = COLORS.stack.item.background;
      ctx.fillRect(0, y, CANVAS_CONFIG.stackWidth, CANVAS_CONFIG.stackItemHeight);
      
      // Draw border
      ctx.strokeStyle = COLORS.stack.item.border;
      ctx.strokeRect(0, y, CANVAS_CONFIG.stackWidth, CANVAS_CONFIG.stackItemHeight);
      
      // Draw text
      ctx.fillStyle = COLORS.stack.item.text;
      ctx.font = 'bold 20px ubuntu';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(
        nodes[nodeId].label.toUpperCase(),
        CANVAS_CONFIG.stackWidth / 2,
        y + CANVAS_CONFIG.stackItemHeight / 2
      );
    });
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const isIndependent = (nodeId: number): boolean => {
    return edges.every((row, i) => row[nodeId] === 0);
  };

  const topologicalSort = async () => {
    if (isRunning) return;
    setIsRunning(true);

    const remainingNodes = nodes.map(node => node.id);
    const sorted: number[] = [];

    while (remainingNodes.length > 0) {
      const independentNode = remainingNodes.find(nodeId => isIndependent(nodeId));
      
      if (independentNode === undefined) {
        alert('Cycle detected in graph!');
        setIsRunning(false);
        return;
      }

      // Add to sorted list
      sorted.push(independentNode);
      setSortedNodes([...sorted]);

      // Mark node as processed
      const updatedNodes = nodes.map(node => 
        node.id === independentNode ? { ...node, processed: true } : node
      );
      setNodes(updatedNodes);

      // Remove edges from this node
      const newEdges = edges.map(row => [...row]);
      remainingNodes.forEach(i => {
        newEdges[independentNode][i] = 0;
      });
      setEdges(newEdges);

      // Remove from remaining nodes
      const index = remainingNodes.indexOf(independentNode);
      remainingNodes.splice(index, 1);

      await sleep(1000);
    }

    setIsRunning(false);
  };

  const handleReset = () => {
    if (!isRunning) {
      setSortedNodes([]);
      initializeGraph();
    }
  };

  return (
    <Template {...algorithmData.topologicalSort}>
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Topological Sort Visualization
          </h2>
          <div className="flex gap-4">
            <button
              onClick={handleReset}
              disabled={isRunning}
              className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 
                       focus:outline-none focus:ring-2 focus:ring-gray-500 
                       disabled:opacity-50 transition-colors"
            >
              New Random Graph
            </button>
            <button
              onClick={topologicalSort}
              disabled={isRunning}
              className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 
                       focus:outline-none focus:ring-2 focus:ring-purple-500 
                       disabled:opacity-50 transition-colors"
            >
              {isRunning ? 'Sorting...' : 'Start Sort'}
            </button>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg">
          <canvas
            ref={canvasRef}
            width={CANVAS_CONFIG.width}
            height={CANVAS_CONFIG.height}
            className="mx-auto border border-gray-200 rounded-lg"
          />
        </div>
      </div>
    </Template>
  );
};