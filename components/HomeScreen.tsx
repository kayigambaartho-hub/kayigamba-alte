import React from 'react';
import type { Screen } from '../types';
import { LEARNING_NUMBERS, GAME_ITEMS } from '../constants';

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full p-2">
      <div className="relative mb-4">
        <span className="text-9xl animate-bounce-slow inline-block filter drop-shadow-lg">🌟</span>
      </div>
      <h1 className="text-5xl font-fredoka text-white mb-1" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>Count with</h1>
      <h2 className="text-6xl font-fredoka text-brand-yellow mb-6" style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.4)' }}>Stars</h2>
      
      <p className="text-lg text-gray-200 mb-10 max-w-xs">
        Let's learn numbers in a magical world of stars!
      </p>

      <div className="flex flex-col gap-6 w-full max-w-xs">
        <button
          onClick={() => onNavigate('learn')}
          className="w-full bg-brand-green text-white font-fredoka text-3xl p-4 rounded-3xl shadow-lg border-b-8 border-green-700 hover:bg-green-500 active:border-b-2 active:mt-2 transition-all duration-150 transform hover:scale-105"
        >
          <div className="flex justify-between items-center">
            <span>Learn Numbers</span>
            <span className="text-4xl">📚</span>
          </div>
          <div className="mt-3 bg-green-900/20 rounded-xl p-2 flex justify-around items-center">
            {LEARNING_NUMBERS.slice(0, 3).map(n => (
              <div key={n.num} className={`${n.color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl font-bold shadow-md text-white`}>
                {n.num}
              </div>
            ))}
          </div>
        </button>

        <button
          onClick={() => onNavigate('game')}
          className="w-full bg-brand-blue text-white font-fredoka text-3xl p-4 rounded-3xl shadow-lg border-b-8 border-blue-700 hover:bg-blue-500 active:border-b-2 active:mt-2 transition-all duration-150 transform hover:scale-105"
        >
          <div className="flex justify-between items-center">
            <span>Play a Game</span>
            <span className="text-4xl">🎮</span>
          </div>
          <div className="mt-3 bg-blue-900/20 rounded-xl p-3 flex justify-around items-center text-4xl">
             {GAME_ITEMS.slice(0, 4).map((item, index) => <span key={index} className="filter drop-shadow-md">{item}</span>)}
          </div>
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;