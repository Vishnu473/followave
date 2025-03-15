import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { checkAuth, refreshToken } from "../Hooks/Redux/slices/userSlice.js";

export const useCheckAuth = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          navigate("/home");
        }
      }
    };

    if (!isAuthenticated) {
      verifyUser();
    }
  }, [dispatch, isAuthenticated, navigate]);

  return { user, loading, isAuthenticated };
};
