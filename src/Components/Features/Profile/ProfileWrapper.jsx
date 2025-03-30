import React, { lazy, Suspense } from "react";
import ProfileStatsSkeleton from "./ProfileStatsSkeleton";

// const ProfileStats = lazy(() => import("./ProfileStats"));
const ProfileStats = lazy(
  () =>
    new Promise(
      (resolve) => setTimeout(() => resolve(import("./ProfileStats")), 2000) // 2s delay
    )
);

const ProfileWrapper = ({ device, postsNum, id, isSelf }) => {
  return (
    <>
      {/* Desktop Skeleton */}
      {device === "desktop" && (
        <Suspense fallback={<ProfileStatsSkeleton device="desktop"/>}>
          <ProfileStats
            device="desktop"
            postsNum={postsNum}
            id={id}
            isSelf={isSelf}
          />
        </Suspense>
      )}

      {/* Mobile Skeleton */}
      {device === "mobile" && (
        <Suspense fallback={<ProfileStatsSkeleton device="mobile"/>}>
          <ProfileStats
            device="mobile"
            postsNum={postsNum}
            id={id}
            isSelf={isSelf}
          />
        </Suspense>
      )}
    </>
  );
};

export default ProfileWrapper;
