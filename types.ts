export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  imageUrl: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  period?: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
}

export enum GeneratorState {
  IDLE = 'IDLE',
  GENERATING_OUTLINE = 'GENERATING_OUTLINE',
  GENERATING_CONTENT = 'GENERATING_CONTENT',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}

export interface GeneratedEbook {
  title: string;
  content: string; // Markdown content
  coverStyle: string;
}