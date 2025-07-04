import React from 'react';
import { showCustomAlert } from '../../../utils/showCustomAlert';

function PracticeModesSection() {
  return (
    <div className="relative z-10 bg-gray-950 bg-opacity-90 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-gray-800 max-w-3xl w-full mx-auto text-left animate-fade-in-down">
      <h2 className="text-3xl font-bold text-white mb-6">Targeted Practice Modes</h2>
      <p className="text-gray-300 mb-6">
        Hone specific skills with focused practice sessions.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          className="p-6 bg-gray-800 rounded-xl border border-gray-700 flex flex-col items-start space-y-3 transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
          onClick={() => showCustomAlert('Starting Behavioral Question Practice!', 'info')}
        >
          <h3 className="text-xl font-semibold text-white">Behavioral Questions</h3>
          <p className="text-gray-400 text-sm">Practice common "tell me about a time when..." questions.</p>
          <button 
            onClick={(e) => { e.stopPropagation(); showCustomAlert('Starting Behavioral Practice', 'info'); }} 
            className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-full text-sm hover:bg-purple-700 transition duration-300"
          >
            Start Practice
          </button>
        </div>
        
        <div 
          className="p-6 bg-gray-800 rounded-xl border border-gray-700 flex flex-col items-start space-y-3 transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
          onClick={() => showCustomAlert('Starting Technical Coding Practice!', 'info')}
        >
          <h3 className="text-xl font-semibold text-white">Technical Coding Challenges</h3>
          <p className="text-gray-400 text-sm">Sharpen your coding skills with timed challenges.</p>
          <button 
            onClick={(e) => { e.stopPropagation(); showCustomAlert('Starting Technical Practice', 'info'); }} 
            className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-full text-sm hover:bg-purple-700 transition duration-300"
          >
            Start Practice
          </button>
        </div>

        <div 
          className="p-6 bg-gray-800 rounded-xl border border-gray-700 flex flex-col items-start space-y-3 transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
          onClick={() => showCustomAlert('Starting System Design Practice!', 'info')}
        >
          <h3 className="text-xl font-semibold text-white">System Design Scenarios</h3>
          <p className="text-gray-400 text-sm">Practice designing scalable systems.</p>
          <button 
            onClick={(e) => { e.stopPropagation(); showCustomAlert('Starting System Design Practice', 'info'); }} 
            className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-full text-sm hover:bg-purple-700 transition duration-300"
          >
            Start Practice
          </button>
        </div>

        <div 
          className="p-6 bg-gray-800 rounded-xl border border-gray-700 flex flex-col items-start space-y-3 transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
          onClick={() => showCustomAlert('Exploring Question Bank!', 'info')}
        >
          <h3 className="text-xl font-semibold text-white">Question Bank</h3>
          <p className="text-gray-400 text-sm">Browse and practice individual questions.</p>
          <button 
            onClick={(e) => { e.stopPropagation(); showCustomAlert('Opening Question Bank', 'info'); }} 
            className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-full text-sm hover:bg-purple-700 transition duration-300"
          >
            Explore
          </button>
        </div>
      </div>
    </div>
  );
}

export default PracticeModesSection;