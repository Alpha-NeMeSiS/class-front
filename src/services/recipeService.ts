// src/services/recipeService.ts
import api from '../api/api';
import { Recipe } from '../models/Recipe';

/**
 * Récupère les recettes du moment (toutes les recettes ou endpoint dédié).
 */
export const getLatestRecipes = () =>
  api.get<Recipe[]>('/recipes');

/**
 * Récupère le détail d’une recette par son ID.
 */
export const getRecipeById = (id: number) =>
  api.get<Recipe>(`/recipes/${id}`);

/**
 * Recherche de recettes par mot-clé.
 */
export const searchRecipes = (query: string) =>
  api.get<Recipe[]>('/recipes/search', {
    params: { query }
  });

/**
 * Crée une nouvelle recette.
 * @param recipeData Données de la recette (peut être un FormData pour inclure image).
 */
export const createRecipe = (recipeData: Partial<Recipe> | FormData) =>
  api.post<Recipe>('/recipes', recipeData);

/**
 * Met à jour une recette existante.
 * @param id ID de la recette à mettre à jour.
 * @param recipeData Données mises à jour (peut être un FormData pour inclure image).
 */
export const updateRecipe = (id: number, recipeData: Partial<Recipe> | FormData) =>
  api.put<Recipe>(`/recipes/${id}`, recipeData);

/**
 * Supprime une recette.
 * @param id ID de la recette à supprimer.
 */
export const deleteRecipe = (id: number) =>
  api.delete<void>(`/recipes/${id}`);

/**
 * Propose des recettes à partir d’une liste d’ingrédients.
 * @param ingredients Tableau de noms d’ingrédients.
 */
export const suggestRecipes = (ingredients: string[]) =>
  api.post<Recipe[]>('/recipes/suggest', { ingredients });

/**
 * Génère une liste de courses pour une recette donnée.
 * @param recipeId ID de la recette.
 */
export const generateShoppingList = (recipeId: number) =>
  api.post<string[]>('/recipes/shopping-list', { recipeId });
