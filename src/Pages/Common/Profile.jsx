import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    if (user?.data) setUserProfile(user?.data);
  }, [user]);

  if (!userProfile) return <p>userProfile is not available</p>;

  return (
    <>
      {userProfile && (
        <div className="flex justify-center p-6 sm:p-10 lg:p-20">
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-center text-center sm:text-left">
          <img
            src={`https://img.freepik.com/premium-vector/happy-maha-shivratri-with-trisulam-hindu-festival-celebrated-lord-shiva-night-vector-free_1157715-3303.jpg`}
            alt={user.username}
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
      
      )}
    </>
  );
};

export default Profile;
