import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import { addShoppingListItem, getShoppingList, deleteShoppingListItem } from "../storage/shoppingListStorage";
import { IngredientWithQuantity } from "../types/Ingredient";
import { v4 as uuidv4 } from "uuid";
import styles from "../styles/global";
import { Picker } from "@react-native-picker/picker";

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
    setUnit("g");
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
      {/* Ingredient row */}
      <View style={styles.row}>
        <TextInput
          style={styles.ingredientInput}
          placeholder="Ingredient..."
          value={title}
          onChangeText={setTitle}
        />

        <View style={styles.qtyBox}>
          <TextInput
            style={styles.qtyInput}
            placeholder="1"
            keyboardType="numeric"
            value={quantity.toString()}
            onChangeText={(text) => setQuantity(parseInt(text) || 0)}
          />
          <View style={styles.qtyArrows}>
            <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
              <Text style={styles.arrow}>▲</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setQuantity(Math.max(0, quantity - 1))}
            >
              <Text style={styles.arrow}>▼</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Picker
          selectedValue={unit}
          style={styles.picker}
          onValueChange={setUnit}
        >
          <Picker.Item label="g" value="g" />
          <Picker.Item label="hg" value="hg" />
          <Picker.Item label="kg" value="kg" />
          <Picker.Item label="tsp" value="tsp" />
          <Picker.Item label="tbsp" value="tbsp" />
        </Picker>
      </View>

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
