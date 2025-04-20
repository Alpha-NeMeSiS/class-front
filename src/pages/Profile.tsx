// ===== src/pages/Profile.tsx =====
import React, { useEffect, useState } from 'react';
import api from '../api/api';

const Profile: React.FC = () => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    api.get<{ name: string; email: string }>('/users/me')
      .then(res => setUser(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!user) return <div>Chargement...</div>;

  return (
    <div>
      <h1>Profil de {user.name}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default Profile;