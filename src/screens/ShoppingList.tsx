import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import { addShoppingListItem, getShoppingList, deleteShoppingListItem } from "../storage/shoppingListStorage";
import { IngredientWithQuantity } from "../types/Ingredient";
import { v4 as uuidv4 } from "uuid";
import styles from "../styles/global";

const AddIngredientScreen = ({ navigation }: any) => {
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState("");
  const [shoppingList, setShoppingList] = useState<IngredientWithQuantity[]>([]);

  // Fetch shopping list when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      const fetchList = async () => {
        const data = await getShoppingList();
        setShoppingList(data);
      };
      fetchList();
    }, [])
  );

  const handleSave = async () => {
    if (!title.trim()) return alert("Please enter a title.");

    const newIngredient: IngredientWithQuantity = {
      id: uuidv4(),
      title,
      quantity,
      unit,
    };

    await addShoppingListItem(newIngredient);

    const updatedList = await getShoppingList();
    setShoppingList(updatedList);

    // Reset inputs
    setTitle("");
    setQuantity(1);
    setUnit("");
  };

  const handleItemPress = async (id: string) => {
    await deleteShoppingListItem(id);
    const updatedList = await getShoppingList();
    setShoppingList(updatedList);
  };

  const renderItem = ({ item }: { item: IngredientWithQuantity }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleItemPress(item.id)}>
      <Text style={styles.cardHeader}>
        {item.title} {item.quantity} {item.unit}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ingredient..."
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantity"
        keyboardType="numeric"
        value={quantity.toString()}
        onChangeText={(text) => setQuantity(parseInt(text) || 1)}
      />
      <TextInput
        style={styles.input}
        placeholder="Unit (e.g., g, kg, tsp)"
        value={unit}
        onChangeText={setUnit}
      />

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>Add Ingredient</Text>
      </TouchableOpacity>

      <FlatList
        data={shoppingList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text>No ingredients yet.</Text>}
      />
    </View>
  );
};

export default AddIngredientScreen;
