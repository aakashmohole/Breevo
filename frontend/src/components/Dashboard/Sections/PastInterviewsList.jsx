import React from 'react';

function PastInterviewsList({ recentInterviews, onSelectInterview }) {
  return (
    <div className="relative z-10 bg-gray-950 bg-opacity-90 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-gray-800 max-w-3xl w-full mx-auto text-left animate-fade-in-down">
      <h2 className="text-3xl font-bold text-white mb-6">My Past Interviews</h2>
      <p className="text-gray-300 mb-4">
        Click on an interview to review its details and feedback.
      </p>
      {recentInterviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentInterviews.map((interview) => (
            <div
              key={interview.id}
              className="p-6 bg-gray-800 rounded-xl border border-gray-700 flex flex-col justify-between transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
              onClick={() => onSelectInterview(interview.id)}
            >
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{interview.title}</h3>
                <p className="text-gray-400 text-sm mb-3">Date: {interview.date}</p>
                <p className="text-gray-300 text-lg font-medium">Score: <span className="text-purple-400">{interview.score}</span></p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No past interviews to display. Start a new one!</p>
      )}
    </div>
  );
}

export default PastInterviewsList;