import React from 'react'
import { useNavigate } from 'react-router-dom'

function Header() {
  const navigate = useNavigate()
  return (
    <header className="fixed  top-0 left-0 w-full z-50 bg-black bg-opacity-70 backdrop-blur-sm text-white p-4 py-5 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-5">
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wide" onClick={() => navigate('/')}>Breevo</h1> {/* Updated branding */}
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#hero" className="hover:text-gray-400 transition duration-300 text-sm md:text-base">Home</a></li>
            <li><a href="#how-it-works" className="hover:text-gray-400 transition duration-300 text-sm md:text-base">How it Works</a></li> {/* New section */}
            <li><a href="#benefits" className="hover:text-gray-400 transition duration-300 text-sm md:text-base">Benefits</a></li> {/* New section */}
             <button className="text-purple-400 hover:underline transition duration-300 focus:outline-none" onClick={() => navigate('/login')}>
              Login
            </button>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header