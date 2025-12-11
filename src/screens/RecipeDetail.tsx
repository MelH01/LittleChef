// types/navigation.ts
export type RootStackParamList = {
  MyRecipes: undefined;
  RecipeDetail: { recipeId: string };
};

// RecipeDetail.tsx
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootTabParamList } from '../types/navigation';
import { getRecipes } from '../storage/recipeStorage';
import { Recipe } from '../types/Recipe';
import styles from '../styles/global';

type Props = NativeStackScreenProps<RootStackParamList, 'RecipeDetail'>;

const RecipeDetail: React.FC<Props> = ({ route }) => {
  const { recipeId } = route.params;
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const allRecipes = await getRecipes();
      const selected = allRecipes.find(r => r.id === recipeId) || null;
      setRecipe(selected);
    };
    fetchRecipe();
  }, [recipeId]);

  if (!recipe) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
    <Text style={styles.cardHeader}>Description:</Text>
      <Text style={styles.cardText}>{recipe.description}</Text>
        <Text style={styles.cardHeader}>Ingredients:</Text>
        {recipe.ingredients.map((ingredient, index) => (
          <Text key={index} style={styles.cardText}>- {ingredient.title} {ingredient.quantity} {ingredient.unit}</Text>
        ))}
        <Text style={styles.cardHeader}>Steps:</Text>
        {recipe.steps.length === 0 ? (
          <Text style={styles.cardText}>No steps added.</Text>
        ) : (
            recipe.steps.map((step, index) => (
                <Text key={index} style={styles.cardText}>{index + 1}. {step}</Text>
            ))
        )}
    </View>
  );
};

export default RecipeDetail;
