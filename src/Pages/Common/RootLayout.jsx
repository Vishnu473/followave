import React from 'react'
import Navbar from '../../Components/Common/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../../Components/Common/Footer'

const RootLayout = () => {
  return (
    <div>
        <Navbar />
        <main>
            <Outlet />
        </main>
        <Footer />
    </div>
  )
}

export default RootLayout