import type { InterviewQuestion, ProfessionalTip, CompanyGuide } from './types';
import { BriefcaseIcon, CommunicationIcon, ConfidenceIcon } from './components/Icons';

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  {
    id: 1,
    question: "Tell me about yourself.",
    category: "Behavioral",
    modelAnswer: "I'm a passionate software developer with 5 years of experience in building scalable web applications. In my previous role at ABC Corp, I led a project that improved system efficiency by 20%. I'm excited about the opportunity to bring my technical skills and collaborative spirit to your team."
  },
  {
    id: 2,
    question: "What are your strengths?",
    category: "Behavioral",
    modelAnswer: "My greatest strength is my problem-solving ability. I excel at analyzing complex problems and breaking them down into manageable parts. For example, I once identified a critical bug in our payment processing system that saved the company from potential financial loss. I am also a strong communicator and work well in team environments."
  },
  {
    id: 3,
    question: "Why do you want to work for this company?",
    category: "Company Fit",
    modelAnswer: "I've been following your company's work in the AI space for a while and I'm deeply impressed with your commitment to innovation and ethical AI. Your recent product launch aligns perfectly with my professional interests and expertise in machine learning. I'm eager to contribute to a company that's making a real impact."
  },
  {
    id: 4,
    question: "Describe a challenging situation you faced at work and how you handled it.",
    category: "Situational",
    modelAnswer: "In a previous project, we were facing a tight deadline and a key team member left unexpectedly. (Situation) I took the initiative to re-delegate their tasks, created a revised project timeline, and held daily check-ins to ensure everyone was aligned. (Task & Action) As a result, we not only met the deadline but also delivered a high-quality product. (Result) This taught me the importance of adaptability and proactive leadership."
  }
];

export const PROFESSIONAL_TIPS: ProfessionalTip[] = [
  {
    id: 1,
    title: "Dress for Success",
    content: "Research the company's dress code. When in doubt, it's better to be slightly overdressed. Business casual is often a safe bet. Ensure your clothes are clean and well-fitting.",
    icon: BriefcaseIcon
  },
  {
    id: 2,
    title: "Master Communication",
    content: "Speak clearly and confidently. Maintain good eye contact and practice active listening. Avoid using filler words like 'um' or 'like'. Pause to think before you speak.",
    icon: CommunicationIcon
  },
  {
    id: 3,
    title: "Build Your Confidence",
    content: "Preparation is key to confidence. Know your resume inside and out. Practice your answers, but don't memorize them. Remember your past successes and believe in your abilities.",
    icon: ConfidenceIcon
  }
];

export const COMPANY_GUIDES: CompanyGuide[] = [
  {
    id: 1,
    name: "Tech Solutions Inc.",
    logoUrl: "https://picsum.photos/seed/tech/40/40",
    commonQuestions: [
      "How do you stay updated with the latest technology trends?",
      "Describe your experience with agile development methodologies.",
      "What is your favorite product of ours and how would you improve it?"
    ]
  },
  {
    id: 2,
    name: "Innovate Global",
    logoUrl: "https://picsum.photos/seed/innovate/40/40",
    commonQuestions: [
      "How do you handle working with a globally distributed team?",
      "Describe a time you had to innovate to solve a problem.",
      "What does 'customer-centric' mean to you?"
    ]
  },
  {
    id: 3,
    name: "Greenleaf Corp.",
    logoUrl: "https://picsum.photos/seed/green/40/40",
    commonQuestions: [
      "What do you know about our company's sustainability initiatives?",
      "How do your values align with our company mission?",
      "Describe a project you worked on that had a positive social impact."
    ]
  }
];
