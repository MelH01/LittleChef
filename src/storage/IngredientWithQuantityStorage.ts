import AsyncStorage from "@react-native-async-storage/async-storage";
import { IngredientWithQuantity } from "../types/Ingredient";

const STORAGE_KEY = "IngredientWithQuantity";

export async function getIngredientWithQuantity(): Promise<IngredientWithQuantity[]> {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export async function saveIngredientWithQuantity(IngredientWithQuantitys: IngredientWithQuantity[]) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(IngredientWithQuantitys));
}

export async function addIngredientWithQuantity(IngredientWithQuantity: IngredientWithQuantity) {
  const existing = await getIngredientWithQuantity();
  existing.push(IngredientWithQuantity);
  await saveIngredientWithQuantity(existing);
}

export async function deleteIngredientWithQuantity(id: string) {
  const list = await getIngredientWithQuantity();
  const updated = list.filter(r => r.id !== id);
  await saveIngredientWithQuantity(updated);
}