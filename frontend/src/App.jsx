
import './App.css'


function App() {

  return (
    <>
      {/* Tailwind CSS CDN */}
      <script src="https://cdn.tailwindcss.com"></script>
      {/* Google Fonts - Inter */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800;900&display=swap" rel="stylesheet" />

      <style>
        {`
        body {
          font-family: 'Inter', sans-serif;
          margin: 0;
          padding: 0;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          background-color: #000; /* Ensure body background is black */
        }

        /* Basic Fade-in Animation */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }

        /* Fade-in-Up Animation for Hero text */
        @keyframes fadeInMoveUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in-up {
          animation: fadeInMoveUp 1s ease-out forwards;
        }

        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
        `}
      </style>

    </>
  )
}

export default App
