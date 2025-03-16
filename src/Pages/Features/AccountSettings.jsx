import React from "react";
import { api } from "../../Services/ApiService.js";
import Swal from "sweetalert2";
import { APIEndPoints } from "../../Services/UrlConstants.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {logout, clearError} from "../../Hooks/Redux/slices/userSlice.js";

const AccountSettings = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const callLogoutApi = async () => {
    try {
      const response = await api.post(
        APIEndPoints.logout,
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
          await navigate("/home", { replace: true });
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
    // Handle responsiveness in future
    <div className="flex flex-col ">
      <h1 className="text-lg text-center sm:text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-white">
        Account Settings
      </h1>
      <div className="flex flex-col justify-center">
        {/* TODO - User Account settings to be added */}
        <button
          onClick={handleLogout}
          className="w-20 mt-5 px-2 py-1 rounded-sm hover:text-red-400 transition text-black dark:text-white"
        >
          Logout
        </button>
        
      </div>
    </div>
  );
};

export default AccountSettings;
