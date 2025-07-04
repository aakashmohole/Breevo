import React from 'react';
import { showCustomAlert } from '../../../utils/showCustomAlert';

function SettingsSection({
  userName, 
  setUserName, 
  userEmail, 
  setUserEmail, 
  notificationPreference, 
  setNotificationPreference, 
  reminderFrequency, 
  setReminderFrequency
}) {
  return (
    <div className="relative z-10 bg-gray-950 bg-opacity-90 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-gray-800 max-w-3xl w-full mx-auto text-left animate-fade-in-down">
      <h2 className="text-3xl font-bold text-white mb-6">Settings</h2>
      <p className="text-gray-300 mb-4">
        Manage your account preferences and notification settings.
      </p>
      <div className="space-y-4">
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
        <button
          onClick={() => showCustomAlert('Password change functionality not implemented.', 'info')}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-md font-semibold h-12 px-6 py-3
                     bg-gray-700 text-white shadow-lg hover:bg-gray-600 transform transition duration-300 hover:scale-105 w-full"
        >
          Change Password
        </button>

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
          onClick={() => showCustomAlert('Settings saved! (Functionality not implemented)', 'success')}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-md font-semibold h-12 px-6 py-3 w-full
                     bg-purple-600 text-white shadow-lg hover:bg-purple-700 transform transition duration-300 hover:scale-105"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}

export default SettingsSection;