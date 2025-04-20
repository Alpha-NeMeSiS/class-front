// ===== src/pages/ForgotPassword.tsx =====
import React, { useState } from 'react';
import api from '../api/api';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    api.post('/auth/forgot-password', { email })
      .then(res => console.log('Email sent', res.data))
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Mot de passe oublié</h1>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <button type="submit">Envoyer</button>
    </form>
  );
};

export default ForgotPassword;