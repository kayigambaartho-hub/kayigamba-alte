
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { GAME_ITEMS } from '../constants';
import { speak } from '../services/speechService';
import type { Level, GameProgress } from '../types';

interface GameScreenProps {
  onProgressUpdate: (num: number) => void;
  gameProgress: GameProgress;
  onLevelComplete: (difficulty: Level, completedLevel: number) => void;
}

const levelConfig = {
  Beginner: { range: [2, 5], options: 3, color: 'bg-brand-green', borderColor: 'border-green-700', hoverColor: 'hover:bg-green-500', textColor: 'text-green-900' },
  Medium: { range: [4, 8], options: 3, color: 'bg-brand-blue', borderColor: 'border-blue-700', hoverColor: 'hover:bg-blue-500', textColor: 'text-blue-900' },
  Difficult: { range: [6, 10], options: 4, color: 'bg-brand-red', borderColor: 'border-red-700', hoverColor: 'hover:bg-red-500', textColor: 'text-red-900' },
};

const QUESTIONS_PER_LEVEL = [3, 3, 4, 4, 5, 5, 6, 7, 8, 10]; // For levels 1-10

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white/50" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
  </svg>
);

const BackIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);


const GameScreen: React.FC<GameScreenProps> = ({ onProgressUpdate, gameProgress, onLevelComplete }) => {
  const [view, setView] = useState<'difficulty' | 'levels' | 'gameplay' | 'levelComplete'>('difficulty');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Level | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

  // Game state
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [targetNumber, setTargetNumber] = useState(0);
  const [options, setOptions] = useState<number[]>([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [key, setKey] = useState(0);

  const questionsNeeded = selectedLevel ? QUESTIONS_PER_LEVEL[selectedLevel - 1] : 0;

  const generateNewQuestion = useCallback(() => {
    if (!selectedDifficulty) return;

    setFeedback(null);
    const config = levelConfig[selectedDifficulty];
    const [min, max] = config.range;

    const newTarget = Math.floor(Math.random() * (max - min + 1)) + min;
    setTargetNumber(newTarget);

    const currentOptions = new Set<number>([newTarget]);
    while (currentOptions.size < config.options) {
      let randomOption;
      do {
        randomOption = Math.floor(Math.random() * (max - min + 1)) + min;
      } while (currentOptions.has(randomOption));
      currentOptions.add(randomOption);
    }
    
    setOptions(Array.from(currentOptions).sort(() => Math.random() - 0.5));
    setSelectedItem(GAME_ITEMS[Math.floor(Math.random() * GAME_ITEMS.length)]);
    setKey(prev => prev + 1);
  }, [selectedDifficulty]);

  useEffect(() => {
    if (view === 'gameplay') {
      generateNewQuestion();
    }
  }, [view, selectedLevel, generateNewQuestion]);

  const handleDifficultySelect = (difficulty: Level) => {
    speak(`Selected ${difficulty}`);
    setSelectedDifficulty(difficulty);
    setView('levels');
  };

  const handleLevelSelect = (level: number) => {
    speak(`Level ${level}`);
    setSelectedLevel(level);
    setCorrectAnswers(0);
    setView('gameplay');
  };

  const handleAnswer = (answer: number) => {
    if (feedback) return;

    if (answer === targetNumber) {
      const newCorrectCount = correctAnswers + 1;
      setFeedback('correct');
      onProgressUpdate(targetNumber);
      
      if (newCorrectCount >= questionsNeeded) {
        speak('Level Complete! Fantastic!');
        onLevelComplete(selectedDifficulty!, selectedLevel!);
        setView('levelComplete');
      } else {
        setCorrectAnswers(newCorrectCount);
        speak('Correct! Great job!');
      }
    } else {
      setFeedback('incorrect');
      speak('Oops, try again!');
      setTimeout(() => setFeedback(null), 2000);
    }
  };
  
  const handleNextQuestion = () => {
    generateNewQuestion();
  };

  const handlePlayAgain = () => {
    speak(`Level ${selectedLevel}`);
    setCorrectAnswers(0);
    setView('gameplay');
  };

  const handleNextLevel = () => {
    if (selectedLevel! < 10) {
      handleLevelSelect(selectedLevel! + 1);
    }
  };

  if (view === 'difficulty') {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in">
            <h1 className="text-4xl font-fredoka text-white mb-8" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>Choose a Difficulty</h1>
            <div className="flex flex-col gap-6 w-full">
                {(['Beginner', 'Medium', 'Difficult'] as Level[]).map(level => {
                  const config = levelConfig[level];
                  return (
                    <button
                        key={level}
                        onClick={() => handleDifficultySelect(level)}
                        className={`w-full max-w-xs text-white font-fredoka text-3xl p-4 rounded-3xl shadow-lg border-b-8 transition-all duration-150 transform hover:scale-105 active:border-b-2 active:mt-2 ${config.color} ${config.borderColor} ${config.hoverColor}`}
                    >
                        <div className="flex flex-col items-center">
                            <span>{level}</span>
                            <span className="text-lg font-nunito mt-1">Numbers {config.range[0]}-{config.range[1]}</span>
                        </div>
                    </button>
                  );
                })}
            </div>
        </div>
    );
  }

  if (view === 'levels' && selectedDifficulty) {
    const highestUnlocked = gameProgress[selectedDifficulty];
    const config = levelConfig[selectedDifficulty];
    return (
      <div className="flex flex-col items-center justify-start h-full text-center animate-fade-in">
        <div className="w-full flex justify-start items-center mb-4">
          <button 
            onClick={() => { setView('difficulty'); speak('Choose difficulty.'); }} 
            className="flex items-center gap-1 text-sm font-bold text-white bg-white/20 px-3 py-1 rounded-full hover:bg-white/40 transition-colors"
          >
            <BackIcon /> Back
          </button>
        </div>
        <h1 className={`text-4xl font-fredoka ${config.textColor} mb-1`} style={{ textShadow: '1px 1px 2px rgba(255,255,255,0.7)' }}>{selectedDifficulty}</h1>
        <p className="text-lg text-gray-200 mb-6">Choose a level to start!</p>
        <div className="grid grid-cols-3 gap-4 w-full max-w-xs">
          {Array.from({ length: 10 }, (_, i) => i + 1).map(levelNum => {
            const isLocked = levelNum > highestUnlocked;
            return (
              <button
                key={levelNum}
                disabled={isLocked}
                onClick={() => handleLevelSelect(levelNum)}
                className={`aspect-square flex items-center justify-center rounded-2xl border-b-8 shadow-lg transform transition-all duration-150 font-fredoka text-4xl
                  ${isLocked 
                    ? 'bg-gray-500/50 border-gray-700/50 cursor-not-allowed' 
                    : `${config.color} ${config.borderColor} ${config.hoverColor} text-white hover:scale-110 active:border-b-2 active:mt-2`
                  }`}
              >
                {isLocked ? <LockIcon/> : levelNum}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (view === 'levelComplete' && selectedDifficulty && selectedLevel) {
     const isNextLevelUnlocked = selectedLevel < 10;
     return (
        <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in">
            <span className="text-9xl animate-tada">🌟</span>
            <h1 className="text-5xl font-fredoka text-white mt-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.4)' }}>Level {selectedLevel} Complete!</h1>
            <p className="text-xl text-gray-200 mt-2">You are a counting star!</p>
            <div className="flex flex-col gap-4 mt-8 w-full max-w-xs">
                {isNextLevelUnlocked && (
                    <button onClick={handleNextLevel} className="bg-brand-green text-white font-fredoka text-2xl p-3 rounded-2xl shadow-lg border-b-8 border-green-700 hover:bg-green-500 active:border-b-2 active:mt-2 transition-all duration-150">
                        Next Level
                    </button>
                )}
                <button onClick={handlePlayAgain} className="bg-brand-blue text-white font-fredoka text-2xl p-3 rounded-2xl shadow-lg border-b-8 border-blue-700 hover:bg-blue-500 active:border-b-2 active:mt-2 transition-all duration-150">
                    Play Again
                </button>
                <button onClick={() => setView('levels')} className="bg-brand-purple text-white font-fredoka text-2xl p-3 rounded-2xl shadow-lg border-b-8 border-purple-700 hover:bg-purple-500 active:border-b-2 active:mt-2 transition-all duration-150">
                    Choose Level
                </button>
            </div>
        </div>
     );
  }

  if (view === 'gameplay' && selectedDifficulty && selectedLevel) {
    const progressPercentage = Math.round((correctAnswers / questionsNeeded) * 100);
    return (
      <div className="flex flex-col items-center justify-start h-full p-2 text-center">
        <div className="w-full flex justify-between items-center mb-2">
           <button 
             onClick={() => { setView('levels'); speak('Choose level.'); }} 
             className="flex items-center gap-1 text-sm font-bold text-white bg-white/20 px-3 py-1 rounded-full hover:bg-white/40 transition-colors"
           >
             <BackIcon/> Levels
           </button>
           <div className="font-fredoka text-white text-lg">{selectedDifficulty} - Lvl {selectedLevel}</div>
         </div>
         <div className="w-full bg-black/20 rounded-full h-4 mb-3 shadow-inner">
            <div 
                className="bg-brand-yellow h-4 rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${progressPercentage}%`}}
            ></div>
         </div>
        
        <h1 className="text-3xl font-fredoka text-white mb-2" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>Count the Items!</h1>
        <p className="text-base text-gray-200 mb-4">How many {selectedItem} do you see?</p>
  
        <div key={key} className="bg-white/60 w-full rounded-3xl p-4 grid grid-cols-3 sm:grid-cols-4 gap-2 min-h-[180px] place-items-center animate-tada">
          {Array.from({ length: targetNumber }, (_, i) => i).map((i) => (
            <span key={i} className="text-4xl sm:text-5xl drop-shadow-md" style={{ animation: `tada ${0.5 + i * 0.1}s ease-out` }}>
              {selectedItem}
            </span>
          ))}
        </div>
        
        <div className="flex justify-center flex-wrap gap-4 mt-6">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => handleAnswer(opt)}
              disabled={feedback === 'correct'}
              className={`w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center text-5xl text-white font-fredoka rounded-full shadow-lg border-b-8 transition-all duration-150 transform 
                ${feedback === null ? 'bg-brand-purple border-purple-700 hover:bg-purple-500 active:border-b-2 active:mt-2 hover:scale-105' : ''}
                ${feedback === 'correct' && opt === targetNumber ? 'bg-brand-green border-green-700' : ''}
                ${feedback === 'correct' && opt !== targetNumber ? 'bg-gray-400 border-gray-600 opacity-50' : ''}
                ${feedback === 'incorrect' ? 'bg-brand-red border-red-700 animate-headShake' : ''}
              `}
              style={{animationIterationCount: 1}}
            >
              {opt}
            </button>
          ))}
        </div>
        
        {feedback === 'correct' && (
          <button onClick={handleNextQuestion} className="mt-6 bg-brand-yellow text-brand-text font-fredoka text-2xl px-8 py-3 rounded-2xl shadow-lg border-b-8 border-yellow-600 hover:bg-yellow-400 active:border-b-2 active:mt-2 transition-all duration-150 animate-fade-in">
            Next!
          </button>
        )}
      </div>
    );
  }

  return null;
};

export default GameScreen;
