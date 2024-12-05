import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import { useLocation } from 'react-router-dom'
const Layout = () => {
  const location = useLocation();
  return (
    <>
      <Header />
      <Outlet/>
      <Footer/>
    </>
  )
}

export default Layout
