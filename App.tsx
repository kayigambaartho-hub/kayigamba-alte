import React, { useState, useCallback } from 'react';
import type { View } from './types';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import Dashboard from './components/Dashboard';
import MockInterview from './components/MockInterview';
import Resources from './components/Resources';
import ResumeBuilder from './components/ResumeBuilder';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('DASHBOARD');

  const renderView = useCallback(() => {
    switch (currentView) {
      case 'MOCK_INTERVIEW':
        return <MockInterview />;
      case 'RESOURCES':
        return <Resources />;
      case 'RESUME_BUILDER':
        return <ResumeBuilder />;
      case 'DASHBOARD':
      default:
        return <Dashboard setCurrentView={setCurrentView} />;
    }
  }, [currentView]);

  return (
    <div className="font-sans">
      <div className="relative mx-auto flex h-screen max-w-md flex-col overflow-hidden bg-slate-50 shadow-2xl">
        <Header />
        <main className="flex-1 overflow-y-auto pb-20">
          {renderView()}
        </main>
        <BottomNav currentView={currentView} setCurrentView={setCurrentView} />
      </div>
    </div>
  );
};

export default App;