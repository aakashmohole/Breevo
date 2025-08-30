// InterviewCallScreen.jsx
import { useEffect, useState, useRef } from "react";
import Vapi from "@vapi-ai/web";
import { submitTranscriptAndComplete } from "../../../api/api";
import { Mic, MicOff, PhoneCall, PhoneOff, User } from "lucide-react";

export default function InterviewCallScreen({ interview }) {
  const [vapi, setVapi] = useState(null);
  const [inCall, setInCall] = useState(false);
  const [lines, setLines] = useState([]);
  const [speaking, setSpeaking] = useState(null);
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const transcriptEndRef = useRef(null);
  const timerRef = useRef(null);

  const PUBLIC_KEY = "274a5532-2010-44a0-bd9f-8c1dd2b67666";
  const ASSISTANT_ID = "52a295cc-9fcb-4ae3-a884-069f4676ff01";

  const interviewerImage =
    "https://images.unsplash.com/photo-1604904612715-47bf9d9bc670?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  
  const parseEvaluation = (evaluationText) => {
    const obj = {
      score: null,
      performance_summary: "",
      transcript_analysis: "",
      sentiment: "",
      confidence: "",
      eye_contact: "",
      posture: "",
      gestures: "",
      keywords_used: [],
      suggested_keywords: [],
      improvement_areas: "",
    };

    const lines = evaluationText.split("\n").map((l) => l.trim());

    lines.forEach((line) => {
      if (line.startsWith("Score:")) obj.score = parseInt(line.replace("Score:", "").replace("%", "").trim());
      else if (line.startsWith("Performance Summary")) obj.performance_summary = line.replace("Performance Summary", "").trim();
      else if (line.startsWith("Transcript Analysis")) obj.transcript_analysis = line.replace("Transcript Analysis", "").trim();
      else if (line.startsWith("Overall Sentiment:")) obj.sentiment = line.replace("Overall Sentiment:", "").trim();
      else if (line.startsWith("Confidence:")) obj.confidence = line.replace("Confidence:", "").trim();
      else if (line.startsWith("Eye Contact:")) obj.eye_contact = line.replace("Eye Contact:", "").trim();
      else if (line.startsWith("Posture:")) obj.posture = line.replace("Posture:", "").trim();
      else if (line.startsWith("Gestures:")) obj.gestures = line.replace("Gestures:", "").trim();
      else if (line.startsWith("Keywords Used:")) obj.keywords_used = line.replace("Keywords Used:", "").split(",").map((w) => w.trim());
      else if (line.startsWith("Suggested Keywords:")) obj.suggested_keywords = line.replace("Suggested Keywords:", "").split(",").map((w) => w.trim());
      else if (line.startsWith("Key Areas to Improve")) obj.improvement_areas = line.replace("Key Areas to Improve", "").trim();
    });

    return obj;
  };
  


  const handleMarkComplete = async () => {
    const transcriptText = lines
      .map((line) => {
        if (line.role.startsWith("system")) {
          return `\n${line.text.trim()}`;
        }
        return `${line.role === "assistant" ? "Interviewer" : "User"}: ${line.text}`;
      })
      .join("\n");

    try {
      const response = await submitTranscriptAndComplete(interview.id, transcriptText);
      if (response.status === 201) {
        alert("Interview marked complete and transcript saved.");
      } else {
        alert("Failed to save transcript.");
      }
    } catch (error) {
      alert("Error submitting transcript: " + error.message);
    }
  };

  const questions = interview?.generated_questions
    ? Array.isArray(interview.generated_questions)
      ? interview.generated_questions
          .map((q) => (typeof q === "object" ? q.question : q))
          .filter(
            (q) =>
              q &&
              !q.toLowerCase().includes("technical question") &&
              !q.toLowerCase().includes("behavioral question") &&
              !q.toLowerCase().includes("situational question")
          )
      : interview.generated_questions.split(",").map((q) => q.trim())
    : [];

  useEffect(() => {

    if (!interview) return;

    const instance = new Vapi(PUBLIC_KEY);
    setVapi(instance);

    instance.on("call-start", () => {
      setInCall(true);
      setCallDuration(0);
      timerRef.current = setInterval(() => setCallDuration((prev) => prev + 1), 1000);
    });

    instance.on("call-end", () => {
      setInCall(false);
      clearInterval(timerRef.current);
      setCallDuration(0);
    });

    instance.on("speech-start", (msg) => {
      setSpeaking(msg.owner === "assistant" ? "interviewer" : "user");
    });

    instance.on("speech-end", () => {
      setSpeaking(null);
    });

    instance.on("message", (msg) => {
      if (msg.type === "transcript") {
       
        setLines((prev) => [...prev, { role: msg.role, text: msg.transcript }]);
      }

      if (msg.type === "response" && msg.content?.includes("Evaluation:")) {
    const evaluationText = msg.content;

    // Show evaluation in UI
    const evaluationLines = evaluationText.split("\n").filter((line) => line.trim() !== "");
    const formattedLines = evaluationLines.map((line) => {
      if (line.includes("Evaluation:")) return { role: "system-heading", text: line };
      if (line.includes("Strengths")) return { role: "system-strengths", text: line };
      if (line.includes("Weaknesses")) return { role: "system-weaknesses", text: line };
      if (line.includes("Recommendation")) return { role: "system-recommendation", text: line };
      return { role: "system", text: line };
    });
    setLines((prev) => [...prev, ...formattedLines]);

    // ✅ Parse and save to backend
    const evaluationObj = parseEvaluation(evaluationText);

    fetch("http://localhost:8000/api/vapi/evaluations/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // if using JWT
      },
      body: JSON.stringify({
        ...evaluationObj,
        interview: interview.id, // you already have interview prop
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log("✅ Evaluation saved:", data))
      .catch((err) => console.error("❌ Error saving evaluation:", err));
  }

    });

    return () => {
      instance?.stop();
      clearInterval(timerRef.current);
    };
  }, [interview]);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const startCall = () => {
    if (vapi) {
      vapi.start(ASSISTANT_ID, {
        metadata: { questions },
        model: {
          provider: "openai",
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `You are an interview assistant. First, ask the user to introduce themselves. Then, ask the following questions in order: ${questions
                .map((q, i) => `${i + 1}. ${q}`)
                .join("\n")}. Ask one question at a time. After all questions are answered, thank the candidate and end the call. When the call ends, generate an evaluation with Communication skills (1-10), Confidence (1-10), Knowledge relevance (1-10), Strengths, Weaknesses, and a Final Recommendation (Hire/Maybe/Reject).`,
            },
          ],
        },
      });
    }
  };

  const stopCall = () => vapi?.stop();

  const toggleMute = () => {
    if (vapi) {
      vapi.setMuted(!isMuted);
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const getMessageClass = (role) => {
    switch (role) {
      case "assistant":
        return "bg-purple-900 text-purple-200 border border-purple-800 rounded-bl-none";
      case "user":
        return "bg-gray-800 text-gray-200 border border-gray-700 rounded-br-none";
      case "system-heading":
        return "bg-black text-purple-400 font-bold text-center";
      case "system-strengths":
        return "bg-gray-900 text-green-300 font-semibold";
      case "system-weaknesses":
        return "bg-gray-900 text-red-300 font-semibold";
      case "system-recommendation":
        {
          const isHire = lines.some(
            (l) => l.role === "system-recommendation" && l.text.includes("Hire")
          );
          return `bg-black font-bold ${isHire ? "text-green-300" : "text-red-300"}`;
        }
      default:
        return "bg-gray-900 text-gray-400 italic";
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-950 text-gray-200">
      {/* Main Call View */}
      <div className="flex-1 flex flex-col items-center justify-between p-6 relative bg-gradient-to-br from-gray-900 to-purple-900">
        {/* Interviewer View */}
        <div className="flex flex-col items-center justify-center mt-8">
          <div className="relative mb-6">
            {/* Speaking animation rings */}
            {speaking === "interviewer" && (
              <>
                <div className="absolute -inset-4 rounded-full bg-purple-600 opacity-70 animate-ping-slow" />
                <div className="absolute -inset-3 rounded-full bg-purple-500 opacity-40 animate-ping-slower" />
                <div className="absolute -inset-2 rounded-full bg-purple-400 opacity-20 animate-ping-slowest" />
              </>
            )}
            
            {/* Profile picture with status indicator */}
            <div className="relative">
              <div
                className={`w-40 h-40 rounded-full overflow-hidden border-4 ${
                  speaking === "interviewer" ? "border-purple-500" : "border-gray-700"
                } shadow-lg transition-all duration-300`}
              >
                <img
                  src={interviewerImage}
                  alt="Interviewer"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Online status indicator */}
              <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 rounded-full border-2 border-black"></div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-100">Jesseka Johnson</p>
            <p className="text-sm text-purple-300">Senior {interview.job_role} Interviewer</p>
            <p className="text-xs text-gray-400 mt-1">Acme Tech Inc.</p>
          </div>
        </div>

        {/* Call Status and Timer */}
        <div className="flex flex-col items-center gap-2 mt-4">
          {inCall ? (
            <>
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <p className="text-sm font-medium text-green-400">Live</p>
              </div>
              <p className="text-2xl font-mono font-bold text-purple-400">{formatTime(callDuration)}</p>
            </>
          ) : (
            <p className="text-sm font-medium text-gray-400">Ready to connect</p>
          )}
        </div>

        {/* Call Controls */}
        <div className="flex flex-col items-center gap-6 mt-6 w-full max-w-md">
          {/* Action Buttons */}
          <div className="flex justify-center gap-8">
            {/* Mic Toggle */}
            <button
              onClick={toggleMute}
              disabled={!inCall}
              className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                isMuted
                  ? "bg-gray-800 text-red-400 hover:bg-gray-700"
                  : "bg-gray-800 text-purple-400 hover:bg-gray-700 border border-gray-700"
              } ${!inCall && "opacity-50 cursor-not-allowed"}`}
            >
              {isMuted ? (
                <MicOff className="h-6 w-6" />
              ) : (
                <Mic className="h-6 w-6" />
              )}
            </button>

            {/* Start/Stop Call */}
            {!inCall ? (
              <button
                onClick={startCall}
                className="relative w-16 h-16 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg text-white"
              >
                <PhoneCall className="h-7 w-7" />
              </button>
            ) : (
              <button
                onClick={stopCall}
                className="relative w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg text-white"
              >
                <PhoneOff className="h-7 w-7" />
              </button>
            )}
          </div>

          {/* Mark as Complete Button */}
          <button
            onClick={handleMarkComplete}
            disabled={!lines.length}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-3 rounded-lg shadow-md transition-all duration-200 disabled:bg-gray-700 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <User className="h-5 w-5" />
            Complete Interview
          </button>
        </div>
      </div>

      {/* Transcript Panel */}
      <div className="w-full lg:w-96 bg-gray-950 border-l border-gray-800 max-h-full flex flex-col overflow-hidden shadow-lg">
        <div className="p-4 bg-black text-white">
          <h3 className="text-lg font-bold">Interview Transcript</h3>
          <p className="text-sm text-gray-400">Real-time conversation log</p>
        </div>
        <div className="p-4 flex-1 overflow-y-auto text-sm bg-gray-950">
          {lines.length ? (
            lines.map((line, i) => (
              <div
                key={i}
                className={`mb-3 flex ${
                  line.role === "assistant" || line.role.startsWith("system")
                    ? "justify-start"
                    : "justify-end"
                }`}
              >
                <div
                  className={`p-3 rounded-lg max-w-[85%] shadow-sm transition-all duration-300 ${getMessageClass(
                    line.role
                  )}`}
                >
                  {line.role === "assistant" && (
                    <p className="mb-1 text-xs font-semibold text-purple-400">Interviewer</p>
                  )}
                  {line.role === "user" && (
                    <p className="mb-1 text-xs font-semibold text-green-400">You</p>
                  )}
                  <p className="text-sm">{line.text}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-500 italic text-center p-8 bg-gray-900 rounded-lg border border-gray-800">
              <p className="mb-2">Your conversation will appear here</p>
              <p className="text-xs">Start the call to begin the interview</p>
            </div>
          )}
          <div ref={transcriptEndRef} />
        </div>
      </div>

      <style jsx>{`
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 1; }
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        @keyframes ping-slower {
          0% { transform: scale(1); opacity: 1; }
          85%, 100% { transform: scale(2); opacity: 0; }
        }
        @keyframes ping-slowest {
          0% { transform: scale(1); opacity: 1; }
          95%, 100% { transform: scale(2); opacity: 0; }
        }
        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animate-ping-slower {
          animation: ping-slower 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animate-ping-slowest {
          animation: ping-slowest 4s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
}