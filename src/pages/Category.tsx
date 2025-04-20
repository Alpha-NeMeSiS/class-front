// ===== src/pages/Category.tsx =====
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';

const Category: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    api.get<Recipe[]>(`/categories/${slug}`)
      .then(res => setRecipes(res.data))
      .catch(err => console.error(err));
  }, [slug]);

  return (
    <div>
      <h1>Catégorie : {slug}</h1>
      <ul>{recipes.map(r => <li key={r.id}>{r.title}</li>)}</ul>
    </div>
  );
};

export default Category;