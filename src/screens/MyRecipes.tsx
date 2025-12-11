import React, { useState, useCallback } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { getRecipes } from '../storage/recipeStorage';
import { Recipe } from '../types/Recipe';
import styles from "../styles/global";

const MyRecipes: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const navigation = useNavigation<any>();

  // Reload recipes whenever screen comes into focus
  useFocusEffect(
    useCallback(() => {
      const fetchRecipes = async () => {
        const data = await getRecipes();
        setRecipes(data);
      };
      fetchRecipes();
    }, [])
  );

  const handleRecipePress = (recipeId: string) => {
    console.log('Selected recipe:', recipeId);
    navigation.navigate("RecipeDetail", { recipeId });
  };

  const renderItem = ({ item }: { item: Recipe }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleRecipePress(item.id)}>
      <Text style={styles.cardHeader}>{item.title}</Text>
      <Text style={styles.cardText}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text>No recipes yet.</Text>}
      />
    </View>
  );
};

export default MyRecipes;
