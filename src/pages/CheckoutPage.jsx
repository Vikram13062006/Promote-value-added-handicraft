// src/pages/CheckoutPage.jsx
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useLocation } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutPage() {
  const location = useLocation();
  const amountFromState = location.state?.amount;
  const currencyFromState = location.state?.currency || 'inr';
  const productId = location.state?.productId || null;
  const productName = location.state?.productName || '';

  // fallback amount (in smallest unit)
  const amount = typeof amountFromState === 'number' ? amountFromState : 1999;

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: '0 auto' }}>
      <h2>Checkout</h2>
      <p>
        Paying <strong>{(amount / 100).toFixed(2)} {currencyFromState.toUpperCase()}</strong> for <strong>{productName || 'Order'}</strong>
      </p>

      <Elements stripe={stripePromise}>
        <CheckoutForm
          amount={amount}
          currency={currencyFromState}
          productId={productId}
          productName={productName}
        />
      </Elements>
    </div>
  );
}