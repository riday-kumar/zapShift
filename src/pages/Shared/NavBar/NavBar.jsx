import React from "react";
import Logo from "../../../components/Logo/Logo";
import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";

const NavBar = () => {
  const { currentUser, logOut } = useAuth();

  const handleLogOut = () => {
    logOut()
      .then((res) => toast.success("Log Out Successfully"))
      .catch((err) => console.log(err.message));
  };

  const links = (
    <>
      <li>
        <NavLink>Home</NavLink>
      </li>
      <li>
        <NavLink>About</NavLink>
      </li>
      <li>
        <NavLink>FAQ</NavLink>
      </li>
      <li>
        <NavLink to="/coverage">Coverage</NavLink>
      </li>
      <li>
        <NavLink to="/register">Register</NavLink>
      </li>
      <li>
        <NavLink to="/login">Login</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm rounded-md">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">
          <Logo></Logo>
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {currentUser ? (
          <button onClick={handleLogOut} className="btn">
            Log Out
          </button>
        ) : (
          <Link to="/login" className="btn">
            Log In
          </Link>
        )}
        <Link to="/be-a-rider" className="btn btn-primary text-black mx-4">
          Be a Rider
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
