import React from 'react';
import ProductCard from '../components/ProductCard';

function HomePage({ products = [] }) {
  const approved = products.filter((p) => p.approved);

  return (
    <main style={styles.container}>
      <section style={styles.headerSection}>
        <h1 style={styles.title}>🌲 Handcrafted Wooden Creations</h1>
        <p style={styles.subtitle}>
          Discover the beauty of artisan craftsmanship — unique, sustainable, and made with love.
        </p>
      </section>

      {approved.length > 0 ? (
        <div style={styles.grid}>
          {approved.map((product, i) => (
            <div
              key={product.id}
              className="fade-in-up"
              style={{ ...styles.cardWrapper, animationDelay: `${i * 0.1}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div style={styles.emptyState}>
          <img
            src="/images/placeholder.jpeg"
            alt="No products"
            style={styles.emptyImage}
            onError={(e) => (e.target.src = '/images/placeholder.jpeg')}
          />
          <p style={styles.emptyText}>No wood crafts are available at the moment.</p>
        </div>
      )}
    </main>
  );
}

const styles = {
  container: {
    padding: '60px 20px',
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #f6f1ed 0%, #e1c7a1 100%)',
    fontFamily: "'Inter', system-ui, sans-serif",
    textAlign: 'center',
  },

  headerSection: {
    marginBottom: '50px',
    animation: 'fadeIn 0.8s ease',
  },

  title: {
    fontSize: '36px',
    color: '#3b2f2f',
    fontWeight: 800,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    textShadow: '2px 3px 6px rgba(0,0,0,0.15)',
    marginBottom: '10px',
  },

  subtitle: {
    fontSize: '18px',
    color: '#5a4634',
    maxWidth: '700px',
    margin: '0 auto',
    lineHeight: '1.6',
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '30px',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '10px',
    animation: 'fadeInUp 0.6s ease',
  },

  cardWrapper: {
    transition: 'transform 0.3s ease, opacity 0.3s ease',
  },

  emptyState: {
    marginTop: '60px',
    color: '#4a3f2e',
    fontSize: '18px',
  },

  emptyImage: {
    width: '180px',
    marginBottom: '20px',
    borderRadius: '50%',
    opacity: 0.85,
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  },

  emptyText: {
    fontSize: '20px',
    color: '#5e4c3d',
    fontStyle: 'italic',
  },
};

// Optional fade-in keyframes (if you’re using global CSS, add these)
const fadeInStyles = `
@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInUp {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}
`;

if (typeof document !== 'undefined' && !document.getElementById('fadeInKeyframes')) {
  const styleTag = document.createElement('style');
  styleTag.id = 'fadeInKeyframes';
  styleTag.innerHTML = fadeInStyles;
  document.head.appendChild(styleTag);
}

export default HomePage;
