import React from 'react';
import { useCart } from '../context/CartContext';
import { Trash } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  if (cart.length === 0)
    return (
      <div style={{ padding: '3rem', textAlign: 'center' }}>
        <h4>Your bag is empty 🛍️</h4>
        <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>
          Back to Shopping
        </button>
      </div>
    );

  return (
    <div style={{ padding: '3rem' }}>
      <h3 style={{ marginBottom: '2rem' }}>Your Shopping Bag</h3>

      <div className="row">
        {cart.map((item) => (
          <div key={item.id} className="col-md-4 mb-4">
            <div className="card h-100 p-3">
              <img
                src={item.image}
                alt={item.title}
                style={{ height: '200px', objectFit: 'contain' }}
              />
              <div className="card-body">
                <h6>{item.title}</h6>
                <p>${item.price.toFixed(2)} × {item.quantity}</p>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash size={16} /> Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'right' }}>
        <h5>Total: ${total.toFixed(2)}</h5>
        <button className="btn btn-secondary me-2" onClick={clearCart}>
          Clear Bag
        </button>
        <button className="btn btn-success">Checkout</button>
      </div>
    </div>
  );
};

export default CartPage;
