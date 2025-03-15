import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { api } from "../../Services/ApiService.js";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { logout, clearError } from "../../Hooks/Redux/slices/userSlice.js";
import { useNavigate, useParams } from "react-router-dom";
import { APIEndPoints } from "../../Services/UrlConstants.js";
import { Edit, Save, Upload } from "lucide-react";

const Profile = () => {
  const { profileId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [userProfile, setUserProfile] = useState(null);

  const [editMode, setEditMode] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (profileId) {
      setUserProfile(null);
      fetchUserProfile(profileId);
    } else {
      setUserProfile(user?.data);
      setUpdatedProfile(user?.data);
    }
  }, [user, profileId]);

  const fetchUserProfile = async (profileId) => {
    try {
      setIsLoading(true);
      const response = await api.post(
        APIEndPoints.getProfileById(profileId),
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        setUserProfile(response.data.data);
        setUpdatedProfile(response.data.data);
      } else {
        navigate("/not-found");
      }
    } catch (error) {
      navigate("/not-found");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
    setUpdatedProfile(userProfile); // Reset changes if canceled
  };

  const handleChange = (e) => {
    setUpdatedProfile({ ...updatedProfile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      console.log(updatedProfile);

      const response = await api.post(
        APIEndPoints.updateProfile,
        updatedProfile,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setUserProfile(response.data.data);
        setEditMode(false);
        Swal.fire("Success", "Profile updated successfully", "success");
      }
    } catch (error) {
      Swal.fire("Error", "Failed to update profile", "error");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      const formData = new FormData();
      formData.append("file", file); // Use 'image' as expected by backend

      console.log([...formData]);

      try {
        const response = await api.post(
          APIEndPoints.uploadProfilePic,
          formData,
          {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        console.log(response);
        
        if (response.status === 200) {
          setUserProfile({
            ...userProfile,
            profilePic: response.data.url,
          });
        }
      } catch (error) {
        Swal.fire("Error", "Failed to update image", "error");
      }
    }
  };

  // useEffect(() => {
  //   if (profileId) {
  //     setUserProfile(null);
  //     fetchUserProfile(profileId);
  //   } else {
  //     setUserProfile(user?.data);
  //   }
  // }, [user, profileId]);

  // const fetchUserProfile = async (profileId) => {
  //   try {
  //     setIsLoading(true);
  //     const response = await api.post(
  //       APIEndPoints.getProfileById(profileId),
  //       {},
  //       { withCredentials: true }
  //     );
  //     console.log(response);

  //     if (response.status === 200) {
  //       setUserProfile(response.data.data);
  //     } else {
  //       navigate("/not-found");
  //     }
  //   } catch (error) {
  //     console.log("Error", error);
  //     navigate("/not-found");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

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
    <div className="p-2 sm:p-10 lg:p-20">
      {isLoading ? (
        <p className="text-center text-gray-900 dark:text-white">
          Loading profile...
        </p>
      ) : userProfile ? (
        <>
          <div className="flex justify-center">
            <div className="p-1 flex flex-col sm:flex-col gap-2 sm:gap-10 items-start text-left sm:text-left">
              <div className="w-full flex flex-row items-center gap-x-4">
                <div className="relative flex-shrink-0">
                  <img
                    src={
                      selectedImage ||
                      userProfile?.profilePic ||
                      "assets/default_profile.webp"
                    }
                    alt={userProfile.username}
                    className="w-20 h-20 object-cover sm:w-36 sm:h-36 lg:w-44 lg:h-44 rounded-full border border-gray-700 dark:border-gray-300 bg-gray-200 dark:bg-gray-500"
                  />
                  {!profileId && editMode && (
                    <label className="absolute bottom-1 right-1 md:bottom-2 md:right-2 lg:bottom-3 lg:right-3 bg-gray-800 text-white p-1 rounded-full cursor-pointer">
                      <Upload className="w-3 h-3 sm:w-4 sm:h-4 lg:w-4 lg:h-4" />
                      <input
                        type="file"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <div className="flex flex-row justify-end gap-x-2 sm:gap-x-4 lg:gap-x-6">
                  <div className="text-center">
                    <p className="text-sm sm:text-xl lg:text-2xl dark:text-gray-100 md:font-bold">
                      12
                    </p>
                    <p className="text-sm sm:text-xl lg:text-2xl dark:text-gray-400">
                      Posts
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm sm:text-xl lg:text-2xl dark:text-gray-100 md:font-bold">
                      12345
                    </p>
                    <p className="text-sm sm:text-xl lg:text-2xl dark:text-gray-400">
                      Followers
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm sm:text-xl lg:text-2xl dark:text-gray-100 md:font-bold">
                      6789
                    </p>
                    <p className="text-sm sm:text-xl lg:text-2xl dark:text-gray-400">
                      Following
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                {editMode ? (
                  <>
                    <input
                      type="text"
                      name="username"
                      value={updatedProfile.username}
                      onChange={handleChange}
                      className="text-lg sm:text-2xl lg:text-3xl font-bold bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white p-1 rounded"
                    />
                    <input
                      type="email"
                      name="email"
                      value={updatedProfile.email}
                      onChange={handleChange}
                      className="text-base sm:text-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white p-1 rounded"
                    />
                    <textarea
                      name="bio"
                      value={updatedProfile.bio}
                      onChange={handleChange}
                      className="text-sm sm:text-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white p-1 rounded"
                    />
                  </>
                ) : (
                  <>
                    <p className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                      {userProfile.username}
                    </p>
                    <p className="text-base sm:text-xl text-gray-900 dark:text-white">
                      {userProfile.email}
                    </p>
                    <p className="text-sm sm:text-lg text-gray-900 dark:text-white">
                      {userProfile.bio}
                    </p>
                  </>
                )}

                {!profileId && (
                  <div className="flex gap-2 mt-2">
                    {editMode ? (
                      <>
                        <button
                          onClick={handleSave}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                          <Save className="w-4 h-4 inline-block" /> Save
                        </button>
                        <button
                          onClick={handleEditToggle}
                          className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={handleEditToggle}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        <Edit className="w-4 h-4 inline-block" /> Edit
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-900 dark:text-white">
          Checking user credentials...
        </p>
      )}

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
