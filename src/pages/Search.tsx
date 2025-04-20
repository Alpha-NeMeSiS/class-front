// ===== src/pages/Search.tsx =====
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api/api';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Search: React.FC = () => {
  const query = useQuery();
  const [results, setResults] = useState<Recipe[]>([]);

  useEffect(() => {
    const q = query.get('q') || '';
    api.get<Recipe[]>(`/recipes/search?q=${q}`)
      .then(res => setResults(res.data))
      .catch(err => console.error(err));
  }, [query]);

  return (
    <div>
      <h1>Résultats pour "{query.get('q')}"</h1>
      <ul>
        {results.map(r => (<li key={r.id}>{r.title}</li>))}
      </ul>
    </div>
  );
};

export default Search;