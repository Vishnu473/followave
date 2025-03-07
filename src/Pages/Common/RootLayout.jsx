import React from 'react'
import Navbar from '../../Components/Common/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../../Components/Common/Footer'

const RootLayout = () => {
  return (
    <div>
        <Navbar />
        <main className='bg-white dark:bg-gray-800'>
            <Outlet />
        </main>
        <Footer />
    </div>
  )
}

export default RootLayout