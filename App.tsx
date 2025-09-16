
import React, { useState, useCallback, useEffect } from 'react';
import type { Screen, ProgressData, Level, GameProgress } from './types';
import HomeScreen from './components/HomeScreen';
import LearningScreen from './components/LearningScreen';
import GameScreen from './components/GameScreen';
import ProgressScreen from './components/ProgressScreen';
import BottomNav from './components/BottomNav';
import { speak } from './services/speechService';

const Star = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
    <svg viewBox="0 0 100 100" className={`absolute text-yellow-200 fill-current ${className}`} style={style}>
        <path d="M50 0 L61.2 34.5 L97.5 34.5 L68.1 55.9 L79.4 90.5 L50 69.1 L20.6 90.5 L31.9 55.9 L2.5 34.5 L38.8 34.5 Z" />
    </svg>
);

const RewardNotification: React.FC<{ number: number }> = ({ number }) => (
    <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-brand-yellow text-brand-text font-fredoka text-xl px-6 py-3 rounded-2xl shadow-lg z-[100] animate-fade-in flex items-center gap-2" style={{ textShadow: 'none' }}>
        <span className="text-3xl">🌟</span>
        <span>New Star for number {number}!</span>
    </div>
);


const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [progressData, setProgressData] = useState<ProgressData>(() => {
    const initialData: ProgressData = {};
    for (let i = 1; i <= 10; i++) {
      initialData[i] = 0;
    }
    return initialData;
  });
  
  const [earnedStars, setEarnedStars] = useState<number[]>(() => {
    try {
      const savedStars = localStorage.getItem('earnedStars');
      return savedStars ? JSON.parse(savedStars) : [];
    } catch (error) {
      console.error("Could not load stars from localStorage", error);
      return [];
    }
  });

  const [rewardNotification, setRewardNotification] = useState<number | null>(null);

  const [gameProgress, setGameProgress] = useState<GameProgress>(() => {
    try {
      const savedProgress = localStorage.getItem('gameProgress');
      if (savedProgress) {
        const parsed = JSON.parse(savedProgress);
        if (parsed.Beginner && parsed.Medium && parsed.Difficult) {
           return parsed;
        }
      }
    } catch (error) {
      console.error("Could not load game progress from localStorage", error);
    }
    return { Beginner: 1, Medium: 1, Difficult: 1 };
  });

  useEffect(() => {
    try {
      localStorage.setItem('gameProgress', JSON.stringify(gameProgress));
    } catch (error) {
      console.error("Could not save game progress to localStorage", error);
    }
  }, [gameProgress]);

  useEffect(() => {
    try {
      localStorage.setItem('earnedStars', JSON.stringify(earnedStars));
    } catch (error) {
      console.error("Could not save stars to localStorage", error);
    }
  }, [earnedStars]);


  const updateProgress = useCallback((num: number) => {
    setProgressData(prevData => ({
      ...prevData,
      [num]: (prevData[num] || 0) + 1
    }));
  }, []);

  const awardStar = useCallback((num: number) => {
    if (!earnedStars.includes(num)) {
      setEarnedStars(prevStars => [...prevStars, num].sort((a,b) => a - b));
      setRewardNotification(num);
      speak(`You earned a new star for number ${num}!`);
      setTimeout(() => setRewardNotification(null), 3000);
    }
  }, [earnedStars]);

  const handleProgressUpdate = useCallback((num: number) => {
    updateProgress(num);
    awardStar(num);
  }, [updateProgress, awardStar]);

  const handleLevelComplete = useCallback((difficulty: Level, completedLevel: number) => {
    if (!difficulty) return;
    
    const nextLevel = completedLevel + 1;
    if (nextLevel > 10) return; // Max 10 levels

    setGameProgress(prev => {
      if (nextLevel > prev[difficulty]) {
        return { ...prev, [difficulty]: nextLevel };
      }
      return prev;
    });
  }, []);


  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onNavigate={setCurrentScreen} />;
      case 'learn':
        return <LearningScreen onProgressUpdate={handleProgressUpdate} />;
      case 'game':
        return <GameScreen onProgressUpdate={handleProgressUpdate} gameProgress={gameProgress} onLevelComplete={handleLevelComplete} />;
      case 'progress':
        return <ProgressScreen progressData={progressData} earnedStars={earnedStars} />;
      default:
        return <HomeScreen onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <div className="font-nunito text-white h-screen w-screen max-w-md mx-auto flex flex-row bg-transparent relative overflow-hidden">
        {/* Background Stars */}
        <Star className="top-[10%] left-[30%] w-6 h-6 animate-twinkling" style={{ animationDelay: '0.5s' }} />
        <Star className="top-[20%] right-[15%] w-3 h-3 animate-twinkling" />
        <Star className="top-[40%] left-[45%] w-2 h-2" />
        <Star className="top-[55%] right-[20%] w-5 h-5 animate-twinkling" style={{ animationDelay: '1s' }} />
        <Star className="bottom-[25%] left-[35%] w-3 h-3" />
        <Star className="bottom-[10%] right-[10%] w-6 h-6 animate-twinkling" style={{ animationDelay: '1.5s' }} />
        <Star className="bottom-[5%] left-[50%] w-2 h-2 animate-twinkling" />
      
      <BottomNav activeScreen={currentScreen} onNavigate={setCurrentScreen} />

      <main className="flex-grow flex flex-col z-10 overflow-y-auto p-4 h-screen">
        {rewardNotification && <RewardNotification number={rewardNotification} />}
        {renderScreen()}
      </main>
      
    </div>
  );
};

export default App;
