// src/pages/EditRecipe/EditRecipe.tsx
import React, { FC, useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRecipeById, updateRecipe } from '../../services/recipeService';
import { Recipe } from '../../models/Recipe';
import styles from './EditRecipe.module.scss';

const categories = ['Entrées', 'Plats', 'Desserts', 'Végétarien', 'Rapide'];

const EditRecipe: FC = () => {
  const { id } = useParams<{ id: string }>();
  const recipeId = Number(id);
  const navigate = useNavigate();

  const [form, setForm] = useState<Partial<Recipe> & {
    imageFile?: File;
    ingredients: string[];
    etape: string[];
  }>({
    title: '',
    description: '',
    PreparationTime: 0,
    CookingTime: 0,
    servings: 1,
    category: categories[0],
    ingredients: [''],
    etape: [''],
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Charger et préremplir
  useEffect(() => {
    if (!recipeId) return;
    getRecipeById(recipeId)
      .then(res => {
        const r = res.data;
        setForm({
          title: r.title,
          description: (r as any).description ?? '',
          PreparationTime: (r as any).PreparationTime ?? 0,
          CookingTime: (r as any).CookingTime ?? 0,
          servings: (r as any).Servings ?? 1,
          category: (r as any).Category ?? categories[0],
          ingredients: r.ingredients,
          etape: r.etape,
        });
      })
      .catch(() => setError('Impossible de charger la recette'))
      .finally(() => setLoading(false));
  }, [recipeId]);

  const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: ['PreparationTime', 'CookingTime', 'servings'].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm(prev => ({ ...prev, imageFile: e.target.files![0] }));
    }
  };

  const updateArray = (field: 'ingredients' | 'etape', idx: number, value: string) => {
    setForm(prev => {
      const arr = [...(prev[field] || [])];
      arr[idx] = value;
      return { ...prev, [field]: arr };
    });
  };

  const addItem = (field: 'ingredients' | 'etape') => {
    setForm(prev => ({ ...prev, [field]: [...(prev[field] || []), ''] }));
  };

  const removeItem = (field: 'ingredients' | 'etape', idx: number) => {
    setForm(prev => ({
      ...prev,
      [field]: (prev[field] || []).filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const data = new FormData();
      // Champs simples
      data.append('title', form.title || '');
      data.append('description', form.description || '');
      data.append('PreparationTime', String(form.preparationTime));
      data.append('CookingTime', String(form.cookingTime));
      data.append('servings', String(form.servings));
      data.append('category', form.category || '');

      // Tableau ingrédients
      (form.ingredients || []).forEach(ing => data.append('ingredients', ing));
      (form.etape || []).forEach(step => data.append('etape', step));

      // Image si modifiée
      if (form.imageFile) {
        data.append('image', form.imageFile);
      }

      await updateRecipe(recipeId, data);
      navigate(`/recipes/${recipeId}`);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Erreur lors de la mise à jour');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Chargement de la recette...</p>;
  if (error)   return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.container}>
      <h1>Modifier la recette</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Titre & catégorie */}
        <div className={styles.row}>
          <label>
            Titre
            <input name="title" value={form.title} onChange={handleInput} required />
          </label>
          <label>
            Catégorie
            <select name="category" value={form.category} onChange={handleInput}>
              {categories.map(cat => <option key={cat}>{cat}</option>)}
            </select>
          </label>
        </div>

        {/* Description */}
        <label className={styles.fullWidth}>
          Description
          <textarea name="description" value={form.description} onChange={handleInput} rows={3} />
        </label>

        {/* Temps & portions */}
        <div className={styles.row}>
          <label>
            Prép. (min)
            <input type="number" name="PreparationTime" value={form.preparationTime} onChange={handleInput} min={0} />
          </label>
          <label>
            Cuiss. (min)
            <input type="number" name="CookingTime" value={form.cookingTime} onChange={handleInput} min={0} />
          </label>
          <label>
            Portions
            <input type="number" name="servings" value={form.servings} onChange={handleInput} min={1} />
          </label>
        </div>

        {/* Image */}
        <label className={styles.fullWidth}>
          Changer l’image
          <input type="file" onChange={handleFile} accept="image/*" />
        </label>

        {/* Ingrédients */}
        <fieldset className={styles.fieldset}>
          <legend>Ingrédients</legend>
          {(form.ingredients || []).map((ing, i) => (
            <div key={i} className={styles.arrayItem}>
              <input
                value={ing}
                onChange={e => updateArray('ingredients', i, e.target.value)}
                required
              />
              <button type="button" onClick={() => removeItem('ingredients', i)}>×</button>
            </div>
          ))}
          <button type="button" onClick={() => addItem('ingredients')}>+ Ajouter</button>
        </fieldset>

        {/* Étapes */}
        <fieldset className={styles.fieldset}>
          <legend>Étapes</legend>
          {(form.etape || []).map((step, i) => (
            <div key={i} className={styles.arrayItem}>
              <input
                value={step}
                onChange={e => updateArray('etape', i, e.target.value)}
                required
              />
              <button type="button" onClick={() => removeItem('etape', i)}>×</button>
            </div>
          ))}
          <button type="button" onClick={() => addItem('etape')}>+ Ajouter</button>
        </fieldset>

        <button type="submit" disabled={saving} className={styles.submitButton}>
          {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
        </button>
      </form>
    </div>
  );
};

export default EditRecipe;
