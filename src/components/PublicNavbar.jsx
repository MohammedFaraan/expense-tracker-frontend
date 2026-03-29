import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { label: "Features", id: "features" },
  { label: "Pricing", id: "pricing" },
  { label: "Testimonials", id: "testimonials" },
  { label: "Dashboard", id: "dashboard" },
];

function PublicNavbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const goToSection = (id) => {
    if (location.pathname !== "/") {
      navigate("/#" + id);
      return;
    }

    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="navbar fixed top-0 z-50 w-full border-b border-base-300 bg-base-100/90 px-4 lg:px-10 backdrop-blur">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-xl font-black tracking-tight">
          Finance Intel
        </Link>

        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content z-50 mt-3 w-52 rounded-box bg-base-100 p-2 shadow">
            {navItems.map((item) => (
              <li key={item.id}>
                <button type="button" onClick={() => goToSection(item.id)}>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-1 px-1">
          {navItems.map((item) => (
            <li key={item.id}>
              <button type="button" onClick={() => goToSection(item.id)}>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-end gap-2">
        {isAuthenticated ? (
          <button className="btn btn-error text-white" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="btn btn-ghost">
              Sign In
            </Link>
            <Link to="/signup" className="btn btn-secondary text-white">
              Get Started
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default PublicNavbar;