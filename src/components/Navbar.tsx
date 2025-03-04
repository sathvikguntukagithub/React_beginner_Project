import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CirclesWithBar } from "react-loader-spinner";

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  // ✅ Ensure Logout Spinner Resets on Reload
  useEffect(() => {
    const logoutState = localStorage.getItem("isLoggingOut");
    if (logoutState === "true") {
      setIsLoggingOut(false);
      localStorage.removeItem("isLoggingOut");
    }

    const checkLoginStatus = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };

    window.addEventListener("authChange", checkLoginStatus);

    return () => {
      window.removeEventListener("authChange", checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    setIsLoggingOut(true);
    localStorage.setItem("isLoggingOut", "true");

    setTimeout(() => {
      ``;
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("isLoggingOut");
      setIsLoggedIn(false);
      setIsLoggingOut(false);
      window.dispatchEvent(new Event("authChange"));
      navigate("/login");
    }, 500);
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo or Brand Name */}
          <div className="flex-shrink-0">
            <Link
              to={"/"}
              className="text-white text-2xl font-bold hover:text-gray-200 transition duration-300"
            >
              Tasty Recipe
            </Link>
          </div>

          {/* Logout Button with Loading State */}
          {isLoggedIn && (
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 relative"
              >
                {isLoggingOut ? (
                  <div className="flex justify-center items-center">
                    <CirclesWithBar
                      height="20"
                      width="20"
                      color="#ffffff"
                      outerCircleColor="#ffffff"
                      innerCircleColor="#ffffff"
                      barColor="#ffffff"
                      ariaLabel="circles-with-bar-loading"
                      visible={true}
                    />
                  </div>
                ) : (
                  "Logout"
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
