import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/cards.module.css';

interface Props {
  category: string;
  image: string;
}

const CategoryCard: React.FC<Props> = ({ category, image }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.card} onClick={() => navigate(`/category/${category}`)}>
      <img src={image} alt={category} className={styles.image} />
      <h3 className={styles.title}>{category.toUpperCase()}</h3>
    </div>
  );
};

export default CategoryCard;
