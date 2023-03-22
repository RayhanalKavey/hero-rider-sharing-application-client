import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logOut } from "../../../features/auth/authSlice";
import auth from "../../../firebase/firebase.config";

const Navbar = () => {
  // Get information from the REDUX store
  const { email, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Open and close the hamburger menu
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  // Log out user
  const navigate = useNavigate();
  const handleLogOut = () => {
    // Logout from firebase
    signOut(auth)
      .then(() => {
        // If logged out successfully then clear the user from the store. (Back to the initial state.)
        dispatch(logOut());
      })
      .catch((error) => {
        // An error happened.
      });
    // If there is no user the redirect user to the login page
    if (!email) {
      navigate("/login");
    }
  };

  /*=================
  COMMON CSS CLASS
  *================*/
  const commonLinkClass =
    "text-accent dark:text-secondary hover:bg-success hover:dark:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium";
  const bottomBorder = "border-b-[.5px] border-accent dark:border-gray-600";

  /*============
   COMMON LINK 
   *===========*/
  const links = (
    <>
      <Link to="/" className={`${commonLinkClass}`}>
        Home
      </Link>

      <Link to="/about" className={`${commonLinkClass}`}>
        About
      </Link>

      {email ? (
        <>
          <Link onClick={handleLogOut} className={`${commonLinkClass}`}>
            Logout
          </Link>
        </>
      ) : (
        <>
          <Link to="/login" className={`${commonLinkClass}`}>
            Login
          </Link>
          <Link to="/selection" className={`${commonLinkClass} `}>
            Registration
          </Link>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-secondary dark:bg-accent  top-0 left-0 right-0 z-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between h-16 ${bottomBorder}`}
        >
          <div className="flex items-center  justify-between flex-1 ">
            <Link to="#" className="text-black dark:text-white font-bold">
              Hero Rider
            </Link>
            {/* Hamburger button */}
            <div className="flex items-center justify-center">
              <button
                className="text-accent dark:text-secondary ml-4 md:hidden"
                onClick={toggleMenu}
                onMouseEnter={toggleMenu}
              >
                <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                  <path
                    d="M4 6h16M4 12h16M4 18h16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
          {/* Menu Link for large screen */}
          <div className="hidden md:flex md:items-center ">{links}</div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      <div
        className={`md:hidden ${isOpen ? "block" : "hidden"} `}
        onMouseLeave={toggleMenu}
      >
        <div className={`flex flex-col text-center px-2 pt-2 pb-3  space-y-1 `}>
          {links}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
