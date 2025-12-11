export interface Ingredient {
  id: string;
  title: string;
}

export interface IngredientWithQuantity extends Ingredient {
  quantity: number;
  unit: string;
}