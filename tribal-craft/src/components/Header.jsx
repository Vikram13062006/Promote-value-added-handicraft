import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header({ currentUser, onLogout }) {
  const navigate = useNavigate();

  return (
    <header style={styles.header}>
      <h1 style={styles.logo}>Tribal Craft</h1>
      <nav style={styles.nav}>
        <button style={styles.button} onClick={() => navigate('/')}>Home</button>

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
    backgroundColor: '#4a3f35', // Earthy brown for tribal feel
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
    flexWrap: 'wrap',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Add subtle shadow for depth
  },
  logo: {
    margin: 0,
    fontFamily: `'Roboto Slab', serif`, // A professional and elegant serif font for logo
    fontSize: '2rem',
    letterSpacing: '2px',
    color: '#fff', // White text for contrast
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flexWrap: 'wrap',
    justifyContent: 'flex-end', // Align navigation items to the right
  },
  button: {
    padding: '0.8rem 1.5rem',
    fontSize: '1rem',
    cursor: 'pointer',
    backgroundColor: '#e1c7a1', // Warm beige/gold color
    border: 'none',
    borderRadius: '6px',
    transition: 'background-color 0.3s, transform 0.3s ease-in-out',
    color: '#4a3f35', // Dark brown text for better readability
    fontWeight: '600', // Make the font bold
  },
  logoutButton: {
    padding: '0.8rem 1.5rem',
    fontSize: '1rem',
    cursor: 'pointer',
    backgroundColor: '#d45d5d', // Muted red for logout button
    border: 'none',
    borderRadius: '6px',
    transition: 'background-color 0.3s, transform 0.3s ease-in-out',
    color: '#fff',
    fontWeight: '600',
  },
  buttonHover: {
    backgroundColor: '#d2b78a', // Lighter beige when hovered
    transform: 'scale(1.05)', // Slight scale effect on hover
  },
  logoutHover: {
    backgroundColor: '#ff3d3d', // Brighter red when hovered
    transform: 'scale(1.05)', // Slight scale effect on hover
  },
};

export default Header;
