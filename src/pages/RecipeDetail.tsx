// src/pages/RecipeDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';
import { Recipe } from '../models/Recipe';  // ← import du type

const RecipeDetail: React.FC = () => {
  // on précise que useParams renvoie un objet { id: string }
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    api
      .get<Recipe>(`/recipes/${id}`)
      .then(res => {
        setRecipe(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Impossible de charger la recette');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Chargement…</p>;
  if (error)   return <p>{error}</p>;
  if (!recipe) return <p>Recette introuvable.</p>;

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      <h2>Ingrédients</h2>
      <ul>
        {recipe.ingredients.map((ing, i) => (
          <li key={i}>{ing}</li>
        ))}
      </ul>
      {/* … le reste de votre UI */}
    </div>
  );
};

export default RecipeDetail;
