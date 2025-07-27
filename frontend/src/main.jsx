import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRouts/ProtectedRoute.jsx';
import PublicRoute from './components/ProtectedRouts/PublicRoute.jsx';


import App from './App.jsx'
import Layout from './Layout.jsx'
import LandingPage from './pages/LandingPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx';
import PracticeInterview from './components/Dashboard/Sections/PastInterviewsList.jsx';
import InterviewReadyDisplay from './components/NewInterviewComponents/InterviewReadyDisplay.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>

      <Route path='' element={
        <PublicRoute>
          <LandingPage />
        </PublicRoute>
      } />

      <Route path='login' element={
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      }/>
      <Route path='signup' element={<SignUpPage />}/>

      <Route path='dashboard' element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      }/>

      <Route path="/liveInterview" element={<PracticeInterview />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
   
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>

  </StrictMode>,
)
