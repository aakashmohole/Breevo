import React from 'react';

function DashboardSidebar({ activeSection, setActiveSection }) {
  return (
    <aside className="w-64 bg-gray-950 border-r border-gray-800 p-6 flex flex-col items-start space-y-4 fixed h-full top-16 left-0 z-40 overflow-y-auto">
      <h2 className="text-xl font-bold text-white mb-4">Navigation</h2>
      <button
        onClick={() => setActiveSection('dashboard')}
        className={`w-full text-left py-2 px-4 rounded-lg transition duration-300 flex items-center space-x-2
          ${activeSection === 'dashboard' ? 'bg-purple-700 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-dashboard">
          <rect x="3" y="3" width="7" height="9" />
          <rect x="14" y="3" width="7" height="5" />
          <rect x="14" y="12" width="7" height="9" />
          <rect x="3" y="16" width="7" height="5" />
        </svg>

        <span>Dashboard</span>
      </button>

      <button
        onClick={() => setActiveSection('new-interview')}
        className={`w-full text-left py-2 px-4 rounded-lg transition duration-300 flex items-center space-x-2
          ${activeSection === 'new-interview' || activeSection === 'interview-detail' ? 'bg-purple-700 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus-circle"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
        <span>New Interview</span>
      </button>

      <button
        onClick={() => setActiveSection('my-interviews-list')}
        className={`w-full text-left py-2 px-4 rounded-lg transition duration-300 flex items-center space-x-2
          ${activeSection === 'my-interviews-list' || activeSection === 'interview-detail' ? 'bg-purple-700 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-history"><path d="M3 3v5h5"/><path d="M3.05 13A9 9 0 1 0 6 18.34"/><path d="M12 10v6"/><path d="M12 10h4"/></svg>
        <span>Past Interviews</span>
      </button>

      <button
        onClick={() => setActiveSection('practice-modes')}
        className={`w-full text-left py-2 px-4 rounded-lg transition duration-300 flex items-center space-x-2
          ${activeSection === 'practice-modes' ? 'bg-purple-700 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-dumbbell"><path d="m6.5 6.5 11 11"/><path d="m21 21-1-1"/><path d="m3 3 1 1"/><path d="m18 22 4-4"/><path d="m2 6 4-4"/><path d="m7.5 7.5 9 9"/><path d="m16.5 8.5 4 4"/><path d="m3.5 15.5 4 4"/></svg>
        <span>Practice Modes</span>
      </button>

      <button
        onClick={() => setActiveSection('settings')}
        className={`w-full text-left py-2 px-4 rounded-lg transition duration-300 flex items-center space-x-2
          ${activeSection === 'settings' ? 'bg-purple-700 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.44.25a2 2 0 0 1-2 0l-.1-.06a2 2 0 0 0-1.73 1L4.2 7.23a2 2 0 0 0 0 2.74l.1.1a2 2 0 0 1 1.73 1L5.9 12.22a2 2 0 0 0 0 1.73l-.25.44a2 2 0 0 1-1.73 1L4.2 16.77a2 2 0 0 0 0 2.74l.1.1a2 2 0 0 1 1.73 1L6.4 20.72a2 2 0 0 0 2 0l.1-.06a2 2 0 0 1 1.73 1L11.78 22h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.44-.25a2 2 0 0 1 2 0l.1.06a2 2 0 0 0 1.73-1L19.8 16.77a2 2 0 0 0 0-2.74l-.1-.1a2 2 0 0 1-1.73-1L18.1 12.22a2 2 0 0 0 0-1.73l.25-.44a2 2 0 0 1 1.73-1L19.8 7.23a2 2 0 0 0 0-2.74l-.1-.1a2 2 0 0 1-1.73-1L17.6 3.28a2 2 0 0 0-2-0l-.1.06a2 2 0 0 1-1.73-1L12.22 2z"/><circle cx="12" cy="12" r="3"/></svg>
        <span>Settings</span>
      </button>
    </aside>
  );
}

export default DashboardSidebar;