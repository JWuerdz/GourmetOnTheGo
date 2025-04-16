import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";
import "./LoginPage.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetEmail, setResetEmail] = useState(""); // State for reset email form
  const [showResetForm, setShowResetForm] = useState(false); // State to toggle reset password form
  const navigate = useNavigate();

  // Handle form submission with Supabase Auth
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

  // Handle password reset
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail); // Corrected method
      if (error) throw error;

      alert("Password reset link sent to your email.");
      setShowResetForm(false); // Hide reset form after submission
    } catch (error) {
      alert(error.message || "Error sending password reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>

      {/* If reset form is shown, display it */}
      {showResetForm ? (
        <form className="form-container" onSubmit={handlePasswordReset}>
          <label htmlFor="resetEmail">Enter your email</label>
          <input
            id="resetEmail"
            type="email"
            placeholder="Enter email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            required
          />
          <button type="submit" className="form-btn" disabled={loading}>
            {loading ? "Sending reset email..." : "Send Reset Link"}
          </button>
          <p>
            Remembered your password?{" "}
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => setShowResetForm(false)}
            >
              Go back to login
            </span>
          </p>
        </form>
      ) : (
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

          <p>
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => setShowResetForm(true)}
            >
              Forgot password?
            </span>
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






