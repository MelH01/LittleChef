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
    <View>
      <Text>{recipe.title}</Text>
      <Text>{recipe.description}</Text>
    </View>
  );
};

export default RecipeDetail;
