import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProtectedLayout = ({ children, needLogIn=true }) => {

  const { isAuthenticated, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [checkUser, setCheckUser] = useState(true);

  useEffect(() => {
    if (!loading) {
      if (needLogIn && !isAuthenticated) {
        navigate('/auth/login');
      } else if (!needLogIn && isAuthenticated) {
        navigate('/dashboard');
      }
      setCheckUser(false);
    }
  }, [navigate, isAuthenticated, needLogIn, loading]);
  
  return ( checkUser ? <div className='text-black dark:text-white'>
    Checking user authentication.....
  </div> :
    <div>{children}</div>
  )
}

export default ProtectedLayout