import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product }) {
  const navigate = useNavigate();

  // Determine image source and fallback
  const imageSrc = product.image?.startsWith('http')
    ? product.image
    : `/images/${product.image || 'placeholder.jpeg'}`;

  // Truncate long descriptions for clean layout
  const truncate = (text, maxLength) => {
    if (!text) return 'No description available';
    if (text.length <= maxLength) return text;
    const truncated = text.substring(0, maxLength);
    return truncated.substring(0, truncated.lastIndexOf(' ')) + '...';
  };

  return (
    <div
      style={styles.card}
      onClick={() => navigate(`/product/${product.id}`)}
      className="product-card"
    >
      <div style={styles.imageContainer}>
        <img
          src={imageSrc}
          alt={product.name}
          style={styles.image}
          onError={(e) => (e.target.src = '/images/placeholder.jpeg')}
          loading="lazy"
        />
        <div style={styles.overlay}>
          <button
            style={styles.viewButton}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/product/${product.id}`);
            }}
          >
            View Details
          </button>
        </div>
      </div>

      <div style={styles.info}>
        <h3 style={styles.name}>{product.name}</h3>
        <p style={styles.description}>{truncate(product.description, 70)}</p>
        <div style={styles.priceRow}>
          <span style={styles.price}>₹{product.price?.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: '#fff',
    borderRadius: '14px',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '300px',
    margin: '20px',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },

  imageContainer: {
    position: 'relative',
    overflow: 'hidden',
    borderTopLeftRadius: '14px',
    borderTopRightRadius: '14px',
  },

  image: {
    width: '100%',
    height: '240px',
    objectFit: 'cover',
    transition: 'transform 0.5s ease',
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.4)',
    opacity: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'opacity 0.3s ease',
  },

  info: {
    padding: '16px 18px 22px',
    textAlign: 'left',
  },

  name: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#3b2f2f',
    marginBottom: '8px',
  },

  description: {
    fontSize: '14px',
    color: '#555',
    lineHeight: '1.5',
    marginBottom: '12px',
    minHeight: '45px',
  },

  priceRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  price: {
    fontSize: '17px',
    fontWeight: 700,
    color: '#2e7d32',
  },

  viewButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    padding: '10px 16px',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  },

  // Fallback for inline hover style (works best with CSS-in-JS or modules)
  cardHover: {
    transform: 'translateY(-6px)',
    boxShadow: '0 10px 24px rgba(0, 0, 0, 0.12)',
  },
};

// Add hover effects dynamically using JS (for inline style workaround)
document.addEventListener('mouseover', (e) => {
  const card = e.target.closest('.product-card');
  if (card) {
    const img = card.querySelector('img');
    const overlay = card.querySelector('div[style*="position: absolute"]');
    card.style.transform = 'translateY(-6px)';
    card.style.boxShadow = '0 10px 24px rgba(0,0,0,0.12)';
    if (img) img.style.transform = 'scale(1.05)';
    if (overlay) overlay.style.opacity = 1;
  }
});

document.addEventListener('mouseout', (e) => {
  const card = e.target.closest('.product-card');
  if (card) {
    const img = card.querySelector('img');
    const overlay = card.querySelector('div[style*="position: absolute"]');
    card.style.transform = 'translateY(0)';
    card.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)';
    if (img) img.style.transform = 'scale(1)';
    if (overlay) overlay.style.opacity = 0;
  }
});

export default ProductCard;
