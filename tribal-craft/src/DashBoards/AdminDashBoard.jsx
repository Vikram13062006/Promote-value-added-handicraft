// src/DashBoards/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate loading users from an API or global state
  useEffect(() => {
    setTimeout(() => {
      setUsers([
        { username: 'artisan1', role: 'artisan' },
        { username: 'customer1', role: 'customer' },
        { username: 'consultant1', role: 'consultant' },
        { username: 'admin1', role: 'admin' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Admin Dashboard</h1>
      <p style={styles.subHeader}>Manage all registered users efficiently</p>

      {loading ? (
        <p style={styles.loading}>Loading users...</p>
      ) : users.length === 0 ? (
        <p style={styles.noUsers}>No users registered yet.</p>
      ) : (
        <div style={styles.userGrid}>
          {users.map((user) => (
            <div key={user.username} style={styles.userCard}>
              <div style={styles.userInfo}>
                <h2 style={styles.username}>{user.username}</h2>
                <span style={styles.roleBadge}>{user.role}</span>
              </div>
              <div style={styles.actions}>
                {/* Future action buttons can go here */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '50px auto',
    padding: '20px',
    fontFamily: 'Segoe UI, sans-serif',
  },
  header: {
    fontSize: '32px',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: '5px',
  },
  subHeader: {
    textAlign: 'center',
    color: '#7f8c8d',
    fontSize: '16px',
    marginBottom: '30px',
  },
  loading: {
    textAlign: 'center',
    color: '#95a5a6',
  },
  noUsers: {
    textAlign: 'center',
    color: '#95a5a6',
    fontStyle: 'italic',
  },
  userGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '20px',
  },
  userCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  userCardHover: {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
  },
  userInfo: {
    marginBottom: '15px',
  },
  username: {
    fontSize: '20px',
    color: '#34495e',
    marginBottom: '5px',
  },
  roleBadge: {
    display: 'inline-block',
    padding: '4px 10px',
    backgroundColor: '#ecf0f1',
    borderRadius: '20px',
    fontSize: '12px',
    color: '#2c3e50',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  actions: {
    textAlign: 'right',
  },
};

export default AdminDashboard;
