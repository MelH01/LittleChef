import AsyncStorage from "@react-native-async-storage/async-storage";
import { IngredientWithQuantity } from "../types/Ingredient";

const STORAGE_KEY = "SHOPPINGLIST";

export async function getShoppingList(): Promise<IngredientWithQuantity[]> {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export async function saveShoppingList(ShoppingList: IngredientWithQuantity[]) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(ShoppingList));
}

export async function addShoppingListItem(ingredient: IngredientWithQuantity) {
  const existing = await getShoppingList();
  existing.push(ingredient);
  await saveShoppingList(existing);
}

export async function deleteShoppingListItem(id: string) {
  const list = await getShoppingList();
  const updated = list.filter(r => r.id !== id);
  await saveShoppingList(updated);
}
