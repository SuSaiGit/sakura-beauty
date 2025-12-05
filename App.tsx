import React, { useState } from 'react';
import { ViewState } from './types';
import { Consultation } from './components/Consultation';
import { KnowledgeBaseManager } from './components/KnowledgeBaseManager';
import { Sparkles, BookOpen, Flower } from 'lucide-react';

export default function App() {
  const [view, setView] = useState<ViewState>(ViewState.HOME);

  const renderContent = () => {
    switch (view) {
      case ViewState.CONSULT:
        return <Consultation />;
      case ViewState.KNOWLEDGE_BASE:
        return <KnowledgeBaseManager />;
      case ViewState.HOME:
      default:
        return (
          <div className="flex flex-col items-center text-center space-y-8 animate-fade-in max-w-2xl mx-auto pt-10">
            <div className="w-24 h-24 bg-sakura-100 rounded-full flex items-center justify-center mb-4">
              <Flower size={48} className="text-sakura-500" />
            </div>
            <h1 className="text-5xl font-serif text-stone-800 tracking-tight">
              Sakura <span className="text-sakura-500">Beauty</span>
            </h1>
            <p className="text-lg text-stone-600 font-light max-w-lg">
              Discover your personal beauty potential through the lens of Japanese aesthetics and AI analysis.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full justify-center">
              <button 
                onClick={() => setView(ViewState.CONSULT)}
                className="flex items-center justify-center gap-3 px-8 py-4 bg-stone-800 text-stone-50 rounded-full hover:bg-sakura-500 transition-all duration-300 shadow-lg text-lg font-serif"
              >
                <Sparkles size={20} />
                Start Consultation
              </button>
              
              <button 
                onClick={() => setView(ViewState.KNOWLEDGE_BASE)}
                className="flex items-center justify-center gap-3 px-8 py-4 bg-white border border-stone-200 text-stone-700 rounded-full hover:border-sakura-300 hover:text-sakura-600 transition-all duration-300 text-lg font-serif"
              >
                <BookOpen size={20} />
                Knowledge Base
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800 selection:bg-sakura-200 selection:text-sakura-900">
      
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-100">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <button 
            onClick={() => setView(ViewState.HOME)}
            className="flex items-center gap-2 font-serif font-bold text-xl hover:text-sakura-500 transition-colors"
          >
            <Flower className="text-sakura-400" />
            <span>SakuraAI</span>
          </button>

          <div className="flex gap-6 text-sm font-medium text-stone-500">
            <button 
              onClick={() => setView(ViewState.CONSULT)}
              className={`hover:text-sakura-600 transition-colors ${view === ViewState.CONSULT ? 'text-sakura-600' : ''}`}
            >
              Consult
            </button>
            <button 
              onClick={() => setView(ViewState.KNOWLEDGE_BASE)}
              className={`hover:text-sakura-600 transition-colors ${view === ViewState.KNOWLEDGE_BASE ? 'text-sakura-600' : ''}`}
            >
              Knowledge
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 py-8 min-h-[calc(100vh-4rem)] flex flex-col justify-center">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-stone-400 text-xs border-t border-stone-100">
        <p>© {new Date().getFullYear()} Sakura Beauty Consultant. AI generated advice.</p>
      </footer>
    </div>
  );
}