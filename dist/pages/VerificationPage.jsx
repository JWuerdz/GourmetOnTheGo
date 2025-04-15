import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase/supabaseClient'; // Import your supabase client
import './VerificationPage.css';

const VerifyEmailPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyEmail = async () => {
      // Get the token from the URL
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');

      if (token) {
        try {
          const { error } = await supabase.auth.api.verifyEmail(token);
          
          if (error) throw error;
          
          // Optionally, you can also automatically log the user in here.
          alert('Your email has been confirmed!');
          setLoading(false);
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      } else {
        setError('Invalid or missing token');
        setLoading(false);
      }
    };

    verifyEmail();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Verifying your email...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <p>Email successfully verified! You can now log in.</p>
      )}
    </div>
  );
};

export default VerifyEmailPage;
