import { useState } from "react";
import { Link } from "react-router-dom"


export const Logo = () => {
  return (
    <div className="text-2xl font-bold text-white">
      Inventrix
    </div>
  );
};

const capitalizeWords = (str) => {
  return str.split(' ').map(
    word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};


export const AuthButtons = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="flex space-x-4">
      {isLoggedIn ? (
        <>
          <div>
            <span className="text-white">Hello, {capitalizeWords("Username") || "User"}</span>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="text-white px-4 py-2 hover:text-gray-300"
          >
              <Link to="/logout">Logout</Link>
            </button>
          </div>
        </>
      ) : (
        <>
          <button
            onClick={() => setIsLoggedIn(true)}
            className="text-white px-4 py-2 hover:text-gray-300">
            <Link to="/login">Login</Link>
          </button>
          <button className="text-white px-4 py-2 hover:text-gray-300">
            <Link to="/register">Register</Link>
          </button>
        </>
      )}
    </div>
  );
};

const PageHeader = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-gray-600 text-white shadow-md py-4 px-6 flex items-center justify-between z-50">
      <div className="container mx-auto ml-4 flex justify-between items-center">
        {/* Left: Logo */}
        <Logo />

        {/* Right: Authentication Buttons */}
        <AuthButtons />
      </div>
    </header>
  );
};

export default PageHeader;
