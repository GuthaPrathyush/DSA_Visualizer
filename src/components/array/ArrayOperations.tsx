import React, { useState, useContext } from 'react';
import { WebsiteContext } from '../../context/WebsiteContext';

export const ArrayOperations: React.FC = () => {
  const context = useContext(WebsiteContext);
  const [insertValue, setInsertValue] = useState<number>(0);
  const [insertIndex, setInsertIndex] = useState<number>(0);
  const [deleteIndex, setDeleteIndex] = useState<number>(0);

  if (!context) return null;

  const { array, insertElement, deleteElement } = context;
  const MAX_ARRAY_SIZE = 12;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Array Operations</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Insert Operation */}
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-700">Insert Element</h4>
          <div className="flex gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Value</label>
              <input
                type="number"
                value={insertValue}
                onChange={(e) => setInsertValue(Number(e.target.value))}
                className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Index</label>
              <input
                type="number"
                value={insertIndex}
                onChange={(e) => setInsertIndex(Number(e.target.value))}
                min={0}
                max={array.length}
                className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button
              onClick={() => insertElement(insertValue, insertIndex)}
              disabled={array.length >= MAX_ARRAY_SIZE}
              className="self-end px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Insert
            </button>
          </div>
          <p className="text-sm text-gray-500">
            Array size: {array.length}/{MAX_ARRAY_SIZE}
          </p>
        </div>

        {/* Delete Operation */}
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-700">Delete Element</h4>
          <div className="flex gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Index</label>
              <input
                type="number"
                value={deleteIndex}
                onChange={(e) => setDeleteIndex(Number(e.target.value))}
                min={0}
                max={array.length - 1}
                className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button
              onClick={() => deleteElement(deleteIndex)}
              disabled={array.length === 0}
              className="self-end px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Current Array Display */}
      <div className="mt-6">
        <h4 className="font-semibold text-gray-700 mb-2">Current Array</h4>
        <div className="flex gap-2 flex-wrap">
          {array.map((value, index) => (
            <div
              key={index}
              className="px-3 py-1 bg-gray-100 rounded-md border border-gray-300 text-sm"
            >
              {value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};