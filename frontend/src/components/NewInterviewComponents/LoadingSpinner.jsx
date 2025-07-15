'use client';
import React from 'react';
import { MultiStepLoader } from '../ui/multi-step-loader';

export default function LoadingSpinner() {
  const loadingStates = [
    { text: "Reading your inputs" },
    { text: "Reformatting for OpenRouter" },
    { text: "Sending to OpenRouter" },
    { text: "OpenRouter sending to ChatGPT" },
    { text: "OpenRouter sending to Deepseek" },
    { text: "OpenRouter sending to LLaMA3" },
    { text: "Generating questions" },
    { text: "Finalizing interview" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-4">
      {/* MultiStepLoader core */}
      <MultiStepLoader loadingStates={loadingStates} loading={true} duration={5000} />
      
      {/* Spinner design */}
      <div className="relative flex items-center justify-center mt-16">
        <div className="animate-spin-slow rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500 absolute"></div>
        <div className="animate-spin-reverse rounded-full h-24 w-24 border-t-4 border-b-4 border-pink-500 absolute"></div>
        <div className="animate-pulse text-6xl">✨</div>
      </div>

    </div>
  );
}
