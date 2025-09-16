import React from 'react';
import type { NavItem } from './types';

const HomeIcon = ({ isActive }: { isActive: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24">
    <g strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
      <path d="M10.08,3.46,3.5,9.15A2,2,0,0,0,3,10.55v9A2,2,0,0,0,5,21.5H19a2,2,0,0,0,2-2v-9a2,2,0,0,0-.5-1.4l-6.58-5.69A2,2,0,0,0,10.08,3.46Z" fill="#fde047" stroke="#ca8a04" />
      <path d="M9 21.5v-8a3 3 0 0 1 6 0v8" fill="#fef08a" stroke="#ca8a04"></path>
    </g>
  </svg>
);

const LearnIcon = ({ isActive }: { isActive: boolean }) => (
   <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24">
    <g strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
        <path fill="#4ade80" stroke="#166534" d="M4 19.5A2.5 2.5 0 0 1 1.5 17V5A2.5 2.5 0 0 1 4 2.5h10.5A2.5 2.5 0 0 1 17 5v12a2.5 2.5 0 0 1-2.5 2.5Z"/>
        <path fill="#86efac" stroke="#166534" d="M17 5h2.5A2.5 2.5 0 0 1 22 7.5v10A2.5 2.5 0 0 1 19.5 20H17Z"/>
        <path fill="none" stroke="#166534" d="M12.5 2.5h-5"/>
    </g>
  </svg>
);

const GameIcon = ({ isActive }: { isActive: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24">
    <g strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" fill="#60a5fa" stroke="#1e40af">
      <path d="M10 8.5h4"/>
      <path d="M12 6.5v4"/>
      <path d="M17.5 13.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM15.5 15.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
      <path d="M4 14.5a3 3 0 0 0 3-3h1.5v1a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1H13a3 3 0 0 0 3 3h.5a3.5 3.5 0 0 0 3.5-3.5v-1a3.5 3.5 0 0 0-3.5-3.5H16a3 3 0 0 0-3-3H8.5a3 3 0 0 0-3 3H5a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h-.5"/>
    </g>
  </svg>
);

const ProgressIcon = ({ isActive }: { isActive: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24">
    <g strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" fill="none" stroke="#a78bfa">
      <path d="M18 20V10m-6 10V4m-6 16v-6"/>
    </g>
    <path d="M15 10l-3-3l-3 3" fill="#c4b5fd" stroke="#6d28d9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', icon: (isActive) => <HomeIcon isActive={isActive} /> },
  { id: 'learn', label: 'Learn', icon: (isActive) => <LearnIcon isActive={isActive} /> },
  { id: 'game', label: 'Game', icon: (isActive) => <GameIcon isActive={isActive} /> },
  { id: 'progress', label: 'Progress', icon: (isActive) => <ProgressIcon isActive={isActive} /> },
];

export const LEARNING_NUMBERS = [
  { num: 1, text: 'One', color: 'bg-brand-red', emoji: '🍎' },
  { num: 2, text: 'Two', color: 'bg-brand-blue', emoji: '🍌🍌' },
  { num: 3, text: 'Three', color: 'bg-brand-green', emoji: '🍓🍓🍓' },
  { num: 4, text: 'Four', color: 'bg-brand-yellow', emoji: '🍊🍊🍊🍊' },
  { num: 5, text: 'Five', color: 'bg-brand-purple', emoji: '🍇🍇🍇🍇🍇' },
  { num: 6, text: 'Six', color: 'bg-brand-pink', emoji: '🥝🥝🥝🥝🥝🥝' },
  { num: 7, text: 'Seven', color: 'bg-brand-orange', emoji: '🍒🍒🍒🍒🍒🍒🍒' },
  { num: 8, text: 'Eight', color: 'bg-teal-400', emoji: '🍑🍑🍑🍑🍑🍑🍑🍑' },
  { num: 9, text: 'Nine', color: 'bg-indigo-400', emoji: '🍍🍍🍍🍍🍍🍍🍍🍍🍍' },
  { num: 10, text: 'Ten', color: 'bg-lime-400', emoji: '🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉' },
];

export const GAME_ITEMS = ['🍎', '🍓', '🍊', '🍌', '🍇'];