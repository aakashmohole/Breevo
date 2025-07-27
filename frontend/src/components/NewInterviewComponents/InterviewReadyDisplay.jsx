import React from 'react';
import { useState } from 'react';
import PracticeModesSection from '../Dashboard/Sections/PracticeModesSection';
import {useNavigate} from 'react-router-dom';

export default function InterviewReadyDisplay() {

 const [showPractice, setShowPractice] = useState(false);

  const handleStartPractice = () => {
    setShowPractice(true);
  };

  if (showPractice) {
    return <PracticeModesSection />;
  }
  return (
    <>
      {/* CSS for the SVG animations */}
      <style>
        {`
        @keyframes drawCircle {
          0% {
            stroke-dasharray: 0 283; /* 2 * PI * 45 (radius) = ~282.74 */
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dasharray: 283 283;
            stroke-dashoffset: 0;
          }
        }

        @keyframes drawCheckmark {
          0% {
            stroke-dasharray: 0 100; /* Approximate length of the checkmark path */
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dasharray: 100 100;
            stroke-dashoffset: 0;
          }
        }

        .animate-draw-circle {
          animation: drawCircle 1s ease-out forwards;
        }

        .animate-draw-checkmark {
          animation: drawCheckmark 0.6s ease-out forwards 0.8s; /* Starts after circle, shorter duration */
        }

        @keyframes fadeInDown {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-down {
          animation: fadeInDown 0.7s ease-out forwards;
        }
        `}
      </style>

      {/* Main container for the display, styled for a professional, clean look. */}
      {/* Uses a darker background, subtle border, rounded corners, and a soft shadow. */}
      {/* Includes transition for hover effects and an initial fade-in animation. */}
      <div className="relative z-10 bg-gray-900 border border-gray-700 rounded-xl shadow-xl p-10 max-w-xl mx-auto text-center transform transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl animate-fade-in-down">
        <div className="flex flex-col items-center justify-center">
          {/* Success Icon: A visually appealing SVG checkmark within a circle. */}
          {/* Adjusted size and stroke color for better integration with the new theme (Apple-inspired). */}
          <div className="relative w-28 h-28 mb-7">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* Circle animation for drawing effect, now in a subtle cool gray */}
              <circle cx="50" cy="50" r="45" fill="none" stroke="#A0A0A0" strokeWidth="5" className="animate-draw-circle" />
              {/* Checkmark animation for drawing effect, now in a subtle cool gray */}
              <path d="M30 50 L45 65 L70 35" fill="none" stroke="#A0A0A0" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="animate-draw-checkmark" />
            </svg>
          </div>

          {/* Heading: Prominent and engaging title. */}
          {/* Uses a larger font size and a refined, cooler gradient for a modern, clean aesthetic. */}
          <h2 className="text-5xl font-extrabold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-blue-300">
            You're All Set!
          </h2>

          {/* Subtitle/Description: Provides clear context to the user. */}
          {/* Uses a slightly larger text size and relaxed line height for readability. */}
          <p className="text-gray-300 mb-9 text-lg leading-relaxed">
            Your personalized interview questions have been successfully generated. Let's begin your practice session in Live Interviews Tab!
          </p>

          {/* Action Buttons: Grouped for better layout and user interaction. */}
          <div className="flex flex-col space-y-4 w-full px-4">
            {/* Primary Call to Action Button: "Start Practice Interview" */}
            {/* Styled with a subtle blue/gray gradient, larger size, and a refined hover effect. */}
            <button
              onClick={handleStartPractice}
              className="inline-flex items-center justify-center rounded-full text-xl font-semibold h-16 px-8 bg-gradient-to-r from-blue-500 to-gray-600 text-white shadow-lg hover:from-blue-600 hover:to-gray-700 transform transition duration-300 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              {/* Play icon for visual cue */}
              <svg className="w-7 h-7 mr-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Start Practice Interview
            </button>

            {/* Secondary Action Button: "Go back to make changes" */}
            {/* Styled subtly to not overshadow the primary button, with a clear hover state. */}
            
          </div>
        </div>
      </div>
    </>
  );
}
