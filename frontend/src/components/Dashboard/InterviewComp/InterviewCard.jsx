import { motion } from "framer-motion";
import DifficultyTag from "../../BasicComponents/DifficultyTag";

const InterviewCard = ({ interview, onJoin, onDelete }) => (
  <motion.article
    
    transition={{ type: "spring", stiffness: 220, damping: 18 }}
    className="relative group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-purple-700 shadow-xl overflow-hidden cursor-pointer"
    tabIndex={0}
    aria-label={`Join ${interview.job_role} interview`}
    onClick={() => onJoin(interview.id)}
    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onJoin(interview.id); }}
  >
    {/* Glow border effect */}
    <div className="absolute inset-0 pointer-events-none rounded-2xl group-hover:ring-4 group-hover:ring-purple-500 transition"></div>

    {/* Delete button */}
    <button
      onClick={e => { e.stopPropagation(); onDelete(interview.id); }}
      className="absolute z-10 top-4 right-4 bg-transparent hover:bg-red-600/20 p-2 rounded-full transition"
      aria-label="Delete Interview"
      title="Delete Interview"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 hover:text-white" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    </button>

    <div className="p-8 flex flex-col items-center text-center space-y-3">
      {/* Interviewer */}
      <motion.img
        src={interview.interviewer}
        alt="Interviewer"
        onError={e => { e.target.onerror = null; e.target.src = "https://placehold.co/64x64/5B21B6/FFFFFF?text=HR"; }}
        className="w-20 h-20 rounded-full object-cover border-4 border-purple-500 shadow-lg group-hover:border-purple-400 transition"
        layout="fixed"
        initial={{ scale: 0.95, boxShadow: "0 2px 12px #a78bfa90" }}
        whileHover={{ scale: 1.05, boxShadow: "0 6px 32px #a78bfa90" }}
      />
      {/* Title */}
      <h3 className="text-2xl font-bold text-white tracking-tight drop-shadow">{interview.job_role}</h3>
      <p className="text-purple-400 text-base font-medium">{interview.industry}</p>
      <DifficultyTag difficulty={interview.difficulty} />

      {/* Divider line */}
      <div className="w-full border-t border-gray-700 mt-3"></div>

      {/* Card Bottom Row */}
      <div className="w-full pt-4 flex flex-row items-center justify-between gap-3">
        <div className="flex items-center text-sm text-gray-300 gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} fill="none">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{interview.time_limit} mins</span>
        </div>
        {/* Animated Button */}
        <motion.button
          onClick={e => { e.stopPropagation(); onJoin(interview.id); }}
          className="relative px-7 py-2 rounded-full font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg 
            hover:from-purple-700 hover:to-indigo-700 focus:ring-4 focus:outline-none focus:ring-purple-400/50 transition-all"
          aria-label={`Join ${interview.job_role} interview now`}
          whileTap={{ scale: 0.96 }}
          whileHover={{
            scale: 1.06,
            boxShadow: "0px 2px 20px 0px #a78bfa55",
          }}
        >
          <span className="flex items-center gap-2">
            <svg className="h-5 w-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M13 16h-1v-4h-1m4-2V7.41a1.99 1.99 0 00-.59-1.42l-4.17-4.17a2.004 2.004 0 00-2.83 0 2.002 2.002 0 000 2.83l4.17 4.17c.38.38.59.88.59 1.42V11" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 16v1a2 2 0 002 2h4a2 2 0 002-2V7.41c0-.53-.21-1.04-.59-1.41l-4.17-4.17c-.38-.38-.88-.59-1.42-.59H8a2 2 0 00-2 2v4a2 2 0 002 2h4z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Join
          </span>
        </motion.button>
      </div>
    </div>
  </motion.article>
);

export default InterviewCard;
