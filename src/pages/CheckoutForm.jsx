// src/pages/CheckoutForm.jsx
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

export default function CheckoutForm({ amount, currency = 'inr', productName = '' }) {
  const stripe = useStripe();
  const elements = useElements();

  const [method, setMethod] = useState('card'); // 'card' | 'upi' | 'cod'
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState(null);
  const [upiId, setUpiId] = useState('');

  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4242';

  async function postJSON(url, body) {
    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  }

  async function handleCardPayment(clientSecret) {
    const card = elements.getElement(CardElement);
    if (!card) throw new Error('Card element not found');

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card, billing_details: {} },
    });

    if (result.error) throw result.error;
    if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
      return { success: true, id: result.paymentIntent.id };
    }
    return { success: false };
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setStatus('');
    setLoading(true);

    try {
      if (method === 'card') {
        if (!stripe || !elements) throw new Error('Stripe is not loaded yet');

        setStatus('Creating payment intent...');
        const resp = await postJSON(`${API_BASE}/create-payment-intent`, {
          amount, currency, metadata: { productName, method: 'card' },
        });

        if (!resp.ok) {
          const txt = await resp.text().catch(() => resp.statusText);
          throw new Error(txt || 'Failed to create payment intent');
        }

        const data = await resp.json();
        const clientSecret = data.clientSecret;
        setStatus('Confirming card payment...');
        const res = await handleCardPayment(clientSecret);
        if (res.success) {
          setStatus('Payment succeeded. Thank you!');
        } else {
          setStatus('Payment not completed.');
        }
      } else if (method === 'cod') {
        setStatus('Placing COD order...');
        const resp = await postJSON(`${API_BASE}/create-order`, {
          amount, currency, method: 'cod', productName,
        });

        if (!resp.ok) {
          // fallback simulation when backend missing
          setStatus('Placed order locally (COD simulated).');
        } else {
          setStatus('Order placed (Cash on Delivery).');
        }
      } else if (method === 'upi') {
        if (!upiId || upiId.trim().length < 3) throw new Error('Enter a valid UPI ID');

        setStatus('Creating UPI order...');
        const resp = await postJSON(`${API_BASE}/create-order`, {
          amount, currency, method: 'upi', upiId, productName,
        });

        if (!resp.ok) {
          setStatus('UPI order recorded locally (simulate). Please complete payment using your UPI app.');
        } else {
          setStatus('UPI order created. Complete payment from your UPI app.');
        }
      }
    } catch (err) {
      setError(err?.message || String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      {/* Payment method selector */}
      <div style={styles.methodGroup}>
        <MethodOption
          name="card"
          checked={method === 'card'}
          label="Pay with Card"
          onChange={() => setMethod('card')}
        />
        <MethodOption
          name="upi"
          checked={method === 'upi'}
          label="UPI"
          onChange={() => setMethod('upi')}
        />
        <MethodOption
          name="cod"
          checked={method === 'cod'}
          label="Cash on Delivery"
          onChange={() => setMethod('cod')}
        />
      </div>

      {/* Payment details area (card / upi / cod) */}
      <div style={styles.detailsArea}>
        {method === 'card' && (
          <div style={styles.cardBox}>
            <label style={styles.label}>Card details</label>
            <div style={styles.cardElementWrap}>
              <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
            </div>
          </div>
        )}

        {method === 'upi' && (
          <div style={styles.cardBox}>
            <label style={styles.label}>Enter your UPI ID (payer)</label>
            <input
              type="text"
              placeholder="example@bank"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              style={styles.textInput}
            />
            <div style={styles.note}>After creating the order, complete payment in your UPI app.</div>
          </div>
        )}

        {method === 'cod' && (
          <div style={styles.cardBox}>
            <div style={styles.codBox}>
              <strong>You chose Cash on Delivery.</strong>
              <div style={{ marginTop: 8, color: '#555' }}>
                We will confirm your order and collect payment when the courier delivers the item.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action */}
      <div style={styles.actionRow}>
        <button type="submit" disabled={loading} style={styles.primaryButton}>
          {loading ? 'Processing…' : method === 'card' ? `Pay ${(amount / 100).toFixed(2)} ${currency.toUpperCase()}` : method === 'upi' ? 'Create UPI Order' : 'Place COD Order'}
        </button>
      </div>

      {/* Status & error */}
      <div style={styles.messages}>
        {status && <div style={styles.status}>{status}</div>}
        {error && <div style={styles.error}>{error}</div>}
      </div>
    </form>
  );
}

/* small helper component for radio + label */
function MethodOption({ name, checked, label, onChange }) {
  return (
    <label style={styles.methodOption}>
      <input
        type="radio"
        name="method"
        value={name}
        checked={checked}
        onChange={onChange}
        style={styles.radio}
      />
      <span style={styles.methodLabel}>{label}</span>
    </label>
  );
}

/* styles */
const styles = {
  form: {
    display: 'block',
    boxSizing: 'border-box',
    width: '100%',
    maxWidth: 640,
    margin: '0 auto',
    fontFamily: "'Inter', system-ui, sans-serif",
  },

  methodGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    marginBottom: 18,
  },

  methodOption: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '10px 14px',
    borderRadius: 8,
    cursor: 'pointer',
    background: '#faf7f3',
    border: '1px solid rgba(0,0,0,0.03)',
  },

  radio: {
    width: 18,
    height: 18,
  },

  methodLabel: {
    fontSize: 16,
    color: '#2f2f2f',
    fontWeight: 600,
  },

  detailsArea: {
    marginBottom: 16,
  },

  cardBox: {
    padding: 14,
    borderRadius: 8,
    border: '1px solid #eee',
    background: '#fff',
  },

  label: {
    display: 'block',
    marginBottom: 8,
    fontSize: 14,
    color: '#444',
  },

  cardElementWrap: {
    padding: 10,
    borderRadius: 6,
    border: '1px solid #e6e6e6',
    background: '#fafafa',
  },

  textInput: {
    width: '100%',
    padding: '10px 12px',
    borderRadius: 6,
    border: '1px solid #d9d9d9',
    boxSizing: 'border-box',
    fontSize: 14,
  },

  note: {
    marginTop: 10,
    fontSize: 13,
    color: '#666',
  },

  codBox: {
    padding: 10,
    borderRadius: 6,
    background: '#fff8f0',
    border: '1px solid #fde7cf',
  },

  actionRow: {
    marginTop: 16,
  },

  primaryButton: {
    background: '#7e5a2f',
    color: '#fff',
    padding: '10px 18px',
    borderRadius: 8,
    border: 'none',
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: 15,
  },

  messages: {
    marginTop: 14,
    minHeight: 22,
  },

  status: {
    color: '#2a7f2a',
    fontWeight: 600,
  },

  error: {
    color: '#d32f2f',
    fontWeight: 600,
  },
};
