import React from "react";
import { useCart } from "../context/CartContext";
import { Trash, Plus, Dash } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import type { CartItem } from "../context/CartContext"; // ✅ Type-only import

const CartPage: React.FC = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum: number, i: CartItem) => sum + i.price * i.quantity, 0);

  if (cart.length === 0)
    return (
      <div style={{ padding: "3rem", textAlign: "center" }}>
        <h4>Your bag is empty 🛍️</h4>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
          Back to Shopping
        </button>
      </div>
    );

  return (
    <div
      style={{
        padding: "3rem",
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #f9fafc, #eef2f9)",
      }}
    >
      <h3
        style={{
          marginBottom: "2rem",
          color: "#4c4ddc",
          fontWeight: 600,
          textAlign: "center",
        }}
      >
        Your Shopping Bag
      </h3>

      <div className="row">
        {cart.map((item: CartItem) => (
          <div key={item.id} className="col-md-4 mb-4">
            <div
              className="card h-100 shadow-sm"
              style={{
                border: "none",
                borderRadius: "12px",
                overflow: "hidden",
                transition: "transform 0.2s ease",
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{
                  height: "220px",
                  objectFit: "contain",
                  background: "#fff",
                  padding: "1rem",
                }}
              />
              <div className="card-body text-center">
                <h6 style={{ fontWeight: 600 }}>{item.title}</h6>
                <p style={{ marginBottom: "0.5rem" }}>
                  ${item.price.toFixed(2)} × {item.quantity}
                </p>

                <div
                  className="d-flex justify-content-center align-items-center mb-3"
                  style={{ gap: "0.75rem" }}
                >
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() =>
                      updateQuantity(item.id, Math.max(item.quantity - 1, 1))
                    }
                  >
                    <Dash size={14} />
                  </button>
                  <span
                    style={{
                      minWidth: "30px",
                      fontWeight: 600,
                      fontSize: "1rem",
                    }}
                  >
                    {item.quantity}
                  </span>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus size={14} />
                  </button>
                </div>

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

      <div
        style={{
          marginTop: "2rem",
          textAlign: "right",
          borderTop: "1px solid #ccc",
          paddingTop: "1rem",
        }}
      >
        <h5 style={{ color: "#333" }}>Total: ${total.toFixed(2)}</h5>
        <button className="btn btn-secondary me-2" onClick={clearCart}>
          Clear Bag
        </button>
        <button
          className="btn"
          style={{
            backgroundColor: "#4c4ddc",
            color: "white",
            fontWeight: 600,
            border: "none",
            borderRadius: "8px",
            padding: "0.6rem 1.4rem",
            boxShadow: "0 0 10px rgba(76, 77, 220, 0.6)",
            transition: "all 0.3s ease-in-out",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.boxShadow = "0 0 18px rgba(76, 77, 220, 0.9)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.boxShadow = "0 0 10px rgba(76, 77, 220, 0.6)")
          }
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;