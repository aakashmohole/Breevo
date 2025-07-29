const InterviewDetailsModal = ({ interview, onClose, onStartCall }) => {
  if (!interview) return null;

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'hard':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm">
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-md w-full text-white shadow-xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-600 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-600 rounded-full filter blur-3xl opacity-20"></div>
        
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors duration-200 z-10"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative z-0">
          <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            {interview.job_role} Interview
          </h2>

          <div className="space-y-3 mb-6 text-sm">
            <div className="flex justify-between items-center bg-gray-800 p-3 rounded-lg border border-gray-700">
              <span className="text-gray-400">Industry:</span>
              <span className="text-blue-300 font-medium">{interview.industry}</span>
            </div>
            <div className="flex justify-between items-center bg-gray-800 p-3 rounded-lg border border-gray-700">
              <span className="text-gray-400">Difficulty:</span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${getDifficultyColor(interview.difficulty)}`}
              >
                {interview.difficulty}
              </span>
            </div>
            <div className="flex justify-between items-center bg-gray-800 p-3 rounded-lg border border-gray-700">
              <span className="text-gray-400">Time Limit:</span>
              <span className="text-orange-300 font-medium">{interview.time_limit} mins</span>
            </div>
            
            {interview.key_skills && (
              <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                <span className="text-gray-400 block mb-1.5">Key Skills:</span>
                <div className="flex flex-wrap gap-1.5">
                  {interview.key_skills.split(',').map((skill, index) => (
                    <span key={index} className="bg-purple-900/60 text-purple-200 px-2 py-0.5 rounded-full text-xs border border-purple-800/50">
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {interview.focus_areas && (
              <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                <span className="text-gray-400 block mb-1.5">Focus Areas:</span>
                <div className="flex flex-wrap gap-1.5">
                  {interview.focus_areas.split(',').map((area, index) => (
                    <span key={index} className="bg-teal-900/60 text-teal-200 px-2 py-0.5 rounded-full text-xs border border-teal-800/50">
                      {area.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {interview.question_types && (
              <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                <span className="text-gray-400 block mb-1.5">Question Types:</span>
                <div className="flex flex-wrap gap-1.5">
                  {interview.question_types.split(',').map((type, index) => (
                    <span key={index} className="bg-indigo-900/60 text-indigo-200 px-2 py-0.5 rounded-full text-xs border border-indigo-800/50">
                      {type.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-sm font-medium transition-all duration-200 border border-gray-700 hover:border-gray-600"
            >
              Go Back
            </button>
            <button
              onClick={onStartCall}
              className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-sm font-medium transition-all duration-200 shadow-md hover:shadow-purple-500/20"
            >
              Start Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewDetailsModal;