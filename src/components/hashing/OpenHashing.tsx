import React, { useEffect, useRef, useState } from 'react';
import Template from '../Template';
import algorithmData from '../../data/algorithms.json';

const COLORS = {
  background: '#f3f4f6', // gray-100
  header: '#fbbf24', // yellow-400
  cell: '#1f2937', // gray-800
  currentCell: '#6b7280', // gray-500
  text: '#ffffff',
  border: '#ffffff',
  hashFunction: '#34d399' // emerald-400
};

const CANVAS_CONFIG = {
  width: 1000,
  height: 550,
  size: 10,
  timeDelay: 1000
};

type HashTable = Array<number[]>;

export const OpenHashing: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [array, setArray] = useState<number[]>([]);
  const [hashTable, setHashTable] = useState<HashTable>(Array(CANVAS_CONFIG.size).fill(null).map(() => []));
  const [currentPos, setCurrentPos] = useState<number>(-1);
  const [isHashing, setIsHashing] = useState(false);

  useEffect(() => {
    initializeArray();
  }, []);

  useEffect(() => {
    if (array.length > 0) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Clear the entire canvas
      ctx.fillStyle = COLORS.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw both the array and hash table
      drawArray();
      drawHashTable();
    }
  }, [array, currentPos, hashTable]);

  const initializeArray = () => {
    const newArray = Array.from({ length: CANVAS_CONFIG.size }, () => 
      Math.floor(Math.random() * 21)
    );
    setArray(newArray);
  };

  const drawArray = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pw = canvas.width / CANVAS_CONFIG.size;
    const height = 50;
    const y = canvas.height - height;

    for (let i = 0; i < CANVAS_CONFIG.size; i++) {
      ctx.beginPath();
      ctx.fillStyle = i === currentPos ? COLORS.currentCell : COLORS.cell;
      ctx.fillRect(i * pw, y, pw, height);
      ctx.strokeStyle = COLORS.border;
      ctx.strokeRect(i * pw, y, pw, height);
      ctx.fillStyle = COLORS.text;
      ctx.font = "bold 15px system-ui";
      ctx.textAlign = "center";
      ctx.fillText(array[i].toString(), i * pw + pw / 2, y + height / 2);
      ctx.closePath();
    }
  };

  const drawHashTable = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const ph = (canvas.height - 100) / CANVAS_CONFIG.size;
    const width = 100;

    // Draw hash table slots
    for (let i = 0; i < CANVAS_CONFIG.size; i++) {
      // Draw index cell
      ctx.beginPath();
      ctx.fillStyle = COLORS.header;
      ctx.fillRect(0, i * ph, width, ph);
      ctx.strokeStyle = COLORS.border;
      ctx.strokeRect(0, i * ph, width, ph);
      ctx.fillStyle = COLORS.cell;
      ctx.font = "bold 15px system-ui";
      ctx.textAlign = "center";
      ctx.fillText(i.toString(), width / 2, i * ph + ph / 2);
      ctx.closePath();

      // Draw chained elements
      hashTable[i].forEach((value, j) => {
        ctx.beginPath();
        ctx.fillStyle = COLORS.cell;
        ctx.fillRect((j + 1) * width, i * ph, width, ph);
        ctx.strokeStyle = COLORS.border;
        ctx.strokeRect((j + 1) * width, i * ph, width, ph);
        ctx.fillStyle = COLORS.text;
        ctx.font = "bold 15px system-ui";
        ctx.textAlign = "center";
        ctx.fillText(value.toString(), (j + 1) * width + width / 2, i * ph + ph / 2);
        ctx.closePath();

        // Draw arrow if not the last element
        if (j < hashTable[i].length - 1) {
          ctx.beginPath();
          ctx.strokeStyle = COLORS.text;
          ctx.moveTo((j + 1) * width + width - 10, i * ph + ph / 2);
          ctx.lineTo((j + 2) * width + 10, i * ph + ph / 2);
          ctx.stroke();
          // Draw arrowhead
          ctx.lineTo((j + 2) * width + 5, i * ph + ph / 2 - 5);
          ctx.moveTo((j + 2) * width + 10, i * ph + ph / 2);
          ctx.lineTo((j + 2) * width + 5, i * ph + ph / 2 + 5);
          ctx.stroke();
          ctx.closePath();
        }
      });
    }
  };

  const hash = async (value: number) => {
    const hashValue = value % CANVAS_CONFIG.size;
    
    // Update hash table
    const newHashTable = [...hashTable];
    newHashTable[hashValue] = [...newHashTable[hashValue], value];
    setHashTable(newHashTable);

    await sleep(CANVAS_CONFIG.timeDelay);
  };

  const handleHash = async () => {
    if (isHashing) return;
    if (currentPos >= CANVAS_CONFIG.size - 1) {
      alert("No more elements to hash");
      return;
    }

    setIsHashing(true);
    const nextPos = currentPos + 1;
    setCurrentPos(nextPos);
    await hash(array[nextPos]);
    setIsHashing(false);
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  return (
    <Template {...algorithmData.openHashing}>
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Open Hashing Visualization</h2>
        
        <div className="bg-white p-4 rounded-lg mb-6">
          <canvas
            ref={canvasRef}
            width={CANVAS_CONFIG.width}
            height={CANVAS_CONFIG.height}
            className="mx-auto border border-gray-200 rounded-lg"
          />
        </div>

        <div className="flex justify-center items-center gap-6">
          <div className="bg-gray-100 px-4 py-2 rounded-lg flex items-center gap-2">
            <span className="text-gray-700">Hash Function = </span>
            <span className="bg-emerald-400 px-3 py-1 rounded text-white font-medium">
              (x % {CANVAS_CONFIG.size})
            </span>
          </div>

          <button
            onClick={handleHash}
            disabled={isHashing || currentPos >= CANVAS_CONFIG.size - 1}
            className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
          >
            {isHashing ? 'Hashing...' : 'Hash Next'}
          </button>
        </div>
      </div>
    </Template>
  );
};