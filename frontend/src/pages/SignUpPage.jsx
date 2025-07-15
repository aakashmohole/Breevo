import React from 'react';

import { toast } from 'react-toastify';

import { BackgroundLines } from '../components/ui/background-lines';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { signupUser } from '../api/api';


function SignUpPage() {
  const navigate = useNavigate()
  
  
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await signupUser(form);
      toast.success('Signup successful! Please log in.');
      navigate('/login')
      setSuccess('Signup successful!');
    } catch (err) {
      toast.warning('Signup failed. Try again.');
      setError(err.message);
    }finally {
      setLoading(false); // hide loader
    }
  };

  const signInWithGitHub = () => {
  toast.info("GitHub signup not yet set up.");
  }

  const signInWithGoogle = () => {
    toast.info("Google signup not yet set up.");
  }

  return (
  <BackgroundLines>
    {/* Main container that centers everything */}
    <div className="mt-8 flex flex-col items-center justify-center p-4">
      {/* Content container with max-width */}
      <div className="flex bg-gray-950 bg-opacity-90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-800 max-w-4xl w-full overflow-hidden">
        
        {/* Image Section (hidden on mobile) */}
        <div className="hidden md:block w-1/2">
          <img
            src="https://images.unsplash.com/photo-1659384912057-b50718beb225?q=80&w=647&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="AI Interviewer concept illustration"
            className="object-cover w-full h-full"
          />
        </div>
        
        {/* Form Section */}
        <div className="p-8 w-full md:w-1/2 flex flex-col justify-center">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white tracking-wide">Breevo</h1>
          </div>
          <h2 className="text-4xl font-bold text-white mb-8 text-center">Join Us</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-sm mx-auto">
            {/* Email Field */}
            <div className="mb-4">
              <label htmlFor="signup-email" className="block text-gray-300 text-sm font-semibold mb-2 text-left">
                Email
              </label>
              <input
                type="email"
                id="signup-email"
                value={form.email}
                name='email'
                onChange={handleChange}
                placeholder="your@example.com"
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500
                         focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300"
              />
            </div>
            
            {/* Name Field */}
            <div className="mb-4">
              <label htmlFor="signup-name" className="block text-gray-300 text-sm font-semibold mb-2 text-left">
                Name
              </label>
              <input
                type="text"
                id="signup-name"
                name='name'
                value={form.name}
                onChange={handleChange}
                placeholder="Ex: Aakash Mohole"
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500
                         focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300"
              />
            </div>
            
            {/* Password Field */}
            <div className="mb-4">
              <label htmlFor="signup-confirm-password" className="block text-gray-300 text-sm font-semibold mb-2 text-left">
                Password
              </label>
              <input
                type="password"
                id="signup-confirm-password"
                name='password'
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500
                         focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300"
              />
            </div>
            
            {/* Sign Up Button */}
            <button type='submit'
              disabled={loading}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-md font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-12 px-6 py-3 w-full
                         bg-purple-600 text-white shadow-lg hover:bg-purple-700 transform transition duration-300 hover:scale-105"
            >
              Sign Up
            {loading ? '...' : ''}
            </button>
            
            {/* Error/Success Messages */}
            {error && <p className="text-red-500 text-center">{error}</p>}
            {success && <p className="text-green-500 text-center">{success}</p>}
            
            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-700"></div>
              <span className="mx-4 text-gray-400">or</span>
              <div className="flex-grow border-t border-gray-700"></div>
            </div>
            
            {/* Social Login Buttons */}
            <div className="flex flex-col space-y-4 w-full">
              <button
                type="button"
                onClick={() => signInWithGitHub()}
                className="flex items-center justify-center w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg border border-gray-700 transition duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                </svg>
                Continue with GitHub
              </button>
              
              <button
                type="button"
                onClick={() => signInWithGoogle()}
                className="flex items-center justify-center w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg border border-gray-700 transition duration-300"
              >
                <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                  <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
                </svg>
                Continue with Google
              </button>
            </div>
          </form>
          
          <p className="mt-8 text-gray-400 text-center">
            Already have an account?{' '}
            <button className="text-purple-400 hover:underline transition duration-300 focus:outline-none" onClick={() => navigate('/login')}>
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  </BackgroundLines>
);
}

export default SignUpPage;