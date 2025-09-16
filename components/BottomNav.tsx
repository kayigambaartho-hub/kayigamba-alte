import React from 'react';
import { NAV_ITEMS } from '../constants';
import type { Screen } from '../types';

interface BottomNavProps {
  activeScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeScreen, onNavigate }) => {
  return (
    <nav className="h-full w-24 flex-shrink-0 flex flex-col justify-center items-center bg-white/20 backdrop-blur-sm border-r-4 border-brand-yellow z-50">
      <ul className="flex flex-col justify-center items-center gap-8">
        {NAV_ITEMS.map((item) => {
          const isActive = activeScreen === item.id;
          return (
            <li key={item.id}>
              <button
                onClick={() => onNavigate(item.id)}
                className="relative flex flex-col items-center justify-center gap-1.5 transition-all duration-300 ease-in-out group"
                aria-label={item.label}
              >
                <div className={`transition-all duration-300 p-3 rounded-full ${isActive ? 'bg-brand-purple/80 scale-110 shadow-lg' : 'group-hover:bg-white/30'}`}>
                    {item.icon(isActive)}
                </div>
                <span className={`text-xs font-bold font-fredoka transition-all duration-300 text-white ${isActive ? 'opacity-100' : 'opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100'}`}>{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default BottomNav;