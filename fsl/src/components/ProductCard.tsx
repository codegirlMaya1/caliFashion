import React from "react";
import { useCart } from "../context/CartContext";
import type { CartItem } from "../context/CartContext";

interface Props {
  product: {
    id: number;
    title: string;
    image: string;
    price: number;
  };
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const itemToAdd: CartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    };
    addToCart(itemToAdd);
  };

  return (
    <div className="card h-100" style={{ textAlign: "center" }}>
      <img
        src={product.image}
        className="card-img-top p-3"
        alt={product.title}
        style={{ height: "220px", objectFit: "contain" }}
      />
      <div className="card-body">
        <h6 className="card-title">{product.title}</h6>
        <p className="card-text text-muted">${product.price.toFixed(2)}</p>
        <p className="text-secondary" style={{ fontSize: "0.85rem" }}>
          🆔 <strong>Product ID:</strong> {product.id}
        </p>
        <button className="btn btn-outline-primary btn-sm" onClick={handleAddToCart}>
          Add to Bag
        </button>
      </div>
    </div>
  );
};

export default ProductCard;