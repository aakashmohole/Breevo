import React from 'react';
import { logoutUser } from '../../api/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { showCustomAlert } from '../../utils/showCustomAlert';

function DashboardHeader() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    // showCustomAlert('Logging out...', 'info');
    try {
      await logoutUser();
      toast.success('Logged out successfully');
      navigate('/login'); // or wherever you want to redirect
    } catch (err) {
      toast.error('Logout failed');
    }
  }  


  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black bg-opacity-70 backdrop-blur-sm text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-0">
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wide">Breevo</h1>
        <nav>
          <ul className="flex space-x-6">
            <li><button onClick={handleLogout} className="text-sm md:text-base text-gray-400 hover:text-white transition duration-300">Logout</button></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default DashboardHeader;