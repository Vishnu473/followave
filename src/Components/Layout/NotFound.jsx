import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-lg mt-2">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="mt-4 text-black dark:text-white underline hover:text-blue-500">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
