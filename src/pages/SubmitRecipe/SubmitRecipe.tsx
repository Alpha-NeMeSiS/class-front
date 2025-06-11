// src/pages/SubmitRecipe/SubmitRecipe.tsx
import React, { FC, useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRecipe } from '../../services/recipeService';
import styles from './SubmitRecipe.module.scss';

interface NewRecipe {
  title: string;
  description: string;
  image: File | null;
  prepTime: number;
  cookTime: number;
  servings: number;
  category: string;
  ingredients: string[];
  instructions: string[];
}

const categories = ['Entrées', 'Plats', 'Desserts', 'Végétarien', 'Rapide'];

const SubmitRecipe: FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<NewRecipe>({
    title: '',
    description: '',
    image: null,
    prepTime: 0,
    cookTime: 0,
    servings: 1,
    category: categories[0],
    ingredients: [''],
    instructions: [''],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: ['prepTime', 'cookTime', 'servings'].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setForm(prev => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const updateArray = (field: 'ingredients' | 'instructions', idx: number, value: string) => {
    setForm(prev => {
      const arr = [...prev[field]];
      arr[idx] = value;
      return { ...prev, [field]: arr };
    });
  };

  const addItem = (field: 'ingredients' | 'instructions') => {
    setForm(prev => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const removeItem = (field: 'ingredients' | 'instructions', idx: number) => {
    setForm(prev => ({ ...prev, [field]: prev[field].filter((_, i) => i !== idx) }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, val]) => {
        if (key === 'image' && val) {
          data.append('image', val as File);
        } else if (Array.isArray(val)) {
          // envoie chaque élément du tableau séparément
          (val as string[]).forEach(item => data.append(key, item));
        } else {
          data.append(key, String(val));
        }
      });

      // Utilisation du service createRecipe
      const res = await createRecipe(data);

      // Redirection vers le détail de la recette créée
      navigate(`/recipes/${res.data.id}`);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Erreur lors de la soumission');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Ajouter une recette</h1>
      {error && <div className={styles.error}>{error}</div>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.row}>
          <label>
            Titre
            <input type="text" name="title" value={form.title} onChange={handleInput} required />
          </label>
          <label>
            Catégorie
            <select name="category" value={form.category} onChange={handleInput}>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </label>
        </div>

        <label className={styles.fullWidth}>
          Description
          <textarea name="description" value={form.description} onChange={handleInput} rows={3} />
        </label>

        <div className={styles.row}>
          <label>
            Préparation (min)
            <input type="number" name="prepTime" value={form.prepTime} onChange={handleInput} min={0} />
          </label>
          <label>
            Cuisson (min)
            <input type="number" name="cookTime" value={form.cookTime} onChange={handleInput} min={0} />
          </label>
          <label>
            Portions
            <input type="number" name="servings" value={form.servings} onChange={handleInput} min={1} />
          </label>
        </div>

        <label className={styles.fullWidth}>
          Image
          <input type="file" name="image" accept="image/*" onChange={handleFile} />
          {form.image && (
            <img
              className={styles.preview}
              src={URL.createObjectURL(form.image)}
              alt="Prévisualisation"
            />
          )}
        </label>

        <fieldset className={styles.fieldset}>
          <legend>Ingrédients</legend>
          {form.ingredients.map((ing, i) => (
            <div key={i} className={styles.arrayItem}>
              <input
                type="text"
                value={ing}
                onChange={e => updateArray('ingredients', i, e.target.value)}
                placeholder="Ingrédient"
                required
              />
              <button type="button" onClick={() => removeItem('ingredients', i)}>×</button>
            </div>
          ))}
          <button type="button" className={styles.addButton} onClick={() => addItem('ingredients')}>
            + Ajouter ingrédient
          </button>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend>Étapes</legend>
          {form.instructions.map((step, i) => (
            <div key={i} className={styles.arrayItem}>
              <input
                type="text"
                value={step}
                onChange={e => updateArray('instructions', i, e.target.value)}
                placeholder="Étape"
                required
              />
              <button type="button" onClick={() => removeItem('instructions', i)}>×</button>
            </div>
          ))}
          <button type="button" className={styles.addButton} onClick={() => addItem('instructions')}>
            + Ajouter étape
          </button>
        </fieldset>

        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? 'Envoi...' : 'Envoyer la recette'}
        </button>
      </form>
    </div>
  );
};

export default SubmitRecipe;