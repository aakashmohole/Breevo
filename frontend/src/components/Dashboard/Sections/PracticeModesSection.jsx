import { useState } from 'react';
import { toast } from 'react-toastify';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { LoaderOne } from '../../ui/loadingCircle';

import InterviewDetailsModal from '../InterviewComp/InterviewDetailsModal';
import InterviewList from '../InterviewComp/InterviewList';
import InterviewCallScreen from '../InterviewComp/InterviewCallScreen';

import { getIncompleteInterviews, getIncompleteInterviewById, deleteIncompleteInterviewById, updateInterviewStatus } from '../../../api/api';


const PracticeModesSection = () => {
  const queryClient = useQueryClient();
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [currentView, setCurrentView] = useState('list');
  const [selectedInterview, setSelectedInterview] = useState(null);

  const {
    data: savedInterviews = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['InCompletedInterviews'],
    queryFn: getIncompleteInterviews,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const handleJoinInterview = async (interviewId) => {
    try {
      const res = await getIncompleteInterviewById(interviewId);
      setSelectedInterview(res.data);
      setShowInterviewModal(true);
    } catch (error) {
      toast.error('Could not load interview details.');
    }
  };

  const handleDeleteInterview = async (interviewId) => {
    try {
      await deleteIncompleteInterviewById(interviewId);
      toast.success('Interview deleted successfully!');
      queryClient.invalidateQueries(['InCompletedInterviews']);
    } catch (error) {
      toast.error('Failed to delete interview.');
    }
  };

  const handleEndCall = () => {
    setCurrentView('list');
    setSelectedInterview(null);
    toast.info('Interview call ended.');
  };

  const handleMarkAsDone = async () => {
    if (!selectedInterview) return;
    try {
      await updateInterviewStatus(selectedInterview.id, { is_completed: true });
      toast.success(`Interview for ${selectedInterview.job_role} marked as complete.`);
      queryClient.invalidateQueries(['InCompletedInterviews']);
      setCurrentView('list');
      setSelectedInterview(null);
    } catch {
      toast.error('Error updating interview status.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <LoaderOne />
      </div>
    );
  }

  return (
    <main className="relative z-10 bg-gradient-to-br from-gray-900 to-black p-6 md:p-10 rounded-2xl shadow-xl border border-gray-800 max-w-6xl w-full mx-auto min-h-screen font-sans">
      {currentView === 'list' && (
        <>
          <h1 className="text-4xl font-extrabold text-white mb-6 border-b border-gray-700 pb-4">🎯 Live Interviews</h1>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Your Scheduled Interviews</h2>
            {savedInterviews.data.length > 0 ? (
              <InterviewList
                interviews={savedInterviews.data}
                onJoin={handleJoinInterview}
                onDelete={handleDeleteInterview}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              />
            ) : (
              <p className="text-gray-400">You don't have any interviews scheduled yet.</p>
            )}
          </section>
        </>
      )}

      {showInterviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <InterviewDetailsModal
            interview={selectedInterview}
            onClose={() => setShowInterviewModal(false)}
            onStartCall={() => {
              setShowInterviewModal(false);
              setCurrentView('interview');
            }}
          />
        </div>
      )}

      {currentView === 'interview' && selectedInterview && (
        <InterviewCallScreen
          interview={selectedInterview}
          onEndCall={handleEndCall}
          onMarkAsDone={handleMarkAsDone}
        />
      )}
    </main>
  );
};

export default PracticeModesSection;
