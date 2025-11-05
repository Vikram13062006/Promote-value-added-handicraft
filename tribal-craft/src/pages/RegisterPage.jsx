import React, { useState } from 'react';

function RegisterPage({ users, onRegister }) {
  const [form, setForm] = useState({ username: '', password: '', role: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = form.username.trim();
    const password = form.password.trim();
    const role = form.role;

    if (!username || !password || !role) {
      setMessage('⚠️ Please fill all fields.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const success = onRegister({ username, password, role });
      if (!success) {
        setMessage('❌ Username already exists.');
      } else {
        setMessage('✅ Registered successfully!');
        setForm({ username: '', password: '', role: '' });
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>🪵 Create Your Account</h2>
        <p style={styles.subtext}>Join our community of artisans and enthusiasts</p>

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

          <div style={styles.field}>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              style={styles.select}
            >
              <option value="">Select Role</option>
              <option value="artisan">Artisan</option>
              <option value="consultant">Consultant</option>
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {message && (
            <p
              style={{
                ...styles.message,
                color: message.includes('success') ? '#28a745' : '#dc3545',
              }}
            >
              {message}
            </p>
          )}

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}

// Elegant and cohesive styling
const styles = {
  page: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(145deg, #f3e2c0 0%, #e1c7a1 100%)',
    fontFamily: "'Inter', sans-serif",
  },

  card: {
    background: '#fff',
    borderRadius: '14px',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
    padding: '40px 35px',
    width: '100%',
    maxWidth: '420px',
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
    outline: 'none',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
  },

  select: {
    padding: '12px 14px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '15px',
    backgroundColor: '#fff',
    outline: 'none',
    cursor: 'pointer',
  },

  button: {
    backgroundColor: '#7e5a2f',
    color: '#fff',
    border: 'none',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  },

  message: {
    fontSize: '14px',
    marginTop: '-5px',
    marginBottom: '5px',
  },
};

// Add fade-in animation
const fadeIn = `
@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(15px); }
  100% { opacity: 1; transform: translateY(0); }
}
`;

if (typeof document !== 'undefined' && !document.getElementById('registerFadeIn')) {
  const styleTag = document.createElement('style');
  styleTag.id = 'registerFadeIn';
  styleTag.innerHTML = fadeIn;
  document.head.appendChild(styleTag);
}

export default RegisterPage;
