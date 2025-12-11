import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../types/User";

const STORAGE_KEY = "USER";

export async function getUser(): Promise<User | null> {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
}

export async function saveUser(user: User) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export async function addUser(user: User) {
  await saveUser(user);
}

export async function deleteUser() {
  await AsyncStorage.removeItem(STORAGE_KEY);
}
