import { useState } from "react";

export const Logo = () => {
  return (
    <div className="text-2xl font-bold text-white">
      Inventrix
    </div>
  );
};

export const AuthButtons = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="flex space-x-4">
      {isLoggedIn ? (
        <>
          <span className="text-white">Hello, User</span>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="text-white px-4 py-2 hover:text-gray-300"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <button className="text-white px-4 py-2 hover:text-gray-300">
            Login
          </button>
          <button className="text-white px-4 py-2 hover:text-gray-300">
            Register
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
