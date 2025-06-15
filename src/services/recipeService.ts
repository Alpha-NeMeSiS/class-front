// src/services/recipeService.ts
import api from '../api/api';
import { Recipe } from '../models/Recipe';

/** Récupère toutes les recettes */
export const getLatestRecipes = (): Promise<Recipe[]> =>
  api.get<Recipe[]>('/recipes').then(res => res.data);

/** Récupère les recettes de l’utilisateur connecté */
export const getMyRecipes = (): Promise<Recipe[]> =>
  api.get<Recipe[]>('/recipes/me').then(res => res.data);

/** Récupère une recette par ID */
export const getRecipeById = (id: number): Promise<Recipe> =>
  api.get<Recipe>(`/recipes/${id}`).then(res => res.data);

/** Recherche de recettes par mot-clé */
export const searchRecipes = (q: string): Promise<Recipe[]> =>
  api
    .get<Recipe[]>('/recipes/search', {
      params: { q }               // <-- on envoie désormais ?q=… et non plus ?query=…
    })
    .then(res => res.data);

/** Crée une nouvelle recette (accepte FormData → multipart/form-data) */
export const createRecipe = (
  recipeData: Partial<Recipe> | FormData
): Promise<Recipe> => {
  if (recipeData instanceof FormData) {
    return api.post<Recipe>('/recipes', recipeData)
      .then(res => res.data);
  }
  return api.post<Recipe>('/recipes', recipeData).then(res => res.data);
};

/** Met à jour une recette existante (accepte aussi FormData) */
export const updateRecipe = (
  id: number,
  recipeData: Partial<Recipe> | FormData
): Promise<Recipe> => {
  if (recipeData instanceof FormData) {
    return api
      .put<Recipe>(`/recipes/${id}`, recipeData)
      .then(res => res.data);
  }
  return api.put<Recipe>(`/recipes/${id}`, recipeData).then(res => res.data);
};

/** Supprime une recette */
export const deleteRecipe = (id: number): Promise<void> =>
  api.delete<void>(`/recipes/${id}`).then(res => res.data);

/** Suggère des recettes selon des ingrédients */
export const suggestRecipes = (ingredients: string[]): Promise<Recipe[]> =>
  api.post<Recipe[]>('/recipes/suggest', { ingredients }).then(res => res.data);

/** Génère la liste de courses pour une recette */
export const generateShoppingList = (recipeId: number): Promise<string[]> =>
  api.post<string[]>('/recipes/shopping-list', { recipeId }).then(res => res.data);
