import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { ArrowLeft } from 'react-bootstrap-icons';

interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
}

const CategoryPage: React.FC = () => {
  const { category } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/category/${category}`)
      .then(res => setProducts(res.data))
      .catch(console.error);
  }, [category]);

  return (
    <div style={{ padding: '2rem' }}>
      <button
        className="btn btn-outline-primary mb-3"
        onClick={() => navigate('/')}
      >
        <ArrowLeft /> Back to Home
      </button>
      <h2 style={{ textTransform: 'capitalize', marginBottom: '1rem' }}>{category}</h2>
      <div className="row">
        {products.map(p => (
          <div key={p.id} className="col-md-3 mb-4">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
