import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        setError("");

        const DEMO_EMAIL = "admin@glowecosmetics.com";
        const DEMO_PASSWORD = "Glow@123";

        if (!email.trim() || !password.trim()) {
            setError("Please enter your email and password.");
            return;
        }

        if (
            email.trim().toLowerCase() !== DEMO_EMAIL ||
            password !== DEMO_PASSWORD
        ) {
            setError("Invalid email or password.");
            return;
        }

        localStorage.setItem("glowe_authenticated", "true");

        if (rememberMe) {
            localStorage.setItem("glowe_remember", "true");
        } else {
            localStorage.removeItem("glowe_remember");
        }

        navigate("/dashboard");
    };

    return (
        <main className="login-page">
            <section className="login-container">

                {/* LEFT SIDE */}
                <div className="login-visual">

                    <div className="visual-overlay"></div>

                    <div className="visual-content">

                        <div className="visual-brand">
                            <span className="brand-symbol">G</span>

                            <div>
                                <span className="brand-name">Glowé</span>
                                <span className="brand-subtitle">
                                    COSMETICS
                                </span>
                            </div>
                        </div>

                        <div className="visual-copy">
                            <span className="eyebrow">
                                BEAUTY • CARE • CONFIDENCE
                            </span>

                            <h1>
                                Beauty begins
                                <br />
                                with <em>you.</em>
                            </h1>

                            <p>
                                Manage your beauty collection,
                                discover your best-selling products,
                                and create a seamless shopping experience.
                            </p>
                        </div>

                        <div className="visual-features">

                            <div className="visual-feature">
                                <span className="feature-icon">✦</span>

                                <div>
                                    <strong>Premium Beauty</strong>
                                    <span>Curated cosmetics</span>
                                </div>
                            </div>

                            <div className="visual-feature">
                                <span className="feature-icon">♡</span>

                                <div>
                                    <strong>Simple Management</strong>
                                    <span>Everything in one place</span>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className="visual-footer">
                        <span>© 2026 Glowé Cosmetics</span>
                        <span>Beauty made simple.</span>
                    </div>

                </div>

                {/* RIGHT SIDE */}
                <div className="login-content">

                    <div className="login-form-wrapper">

                        <div className="mobile-brand">
                            <span className="mobile-brand-symbol">G</span>

                            <div>
                                <span>Glowé</span>
                                <small>COSMETICS</small>
                            </div>
                        </div>

                        <div className="login-heading">

                            <span className="login-eyebrow">
                                WELCOME BACK
                            </span>

                            <h2>
                                Sign in to your
                                <br />
                                <span>beauty space.</span>
                            </h2>

                            <p>
                                Enter your details to continue
                                managing your Glowé store.
                            </p>

                        </div>

                        <form
                            className="login-form"
                            onSubmit={handleSubmit}
                        >

                            {/* EMAIL */}
                            <div className="input-group">

                                <label htmlFor="email">
                                    Email address
                                </label>

                                <div className="input-wrapper">

                                    <span className="input-icon">
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.7"
                                        >
                                            <rect
                                                x="3"
                                                y="5"
                                                width="18"
                                                height="14"
                                                rx="2"
                                            />
                                            <path d="m3 7 9 6 9-6" />
                                        </svg>
                                    </span>

                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        placeholder="you@example.com"
                                        autoComplete="email"
                                        onChange={(event) => {
                                            setEmail(event.target.value);
                                            setError("");
                                        }}
                                    />

                                </div>

                            </div>

                            {/* PASSWORD */}
                            <div className="input-group">

                                <div className="password-label-row">
                                    <label htmlFor="password">
                                        Password
                                    </label>

                                    <button
                                        type="button"
                                        className="forgot-password"
                                        onClick={() => {
                                            setError(
                                                "Password reset will be available soon."
                                            );
                                        }}
                                    >
                                        Forgot password?
                                    </button>
                                </div>

                                <div className="input-wrapper">

                                    <span className="input-icon">
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.7"
                                        >
                                            <rect
                                                x="4"
                                                y="10"
                                                width="16"
                                                height="11"
                                                rx="2"
                                            />
                                            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                                        </svg>
                                    </span>

                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        placeholder="Enter your password"
                                        autoComplete="current-password"
                                        onChange={(event) => {
                                            setPassword(event.target.value);
                                            setError("");
                                        }}
                                    />

                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() =>
                                            setShowPassword((current) => !current)
                                        }
                                        aria-label={
                                            showPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                    >
                                        {showPassword ? (
                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.7"
                                            >
                                                <path d="M3 3l18 18" />
                                                <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                                                <path d="M9.9 4.2A10.6 10.6 0 0 1 12 4c5 0 8.5 4 9.8 6.1a3.4 3.4 0 0 1 0 .8 14 14 0 0 1-3.1 3.8" />
                                                <path d="M6.1 6.1C4 7.6 2.7 9.7 2.2 10.5a2 2 0 0 0 0 1C3.5 13.8 7 18 12 18c1 0 2-.2 2.8-.5" />
                                            </svg>
                                        ) : (
                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.7"
                                            >
                                                <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
                                                <circle cx="12" cy="12" r="2.5" />
                                            </svg>
                                        )}
                                    </button>

                                </div>

                            </div>

                            {/* REMEMBER */}
                            <label className="remember-row">

                                <span className="custom-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(event) =>
                                            setRememberMe(event.target.checked)
                                        }
                                    />

                                    <span className="checkmark">✓</span>
                                </span>

                                <span>Remember me</span>

                            </label>

                            {/* ERROR */}
                            {error && (
                                <div className="login-error">
                                    <span>!</span>
                                    <p>{error}</p>
                                </div>
                            )}

                            {/* SUBMIT */}
                            <button
                                type="submit"
                                className="login-button"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <span className="spinner"></span>
                                        Signing in...
                                    </>
                                ) : (
                                    <>
                                        Sign in
                                        <span className="button-arrow">→</span>
                                    </>
                                )}
                            </button>

                        </form>

                        <div className="demo-info">
                            <div className="demo-icon">✦</div>

                            <div>
                                <strong>Demo access</strong>

                                <p>
                                    Enter any valid email and a
                                    password with 6+ characters.
                                </p>
                            </div>
                        </div>

                        <div className="login-bottom">
                            <span>Secure store management</span>
                            <span className="bottom-dot"></span>
                            <span>Glowé Cosmetics</span>
                        </div>

                    </div>

                </div>

            </section>
        </main>
    );
}

export default Login;