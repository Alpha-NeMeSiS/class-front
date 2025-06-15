import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { searchRecipes } from '../services/recipeService';
import { Recipe } from '../models/Recipe';

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
    <div>
      <h1>Résultats pour “{q}”</h1>

      {q === '' ? (
        <p>Saisissez un mot-clé pour rechercher des recettes.</p>
      ) : results.length === 0 ? (
        <p>Aucune recette trouvée pour “{q}”.</p>
      ) : (
        <ul>
          {results.map(r => (
            <li key={r.recipeId}>
              <Link to={`/recipes/${r.recipeId}`}>{r.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
