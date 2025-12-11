import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ingredient } from "../types/Ingredient";

const STORAGE_KEY = "INGREDIENT";

export async function getIngredient(): Promise<Ingredient[]> {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export async function saveIngredient(ingredients: Ingredient[]) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(ingredients));
}

export async function addIngredient(ingredient: Ingredient) {
  const existing = await getIngredient();
  existing.push(ingredient);
  await saveIngredient(existing);
}

export async function deleteIngredient(id: string) {
  const list = await getIngredient();
  const updated = list.filter(r => r.id !== id);
  await saveIngredient(updated);
}
