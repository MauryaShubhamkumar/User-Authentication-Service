import { Link } from "react-router-dom";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
function Navbar() {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const navigate = useNavigate();

    const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/login");
};
    return (
        <nav className="navbar">

            <div className="navbar-logo">
                Auth System
            </div>

            <div className="navbar-links">

                {!token ? (
                    <>
                        <Link to="/register">
                            Register
                        </Link>

                        <Link to="/login">
                            Login
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/profile">
                            Profile
                        </Link>

                        {role === "admin" && (
                            <Link to="/admin">
                                Admin
                            </Link>
                        )}

                        <button
                            className="logout-btn"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </>
                )}

            </div>

        </nav>
    );
}

export default Navbar;