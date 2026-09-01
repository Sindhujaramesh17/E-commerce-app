import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
    return (
        <aside className="app-sidebar">

            <div className="sidebar-section">

                <p className="sidebar-title">
                    MENU
                </p>

                <nav className="sidebar-navigation">

                    <NavLink
                        to="/dashboard"
                        className="sidebar-link"
                    >
                        <span className="sidebar-icon">
                            ◈
                        </span>

                        <span>
                            Dashboard
                        </span>
                    </NavLink>

                    <NavLink
                        to="/products"
                        className="sidebar-link"
                    >
                        <span className="sidebar-icon">
                            ▣
                        </span>

                        <span>
                            Products
                        </span>
                    </NavLink>

                    <NavLink
                        to="/categories"
                        className="sidebar-link"
                    >
                        <span className="sidebar-icon">
                            ◇
                        </span>

                        <span>
                            Categories
                        </span>
                    </NavLink>

                    <NavLink
                        to="/settings"
                        className="sidebar-link"
                    >
                        <span className="sidebar-icon">
                            ⚙
                        </span>

                        <span>
                            Settings
                        </span>
                    </NavLink>

                </nav>

            </div>

            <div className="sidebar-bottom">

                <div className="sidebar-help">

                    <div className="help-icon">
                        ?
                    </div>

                    <div>
                        <strong>Need help?</strong>

                        <span>
                            Manage your store
                        </span>
                    </div>

                </div>

            </div>

        </aside>
    );
}

export default Sidebar;