import React from 'react';

export const Instructions: React.FC = () => {
  return (
    <div className="w-full max-w-2xl mt-8 p-6 bg-pink-100/30 rounded-lg border border-pink-300 text-pink-800">
      <h3 className="text-xl font-semibold text-pink-950 mb-3">How This App Works</h3>
      <p className="mb-4">
        This application demonstrates a modern, frontend-centric approach to AI-powered image analysis. Instead of a traditional Python backend (like Flask) and a separate model file, it leverages the power of Google's Gemini API directly from the browser.
      </p>
      <ul className="list-disc list-inside space-y-2">
        <li>
          <span className="font-semibold text-cyan-400">Frontend:</span> Built with React and TypeScript for a robust, interactive user experience. Styled with Tailwind CSS for a sleek, responsive design.
        </li>
        <li>
          <span className="font-semibold text-cyan-400">AI Model:</span> Utilizes the pretrained, multimodal Gemini model. When you upload an image, it's securely sent to the Gemini API for analysis.
        </li>
        <li>
          <span className="font-semibold text-cyan-400">Deployment:</span> This is a static web application. It can be easily deployed to services like Vercel, Netlify, or GitHub Pages without needing a dedicated server.
        </li>
      </ul>
      <p className="mt-4">
        This architecture simplifies development, reduces server costs, and allows for rapid prototyping of powerful AI features in a web application.
      </p>
    </div>
  );
};