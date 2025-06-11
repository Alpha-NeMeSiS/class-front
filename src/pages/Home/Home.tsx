// src/pages/Home/Home.tsx
import React, { FC, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Home.module.scss';
import { getLatestRecipes } from '../../services/recipeService';
import { Recipe } from '../../models/Recipe';

const Home: FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // Chargement des recettes “du moment”
  useEffect(() => {
    getLatestRecipes()
      .then(res => setRecipes(res.data))
      .catch(err => console.error('Erreur chargement recettes :', err));
  }, []);

  // Recherche rapide au clavier (Entrée)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className={styles.Home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Bienvenue sur KookBook</h1>
          <p>Accédez à des milliers de recettes, gérez vos favoris et partagez vos créations.</p>
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
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Trouvez une recette..."
            className={styles.searchInput}
          />
        </div>
      </section>

      {/* Latest Recipes Section */}
      <section className={styles.popular}>
        <h2>Recettes du moment</h2>
        <div className={styles.popularList}>
          {recipes.map(recipe => (
            <div key={recipe.id} className={styles.popularItem}>
              {/* Si ton API renvoie une image, adapte la propriété */}
              {'imageUrl' in recipe && (
                <img
                  src={(recipe as any).imageUrl}
                  alt={recipe.title}
                  className={styles.popularImg}
                />
              )}
              <h3>{recipe.title}</h3>
              <Link to={`/recipes/${recipe.id}`} className={styles.ctaButton}>
                Voir la recette
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
