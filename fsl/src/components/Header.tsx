import React from 'react';
import { Bag, Search } from 'react-bootstrap-icons';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const { totalItems } = useCart();
  const navigate = useNavigate();

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        width: '100%',
        background: 'linear-gradient(90deg, #4c4ddc, #7df9ff)',
        color: 'white',
        padding: '0.8rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1000,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
      }}
    >
      <h3
        style={{
          margin: 0,
          fontWeight: 700,
          letterSpacing: '1px',
          fontSize: '1.4rem',
          cursor: 'pointer',
        }}
        onClick={() => navigate('/')}
      >
        Cali Fashion
      </h3>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <Search size={22} style={{ cursor: 'pointer' }} />
        <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => navigate('/cart')}>
          <Bag size={24} />
          {totalItems > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '-6px',
                right: '-10px',
                background: 'white',
                color: '#4c4ddc',
                borderRadius: '50%',
                padding: '2px 6px',
                fontSize: '0.7rem',
                fontWeight: 700,
              }}
            >
              {totalItems}
            </span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
