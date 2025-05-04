import React from "react";

function Loader (
  {
    message = "Loading, please wait..."
  }
)
{
  return (
    <div className = "flex flex-col items-center justify-center h-screen bg-gray-100" >
      <div className = "animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mb-4" ></div>
      <p className="text-lg text-gray-700" > { message } </p>
    </div>
  );
}

export default Loader;