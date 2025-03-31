import { Check, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { api } from "../../../Services/ApiService";
import { useSelector } from "react-redux";

const ProfilePendingRequests = () => {
  const [pendingRequestsList, setPendingRequestsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const getPendingFollowRequests = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/follow/getPendingRequests");
        
        if (response?.status === 200 && response?.data?.success) {
          setPendingRequestsList(response?.data?.data?.pendingRequests);
        }
      } catch (error) {
        console.error("Error occured while unfollowing user:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getPendingFollowRequests();
  }, []);

  const handleFollowRequest = async (id, action) => {
    let requestBody = { followerId: id, action: action };
    
    try {
      setIsLoading(true);
      await api.post("/follow/updateFollowRequest", requestBody);
      setPendingRequestsList(prevList => prevList.filter(request => request.follower._id !== id));
    } catch (error) {
      console.error(`Error occured while ${action}ing user:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="border-x border-gray-200 dark:border-gray-700">
        <h1 className="text-gray-800 dark:text-white">Pending Requests</h1>
        {isLoading ? (
          <p className="text-black dark:text-white">
            Getting Pending Requests....
          </p>
        ) : pendingRequestsList.length > 0 ? (
          pendingRequestsList.map((request) => (
            <div
              key={request._id}
              className="flex flex-row justify-center items-center gap-2 border-b border-gray-300 dark:border-gray-700 p-2 hover:bg-gray-200 hover:dark:bg-gray-700"
            >
              <img
                className="w-8 h-8 md:w-10 md:h-10 object-cover rounded-full"
                src={
                  request.follower.profilePic || "assets/default_profile.webp"
                }
                alt={request.follower.username}
              />
              <p className="text-gray-800 dark:text-white">
                {request.follower.username} requested to follow you
              </p>
              <div className="hidden md:flex gap-2 pl-5">
                <button
                  onClick={() =>
                    handleFollowRequest(request.follower._id, "approve")
                  }
                  className={`border border-gray-300 rounded-sm px-3 py-1
                    ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-500 text-gray-900 dark:text-white hover:text-white"}`}
                >
                  Approve
                </button>
                <button
                  onClick={() =>
                    handleFollowRequest(request.follower._id, "reject")
                  }
                  className={`border border-gray-300 rounded-sm px-3 py-1
                    ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-500 text-gray-900 dark:text-white hover:text-white"}`}
                >
                  Reject
                </button>
              </div>
              <div className="flex gap-2 pl-5 md:hidden">
                <button
                  onClick={() =>
                    handleFollowRequest(request.follower._id, "approve")
                  }
                  className={`bg-green-500 p-1 rounded-md ${isLoading ? "opacity-50 cursor-not-allowed":""}`}
                >
                  <Check className="text-white w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    handleFollowRequest(request.follower._id, "reject")
                  }
                  className={`bg-red-500 p-1 rounded-md ${isLoading ? "opacity-50 cursor-not-allowed":""}`}
                >
                  <X className="text-white w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>
            <p className="text-black dark:text-white">
              No Pending follow requests
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePendingRequests;
