import React, { useEffect, useRef, useState } from 'react';
import Template from '../Template';
import algorithmData from '../../data/algorithms.json';

const COLORS = {
  background: '#f3f4f6', // gray-100
  node: {
    default: '#4b5563', // gray-600
    active: '#ef4444', // red-500
    visited: '#10b981', // emerald-500
    current: '#f59e0b', // amber-500
    text: '#ffffff'  // white
  },
  edge: {
    default: '#1f2937', // gray-800
    highlight: '#8b5cf6', // violet-500
    text: '#1f2937' // gray-800
  },
  distance: {
    box: '#1f2937', // gray-800
    text: '#ffffff', // white
    infinity: '#ef4444' // red-500
  }
};

const CANVAS_CONFIG = {
  width: 1000,
  height: 600,
  nodeRadius: 25,
  spacing: 20,
  distanceBoxWidth: 80,
  distanceBoxHeight: 40,
  distanceBoxStartX: 300,
  timeDelay: 1000
};

interface Node {
  id: number;
  label: string;
  position: number;
  distance: number;
  state: 'default' | 'active' | 'visited' | 'current';
}

interface Edge {
  from: number;
  to: number;
  weight: number;
  isHighlighted: boolean;
}

export const Dijkstra: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentNode, setCurrentNode] = useState<number>(-1);

  const generateRandomGraph = () => {
    const size = 5;
    const newNodes: Node[] = Array.from({ length: size }, (_, i) => ({
      id: i,
      label: String.fromCharCode(97 + i), // a, b, c, d, e
      position: Math.floor(Math.random() * (size - 1)) + 1,
      distance: i === 0 ? 0 : Infinity,
      state: i === 0 ? 'current' : 'default'
    }));

    const newEdges: Edge[] = [];
    let edgeCount = 0;
    const maxEdges = 8;

    // Generate random edges ensuring connectivity
    for (let i = 0; i < size && edgeCount < maxEdges; i++) {
      for (let j = i + 1; j < size && edgeCount < maxEdges; j++) {
        if (Math.random() < 0.6 || i === j - 1) { // Ensure minimum connectivity
          const weight = Math.floor(Math.random() * 20) + 1;
          newEdges.push({
            from: i,
            to: j,
            weight,
            isHighlighted: false
          });
          edgeCount++;
        }
      }
    }

    setNodes(newNodes);
    setEdges(newEdges);
    setCurrentNode(0);
  };

  useEffect(() => {
    generateRandomGraph();
  }, []);

  useEffect(() => {
    if (nodes.length > 0) {
      drawGraph();
    }
  }, [nodes, edges, currentNode]);

  const drawGraph = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = COLORS.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw edges
    edges.forEach(edge => drawEdge(ctx, edge));

    // Draw nodes
    nodes.forEach(node => drawNode(ctx, node));

    // Draw distance boxes
    drawDistanceBoxes(ctx);
  };

  const drawNode = (ctx: CanvasRenderingContext2D, node: Node) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dx = canvas.width / (nodes.length + 1);
    const dy = canvas.height / (nodes.length + 1);
    const x = node.position * dx;
    const y = node.id * dy + dy;

    // Draw node circle
    ctx.beginPath();
    ctx.fillStyle = COLORS.node[node.state];
    ctx.arc(x, y, CANVAS_CONFIG.nodeRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = COLORS.node.text;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw node label
    ctx.fillStyle = COLORS.node.text;
    ctx.font = 'bold 20px system-ui';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(node.label.toUpperCase(), x, y);
  };

  const drawEdge = (ctx: CanvasRenderingContext2D, edge: Edge) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dx = canvas.width / (nodes.length + 1);
    const dy = canvas.height / (nodes.length + 1);
    
    const fromNode = nodes[edge.from];
    const toNode = nodes[edge.to];
    
    const x1 = fromNode.position * dx;
    const y1 = fromNode.id * dy + dy;
    const x2 = toNode.position * dx;
    const y2 = toNode.id * dy + dy;

    // Calculate angle for arrow
    const angle = Math.atan2(y2 - y1, x2 - x1);
    
    // Draw edge line
    ctx.beginPath();
    ctx.strokeStyle = edge.isHighlighted ? COLORS.edge.highlight : COLORS.edge.default;
    ctx.lineWidth = edge.isHighlighted ? 4 : 2;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    // Draw weight
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    ctx.fillStyle = COLORS.edge.text;
    ctx.font = 'bold 16px system-ui';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(edge.weight.toString(), midX, midY - 10);
  };

  const drawDistanceBoxes = (ctx: CanvasRenderingContext2D) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    nodes.forEach((node, i) => {
      const x = CANVAS_CONFIG.distanceBoxStartX + i * (CANVAS_CONFIG.distanceBoxWidth + 10);
      const y = canvas.height - CANVAS_CONFIG.distanceBoxHeight - 20;

      // Draw box
      ctx.fillStyle = COLORS.distance.box;
      ctx.fillRect(x, y, CANVAS_CONFIG.distanceBoxWidth, CANVAS_CONFIG.distanceBoxHeight);

      // Draw distance value
      ctx.fillStyle = node.distance === Infinity ? COLORS.distance.infinity : COLORS.distance.text;
      ctx.font = 'bold 16px system-ui';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const displayValue = node.distance === Infinity ? '∞' : node.distance.toString();
      ctx.fillText(displayValue, x + CANVAS_CONFIG.distanceBoxWidth / 2, y + CANVAS_CONFIG.distanceBoxHeight / 2);

      // Draw node label below
      ctx.fillStyle = COLORS.edge.text;
      ctx.font = '14px system-ui';
      ctx.fillText(node.label.toUpperCase(), x + CANVAS_CONFIG.distanceBoxWidth / 2, y + CANVAS_CONFIG.distanceBoxHeight + 15);
    });
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const runDijkstra = async () => {
    if (isRunning) return;
    setIsRunning(true);

    const unvisited = new Set(nodes.map(n => n.id));
    
    while (unvisited.size > 0) {
      // Find node with minimum distance
      let minDistance = Infinity;
      let minNode = -1;
      
      unvisited.forEach(id => {
        if (nodes[id].distance < minDistance) {
          minDistance = nodes[id].distance;
          minNode = id;
        }
      });

      if (minNode === -1) break;

      // Update current node state
      const updatedNodes = [...nodes];
      updatedNodes[minNode].state = 'visited';
      setNodes(updatedNodes);
      setCurrentNode(minNode);
      
      // Process neighbors
      const currentEdges = edges.filter(e => e.from === minNode || e.to === minNode);
      
      for (const edge of currentEdges) {
        const neighborId = edge.from === minNode ? edge.to : edge.from;
        if (!unvisited.has(neighborId)) continue;

        const newDistance = nodes[minNode].distance + edge.weight;
        
        if (newDistance < nodes[neighborId].distance) {
          // Highlight the edge being considered
          const updatedEdges = edges.map(e => ({
            ...e,
            isHighlighted: e === edge
          }));
          setEdges(updatedEdges);

          // Update distance
          updatedNodes[neighborId] = {
            ...updatedNodes[neighborId],
            distance: newDistance,
            state: 'active'
          };
          setNodes(updatedNodes);
          
          await sleep(CANVAS_CONFIG.timeDelay);
        }
      }

      unvisited.delete(minNode);
      await sleep(CANVAS_CONFIG.timeDelay);
    }

    setIsRunning(false);
  };

  const resetGraph = () => {
    if (!isRunning) {
      generateRandomGraph();
    }
  };

  return (
    <Template {...algorithmData.dijkstra}>
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Dijkstra's Algorithm Visualization
          </h2>
          <div className="flex gap-4">
            <button
              onClick={resetGraph}
              disabled={isRunning}
              className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 
                       focus:outline-none focus:ring-2 focus:ring-gray-500 
                       disabled:opacity-50 transition-colors"
            >
              New Random Graph
            </button>
            <button
              onClick={runDijkstra}
              disabled={isRunning}
              className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 
                       focus:outline-none focus:ring-2 focus:ring-purple-500 
                       disabled:opacity-50 transition-colors"
            >
              {isRunning ? 'Running...' : 'Start Dijkstra'}
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

        <div className="mt-4 flex justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gray-600"></div>
            <span className="text-sm text-gray-600">Unvisited</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-amber-500"></div>
            <span className="text-sm text-gray-600">Current</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
            <span className="text-sm text-gray-600">Active</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
            <span className="text-sm text-gray-600">Visited</span>
          </div>
        </div>
      </div>
    </Template>
  );
};