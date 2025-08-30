import React from 'react'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'

function Layout() {
  return(
    <>
      <Header />
      <ToastContainer position="top-right" autoClose={5000} theme="dark"/>
      <Outlet />

   </>
  )

}

export default Layout