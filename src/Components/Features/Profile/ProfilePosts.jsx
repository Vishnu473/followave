import React from "react";
import { Camera, HeartIcon, LockIcon, MessageCircle } from "lucide-react";

const ProfilePosts = ({ userPosts, profilePrivacy, user }) => {
  return (
    <>
      {profilePrivacy ? (
        <div className="w-full border-t-1 border-gray-400">
          <div className="flex flex-row justify-center items-center gap-1">
            <p className="dark:text-gray-100 pt-3 pb-3 font-semibold text-sm sm:text-lg">
              Posts
            </p>
          </div>
          {userPosts.length > 0 ? (
            <div className="flex justify-center">
              <div className="grid grid-cols-3 justify-between gap-1 md:gap-1.5">
                {userPosts.map((post) =>
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
                          <p className="text-white font-semibold text-sm sm:text-base">
                            45
                          </p>
                        </div>
                        <div className="flex flex-row gap-1">
                          <MessageCircle className="text-white font-semibold fill-current w-4 sm:w-5 md:w-7" />
                          <p className="text-white font-semibold text-sm sm:text-base">
                            67
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : null
                )}
                {/*  */}
              </div>
            </div>
          ) : (
            <div className="h-full w-full border-t-1 border-gray-500">
              <div className="flex gap-2 p-4 flex-col justify-center items-center gap:6">
                <div className="border p-2 rounded-full text-gray-600">
                  <Camera className="dark:text-gray-500 text-gray-600 w-7 h-7 md:w-12 md:h-12 " />
                </div>

                <div className="text-center">
                  <p className="text-base font-bold text-gray-700 dark:text-gray-100 md:text-lg">
                    No posts yet
                  </p>
                  <p className="md:hidden text-gray-400 text-sm md:text-base">
                    When {user.username} posts, you will see their posts here.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col md:flex-row border-y-1 dark:border-gray-700 border-gray-300 justify-center p-6 gap-2 md:gap-4 items-center w-full col-span-3">
          <div className="border p-2 rounded-3xl text-gray-700">
            <LockIcon className="dark:text-gray-500 text-gray-700 w-5 h-5 md:w-7 md:h-7 " />
          </div>
          <div className="text-center md:text-left">
            <p className="text-base font-bold text-gray-700 dark:text-gray-100 md:text-lg">
              The account is private.
            </p>
            <p className="text-gray-400 text-sm md:text-base">
              Follow this account to see their posts.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePosts;
