import React, { FC, useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRecipe } from '../../services/recipeService';
import { useAuth } from '../../contexts/useAuth';
import styles from './SubmitRecipe.module.scss';
import { Recipe } from '../../models/Recipe';

interface IngredientItem {
  name: string;
  unit: string;
}
interface NewRecipe {
  title: string;
  description: string;
  image: File | null;
  prepTime: number;
  cookTime: number;
  servings: number;
  category: string;
  ingredients: IngredientItem[];
  instructions: string[];
}

const categories = ['Entrées', 'Plats', 'Desserts', 'Végétarien', 'Rapide'];

const SubmitRecipe: FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [form, setForm] = useState<NewRecipe>({
    title: '',
    description: '',
    image: null,
    prepTime: 0,
    cookTime: 0,
    servings: 1,
    category: categories[0],
    ingredients: [{ name: '', unit: '' }],
    instructions: [''],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // champs scalaires
  const handleInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: ['prepTime', 'cookTime', 'servings'].includes(name)
        ? Number(value)
        : value,
    }));
  };

  // fichier image
  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setForm(prev => ({ ...prev, image: e.target.files![0] }));
    }
  };

  // nom d'un ingrédient
  const updateIngredientName = (idx: number, value: string) => {
    setForm(prev => {
      const arr = [...prev.ingredients];
      arr[idx].name = value;
      return { ...prev, ingredients: arr };
    });
  };

  // unité d'un ingrédient
  const updateIngredientUnit = (idx: number, value: string) => {
    setForm(prev => {
      const arr = [...prev.ingredients];
      arr[idx].unit = value;
      return { ...prev, ingredients: arr };
    });
  };

  // ajouter / supprimer ingrédients
  const addIngredient = () =>
    setForm(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: '', unit: '' }],
    }));
  const removeIngredient = (idx: number) =>
    setForm(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== idx),
    }));

  // étapes (inchangé)
  const updateStep = (idx: number, value: string) => {
    setForm(prev => {
      const arr = [...prev.instructions];
      arr[idx] = value;
      return { ...prev, instructions: arr };
    });
  };
  const addStep = () =>
    setForm(prev => ({ ...prev, instructions: [...prev.instructions, ''] }));
  const removeStep = (idx: number) =>
    setForm(prev => ({
      ...prev,
      instructions: prev.instructions.filter((_, i) => i !== idx),
    }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // console.log('🌿 Ingredients to send:', form.ingredients);
    // console.log('🔢 Instructions to send:', form.instructions);

    setLoading(true);
    setError(null);

    try {
      const data = new FormData();
      data.append('title', form.title);
      data.append('description', form.description);
      data.append('category', form.category);
      data.append('preparationTime', form.prepTime.toString());
      data.append('cookingTime', form.cookTime.toString());
      data.append('servings', form.servings.toString());
      if (form.image) {
        data.append('image', form.image, form.image.name);
      }

      // on envoie deux tableaux de même longueur
      form.ingredients.forEach(({ name, unit }) => {
        data.append('ingredients', name);
        data.append('ingredientUnits', unit);
      });
      form.instructions.forEach(s => data.append('instructions', s));

      if (user?.id) {
        data.append('userId', user.id);
      }

      // for (let pair of data.entries()) {
      //   console.log('📦 FormData entry:', pair[0], '→', pair[1]);
      // }

      await createRecipe(data).then((created: Recipe) => {
        navigate(`/my-recipes/`);
      });
    } catch (err: any) {
      console.error(err.response?.data);
      setError(
        err.response?.data?.errors
          ? Object.values(err.response.data.errors).flat().join(' • ')
          : err.response?.data?.message || 'Erreur lors de la soumission'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Ajouter une recette</h1>
      {error && <div className={styles.error}>{error}</div>}
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Titre + Catégorie */}
        <div className={styles.row}>
          <label>
            Titre
            <input
              name="title"
              type="text"
              value={form.title}
              onChange={handleInput}
              required
            />
          </label>
          <label>
            Catégorie
            <select
              name="category"
              value={form.category}
              onChange={handleInput}
            >
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>
        </div>

        {/* Description */}
        <label className={styles.fullWidth}>
          Description
          <textarea
            name="description"
            rows={3}
            value={form.description}
            onChange={handleInput}
          />
        </label>

        {/* Durées & portions */}
        <div className={styles.row}>
          <label>
            Préparation (min)
            <input name="prepTime" type="number" min={0}
              value={form.prepTime} onChange={handleInput} />
          </label>
          <label>
            Cuisson (min)
            <input name="cookTime" type="number" min={0}
              value={form.cookTime} onChange={handleInput} />
          </label>
          <label>
            Portions
            <input name="servings" type="number" min={1}
              value={form.servings} onChange={handleInput} />
          </label>
        </div>

        {/* Image */}
        <label className={styles.fullWidth}>
          Image
          <input type="file" accept="image/*" onChange={handleFile} />
          {form.image && (
            <img
              className={styles.preview}
              src={URL.createObjectURL(form.image)}
              alt="Prévisualisation"
            />
          )}
        </label>

        {/* Ingrédients */}
        <fieldset className={styles.fieldset}>
          <legend>Ingrédients</legend>
          {form.ingredients.map((ing, i) => (
            <div key={i} className={styles.arrayItem}>
              <input
                type="text"
                placeholder="Nom"
                value={ing.name}
                onChange={e => updateIngredientName(i, e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Quantitée (g, ml…)"
                value={ing.unit}
                onChange={e => updateIngredientUnit(i, e.target.value)}
              />
              <button type="button" onClick={() => removeIngredient(i)}>
                ×
              </button>
            </div>
          ))}
          <button type="button" className={styles.addButton} onClick={addIngredient}>
            + Ajouter ingrédient
          </button>
        </fieldset>

        {/* Étapes */}
        <fieldset className={styles.fieldset}>
          <legend>Étapes</legend>
          {form.instructions.map((step, i) => (
            <div key={i} className={styles.arrayItem}>
              <input
                type="text"
                placeholder="Étape"
                value={step}
                onChange={e => updateStep(i, e.target.value)}
                required
              />
              <button type="button" onClick={() => removeStep(i)}>
                ×
              </button>
            </div>
          ))}
          <button type="button" className={styles.addButton} onClick={addStep}>
            + Ajouter étape
          </button>
        </fieldset>

        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? 'Envoi…' : 'Envoyer la recette'}
        </button>
      </form>
    </div>
  );
};

export default SubmitRecipe;