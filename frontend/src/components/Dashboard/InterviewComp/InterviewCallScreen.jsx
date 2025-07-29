import { useState, useEffect, useRef } from 'react';

const InterviewCallScreen = ({ interview, onEndCall, onGoBack }) => {
  const [isCallActive, setIsCallActive] = useState(true);
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const animationRef = useRef(null);
  const transcriptEndRef = useRef(null);

  const userProfileImage = "https://images.unsplash.com/photo-1535713875002-d1d0cfd2feae?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  // Simulate voice transcription
  useEffect(() => {
    if (!isListening) return;

    const responses = [
      "Could you tell me more about your experience with React?",
      "How would you handle state management in a large application?",
      "That's an interesting approach. What about performance optimization?",
      "Can you walk me through your thought process on that solution?",
      "What would you say is your greatest strength as a developer?"
    ];

    const simulateResponse = () => {
      if (Math.random() > 0.7 && transcript.split('\n').length < 8) {
        setTranscript(prev => {
          const newTranscript = prev + `\nInterviewer: ${responses[Math.floor(Math.random() * responses.length)]}\n`;
          return newTranscript;
        });
      }
    };

    const interval = setInterval(simulateResponse, 3000);
    return () => clearInterval(interval);
  }, [isListening, transcript]);

  // Handle microphone permission and speaking detection
  const handleMicrophoneAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsListening(true);
      
      // This would be replaced with actual speech recognition in a real app
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      microphone.connect(analyser);
      
      const checkSpeaking = () => {
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(dataArray);
        const volume = Math.max(...dataArray);
        setIsSpeaking(volume > 50);
        
        if (isCallActive) {
          animationRef.current = requestAnimationFrame(checkSpeaking);
        }
      };
      
      checkSpeaking();
    } catch (err) {
      console.error("Microphone access denied:", err);
      // Fallback to simulated listening
      setIsListening(true);
    }
  };

  // Auto-scroll transcript
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcript]);

  useEffect(() => {
    handleMicrophoneAccess();
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm p-4">
      <div className="flex flex-col md:flex-row gap-6 max-w-6xl w-full">
        {/* Main call card */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 flex-1 text-white shadow-xl border border-gray-700 relative overflow-hidden">
          {/* Glow effects */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-600 rounded-full filter blur-3xl opacity-10"></div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-600 rounded-full filter blur-3xl opacity-10"></div>
          
          <div className="relative z-10">
            {/* Header with status */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                Live Interview
              </h2>
              <div className="flex items-center">
                <span className="relative flex h-3 w-3 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <p className="text-sm font-medium text-green-400">Live</p>
              </div>
            </div>

            {/* Profile cards with speaking indicators */}
            <div className="flex flex-col md:flex-row justify-center gap-6 mb-6">
              <div className="relative flex-1 flex flex-col items-center">
                <div className={`relative w-20 h-20 rounded-full overflow-hidden border-2 ${isSpeaking ? 'border-green-500' : 'border-purple-500/50'} mb-3 transition-all duration-300`}>
                  <img
                    src={interview.interviewer}
                    alt="Interviewer"
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/150x150/5B21B6/FFFFFF?text=HR"; }}
                  />
                  {isSpeaking && (
                    <div className="absolute inset-0 rounded-full border-4 border-green-500/30 animate-ping"></div>
                  )}
                </div>
                <p className="text-lg font-semibold">Interviewer</p>
                <p className="text-gray-300 text-sm">{interview.job_role}</p>
              </div>

              <div className="relative flex-1 flex flex-col items-center">
                <div className={`relative w-20 h-20 rounded-full overflow-hidden border-2 ${!isSpeaking ? 'border-green-500' : 'border-blue-500/50'} mb-3 transition-all duration-300`}>
                  <img
                    src={userProfileImage}
                    alt="Your Profile"
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/150x150/2563EB/FFFFFF?text=You"; }}
                  />
                  {!isSpeaking && (
                    <div className="absolute inset-0 rounded-full border-4 border-green-500/30 animate-ping"></div>
                  )}
                </div>
                <p className="text-lg font-semibold">You</p>
                <p className="text-gray-300 text-sm">Candidate</p>
              </div>
            </div>

            {/* Timer with neon glow */}
            <div className="mb-6 text-center">
              <div className="inline-block px-6 py-2 rounded-lg bg-gray-800/50 border border-gray-700 relative">
                <span className="text-2xl font-mono text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.6)]">
                  00:45:22
                </span>
                <span className="absolute inset-0 rounded-lg bg-green-500/10 animate-pulse"></span>
              </div>
            </div>

            {/* Control buttons */}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setIsCallActive(false);
                  setTimeout(onEndCall, 1000);
                }}
                className="relative w-14 h-14 bg-red-600/90 hover:bg-red-700 rounded-lg flex items-center justify-center transition-all duration-300 group"
              >
                <span className="absolute inset-0 rounded-lg bg-red-500/30 group-hover:bg-red-500/40 animate-pulse"></span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white relative z-10" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24a11.235 11.235 0 014.28 1.11c.36.13.56.5.56.89v3.5c0 .55-.45 1-1 1C12.9 22 2 11.1 2 4c0-.55.45-1 1-1h3.5c.39 0 .76.2.89.56a11.235 11.235 0 011.11 4.28c.12.35.03.75-.24 1.02l-2.2 2.2z" />
                </svg>
              </button>

              <button
                onClick={onGoBack}
                className="relative w-14 h-14 bg-green-600/90 hover:bg-green-700 rounded-lg flex items-center justify-center transition-all duration-300 group"
              >
                <span className="absolute inset-0 rounded-lg bg-green-500/30 group-hover:bg-green-500/40"></span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white relative z-10" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Transcription terminal */}
        <div className="bg-gray-900 rounded-xl border border-gray-700 flex-1 flex flex-col overflow-hidden">
          <div className="bg-gray-800 px-4 py-3 border-b border-gray-700 flex items-center">
            <div className="flex space-x-2 mr-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-sm font-mono text-gray-300">live_transcript.txt</span>
          </div>
          <div className="p-4 flex-1 overflow-y-auto font-mono text-sm bg-gray-900/50 text-gray-300">
            {transcript || (
              <div className="text-gray-500 italic">
                Waiting for conversation to start...
                <br />
                {isListening ? "Microphone ready" : "Requesting microphone access..."}
              </div>
            )}
            <div ref={transcriptEndRef} />
          </div>
          <div className="px-4 py-2 bg-gray-800 border-t border-gray-700 flex items-center">
            <div className={`w-2 h-2 rounded-full mr-2 ${isSpeaking ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
            <span className="text-xs text-gray-400">
              {isSpeaking ? 'Speaking...' : 'Listening...'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewCallScreen;