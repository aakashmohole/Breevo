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


export const logoutUser = () => API.post('logout/');