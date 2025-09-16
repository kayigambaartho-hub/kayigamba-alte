
import React from 'react';
import type { ProgressData } from '../types';
import { LEARNING_NUMBERS } from '../constants';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ProgressScreenProps {
  progressData: ProgressData;
  earnedStars: number[];
}

const StarIcon = ({ isFilled }: { isFilled: boolean }) => (
    <svg viewBox="0 0 100 100" className={`w-full h-full ${isFilled ? 'text-brand-yellow filter drop-shadow-lg animate-twinkling' : 'text-gray-300/50'}`}>
        <path d="M50 0 L61.2 34.5 L97.5 34.5 L68.1 55.9 L79.4 90.5 L50 69.1 L20.6 90.5 L31.9 55.9 L2.5 34.5 L38.8 34.5 Z" fill="currentColor" />
    </svg>
);


const ProgressScreen: React.FC<ProgressScreenProps> = ({ progressData, earnedStars }) => {
  
  const chartData = LEARNING_NUMBERS.map(item => ({
    name: item.num.toString(),
    count: progressData[item.num] || 0,
    color: tailwindColorToHex(item.color.replace('bg-', ''))
  }));
  
  function tailwindColorToHex(colorName: string): string {
    const colorMap: {[key: string]: string} = {
      'brand-red': '#FF8A80',
      'brand-blue': '#5AC9FF',
      'brand-green': '#85E0A3',
      'brand-yellow': '#FFD95A',
      'brand-purple': '#C58AF9',
      'brand-pink': '#F48FB1',
      'brand-orange': '#FFB74D',
      'teal-400': '#2DD4BF', // fallback
      'indigo-400': '#818CF8', // fallback
      'lime-400': '#A3E635' // fallback
    };
    return colorMap[colorName] || '#8884d8';
  }

  const totalInteractions = Object.values(progressData).reduce((sum, count) => sum + count, 0);

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-4xl font-fredoka text-white text-center mb-2" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>Your Progress</h1>
      <p className="text-lg text-gray-200 mb-8">Collect all the stars and see your practice stats!</p>
      
      <div className="w-full bg-white/20 backdrop-blur-sm rounded-3xl p-4 shadow-lg mb-8">
        <h2 className="font-fredoka text-2xl text-white text-center mb-4">Star Collection</h2>
        <div className="grid grid-cols-5 gap-x-4 gap-y-2">
            {LEARNING_NUMBERS.map(({ num }) => (
                <div key={num} className="flex flex-col items-center justify-center">
                    <div className="w-12 h-12 p-1">
                        <StarIcon isFilled={earnedStars.includes(num)} />
                    </div>
                    <span className={`font-fredoka text-xl ${earnedStars.includes(num) ? 'text-white' : 'text-gray-300/70'}`}>{num}</span>
                </div>
            ))}
        </div>
      </div>

      <div className="w-full h-80 bg-white/60 rounded-3xl p-4 shadow-inner">
        {totalInteractions > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 10, left: -20, bottom: 5 }}>
              <XAxis dataKey="name" stroke="#573357" style={{ fontFamily: 'Fredoka One' }} />
              <YAxis allowDecimals={false} stroke="#573357" style={{ fontFamily: 'Nunito' }} />
              <Tooltip
                cursor={{ fill: 'rgba(255, 217, 90, 0.3)' }}
                contentStyle={{ fontFamily: 'Nunito', borderRadius: '12px', border: '2px solid #4A2A4A' }}
              />
              <Bar dataKey="count" radius={[10, 10, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
            <span className="text-6xl mb-4">📊</span>
            <p className="font-bold text-xl">No progress yet!</p>
            <p>Go to the 'Learn' or 'Game' section to start practicing.</p>
          </div>
        )}
      </div>
      <div className="mt-8 text-center bg-white/20 p-4 rounded-2xl w-full max-w-xs">
        <p className="font-bold text-xl text-white">Total interactions</p>
        <p className="font-fredoka text-5xl text-brand-yellow" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.4)' }}>{totalInteractions}</p>
      </div>
    </div>
  );
};

export default ProgressScreen;