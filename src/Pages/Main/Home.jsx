import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-6 px-4 sm:px-6 md:px-10 lg:px-20 py-10 sm:py-14 md:py-20">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black dark:text-gray-100">
            Followave
          </h1>
          <p className='text-xl md:text-lg sm:text-md text-gray-500 dark:text-gray-300'>Kindly Login <Link to={"/auth/login"} replace className='underline text-blue-400'>here</Link></p>
        </div>
      );
}

export default Home