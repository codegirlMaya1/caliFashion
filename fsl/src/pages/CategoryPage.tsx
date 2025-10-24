import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import type { CartItem } from "../context/CartContext";
import useVoice from "../hooks/useVoice";
import ProductCard from "../components/ProductCard";
import addSound from "../assets/add.wav"; // Ensure this path is correct

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

  // Reset greeting when category changes
  useEffect(() => {
    setHasSpoken(false);
  }, [category]);

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

  // Initial voice greeting with 5-second pause
  useEffect(() => {
    if (!hasSpoken && products.length > 0) {
      const greetUser = async () => {
        await speak(`You're now viewing ${category}. Please say a product ID number to add it to your bag.`);
        setTimeout(() => {
          startListening();
        }, 5000); // 5-second pause before listening
      };
      greetUser();
      setHasSpoken(true);
    }
  }, [hasSpoken, products, category, speak, startListening]);

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

      // Play sound once
      const audio = new Audio(addSound);
      audio.play();

      // Wait for sound to finish and then speak
      setTimeout(() => {
        speak(`${matchedProduct.title} has been added to your cart.`);

        setTimeout(() => {
          speak(
            "You can add another item, say home to return to the category page, or say checkout if you're done here."
          );
          setHasAdded(false);
          startListening();
        }, 5000); // 5-second pause after confirmation
      }, 5000); // 5-second pause after sound
    }

    if (lower.includes("shop another")) {
      navigate(`/category/${category}`);
    } else if (lower.includes("home") || lower.includes("homepage")) {
      navigate("/");
    } else if (lower.includes("check out") || lower.includes("cart")) {
      navigate("/cart");
    }
  }, [transcript, hasAdded, products, category, navigate, addToCart, speak, startListening, stopListening]);

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