import React from 'react';
import CategoryCard from '../components/CategoryCard';
import mensCatalog from '../assets/mens-catalog.png'; // ✅ your image

const categories = [
  { name: 'electronics', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8' },
  { name: 'jewelery', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30' },
  { name: "men's clothing", image: mensCatalog },
  { name: "women's clothing", image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c' },
];

const HomePage: React.FC = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to bottom right, #f8f9fc, #eef2f9)',
        overflowX: 'hidden',
      }}
    >
      <h5
        style={{
          color: '#333',
          fontWeight: 500,
          marginTop: '2rem',
          marginBottom: '2.5rem',
          textAlign: 'center',
          fontSize: '1.1rem',
        }}
      >
        Thanks for choosing <span style={{ color: '#4c4ddc', fontWeight: 600 }}>Cali Fashion</span> — please click a
        category card to get started.
      </h5>

      {/* ✅ Full-width flex layout with responsive wrapping */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '2rem',
          width: '100%',
          padding: '0 3rem 4rem',
          boxSizing: 'border-box',
        }}
      >
        {categories.map((c) => (
          <CategoryCard key={c.name} category={c.name} image={c.image} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
