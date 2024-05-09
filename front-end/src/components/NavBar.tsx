import { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../context/UserContext";

function NavBar() {
  const { user } = useContext<any>(UserContext);
  const { admin } = useContext<any>(UserContext);

  const navlinks = [
    { name: "Home", url: "/" },
    { name: "Product", url: "/product" },
  ];

  return (
    <nav className="flex text-white font-light bg-slate-800 p-2 justify-center gap-3">
      {navlinks.map((link) => (
        <NavLink to={link.url} key={link.name}>
          {link.name}
        </NavLink>
      ))}
      {!user && <NavLink to="/login">Login</NavLink>}
      {user && <NavLink to="/profile">Profile</NavLink>}
      {user && <NavLink to="/cart">Cart</NavLink>}
      {admin && <NavLink to="/admin">Admin</NavLink>}
      {user && <NavLink to="/logout">Logout</NavLink>}
    </nav>
  );
}

export default NavBar;
