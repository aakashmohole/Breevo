import React from 'react';

function InterviewDetail({ interview, onBackToList }) {
  if (!interview) {
    return (
      <div className="relative z-10 bg-gray-950 bg-opacity-90 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-gray-800 max-w-3xl w-full mx-auto text-left animate-fade-in-down">
        <h2 className="text-3xl font-bold text-white mb-6">Interview Not Found</h2>
        <p className="text-gray-300 mb-4">The selected interview could not be found.</p>
        <button
          onClick={onBackToList}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-md font-semibold h-12 px-6 py-3
                     bg-purple-600 text-white shadow-lg hover:bg-purple-700 transform transition duration-300 hover:scale-105"
        >
          Back to Interviews
        </button>
      </div>
    );
  }

  return (
    <div className="relative z-10 bg-gray-950 bg-opacity-90 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-gray-800 max-w-3xl w-full mx-auto text-left animate-fade-in-down">
      <h2 className="text-4xl font-bold text-white mb-6">{interview.title}</h2>
      <p className="text-gray-400 text-lg mb-4">Date: {interview.date} | Score: <span className="text-purple-400">{interview.score}</span></p>

      <div className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-4">Interview Recording</h3>
        <div className="w-full bg-gray-800 rounded-lg overflow-hidden border border-gray-700 aspect-video flex items-center justify-center">
          <img src={interview.recordingUrl} alt="Interview Recording Placeholder" className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-4">Performance Summary</h3>
        <p className="text-gray-300 leading-relaxed">{interview.feedback}</p>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-4">Transcript Analysis</h3>
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 max-h-60 overflow-y-auto">
          <pre className="text-gray-300 whitespace-pre-wrap font-mono text-sm">{interview.transcript || 'Transcript not available.'}</pre>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-4">Tone & Sentiment Analysis</h3>
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <p className="text-gray-300 mb-2">Overall Sentiment: <span className="font-semibold text-purple-400">{interview.sentiment?.overall || 'N/A'}</span></p>
          <p className="text-gray-300">Confidence: <span className="font-semibold text-purple-400">{interview.sentiment?.confidence || 'N/A'}</span></p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-4">Non-verbal Cues</h3>
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <p className="text-gray-300 mb-2">Eye Contact: <span className="font-semibold text-purple-400">{interview.nonVerbal?.eyeContact || 'N/A'}</span></p>
          <p className="text-gray-300 mb-2">Posture: <span className="font-semibold text-purple-400">{interview.nonVerbal?.posture || 'N/A'}</span></p>
          <p className="text-gray-300">Gestures: <span className="font-semibold text-purple-400">{interview.nonVerbal?.gestures || 'N/A'}</span></p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-4">Keyword Analysis</h3>
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <p className="text-gray-300 mb-2">Keywords Used: <span className="font-semibold text-purple-400">{interview.keywords?.used?.join(', ') || 'N/A'}</span></p>
          <p className="text-gray-300">Suggested Keywords: <span className="font-semibold text-purple-400">{interview.keywords?.suggested?.join(', ') || 'N/A'}</span></p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-4">Key Areas to Improve</h3>
        {interview.improvements && interview.improvements.length > 0 ? (
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            {interview.improvements.map((item, index) => (
              <li key={index} className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle text-purple-400 mr-2 mt-1 flex-shrink-0"><path d="M22 11.08V12a10 10 0 1 1-5.93-8.5"/><path d="m11 12 2 2 4-4"/></svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No specific improvement areas identified.</p>
        )}
      </div>

      <button
        onClick={onBackToList}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-md font-semibold h-12 px-6 py-3
                   bg-purple-600 text-white shadow-lg hover:bg-purple-700 transform transition duration-300 hover:scale-105"
      >
        Back to Interviews
      </button>
    </div>
  );
}

export default InterviewDetail;