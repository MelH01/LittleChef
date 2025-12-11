import AsyncStorage from "@react-native-async-storage/async-storage";
import { Recipe } from "../types/Recipe";

const STORAGE_KEY = "RECIPES";

export async function getRecipes(): Promise<Recipe[]> {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export async function saveRecipes(recipes: Recipe[]) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
}

export async function addRecipe(recipe: Recipe) {
  const existing = await getRecipes();
  existing.push(recipe);
  await saveRecipes(existing);
}

export async function deleteRecipe(id: string) {
  const list = await getRecipes();
  const updated = list.filter(r => r.id !== id);
  await saveRecipes(updated);
}
