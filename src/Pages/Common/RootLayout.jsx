import React, { useState } from "react";
import Navbar from "../../Components/Layout/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../../Components/Layout/Footer";
import Sidebar from "../../Components/Layout/Sidebar";

const RootLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar - Full width */}
      <Navbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />

      {/* Main Content Wrapper */}
      <div className="flex flex-1">
        {/* Sidebar (fixed width when open/closed) */}
        <Sidebar isOpen={isSidebarOpen} />

        {/* Main Content - Takes full remaining width */}
        <main className="flex-1 bg-white dark:bg-gray-800 p-4 overflow-auto">
          <Outlet />
        </main>
      </div>

      {/* Footer - Full width, hidden on mobile */}
      <Footer className="hidden md:block" />
    </div>
  );
};

export default RootLayout;
