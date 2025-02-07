import React, { useEffect, useRef, useContext, useState } from 'react';
import { WebsiteContext } from '../../context/WebsiteContext';
import Template from '../Template';
import algorithmData from '../../data/algorithms.json';

const STACK_WIDTH = 300;
const RECT = {
  width: 260,
  height: 40
};
const BOTTOM_PADDING = 50; // Added padding for the STACK label

export const StackVisualizer: React.FC = () => {
  const context = useContext(WebsiteContext);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pushValue, setPushValue] = useState<number>(0);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  if (!context) return null;
  const { stack, pushToStack, popFromStack, peekStack } = context;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      // Clear canvas
      ctx.fillStyle = '#f3f4f6'; // gray-100
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Calculate stack position (centered)
      const stackX = (canvas.width - STACK_WIDTH) / 2;

      // Draw stack container
      ctx.fillStyle = '#1f2937'; // gray-800
      ctx.fillRect(stackX, 0, STACK_WIDTH, canvas.height);
      
      // Draw base line
      ctx.fillStyle = 'white';
      ctx.fillRect(
        stackX,
        canvas.height - BOTTOM_PADDING + RECT.height / 2,
        STACK_WIDTH,
        2
      );
      
      // Draw STACK label
      ctx.font = 'bold 18px system-ui';
      ctx.textAlign = 'center';
      ctx.fillStyle = 'white';
      ctx.fillText(
        "STACK",
        stackX + STACK_WIDTH / 2,
        canvas.height - BOTTOM_PADDING / 3
      );

      // Draw stack elements
      stack.forEach((e, i) => {
        const isTop = i === stack.length - 1;
        const isHighlighted = i === highlightedIndex;
        
        // Enhanced colors for better contrast
        ctx.fillStyle = isHighlighted ? "#f87171" : // red-400
                       isTop ? "#34d399" : // emerald-400
                       "#f8fafc"; // slate-50

        const h = canvas.height - BOTTOM_PADDING - RECT.height - i*(RECT.height + 10); // Adjusted for bottom padding
        ctx.fillRect(
          stackX + (STACK_WIDTH - RECT.width) / 2,
          h,
          RECT.width,
          RECT.height
        );
        
        // Add border to elements
        ctx.strokeStyle = '#475569'; // slate-600
        ctx.lineWidth = 2;
        ctx.strokeRect(
          stackX + (STACK_WIDTH - RECT.width) / 2,
          h,
          RECT.width,
          RECT.height
        );
        
        // Draw element value with enhanced contrast
        ctx.fillStyle = isHighlighted ? "#ffffff" : // white for highlighted
                       isTop ? "#064e3b" : // emerald-900 for top
                       "#1e293b"; // slate-800 for others
        ctx.font = 'bold 20px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText(
          `${e}`,
          stackX + STACK_WIDTH / 2,
          h + RECT.height/2 + 7
        );
      });
    };

    animate();
  }, [stack, highlightedIndex]);

  const handlePush = () => {
    pushToStack(pushValue);
    setPushValue(0);
  };

  const handlePeek = () => {
    const peekedValue = peekStack();
    if (peekedValue !== null) {
      setHighlightedIndex(stack.length - 1);
      setTimeout(() => setHighlightedIndex(null), 1000);
    }
  };

  return (
    <Template {...algorithmData.stack}>
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Stack Visualization</h2>
        
        <div className="bg-white p-4 rounded-lg mb-6">
          <canvas
            ref={canvasRef}
            width={1000}
            height={500}
            className="mx-auto border border-gray-200 rounded-lg bg-gray-100"
          />
        </div>

        <div className="flex justify-center items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-emerald-400 border border-emerald-600"></div>
            <span className="text-gray-600 font-medium">Top Element</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="number"
              value={pushValue}
              onChange={(e) => setPushValue(Number(e.target.value))}
              className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Value"
            />
            <button
              onClick={handlePush}
              className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              PUSH
            </button>
          </div>

          <button
            onClick={popFromStack}
            className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            POP
          </button>

          <button
            onClick={handlePeek}
            className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            PEEK
          </button>
        </div>
      </div>
    </Template>
  );
};