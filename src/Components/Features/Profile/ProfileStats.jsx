import axios from "axios";
import React, { useEffect, useState } from "react";
import { api } from "../../../Services/ApiService";

const ProfileStats = ({ device, postsNum, id, isSelf }) => {
  const [followStats, setFollowStats] = useState({
    followers: 0,
    following: 0,
    pendingFollowers: 0,
    pendingFollowing: 0,
    blockedFollowers: 1,
  });

  useEffect(() => {
    const fetchFollowStats = async () => {
      try {
        const response = isSelf
          ? await api.get("/follow/getMyFollowStats")
          : await api.get(`/follow/getUserFollowStats/${id}`);
        
        if (response.status === 200 && response?.data?.success) {
          setFollowStats({
            followers: response?.data?.data?.followers,
            following: response?.data?.data?.following,
            pendingFollowers: isSelf
              ? response?.data?.data?.pendingFollowers
              : 0,
            pendingFollowing: isSelf
              ? response?.data?.data?.pendingFollowing
              : 0,
            blockedFollowers: isSelf
              ? response?.data?.data?.blockedFollowers
              : 0,
          });
        }
      } catch (error) {
        console.error("Error fetching follow stats:", error);
      }
    };

    if (id) fetchFollowStats();
  }, [id, isSelf]);

  const formatNumber = (num) => {
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + "B";
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
    return num.toString();
  };

  return (
    <>
      {device === "desktop" ? (
        <div className="hidden md:flex flex-row gap-8">
          <div className="flex flex-row gap-2">
            <p className="text-sm sm:text-lg lg:text-xl dark:text-gray-100 font-bold">
              {postsNum}
            </p>
            <p className="text-sm sm:text-lg lg:text-xl text-gray-500 dark:text-gray-400">
              Posts
            </p>
          </div>
          <div className="flex flex-row gap-2">
            <p className="text-sm sm:text-lg lg:text-xl dark:text-gray-100 font-bold">
              {formatNumber(followStats?.followers)}
            </p>
            <p className="text-sm sm:text-lg lg:text-xl text-gray-500 dark:text-gray-400">
              Followers
            </p>
          </div>
          <div className="flex flex-row gap-2">
            <p className="text-sm sm:text-lg lg:text-xl dark:text-gray-100 font-bold">
              {formatNumber(followStats?.following)}
            </p>
            <p className="text-sm sm:text-lg lg:text-xl text-gray-500 dark:text-gray-400">
              Following
            </p>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-row justify-evenly md:hidden">
          <div className="text-center">
            <p className="text-sm sm:text-lg lg:text-xl dark:text-gray-100 font-bold">
              {postsNum}
            </p>
            <p className="text-sm sm:text-lg lg:text-xl dark:text-gray-400">
              Posts
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm sm:text-lg lg:text-xl dark:text-gray-100 font-bold">
            {formatNumber(followStats?.followers)}
            </p>
            <p className="text-sm sm:text-lg lg:text-xl dark:text-gray-400">
              Followers
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm sm:text-lg lg:text-xl dark:text-gray-100 font-bold">
            {formatNumber(followStats?.following)}
            </p>
            <p className="text-sm sm:text-lg lg:text-xl dark:text-gray-400">
              Following
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileStats;
