import React, { useState } from "react";
import Navbar from "../../Components/Layout/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../../Components/Layout/Footer";
import Sidebar from "../../Components/Layout/Sidebar";

const RootLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">

      <Navbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />

      <div className="flex flex-1">

        <Sidebar isOpen={isSidebarOpen}/>

        <main className="flex-1 bg-white dark:bg-gray-800 overflow-auto">
          <Outlet />
        </main>
      </div>

      <Footer className="hidden md:block" />
    </div>
  );
};

export default RootLayout;
