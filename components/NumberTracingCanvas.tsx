import React, { useRef, useEffect, useState } from 'react';
import { LEARNING_NUMBERS } from '../constants'; 
import { speak } from '../services/speechService';

type LearningNumber = typeof LEARNING_NUMBERS[0];

interface NumberTracingCanvasProps {
  numberData: LearningNumber;
  onClose: () => void;
}

const NumberTracingCanvas: React.FC<NumberTracingCanvasProps> = ({ numberData, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    if (!context) return;
    
    const setCanvasDimensions = () => {
        const container = canvas.parentElement;
        if (container) {
            const dpr = window.devicePixelRatio || 1;
            const rect = container.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            context.scale(dpr, dpr);
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;
        }
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.lineWidth = 20;
        context.strokeStyle = '#573357';
    };

    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);

    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
    };

  }, []);

  const getCoords = (event: React.MouseEvent | React.TouchEvent): { x: number; y: number } | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();

    let clientX, clientY;

    if (window.TouchEvent && event.nativeEvent instanceof TouchEvent && event.nativeEvent.touches.length > 0) {
      clientX = event.nativeEvent.touches[0].clientX;
      clientY = event.nativeEvent.touches[0].clientY;
    } else if (event.nativeEvent instanceof MouseEvent) {
      clientX = event.nativeEvent.clientX;
      clientY = event.nativeEvent.clientY;
    } else {
      return null;
    }
    return {
        x: clientX - rect.left,
        y: clientY - rect.top
    };
  }

  const startDrawing = (event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();
    const coords = getCoords(event);
    if (!coords) return;
    
    const context = canvasRef.current?.getContext('2d');
    if (!context) return;
    
    context.beginPath();
    context.moveTo(coords.x, coords.y);
    setIsDrawing(true);
  };

  const draw = (event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();
    if (!isDrawing) return;
    const coords = getCoords(event);
    if (!coords) return;

    const context = canvasRef.current?.getContext('2d');
    if (!context) return;

    context.lineTo(coords.x, coords.y);
    context.stroke();
  };

  const stopDrawing = () => {
    const context = canvasRef.current?.getContext('2d');
    if (!context) return;
    context.closePath();
    setIsDrawing(false);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (canvas && context) {
      context.save();
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.restore();
      speak('Cleared!');
    }
  };


  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-4 animate-fade-in" role="dialog" aria-modal="true" aria-labelledby="tracing-heading">
      <div className="relative w-full max-w-sm h-3/5 bg-white rounded-3xl shadow-2xl flex items-center justify-center border-4 border-brand-purple">
        <span className="text-[250px] font-fredoka text-gray-200 select-none" aria-hidden="true">
          {numberData.num}
        </span>
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full cursor-crosshair touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          onTouchCancel={stopDrawing}
        />
      </div>

      <h2 id="tracing-heading" className="font-fredoka text-2xl text-white mt-6" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.4)' }}>Trace the number {numberData.num}!</h2>

      <div className="flex gap-4 mt-4">
        <button
          onClick={handleClear}
          className="bg-brand-red text-white font-fredoka text-2xl px-6 py-3 rounded-2xl shadow-lg border-b-8 border-red-700 active:border-b-2 active:mt-2 transition-all duration-150 transform hover:scale-105"
        >
          Clear
        </button>
        <button
          onClick={onClose}
          className="bg-brand-green text-white font-fredoka text-2xl px-6 py-3 rounded-2xl shadow-lg border-b-8 border-green-700 active:border-b-2 active:mt-2 transition-all duration-150 transform hover:scale-105"
        >
          I'm Done!
        </button>
      </div>
    </div>
  );
};

export default NumberTracingCanvas;