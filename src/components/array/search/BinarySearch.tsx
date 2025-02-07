import React, { useEffect, useRef, useState, useContext } from 'react';
import { WebsiteContext } from '../../../context/WebsiteContext';
import Template from '../../Template';
import algorithmData from '../../../data/algorithms.json';

const timeDelay = 1000;
const rect = {
  width: 60,
  height: 40
};

export const BinarySearch: React.FC = () => {
  const context = useContext(WebsiteContext);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [searchKey, setSearchKey] = useState<number>(0);
  const [isSearching, setIsSearching] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [foundIndex, setFoundIndex] = useState<number>(-1);

  if (!context) return null;
  const { array } = context;
  const [leftIndex, setLeftIndex] = useState<number>(-1);
  const [rightIndex, setRightIndex] = useState<number>(array.length-1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      if (!ctx) return;

      // Clear canvas
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw array elements
      array.forEach((e, i) => {
        // Background rectangle
        if (i === foundIndex) {
          // Found element
          ctx.fillStyle = "#86EFAC"; // green-300
        } else if (i === currentIndex) {
          // Current middle element
          ctx.fillStyle = "#FDE68A"; // yellow-200
        } else if (i >= leftIndex && i <= rightIndex) {
          // Current search range
          ctx.fillStyle = "#E5E7EB"; // gray-200
        } else {
          // Eliminated range
          ctx.fillStyle = "#FCA5A5"; // red-300
        }
        
        // Draw element box
        ctx.fillRect(i * rect.width + i * 20 + 40, canvas.height/2 - rect.height/2, rect.width, rect.height);
        ctx.strokeStyle = "#4B5563"; // gray-600
        ctx.lineWidth = 2;
        ctx.strokeRect(i * rect.width + i * 20 + 40, canvas.height/2 - rect.height/2, rect.width, rect.height);
        
        // Draw element value
        ctx.fillStyle = "#1F2937"; // gray-800
        ctx.font = 'bold 16px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText(
          `${e}`,
          i * rect.width + i * 20 + 40 + rect.width/2,
          canvas.height/2 + 6
        );

        // Draw index
        ctx.fillStyle = "#6B7280"; // gray-500
        ctx.font = '14px system-ui';
        ctx.fillText(
          `${i}`,
          i * rect.width + i * 20 + 40 + rect.width/2,
          canvas.height/2 + rect.height + 20
        );
      });

      // Draw legend
      const legends = [
        { color: "#E5E7EB", text: "Search Range" },
        { color: "#FDE68A", text: "Middle" },
        { color: "#FCA5A5", text: "Eliminated" },
        { color: "#86EFAC", text: "Found" }
      ];

      legends.forEach((legend, i) => {
        // Legend box
        ctx.fillStyle = legend.color;
        ctx.fillRect(40 + i * 150, 30, 20, 20);
        ctx.strokeStyle = "#4B5563";
        ctx.strokeRect(40 + i * 150, 30, 20, 20);
        
        // Legend text
        ctx.fillStyle = "#1F2937";
        ctx.font = '14px system-ui';
        ctx.textAlign = 'left';
        ctx.fillText(legend.text, 70 + i * 150, 45);
      });

      // Draw indices information
      ctx.fillStyle = "#1F2937";
      ctx.font = 'bold 14px system-ui';
      ctx.textAlign = 'center';
      const info = `Left: ${leftIndex}, Right: ${rightIndex}, Mid: ${currentIndex}`;
      ctx.fillText(info, canvas.width / 2, canvas.height - 20);
    };

    animate();
  }, [array, currentIndex, foundIndex, leftIndex, rightIndex]);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const handleSearch = async () => {
    if (isSearching) return;
    setIsSearching(true);
    setFoundIndex(-1);

    let left = 0;
    let right = array.length - 1;
    setLeftIndex(left);
    setRightIndex(right);

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      setCurrentIndex(mid);
      await sleep(timeDelay);

      if (array[mid] === searchKey) {
        setFoundIndex(mid);
        setLeftIndex(-1);
        setRightIndex(array.length);
        setIsSearching(false);
        return;
      }

      if (array[mid] < searchKey) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }

      setLeftIndex(left);
      setRightIndex(right);
    }

    // Element not found
    alert("Element not found");
    setCurrentIndex(-1);
    setLeftIndex(-1);
    setRightIndex(-1);
    setIsSearching(false);
  };

  return (
    <Template {...algorithmData.binarySearch}>
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Binary Search Visualization</h2>
        
        <div className="bg-white p-4 rounded-lg mb-6">
          <canvas
            ref={canvasRef}
            width={1000}
            height={300}
            className="mx-auto border border-gray-200 rounded-lg"
          />
        </div>

        <div className="flex justify-center items-center gap-4">
          <input
            type="number"
            value={searchKey}
            onChange={(e) => setSearchKey(Number(e.target.value))}
            placeholder="Search for..."
            className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleSearch}
            disabled={isSearching}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>
    </Template>
  );
};