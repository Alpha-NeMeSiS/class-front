// src/pages/ForgotPassword/ForgotPassword.tsx
import React, { FC, useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/api';
import styles from './ForgotPassword.module.scss';

const ForgotPassword: FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      await api.post('/auth/forgot-password', { email });
      setSuccess("Si cet e-mail existe, vous recevrez un lien pour réinitialiser votre mot de passe.");
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>Mot de passe oublié</h1>
        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}

        <label>
          Email
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            placeholder="exemple@domaine.com"
            required
          />
        </label>

        <button type="submit" disabled={loading} className={styles.submitButton}>
          {loading ? 'Envoi...' : 'Envoyer le lien'}
        </button>

        <p className={styles.links}>
          <Link to="/login">Retour à la connexion</Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;