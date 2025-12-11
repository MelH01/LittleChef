import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { addRecipe } from "../storage/recipeStorage";
import { Recipe } from "../types/Recipe";
import { v4 as uuidv4 } from "uuid";
import styles from "../styles/global";
import { Picker } from "@react-native-picker/picker";
import { IngredientWithQuantity } from "../types/Ingredient";
import { useFocusEffect } from "@react-navigation/native";

const AddRecipeScreen = ({ navigation }: any) => {
  const [title, setTitle] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [description, setDescription] = useState("");
  const [portions, setPortions] = useState("");
  const [time, setTime] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState("g");
  const [ingredients, setIngredients] = useState<IngredientWithQuantity[]>([]);

  const handleAddIngredient = () => {
    if (!ingredient.trim()) return alert("Please enter an ingredient");
    const newIngredient: IngredientWithQuantity = {
      id: uuidv4(),
      title: ingredient,
      quantity,
      unit,
    };
    setIngredients([...ingredients, newIngredient]);
    // Clear input fields
    setIngredient("");
    setQuantity(1);
    setUnit("g");
  };

  const handleSaveRecipe = async () => {
    if (!title.trim()) return alert("Please enter a recipe title");
    const newRecipe: Recipe = {
      id: uuidv4(),
      title,
      description,
      portions: portions ? parseInt(portions) : undefined,
      time: time ? parseInt(time) : undefined,
      ingredients,
      steps: [],
    };
    await addRecipe(newRecipe);
    
    setTitle("");
    setDescription("");
    setPortions("");
    setTime("");
    setIngredients([]);
    alert("Recipe saved!");
    navigation.goBack();
  };

  const handleIngredient = async (id: string) => {
    const updatedIngredients = ingredients.filter((item) => item.id !== id);
    setIngredients(updatedIngredients);
  };

  const renderItem = ({ item }: { item: IngredientWithQuantity }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleIngredient(item.id)}
    >
      <Text style={styles.cardHeader}>
        {item.title} - {item.quantity} {item.unit}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Recipe Title..."
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Description (optional)..."
        value={description}
        onChangeText={setDescription}
        multiline
      />

<View style={styles.row}>
      <TextInput
        style={[styles.ingredientInput]}
        placeholder="Portions..."
        value={portions}
        onChangeText={setPortions}
      />

      <TextInput
        style={[styles.timeInput]}
        placeholder="Time (minutes)..."
        value={time}
        onChangeText={setTime}
      />
</View>

      {/* Ingredient row */}
      <View style={styles.row}>
        <TextInput
          style={styles.ingredientInput}
          placeholder="Ingredient..."
          value={ingredient}
          onChangeText={setIngredient}
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

      <TouchableOpacity style={styles.saveBtn} onPress={handleAddIngredient}>
        <Text style={styles.saveText}>Add Ingredient</Text>
      </TouchableOpacity>

      <FlatList
        data={ingredients}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text>No ingredients yet.</Text>}
      />

      <TouchableOpacity style={styles.saveBtn} onPress={handleSaveRecipe}>
        <Text style={styles.saveText}>Save Recipe</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddRecipeScreen;
