import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { checkAuth, refreshToken } from "../Hooks/Redux/slices/userSlice.js";

export const useCheckAuth = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); 

  useEffect(() => {
    const verifyUser = async () => {
      try {
        await dispatch(checkAuth()).unwrap();
      } catch (error) {
        console.warn("Access token expired. Attempting refresh...");

        try {
          await dispatch(refreshToken()).unwrap();
        } catch (refreshError) {
          console.warn("Refresh token expired. Redirecting to login.");
          navigate("/auth/login");
        }
      }
    };

    if (!isAuthenticated) {
      verifyUser();
    }
  }, [dispatch, isAuthenticated, navigate]);

  // Redirect after successful authentication
  useEffect(() => {
    if (isAuthenticated && location.pathname === "/auth/login") {
      navigate("/dashboard"); // Redirect only if user is on the login page
    }
  }, [isAuthenticated, location.pathname, navigate]);

  return { user, loading, isAuthenticated };
};
