import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage({ onLogin }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = form.username.trim();
    const password = form.password.trim();

    if (!username || !password) {
      setMessage('Please enter both username and password.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const user = onLogin(username, password);
      if (!user) {
        setMessage('Invalid username or password.');
        setLoading(false);
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
    }, 500); // subtle delay for smooth transition
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>🔐 Welcome Back</h2>
        <p style={styles.subtext}>Login to continue crafting excellence</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <input
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
          </div>

          {message && <p style={styles.error}>{message}</p>}

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(160deg, #e1c7a1 0%, #f6f1ed 100%)',
    fontFamily: "'Inter', system-ui, sans-serif",
  },

  card: {
    background: '#fff',
    borderRadius: '14px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    padding: '40px 35px',
    textAlign: 'center',
    animation: 'fadeIn 0.6s ease',
  },

  heading: {
    fontSize: '26px',
    fontWeight: 700,
    color: '#3b2f2f',
    marginBottom: '8px',
  },

  subtext: {
    fontSize: '15px',
    color: '#6b5c4c',
    marginBottom: '25px',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },

  field: {
    display: 'flex',
    flexDirection: 'column',
  },

  input: {
    padding: '12px 14px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '15px',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    outline: 'none',
  },

  inputFocus: {
    borderColor: '#7e5a2f',
    boxShadow: '0 0 0 3px rgba(126, 90, 47, 0.2)',
  },

  button: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    padding: '12px 0',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  },

  error: {
    color: '#dc3545',
    fontSize: '14px',
    margin: '-5px 0 5px 0',
  },
};

// Add fade-in animation (optional, global)
const fadeIn = `
@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(15px); }
  100% { opacity: 1; transform: translateY(0); }
}
`;

if (typeof document !== 'undefined' && !document.getElementById('loginFadeIn')) {
  const styleTag = document.createElement('style');
  styleTag.id = 'loginFadeIn';
  styleTag.innerHTML = fadeIn;
  document.head.appendChild(styleTag);
}

export default LoginPage;
