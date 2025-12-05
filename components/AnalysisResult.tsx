import React from 'react';
import { AnalysisResponse } from '../types';
import { Sparkles, Heart, Leaf, Star } from 'lucide-react';

interface AnalysisResultProps {
  data: AnalysisResponse;
  onReset: () => void;
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({ data, onReset }) => {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-8 animate-fade-in-up pb-12">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-serif text-sakura-800">Your Beauty Prescription</h2>
        <p className="text-stone-500 italic">" {data.overallImpression} "</p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Skin Analysis Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-sakura-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Sparkles size={64} className="text-sakura-400" />
          </div>
          <h3 className="text-xl font-serif text-sakura-800 mb-4 flex items-center gap-2">
            <Sparkles size={20} /> Skin Analysis
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between border-b border-stone-100 pb-2">
              <span className="text-stone-500">Tone</span>
              <span className="font-medium text-stone-700">{data.skinAnalysis.tone}</span>
            </div>
            <div className="flex justify-between border-b border-stone-100 pb-2">
              <span className="text-stone-500">Texture</span>
              <span className="font-medium text-stone-700">{data.skinAnalysis.texture}</span>
            </div>
            <div className="pt-2">
              <span className="text-stone-500 block mb-1">Focus Areas:</span>
              <div className="flex flex-wrap gap-2">
                {data.skinAnalysis.concerns.map((c, i) => (
                  <span key={i} className="px-3 py-1 bg-sakura-50 text-sakura-800 text-sm rounded-full">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Beauty Advice Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-sakura-100 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10">
            <Star size={64} className="text-yellow-400" />
          </div>
          <h3 className="text-xl font-serif text-stone-700 mb-4 flex items-center gap-2">
             <Star size={20} className="text-yellow-500" /> Beauty Routine
          </h3>
          <div className="space-y-4">
             <div>
                <h4 className="font-medium text-sakura-800 mb-2 text-sm uppercase tracking-wide">Skincare</h4>
                <ul className="list-disc list-inside text-stone-600 text-sm space-y-1 marker:text-sakura-300">
                  {data.beautyAdvice.skincareRoutine.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
             </div>
             <div>
                <h4 className="font-medium text-sakura-800 mb-2 text-sm uppercase tracking-wide">Makeup</h4>
                <ul className="list-disc list-inside text-stone-600 text-sm space-y-1 marker:text-sakura-300">
                  {data.beautyAdvice.makeupTips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
             </div>
          </div>
        </div>

        {/* Health & Lifestyle Card */}
        <div className="md:col-span-2 bg-gradient-to-br from-matcha-50 to-white p-6 rounded-xl shadow-sm border border-matcha-100">
          <h3 className="text-xl font-serif text-matcha-800 mb-4 flex items-center gap-2">
            <Leaf size={20} /> Inner Health & Lifestyle
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
               <h4 className="font-medium text-matcha-800 mb-2 flex items-center gap-2">
                 <Heart size={16} /> Dietary
               </h4>
               <ul className="space-y-2">
                 {data.healthAdvice.dietary.map((tip, i) => (
                   <li key={i} className="flex gap-2 text-stone-600 text-sm">
                     <span className="text-matcha-500">•</span> {tip}
                   </li>
                 ))}
               </ul>
            </div>
             <div>
               <h4 className="font-medium text-matcha-800 mb-2">Lifestyle Habits</h4>
               <ul className="space-y-2">
                 {data.healthAdvice.lifestyle.map((tip, i) => (
                   <li key={i} className="flex gap-2 text-stone-600 text-sm">
                     <span className="text-matcha-500">•</span> {tip}
                   </li>
                 ))}
               </ul>
            </div>
          </div>
        </div>

      </div>

      <div className="flex justify-center pt-8">
        <button 
          onClick={onReset}
          className="px-8 py-3 bg-stone-800 text-stone-50 rounded-full hover:bg-sakura-500 transition-colors shadow-lg font-serif tracking-widest"
        >
          NEW CONSULTATION
        </button>
      </div>

    </div>
  );
};