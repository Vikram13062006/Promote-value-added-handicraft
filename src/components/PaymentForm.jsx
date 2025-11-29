import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PaymentForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !amount) {
      return;
    }

    // Basic validation for amount
    if (amount <= 0) {
      setPaymentError('Invalid amount. Please try again.');
      return;
    }

    setIsProcessing(true);

    try {
      // Create a payment intent server-side
      const response = await axios.post('/create-payment-intent', { amount });
      const { clientSecret } = response.data;

      // Confirm the payment with the clientSecret
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        console.error('Stripe error:', result.error);  // Log error for debugging
        setPaymentError(result.error.message || 'An unexpected error occurred');
        setIsProcessing(false);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          // Payment successful
          setPaymentSuccess(true);
          setIsProcessing(false);
          navigate('/payment-success');  // Redirect to success page
        }
      }
    } catch (error) {
      console.error('Payment failed', error); // Log any errors
      setPaymentError('Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="payment-form">
      <form onSubmit={handleSubmit}>
        <h3>Pay ₹{amount}</h3>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#333',
                fontFamily: 'Inter, sans-serif',
                '::placeholder': { color: '#aaa' },
              },
            },
          }}
        />
        
        {/* Show error message if any */}
        {paymentError && <p style={{ color: 'red', fontSize: '14px' }}>{paymentError}</p>}

        {/* Display loading state */}
        <button 
          disabled={isProcessing || !stripe || !elements} 
          type="submit"
          className="submit-button"
        >
          {isProcessing ? 'Processing…' : 'Pay Now'}
        </button>
      </form>

      {/* Success message after successful payment */}
      {paymentSuccess && <div className="success-message">Payment Successful!</div>}
    </div>
  );
};

export default PaymentForm;
