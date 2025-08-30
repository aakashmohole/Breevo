import React, { useState, useEffect } from 'react';

// Mocking external dependencies for self-contained example
const mockLogoutUser = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Mock logout successful');
      resolve();
    }, 500);
  });
};

const mockToast = {
  success: (message) => console.log('Toast Success:', message),
  error: (message) => console.error('Toast Error:', message),
};

const mockUseNavigate = () => {
  return (path) => {
    console.log('Navigating to:', path);
    // In a real app, this would change the URL
    // For this example, we'll just log it
  };
};

function DashboardHeader() {
  const navigate = mockUseNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await mockLogoutUser();
      mockToast.success('Logged out successfully');
      navigate('/login'); // redirect after logout
    } catch (err) {
      mockToast.error('Logout failed');
    }
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  // Close menu if screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // Tailwind's 'md' breakpoint
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black bg-opacity-70 backdrop-blur-sm text-white p-4 shadow-lg rounded-b-lg">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-0">
        <h1 className="text-2xl md:text-3xl font-bold tracking-wide">Breevo</h1>

        {/* Desktop nav */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li>
              <button
                onClick={handleLogout}
                className="text-sm md:text-base text-gray-400 hover:text-white transition duration-300 px-3 py-2 rounded-md hover:bg-gray-800"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white transition duration-300"
          aria-label="Toggle menu"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden bg-black bg-opacity-90 backdrop-blur-sm mt-4 rounded-lg shadow-xl max-w-xs mx-auto py-2">
          <ul className="flex flex-col">
            <li className="border-b border-gray-700 last:border-b-0">
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false); // Close menu after action
                }}
                className="w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 transition duration-300 rounded-md"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

// Main App component to render DashboardHeader
export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 font-sans text-gray-100">
      {/* Tailwind CSS CDN */}
      <script src="https://cdn.tailwindcss.com"></script>
      {/* Font Inter */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
      <style>
        {`
          body {
            font-family: 'Inter', sans-serif;
            margin: 0;
            padding-top: 80px; /* Adjust based on header height */
          }
          /* Custom scrollbar for better aesthetics */
          ::-webkit-scrollbar {
            width: 8px;
          }
          ::-webkit-scrollbar-track {
            background: #1a202c; /* dark-900 */
          }
          ::-webkit-scrollbar-thumb {
            background: #4a5568; /* gray-600 */
            border-radius: 4px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #718096; /* gray-500 */
          }
        `}
      </style>
      <DashboardHeader />
      <main className="container mx-auto p-8 text-center">
        <h2 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Welcome to Breevo Dashboard
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          This is a demonstration of the responsive header component. Resize your browser window to see the mobile menu in action.
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-2 text-white">Feature {item}</h3>
              <p className="text-gray-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
