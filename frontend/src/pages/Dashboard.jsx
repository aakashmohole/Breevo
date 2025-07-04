import React, { useState } from 'react';

// Custom Alert / Message Box Component (JSX inlined in showCustomAlert logic)
// This is a simplified direct DOM manipulation for demonstration within this environment.
// In a full React application, you would typically use React Portals or a global state/context
// to manage the display of such modals without direct DOM manipulation outside of React's lifecycle.
let currentAlertInstance = null;

const showCustomAlert = (message) => {
  const container = document.getElementById('custom-alert-container');
  if (!container) {
    console.error("Custom alert container not found. Using browser alert fallback.");
    alert(message);
    return;
  }

  if (currentAlertInstance) {
    container.innerHTML = '';
    currentAlertInstance = null;
  }

  container.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black opacity-50"></div>
      <div class="bg-gray-900 text-white p-6 rounded-lg shadow-xl z-10 max-w-sm w-full text-center">
        <p class="text-lg mb-6">${message}</p>
        <button id="custom-alert-ok-btn" class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full transition duration-300">
          OK
        </button>
      </div>
    </div>
  `;

  document.getElementById('custom-alert-ok-btn').onclick = () => {
    container.innerHTML = '';
    currentAlertInstance = null;
  };
  currentAlertInstance = true;
};


// Dashboard Page Component
function DashboardPage() {
  // State to manage active content section: 'new-interview', 'my-interviews-list', 'interview-detail', 'practice-modes', 'settings'
  const [activeSection, setActiveSection] = useState('new-interview');
  // State to store the ID of the selected interview for detailed view
  const [selectedInterviewId, setSelectedInterviewId] = useState(null);

  // State for 'New Interview' form fields
  const [jobRole, setJobRole] = useState('');
  const [industry, setIndustry] = useState('');
  const [skills, setSkills] = useState('');
  const [focusAreas, setFocusAreas] = useState('');
  const [difficulty, setDifficulty] = useState('medium'); // New: Difficulty
  const [questionTypes, setQuestionTypes] = useState([]); // New: Question Types
  const [timeLimit, setTimeLimit] = useState('60'); // New: Time Limit

  // State for 'Settings' form fields
  const [userName, setUserName] = useState('JohnDoe'); // Changed from username to userName
  const [userEmail, setUserEmail] = useState('john.doe@example.com'); // New: User Email
  const [notificationPreference, setNotificationPreference] = useState('all'); // New: Notification Preference
  const [reminderFrequency, setReminderFrequency] = useState('weekly'); // New: Reminder Frequency


  const handleLogout = () => {
    showCustomAlert('Logging out...');
    // Implement actual logout logic here (e.g., clear tokens, redirect to login)
  };

  const handleGenerateInterview = () => {
    showCustomAlert('Creating new interview... (Functionality not implemented)');
    console.log({ jobRole, industry, skills, focusAreas, difficulty, questionTypes, timeLimit });
    // Optionally reset form fields
    setJobRole('');
    setIndustry('');
    setSkills('');
    setFocusAreas('');
    setDifficulty('medium');
    setQuestionTypes([]);
    setTimeLimit('60');
    setActiveSection('my-interviews-list'); // Go to list after generating
  };

  const handleQuestionTypeChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setQuestionTypes([...questionTypes, value]);
    } else {
      setQuestionTypes(questionTypes.filter((type) => type !== value));
    }
  };

  // Dummy detailed recent interviews data
  const recentInterviews = [
    {
      id: 1,
      title: 'Software Engineer (Frontend)',
      date: '2025-07-01',
      score: '85%',
      recordingUrl: 'https://placehold.co/600x350/000/FFF?text=Interview+Recording', // Placeholder for video
      feedback: 'Overall strong performance with clear explanations of technical concepts. Good problem-solving approach. Your explanation of React lifecycle methods was particularly strong, demonstrating a deep understanding.',
      improvements: [
        'Improve time management for coding challenges. Consider practicing with a timer to simulate real interview pressure.',
        'Practice articulating thought process more clearly during live coding. Verbalize your steps and assumptions.',
        'Strengthen knowledge of advanced React hooks, particularly `useMemo` and `useCallback` for performance optimization.',
      ],
      transcript: "Interviewer: Tell me about a time you faced a challenging bug. \nCandidate: Sure, there was this one time... (long pause) ...where I had a state management issue in a large React app. I spent hours debugging it. \nInterviewer: How did you approach it? \nCandidate: I used console.log a lot. Eventually, I found it. It was a simple typo.",
      sentiment: { overall: 'Neutral', confidence: 'High' },
      nonVerbal: { eyeContact: 'Good (70%)', posture: 'Slightly slouched', gestures: 'Minimal' },
      keywords: { used: ['React', 'JavaScript', 'Debugging', 'State'], suggested: ['Performance', 'Scalability', 'Testing', 'CI/CD'] }
    },
    {
      id: 2,
      title: 'Product Manager (Behavioral)',
      date: '2025-06-25',
      score: '78%',
      recordingUrl: 'https://placehold.co/600x350/000/FFF?text=Interview+Recording',
      feedback: 'Demonstrated good understanding of product lifecycle. STAR method could be applied more consistently. While you provided good examples, sometimes the Situation and Task blurred together.',
      improvements: [
        'Structure behavioral answers more rigorously using STAR method (Situation, Task, Action, Result) for clarity.',
        'Provide more specific metrics for impact in past experiences. Quantify your achievements whenever possible.',
        'Work on handling ambiguous questions with a structured approach, perhaps by asking clarifying questions first.',
      ],
      transcript: "Interviewer: Describe a time you had to influence stakeholders. \nCandidate: Well, I had this idea for a new feature. I talked to the engineering team, and they weren't on board. So I just kept pushing. \nInterviewer: What was the outcome? \nCandidate: Eventually they agreed. It was good.",
      sentiment: { overall: 'Positive', confidence: 'Medium' },
      nonVerbal: { eyeContact: 'Moderate (55%)', posture: 'Upright', gestures: 'Moderate' },
      keywords: { used: ['Feature', 'Stakeholders', 'Team', 'Idea'], suggested: ['Roadmap', 'User Story', 'MVP', 'Metrics', 'Impact'] }
    },
    {
      id: 3,
      title: 'Data Scientist (Machine Learning)',
      date: '2025-06-20',
      score: '92%',
      recordingUrl: 'https://placehold.co/600x350/000/FFF?text=Interview+Recording',
      feedback: 'Excellent grasp of ML algorithms and statistical concepts. Strong communication of complex ideas. Your explanation of gradient boosting was particularly insightful.',
      improvements: [
        'Explore more advanced deployment strategies for ML models, such as MLOps pipelines and containerization.',
        'Refine explanation of bias-variance trade-off with more practical, real-world examples.',
      ],
      transcript: "Interviewer: Explain overfitting. \nCandidate: Overfitting is when a model learns the training data too well. It's like memorizing. \nInterviewer: And how do you prevent it? \nCandidate: Regularization, cross-validation. Dropout for neural networks.",
      sentiment: { overall: 'Very Positive', confidence: 'High' },
      nonVerbal: { eyeContact: 'Excellent (85%)', posture: 'Engaged', gestures: 'Expressive' },
      keywords: { used: ['ML', 'Model', 'Training', 'Algorithms', 'Data'], suggested: ['Deployment', 'Scalability', 'Interpretability', 'Fairness'] }
    },
  ];

  const getSelectedInterviewDetails = () => {
    return recentInterviews.find(interview => interview.id === selectedInterviewId);
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white font-inter">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black bg-opacity-70 backdrop-blur-sm text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center px-4 md:px-0">
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wide">AI Interviewer Dashboard</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><button onClick={handleLogout} className="text-sm md:text-base text-gray-400 hover:text-white transition duration-300">Logout</button></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 pt-16"> {/* pt-16 to account for fixed header height */}
        {/* Sidebar */}
        <aside className="w-64 bg-gray-950 border-r border-gray-800 p-6 flex flex-col items-start space-y-4 fixed h-full top-16 left-0 z-40 overflow-y-auto">
          <h2 className="text-xl font-bold text-white mb-4">Navigation</h2>
          <button
            onClick={() => { setActiveSection('new-interview'); setSelectedInterviewId(null); }}
            className={`w-full text-left py-2 px-4 rounded-lg transition duration-300 flex items-center space-x-2
              ${activeSection === 'new-interview' ? 'bg-purple-700 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus-circle"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
            <span>New Interview</span>
          </button>

          {/* Single button for Past Interviews */}
          <button
            onClick={() => { setActiveSection('my-interviews-list'); setSelectedInterviewId(null); }}
            className={`w-full text-left py-2 px-4 rounded-lg transition duration-300 flex items-center space-x-2
              ${activeSection === 'my-interviews-list' || activeSection === 'interview-detail' ? 'bg-purple-700 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-history"><path d="M3 3v5h5"/><path d="M3.05 13A9 9 0 1 0 6 18.34"/><path d="M12 10v6"/><path d="M12 10h4"/></svg>
            <span>Past Interviews</span>
          </button>

          {/* New: Practice Modes Button */}
          <button
            onClick={() => { setActiveSection('practice-modes'); setSelectedInterviewId(null); }}
            className={`w-full text-left py-2 px-4 rounded-lg transition duration-300 flex items-center space-x-2
              ${activeSection === 'practice-modes' ? 'bg-purple-700 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-dumbbell"><path d="m6.5 6.5 11 11"/><path d="m21 21-1-1"/><path d="m3 3 1 1"/><path d="m18 22 4-4"/><path d="m2 6 4-4"/><path d="m7.5 7.5 9 9"/><path d="m16.5 8.5 4 4"/><path d="m3.5 15.5 4 4"/></svg>
            <span>Practice Modes</span>
          </button>

          {/* Settings button remains */}
          <button
            onClick={() => { setActiveSection('settings'); setSelectedInterviewId(null); }}
            className={`w-full text-left py-2 px-4 rounded-lg transition duration-300 flex items-center space-x-2
              ${activeSection === 'settings' ? 'bg-purple-700 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.44.25a2 2 0 0 1-2 0l-.1-.06a2 2 0 0 0-1.73 1L4.2 7.23a2 2 0 0 0 0 2.74l.1.1a2 2 0 0 1 1.73 1L5.9 12.22a2 2 0 0 0 0 1.73l-.25.44a2 2 0 0 1-1.73 1L4.2 16.77a2 2 0 0 0 0 2.74l.1.1a2 2 0 0 1 1.73 1L6.4 20.72a2 2 0 0 0 2 0l.1-.06a2 2 0 0 1 1.73 1L11.78 22h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.44-.25a2 2 0 0 1 2 0l.1.06a2 2 0 0 0 1.73-1L19.8 16.77a2 2 0 0 0 0-2.74l-.1-.1a2 2 0 0 1-1.73-1L18.1 12.22a2 2 0 0 0 0-1.73l.25-.44a2 2 0 0 1 1.73-1L19.8 7.23a2 2 0 0 0 0-2.74l-.1-.1a2 2 0 0 1-1.73-1L17.6 3.28a2 2 0 0 0-2-0l-.1.06a2 2 0 0 1-1.73-1L12.22 2z"/><circle cx="12" cy="12" r="3"/></svg>
            <span>Settings</span>
          </button>
        </aside>

        {/* Content Panel */}
        <main className="flex-1 p-8 ml-64 overflow-y-auto relative"> {/* ml-64 to account for fixed sidebar width */}
          {/* Subtle animated background */}
          <div className="animated-gradient-bg"></div>
          <div className="absolute inset-0 bg-black opacity-40 z-0"></div> {/* Dark overlay */}

          {activeSection === 'new-interview' && (
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
                    onChange={(e) => setTimeLimit(e.target.value)}
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
          )}

          {activeSection === 'my-interviews-list' && (
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
                      onClick={() => { setActiveSection('interview-detail'); setSelectedInterviewId(interview.id); }}
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
          )}

          {activeSection === 'interview-detail' && selectedInterviewId !== null && (
            <InterviewDetail interview={getSelectedInterviewDetails()} onBackToList={() => setActiveSection('my-interviews-list')} />
          )}

          {activeSection === 'practice-modes' && (
            <div className="relative z-10 bg-gray-950 bg-opacity-90 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-gray-800 max-w-3xl w-full mx-auto text-left animate-fade-in-down">
              <h2 className="text-3xl font-bold text-white mb-6">Targeted Practice Modes</h2>
              <p className="text-gray-300 mb-6">
                Hone specific skills with focused practice sessions.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gray-800 rounded-xl border border-gray-700 flex flex-col items-start space-y-3 transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                     onClick={() => showCustomAlert('Starting Behavioral Question Practice!')}>
                  <h3 className="text-xl font-semibold text-white">Behavioral Questions</h3>
                  <p className="text-gray-400 text-sm">Practice common "tell me about a time when..." questions.</p>
                  <button onClick={(e) => { e.stopPropagation(); showCustomAlert('Starting Behavioral Practice'); }} className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-full text-sm hover:bg-purple-700 transition duration-300">Start Practice</button>
                </div>
                <div className="p-6 bg-gray-800 rounded-xl border border-gray-700 flex flex-col items-start space-y-3 transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                     onClick={() => showCustomAlert('Starting Technical Coding Practice!')}>
                  <h3 className="text-xl font-semibold text-white">Technical Coding Challenges</h3>
                  <p className="text-gray-400 text-sm">Sharpen your coding skills with timed challenges.</p>
                  <button onClick={(e) => { e.stopPropagation(); showCustomAlert('Starting Technical Practice'); }} className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-full text-sm hover:bg-purple-700 transition duration-300">Start Practice</button>
                </div>
                <div className="p-6 bg-gray-800 rounded-xl border border-gray-700 flex flex-col items-start space-y-3 transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                     onClick={() => showCustomAlert('Starting System Design Practice!')}>
                  <h3 className="text-xl font-semibold text-white">System Design Scenarios</h3>
                  <p className="text-gray-400 text-sm">Practice designing scalable systems.</p>
                  <button onClick={(e) => { e.stopPropagation(); showCustomAlert('Starting System Design Practice'); }} className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-full text-sm hover:bg-purple-700 transition duration-300">Start Practice</button>
                </div>
                <div className="p-6 bg-gray-800 rounded-xl border border-gray-700 flex flex-col items-start space-y-3 transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                     onClick={() => showCustomAlert('Exploring Question Bank!')}>
                  <h3 className="text-xl font-semibold text-white">Question Bank</h3>
                  <p className="text-gray-400 text-sm">Browse and practice individual questions.</p>
                  <button onClick={(e) => { e.stopPropagation(); showCustomAlert('Opening Question Bank'); }} className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-full text-sm hover:bg-purple-700 transition duration-300">Explore</button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'settings' && (
            <div className="relative z-10 bg-gray-950 bg-opacity-90 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-gray-800 max-w-3xl w-full mx-auto text-left animate-fade-in-down">
              <h2 className="text-3xl font-bold text-white mb-6">Settings</h2>
              <p className="text-gray-300 mb-4">
                Manage your account preferences and notification settings.
              </p>
              <div className="space-y-4">
                {/* User Profile Management */}
                <h3 className="text-2xl font-bold text-white mt-8 mb-4">Profile Information</h3>
                <div className="mb-4">
                  <label htmlFor="user-name" className="block text-gray-300 text-sm font-semibold mb-2 text-left">Name</label>
                  <input
                    type="text"
                    id="user-name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="user-email" className="block text-gray-300 text-sm font-semibold mb-2 text-left">Email</label>
                  <input
                    type="email"
                    id="user-email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300"
                  />
                </div>
                {/* Add password change option */}
                <button
                  onClick={() => showCustomAlert('Password change functionality not implemented.')}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-md font-semibold h-12 px-6 py-3
                             bg-gray-700 text-white shadow-lg hover:bg-gray-600 transform transition duration-300 hover:scale-105 w-full"
                >
                  Change Password
                </button>

                {/* Notifications and Reminders */}
                <h3 className="text-2xl font-bold text-white mt-8 mb-4">Notifications & Reminders</h3>
                <div className="mb-4">
                  <label htmlFor="notification-preference" className="block text-gray-300 text-sm font-semibold mb-2 text-left">Notification Preference</label>
                  <select
                    id="notification-preference"
                    value={notificationPreference}
                    onChange={(e) => setNotificationPreference(e.target.value)}
                    className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300"
                  >
                    <option value="all">All Notifications</option>
                    <option value="important">Important Only</option>
                    <option value="none">None</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="reminder-frequency" className="block text-gray-300 text-sm font-semibold mb-2 text-left">Reminder Frequency</label>
                  <select
                    id="reminder-frequency"
                    value={reminderFrequency}
                    onChange={(e) => setReminderFrequency(e.target.value)}
                    className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="never">Never</option>
                  </select>
                </div>

                <button
                  onClick={() => showCustomAlert('Settings saved! (Functionality not implemented)')}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-md font-semibold h-12 px-6 py-3 w-full
                             bg-purple-600 text-white shadow-lg hover:bg-purple-700 transform transition duration-300 hover:scale-105"
                >
                  Save Settings
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Custom Alert / Message Box Container */}
      <div id="custom-alert-container"></div>
    </div>
  );
}

// Interview Detail Component
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

      {/* Recording Section */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-4">Interview Recording</h3>
        <div className="w-full bg-gray-800 rounded-lg overflow-hidden border border-gray-700 aspect-video flex items-center justify-center">
          {/* Placeholder for actual video player */}
          <img src={interview.recordingUrl} alt="Interview Recording Placeholder" className="w-full h-full object-cover" />
        </div>
        <p className="text-gray-500 text-sm mt-2 text-center">Video player integration goes here.</p>
      </div>

      {/* Performance Summary */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-4">Performance Summary</h3>
        <p className="text-gray-300 leading-relaxed">{interview.feedback}</p>
      </div>

      {/* New: Transcript Analysis */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-4">Transcript Analysis</h3>
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 max-h-60 overflow-y-auto">
          <pre className="text-gray-300 whitespace-pre-wrap font-mono text-sm">{interview.transcript || 'Transcript not available.'}</pre>
        </div>
        <p className="text-gray-500 text-sm mt-2">Review your spoken responses word-for-word.</p>
      </div>

      {/* New: Tone and Sentiment Analysis */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-4">Tone & Sentiment Analysis</h3>
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <p className="text-gray-300 mb-2">Overall Sentiment: <span className="font-semibold text-purple-400">{interview.sentiment?.overall || 'N/A'}</span></p>
          <p className="text-gray-300">Confidence: <span className="font-semibold text-purple-400">{interview.sentiment?.confidence || 'N/A'}</span></p>
        </div>
        <p className="text-gray-500 text-sm mt-2">Understand the emotional tone of your responses.</p>
      </div>

      {/* New: Non-verbal Cues (Placeholder) */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-4">Non-verbal Cues</h3>
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <p className="text-gray-300 mb-2">Eye Contact: <span className="font-semibold text-purple-400">{interview.nonVerbal?.eyeContact || 'N/A'}</span></p>
          <p className="text-gray-300 mb-2">Posture: <span className="font-semibold text-purple-400">{interview.nonVerbal?.posture || 'N/A'}</span></p>
          <p className="text-gray-300">Gestures: <span className="font-semibold text-purple-400">{interview.nonVerbal?.gestures || 'N/A'}</span></p>
        </div>
        <p className="text-gray-500 text-sm mt-2">Feedback on visual aspects of your interview presence.</p>
      </div>

      {/* New: Keyword Analysis */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-4">Keyword Analysis</h3>
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <p className="text-gray-300 mb-2">Keywords Used: <span className="font-semibold text-purple-400">{interview.keywords?.used?.join(', ') || 'N/A'}</span></p>
          <p className="text-gray-300">Suggested Keywords: <span className="font-semibold text-purple-400">{interview.keywords?.suggested?.join(', ') || 'N/A'}</span></p>
        </div>
        <p className="text-gray-500 text-sm mt-2">Identify relevant terms you used and those you could add.</p>
      </div>

      {/* Key Areas to Improve */}
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


// Main App Component to render the Dashboard
export default function App() {
  return (
    <>
      {/* Tailwind CSS CDN */}
      <script src="https://cdn.tailwindcss.com"></script>
      {/* Google Fonts - Inter */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800;900&display=swap" rel="stylesheet" />

      <style>
        {`
        body {
          font-family: 'Inter', sans-serif;
          margin: 0;
          padding: 0;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          background-color: #000; /* Ensures the base background is black */
          color: #fff; /* Default text color */
          /* Removed overflow: hidden; */
        }

        /* Animated Background */
        .animated-gradient-bg {
          background: linear-gradient(-45deg, #1a202c, #2d3748, #4a0e4b, #6b21a8);
          background-size: 400% 400%;
          animation: gradient-animation 15s ease infinite;
          position: fixed; /* Use fixed to cover entire viewport without scrolling */
          inset: 0;
          z-index: -1;
          opacity: 0.7; /* Make it subtle */
        }

        @keyframes gradient-animation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Animation for form appearance */
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in-down {
          animation: fadeInDown 0.5s ease-out forwards;
        }
        `}
      </style>

      <DashboardPage />
    </>
  );
}
