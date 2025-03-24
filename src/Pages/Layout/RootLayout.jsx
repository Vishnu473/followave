import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Layout/Navbar";
import { Navigate, Outlet } from "react-router-dom";
import Footer from "../../Components/Layout/Footer";
import Sidebar from "../../Components/Layout/Sidebar";
import { useSelector } from "react-redux";
import { Loading } from "../../Components/Shared/Loading";

const RootLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  return (
    <div className="flex flex-col">
      {/* <Navbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} /> */}
      <div className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow-md z-50">
        <Navbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
      </div>

      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} />

        <main
          className={`flex-1 bg-white dark:bg-gray-800 pt-16 pb-20 md:pb-0 min-h-screen ${
            isAuthenticated ? isSidebarOpen ? "md:ml-48" : "md:ml-20" : ""
          }`}
        >
          {loading ? (
            <div className="absolute inset-0 flex flex-col items-center bg-white dark:bg-gray-900 bg-opacity-75 z-50">
              <p className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-blue-500 dark:text-blue-400">
                {import.meta.env.VITE_APP_NAME}
              </p>
              <Loading msg={"Loading things for you....."} />
            </div>
          ) : (
            <>
              <Outlet />
              {isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/home" replace />
              )}
            </>
          )}
        </main>
      </div>

      {/* <Footer className="hidden md:block mt-auto" /> */}
    </div>
  );
};

export default RootLayout;
