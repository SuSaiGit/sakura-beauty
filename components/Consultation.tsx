import React, { useState } from 'react';
import { Camera } from './Camera';
import { AnalysisResult } from './AnalysisResult';
import { analyzeImage } from '../services/geminiService';
import { AnalysisResponse } from '../types';
import { Camera as CameraIcon, Upload, Loader2, Sparkles } from 'lucide-react';

export const Consultation: React.FC = () => {
  const [mode, setMode] = useState<'intro' | 'camera' | 'upload' | 'analyzing' | 'result'>('intro');
  const [analysisData, setAnalysisData] = useState<AnalysisResponse | null>(null);
  
  // File upload handler
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        // remove data:image/jpeg;base64, prefix
        const base64 = result.split(',')[1];
        processImage(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async (base64: string) => {
    setMode('analyzing');
    try {
      const result = await analyzeImage(base64);
      setAnalysisData(result);
      setMode('result');
    } catch (error) {
      console.error(error);
      alert("Failed to analyze image. Please try again.");
      setMode('intro');
    }
  };

  const reset = () => {
    setAnalysisData(null);
    setMode('intro');
  };

  // 1. Loading View
  if (mode === 'analyzing') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-6 text-sakura-800">
        <div className="relative">
          <div className="absolute inset-0 bg-sakura-200 rounded-full animate-ping opacity-75"></div>
          <div className="relative bg-white p-4 rounded-full shadow-lg">
             <Sparkles size={48} className="animate-spin-slow text-sakura-400" />
          </div>
        </div>
        <h3 className="text-xl font-serif animate-pulse">Consulting the AI...</h3>
        <p className="text-stone-500">Analyzing skin texture and features</p>
      </div>
    );
  }

  // 2. Result View
  if (mode === 'result' && analysisData) {
    return <AnalysisResult data={analysisData} onReset={reset} />;
  }

  // 3. Camera View
  if (mode === 'camera') {
    return <Camera onCapture={processImage} onCancel={() => setMode('intro')} />;
  }

  // 4. Intro/Selection View
  return (
    <div className="flex flex-col items-center justify-center space-y-12 animate-fade-in py-12">
      
      <div className="text-center space-y-4 max-w-lg">
        <h2 className="text-4xl font-serif text-stone-800">
          Begin Your Journey
        </h2>
        <p className="text-stone-500 leading-relaxed">
          Allow us to analyze your features to provide personalized, Japanese-inspired beauty and health advice.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl px-4">
        
        {/* Camera Option */}
        <button 
          onClick={() => setMode('camera')}
          className="group relative flex flex-col items-center p-8 bg-white border border-stone-200 rounded-2xl hover:border-sakura-300 hover:shadow-xl hover:shadow-sakura-100 transition-all duration-300"
        >
          <div className="w-16 h-16 bg-sakura-50 text-sakura-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <CameraIcon size={32} />
          </div>
          <h3 className="text-lg font-serif text-stone-700">Take Photo</h3>
          <p className="text-sm text-stone-400 mt-2">Use your camera</p>
        </button>

        {/* Upload Option */}
        <div className="relative group">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileUpload} 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div className="flex flex-col items-center p-8 bg-white border border-stone-200 rounded-2xl group-hover:border-sakura-300 group-hover:shadow-xl group-hover:shadow-sakura-100 transition-all duration-300">
            <div className="w-16 h-16 bg-stone-50 text-stone-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Upload size={32} />
            </div>
            <h3 className="text-lg font-serif text-stone-700">Upload Photo</h3>
            <p className="text-sm text-stone-400 mt-2">From your gallery</p>
          </div>
        </div>

      </div>

      <div className="text-xs text-stone-400 max-w-md text-center">
        * Your photos are processed privately for analysis and are not stored permanently.
      </div>
    </div>
  );
};