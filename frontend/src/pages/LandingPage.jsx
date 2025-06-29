import React from 'react'
import { BackgroundLines } from '../components/ui/background-lines';
import { BackgroundBeams } from '../components/ui/background-beams';
import { useNavigate } from 'react-router-dom'
function LandingPage() {

  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-black text-white font-inter overflow-x-hidden">

      {/* Hero Section - AI Interview Focus */}
      <section id="hero" className="relative h-screen flex flex-col items-center justify-center text-center p-4 bg-gray-950">
        {/* Placeholder image for a sleek product */}
      
        <BackgroundBeams>
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div> {/* Gradient overlay */}
        </BackgroundBeams>
        <div className="relative z-20 max-w-5xl mx-auto px-4">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight text-white drop-shadow-lg animate-fade-in-up">
            Master Your Next Interview. <span className="text-purple-400">Powered by AI.</span>
          </h2>
          <p className="text-lg md:text-2xl text-gray-300 mb-10 opacity-0 animate-fade-in delay-200">
            Customize your mock interview experience and get instant, intelligent feedback to excel.
          </p>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-lg font-semibold h-14 px-8 py-3
                             bg-white text-black shadow-lg hover:bg-gray-200 transition-all duration-300 ease-in-out transform hover:scale-105 opacity-0 animate-fade-in delay-400"
                             onClick={() => navigate('/signup')}>
            Start Your Free Mock Interview
          </button>
        </div>
        
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 bg-black">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="text-left">
            <h3 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
              1. Define Your <span className="text-purple-400">Interview.</span>
            </h3>
            <p className="text-lg text-gray-300 mb-8">
              Tell our AI about your dream job. Specify the role, industry, required skills, and even company culture. The more details you provide, the more precise your mock interview will be.
            </p>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-md font-semibold h-12 px-6 py-3
                               bg-purple-600 text-white shadow-lg hover:bg-purple-700 transition-all duration-300 ease-in-out">
              Set Up Your Interview
            </button>
          </div>
          <div className="relative overflow-hidden rounded-3xl shadow-2xl group">
            <img
              src="https://images.unsplash.com/photo-1554200876-980213841c94?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Thematic image
              alt="Customize Interview"
              className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x600/333/FFF?text=Input+Details"; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
          </div>
        </div>
      </section>

      {/* AI Interview Section */}
      <section className="py-20 px-4 bg-gray-950">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 md:order-1 overflow-hidden rounded-3xl shadow-2xl group">
            <img
              src="https://images.unsplash.com/photo-1633311905139-7b6088a69e33?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Thematic image
              alt="AI Conducting Interview"
              className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x600/333/FFF?text=AI+Interview"; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
          </div>
          <div className="text-left order-1 md:order-2">
            <h3 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
              2. Experience Your <span className="text-purple-400">AI Interview.</span>
            </h3>
            <p className="text-lg text-gray-300 mb-8">
              Our advanced AI generates realistic interview questions based on your specifications. Engage in a live, interactive mock interview tailored to your exact needs, simulating a real-world scenario.
            </p>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-md font-semibold h-12 px-6 py-3
                               bg-purple-600 text-white shadow-lg hover:bg-purple-700 transition-all duration-300 ease-in-out">
              Begin Practice
            </button>
          </div>
        </div>
      </section>

      {/* Benefits Section (was "Explore Section") */}
      <section id="benefits" className="py-20 px-4 bg-black text-center">
        <div className="container mx-auto">
          <h3 className="text-4xl md:text-5xl font-bold mb-12 text-white">
            Unlock Your Interview <span className="text-purple-400">Potential.</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Personalized Feedback", img: "https://placehold.co/500x350/0a0a0a/FFF?text=Feedback", description: "Receive detailed, constructive feedback on your answers and delivery." },
              { title: "Performance Analytics", img: "https://placehold.co/500x350/0a0a0a/FFF?text=Analytics", description: "Track your progress with data-driven insights into your strengths and weaknesses." },
              { title: "Realistic Scenarios", img: "https://placehold.co/500x350/0a0a0a/FFF?text=Scenarios", description: "Practice for specific roles and industries with highly relevant questions." },
              { title: "Skill-Based Practice", img: "https://placehold.co/500x350/0a0a0a/FFF?text=Skills", description: "Target specific skills with specialized interview modules." },
              { title: "Anytime, Anywhere", img: "https://placehold.co/500x350/0a0a0a/FFF?text=Flexibility", description: "Hone your interview skills 24/7 from any device." },
              { title: "Instant Results", img: "https://placehold.co/500x350/0a0a0a/FFF?text=Results", description: "Get immediate insights after each mock interview session." },
            ].map((item, index) => (
              <div key={index} className="relative overflow-hidden rounded-xl shadow-xl group bg-gray-900 p-4 transform transition-all duration-300 hover:scale-105">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-lg mb-4 transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/500x350/333/FFF?text=Image"; }}
                />
                <h4 className="text-xl font-semibold text-white mb-2">{item.title}</h4>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action / Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gray-950 text-center">
        <div className="container mx-auto max-w-3xl">
          <h3 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
            Ready to Ace Your Next <span className="text-purple-400">Interview?</span>
          </h3>
          <p className="text-lg text-gray-300 mb-10">
            Sign up now and start practicing with your personalized AI interviewer.
          </p>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-lg font-semibold h-14 px-8 py-3
                             bg-white text-black shadow-lg hover:bg-gray-200 transition-all duration-300 ease-in-out transform hover:scale-105">
            Get Started Free
          </button>
        </div>
      </section>
    </div>

  )
}

export default LandingPage