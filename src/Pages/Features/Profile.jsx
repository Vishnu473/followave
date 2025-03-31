import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { api } from "../../Services/ApiService.js";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../Hooks/Redux/slices/userSlice.js";
import { useNavigate, useParams } from "react-router-dom";
import { APIEndPoints } from "../../Services/UrlConstants.js";
import {
  Edit,
  Save,
  Upload,
} from "lucide-react";
import ProfilePosts from "../../Components/Features/Profile/ProfilePosts.jsx";
import ProfileStats from "../../Components/Features/Profile/ProfileStats.jsx";
import ProfileFollow from "../../Components/Features/Profile/ProfileFollow.jsx";

const Profile = () => {
  const { profileId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [userProfile, setUserProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);

  const [editMode, setEditMode] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [userId, setUserId] = useState("");
  const [isSelf, setIsSelf] = useState(false);

  const [followStats, setFollowStats] = useState({
    followers: 0,
    following: 0,
    pendingFollowers: 0,
    pendingFollowing: 0,
    blockedFollowers: 1,
  });

  useEffect(() => {
    if (profileId) {
      setUserProfile(null);
      fetchUserProfile(profileId);
      getUserPosts(profileId);
    } else {
      setUserProfile(user?.data);
      getUserPosts(user?.data._id);
      setUpdatedProfile(user?.data);
    }
    const id = profileId ? profileId : user?.data?._id;
    setUserId(id);
    setIsSelf(!profileId);
  }, [user, profileId]);

  const getUserPosts = async (userId) => {
    setIsLoading(true);
    try {
      const response = isSelf
        ? await api.get(APIEndPoints.getAllPosts, {}, { withCredentials: true })
        : await api.post(
            APIEndPoints.getUserposts(userId),
            {},
            { withCredentials: true }
          );
      if (
        response.status === 200 &&
        response?.data.success &&
        response.data.data
      ) {
        setUserPosts(response.data.data);
      }
    } catch (error) {
      console.error(
        "Error fetching user posts:",
        error.response?.data?.message || error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleEditToggle = async (Edittype) => {
    if (Edittype === "Cancel") {
      try {
        if (uploadedImage?.file?.filename) {
          await api.delete(APIEndPoints.deleteMedia, {
            data: { publicIds: [uploadedImage?.file?.filename] },
            withCredentials: true,
          });
        }
      } catch (error) {
        console.error("Failed to delete image:", error);
      }
      setSelectedImage(null);
      setUserProfile((prev) => ({ ...prev, profilePic: null }));
    }

    setEditMode(!editMode);
    setUpdatedProfile(userProfile);
  };

  const handleChange = (e) => {
    setUpdatedProfile({ ...updatedProfile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const updatedUserResponse = await dispatch(
        updateProfile(updatedProfile)
      ).unwrap();

      if (updatedUserResponse && updatedUserResponse?.success) {
        setUserProfile(updatedUserResponse.data);
        setEditMode(false);
        Swal.fire({
          title: updatedUserResponse?.success ? "Success" : "Error",
          text: updatedUserResponse?.message,
          icon: updatedUserResponse?.success ? "success" : "error",
          timer: 1500,
          showConfirmButton: false,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      Swal.fire(
        "Error",
        error?.response?.data?.message || error || "Failed to update profile",
        "error"
      );
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      const formData = new FormData();
      formData.append("file", file); // Use 'file' as key

      try {
        const response = await api.post(
          APIEndPoints.uploadSingleProfilePic,
          formData,
          {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (response.status === 200) {
          setUploadedImage(response.data);
          const imageUrl = response.data.url;

          setUserProfile({
            ...userProfile,
            profilePic: imageUrl,
          });

          setUpdatedProfile({
            ...updatedProfile,
            profilePic: imageUrl,
          });
        }
      } catch (error) {
        console.log(error);

        Swal.fire(
          "Error",
          error?.response?.data?.message ?? "Failed to update image",
          "error"
        );
      }
    }
  };

  const fetchFollowStats = async () => {
    try {
      const response = isSelf
        ? await api.get("/follow/getMyFollowStats")
        : await api.get(`/follow/getUserFollowStats/${userId}`);

      if (response.status === 200 && response?.data?.success) {
        setFollowStats({
          followers: response?.data?.data?.followers,
          following: response?.data?.data?.following,
          pendingFollowers: isSelf ? response?.data?.data?.pendingFollowers : 0,
          pendingFollowing: isSelf ? response?.data?.data?.pendingFollowing : 0,
          blockedFollowers: isSelf ? response?.data?.data?.blockedFollowers : 0,
        });
      }
    } catch (error) {
      console.error("Error fetching follow stats:", error);
    }
  };

  const showPosts = (userProfile) => {
    if (isSelf) {
      return true;
    }
    return userProfile?.privacy === "public" ||
      userProfile?.privacy === "followers"
      ? true
      : false;
  };

  const viewPendingRequests = async () => {
    navigate("/pendingRequests");
  };

  return (
    <div>
      {isLoading ? (
        <p className="text-center text-gray-900 dark:text-white">
          Loading profile...
        </p>
      ) : (
        userProfile && (
          <>
            <div className="flex">
              <div className="pt-4 w-full items-start flex flex-col justify-start md:justify-around gap-2 sm:gap-4 text-left sm:text-left md:pt-8">
                {/* UserImage with Stats */}
                <div className="p-1 w-full flex flex-row justify-start md:justify-evenly gap-x-4">
                  <div className="relative flex-shrink-0">
                    <img
                      src={
                        selectedImage ||
                        userProfile?.profilePic ||
                        "assets/default_profile.webp"
                      }
                      alt={userProfile.username}
                      className="w-20 h-20 object-cover bg:gray-100 sm:w-36 sm:h-36 lg:w-44 lg:h-44 rounded-full border border-gray-700 dark:border-gray-300 bg-gray-200 dark:bg-gray-500"
                    />
                    {!profileId && editMode && (
                      <label className="absolute top-12 sm:top-24 right-1 md:top-28 md:right-2 lg:top-36 lg:right-3 bg-gray-800 text-white p-1 rounded-full cursor-pointer">
                        <Upload className="w-3 h-3 sm:w-4 sm:h-4 lg:w-4 lg:h-4" />
                        <input
                          type="file"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                  {/* Stats */}
                  <div className="flex flex-col gap-1 md:gap-2">
                    {editMode ? (
                      <input
                        type="text"
                        name="username"
                        value={updatedProfile.username}
                        onChange={handleChange}
                        className="text-lg sm:text-2xl lg:text-3xl font-bold bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white p-1 rounded"
                      />
                    ) : (
                      <p className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                        {userProfile.username}
                      </p>
                    )}
                    <ProfileStats
                      device="desktop"
                      postsNum={userPosts?.length}
                      followStats={followStats}
                      fetchFollowStats={fetchFollowStats}
                    />
                    {editMode ? (
                      <>
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
                        <p className="text-base sm:text-xl text-gray-900 dark:text-white">
                          {userProfile.email}
                        </p>
                        <p className="text-sm sm:text-lg text-gray-900 dark:text-white">
                          {userProfile.bio}
                        </p>
                      </>
                    )}
                    <div className="flex gap-2">
                      {!profileId ? (
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
                                onClick={() => handleEditToggle("Cancel")}
                                className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <div className="flex flex-col gap-2 min-[330px]:flex-row">
                              <button
                                onClick={() => handleEditToggle("Edit")}
                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                              >
                                <Edit className="w-4 h-4 inline-block" /> Edit
                              </button>
                              <div className="relative inline-block">
                                <button
                                  onClick={viewPendingRequests}
                                  className="text-gray-800 dark:text-white border border-gray-800 dark:border-gray-400 rounded-sm px-3 py-1"
                                >
                                  Follow requests
                                </button>
                                {followStats.pendingFollowers > 0 ? (
                                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-1.5 text-xs">
                                    {followStats.pendingFollowers}
                                  </span>
                                ) : null}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <ProfileFollow
                          id={userId}
                          isSelf={isSelf}
                          fetchFollowStats={fetchFollowStats}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <ProfileStats
                  device="mobile"
                  postsNum={userPosts?.length}
                  followStats={followStats}
                  fetchFollowStats={fetchFollowStats}
                />

                <ProfilePosts
                  userPosts={userPosts}
                  user={userProfile}
                  profilePrivacy={showPosts(userProfile)}
                />
              </div>
            </div>
          </>
        )
      )}
      {/* {profileId ? null : (
        <button
          onClick={handleLogout}
          className="mt-5 border-2 px-2 py-1 rounded-sm hover:text-red-400 transition text-black dark:text-white"
        >
          Logout
        </button>
      )} */}
    </div>
  );
};

export default Profile;
