const ProfileStatsSkeleton = ({ device }) => {
    return device === "desktop" ? (
      <div className="hidden md:flex gap-8 animate-pulse">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex flex-col items-center gap-1">
            <div className="w-10 h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="w-16 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
        ))}
      </div>
    ) : (
      <div className="w-full flex justify-evenly md:hidden animate-pulse">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex flex-col items-center gap-1">
            <div className="w-10 h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="w-16 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
        ))}
      </div>
    );
  };
  
  export default ProfileStatsSkeleton;  