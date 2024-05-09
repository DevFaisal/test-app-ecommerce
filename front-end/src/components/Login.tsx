import React, { useContext, useEffect } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

function Login() {
  const navigate = useNavigate();
  const { user } = useContext<any>(UserContext);

  const { setUser } = useContext<any>(UserContext);

  const [credentials, setCredentials] = React.useState({
    username: "",
    password: "",
  });

  const login = (e: any) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/users/login", {
        email: credentials.username,
        password: credentials.password,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  if (user) {
    navigate("/");
  }

  return (
    <>
      <NavBar />
      <div className="flex justify-center items-center h-screen">
        <form>
          <div className="flex flex-col  bg-slate-300 p-4 gap-3">
            <h1>Login</h1>
            <input
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
              className="px-2 py-1  rounded-md"
              type="text"
              placeholder="email"
            />
            <input
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              className="px-2 py-1 rounded-md"
              type="password"
              placeholder="Password"
              autoComplete="off"
            />
            <button
              onClick={login}
              className=" px-2 py-1 bg-green-500 text-white rounded-md "
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
