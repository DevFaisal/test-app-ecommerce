import React, { useEffect } from "react";

function Logout() {
  useEffect(() => {
    localStorage.removeItem("token");
  }, []);
  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-5xl font-bold">You have been logged out 👋</h1>
    </div>
  );
}

export default Logout;
