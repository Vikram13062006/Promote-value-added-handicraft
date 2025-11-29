// src/pages/ProductDetailWrapper.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetailWrapper = ({ products, currentUser }) => {
  const { id } = useParams();
  const product = products.find((product) => product.id === id);

  if (!product) {
    return (
      <div>
        <h3>Product not found 🪵</h3>
        <p>The product may have been removed or is unavailable.</p>
        <button onClick={() => window.history.back()}>← Go Back</button>
      </div>
    );
  }

  return (
    <div>
      {/* Your product details component */}
    </div>
  );
};

export default ProductDetailWrapper;
