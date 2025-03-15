import React, { useEffect, useState } from "react";
import { useCheckAuth } from "../../Hooks/useCheckAuth.js";

const Dashboard = () => {
  const { user, loading } = useCheckAuth(); 
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    setUserDetails(user?.data);
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center gap-6 px-4 sm:px-6 md:px-10 lg:px-20 py-10 sm:py-14 md:py-20">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black dark:text-gray-100">
        Followave
      </h1>
      
      {loading ? (
        <p className="text-lg sm:text-xl text-black dark:text-gray-100">
          Checking user authentication...
        </p>
      ) : userDetails ? (
        <p className="text-lg sm:text-xl text-black dark:text-gray-100">
          Hi <span className="font-semibold">{userDetails.username}</span>! Welcome to Followave
        </p>
      ) : (
        <p className="text-lg sm:text-xl text-black dark:text-gray-100">
          Validating user...
        </p>
      )}
    </div>
  );
};

export default Dashboard;
