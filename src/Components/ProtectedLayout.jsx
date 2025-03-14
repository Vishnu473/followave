import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProtectedLayout = ({ children, needLogIn=true }) => {

  const loggedInStatus = useSelector((state) => state.user.isAuthenticated)
  const navigate = useNavigate();

  const [checkUser, setCheckUser] = useState(true);

  useEffect(() => {
    if(needLogIn && loggedInStatus !== needLogIn){
      navigate("/auth/login");
    }
    else if(!needLogIn && loggedInStatus !== needLogIn){
      navigate("/dashboard");
    }
    setCheckUser(false);
  },[navigate,loggedInStatus,needLogIn])
  
  return ( checkUser ? <div className='text-black dark:text-white'>
    Checking user authentication.....
  </div> :
    <div>{children}</div>
  )
}

export default ProtectedLayout