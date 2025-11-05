import React from 'react';

function ConsultantDashboard({ products, onApprove }) {
  const pendingProducts = products.filter((p) => !p.approved);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>🧾 Pending Product Approvals</h2>

      {pendingProducts.length > 0 ? (
        <div style={styles.grid}>
          {pendingProducts.map((p, index) => (
            <div
              key={p.id}
              style={{ ...styles.card, animationDelay: `${index * 0.1}s` }}
              className="fade-in-up"
            >
              <div style={styles.imageContainer}>
                <img
                  src={p.image || '/images/placeholder.jpeg'}
                  alt={p.name}
                  style={styles.image}
                  onError={(e) => (e.target.src = '/images/placeholder.jpeg')}
                />
              </div>

              <div style={styles.cardContent}>
                <h3 style={styles.title}>{p.name}</h3>
                <p style={styles.text}>
                  <strong>Artisan:</strong> {p.artisan}
                </p>
                <p style={styles.text}>
                  <strong>Price:</strong> ₹{p.price.toFixed(2)}
                </p>

                <button style={styles.button} onClick={() => onApprove(p.id)}>
                  ✅ Approve Product
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={styles.emptyState}>
          <img
            src="/images/placeholder.jpeg"
            alt="No pending items"
            style={styles.emptyImage}
          />
          <p style={styles.noPending}>No pending products for approval.</p>
        </div>
      )}
    </div>
  );
}

// Styling
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
    marginBottom: '40px',
    fontWeight: '700',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    textShadow: '2px 2px 5px rgba(0,0,0,0.15)',
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
    gap: '25px',
    maxWidth: '1100px',
    margin: '0 auto',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
  },

  cardContent: {
    padding: '20px',
    textAlign: 'center',
  },

  imageContainer: {
    position: 'relative',
    width: '100%',
    height: '180px',
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.4s ease',
  },

  title: {
    fontSize: '20px',
    marginBottom: '10px',
    color: '#3b2f2f',
    fontWeight: '600',
  },

  text: {
    fontSize: '15px',
    color: '#5c4b3a',
    marginBottom: '8px',
  },

  button: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    padding: '10px 18px',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  },

  buttonHover: {
    backgroundColor: '#218838',
    transform: 'translateY(-2px)',
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

  noPending: {
    fontSize: '18px',
    color: '#5e4c3d',
    fontStyle: 'italic',
  },
};

// Smooth hover transitions for cards
styles.card[':hover'] = {
  transform: 'translateY(-8px)',
  boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
};

export default ConsultantDashboard;
