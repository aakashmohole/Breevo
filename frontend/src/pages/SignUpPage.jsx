import React from 'react';
import { BackgroundLines } from '../components/ui/background-lines';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { signupUser } from '../api/api';


function SignUpPage() {
  const navigate = useNavigate()

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
      setSuccess('Signup successful!');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    // Overall page container: centers the content vertically and horizontally, sets background
    <BackgroundLines>
    <div className="min-h-screen flex items-center justify-center lg: m-16">
      {/* Main content container: holds both the image and the form.
          Uses flexbox for side-by-side layout, increased max-width, and styling. */}
          
      <div className="flex bg-gray-950 bg-opacity-90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-800 max-w-4xl w-full overflow-hidden">
        
        {/* Image Section: Hidden on small screens, takes half width on medium and larger screens */}
        
        <div className="hidden md:block w-1/2">
          <img
            src="https://plus.unsplash.com/premium_photo-1661284836545-3a6ec65fcffc?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Placeholder AI/tech-related image
            alt="AI Interviewer concept illustration"
            className="object-cover w-full h-full" // Ensures the image covers its container
          />
        </div>
        
        {/* Form Section: Takes full width on small screens, half width on medium and larger screens.
            Content is centered within this column. */}
        <div className="p-8 w-full md:w-1/2 flex flex-col justify-center items-center text-center">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white tracking-wide">AI Interviewer</h1>
          </div>
          <h2 className="text-4xl font-bold text-white mb-8">Join Us</h2>
          <form onSubmit={handleSubmit}  className="space-y-6 w-full max-w-sm mx-auto"> {/* Form takes full width of its column, capped at max-w-sm, and centered */}
            {/* Email Input Field */}
            <div className="mb-4">
              <label htmlFor="signup-email" className="block text-gray-300 text-sm font-semibold mb-2 text-left">
                Email
              </label>
              <input
                type="email"
                id="signup-email"
                value={form.email} // Uncomment and add state management as needed
                name='email'
                onChange={handleChange}
                placeholder="your@example.com"
                className="w-full  p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500
                         focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300"
              />
            </div>
            {/* Password Input Field */}
            <div className="mb-4">
              <label htmlFor="signup-name" className="block text-gray-300 text-sm font-semibold mb-2 text-left">
                Name
              </label>
              <input
                type="text"
                id="signup-name"
                name='name'
                value={form.name} // Uncomment and add state management as needed
                onChange={handleChange}
                placeholder="Ex: Aakash Mohole"
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500
                         focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300"
              />
            </div>
            {/* Confirm Password Input Field */}
            <div className="mb-4">
              <label htmlFor="signup-confirm-password" className="block text-gray-300 text-sm font-semibold mb-2 text-left">
                Password
              </label>
              <input
                type="password"
                id="signup-confirm-password"
                name='password'
                value={form.password} // Uncomment and add state management as needed
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500
                         focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300"
              />
            </div>
            {/* Sign Up Button */}
            <button type='submit'
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-md font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-12 px-6 py-3 w-full
                         bg-purple-600 text-white shadow-lg hover:bg-purple-700 transform transition duration-300 hover:scale-105"
            >
              Sign Up
            </button>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
          </form>
          <p className="mt-8 text-gray-400">
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