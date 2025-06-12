import api from '../api/api';
import { Recipe } from '../models/Recipe';

/** Récupère toutes les recettes sous forme de Recipe[] */
export const getLatestRecipes = (): Promise<Recipe[]> =>
  api.get<Recipe[]>('/recipes').then(res => res.data);

/** Récupère une recette par ID */
export const getRecipeById = (id: number): Promise<Recipe> =>
  api.get<Recipe>(`/recipes/${id}`).then(res => res.data);

/** Recherche de recettes par mot-clé et renvoie directement Recipe[] */
export const searchRecipes = (query: string): Promise<Recipe[]> =>
  api
    .get<Recipe[]>('/recipes/search', { params: { query } })
    .then(res => res.data);

/** Crée une nouvelle recette et renvoie directement le Recipe créé */
export const createRecipe = (
  recipeData: Partial<Recipe> | FormData
): Promise<Recipe> =>
  api.post<Recipe>('/recipes', recipeData).then(res => res.data);

/** Met à jour une recette existante */
export const updateRecipe = (
  id: number,
  recipeData: Partial<Recipe> | FormData
): Promise<Recipe> =>
  api.put<Recipe>(`/recipes/${id}`, recipeData).then(res => res.data);

/** Supprime une recette */
export const deleteRecipe = (id: number): Promise<void> =>
  api.delete<void>(`/recipes/${id}`).then(res => res.data);

/** Suggère des recettes selon des ingrédients */
export const suggestRecipes = (ingredients: string[]): Promise<Recipe[]> =>
  api.post<Recipe[]>('/recipes/suggest', { ingredients }).then(res => res.data);

/** Génère la liste de courses pour une recette */
export const generateShoppingList = (recipeId: number): Promise<string[]> =>
  api.post<string[]>('/recipes/shopping-list', { recipeId }).then(res => res.data);
