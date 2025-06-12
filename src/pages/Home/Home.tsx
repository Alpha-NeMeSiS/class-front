import React, { FC, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Home.module.scss';
import { getLatestRecipes } from '../../services/recipeService';
import { Recipe } from '../../models/Recipe';

const Home: FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getLatestRecipes()
      .then(recipesArray => {
        console.log('recipesArray:', recipesArray);
        setRecipes(recipesArray);
      })
      .catch(err => console.error('Erreur chargement recettes :', err));
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    
    <div className={styles.Home}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Bienvenue sur KookBook</h1>
          <p>Une API pensée pour les gourmets : gérez, créez et savourez vos recettes en toute simplicité.</p>
          <Link to="/register" className={styles.signupButton}>
            Créer votre compte gratuitement
          </Link>

        </div>
      </section>

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Rechercher une recette..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className={styles.searchInput}
        />
      </div>

      <section className={styles.popular}>
        <br />
        <h2>Recettes du moment</h2>
        <div className={styles.popularList}>
          {recipes.length > 0 ? (
            recipes.map(recipe => (
              <div key={recipe.id} className={styles.popularItem}>
                {recipe.imageUrl && (
                  <img
                    src={recipe.imageUrl}
                    alt={recipe.title}
                    className={styles.popularImg}
                  />
                )}
                <h3>{recipe.title}</h3>
                <Link to={`/recipes/${recipe.id}`} className={styles.ctaButton}>
                  Voir la recette
                </Link>
              </div>
            ))
          ) : (
            <p>Aucune recette à afficher.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
