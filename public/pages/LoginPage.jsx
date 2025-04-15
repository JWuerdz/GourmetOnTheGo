import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";
import "./LoginPage.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false); // State for forgot password view
  const [emailForReset, setEmailForReset] = useState(""); // Email input for password reset
  const navigate = useNavigate();

  // Handle form submission for login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!username || !password) {
      alert("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: username,
        password: password,
      });

      if (error) throw error;

      const user = data.user;
      const role = user?.user_metadata?.role;

      if (role === "admin") {
        localStorage.setItem("supabase_token", data.session.access_token); // Save token
        alert("Admin login successful!");
        navigate("/admin");
      } else {
        alert("You do not have admin access.");
      }
    } catch (error) {
      alert(error.message || "Error logging in.");
    } finally {
      setLoading(false);
    }
  };

  // Handle password reset form submission
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!emailForReset) {
      alert("Please enter your email address.");
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.api.resetPasswordForEmail(emailForReset);

      if (error) throw error;

      alert("Password reset email sent! Please check your inbox.");
      setForgotPassword(false); // Close the reset form after successful submission
    } catch (error) {
      alert(error.message || "Error sending password reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>

      {/* If forgotPassword is true, show the reset form */}
      {forgotPassword ? (
        <div className="reset-password-form">
          <h3>Reset Your Password</h3>
          <form onSubmit={handlePasswordReset}>
            <label htmlFor="emailForReset">Email</label>
            <input
              id="emailForReset"
              type="email"
              placeholder="Enter your email"
              value={emailForReset}
              onChange={(e) => setEmailForReset(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
          <p>
            <span onClick={() => setForgotPassword(false)}>← Back to Login</span>
          </p>
        </div>
      ) : (
        // Login form
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

          <button type="submit" className="form-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <p
            className="forgot-password-link"
            onClick={() => setForgotPassword(true)} // Show reset password form
          >
            Forgot password?
          </p>
        </form>
      )}

      <p className="back-link">
        <Link to="/menu">← Back to Menu</Link>
      </p>
    </div>
  );
};

export default LoginPage;





