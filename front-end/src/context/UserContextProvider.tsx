import React, { useEffect } from "react";
import UserContext from "./UserContext";
import axios from "axios";

function UserContextProvider({ children }: any) {
  const [user, setUser] = React.useState(null);
  const [admin, setAdmin] = React.useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:3000/api/users/me", {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          setUser(res.data);
          if (res.data.isAdmin === true) {
            setAdmin(true);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, admin }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
