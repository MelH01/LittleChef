import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { addRecipe } from "../storage/recipeStorage";
import { Recipe } from "../types/Recipe";
import { v4 as uuidv4 } from "uuid";
import styles from "../styles/global";

const AddRecipeScreen = ({ navigation }: any) => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = async () => {
    if (!title.trim()) return alert("Please enter a title.");
    console.log("Save was pressed for ", title, ingredients, description);

    const newRecipe: Recipe = {
      id: uuidv4(),
      title,
      ingredients: ingredients.split(",").map((i) => i.trim()),
      steps: [],
      description
    };

    await addRecipe(newRecipe);
    navigation.goBack();
  };

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
        placeholder="Description... (optional)"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Ingredients... (comma separated)"
        value={ingredients}
        onChangeText={setIngredients}
      />

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>Save Recipe</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddRecipeScreen;
