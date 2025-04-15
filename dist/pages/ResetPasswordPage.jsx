import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";
import './ResetPasswordPage.css';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const accessToken = queryParams.get("access_token"); // Get the token from the URL

  useEffect(() => {
    if (!accessToken) {
      setError("Invalid password reset link.");
    }
  }, [accessToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!password) {
      setError("Please enter a new password.");
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.api.updateUser(accessToken, {
        password: password,
      });

      if (error) throw error;

      alert("Password updated successfully!");
      navigate("/login"); // Redirect to login page
    } catch (error) {
      setError(error.message || "Error resetting password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-page">
      <h2>Reset Your Password</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label htmlFor="password">New Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
