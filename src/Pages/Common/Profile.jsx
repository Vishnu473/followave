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
        <div className="flex justify-center p-20">
          <div className="flex gap-10 items-center">
            <img
              src={`https://instagram.fvga3-1.fna.fbcdn.net/v/t51.2885…c1UKlQUK0HJ_BuY1xuXbvQ&oe=67D0F8AF&_nc_sid=b15361`}
              alt={user.username}
              className="w-44 h-44 rounded-lg border-1 border-gray-700 dark:border-gray-300 bg-gray-200 dark:bg-gray-500"
            />
            <div className="flex flex-col gap-2">
              <p className="text-gray-900 dark:text-white text-3xl font-bold">
                {userProfile.username}
              </p>
              <p className="text-gray-900 dark:text-white text-xl">
                {userProfile.email}
              </p>
              <p className="text-gray-900 dark:text-white text-lg">
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
