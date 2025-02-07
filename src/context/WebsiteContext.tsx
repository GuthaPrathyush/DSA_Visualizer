import { createContext, useState, ReactNode } from 'react';

interface WebsiteContextType {
  array: number[];
  stack: number[];
  queue: number[];
  knapsackWeights: number[];
  knapsackValues: number[];
  rodLengths: number[];
  rodPrices: number[];
  setArray: (value: number[]) => void;
  insertElement: (value: number, index: number) => void;
  deleteElement: (index: number) => void;
  pushToStack: (value: number) => void;
  popFromStack: () => void;
  peekStack: () => number | null;
  enqueueToQueue: (value: number) => void;
  dequeueFromQueue: () => void;
}

export const WebsiteContext = createContext<WebsiteContextType | null>(null);

type WebsiteContextProviderProps = {
  children: ReactNode;
};

const initialArray = Array.from({ length: 12 }, (_, i) => i * 5 + 5);
const initialKnapsackWeights = [2, 3, 4, 5, 1, 2, 3, 4, 2, 1];
const initialKnapsackValues = [12, 23, 34, 45, 15, 25, 30, 40, 20, 10];
const initialRodLengths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const initialRodPrices = [1, 5, 8, 9, 10, 17, 17, 20, 24, 30];

export function WebsiteContextProvider({ children }: WebsiteContextProviderProps) {
  const [array, setArray] = useState<number[]>(initialArray);
  const [stack, setStack] = useState<number[]>([]);
  const [queue, setQueue] = useState<number[]>([]);
  const [knapsackWeights] = useState<number[]>(initialKnapsackWeights);
  const [knapsackValues] = useState<number[]>(initialKnapsackValues);
  const [rodLengths] = useState<number[]>(initialRodLengths);
  const [rodPrices] = useState<number[]>(initialRodPrices);

  const insertElement = (value: number, index: number) => {
    if (index < 0 || index > array.length) {
      alert("Invalid index!");
      return;
    }
    const newArray = [...array.slice(0, index), value, ...array.slice(index)];
    if (newArray.length > 12) {
      alert("Array size limit reached!");
      return;
    }
    setArray(newArray);
  };

  const deleteElement = (index: number) => {
    if (index < 0 || index >= array.length) {
      alert("Invalid index!");
      return;
    }
    const newArray = [...array.slice(0, index), ...array.slice(index + 1)];
    setArray(newArray);
  };

  const pushToStack = (value: number) => {
    if (stack.length === 10) {
      alert("Stack overflow");
      return;
    }
    setStack([...stack, value]);
  };

  const popFromStack = () => {
    if (stack.length === 0) {
      alert("Stack is empty");
      return;
    }
    const newStack = [...stack];
    newStack.pop();
    setStack(newStack);
  };

  const peekStack = () => {
    if (stack.length === 0) {
      alert("Stack is empty");
      return null;
    }
    return stack[stack.length - 1];
  };

  const enqueueToQueue = (value: number) => {
    if (queue.length === 10) {
      alert("Queue is full");
      return;
    }
    setQueue([...queue, value]);
  };

  const dequeueFromQueue = () => {
    if (queue.length === 0) {
      alert("Queue is empty");
      return;
    }
    const newQueue = [...queue];
    newQueue.shift();
    setQueue(newQueue);
  };

  const contextValue: WebsiteContextType = {
    array,
    stack,
    queue,
    knapsackWeights,
    knapsackValues,
    rodLengths,
    rodPrices,
    setArray,
    insertElement,
    deleteElement,
    pushToStack,
    popFromStack,
    peekStack,
    enqueueToQueue,
    dequeueFromQueue
  };

  return (
    <WebsiteContext.Provider value={contextValue}>
      {children}
    </WebsiteContext.Provider>
  );
}