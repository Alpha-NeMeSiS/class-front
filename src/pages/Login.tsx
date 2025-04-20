// ===== src/pages/Login.tsx =====
import React, { useState } from 'react';
import api from '../api/api';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    api.post('/auth/login', { email, password })
      .then(res => console.log('Logged in', res.data))
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Connexion</h1>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Se connecter</button>
    </form>
  );
};

export default Login;