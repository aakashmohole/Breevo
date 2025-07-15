import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { logoutUser } from '../../api/api';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext'; // ⬅️ use your context

function Header() {

  const { user, logout } = useAuth(); // ⬅️ get user and logout from context

  const handleLogout = async () => {
    try {
      await logoutUser();     // This may clear backend cookie/token
      logout();               // This clears localStorage and context user ✅
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (err) {
      toast.error('Logout failed');
    }
  };

    
  const navigate = useNavigate()
  return (
    
    <header className="fixed  top-0 left-0 w-full z-50 bg-black bg-opacity-70 backdrop-blur-sm text-white p-4 py-5 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-5">
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wide" >Breevo</h1>
        <nav>
          <ul className="flex space-x-6">

            {!user ? (
              <>
                <li><a className="hover:text-gray-400 transition duration-300 text-sm md:text-base" onClick={() => navigate('/')}>Home</a></li>
                <li><a href="#how-it-works" className="hover:text-gray-400 transition duration-300 text-sm md:text-base">How it Works</a></li>
                <li><a href="#benefits" className="hover:text-gray-400 transition duration-300 text-sm md:text-base">Benefits</a></li>
                <button className="text-purple-400 hover:underline transition duration-300 focus:outline-none" onClick={() => navigate('/login')}>
                  Login
                </button>
              </>
            ) : (
              <li><button onClick={handleLogout} className="text-sm md:text-base text-gray-400 hover:text-white transition duration-300">Logout</button></li>
            )}

          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header