// src/types/Recipe.ts
export interface Recipe {
  recipeId: number;
  title: string;
  description: string;
  imageUrl: string;
  rating: number;
  ingredients: IngredientDTO[]; // tableau d’objets { name, unit }
  steps: StepDTO[];
  Comments: string[];
  preparationTime: number;
  cookingTime: number;
  CreatedBy: string;
  servings: number;
  category: string;
}

export interface IngredientDTO {
  name: string;
  unit: string;
}

export interface StepDTO {
  description: string;
  order: number;
}