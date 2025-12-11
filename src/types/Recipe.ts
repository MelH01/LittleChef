import { IngredientWithQuantity } from "./Ingredient";

export interface Recipe {
  id: string;
  title: string;
  ingredients: IngredientWithQuantity[];
  steps: string[];
  description: string;
  time?: number;
  portions?: number;
}
