// src/pages/Register/Register.tsx
import React, { FC, useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api/api';
import styles from './Register.module.scss';

const Register: FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (form.password !== form.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    setLoading(true);
    try {
      await api.post('/auth/sigin', {
        nom: form.name,
        prenom: form.surname,
        email: form.email,
        password: form.password,
      });

      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>Inscription</h1>
        {error && <div className={styles.error}>{error}</div>}

        <label>
          Nom
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Votre nom"
            required
          />
        </label>

        <label>
          Prenom
          <input
            type="text"
            name="surname"
            value={form.surname}
            onChange={handleChange}
            placeholder="Votre nom"
            required
          />
        </label>

        <label>
          Email <br />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="exemple@domaine.com"
            required
          />
        </label>

        <label>
          Mot de passe <br />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
          />
        </label>

        <label>
          Confirmer le mot de passe
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            required
          />
        </label>

        <button type="submit" disabled={loading} className={styles.submitButton}>
          {loading ? 'Inscription...' : 'S’inscrire'}
        </button>

        <p className={styles.links}>
          Déjà un compte ? <Link to="/login">Connexion</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;