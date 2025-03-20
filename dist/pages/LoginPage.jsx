import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    // Toggle between Login and Sign Up forms
    const toggleForm = () => {
        setIsLogin(!isLogin);
        setUsername("");
        setEmail("");
        setPassword("");
        setIsAdmin(false);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!username || !password) {
            alert("Please fill in all fields.");
            return;
        }

        if (isLogin) {
            if (isAdmin && username === "admin" && password === "admin123") {
                alert("Admin login successful!");
                navigate("/admin");
            } else if (!isAdmin && username === "user" && password === "user123") {
                alert("User login successful!");
                navigate("/menu");
            } else {
                alert("Invalid credentials.");
            }
        } else {
            alert(`Signing up:\nUsername: ${username}\nEmail: ${email}\nPassword: ${password}`);
            setIsLogin(true);
        }
    };

    return (
        <div className="login-page">
            <h2>{isLogin ? "Login" : "Sign Up"}</h2>

            <form className="form-container" onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                {!isLogin && (
                    <>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </>
                )}

                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {isLogin && (
                    <div className="admin-toggle">
                        <label>
                            <input
                                type="checkbox"
                                checked={isAdmin}
                                onChange={() => setIsAdmin(!isAdmin)}
                            />
                            Login as Admin
                        </label>
                    </div>
                )}

                <button type="submit" className="form-btn">
                    {isLogin ? "Login" : "Sign Up"}
                </button>
            </form>

            <p className="toggle-text">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button onClick={toggleForm} className="toggle-btn">
                    {isLogin ? "Sign Up" : "Login"}
                </button>
            </p>

            <p className="back-link">
                <Link to="/menu">← Back to Menu</Link>
            </p>
        </div>
    );
};

export default LoginPage;
