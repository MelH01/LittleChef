import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { getRecipes } from "../storage/recipeStorage";
import { Recipe } from "../types/Recipe";
import styles from "../styles/global";
import { IngredientWithQuantity } from "../types/Ingredient";
import { getShoppingList, addShoppingListItem, saveShoppingList } from "../storage/shoppingListStorage";
import { v4 as uuidv4 } from "uuid";

// types/navigation.ts 
export type RootStackParamList = 
{ MyRecipes: undefined; RecipeDetail: { recipeId: string }; };

type Props = NativeStackScreenProps<RootStackParamList, "RecipeDetail">;

const RecipeDetail: React.FC<Props> = ({ route }) => {
  const { recipeId } = route.params;
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const allRecipes = await getRecipes();
      const selected = allRecipes.find((r) => r.id === recipeId) || null;
      setRecipe(selected);
    };
    fetchRecipe();
  }, [recipeId]);

  if (!recipe) return <Text>Loading...</Text>;

  const handleAddToShoppingList = async () => {
    const currentList = await getShoppingList();

    recipe.ingredients.forEach((ingredient) => {
      const existingIndex = currentList.findIndex(item => item.title === ingredient.title);
      if (existingIndex !== -1) {
        // Increment quantity if already exists
        currentList[existingIndex].quantity += ingredient.quantity;
      } else {
        // Add new ingredient
        const newIngredient: IngredientWithQuantity = {
          id: uuidv4(),
          title: ingredient.title,
          quantity: ingredient.quantity,
          unit: ingredient.unit,
        };
        currentList.push(newIngredient);
      }
    });

    await saveShoppingList(currentList);
    alert("Ingredients added to shopping list!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.cardHeader}>Description:</Text>
      <Text style={styles.cardText}>{recipe.description}</Text>

      <Text style={styles.cardHeader}>Ingredients:</Text>
      {recipe.ingredients.map((ingredient, index) => (
        <Text key={index} style={styles.cardText}>
          - {ingredient.title} {ingredient.quantity} {ingredient.unit}
        </Text>
      ))}

      <Text style={styles.cardHeader}>Steps:</Text>
      {recipe.steps.length === 0 ? (
        <Text style={styles.cardText}>No steps added.</Text>
      ) : (
        recipe.steps.map((step, index) => (
          <Text key={index} style={styles.cardText}>
            {index + 1}. {step}
          </Text>
        ))
      )}

      <TouchableOpacity style={styles.saveBtn} onPress={handleAddToShoppingList}>
        <Text style={styles.saveText}>Add to Shopping List</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RecipeDetail;
