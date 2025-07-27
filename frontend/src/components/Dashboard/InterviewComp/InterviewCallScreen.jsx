import { useState, useEffect } from 'react';

const InterviewCallScreen = ({ interview, onEndCall, onMarkAsDone }) => {
  const [isConnecting, setIsConnecting] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const userProfileImage = "https://images.unsplash.com/photo-1535713875002-d1d0cfd2feae?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsConnecting(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-6 font-sans">
      {isConnecting ? (
        <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <div className="relative w-40 h-40 mb-8 border-4 border-purple-500 rounded-full shadow-lg overflow-hidden">
            <img
              src={interview.interviewer}
              alt="Interviewer"
              className="w-full h-full object-cover"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/160x160/5B21B6/FFFFFF?text=HR"; }}
            />
          </div>
          <p className="text-4xl font-extrabold text-purple-300 tracking-wide">Connecting...</p>
          <p className="text-lg text-gray-400 mt-2">Please wait while we establish the connection.</p>
        </div>
      ) : (
        <div className="w-full max-w-4xl bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center">
          <h2 className="text-4xl font-bold mb-6 text-purple-400">Live Interview</h2>

          <div className="flex items-center mb-12">
            <span className="relative flex h-3 w-3 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <p className="text-lg font-semibold text-green-400">Connected</p>
          </div>

          <div className="flex flex-col md:flex-row justify-around w-full mb-16 gap-12">
            <div className="flex flex-col items-center bg-gray-700 py-6 px-10 rounded-xl shadow-inner">
              <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-purple-500 mb-5">
                <img
                  src={interview.interviewer}
                  alt="Interviewer"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/150x150/5B21B6/FFFFFF?text=HR"; }}
                />
              </div>
              <p className="text-2xl font-semibold text-white">HR Interviewer</p>
              <p className="text-gray-300 text-lg">{interview.job_role} Interview</p>
            </div>

            <div className="flex flex-col items-center bg-gray-700 py-6 px-10 rounded-xl shadow-inner">
              <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-blue-500 mb-5">
                <img
                  src={userProfileImage}
                  alt="Your Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/150x150/2563EB/FFFFFF?text=You"; }}
                />
              </div>
              <p className="text-2xl font-semibold text-white">Your Profile</p>
              <p className="text-gray-300 text-lg">Candidate</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <button
              onClick={onEndCall}
              className="flex items-center justify-center p-5 bg-red-600 hover:bg-red-700 rounded-full shadow-md transition duration-300 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50"
              title="End Call"
              aria-label="End Call"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24a11.235 11.235 0 014.28 1.11c.36.13.56.5.56.89v3.5c0 .55-.45 1-1 1C12.9 22 2 11.1 2 4c0-.55.45-1 1-1h3.5c.39 0 .76.2.89.56a11.235 11.235 0 011.11 4.28c.12.35.03.75-.24 1.02l-2.2 2.2z" />
              </svg>
            </button>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`flex items-center justify-center p-5 rounded-full shadow-md transition duration-300 focus:outline-none focus:ring-4 ${
                isMuted ? 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500' : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
              } focus:ring-opacity-50`}
              title={isMuted ? "Unmute" : "Mute"}
              aria-label={isMuted ? "Unmute Microphone" : "Mute Microphone"}
            >
              {isMuted ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 11h-1.7c0 .7-.14 1.37-.38 2H19v2h-4.18c-.48 1.6-1.84 2.8-3.5 3.32V22h-2v-3.68c-1.66-.52-3.02-1.72-3.5-3.32H5v-2h1.7c-.24-.63-.38-1.3-.38-2H5V9h1.32c.48-1.6 1.84-2.8 3.5-3.32V2h2v3.68c1.66.52 3.02 1.72 3.5 3.32H19v2z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.2-3c0 3.25-2.93 5.93-6.7 6v3h-2v-3c-3.77-.07-6.7-2.75-6.7-6H3c0 4.07 3.06 7.44 7 7.93V21h4v-3.07c3.94-.49 7-3.86 7-7.93h-2.8z" />
                </svg>
              )}
            </button>

            <button
              onClick={toggleRecording}
              className={`flex items-center justify-center p-5 rounded-full shadow-md transition duration-300 focus:outline-none focus:ring-4 ${
                isRecording ? 'bg-red-500 hover:bg-red-600 focus:ring-red-400' : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
              } focus:ring-opacity-50`}
              title={isRecording ? "Stop Recording" : "Start Recording"}
              aria-label={isRecording ? "Stop Interview Recording" : "Start Interview Recording"}
            >
              {isRecording ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 6h12v12H6z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 18c4.41 0 8-3.59 8-8s-3.59-8-8-8-8 3.59-8 8 3.59 8 8 8zm-2-9h4v2h-4z" />
                </svg>
              )}
            </button>

            <button
              onClick={onMarkAsDone}
              className="flex items-center justify-center p-5 bg-purple-600 hover:bg-purple-700 rounded-full shadow-md transition duration-300 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50"
              title="Mark as Done"
              aria-label="Mark Interview as Done"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewCallScreen;