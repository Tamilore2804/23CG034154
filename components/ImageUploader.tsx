import React, { useRef } from 'react';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  onAnalyze: () => void;
  onReset: () => void;
  imagePreview: string | null;
  isLoading: boolean;
}

const UploadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);

const ResetIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 4l16 16" />
    </svg>
);


export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, onAnalyze, onReset, imagePreview, isLoading }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
        onImageUpload(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center">
      {!imagePreview ? (
        <div 
            className="w-full h-64 border-2 border-dashed border-pink-400 rounded-lg flex flex-col justify-center items-center cursor-pointer hover:border-cyan-500 hover:bg-pink-300/50 transition-all duration-300"
            onClick={triggerFileInput}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
            <UploadIcon />
            <p className="mt-2 text-pink-700">Drag & drop an image here, or click to select</p>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
            />
        </div>
      ) : (
        <div className="w-full flex flex-col items-center space-y-4">
            <div className="w-full max-w-sm rounded-lg overflow-hidden shadow-lg border border-pink-300">
                <img src={imagePreview} alt="Preview" className="w-full h-auto object-contain max-h-80" />
            </div>
            <div className="flex space-x-4">
                <button
                    onClick={onAnalyze}
                    disabled={isLoading}
                    className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-pink-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
                >
                    {isLoading ? 'Analyzing...' : 'Analyze Emotion'}
                </button>
                 <button
                    onClick={onReset}
                    disabled={isLoading}
                    className="px-4 py-2 bg-pink-600 text-white font-semibold rounded-lg shadow-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 focus:ring-offset-pink-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center"
                >
                    <ResetIcon />
                    Reset
                </button>
            </div>
        </div>
      )}
    </div>
  );
};