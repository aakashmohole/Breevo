import React from 'react';

import { toast } from 'react-toastify';

import { useState } from 'react';
import { BackgroundLines } from '../components/ui/background-lines';
import { useNavigate } from 'react-router-dom';
import { AuroraBackground } from '../components/ui/aurora-background';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();





  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form);
      // toast.success('Login successful!');
      toast.success('Login successful!', {
        style: {
          background: '#1e293b', // dark blue
          color: '#fff',
        },
      });
      navigate('/dashboard'); 
    } catch (err) {
      // toast.error('Login failed. Check your email or password.');
      toast.error('Login failed. Check your email or password.', {
        style: {
          background: '#dc2626', // red
          color: '#fff',
        },
      });

      setError(err.response?.data?.detail || 'Login failed');
    }finally {
    setLoading(false); // hide loader
    }
  };



  return (
  // Overall page container: centers the content vertically and horizontally, sets background
  <BackgroundLines>
    <div className="min-h-screen flex items-center justify-center mt-8">
      {/* Main content container: holds both the image and the form.
          Uses flexbox for side-by-side layout, increased max-width, and styling. */}
          
      <div className="flex bg-gray-950 bg-opacity-90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-800 max-w-4xl w-full overflow-hidden">
        
        {/* Image Section: Hidden on small screens, takes half width on medium and larger screens */}
        <div className="hidden md:block w-1/2">
          <img
            src="https://plus.unsplash.com/premium_photo-1666266623814-6cc285dfae79?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Placeholder AI/tech-related image
            alt="AI Interviewer concept illustration"
            className="object-cover w-full h-full" // Ensures the image covers its container
          />
        </div>
        
        {/* Form Section: Takes full width on small screens, half width on medium and larger screens.
            Content is centered within this column. */}
        <div className="p-8 w-full md:w-1/2 flex flex-col justify-center items-center text-center">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white tracking-wide">Breevo</h1>
          </div>
          <h2 className="text-4xl font-bold text-white mb-8">Join Us</h2>
          <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-sm mx-auto">
            {/* Email Input Field */}
            <div className="mb-4">
              <label htmlFor="signup-email" className="block text-gray-300 text-sm font-semibold mb-2 text-left">
                Email
              </label>
              <input
                type="email"
                id="signup-email"
                name="email" 
                onChange={handleChange}
                placeholder="your@example.com"
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500
                         focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300"
              />
            </div>
 
            {/* Password Input Field */}
            <div className="mb-4">
              <label htmlFor="signup-confirm-password" className="block text-gray-300 text-sm font-semibold mb-2 text-left">
                Password
              </label>
              <input
                type="password"
                id="signup-confirm-password"
                name="password" 
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500
                         focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300"
              />
            </div>
            
            
            <button
              type='submit'
              disabled={loading}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-md font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-12 px-6 py-3 w-full
                         bg-purple-600 text-white shadow-lg hover:bg-purple-700 transform transition duration-300 hover:scale-105"
            >
              Login
            {loading ? '...' : ''}
            </button>


            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-700"></div>
              <span className="mx-4 text-gray-400">or</span>
              <div className="flex-grow border-t border-gray-700"></div>
            </div>
            
            {/* Social Login Buttons */}
            <div className="flex flex-col space-y-4 w-full">
              {/* GitHub Button */}
              <button
                type="button"
                className="flex items-center justify-center w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg border border-gray-700 transition duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                </svg>
                Continue with GitHub
              </button>
              
              {/* Google Button */}
              <button
                type="button"
                className="flex items-center justify-center w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg border border-gray-700 transition duration-300"
                

              >
                <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                  <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
                </svg>
                Continue with Google
              </button>
            </div>
          </form>
          
          <p className="mt-8 text-gray-400">
            Don't have an account?{' '}
            <button onClick={() => navigate('/signup')} className="text-purple-400 hover:underline transition duration-300 focus:outline-none">
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  </BackgroundLines>
);
}

export default LoginPage;