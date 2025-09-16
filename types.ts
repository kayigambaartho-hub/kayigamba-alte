export type View = 'DASHBOARD' | 'MOCK_INTERVIEW' | 'RESOURCES' | 'RESUME_BUILDER';

export type ResourceTab = 'QUESTIONS' | 'TIPS' | 'COMPANIES';

export interface InterviewQuestion {
  id: number;
  question: string;
  category: string;
  modelAnswer: string;
}

export interface ProfessionalTip {
  id: number;
  title: string;
  content: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface CompanyGuide {
  id: number;
  name: string;
  logoUrl: string;
  commonQuestions: string[];
}
