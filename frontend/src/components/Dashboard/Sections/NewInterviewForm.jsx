import React, { useState } from 'react';
import NewInterviewForm from '../../NewInterviewComponents/NewInterviewForm';
import LoadingSpinner from '../../NewInterviewComponents/LoadingSpinner';
import InterviewReadyDisplay from '../../NewInterviewComponents/InterviewReadyDisplay';
import { toast } from 'react-toastify';
import { createInterview, generateInterviewQuestions } from '../../../api/api';

export default function NewInterviewFormPage() {
  // State for form inputs
  const [jobRole, setJobRole] = useState('');
  const [industry, setIndustry] = useState('');
  const [skills, setSkills] = useState('');
  const [focusAreas, setFocusAreas] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [questionTypes, setQuestionTypes] = useState(['technical', 'behavioral']);
  const [timeLimit, setTimeLimit] = useState(60);

  // State for managing UI sections
  const [activeSection, setActiveSection] = useState('form'); // 'form', 'loading', 'ready'
  const [loadingMessage, setLoadingMessage] = useState("Generating questions...");

  // Handler for question type checkboxes
  const handleQuestionTypeChange = (e) => {
    const { value, checked } = e.target;
    setQuestionTypes(prev =>
      checked ? [...prev, value] : prev.filter(type => type !== value)
    );
  };

function transformData(frontendData) {
  return {
    job_role: frontendData.job_role,
    industry: frontendData.industry,
    key_skills: frontendData.skills, // Maps 'skills' to 'key_skills'
    focus_areas: frontendData.focus_areas,
    difficulty: frontendData.difficulty,
    question_types: Array.isArray(frontendData.question_types) 
      ? frontendData.question_types.join(', ') 
      : frontendData.question_types,
    time_limit: frontendData.time_limit
  };
}

const handleGenerateInterview = async () => {
  try {
    setLoadingMessage("Creating interview...");
    setActiveSection('loading');

    // 1. Create Interview
    const interviewData = {
      job_role: jobRole,
      industry,
      skills,
      focus_areas: focusAreas,
      difficulty,
      question_types: questionTypes,
      time_limit: timeLimit,
    };

    const transformedData = transformData(interviewData);
    console.log('Transformed interview data:', transformedData);
    console.log('Interview data:', interviewData);

    const createRes = await createInterview(transformedData);
    console.log('Interview created:', createRes.data);
    const interviewId = createRes.data.id; // get interview ID from response

    // 2. Wait and generate questions
    setLoadingMessage("Generating questions...");
    await generateInterviewQuestions(interviewId);

    // 3. Show ready screen
    setActiveSection('ready');
    toast.success('Login successful!', {
      style: {
        background: '#1e293b', // dark blue
        color: '#fff',
      },
    });

  } catch (error) {
    console.error('Error:', error);
    setLoadingMessage("Failed to generate interview. Please try again.");
    toast.error('Failed to generate interview. Please try again.', {
      style: {
        background: '#dc2626', // red
        color: '#fff',
      },
    });
    setActiveSection('form');
  }
};


  // Function to go back to the form
  const handleBackToForm = () => {
    setActiveSection('form');
  };

  // Function to handle starting the interview
  const handleStartInterview = () => {
    // In a real app, this would navigate to the actual interview page
    // For now, just go back to the form
    handleBackToForm();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-sans overflow-hidden relative">
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        body {
          font-family: 'Inter', sans-serif;
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.6s ease-out forwards;
        }
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        `}
      </style>

      {/* Background glowing circles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      {activeSection === 'form' && (
        <NewInterviewForm
          jobRole={jobRole} setJobRole={setJobRole}
          industry={industry} setIndustry={setIndustry}
          skills={skills} setSkills={setSkills}
          focusAreas={focusAreas} setFocusAreas={setFocusAreas}
          difficulty={difficulty} setDifficulty={setDifficulty}
          questionTypes={questionTypes} handleQuestionTypeChange={handleQuestionTypeChange}
          timeLimit={timeLimit} setTimeLimit={setTimeLimit}
          handleGenerateInterview={handleGenerateInterview}
          onCancel={handleBackToForm}
        />
      )}

      {activeSection === 'loading' && (
        <LoadingSpinner />
    
      )}

      {activeSection === 'ready' && (
        <InterviewReadyDisplay
          onStartInterview={handleStartInterview}
          onBackToForm={handleBackToForm}
        />
      )}
    </div>
  );
}