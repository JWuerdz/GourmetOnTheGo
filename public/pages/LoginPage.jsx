import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabaseClient"; // make sure this path is correct
import "./LoginPage.css";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // Handle form submission with Supabase Auth
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            // Attempt to sign in with Supabase Auth
            const { data, error } = await supabase.auth.signInWithPassword({
                email: username, // Supabase treats username as email
                password: password,
            });

            if (error) throw error;

            // Check if user has the 'admin' role
            const user = data.user;
            const role = user?.user_metadata?.role;

            if (role === "admin") {
                alert("Admin login successful!");
                navigate("/admin");
            } else {
                alert("You do not have admin access.");
            }
        } catch (error) {
            alert(error.message || "Error logging in.");
        }
    };

    return (
        <div className="login-page">
            <h2>Login</h2>

            <form className="form-container" onSubmit={handleSubmit}>
                <label htmlFor="username">Username (Email)</label>
                <input
                    id="username"
                    type="email"
                    placeholder="Enter email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit" className="form-btn">
                    Login
                </button>
            </form>

            <p className="back-link">
                <Link to="/menu">← Back to Menu</Link>
            </p>
        </div>
    );
};

export default LoginPage;

