// ===== src/pages/RecipeDetail.tsx =====
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    api.get<Recipe>(`/recipes/${id}`)
      .then(res => setRecipe(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!recipe) return <div>Chargement...</div>;

  return (
    <div>
      <h1>{recipe.title}</h1>
      {recipe.image && <img src={recipe.image} alt={recipe.title} />}
      <h2>Ingrédients</h2>
      <ul>{recipe.ingredients?.map((i, idx) => <li key={idx}>{i}</li>)}</ul>
      <h2>Étapes</h2>
      <ol>{recipe.steps?.map((s, idx) => <li key={idx}>{s}</li>)}</ol>
    </div>
  );
};

export default RecipeDetail;