import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center p-6 bg-pink-200/50 backdrop-blur-sm border-b border-pink-300">
      <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
        AI Emotion Detector
      </h1>
      <p className="text-lg text-pink-800 mt-2">
        Unlock the feelings behind the pixels with Gemini AI
      </p>
    </header>
  );
};