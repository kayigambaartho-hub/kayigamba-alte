
export type Screen = 'home' | 'learn' | 'game' | 'progress';

export type ProgressData = { [key: number]: number };

export interface NavItem {
  id: Screen;
  label: string;
  icon: (isActive: boolean) => React.ReactNode;
}

export type Level = 'Beginner' | 'Medium' | 'Difficult';

export type GameProgress = { [key in Level]: number };
