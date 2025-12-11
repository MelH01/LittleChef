import React, { useState, useCallback } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { addRecipe } from "../storage/recipeStorage";
import { Recipe } from "../types/Recipe";
import { v4 as uuidv4 } from "uuid";
import styles from "../styles/global";
import { Picker } from "@react-native-picker/picker";
import { Ingredient, IngredientWithQuantity } from "../types/Ingredient";
import {useFocusEffect} from '@react-navigation/native';



const AddRecipeScreen = ({ navigation }: any) => {
  const [title, setTitle] = useState("");
  const [ingredient, setingredient] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState("");

    useFocusEffect(
      //empty all text inputs when screen is focused
      useCallback(() => {
        setTitle("");
        setingredient("");
        setDescription("");
        setQuantity(0);
        setUnit("");
      }, [])
    );

  const handleSave = async () => {
    if (!title.trim()) return alert("Please enter a title.");
    if (quantity && !ingredient.trim()) return alert("Please enter ingredient.");
    console.log("Save was pressed for ", title, ingredient, description);

    const newRecipe: Recipe = {
      id: uuidv4(),
      title,
      ingredients: [{ id: uuidv4(), title: ingredient, quantity: quantity, unit: unit }],
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

      <View style={styles.row}>
  
  {/* Ingredient name */}
  <TextInput
    style={styles.ingredientInput}
    placeholder="Ingredient..."
    value={ingredient}
    onChangeText={setingredient}
  />

  {/* Quantity + arrows */}
  <View style={styles.qtyBox}>
    <TextInput
      style={styles.qtyInput}
      placeholder="0"
      keyboardType="numeric"
      value={quantity.toString()}
      onChangeText={(text) => setQuantity(parseInt(text) || 0)}
    />

    <View style={styles.qtyArrows}>
      <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
        <Text style={styles.arrow}>▲</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setQuantity(Math.max(0, quantity - 1))}>
        <Text style={styles.arrow}>▼</Text>
      </TouchableOpacity>
    </View>
  </View>

  {/* Unit Picker */}
  <Picker
    selectedValue={unit}
    style={styles.picker}
    mode="dropdown"
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
  <Text style={styles.saveText}>Save Recipe</Text>
</TouchableOpacity>
    </View>);
};

export default AddRecipeScreen;
