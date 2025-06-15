// src/pages/MyRecipes/MyRecipes.tsx
import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/api';
import styles from './MyRecipes.module.scss';

interface RecipeSummary {
  recipeId: number;
  title: string;
  imageUrl: string;
}

const MyRecipes: FC = () => {
  const [recipes, setRecipes] = useState<RecipeSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<RecipeSummary[]>('/recipes/me')
      .then(res => {
        // si le back a enveloppé la liste dans { $id, $values: […] }
        const raw = (res.data as any).$values ?? res.data;
        setRecipes(raw);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className={styles.loader}>Chargement de vos recettes...</div>;
  if (error) return <div className={styles.error}>Erreur : {error}</div>;

  return (
    <div className={styles.MyRecipes}>
      <h1>Mes recettes</h1>
      {recipes.length === 0 ? (
        <p>
          Vous n’avez pas encore ajouté de recette.&nbsp;
          <Link to="/submit">Ajoutez-en une&nbsp;!</Link>
        </p>
      ) : (
        <div className={styles.grid}>
          {recipes.map(r => (
            <Link key={r.recipeId} to={`/recipes/${r.recipeId}`} className={styles.card}>
              <img
                src={`http://localhost:5148${r.imageUrl}`}
                alt={r.title}
                className={styles.cover}
              />
              <h3>{r.title}</h3>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRecipes;
