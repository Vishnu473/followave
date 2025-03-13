import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { api } from "../../Services/ApiService.js";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { logout, clearError } from "../../Hooks/Redux/slices/userSlice.js";
import { useNavigate, useParams } from "react-router-dom";

const Profile = () => {
  const { profileId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    
    if (profileId) {
      setUserProfile(null);
      fetchUserProfile(profileId);
    } else {
      setUserProfile(user?.data);
    }
  }, [user, profileId]);

  const fetchUserProfile = async (profileId) => {
    try {
      setIsLoading(true);
      const response = await api.post(
        `/users/get-user-profile/${profileId}`,
        {},
        { withCredentials: true }
      );
      console.log(response);

      if (response.status === 200) {
        setUserProfile(response.data.data);
      } else {
        navigate("/not-found");
      }
    } catch (error) {
      console.log("Error",error);
      navigate("/not-found")
    }
    finally{
      setIsLoading(false);
    }
  };

  const callLogoutApi = async () => {
    try {
      const response = await api.post(
        "/users/logout",
        {},
        { withCredentials: true }
      );

      if (response && response.status === 200) {
        dispatch(logout());
        dispatch(clearError());

        Swal.fire({
          icon: "success",
          title: "Logged out successfully",
          showConfirmButton: false,
          timer: 1000,
        }).then(async () => {
          await navigate("/auth/login", { replace: true });
        });
      }
    } catch (error) {
      console.error("Logout failed:", error);
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Are you sure you want to Log Out?",
      text: "You will need to log in again.",
      showCancelButton: true,
      confirmButtonText: "Yes, Log Out",
      cancelButtonText: "No, Stay Logged In",
    });

    if (result.isConfirmed) {
      await callLogoutApi();
    }
  };

  return (
    <div className="p-6 sm:p-10 lg:p-20">
      {isLoading ? (
        <p className="flex justify-center text-gray-900 dark:text-white">
          Loading userProfile.....
        </p>
      ):
      (userProfile ? (
        <div className="flex justify-center ">
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-center text-center sm:text-left">
            <img
              src={userProfile?.profilePic || "assets/default_profile.webp"}
              alt={userProfile.username}
              className="w-24 h-24 object-cover sm:w-36 sm:h-36 lg:w-44 lg:h-44 rounded-full border border-gray-700 dark:border-gray-300 bg-gray-200 dark:bg-gray-500"
            />
            <div className="flex flex-col gap-2">
              <p className="text-gray-900 dark:text-white text-lg sm:text-2xl lg:text-3xl font-bold">
                {userProfile.username}
              </p>
              <p className="text-gray-900 dark:text-white text-base sm:text-xl">
                {userProfile.email}
              </p>
              <p className="text-gray-900 dark:text-white text-sm sm:text-lg">
                {userProfile.bio}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-black dark:text-white ">
          No user found 
        </p>
      ))}
      {profileId ? null : (
        <button
          onClick={handleLogout}
          className="mt-5 border-2 px-2 py-1 rounded-sm hover:text-red-400 transition text-black dark:text-white"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Profile;
