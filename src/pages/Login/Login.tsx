// src/pages/Login/Login.tsx
import React, { FC, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/useAuth';  
import styles from './Login.module.scss';

const Login: FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();    // ← on utilise login() du contexte
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Appel à login() : c'est lui qui fait POST, stocke token, setUser, etc.
      await login(email.trim(), password);
      // si ça réussit, user n'est plus null => on peut rediriger
      navigate('/');
    } catch (err: any) {
      // Affiche l'erreur renvoyée par l'API ou un message générique
      const msg = err.response?.data?.message || err.message || 'Une erreur est survenue';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <h1 className={styles.title}>Connexion</h1>
        {error && <div className={styles.error}>{error}</div>}

        <label htmlFor="email" className={styles.field}>
          Email
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="exemple@domaine.com"
            disabled={loading}
            required
          />
        </label>

        <label htmlFor="password" className={styles.field}>
          Mot de passe
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            disabled={loading}
            required
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className={styles.submitButton}
        >
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>

        <p className={styles.links}>
          Pas encore de compte ? <Link to="/register">Inscription</Link><br />
          <Link to="/forgot-password">Mot de passe oublié ?</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
