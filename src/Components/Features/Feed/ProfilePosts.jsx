import React from "react";
import { HeartIcon, MessageCircle } from "lucide-react";

const ProfilePosts = ({ userPosts }) => {
  return (
    <div className="w-full border-t-1 border-gray-400">
      <div className="flex flex-row justify-center items-center gap-1">
        <p className="dark:text-gray-100 pt-3 pb-3 font-semibold text-sm sm:text-lg">
          Posts
        </p>
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-3 justify-between gap-1 md:gap-1.5">
          {userPosts.length > 0 ? (
            userPosts.map((post) =>
              post.media.length > 0 ? (
                <div key={post._id} className="relative group">
                  <img
                    src={post.media[0].url}
                    alt={post.title}
                    className="w-full aspect-[3/4] object-cover bg-gray-100"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-50 transition-opacity duration-200"></div>
                  <div className="absolute inset-0 flex flex-col gap-1 sm:gap-2 md:flex-row md:gap-6 justify-center items-center opacity-0 group-hover:opacity-100 group-hover:cursor-pointer transition-opacity duration-200">
                    <div className="flex flex-row gap-1">
                      <HeartIcon className="text-white font-semibold fill-current w-4 sm:w-5 md:w-7" />
                      <p className="text-white font-semibold text-sm sm:text-base">45</p>
                    </div>
                    <div className="flex flex-row gap-1">
                      <MessageCircle className="text-white font-semibold fill-current w-4 sm:w-5 md:w-7" />
                      <p className="text-white font-semibold text-sm sm:text-base">67</p>
                    </div>
                  </div>
                </div>
              ) : null
            )
          ) : (
            <div className="flex justify-center items-center w-full col-span-3">
              <p className="dark:text-gray-100 p-5 text-base sm:text-xl">
                No posts available
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePosts;
