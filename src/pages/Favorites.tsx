// ===== src/pages/Favorites.tsx =====
import React, { useEffect, useState } from 'react';
import api from '../api/api';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Recipe[]>([]);

  useEffect(() => {
    api.get<Recipe[]>('/users/me/favorites')
      .then(res => setFavorites(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Recettes favorites</h1>
      <ul>{favorites.map(r => <li key={r.id}>{r.title}</li>)}</ul>
    </div>
  );
};

export default Favorites;
