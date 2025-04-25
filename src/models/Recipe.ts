// src/types/Recipe.ts
export interface Recipe {
    id: number;
    title: string;
    description: string;
    ingredients: string[];
    etape: string[];
    Comments: string[];
    PreparationTime: number;
    CookingTime: number;
    Difficulty: string;
    Budget: string;
    DietType: string;
    CreatedBy: string;

  }
  