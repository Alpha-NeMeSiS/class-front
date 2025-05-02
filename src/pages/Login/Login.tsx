// src/pages/Login/Login.tsx
import React, { FC, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api/api';
import styles from './Login.module.scss';

const Login: FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await api.post('/auth/login', { email, password });
      // TODO: stocker le token et user
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>Connexion</h1>
        {error && <div className={styles.error}>{error}</div>}

        <label>
          Email
          <input
            type="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="exemple@domaine.com"
            required
          />
        </label>

        <label>
          Mot de passe
          <input
            type="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </label>

        <button type="submit" disabled={loading} className={styles.submitButton}>
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