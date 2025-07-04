import React, { useState } from 'react';
import { showCustomAlert } from '../utils/showCustomAlert';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import DashboardSidebar from '../components/Dashboard/DashboardSidebar';
import NewInterviewForm from '../components/Dashboard/Sections/NewInterviewForm';
import PastInterviewsList from '../components/Dashboard/Sections/PastInterviewsList';
import InterviewDetail from '../components/Dashboard/Sections/InterviewDetail';
import PracticeModesSection from '../components/Dashboard/Sections/PracticeModesSection';
import SettingsSection from '../components/Dashboard/Sections/SettingsSection';



function DashboardPage() {

  
  const [activeSection, setActiveSection] = useState('new-interview');
  const [selectedInterviewId, setSelectedInterviewId] = useState(null);

  // Form state
  const [jobRole, setJobRole] = useState('');
  const [industry, setIndustry] = useState('');
  const [skills, setSkills] = useState('');
  const [focusAreas, setFocusAreas] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [questionTypes, setQuestionTypes] = useState([]);
  const [timeLimit, setTimeLimit] = useState('60');

  // Settings state
  const [userName, setUserName] = useState('JohnDoe');
  const [userEmail, setUserEmail] = useState('john.doe@example.com');
  const [notificationPreference, setNotificationPreference] = useState('all');
  const [reminderFrequency, setReminderFrequency] = useState('weekly');



  // const handleLogout = () => {
  // };

  const handleGenerateInterview = () => {
    showCustomAlert('Creating new interview...', 'info');
    // Reset form and navigate
    setActiveSection('my-interviews-list');
  };

  const handleQuestionTypeChange = (e) => {
    const { value, checked } = e.target;
    setQuestionTypes(prev => 
      checked ? [...prev, value] : prev.filter(type => type !== value))
  };

  // Dummy data for recent interviews
  const recentInterviews = [
    {
      id: 1,
      title: 'Software Engineer (Frontend)',
      date: '2025-07-01',
      score: '85%',
      recordingUrl: 'https://media.istockphoto.com/id/2171689260/photo/photo-of-pretty-positive-smile-youtube-blogger-blonde-hair-lady-wear-trendy-violet-sweater.webp?s=1024x1024&w=is&k=20&c=APGJzAEkTGE2EyZ5Bt1P1pFctV3TnFLFjiBxnlIR04E=',
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
      <DashboardHeader  />

      <div className="flex flex-1 pt-16">
        <DashboardSidebar activeSection={activeSection} setActiveSection={setActiveSection} />

        <main className="flex-1 p-8 ml-64 overflow-y-auto relative">
          <div className="animated-gradient-bg"></div>
          <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

          {activeSection === 'new-interview' && (
            <NewInterviewForm
              jobRole={jobRole} setJobRole={setJobRole}
              industry={industry} setIndustry={setIndustry}
              skills={skills} setSkills={setSkills}
              focusAreas={focusAreas} setFocusAreas={setFocusAreas}
              difficulty={difficulty} setDifficulty={setDifficulty}
              questionTypes={questionTypes} handleQuestionTypeChange={handleQuestionTypeChange}
              timeLimit={timeLimit} setTimeLimit={setTimeLimit}
              handleGenerateInterview={handleGenerateInterview}
              onCancel={() => setActiveSection('my-interviews-list')}
            />
          )}

          {activeSection === 'my-interviews-list' && (
            <PastInterviewsList
              recentInterviews={recentInterviews}
              onSelectInterview={(id) => { 
                setActiveSection('interview-detail'); 
                setSelectedInterviewId(id); 
              }}
            />
          )}

          {activeSection === 'interview-detail' && (
            <InterviewDetail 
              interview={getSelectedInterviewDetails()} 
              onBackToList={() => setActiveSection('my-interviews-list')} 
            />
          )}

          {activeSection === 'practice-modes' && (
            <PracticeModesSection />
          )}

          {activeSection === 'settings' && (
            <SettingsSection
              userName={userName} setUserName={setUserName}
              userEmail={userEmail} setUserEmail={setUserEmail}
              notificationPreference={notificationPreference} 
              setNotificationPreference={setNotificationPreference}
              reminderFrequency={reminderFrequency} 
              setReminderFrequency={setReminderFrequency}
            />
          )}
          
          <div id="toast-container" className="fixed top-4 right-4 z-50 flex flex-col-reverse items-end space-y-3"></div>
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;