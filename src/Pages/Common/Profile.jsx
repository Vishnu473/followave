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
        <div className=" min-h-screen">
          <div className="relative flex flex-col">
            <div className="h-40">
              <img alt="abc" className="w-full h-full dark:bg-gray-300" />
            </div>
            <div className="absolute top-3/4 left-1/12">
              <div className="flex items-end gap-10">
                <img src={`https://instagram.fvga3-1.fna.fbcdn.net/v/t51.2885…c1UKlQUK0HJ_BuY1xuXbvQ&oe=67D0F8AF&_nc_sid=b15361`}
                  alt={user.username}
                  className="w-40 h-40 rounded-full bg-gray-200 dark:bg-gray-500"
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
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
