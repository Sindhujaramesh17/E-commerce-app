import { useEffect, useState } from "react";
import "./Settings.css";

function Settings() {
    const [settings, setSettings] = useState({
        storeName: "Glowé Cosmetics",
        email: "admin@glowecosmetics.com",
        phone: "+91 98765 43210",
        currency: "INR (₹)",
        emailNotifications: true,
        lowStockAlerts: true,
        orderNotifications: true,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [saved, setSaved] = useState(false);

    const [theme, setTheme] = useState(
        localStorage.getItem("glowe_theme") || "light"
    );
    useEffect(() => {
        document.documentElement.setAttribute(
            "data-theme",
            theme
        );
    }, [theme]);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        setSettings((previousSettings) => ({
            ...previousSettings,
            [name]: type === "checkbox" ? checked : value,
        }));

        setSaved(false);
    };

    const handleThemeChange = (event) => {
        const selectedTheme = event.target.value;

        setTheme(selectedTheme);

        localStorage.setItem(
            "glowe_theme",
            selectedTheme
        );

        document.documentElement.setAttribute(
            "data-theme",
            selectedTheme
        );

        setSaved(false);
    };

    const handleSave = (event) => {
        event.preventDefault();

        setSaved(true);

        setTimeout(() => {
            setSaved(false);
        }, 3000);
    };

    return (
        <div className="settings-page">

            <div className="settings-header">
                <div>
                    <p className="settings-eyebrow">
                        ADMINISTRATION
                    </p>

                    <h1>Settings</h1>

                    <p>
                        Manage your store and notification preferences.
                    </p>
                </div>
            </div>

            <form
                className="settings-form"
                onSubmit={handleSave}
            >

                {/*ADMIN PROFILE*/}

                <section className="settings-card">

                    <div className="settings-card-header">

                        <div className="settings-card-icon">
                            S
                        </div>

                        <div>
                            <h2>Admin Profile</h2>

                            <p>
                                Your administrator account information.
                            </p>
                        </div>

                    </div>

                    <div className="settings-grid">

                        <div className="settings-field">

                            <label htmlFor="adminName">
                                Name
                            </label>

                            <input
                                id="adminName"
                                type="text"
                                value="S"
                                disabled
                            />

                        </div>

                        <div className="settings-field">

                            <label htmlFor="adminRole">
                                Role
                            </label>

                            <input
                                id="adminRole"
                                type="text"
                                value="Administrator"
                                disabled
                            />

                        </div>

                    </div>

                </section>

                {/*STORE INFORMATION*/}

                <section className="settings-card">

                    <div className="settings-card-header">

                        <div className="settings-card-icon">
                            G
                        </div>

                        <div>
                            <h2>Store Information</h2>

                            <p>
                                Update your cosmetics store details.
                            </p>
                        </div>

                    </div>

                    <div className="settings-grid">

                        <div className="settings-field">

                            <label htmlFor="storeName">
                                Store Name
                            </label>

                            <input
                                id="storeName"
                                name="storeName"
                                type="text"
                                value={settings.storeName}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="settings-field">

                            <label htmlFor="email">
                                Email Address
                            </label>

                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={settings.email}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="settings-field">

                            <label htmlFor="phone">
                                Phone Number
                            </label>

                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={settings.phone}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="settings-field">

                            <label htmlFor="currency">
                                Currency
                            </label>

                            <select
                                id="currency"
                                name="currency"
                                value={settings.currency}
                                onChange={handleChange}
                            >
                                <option value="INR (₹)">
                                    INR (₹)
                                </option>

                                <option value="USD ($)">
                                    USD ($)
                                </option>

                                <option value="EUR (€)">
                                    EUR (€)
                                </option>
                            </select>

                        </div>

                    </div>

                </section>

                {/* APPEARANCE */}

                <section className="settings-card">

                    <div className="settings-card-header">

                        <div className="settings-card-icon">
                            ◐
                        </div>

                        <div>
                            <h2>Appearance</h2>

                            <p>
                                Choose how the Glowé Cosmetics dashboard looks.
                            </p>
                        </div>

                    </div>

                    <div className="theme-options">

                        <label
                            className={`theme-option ${theme === "light" ? "active" : ""
                                }`}
                        >

                            <input
                                type="radio"
                                name="theme"
                                value="light"
                                checked={theme === "light"}
                                onChange={handleThemeChange}
                            />

                            <div>
                                <strong>
                                    Light Mode
                                </strong>

                                <span>
                                    Use the light dashboard appearance.
                                </span>
                            </div>

                        </label>

                        <label
                            className={`theme-option ${theme === "dark" ? "active" : ""
                                }`}
                        >

                            <input
                                type="radio"
                                name="theme"
                                value="dark"
                                checked={theme === "dark"}
                                onChange={handleThemeChange}
                            />

                            <div>
                                <strong>
                                    Dark Mode
                                </strong>

                                <span>
                                    Use the dark dashboard appearance.
                                </span>
                            </div>

                        </label>

                    </div>

                </section>
                {/* Change Password */}

                <section className="settings-card">

                    <div className="settings-card-header">

                        <div className="settings-card-icon">
                            🔒
                        </div>

                        <div>
                            <h2>Change Password</h2>

                            <p>
                                Update your administrator account password.
                            </p>
                        </div>

                    </div>

                    <div className="settings-grid">

                        <div className="settings-field">

                            <label htmlFor="currentPassword">
                                Current Password
                            </label>

                            <input
                                id="currentPassword"
                                name="currentPassword"
                                type="password"
                                placeholder="Enter current password"
                                value={settings.currentPassword}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="settings-field">

                            <label htmlFor="newPassword">
                                New Password
                            </label>

                            <input
                                id="newPassword"
                                name="newPassword"
                                type="password"
                                placeholder="Enter new password"
                                value={settings.newPassword}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="settings-field">

                            <label htmlFor="confirmPassword">
                                Confirm New Password
                            </label>

                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm new password"
                                value={settings.confirmPassword}
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                </section>

                {/*NOTIFICATIONS*/}

                <section className="settings-card">

                    <div className="settings-card-header">

                        <div className="settings-card-icon">
                            🔔
                        </div>

                        <div>
                            <h2>Notifications</h2>

                            <p>
                                Choose which store notifications you receive.
                            </p>
                        </div>

                    </div>

                    <div className="notification-list">

                        <label className="notification-item">

                            <div>
                                <strong>
                                    Email Notifications
                                </strong>

                                <span>
                                    Receive important store updates by email.
                                </span>
                            </div>

                            <input
                                type="checkbox"
                                name="emailNotifications"
                                checked={settings.emailNotifications}
                                onChange={handleChange}
                            />

                        </label>

                        <label className="notification-item">

                            <div>
                                <strong>
                                    Low Stock Alerts
                                </strong>

                                <span>
                                    Get notified when products have low inventory.
                                </span>
                            </div>

                            <input
                                type="checkbox"
                                name="lowStockAlerts"
                                checked={settings.lowStockAlerts}
                                onChange={handleChange}
                            />

                        </label>

                        <label className="notification-item">

                            <div>
                                <strong>
                                    Order Notifications
                                </strong>

                                <span>
                                    Receive notifications about new orders.
                                </span>
                            </div>

                            <input
                                type="checkbox"
                                name="orderNotifications"
                                checked={settings.orderNotifications}
                                onChange={handleChange}
                            />

                        </label>

                    </div>

                </section>

                {/*ACTIONS*/}

                <div className="settings-actions">

                    {saved && (
                        <span className="settings-success">
                            ✓ Settings saved successfully
                        </span>
                    )}

                    <button
                        type="submit"
                        className="settings-save-button"
                    >
                        Save Settings
                    </button>

                </div>

            </form>

        </div>
    );
}

export default Settings;