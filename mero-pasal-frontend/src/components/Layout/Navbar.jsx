import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa"; 
import { useAuth } from "../../context/auth"; 
import { toast } from "react-hot-toast"; 

const Navbar = () => {
  const [auth, setAuth] = useAuth(); // Get authentication state and setAuth function from context

  // Function to handle logout
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logged out successfully!")
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          {/* Navbar Toggler Button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Collapse */}
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            {/* Navbar Brand */}
            <Link className="navbar-brand" to="/">
              <FaShoppingBag /> MERO PASAL
            </Link>

            {/* Navbar Items */}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {/* Home Link */}
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>

              {/* Category Link */}
              <li className="nav-item">
                <Link className="nav-link" to="/category">
                  Category
                </Link>
              </li>

              {/* Conditional rendering for unauthenticated user */}
              {!auth.user ? (
                <>
                  {/* Register Link */}
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                  {/* Login Link */}
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                </>
              ) : (
                // Conditional rendering for authenticated user
                <>
                  {/* Dropdown Menu */}
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      to="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user.name}
                    </Link>
                    {/* Dropdown Menu Items */}
                    <ul className="dropdown-menu">
                      {/* Dashboard Link */}
                      <li>
                        <Link
                          className="dropdown-item"
                          to={`/dashboard/${auth?.user?.role === true ? "admin" : "user"}`}
                        >
                          Dashboard
                        </Link>
                      </li>
                      {/* Logout Link */}
                      <li>
                        <Link
                          onClick={handleLogout}
                          className="dropdown-item"
                          to="/login"
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </li>
                </>
              )}

              {/* Cart Link */}
              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  Cart(0)
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
