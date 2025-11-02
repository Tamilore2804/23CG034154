import React from 'react';
import type { EmotionAnalysis } from '../types';

interface EmotionResultProps {
  result: EmotionAnalysis | null;
  isLoading: boolean;
}

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center space-x-2">
    <div className="w-4 h-4 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0s' }}></div>
    <div className="w-4 h-4 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
    <div className="w-4 h-4 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
  </div>
);

export const EmotionResult: React.FC<EmotionResultProps> = ({ result, isLoading }) => {
  if (isLoading) {
    return (
      <div className="mt-8 text-center p-6 bg-pink-100/50 rounded-lg">
        <LoadingSpinner />
        <p className="mt-4 text-lg text-pink-800">The AI is analyzing the image...</p>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <div className="mt-8 text-center p-6 bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg border border-pink-300 animate-fade-in">
      <h2 className="text-2xl font-semibold text-pink-900">Analysis Result</h2>
      <p className="text-5xl font-bold my-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
        {result.emotion}
      </p>
      <p className="text-lg text-pink-800 max-w-md mx-auto">
        {result.description}
      </p>
    </div>
  );
};