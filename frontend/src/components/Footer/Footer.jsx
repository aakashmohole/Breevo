import React from 'react'

function Footer() {
  return (
    <footer className="bg-black text-gray-400 p-8 mt-12 text-sm">
      <div className="container mx-auto text-center md:flex md:justify-between md:items-center">
        <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} AI Interviewer. All rights reserved.</p> {/* Updated branding */}
        <div className="flex justify-center space-x-6">
          <a href="#" className="hover:text-white transition duration-300">Privacy Policy</a>
          <a href="#" className="hover:text-white transition duration-300">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer