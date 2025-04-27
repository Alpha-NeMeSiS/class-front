// src/pages/Favorites.tsx
import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Favorites.module.scss';

interface RecipeSummary {
  id: number;
  title: string;
  image: string;
}

// Données factices pour visualisation
const dummyFavorites: RecipeSummary[] = [
  { id: 201, title: 'Pâtes Carbonara', image: '/assets/recipes/carbonara.jpg' },
  { id: 202, title: 'Ratatouille', image: '/assets/recipes/ratatouille.jpg' },
  { id: 203, title: 'Quiche Lorraine', image: '/assets/recipes/quiche-lorraine.jpg' },
  { id: 204, title: 'Soufflé au fromage', image: '/assets/recipes/souffle-fromage.jpg' },
  { id: 205, title: 'Mousse au chocolat', image: '/assets/recipes/mousse-chocolat.jpg' },
];

const Favorites: FC = () => {
  const [favorites] = useState<RecipeSummary[]>(dummyFavorites);

  return (
    <div className={styles.Favorites}>
      <h1>Mes favoris</h1>
      {favorites.length === 0 ? (
        <p>
          Vous n’avez pas encore de favoris.&nbsp;
          <Link to="/search">Parcourez les recettes</Link>!
        </p>
      ) : (
        <div className={styles.grid}>
          {favorites.map((r) => (
            <Link key={r.id} to={`/recipes/${r.id}`} className={styles.card}>
              <img src={r.image} alt={r.title} className={styles.cover} />
              <h3>{r.title}</h3>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;