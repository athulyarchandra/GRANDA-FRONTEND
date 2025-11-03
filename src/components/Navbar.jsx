import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { userContext } from "../context/AuthContexApi";

const Navbar = () => {
  const { cartCount } = useContext(CartContext);
  const { isLoggedIn, logout } = useContext(userContext);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
  };
    const user = JSON.parse(localStorage.getItem("user"));
    const goBack = () => {
    navigate(-1); 
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="flex flex-wrap items-center justify-between px-3 py-2 bg-[#e8e8e5] relative">
      {/* Logo */}
      <div className="flex justify-evenly items-center">
       <Link to={'/'}> <div className="text-xl font-semibold">GRANDA</div></Link>
        <button className="flex items-center justify-center h-10 w-full md:w-auto rounded-md bg-[#c8a876] text-white font-medium p-2 my-1 md:my-0 mx-2" onClick={goBack}><i className="fa-solid fa-arrow-left mx-1"></i>Go Back</button>
      </div>
      <button
        className="md:hidden text-2xl focus:outline-none"
        onClick={toggleMenu}
      >
        <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`}></i>
      </button>

      <div
        className={`${
          menuOpen ? "block" : "hidden"
        } w-full md:flex md:items-center md:w-auto md:space-x-4 text-right font-bold mt-4 md:mt-0 transition-all duration-300`}
      >
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
          {/* Nav Links */}
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-[#ed9912] px-3 py-2"
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-[#ed9912] px-3 py-2"
          >
            About
          </Link>
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-[#ed9912] px-3 py-2"
          >
            Contact
          </Link>
        </div>

        {/* Right Side Buttons */}
        <div className="flex flex-col md:flex-row md:items-center md:gap-3 mt-3 md:mt-0">
          {isLoggedIn ? (
            <>
              <Link
                to="/user/cart"
                onClick={() => setMenuOpen(false)}
                className="relative flex items-center justify-center h-10 w-full md:w-auto rounded-md bg-[#c8a876] text-white font-medium p-2 my-1 md:my-0"
              >
                <i className="fa-solid fa-cart-shopping"></i>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs px-1">
                    {cartCount}
                  </span>
                )}
              </Link>

              <Link
                to="/user"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center h-10 w-full md:w-auto rounded-md bg-[#c8a876] text-white font-medium p-2 my-1 md:my-0"
              >
                <i className="fa-solid fa-user"></i>
              </Link>
              {user.email==="admin@gmail.com" &&
                <Link
                to="/adminPortal/dashboard"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center h-10 w-full md:w-auto rounded-md bg-[#c8a876] text-white font-medium p-2 my-1 md:my-0"
              >
                Admin
              </Link>
              }
              <button
                onClick={handleLogout}
                className="flex items-center justify-center h-10 w-full md:w-auto rounded-md bg-[#c8a876] text-white font-medium p-2 my-1 md:my-0"
              >
                <i className="fa-solid fa-right-from-bracket"></i>
              </button>
              
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center h-10 w-full md:w-auto rounded-md bg-[#c8a876] text-white font-medium p-2 my-1 md:my-0"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
