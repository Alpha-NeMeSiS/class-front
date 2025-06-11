// src/pages/RecipeDetail/RecipeDetail.tsx
import React, { FC, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './RecipeDetail.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { getRecipeById } from '../../services/recipeService';
import { Recipe } from '../../models/Recipe';

const RecipeDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getRecipeById(Number(id))
      .then(res => {
        setRecipe(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur chargement recette :', err);
        setError('Impossible de charger la recette.');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className={styles.loading}>Chargement…</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!recipe) {
    return <div className={styles.notFound}>Recette non trouvée.</div>;
  }

  return (
    <div className={styles.detail}>
      <Link to="/" className={styles.backButton}>
        <FontAwesomeIcon icon={faArrowLeft} className={styles.backIcon} />
        Retour à l’accueil
      </Link>

      <h1 className={styles.title}>{recipe.title}</h1>

      {recipe.imageUrl && (
        <img src={recipe.imageUrl} alt={recipe.title} className={styles.image} />
      )}

      {typeof recipe.rating === 'number' && (
        <div className={styles.rating}>
          {[...Array(5)].map((_, i) => (
            <span key={i} className={i < recipe.rating ? styles.filled : ''}>
              ★
            </span>
          ))}
        </div>
      )}

      {recipe.ingredients && recipe.ingredients.length > 0 && (
        <section className={styles.section}>
          <h2>Ingrédients</h2>
          <ul>
            {recipe.ingredients.map((ing, idx) => (
              <li key={idx}>{ing}</li>
            ))}
          </ul>
        </section>
      )}

      {recipe.etape && recipe.etape.length > 0 && (
        <section className={styles.section}>
          <h2>Préparation</h2>
          <ol>
            {recipe.etape.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </section>
      )}
    </div>
  );
};

export default RecipeDetail;
