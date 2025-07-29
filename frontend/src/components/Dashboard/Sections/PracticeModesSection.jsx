import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import InterviewDetailsModal from '../InterviewComp/InterviewDetailsModal';
import InterviewList from '../InterviewComp/InterviewList';
import InterviewCallScreen from '../InterviewComp/InterviewCallScreen';

import { getIncompleteInterviews, getIncompleteInterviewById, updateInterviewStatus, 
  deleteIncompleteInterviewById} from '../../../api/api';


import { LoaderOne } from '../../ui/loadingCircle';
const PracticeModesSection = () => {
  const [savedInterviews, setSavedInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'interview'
  const [selectedInterview, setSelectedInterview] = useState(null);
  
  // Fetch incomplete interviews on mount
  useEffect(() => {
    const cached = localStorage.getItem('incomplete_interviews');
    if (cached) {
      setSavedInterviews(JSON.parse(cached));
      setLoading(false);
    } else {
      async function fetchInterviews() {
        try {
          setLoading(true);
          const res = await getIncompleteInterviews();
          setSavedInterviews(res.data);
          localStorage.setItem('incomplete_interviews', JSON.stringify(res.data));
        } catch (error) {
          toast.error('Failed to fetch incomplete interviews.');
        } finally {
          setLoading(false);
        }
      }
      fetchInterviews();
    }
  }, []);

  // Handler when user clicks Join on a specific interview card
const handleJoinInterview = async (interviewId) => {
  try {
    const res = await getIncompleteInterviewById(interviewId);
    setSelectedInterview(res.data);
    setShowInterviewModal(true);
  } catch (error) {
    toast.error('Could not load interview details.');
  }
};


  // Handler for deleting interview locally (you may also want to call backend API)
  const handleDeleteInterview = async (interviewId) => {
    try {
      // Call backend API to delete the interview
      await deleteIncompleteInterviewById(interviewId);

      // If successful, update local state and localStorage
      setSavedInterviews(prev => {
        const updated = prev.filter(interview => interview.id !== interviewId);
        localStorage.setItem('incomplete_interviews', JSON.stringify(updated));
        return updated;
      });

      toast.success('Interview deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete interview. Please try again.');
      console.error('Delete interview error:', error);
    }
  };



  // Ending the interview call — switch back to list
  const handleEndCall = () => {
    setCurrentView('list');
    setSelectedInterview(null);
    toast.info('Interview call ended.');
  };

  // Mark as done — update backend and remove from list
  const handleMarkAsDone = async () => {
    if (!selectedInterview) return;
    try {
      await updateInterviewStatus(selectedInterview.id, { is_completed: true });
      setSavedInterviews(prev => prev.filter(i => i.id !== selectedInterview.id));
      toast.success(`Interview for ${selectedInterview.job_role} marked as done!`);
      setCurrentView('list');
      setSelectedInterview(null);
    } catch {
      toast.error('Error updating interview status.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <LoaderOne />
      </div>
    );
  }


  return (
    <>
      {currentView === 'list' && (
        <main className="relative z-10 bg-gray-950 bg-opacity-90 backdrop-blur-md p-4 sm:p-6 md:p-8 lg:p-10 rounded-2xl shadow-2xl border border-gray-800 max-w-6xl w-full mx-auto text-left font-sans">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 sm:mb-8 border-b border-gray-700 pb-4">Live Interviews</h1>

          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-6">Your Scheduled Interviews</h2>
            {savedInterviews.length > 0 ? (
              <InterviewList
                interviews={savedInterviews}
                onJoin={handleJoinInterview}
                onDelete={handleDeleteInterview}
              />
            ) : (
              <p className="text-gray-400">You don't have any interviews scheduled yet.</p>
            )}
          </section>
        </main>
      )}

      {showInterviewModal && (
        <InterviewDetailsModal
          interview={selectedInterview}
          onClose={() => setShowInterviewModal(false)}
          onStartCall={() => {
            setShowInterviewModal(false);
            setCurrentView('interview');
          }}
        />
      )}

      {currentView === 'interview' && selectedInterview && (
        <InterviewCallScreen
          interview={selectedInterview}
          onEndCall={handleEndCall}
          
          onMarkAsDone={handleMarkAsDone}
        />
      )}
    </>
  );
};

export default PracticeModesSection;
