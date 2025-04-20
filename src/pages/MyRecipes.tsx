// ===== src/pages/MyRecipes.tsx =====
import React, { useEffect, useState } from 'react';
import api from '../api/api';

const MyRecipes: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    api.get<Recipe[]>('/users/me/recipes')
      .then(res => setRecipes(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Mes recettes</h1>
      <ul>{recipes.map(r => <li key={r.id}>{r.title}</li>)}</ul>
    </div>
  );
};

export default MyRecipes;