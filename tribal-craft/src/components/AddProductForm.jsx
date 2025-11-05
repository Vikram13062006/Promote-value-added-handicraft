import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddProductForm({ onAdd, user }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    image: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required.';
    if (!form.description.trim()) newErrors.description = 'Description is required.';
    if (!form.price || isNaN(form.price) || parseFloat(form.price) <= 0)
      newErrors.price = 'Price must be a positive number.';
    if (!form.image.trim()) newErrors.image = 'Image URL is required.';
    return newErrors;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    const newProduct = {
      id: 'p' + Date.now(),
      name: form.name.trim(),
      description: form.description.trim(),
      price: parseFloat(form.price),
      image: form.image.trim(),
      artisan: user.username,
      approved: false
    };

    onAdd(newProduct);

    setSuccess(true);
    setLoading(false);
    setForm({ name: '', description: '', price: '', image: '' });

    setTimeout(() => navigate('/artisan'), 1200);
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>🪵 Add New Craft Product</h2>

        {success && <p style={styles.success}>✅ Product added successfully!</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Product Name</label>
            <input
              placeholder="e.g., Handcrafted Wooden Vase"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              style={{
                ...styles.input,
                borderColor: errors.name ? '#dc3545' : '#ccc'
              }}
            />
            {errors.name && <p style={styles.error}>{errors.name}</p>}
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Description</label>
            <textarea
              placeholder="Describe your craft (max 200 chars)"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              maxLength={200}
              style={{
                ...styles.textarea,
                borderColor: errors.description ? '#dc3545' : '#ccc'
              }}
            />
            <div style={styles.counter}>{form.description.length}/200</div>
            {errors.description && <p style={styles.error}>{errors.description}</p>}
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Price (₹)</label>
            <input
              type="number"
              placeholder="Enter price in ₹"
              value={form.price}
              onChange={e => setForm({ ...form, price: e.target.value })}
              style={{
                ...styles.input,
                borderColor: errors.price ? '#dc3545' : '#ccc'
              }}
            />
            {errors.price && <p style={styles.error}>{errors.price}</p>}
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Image URL</label>
            <input
              placeholder="https://example.com/image.jpg"
              value={form.image}
              onChange={e => setForm({ ...form, image: e.target.value })}
              style={{
                ...styles.input,
                borderColor: errors.image ? '#dc3545' : '#ccc'
              }}
            />
            {form.image && (
              <div style={styles.previewContainer}>
                <img src={form.image} alt="Preview" style={styles.previewImage} />
              </div>
            )}
            {errors.image && <p style={styles.error}>{errors.image}</p>}
          </div>

          <button
            type="submit"
            style={{
              ...styles.button,
              backgroundColor: loading ? '#6c757d' : '#28a745',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    minHeight: '80vh',
    background: 'linear-gradient(180deg, #f6f1ed 0%, #fff 100%)',
    padding: '40px 20px'
  },

  card: {
    width: '100%',
    maxWidth: '460px',
    background: '#fff',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
    padding: '30px 35px',
    fontFamily: "'Inter', system-ui, sans-serif",
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },

  title: {
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: '700',
    color: '#3b2f2f',
    marginBottom: '20px'
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },

  field: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
  },

  label: {
    marginBottom: '6px',
    fontWeight: 600,
    color: '#444',
    fontSize: '14px'
  },

  input: {
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '15px',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
  },

  textarea: {
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '15px',
    minHeight: '90px',
    resize: 'none',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
  },

  counter: {
    fontSize: '12px',
    textAlign: 'right',
    color: '#888',
    marginTop: '4px',
  },

  error: {
    color: '#dc3545',
    fontSize: '13px',
    marginTop: '5px'
  },

  success: {
    color: '#28a745',
    textAlign: 'center',
    fontWeight: 600,
    marginBottom: '10px',
    animation: 'fadeIn 0.5s ease'
  },

  button: {
    padding: '12px',
    borderRadius: '8px',
    color: '#fff',
    border: 'none',
    fontSize: '16px',
    fontWeight: 600,
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  },

  previewContainer: {
    marginTop: '10px',
    textAlign: 'center'
  },

  previewImage: {
    width: '100%',
    maxHeight: '180px',
    objectFit: 'cover',
    borderRadius: '10px',
    border: '1px solid #eee',
  },
};

export default AddProductForm;
