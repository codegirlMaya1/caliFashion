import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import type { CartItem } from "../context/CartContext";
import useVoice from "../hooks/useVoice";
import ProductCard from "../components/ProductCard";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

const CategoryPage: React.FC = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { transcript, speak, startListening, stopListening } = useVoice();

  const [products, setProducts] = useState<Product[]>([]);
  const [hasSpoken, setHasSpoken] = useState(false);
  const [hasAdded, setHasAdded] = useState(false);

  // Fetch products from FakeStoreAPI
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `https://fakestoreapi.com/products/category/${encodeURIComponent(category || "")}`
        );
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, [category]);

  // Initial voice greeting
  useEffect(() => {
    if (!hasSpoken && products.length > 0) {
      speak(`You're now viewing ${category}. Say the product ID to add it to your cart.`);
      startListening();
      setHasSpoken(true);
    }
  }, [hasSpoken, products]);

  // Voice command handler
  useEffect(() => {
    if (!transcript || hasAdded) return;

    const lower = transcript.toLowerCase();
    const spokenId = parseInt(lower.match(/\d+/)?.[0] || "", 10);

    const matchedProduct = products.find((p) => p.id === spokenId);

    if (matchedProduct) {
      const itemToAdd: CartItem = {
        id: matchedProduct.id,
        title: matchedProduct.title,
        price: matchedProduct.price,
        image: matchedProduct.image,
        quantity: 1,
      };

      addToCart(itemToAdd);
      setHasAdded(true);
      stopListening();
      speak(`${matchedProduct.title} has been added to your cart.`);

      setTimeout(() => {
        speak(
          "Would you like to shop another item, say home or homepage to return to the category page, or check out?"
        );
        setHasAdded(false);
        startListening();
      }, 3000);
    }

    if (lower.includes("shop another")) {
      navigate(`/category/${category}`);
    } else if (lower.includes("home") || lower.includes("homepage")) {
      navigate("/");
    } else if (lower.includes("check out") || lower.includes("cart")) {
      navigate("/cart");
    }
  }, [transcript, hasAdded, products, category, navigate]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ marginBottom: "2rem", color: "#4c4ddc" }}>{category?.toUpperCase()}</h2>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;