import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-100">
      {/* Spinner */}
      <div className="relative w-20 h-20 mb-6">
        <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
        <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </div>

      {/* Text */}
      <h1 className="text-2xl font-bold text-base-content mb-2">
        Loading....
      </h1>
      <p className="text-base-content/60 animate-pulse">
        Preparing something awesome for you
      </p>
    </div>
  );
};

export default Loading;
