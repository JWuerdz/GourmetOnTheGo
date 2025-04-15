import React, { useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import { useNavigate } from "react-router-dom";
import "./SignUpPage.css";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      alert("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      // Register the admin user
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) throw error;

      // After sign-up, update the user metadata to mark them as an admin
      const { error: metadataError } = await supabase
        .from("users") // Assuming you have a users table
        .upsert([
          {
            id: data.user.id,
            user_metadata: { role: "admin" },
          },
        ]);

      if (metadataError) throw metadataError;

      alert("Admin account created successfully!");
      navigate("/admin");
    } catch (error) {
      alert(error.message || "Error creating admin account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <h2>Sign Up as Admin</h2>
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
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
