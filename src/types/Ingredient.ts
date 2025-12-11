export interface Ingredient {
  id: string;
  title: string;
  imgUri?: string;
}

export interface IngredientWithQuantity extends Ingredient {
  quantity: number;
  unit: string;
}