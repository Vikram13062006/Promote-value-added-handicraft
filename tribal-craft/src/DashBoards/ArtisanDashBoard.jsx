import React from 'react';
import { useNavigate } from 'react-router-dom';

function ArtisanDashboard({ products, currentUser }) {
  const navigate = useNavigate();
  const artisanProducts = products.filter(p => p.artisan === currentUser?.username);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>👋 Welcome, {currentUser?.username}</h2>

      {/* Add Product Button */}
      <div style={styles.buttonContainer}>
        <button onClick={() => navigate('/add-product')} style={styles.addButton}>
          ➕ Add New Product
        </button>
      </div>

      <h3 style={styles.subHeader}>🪵 Your Uploaded Products</h3>

      {artisanProducts.length > 0 ? (
        <div style={styles.grid}>
          {artisanProducts.map((p, index) => (
            <div
              key={p.id}
              style={{ ...styles.card, animationDelay: `${index * 0.1}s` }}
              className="fade-in-up"
            >
              <div style={styles.imageContainer}>
                <img
                  src={p.image || '/images/placeholder.jpeg'}
                  alt={p.name}
                  onError={(e) => (e.target.src = '/images/placeholder.jpeg')}
                  style={styles.image}
                />
              </div>
              <div style={styles.cardBody}>
                <h4 style={styles.productName}>{p.name}</h4>
                <p style={styles.price}>💰 ₹{p.price.toFixed(2)}</p>
                <p style={styles.status}>
                  Status:{' '}
                  <span style={p.approved ? styles.approved : styles.pending}>
                    {p.approved ? '✅ Approved' : '🕒 Pending Approval'}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={styles.emptyState}>
          <img
            src="/images/placeholder.jpeg"
            alt="No products"
            style={styles.emptyImage}
          />
          <p style={styles.noProducts}>You have not added any products yet.</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '40px 20px',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f3e2c0 0%, #e1c7a1 100%)',
    fontFamily: "'Inter', sans-serif",
  },
  header: {
    textAlign: 'center',
    fontSize: '30px',
    color: '#3b2f2f',
    marginBottom: '30px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    textShadow: '2px 2px 5px rgba(0,0,0,0.15)',
  },
  buttonContainer: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  addButton: {
    backgroundColor: '#27ae60',
    color: '#fff',
    padding: '12px 22px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  subHeader: {
    textAlign: 'center',
    color: '#4b3a2f',
    marginBottom: '25px',
    fontSize: '22px',
    fontWeight: '600',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '25px',
    maxWidth: '1100px',
    margin: '0 auto',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  imageContainer: {
    height: '180px',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.4s ease',
  },
  cardBody: {
    padding: '15px',
    textAlign: 'center',
  },
  productName: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#3b2f2f',
    marginBottom: '6px',
  },
  price: {
    fontSize: '16px',
    color: '#5c4b3a',
    marginBottom: '10px',
  },
  status: {
    fontSize: '14px',
    color: '#4b3a2f',
  },
  approved: {
    color: 'green',
    fontWeight: 'bold',
  },
  pending: {
    color: 'orange',
    fontWeight: 'bold',
  },
  emptyState: {
    textAlign: 'center',
    marginTop: '60px',
  },
  emptyImage: {
    width: '150px',
    borderRadius: '50%',
    opacity: '0.8',
    marginBottom: '20px',
  },
  noProducts: {
    fontSize: '18px',
    color: '#5e4c3d',
    fontStyle: 'italic',
  },
};

export default ArtisanDashboard;
