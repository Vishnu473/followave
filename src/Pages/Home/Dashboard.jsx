import React, { useEffect, useState } from "react";
import { useCheckAuth } from "../../Hooks/useCheckAuth.js";

const Dashboard = () => {
  const { user, loading } = useCheckAuth(); //This userCheckAuth() calls Redux functions to check if user has valid token / loggedIn or not.
  const [userDetails, setUserDetails] = useState(null);

  if (loading) {
    return <p>Checking authentication...</p>;
  }

  useEffect(() => {
    setUserDetails(user?.data)
  },[user])

  return (
    <div>
      <h1>Followave</h1>
      {userDetails ? <p>Hi {userDetails.username}! Welcome to Followave</p> : <p>User data not found</p>}
    </div>
  );
};

export default Dashboard;