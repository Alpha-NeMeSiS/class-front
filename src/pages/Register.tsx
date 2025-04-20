// ===== src/pages/Register.tsx =====
import React, { useState } from 'react';
import api from '../api/api';

const Register: React.FC = () => {
  const [form, setForm] = useState<{ name: string; email: string; password: string }>({ name: '', email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    api.post('/auth/register', form)
      .then(res => console.log('Registered', res.data))
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Inscription</h1>
      <input name="name" placeholder="Nom" value={form.name} onChange={handleChange} required />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="password" type="password" placeholder="Mot de passe" value={form.password} onChange={handleChange} required />
      <button type="submit">S’inscrire</button>
    </form>
  );
};

export default Register;