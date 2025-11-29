import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage({ onLogin, onForgotPassword }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [captchaInput, setCaptchaInput] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [captchaCode, setCaptchaCode] = useState('');
  const navigate = useNavigate();

  // Generate random letters CAPTCHA
  const generateCaptcha = () => {
    const length = Math.floor(Math.random() * 2) + 4; // 4 or 5 letters
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let code = '';
    for (let i = 0; i < length; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = form.username.trim();
    const password = form.password.trim();

    if (!username || !password) {
      setMessage('Please enter both username and password.');
      return;
    }

    if (captchaInput.trim() !== captchaCode) {
      setMessage('Incorrect CAPTCHA.');
      setCaptchaInput('');
      generateCaptcha();
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const user = onLogin(username, password);
      if (!user) {
        setMessage('Invalid username or password.');
        setLoading(false);
        setCaptchaInput('');
        generateCaptcha();
      } else {
        setMessage('');
        switch (user.role) {
          case 'admin':
            navigate('/admin');
            break;
          case 'artisan':
            navigate('/artisan');
            break;
          case 'consultant':
            navigate('/consultant');
            break;
          default:
            navigate('/');
        }
      }
    }, 500);
  };

  const handleForgotPassword = () => {
    if (onForgotPassword) {
      onForgotPassword(); // Call handler if provided
    } else {
      navigate('/forgot-password'); // Default route
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>Login to continue crafting excellence</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <input
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              style={styles.input}
            />
            <div style={styles.forgotWrapper}>
              <button
                type="button"
                onClick={handleForgotPassword}
                style={styles.forgotBtn}
              >
                Forgot Password?
              </button>
            </div>
          </div>

          <div style={styles.field}>
            <div style={styles.captchaBox}>
              <span style={styles.captchaText}>{captchaCode}</span>
              <button
                type="button"
                onClick={generateCaptcha}
                style={styles.refreshBtn}
              >
                🔄
              </button>
            </div>
            <input
              type="text"
              placeholder="Enter CAPTCHA"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
              style={styles.input}
            />
          </div>

          {message && <p style={styles.error}>{message}</p>}

          <button
            type="submit"
            style={loading ? { ...styles.button, opacity: 0.7 } : styles.button}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
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
    boxShadow: '0 12px 28px rgba(0, 0, 0, 0.15)',
    width: '100%',
    maxWidth: '420px',
    padding: '50px 40px',
    textAlign: 'center',
  },

  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#3b2f2f',
    marginBottom: '10px',
  },

  subtitle: {
    fontSize: '16px',
    color: '#6b5c4c',
    marginBottom: '30px',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },

  field: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
  },

  forgotWrapper: {
    textAlign: 'right',
    marginTop: '6px',
  },

  forgotBtn: {
    background: 'none',
    border: 'none',
    color: '#8b5e3c',
    fontSize: '14px',
    cursor: 'pointer',
    textDecoration: 'underline',
    padding: 0,
  },

  captchaBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '6px',
  },

  captchaText: {
    fontSize: '20px',
    fontWeight: '700',
    letterSpacing: '3px',
    color: '#8b5e3c',
    userSelect: 'none',
  },

  refreshBtn: {
    padding: '4px 8px',
    fontSize: '14px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: '#e1c7a1',
  },

  input: {
    padding: '14px 16px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    fontSize: '15px',
    outline: 'none',
  },

  button: {
    padding: '14px 0',
    borderRadius: '10px',
    backgroundColor: '#8b5e3c',
    color: '#fff',
    fontWeight: '600',
    fontSize: '16px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background 0.3s, transform 0.2s',
  },

  error: {
    color: '#dc3545',
    fontSize: '14px',
    textAlign: 'center',
  },
};

// Dummy login for testing
export function dummyLogin(username, password) {
  if (username === 'user' && password === 'pass') {
    return { username, role: 'artisan' };
  }
  return null;
}

export default LoginPage;
