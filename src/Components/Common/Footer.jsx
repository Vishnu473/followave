import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-6 text-center">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0">
          <h2 className="text-lg font-semibold">FolloWave</h2>
          <p className="text-sm">
            © {new Date().getFullYear()} All Rights Reserved
          </p>
        </div>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-blue-400 transition">
            Facebook
          </a>
          <a href="#" className="hover:text-blue-400 transition">
            Twitter
          </a>
          <a href="#" className="hover:text-blue-400 transition">
            Instagram
          </a>
          <a href="#" className="hover:text-blue-400 transition">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
