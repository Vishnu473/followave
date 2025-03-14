import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Layout/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../../Components/Layout/Footer";
import Sidebar from "../../Components/Layout/Sidebar";
import { useSelector } from "react-redux";
import { Loading } from "../../Components/Shared/Loading";

const RootLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  return (
    <div className="flex flex-col h-screen">
      <Navbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />

      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} />

        <main className="flex-1 bg-white dark:bg-gray-800 overflow-auto">
        {loading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-900 bg-opacity-75 z-50">
              <Loading
                msg={"Loading things for you...."}
              />
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>

      <Footer className="hidden md:block" />
    </div>
  );
};

export default RootLayout;
