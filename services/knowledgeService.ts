import { KnowledgeItem } from '../types';

const STORAGE_KEY = 'sakura_beauty_kb';

const DEFAULT_KB: KnowledgeItem[] = [
  {
    id: '1',
    category: 'Skin',
    title: 'Double Cleansing',
    content: 'In Japanese skincare, double cleansing is essential. Use an oil-based cleanser first to remove makeup and sunscreen, followed by a gentle foam cleanser.'
  },
  {
    id: '2',
    category: 'Health',
    title: 'Green Tea Benefits',
    content: 'Matcha is rich in antioxidants. Drinking green tea daily helps reduce inflammation and improves skin elasticity.'
  },
  {
    id: '3',
    category: 'Makeup',
    title: 'Natural Brows',
    content: 'Japanese beauty prefers straight, natural eyebrows that soften the facial expression compared to high arches.'
  }
];

export const getKnowledgeBase = (): KnowledgeItem[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_KB));
    return DEFAULT_KB;
  }
  return JSON.parse(stored);
};

export const addKnowledgeItem = (item: Omit<KnowledgeItem, 'id'>): KnowledgeItem => {
  const current = getKnowledgeBase();
  const newItem: KnowledgeItem = {
    ...item,
    id: Date.now().toString(),
  };
  const updated = [newItem, ...current];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return newItem;
};

export const deleteKnowledgeItem = (id: string): void => {
  const current = getKnowledgeBase();
  const updated = current.filter(item => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

// Helper to format KB for prompt injection
export const getKnowledgeBaseContext = (): string => {
  const items = getKnowledgeBase();
  return items.map(item => `[${item.category}] ${item.title}: ${item.content}`).join('\n');
};