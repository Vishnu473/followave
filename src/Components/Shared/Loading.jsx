export const Loading = ({msg}) => {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="w-8 h-8 border-4 border-gray-300 dark:border-gray-600 border-t-black dark:border-t-gray-100 rounded-full animate-spin"></div>
        <p className="text-lg sm:text-xl text-black dark:text-gray-100">
          {msg}
        </p>
      </div>
    );
  };
  