import { useState } from "react";
import "./App.css";

import { Link, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
function App() {
  const { user } = useAuth();
  return (
    <div>
      <div className="navbar bg-base-100">
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[100] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <Link to={"/"} className="btn btn-ghost text-xl">
            CareAtHome
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Vitals</a>
            </li>
            <li>
              <details>
                <summary>Services</summary>
                <ul className="p-2">
                  <li className="w-max">
                    <Link to={"services"}>Create a new</Link>
                  </li>
                  <li>
                    <a>History</a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <a>My Reviews</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {user ? null : (
            <Link to={"/register/care"} className="btn mr-6">
              Register as Care-taker
            </Link>
          )}
          {user ? (
            <Link to={"/logout"} className="btn">
              Log Out
            </Link>
          ) : (
            <Link to={"/login"} className="btn">
              Log In
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default App;
