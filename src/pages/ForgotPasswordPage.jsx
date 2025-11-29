import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setMessage('Please enter your email address.');
      return;
    }

    // Simulate sending reset link
    setMessage(`A password reset link has been sent to ${email}`);
    setEmail('');

    // Optionally redirect after some seconds
    setTimeout(() => {
      navigate('/login'); // redirect back to login page
    }, 3000);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* 🔙 Back button */}
        <button onClick={() => navigate('/login')} style={styles.backButton}>
          ← Back to Login
        </button>

        <h2>Forgot Password?</h2>
        <p>Enter your email to receive a password reset link.</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          {message && <p style={styles.message}>{message}</p>}
          <button type="submit" style={styles.button}>
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f0e4d7 0%, #d9c3a5 100%)',
    fontFamily: "'Inter', sans-serif",
  },
  card: {
    background: '#fff',
    borderRadius: '16px',
    padding: '40px',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
    boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
  },
  backButton: {
    marginBottom: '15px',
    padding: '6px 12px',
    fontSize: '14px',
    backgroundColor: '#ccc',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginTop: '20px',
  },
  input: {
    padding: '12px 14px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '15px',
    outline: 'none',
  },
  button: {
    padding: '12px 0',
    borderRadius: '8px',
    backgroundColor: '#8b5e3c',
    color: '#fff',
    fontWeight: 600,
    fontSize: '16px',
    border: 'none',
    cursor: 'pointer',
  },
  message: {
    color: '#28a745',
    fontSize: '14px',
    textAlign: 'center',
  },
};

export default ForgotPasswordPage;
