import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const naviagte = useNavigate();
  useEffect(() => {
    localStorage.removeItem("token");
    setTimeout(() => {
      naviagte("/login");
    }, 2000);
  }, []);
  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-5xl font-bold">You have been logged out 👋</h1>
    </div>
  );
}

export default Logout;
