import React from "react";

const Footer = () => {
  return (
    <footer className="hidden md:block bg-white border-t border-gray-300 dark:border-gray-600 text-gray-900 dark:bg-gray-900 dark:text-white p-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Branding Section */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold">FolloWave</h2>
          <p className="text-sm">
            © {new Date().getFullYear()} All Rights Reserved
          </p>
        </div>

        {/* Social Links Section */}
        <div className="flex space-x-6">
          {["Facebook", "Twitter", "Instagram", "LinkedIn"].map((platform) => (
            <a
              key={platform}
              href="#"
              className="text-sm hover:text-blue-400 transition inline-block"
            >
              {platform}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
