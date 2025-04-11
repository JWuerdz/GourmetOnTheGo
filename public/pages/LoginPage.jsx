import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabaseClient"; // make sure this path is correct
import "./LoginPage.css";

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setEmail("");
        setPassword("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!email || !password) {
            alert("Please fill in all fields.");
            setLoading(false);
            return;
        }

        try {
            let result;

            if (isLogin) {
                result = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
            } else {
                result = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            role: "admin", // or set to "user" if it's a normal user
                        },
                    },
                });
            }

            const { error, data } = result;
            if (error) throw error;

            if (data?.session) {
                const user = data.session.user;
                const role = user?.user_metadata?.role;

                alert("Login successful!");
                if (role === "admin") {
                    navigate("/admin");
                } else {
                    navigate("/menu");
                }
            } else if (isLogin) {
                alert("Unexpected login error.");
            } else {
                alert("Check your email to confirm your sign-up.");
            }
        } catch (error) {
            alert(error.message || "Error logging in.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <h2>{isLogin ? "Login" : "Sign Up"}</h2>

            <form className="form-container" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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

                <button type="submit" className="form-btn" disabled={loading}>
                    {loading ? "Loading..." : isLogin ? "Login" : "Sign Up"}
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
