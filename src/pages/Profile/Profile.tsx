// src/pages/Profile/Profile.tsx
import React, { FC, useContext, useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import api from '../../api/api';
import styles from './Profile.module.scss';
import { Navigate } from 'react-router-dom';

const Profile: FC = () => {
  const { user, setUser, logout } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatarFile: null as File | null,
    // avatarPreview: user?.avatar || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setForm(prev => ({
        ...prev,
        name: user.name,
        email: user.email,
        // avatarPreview: user.avatar || '',
      }));
    }
  }, [user]);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setForm(prev => ({ ...prev, avatarFile: file, avatarPreview: URL.createObjectURL(file) }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const data = new FormData();
      data.append('name', form.name);
      data.append('email', form.email);
      if (form.avatarFile) data.append('avatar', form.avatarFile);
      const res = await api.put('/users/me', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setUser(res.data);
      setSuccess('Profil mis à jour avec succès');
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <Navigate to="/login" />;

  return (
    <div className={styles.container}>
      <h1>Mon profil</h1>
      {error && <div className={styles.error}>{error}</div>}
      {success && <div className={styles.success}>{success}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* <div className={styles.avatarSection}>
          {form.avatarPreview && (
            <img src={form.avatarPreview} alt="Avatar" className={styles.avatar} />
          )}
          <label className={styles.fileLabel}>
            Changer l'avatar
            <input type="file" accept="image/*" onChange={handleFile} />
          </label>
        </div> */}

        <label>
          Nom
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleInput}
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleInput}
            required
          />
        </label>

        <div className={styles.buttons}>
          <button type="submit" disabled={loading} className={styles.saveButton}>
            {loading ? 'Enregistrement...' : 'Enregistrer'}
          </button>
          <button type="button" onClick={logout} className={styles.logoutButton}>
            Déconnexion
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;