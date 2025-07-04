import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext';


import Layout from './Layout.jsx'
import Footer from './components/Footer/Footer.jsx'
import Header from './components/Header/Header.jsx'
import LandingPage from './pages/LandingPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
// import Dashboard from './pages/Dashboard.jsx'
import DashboardPage from './pages/DashboardPage.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path='' element={<LandingPage />} />
      <Route path='signup' element={<SignUpPage />}/>
      <Route path='login' element={<LoginPage />}/>
      <Route path='dashboard' element={<DashboardPage />}/>
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
