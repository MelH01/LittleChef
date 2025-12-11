import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../types/User";

const STORAGE_KEY = "USER";

export async function getUser(): Promise<User[]> {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export async function saveUser(user: User[]) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export async function addUser(user: User) {
  const existing = await getUser();
  existing.push(user);
  await saveUser(existing);
}

export async function deleteUser(id: string) {
  const list = await getUser();
  const updated = list.filter(r => r.id !== id);
  await saveUser(updated);
}
