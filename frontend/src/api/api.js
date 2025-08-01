// src/api/api.js
import axios from 'axios';


const API = axios.create({
  baseURL: 'http://localhost:8000/api/', // change this to your backend URL
  withCredentials: true, // ⬅️ this is IMPORTANT to send cookies
});


// Signup API
export const signupUser = (data) => API.post('register/', data);

// Login API
export const loginUser = (data) => API.post('/login/', data);

// Example: Get user profile (protected)
export const getUserProfile = () => API.get('/profile/');

// Create interview
// export const createInterview = (data) => API.post('interviews/create/', data,{ withCredentials: true,});

export const createInterview = (data) => API.post('interviews/create/', data, {
  headers: {
    'Content-Type': 'application/json',
    // Add other required headers here
  },
  withCredentials: true
});

// Generate questions
export const generateInterviewQuestions = (interviewId) => API.post(`interviews/${interviewId}/generate-questions/`);

export const logoutUser = () => API.post('logout/');


// Fetch all incomplete interviews for the logged-in user
export const getIncompleteInterviews = () => 
  API.get('interviews/incomplete-interview/');


export const getAllInterviews = () => 
  API.get('interviews/all-interviews/');


// Update interview status (e.g., mark as completed)
// payload can be { is_completed: true } or false etc.
export const updateInterviewStatus = (interviewId, payload) => 
  API.patch(`interviews/update-interview/${interviewId}/`, payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const getIncompleteInterviewById = (interviewId) =>
  API.get(`interviews/incomplete-interview/${interviewId}/`);

export const deleteIncompleteInterviewById = (interviewId) =>
  API.delete(`interviews/incomplete-interview/${interviewId}/delete/`);
