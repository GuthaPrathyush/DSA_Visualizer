import React, { useEffect, useRef, useContext, useState } from 'react';
import { WebsiteContext } from '../../context/WebsiteContext';
import Template from '../Template';
import algorithmData from '../../data/algorithms.json';

const RECT = {
  width: 80,
  height: 60
};
const SPACING = 20;

export const QueueVisualizer: React.FC = () => {
  const context = useContext(WebsiteContext);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [enqueueValue, setEnqueueValue] = useState<number>(0);

  if (!context) return null;
  const { queue, enqueueToQueue, dequeueFromQueue } = context;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      // Clear canvas
      ctx.fillStyle = '#f3f4f6'; // gray-100
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw queue container
      const containerWidth = (RECT.width + SPACING) * 10 + SPACING;
      const containerHeight = RECT.height + SPACING * 2;
      const containerX = (canvas.width - containerWidth) / 2;
      const containerY = (canvas.height - containerHeight) / 2;

      // Draw container background
      ctx.fillStyle = '#1f2937'; // gray-800
      ctx.fillRect(containerX, containerY, containerWidth, containerHeight);

      // Draw queue elements
      queue.forEach((value, index) => {
        const isFront = index === 0;
        const isRear = index === queue.length - 1;
        
        // Calculate position
        const x = containerX + SPACING + index * (RECT.width + SPACING);
        const y = containerY + SPACING;

        // Draw element background
        ctx.fillStyle = isFront ? '#60a5fa' : // blue-400 for front
                       isRear ? '#34d399' : // emerald-400 for rear
                       '#f8fafc'; // slate-50 for others
        ctx.fillRect(x, y, RECT.width, RECT.height);
        
        // Add border
        ctx.strokeStyle = '#475569'; // slate-600
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, RECT.width, RECT.height);

        // Draw value
        ctx.fillStyle = isFront || isRear ? '#1e293b' : '#374151'; // slate-800/700
        ctx.font = 'bold 20px system-ui';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(
          `${value}`,
          x + RECT.width / 2,
          y + RECT.height / 2
        );

        // Draw labels (FRONT/REAR)
        if (isFront || isRear) {
          ctx.font = 'bold 14px system-ui';
          ctx.fillStyle = isFront ? '#60a5fa' : '#34d399';
          ctx.fillText(
            isFront ? 'FRONT' : 'REAR',
            x + RECT.width / 2,
            y - 10
          );
        }
      });

      // Draw empty slots
      for (let i = queue.length; i < 10; i++) {
        const x = containerX + SPACING + i * (RECT.width + SPACING);
        const y = containerY + SPACING;
        
        ctx.strokeStyle = '#94a3b8'; // slate-400
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(x, y, RECT.width, RECT.height);
        ctx.setLineDash([]);
      }
    };

    animate();
  }, [queue]);

  const handleEnqueue = () => {
    enqueueToQueue(enqueueValue);
    setEnqueueValue(0);
  };

  return (
    <Template {...algorithmData.queue}>
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Queue Visualization</h2>
        
        <div className="bg-white p-4 rounded-lg mb-6">
          <canvas
            ref={canvasRef}
            width={1000}
            height={300}
            className="mx-auto border border-gray-200 rounded-lg bg-gray-100"
          />
        </div>

        <div className="flex justify-center items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-blue-400 border border-blue-600"></div>
              <span className="text-gray-600 font-medium">Front</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-emerald-400 border border-emerald-600"></div>
              <span className="text-gray-600 font-medium">Rear</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="number"
              value={enqueueValue}
              onChange={(e) => setEnqueueValue(Number(e.target.value))}
              className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Value"
            />
            <button
              onClick={handleEnqueue}
              className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              ENQUEUE
            </button>
          </div>

          <button
            onClick={dequeueFromQueue}
            className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            DEQUEUE
          </button>
        </div>
      </div>
    </Template>
  );
};