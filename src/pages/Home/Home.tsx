// src/pages/Home/Home.tsx
import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.scss';

interface Recipe {
  id: number;
  name: string;
  image: string;
  rating: number;
}

// interface Category {
//   id: number;
//   name: string;
//   icon: string;
//   slug: string;
// }

// Données factices; à remplacer par fetch/API
const popularRecipes: Recipe[] = [
  { id: 1, name: 'Tarte aux pommes', image: '/assets/popular1.jpg', rating: 5 },
  { id: 2, name: 'Poulet rôti', image: '/assets/popular2.jpg', rating: 4 },
  { id: 3, name: 'Lasagnes végétariennes', image: '/assets/popular3.jpg', rating: 5 },
  { id: 4, name: 'Salade César', image: '/assets/popular4.jpg', rating: 4 },
  { id: 5, name: 'Brownie au chocolat', image: '/assets/popular5.jpg', rating: 5 },
];

// const categoriesList: Category[] = [
//   { id: 1, name: 'Entrées', icon: '/assets/category-entrees.png', slug: 'entrees' },
//   { id: 2, name: 'Plats', icon: '/assets/category-plats.png', slug: 'plats' },
//   { id: 3, name: 'Desserts', icon: '/assets/category-desserts.png', slug: 'desserts' },
//   { id: 4, name: 'Végétarien', icon: '/assets/category-vegetarien.png', slug: 'vegetarien' },
//   { id: 5, name: 'Rapide', icon: '/assets/category-rapide.png', slug: 'rapide' },
// ];

const suggestions = ['Poulet', 'Vegan', '30 minutes'];

const Home: FC = () => {
  const [query, setQuery] = useState('');
  return (
    <div className={styles.Home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Découvrez l’API de Recettes Ultime</h1>
          <p>Accédez à des milliers de recettes, gérez vos favoris et partagez vos créations en quelques minutes.</p>
          <Link to="/register" className={styles.ctaButton}>
            Créer un compte gratuitement
          </Link>
        </div>
        <div className={styles.heroImage} />
      </section>

      {/* Quick Search Section */}
      <section className={styles.searchSection}>
        <h2>Recherche rapide</h2>
        <div className={styles.searchWrapper}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Trouvez une recette..."
            className={styles.searchInput}
          />
        </div>
      </section>

      {/* Popular Recipes Section */}
      <section className={styles.popular}
      >
        <h2>Top 5 des recettes populaires</h2>
        <div className={styles.popularList}>
          {popularRecipes.map((recipe) => (
            <div key={recipe.id} className={styles.popularItem}>
              <img src={recipe.image} alt={recipe.name} />
              <h3>{recipe.name}</h3>
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < recipe.rating ? styles.filled : ''}>
                    ★
                  </span>
                ))}
                {/* on passe l’id dans l’URL */}
                <Link to={`/recipes/${recipe.id}`} className={styles.ctaButton}>
                  Voir Plus
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;