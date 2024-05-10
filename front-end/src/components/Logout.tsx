import UserContext from "@/context/UserContext";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const { user }: any = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    navigate("/");
  }, []);
  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-5xl font-bold">You have been logged out 👋</h1>
    </div>
  );
}

export default Logout;
