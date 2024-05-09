import React, { useContext, useEffect } from "react";
import NavBar from "../components/NavBar";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const { user } = useContext<any>(UserContext);
  const naviagte = useNavigate();
  useEffect(() => {
    if (!user) {
      return naviagte("/login");
    }
  }, []);
  return (
    <div>
      <NavBar />
      <div className="bg-green-200 p-3">
        <h1 className="text-3xl font-bold">Profile</h1>
        <p>User {user?.name}</p>
      </div>

      <div className="flex flex-col justify-start mt-10 items-center h-screen">
        <h1 className="text-3xl font-bold">Hi {user?.name}</h1>
      </div>
    </div>
  );
}

export default ProfilePage;
