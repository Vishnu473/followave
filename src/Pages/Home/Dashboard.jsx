import React, { useEffect, useState } from "react";
import { useCheckAuth } from "../../Hooks/useCheckAuth.js";

const Dashboard = () => {
  const { user, loading } = useCheckAuth(); //This userCheckAuth() calls Redux functions to check if user has valid token / loggedIn or not.
  const [userDetails, setUserDetails] = useState(null);

  if (loading) {
    return <p className="text-black dark:text-gray-100">Checking authentication...</p>;
  }

  useEffect(() => {
    setUserDetails(user?.data)
  },[user])

  return (
    <div className="flex flex-col items-center gap-5 p-20">
      <h1 className="text-black text-3xl font-bold dark:text-gray-100">Followave</h1>
      {userDetails ? <p className="text-black text-lg dark:text-gray-100">Hi {userDetails.username}! Welcome to Followave</p> : <p className="text-black text-lg dark:text-gray-100">User data not found.</p>}
    </div>
  );
};

export default Dashboard;