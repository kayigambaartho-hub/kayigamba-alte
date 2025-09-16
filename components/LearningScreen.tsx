import React, { useState } from 'react';
import { LEARNING_NUMBERS } from '../constants';
import { speak } from '../services/speechService';
import NumberTracingCanvas from './NumberTracingCanvas';

interface LearningScreenProps {
  onProgressUpdate: (num: number) => void;
}

type LearningNumber = typeof LEARNING_NUMBERS[0];

const SpeakerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
  </svg>
);


const NumberCard: React.FC<{
  numberData: LearningNumber;
  onClick: (data: LearningNumber) => void;
}> = ({ numberData, onClick }) => {
  const { num, text, color, emoji } = numberData;
  return (
    <button
      onClick={() => onClick(numberData)}
      className={`${color} text-white font-fredoka rounded-3xl p-4 flex flex-col items-center justify-around shadow-lg transform transition-transform duration-200 hover:scale-105 hover:rotate-2 active:scale-95 aspect-square animate-bobbing`}
      aria-label={`Learn number ${num}`}
    >
      <div className="flex items-start justify-center gap-1">
        <span className="text-6xl md:text-7xl">{num}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            speak(text);
          }}
          className="bg-white/30 hover:bg-white/50 rounded-full p-2 transition-colors"
          aria-label={`Speak the word ${text}`}
        >
          <SpeakerIcon />
        </button>
      </div>
      
      <div className="text-xl md:text-2xl break-words w-full text-center" aria-hidden="true">{emoji}</div>
      <div className="text-2xl md:text-3xl">{text}</div>
    </button>
  );
};


const LearningScreen: React.FC<LearningScreenProps> = ({ onProgressUpdate }) => {
  const [tracingNumber, setTracingNumber] = useState<LearningNumber | null>(null);

  const handleNumberClick = (numberData: LearningNumber) => {
    speak(`Let's trace the number ${numberData.num}!`);
    setTracingNumber(numberData);
  };

  const handleCloseTracing = () => {
    if (tracingNumber) {
      speak(`Great job tracing number ${tracingNumber.text}!`);
      onProgressUpdate(tracingNumber.num);
      setTracingNumber(null);
    }
  };

  return (
    <div className="p-2">
      <h1 className="text-4xl font-fredoka text-white text-center mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>Tap a number to trace!</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {LEARNING_NUMBERS.map((item) => (
          <NumberCard
            key={item.num}
            numberData={item}
            onClick={handleNumberClick}
          />
        ))}
      </div>
      {tracingNumber && (
        <NumberTracingCanvas 
          numberData={tracingNumber}
          onClose={handleCloseTracing}
        />
      )}
    </div>
  );
};

export default LearningScreen;