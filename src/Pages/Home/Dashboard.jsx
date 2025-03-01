import React, { useEffect, useState } from "react";
import { useCheckAuth } from "../../Hooks/useCheckAuth.js";

const Dashboard = () => {
  const { user, loading } = useCheckAuth();
  const [person, setPerson] = useState(null);

  useEffect(() => {
    
    if (user?.data) {
      setPerson(user.data);
    }
    console.log(user);
  }, [user]);

  if (loading) {
    return <p>Checking authentication...</p>;
  }

  return (
    <div>
      <h1>Followave</h1>
      {person ? <p>Hi {person.username}! Welcome to Followave</p> : <p>User data not found</p>}
    </div>
  );
};

export default Dashboard;