import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useParams,
} from 'react-router-dom';

import 'font-awesome/css/font-awesome.min.css';
import Header from './components/Header';
import HomePage from './pages/Homepage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProductDetail from './pages/ProductDetail';
import ArtisanDashBoard from './DashBoards/ArtisanDashBoard';
import ConsultantDashBoard from './DashBoards/ConsultantDashBoard';
import AdminDashBoard from './DashBoards/AdminDashBoard';
import AddProductForm from './components/AddProductForm';

import './assets/styles/App.css';
import './assets/styles/global.css';

// --------------------- INITIAL DATA ---------------------
const initialUsers = [
  { username: 'artisan1', password: 'pass', role: 'artisan' },
  { username: 'customer1', password: 'pass', role: 'customer' },
  { username: 'consultant1', password: 'pass', role: 'consultant' },
  { username: 'admin1', password: 'pass', role: 'admin' },
];

const initialProducts = [
  {
    id: 'p1',
    name: 'Handcrafted Rosewood Jewelry Box',
    description: 'Beautiful handcrafted jewelry box made from premium rosewood.',
    price: 850,
    image: 'Box.jpeg', // Images should be referenced relative to /public/images/
    artisan: 'artisan1',
    approved: true,
  },
  {
    id: 'p2',
    name: 'Traditional Carved Wooden Elephant',
    description: 'A stunning wooden elephant statue showcasing fine tribal craftsmanship.',
    price: 1000,
    image: 'elephant.jpeg',
    artisan: 'artisan1',
    approved: true,
  },
  {
    id: 'p3',
    name: 'Teak Wood Wall Hanging',
    description: 'Elegant wall hanging carved from durable teak wood with tribal designs.',
    price: 1200,
    image: 'Wall.jpeg',
    artisan: 'artisan1',
    approved: true,
  },
];

// --------------------- PRODUCT DETAIL WRAPPER ---------------------
function ProductDetailWrapper({ products, currentUser }) {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h3>Product not found 🪵</h3>
        <p>The product may have been removed or is unavailable.</p>
        <button onClick={() => window.history.back()}>← Go Back</button>
      </div>
    );
  }

  return <ProductDetail product={product} currentUser={currentUser} />;
}

// --------------------- PROTECTED ROUTE ---------------------
const ProtectedRoute = ({ user, role, children }) => {
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;
  return children;
};

// --------------------- MAIN APP ---------------------
function App() {
  const [users, setUsers] = useState(initialUsers);
  const [products, setProducts] = useState(initialProducts);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
    setLoading(false);
  }, []);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  const registerUser = (user) => {
    setUsers((prev) => {
      if (prev.find((u) => u.username === user.username)) return prev;
      return [...prev, user];
    });
    return true;
  };

  const loginUser = (username, password) => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      setCurrentUser(user);
      return user;
    }
    return false;
  };

  const logoutUser = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const addProduct = (product) => setProducts((prev) => [...prev, product]);
  const approveProduct = (id) =>
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, approved: true } : p))
    );

  if (loading)
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
        <p>Loading your experience...</p>
      </div>
    );

  return (
    <Router>
      <Header currentUser={currentUser} onLogout={logoutUser} />
      <Routes>
        <Route path="/" element={<HomePage products={products} />} />
        <Route
          path="/register"
          element={<RegisterPage users={users} onRegister={registerUser} />}
        />
        <Route path="/login" element={<LoginPage onLogin={loginUser} />} />
        <Route
          path="/product/:id"
          element={<ProductDetailWrapper products={products} currentUser={currentUser} />}
        />

        <Route
          path="/artisan"
          element={
            <ProtectedRoute user={currentUser} role="artisan">
              <ArtisanDashBoard products={products} currentUser={currentUser} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/consultant"
          element={
            <ProtectedRoute user={currentUser} role="consultant">
              <ConsultantDashBoard products={products} onApprove={approveProduct} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute user={currentUser} role="admin">
              <AdminDashBoard users={users} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-product"
          element={
            <ProtectedRoute user={currentUser}>
              <AddProductForm onAdd={addProduct} user={currentUser} />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
