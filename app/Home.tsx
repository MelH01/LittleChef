import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

// Dummy data for now
const recipes = [
  { id: '1', title: 'Spaghetti Carbonara' },
  { id: '2', title: 'Chicken Curry' },
  { id: '3', title: 'Chocolate Cake' },
];

const HomeScreen: React.FC = () => {

  const handleRecipePress = (recipeId: string) => {
    // Navigate to RecipeDetailScreen later
    console.log('Selected recipe:', recipeId);
  };

  const renderItem = ({ item }: { item: { id: string; title: string } }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleRecipePress(item.id)}>
      <Text style={styles.cardText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Little Chef 🍳</Text>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFE5B4',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  cardText: {
    fontSize: 18,
  },
});
