// ===== src/pages/SubmitRecipe.tsx =====
import React, { useState } from 'react';
import api from '../api/api';

const SubmitRecipe: React.FC = () => {
  const [form, setForm] = useState<{ title: string; ingredients: string; steps: string }>({ title: '', ingredients: '', steps: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    api.post('/recipes', form)
      .then(res => console.log('Submitted', res.data))
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Soumettre une recette</h1>
      <input name="title" placeholder="Titre" value={form.title} onChange={handleChange} required />
      <textarea name="ingredients" placeholder="Ingrédients séparés par des virgules" value={form.ingredients} onChange={handleChange} required />
      <textarea name="steps" placeholder="Étapes séparées par des virgules" value={form.steps} onChange={handleChange} required />
      <button type="submit">Envoyer</button>
    </form>
  );
};

export default SubmitRecipe;
