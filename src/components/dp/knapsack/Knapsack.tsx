import React, { useEffect, useRef, useContext, useState } from 'react';
import { WebsiteContext } from '../../../context/WebsiteContext';
import Template from '../../Template';
import algorithmData from '../../../data/algorithms.json';

const DELAY = 100;

// Define plain colors
const COLORS = {
  background: '#ffffff',
  header: '#4a5568',
  cell: '#718096',
  initialCell: '#48bb78',
  currentCell: '#ecc94b',
  text: '#ffffff',
  border: '#2d3748'
};

export const Knapsack: React.FC = () => {
  const context = useContext(WebsiteContext);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [targetWeight, setTargetWeight] = useState<number>(0);
  const [isCalculating, setIsCalculating] = useState(false);
  const [mem, setMem] = useState<number[][]>([]);
  const size = 10;

  if (!context) return null;
  const { knapsackWeights: w, knapsackValues: v } = context;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawInitialArrays = () => {
      const pw = canvas.width / size;
      const height = 50;
      
      // Draw Weight header
      ctx.fillStyle = COLORS.header;
      ctx.fillRect(0, canvas.height - height, pw, height);
      ctx.fillStyle = COLORS.text;
      ctx.font = "bold 15px system-ui";
      ctx.textAlign = "center";
      ctx.fillText("Weight", pw / 2 - 20, canvas.height - height / 2 + 5);
      
      // Draw Value header
      ctx.fillStyle = COLORS.header;
      ctx.fillRect(0, canvas.height - 2 * height - 1, pw, height);
      ctx.fillStyle = COLORS.text;
      ctx.font = "bold 15px system-ui";
      ctx.fillText("Value", pw / 2 - 20, canvas.height - 2 * height / 2 - 20);

      // Draw arrays
      for(let i = 0; i < size; i++) {
        // Draw weight cells
        ctx.beginPath();
        ctx.fillStyle = COLORS.cell;
        ctx.fillRect(pw * (i + 1), canvas.height - height, pw, height);
        ctx.fillStyle = COLORS.text;
        ctx.strokeStyle = COLORS.border;
        ctx.strokeRect(pw * (i + 1), canvas.height - height, pw, height);
        ctx.font = "bold 15px system-ui";
        ctx.fillText(w[i].toString(), pw * (i + 1) + pw / 2 - 20, canvas.height - height / 2 + 5);
        
        // Draw value cells
        ctx.fillStyle = COLORS.cell;
        ctx.fillRect(pw * (i + 1), canvas.height - 2 * height - 1, pw, height);
        ctx.fillStyle = COLORS.text;
        ctx.strokeStyle = COLORS.border;
        ctx.strokeRect(pw * (i + 1), canvas.height - 2 * height - 1, pw, height);
        ctx.font = "bold 15px system-ui";
        ctx.fillText(v[i].toString(), pw * (i + 1) + pw / 2 - 20, canvas.height - 2 * height / 2 - 20);
        ctx.closePath();
      }
    };

    // Clear canvas and draw initial state
    ctx.fillStyle = COLORS.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawInitialArrays();
  }, [w, v]);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const calculateKnapsack = async () => {
    if (isCalculating) return;
    if (targetWeight > 10 || targetWeight < 0) {
      alert("Please keep weight between 0 and 10");
      return;
    }

    setIsCalculating(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize memory array
    const newMem: number[][] = [];
    for(let i = 0; i < size + 1; i++) {
      let temp = Array(size + 1).fill(0);
      newMem.push(temp);
    }
    setMem(newMem);

    // Calculate dimensions for DP table visualization
    const ph = (canvas.height - 150) / (size + 2);
    const pw = (canvas.width - 100) / (size + 1);

    // Draw table structure
    for(let j = 0; j < size + 2; j++) {
      // Draw row headers
      ctx.beginPath();
      ctx.fillStyle = COLORS.header;
      ctx.fillRect(0, j * ph, 100, ph);
      ctx.strokeStyle = COLORS.border;
      ctx.strokeRect(0, j * ph, 100, ph);
      ctx.closePath();

      if(j === 0) {
        ctx.fillStyle = COLORS.text;
        ctx.font = "bold 15px system-ui";
        ctx.fillText("value/weight", 2, j * ph + ph / 2);
      } else {
        ctx.strokeRect(0, j * ph, 50, ph);
        ctx.fillStyle = COLORS.text;
        ctx.font = "bold 15px system-ui";
        ctx.fillText(v[j - 2]?.toString() || '0', 15, j * ph + ph / 2);
        ctx.fillText(w[j - 2]?.toString() || '0', 65, j * ph + ph / 2);
      }

      // Draw table cells
      for(let i = 0; i < size + 1; i++) {
        ctx.beginPath();
        if(j === 0) {
          ctx.fillStyle = COLORS.header;
        } else if(i === 0 || j === 1) {
          ctx.fillStyle = COLORS.initialCell;
        } else {
          ctx.fillStyle = COLORS.cell;
        }
        ctx.fillRect(100 + i * pw, j * ph, pw, ph);
        ctx.strokeStyle = COLORS.border;
        ctx.strokeRect(100 + i * pw, j * ph, pw, ph);
        ctx.closePath();

        if(j === 0) {
          ctx.fillStyle = COLORS.text;
          ctx.fillText(i.toString(), 100 + i * pw + pw / 2, j * ph + ph / 2);
        } else if(i === 0 || j === 1) {
          ctx.fillStyle = COLORS.text;
          ctx.fillText(newMem[j - 1][i].toString(), 100 + i * pw + pw / 2, j * ph + ph / 2);
        }
      }
    }

    // Calculate knapsack
    for(let j = 2; j < size + 2; j++) {
      for(let i = 1; i < size + 1; i++) {
        const x = j - 1;
        const y = i;
        
        // Highlight current cell
        await sleep(DELAY);
        ctx.beginPath();
        ctx.fillStyle = COLORS.currentCell;
        ctx.fillRect(100 + i * pw, j * ph, pw, ph);
        
        // Calculate value
        if(y - w[x - 1] < 0) {
          newMem[x][y] = newMem[x - 1][y];
        } else {
          newMem[x][y] = Math.max(
            newMem[x - 1][y],
            v[x - 1] + newMem[x - 1][y - w[x - 1]]
          );
        }
        
        // Display calculated value
        ctx.fillStyle = COLORS.text;
        ctx.font = "bold 20px system-ui";
        ctx.textAlign = "center";
        ctx.fillText(newMem[x][y].toString(), 100 + i * pw + pw / 2, j * ph + ph / 2);
        ctx.closePath();

        // Return to normal state
        await sleep(DELAY);
        ctx.fillStyle = COLORS.cell;
        ctx.fillRect(100 + i * pw, j * ph, pw, ph);
        ctx.strokeRect(100 + i * pw, j * ph, pw, ph);
        ctx.fillStyle = COLORS.text;
        ctx.font = "bold 15px system-ui";
        ctx.fillText(newMem[x][y].toString(), 100 + i * pw + pw / 2, j * ph + ph / 2);
        ctx.closePath();
      }
    }

    // Highlight final result
    const x = size + 1;
    const y = targetWeight;
    ctx.fillStyle = COLORS.currentCell;
    ctx.fillRect(100 + y * pw, x * ph, pw, ph);
    ctx.strokeRect(100 + y * pw, x * ph, pw, ph);
    ctx.font = 'bold 20px system-ui';
    ctx.fillStyle = COLORS.text;
    ctx.fillText(newMem[size][y].toString(), 100 + y * pw + pw / 2, x * ph + ph / 2);

    setMem(newMem);
    setIsCalculating(false);
  };

  return (
    <Template {...algorithmData.knapsack}>
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">0/1 Knapsack Visualization</h2>
        
        <div className="bg-white p-4 rounded-lg mb-6">
          <canvas
            ref={canvasRef}
            width={1000}
            height={550}
            className="mx-auto border border-gray-200 rounded-lg"
          />
        </div>

        <div className="flex justify-center items-center gap-4">
          <p>Input Capacity</p>
          <input
            type="number"
            value={targetWeight}
            onChange={(e) => setTargetWeight(Number(e.target.value))}
            min={0}
            max={10}
            className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Capacity"
          />
          <button
            onClick={calculateKnapsack}
            disabled={isCalculating}
            className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
          >
            {isCalculating ? 'Calculating...' : 'Calculate Max Profit'}
          </button>
        </div>

        {mem.length > 0 && (
          <div className="mt-4 text-center">
            <p className="text-lg font-semibold text-gray-800">
              Maximum value possible: {mem[size][targetWeight]}
            </p>
          </div>
        )}
      </div>
    </Template>
  );
};