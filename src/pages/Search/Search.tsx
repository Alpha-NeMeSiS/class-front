// Search.tsx
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { searchRecipes } from '../../services/recipeService';
import { Recipe } from '../../models/Recipe';
import styles from './Search.module.scss';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Search: React.FC = () => {
  const query = useQuery();
  const q = query.get('q')?.trim() || '';
  const [results, setResults] = useState<Recipe[]>([]);

  useEffect(() => {
    if (!q) {
      setResults([]);
      return;
    }
    searchRecipes(q)
      .then(recipesArray => setResults(recipesArray))
      .catch(err => console.error('Erreur recherche :', err));
  }, [q]);

  return (
    <div className={styles.Search}>
      <header className={styles.header}>
        <h1>Résultats pour “{q}”</h1>
        {q === '' && <p>Saisissez un mot-clé pour rechercher des recettes.</p>}
      </header>

      <div className={styles.results}>
        {q && results.length === 0 && (
          <div className={styles.empty}>Aucune recette trouvée pour “{q}”.</div>
        )}

        {results.map(r => (
          <Link
            to={`/recipes/${r.recipeId}`}
            key={r.recipeId}
            className={styles.card}
          >
            {r.imageUrl && (
              <img
                src={`http://localhost:5148${r.imageUrl}`}
                alt={r.title}
                className={styles.cardImg}
              />
            )}
            <div className={styles.cardContent}>
              <h3>{r.title}</h3>
              {r.description && <p>{r.description}</p>}
              {/* Vous pouvez ajouter plus d'infos (ingrédients, temps, etc.) ici */}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Search;