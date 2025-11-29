import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header({ currentUser, onLogout }) {
  const navigate = useNavigate();

  return (
    <header style={styles.header}>
      <h1 style={styles.logo}>Tribal Craft</h1>
      <nav style={styles.nav}>
        {/* Navigation buttons */}
        <button style={styles.button} onClick={() => navigate('/')}>Home</button>
        <button style={styles.button} onClick={() => navigate('/new1')}>New Page 1</button>
        <button style={styles.button} onClick={() => navigate('/new2')}>New Page 2</button>

        {!currentUser && (
          <>
            <button style={styles.button} onClick={() => navigate('/register')}>Register</button>
            <button style={styles.button} onClick={() => navigate('/login')}>Login</button>
          </>
        )}

        {currentUser && (
          <>
            {currentUser.role === 'artisan' && (
              <button style={styles.button} onClick={() => navigate('/artisan')}>Artisan Dashboard</button>
            )}
            {currentUser.role === 'consultant' && (
              <button style={styles.button} onClick={() => navigate('/consultant')}>Consultant Dashboard</button>
            )}
            {currentUser.role === 'admin' && (
              <button style={styles.button} onClick={() => navigate('/admin')}>Admin Dashboard</button>
            )}
            <button
              style={styles.logoutButton}
              onClick={() => {
                onLogout();
                navigate('/');
              }}
            >
              Logout ({currentUser.username})
            </button>
          </>
        )}
      </nav>
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: '#4a3f35',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
    flexWrap: 'wrap',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  logo: {
    margin: 0,
    fontFamily: `'Roboto Slab', serif`,
    fontSize: '2rem',
    letterSpacing: '2px',
    color: '#fff',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
  },
  button: {
    padding: '0.8rem 1.5rem',
    fontSize: '1rem',
    cursor: 'pointer',
    backgroundColor: '#e1c7a1',
    border: 'none',
    borderRadius: '6px',
    transition: 'background-color 0.3s, transform 0.3s ease-in-out',
    color: '#4a3f35',
    fontWeight: '600',
  },
  logoutButton: {
    padding: '0.8rem 1.5rem',
    fontSize: '1rem',
    cursor: 'pointer',
    backgroundColor: '#d45d5d',
    border: 'none',
    borderRadius: '6px',
    transition: 'background-color 0.3s, transform 0.3s ease-in-out',
    color: '#fff',
    fontWeight: '600',
  },
  buttonHover: {
    backgroundColor: '#d2b78a',
    transform: 'scale(1.05)',
  },
  logoutHover: {
    backgroundColor: '#ff3d3d',
    transform: 'scale(1.05)',
  },
};

export default Header;
