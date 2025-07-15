import React from 'react';

export default function NewInterviewForm({
  jobRole, setJobRole,
  industry, setIndustry,
  skills, setSkills,
  focusAreas, setFocusAreas,
  difficulty, setDifficulty,
  questionTypes, handleQuestionTypeChange,
  timeLimit, setTimeLimit,
  handleGenerateInterview,
  onCancel
}) {
  return (
    <div className="relative z-10 bg-gray-950 bg-opacity-90 backdrop-blur-md p-8 rounded-2xl shadow-3xl border border-gray-800 max-w-3xl w-full mx-auto text-left  transform transition-all duration-500  hover:shadow-purple-500/30">
      <h2 className="text-4xl font-extrabold text-white mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        Define Your Interview
      </h2>
      <p className="text-gray-300 mb-6 text-center text-lg">
        Tell our AI about your dream job. Specify the role, industry, required skills, and any specific areas you want to focus on.
      </p>
      <div className="space-y-6">
        {/* Form fields remain the same */}
        <div className="mb-4">
          <label htmlFor="job-role" className="block text-gray-300 text-sm font-semibold mb-2">Job Role</label>
          <input
            type="text"
            id="job-role"
            placeholder="e.g., Software Engineer, Product Manager"
            className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500
                       focus:outline-none focus:ring-3 focus:ring-purple-500 focus:border-purple-500
                       transition duration-300 shadow-inner shadow-gray-900/50" // Enhanced input style
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="industry" className="block text-gray-300 text-sm font-semibold mb-2">Industry</label>
          <input
            type="text"
            id="industry"
            placeholder="e.g., Tech, Finance, Healthcare"
            className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500
                       focus:outline-none focus:ring-3 focus:ring-purple-500 focus:border-purple-500
                       transition duration-300 shadow-inner shadow-gray-900/50"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="skills" className="block text-gray-300 text-sm font-semibold mb-2">Key Skills (comma-separated)</label>
          <input
            type="text"
            id="skills"
            placeholder="e.g., React, Python, Data Structures"
            className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500
                       focus:outline-none focus:ring-3 focus:ring-purple-500 focus:border-purple-500
                       transition duration-300 shadow-inner shadow-gray-900/50"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="focus-areas" className="block text-gray-300 text-sm font-semibold mb-2">Specific Focus Areas</label>
          <textarea
            id="focus-areas"
            rows="4"
            placeholder="e.g., Behavioral questions, System Design, Algorithms"
            className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500
                       focus:outline-none focus:ring-3 focus:ring-purple-500 focus:border-purple-500
                       transition duration-300 shadow-inner shadow-gray-900/50"
            value={focusAreas}
            onChange={(e) => setFocusAreas(e.target.value)}
          ></textarea>
        </div>
    

        {/* ... */}

        {/* Advanced Customization Options */}
        <div className="mb-4">
          <label htmlFor="difficulty" className="block text-gray-300 text-sm font-semibold mb-2">Difficulty Level</label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 text-white
                       focus:outline-none focus:ring-3 focus:ring-purple-500 focus:border-purple-500
                       transition duration-300 shadow-inner shadow-gray-900/50 appearance-none pr-8" // Added appearance-none for custom arrow
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-semibold mb-2">Question Types</label>
          <div className="flex flex-wrap gap-x-6 gap-y-3"> {/* Adjusted gap */}
            <label className="flex items-center text-gray-300 cursor-pointer">
              <input type="checkbox" value="behavioral" checked={questionTypes.includes('behavioral')} onChange={handleQuestionTypeChange} className="mr-2 w-5 h-5 rounded-md accent-purple-600 focus:ring-purple-500" /> Behavioral
            </label>
            <label className="flex items-center text-gray-300 cursor-pointer">
              <input type="checkbox" value="technical" checked={questionTypes.includes('technical')} onChange={handleQuestionTypeChange} className="mr-2 w-5 h-5 rounded-md accent-purple-600 focus:ring-purple-500" /> Technical
            </label>
            <label className="flex items-center text-gray-300 cursor-pointer">
              <input type="checkbox" value="situational" checked={questionTypes.includes('situational')} onChange={handleQuestionTypeChange} className="mr-2 w-5 h-5 rounded-md accent-purple-600 focus:ring-purple-500" /> Situational
            </label>
            <label className="flex items-center text-gray-300 cursor-pointer">
              <input type="checkbox" value="case-study" checked={questionTypes.includes('case-study')} onChange={handleQuestionTypeChange} className="mr-2 w-5 h-5 rounded-md accent-purple-600 focus:ring-purple-500" /> Case Study
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="time-limit" className="block text-gray-300 text-sm font-semibold mb-2">Time Limit (minutes)</label>
          <input
            type="number"
            id="time-limit"
            placeholder="e.g., 60"
            className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500
                       focus:outline-none focus:ring-3 focus:ring-purple-500 focus:border-purple-500
                       transition duration-300 shadow-inner shadow-gray-900/50"
            value={timeLimit}
            onChange={(e) => setTimeLimit(e.target.value)}
          />
        </div>
        
        <div className="flex justify-end space-x-4 pt-4">
          <button
            onClick={onCancel}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-md font-semibold h-12 px-8 py-3 bg-gray-700 text-white shadow-lg hover:bg-gray-600 transform transition duration-300 border border-gray-600 hover:border-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleGenerateInterview}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-md font-semibold h-12 px-8 py-3 bg-purple-700 text-white shadow-lg hover:bg-purple-500 transform transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
            Generate Interview
          </button>
        </div>
      </div>
    </div>
  );
}