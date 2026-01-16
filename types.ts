
export type Language = 'en' | 'es' | 'no';

export interface JobOffer {
  id: string;
  title: string;
  company: string;
  shortDescription: string;
  fullDescription: string;
  requirements: string[];
  location: string;
  videoUrl?: string;
  salary?: string;
  type: string;
}

export interface TalentProfile {
  id: string;
  name: string;
  role: string;
  category: 'healthcare' | 'it' | 'engineering' | 'construction' | 'education';
  avatar: string;
  comment: string;
  experience: string;
  yearsExperience: number;
  education: string;
  qualifications: string[];
  availability: 'immediate' | '1_month' | '3_months';
  languages: {
    norwegian: number; // 1-5 (A1 to C2)
    english: number;
    others: { name: string; level: number }[];
  };
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum CandidateSection {
  GUIDE = 'guide',
  CONNECTIONS = 'connections',
  COACHING = 'coaching',
  LANGUAGE = 'language',
  RELOCATION = 'relocation',
  DOCUMENTS = 'documents',
  CULTURE = 'culture'
}
