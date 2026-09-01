import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
    localStorage.removeItem("glowe_authenticated");
    localStorage.removeItem("glowe_remember");

    navigate("/login");
};

    return (
        <header className="app-header">

            <div className="header-brand">
                <div className="header-logo">
                    G
                </div>

                <div>
                    <h2>Glowé Cosmetics</h2>
                    <span>Admin Panel</span>
                </div>
            </div>

            <div className="header-right">

                <div className="header-user">
                    <div className="user-avatar">
                        SR
                    </div>

                    <div className="user-info">
                        <strong>Admin</strong>
                        <span>Administrator</span>
                    </div>
                </div>

                <button
                    type="button"
                    className="header-logout"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

        </header>
    );
}

export default Header;