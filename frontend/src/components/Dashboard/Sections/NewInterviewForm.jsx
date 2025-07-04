import React from 'react';

function NewInterviewForm({
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
    <div className="relative z-10 bg-gray-950 bg-opacity-90 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-gray-800 max-w-3xl w-full mx-auto text-left animate-fade-in-down">
      <h2 className="text-3xl font-bold text-white mb-6">Define Your Interview</h2>
      <p className="text-gray-300 mb-4">
        Tell our AI about your dream job. Specify the role, industry, required skills, and any specific areas you want to focus on.
      </p>
      <div className="space-y-4">
        <div className="mb-4">
          <label htmlFor="job-role" className="block text-gray-300 text-sm font-semibold mb-2">Job Role</label>
          <input
            type="text"
            id="job-role"
            placeholder="e.g., Software Engineer, Product Manager"
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300"
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
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300"
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
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300"
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
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300"
            value={focusAreas}
            onChange={(e) => setFocusAreas(e.target.value)}
          ></textarea>
        </div>

        {/* New: Advanced Customization Options */}
        <div className="mb-4">
          <label htmlFor="difficulty" className="block text-gray-300 text-sm font-semibold mb-2">Difficulty Level</label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-semibold mb-2">Question Types</label>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center text-gray-300">
              <input type="checkbox" value="behavioral" checked={questionTypes.includes('behavioral')} onChange={handleQuestionTypeChange} className="mr-2 accent-purple-600" /> Behavioral
            </label>
            <label className="flex items-center text-gray-300">
              <input type="checkbox" value="technical" checked={questionTypes.includes('technical')} onChange={handleQuestionTypeChange} className="mr-2 accent-purple-600" /> Technical
            </label>
            <label className="flex items-center text-gray-300">
              <input type="checkbox" value="situational" checked={questionTypes.includes('situational')} onChange={handleQuestionTypeChange} className="mr-2 accent-purple-600" /> Situational
            </label>
            <label className="flex items-center text-gray-300">
              <input type="checkbox" value="case-study" checked={questionTypes.includes('case-study')} onChange={handleQuestionTypeChange} className="mr-2 accent-purple-600" /> Case Study
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="time-limit" className="block text-gray-300 text-sm font-semibold mb-2">Time Limit (minutes)</label>
          <input
            type="number"
            id="time-limit"
            placeholder="e.g., 60"
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300"
            value={timeLimit}
            // onChange={(e) => setTimeLimit(e.target.value)}
          />
        </div>

        <div className="flex justify-end space-x-4">
            <button
              onClick={() => {setActiveSection('my-interviews-list');}} // Go back to list
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-md font-semibold h-12 px-6 py-3
                          bg-gray-700 text-white shadow-lg hover:bg-gray-600 transform transition duration-300 hover:scale-105"
            >
              Cancel
            </button>
          <button
            onClick={handleGenerateInterview}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-md font-semibold h-12 px-6 py-3
                        bg-purple-600 text-white shadow-lg hover:bg-purple-700 transform transition duration-300 hover:scale-105"
          >
            Generate Interview
          </button>
      </div>
    </div>
  </div>
  );
}

export default NewInterviewForm;