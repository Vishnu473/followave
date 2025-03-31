import React, { useEffect, useState } from "react";
import { api } from "../../../Services/ApiService";
import { Loader } from "lucide-react";

const ProfileFollow = ({ id, fetchFollowStats, isSelf }) => {
  const [isFollowStatus, setIsFollowStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkIsFollowing = async () => {
      try {
        setIsLoading(true);
        const response = await api.post("/follow/checkIsFollowing", {
          followingId: `${id}`,
        });
        if (response.status === 200 && response?.data?.success) {
          setIsFollowStatus(response?.data?.data?.followStatus);
        }
      } catch (error) {
        console.error("Error checking follow stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id && !isSelf) checkIsFollowing();
  }, [id]);

  const handleFollowAction = async (action) => {
    let requestBody = { followingId: id };
    if (action === "unfollow") {
      console.log("Unfollow action");
      try {
        setIsLoading(true);
        const response = await api.post("/follow/unFollowUser", requestBody);
        if (response.status === 200 && response?.data?.success) {
          await fetchFollowStats();
          setIsFollowStatus("not_following");
        }
      } catch (error) {
        console.error("Error occured while unfollowing user:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("Follow action");
      try {
        setIsLoading(true);
        const response = await api.post("/follow/followUser", requestBody);
        if (response.status === 201 && response?.data?.success) {
          await fetchFollowStats();
          setIsFollowStatus(response?.data?.data?.status);
        }
      } catch (error) {
        console.error("Error occured while unfollowing user:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex gap-2">
      {
        <button
        disabled={isLoading || isFollowStatus === "pending"}
        className={`px-3 py-1 rounded disabled:cursor-not-allowed hover:cursor-pointer ${
          isLoading
            ? "border border-gray-700 dark:border-gray-200 text-gray-700 dark:text-white"
            : isFollowStatus === "accepted"
            ? "bg-gray-500 text-white"
            : isFollowStatus === "pending"
            ? "dark:border-yellow-500 border dark:text-yellow-500 bg-yellow-500"
            : "bg-blue-500 text-white"
        }`}
        onClick={() =>
          handleFollowAction(
            isFollowStatus === "accepted" ? "unfollow" : "follow"
          )
        }
      >
        {isLoading ? (
          isFollowStatus === "" ? (
            <Loader className="animate-spin w-4 h-4" />
          ) : isFollowStatus === "accepted" ? (
            "Unfollowing..."
          ) : (
            "Following..."
          )
        ) : isFollowStatus === "pending" ? (
          "Pending"
        ) : isFollowStatus === "accepted" ? (
          "Unfollow"
        ) : (
          "Follow"
        )}
      </button>
      }
    </div>
  );
};

export default ProfileFollow;
