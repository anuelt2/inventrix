import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

export const Logo = () => {
  return (
    <div className="text-2xl font-bold text-white">
      <Link to="/">Inventrix</Link>
    </div>
  );
};

const capitalizeWords = (str) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const AuthButtons = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex space-x-4">
      {user ? (
        <>
          <div>
            <Link to="/dashboard">
              <span className="text-white">
                Hello, {capitalizeWords(user.username) || "User"}
              </span>
            </Link>
            <button
              onClick={logout}
              className="text-white px-4 py-2 hover:text-gray-300 cursor-pointer"
            >
              Logout
            </button>
          </div>
        </>
      ) : (
        <>
          <button className="text-white px-4 py-2 hover:text-gray-300">
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
    <header className="fixed top-0 left-0 w-full bg-gray-600 text-white shadow-md py-4 px-6 flex items-center justify-between z-150">
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
