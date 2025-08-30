import React from 'react';
import { getCompletedInterviews } from '../../../api/api';
import { useQuery } from '@tanstack/react-query';

function PastInterviewsList({ onSelectInterview }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['completedInterviews'],
    queryFn: getCompletedInterviews,
  });

  const recentInterviews = data?.data || [];

  return (
    <div className="relative z-10 bg-[#0d0d0d] bg-opacity-90 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-gray-800 max-w-6xl w-full mx-auto text-left animate-fade-in-down">
      <h2 className="text-4xl font-extrabold text-white mb-6 tracking-wide">🧾 My Past Interviews</h2>
      <p className="text-gray-400 mb-6 text-lg">Tap a card to see feedback & insights!</p>

      {isLoading ? (
        <p className="text-gray-400">Loading...</p>
      ) : isError ? (
        <p className="text-red-400">❌ Failed to fetch interviews: {error.message}</p>
      ) : recentInterviews.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentInterviews.map((interview) => (
            <div
              key={interview.id}
              className="relative group p-6 rounded-2xl border border-purple-700 bg-gradient-to-br from-gray-900 to-gray-800 hover:from-gray-800 hover:to-black hover:border-purple-500 transition-all shadow-xl hover:shadow-purple-600/50 cursor-pointer overflow-hidden"
              onClick={() => onSelectInterview(interview.id)}
            >
              <div className="absolute top-0 right-0 p-2 text-xs bg-purple-600 text-white rounded-bl-lg">#{interview.id}</div>

              <h3 className="text-xl font-bold text-white mb-2">
                🎤 {interview.job_role || 'Untitled Interview'}
              </h3>
              <p className="text-gray-300 text-sm mb-1">💼 Role: <span className="text-white">{interview.job_role || 'N/A'}</span></p>
              <p className="text-gray-300 text-sm mb-1">🏢 Company: <span className="text-white">{interview.industry || 'N/A'}</span></p>
              <p className="text-gray-300 text-sm mb-4">📅 Date: <span className="text-white">{interview.created_at ? new Date(interview.created_at).toLocaleDateString() : 'N/A'}</span></p>

              <div className="flex justify-between items-center mt-4">
                <span className="bg-purple-700 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  ⭐ Score: {interview.score ?? 'N/A'}
                </span>
                <span className="text-xs text-gray-500 group-hover:text-purple-400 transition">View Details →</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No past interviews found. Try giving one!</p>
      )}
    </div>
  );
}

export default PastInterviewsList;
