export interface KnowledgeItem {
  id: string;
  category: 'Skin' | 'Makeup' | 'Health' | 'General';
  title: string;
  content: string;
}

export interface AnalysisResponse {
  skinAnalysis: {
    tone: string;
    texture: string;
    concerns: string[];
  };
  beautyAdvice: {
    makeupTips: string[];
    skincareRoutine: string[];
  };
  healthAdvice: {
    dietary: string[];
    lifestyle: string[];
  };
  overallImpression: string;
}

export enum ViewState {
  HOME = 'HOME',
  CONSULT = 'CONSULT',
  KNOWLEDGE_BASE = 'KNOWLEDGE_BASE',
}