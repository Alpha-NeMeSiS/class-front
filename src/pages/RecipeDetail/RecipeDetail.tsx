// src/pages/RecipeDetail/RecipeDetail.tsx
import React, { FC, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './RecipeDetail.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faClock, faUtensils, faLayerGroup, faFireAlt } from '@fortawesome/free-solid-svg-icons';
import { getRecipeById } from '../../services/recipeService';
import { Recipe, IngredientDTO, StepDTO } from '../../models/Recipe';


const RecipeDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('ID de recette manquant.');
      setLoading(false);
      return;
    }
    setLoading(true);
    getRecipeById(Number(id))
      .then(data => {
        // Déballage des $values si présent (Newtonsoft JSON)
        const ingredients: IngredientDTO[] = (data.ingredients as any)?.$values ?? data.ingredients;
        const steps: StepDTO[] = (data.steps as any)?.$values ?? data.steps;

        setRecipe({
          ...data,
          ingredients,
          steps,
        });
      })
      .catch(err => {
        console.error('Erreur chargement recette :', err);
        setError('Impossible de charger la recette.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className={styles.loading}>Chargement…</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!recipe) return <div className={styles.notFound}>Recette non trouvée.</div>;

  return (
    <div className={styles.detail}>
      <Link to="/my-recipes" className={styles.backButton}>
        <FontAwesomeIcon icon={faArrowLeft} className={styles.backIcon} />
        Retour aux recettes
      </Link>

      <h1 className={styles.title}>{recipe.title}</h1>

      {recipe.imageUrl && (
        <img
          src={`http://localhost:5148${recipe.imageUrl}`}
          alt={recipe.title}
          className={styles.image}
        />
      )}

      <div className={styles.meta}>
        <span><FontAwesomeIcon icon={faClock} /> Préparation: {recipe.preparationTime} min</span>
        <span><FontAwesomeIcon icon={faClock} /> Cuisson: {recipe.cookingTime} min</span>
        <span><FontAwesomeIcon icon={faUtensils} /> Portions: {recipe.servings}</span>
        <span><FontAwesomeIcon icon={faLayerGroup} /> Catégorie: {recipe.category}</span>
      </div>

      {typeof recipe.rating === 'number' && (
        <div className={styles.rating}>
          {[...Array(5)].map((_, i) => (
            <span key={i} className={i < recipe.rating ? styles.filled : ''}>★</span>
          ))}
        </div>
      )}

      {recipe.description && (
        <section className={styles.section}>
          <h2>Description</h2>
          <p>{recipe.description}</p>
        </section>
      )}

      {recipe.ingredients?.length > 0 && (
        <section className={styles.section}>
          <h2>Ingrédients</h2>
          <ul>
            {recipe.ingredients.map((ing, idx) => (
              <li key={idx}>
                {ing.name}
                {ing.unit ? ` — ${ing.unit}` : ''}
              </li>
            ))}
          </ul>
        </section>
      )}
      {recipe.steps?.length > 0 && (
        <section className={styles.section}>
          <h2>Préparation</h2>
          <ol>
            {recipe.steps
              .sort((a, b) => a.order - b.order)
              .map((step, idx) => (
                <li key={idx}>{step.description}</li>
              ))}
          </ol>
        </section>
      )}
    </div>
  );
};

export default RecipeDetail;
