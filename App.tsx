import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { EmotionResult } from './components/EmotionResult';
import { Instructions } from './components/Instructions';
import { analyzeImageEmotion } from './services/geminiService';
import type { EmotionAnalysis } from './types';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<EmotionAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
      setAnalysis(null);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = useCallback(async () => {
    if (!image) return;

    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      // The base64 string includes the data URL prefix, which we need to remove.
      const base64Data = image.split(',')[1];
      const result = await analyzeImageEmotion(base64Data);
      setAnalysis(result);
    } catch (err) {
      console.error(err);
      setError('Failed to analyze the image. The AI may be experiencing high traffic. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [image]);

  const handleReset = () => {
    setImage(null);
    setAnalysis(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-pink-200 text-pink-900 flex flex-col font-sans">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-2xl bg-pink-100/50 backdrop-blur-sm rounded-2xl shadow-2xl shadow-cyan-500/10 border border-pink-300 overflow-hidden">
          <div className="p-6 sm:p-8">
            <ImageUploader 
              onImageUpload={handleImageUpload} 
              onAnalyze={handleAnalyze} 
              onReset={handleReset}
              imagePreview={image}
              isLoading={isLoading}
            />
            {error && <p className="text-red-500 text-center mt-4 animate-pulse">{error}</p>}
            <EmotionResult result={analysis} isLoading={isLoading} />
          </div>
        </div>
        <Instructions />
      </main>
      <Footer />
    </div>
  );
};

export default App;