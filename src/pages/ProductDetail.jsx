import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProductDetail({ product, currentUser }) {
  const navigate = useNavigate();

  // Handle if the product is not found
  if (!product) {
    return (
      <div style={styles.notFound}>
        <h2 style={styles.notFoundTitle}>Product Not Found 🪵</h2>
        <p style={styles.notFoundText}>
          We couldn’t find the wood craft you’re looking for.
        </p>
        <button style={styles.primaryButton} onClick={() => navigate('/')}>
          ← Back to Home
        </button>
      </div>
    );
  }

  // Correct the imageSrc construction
  const imageSrc = product.image?.startsWith('http')
    ? product.image
    : `/images/${product.image || 'placeholder.jpeg'}`;

  // MULTIPLIER converts displayed price -> smallest currency unit.
  // If product.price is in rupees, MULTIPLIER = 100 (paise).
  // If product.price already in paise/cents, set MULTIPLIER = 1.
  const MULTIPLIER = 100;

  // Navigate to checkout and pass amount + product details via location.state
  const handleBuyNow = () => {
    // Guard against invalid price
    const rawPrice = typeof product.price === 'number' ? product.price : 0;
    const amount = Math.round(rawPrice * MULTIPLIER);
    const currency = 'inr'; // change to 'usd' if you use USD
    navigate('/checkout', {
      state: {
        amount, // smallest currency unit (e.g., paise)
        currency,
        productId: product.id,
        productName: product.name,
      },
    });
  };

  const displayPrice =
    typeof product.price === 'number' ? product.price.toFixed(2) : '—';

  return (
    <div style={styles.page}>
      <button style={styles.backLink} onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div style={styles.card}>
        <div style={styles.imageContainer}>
          <img
            src={imageSrc}
            alt={product.name}
            style={styles.image}
            onError={(e) => {
              // use currentTarget so typing is safe and we can set src reliably
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/images/placeholder.jpeg';
            }}
            loading="lazy"
          />
        </div>

        <div style={styles.details}>
          <h2 style={styles.title}>{product.name}</h2>
          <p style={styles.description}>{product.description}</p>

          <div style={styles.infoRow}>
            <span style={styles.label}>Price:</span>
            <span style={styles.price}>₹{displayPrice}</span>
          </div>

          <div style={styles.infoRow}>
            <span style={styles.label}>Artisan:</span>
            <span style={styles.value}>{product.artisan}</span>
          </div>

          {currentUser?.role === 'customer' ? (
            <button
              onClick={handleBuyNow}
              style={{
                ...styles.purchaseButton,
                opacity: typeof product.price === 'number' ? 1 : 0.6,
                cursor: typeof product.price === 'number' ? 'pointer' : 'not-allowed',
              }}
              aria-label={`Buy ${product.name}`}
              disabled={typeof product.price !== 'number'}
            >
              Purchase Now
            </button>
          ) : (
            // placeholder behavior for non-customers
            <button
              onClick={() => alert('🛒 Purchase feature coming soon!')}
              style={styles.purchaseButton}
            >
              Purchase Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    maxWidth: '1100px',
    margin: '60px auto',
    padding: '20px',
    fontFamily: "'Inter', system-ui, sans-serif",
    color: '#2f2f2f',
  },

  backLink: {
    display: 'inline-block',
    color: '#7e5a2f',
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: '16px',
    marginBottom: '20px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
  },

  card: {
    display: 'flex',
    flexDirection: 'row',
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
    overflow: 'hidden',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },

  imageContainer: {
    flex: '1 1 50%',
    overflow: 'hidden',
    position: 'relative',
    minHeight: 320,
  },

  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.6s ease',
  },

  details: {
    flex: '1 1 50%',
    padding: '30px 40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  title: {
    fontSize: '28px',
    fontWeight: 700,
    marginBottom: '15px',
    color: '#3b2f2f',
  },

  description: {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#555',
    marginBottom: '25px',
  },

  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },

  label: {
    fontWeight: 600,
    color: '#444',
  },

  price: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#2e7d32',
  },

  value: {
    fontSize: '16px',
    color: '#555',
  },

  purchaseButton: {
    marginTop: '30px',
    padding: '12px 24px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 600,
    letterSpacing: '0.3px',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  },

  primaryButton: {
    backgroundColor: '#7e5a2f',
    border: 'none',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 600,
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  },

  notFound: {
    textAlign: 'center',
    marginTop: '80px',
    color: '#555',
  },

  notFoundTitle: {
    fontSize: '26px',
    marginBottom: '10px',
  },

  notFoundText: {
    marginBottom: '20px',
    fontSize: '16px',
  },
};

export default ProductDetail;
