import React, { useState, useCallback, useEffect } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import { addIngredient, getIngredient, deleteIngredient } from "../storage/IngredientStorage";
import { Ingredient } from "../types/Ingredient";
import { v4 as uuidv4 } from "uuid";
import styles from "../styles/global";

const AddIngredientcreen = ({ navigation }: any) => {
  const [title, setTitle] = useState("");

  const handleSave = async () => {
    if (!title.trim()) return alert("Please enter a title.");
    console.log("Save was pressed for ", title);

    const newIngredient: Ingredient = {
      id: uuidv4(),
      title: title
    };

    console.log("Ingredient created", newIngredient);
    await addIngredient(newIngredient);
    console.log("Ingredient added", newIngredient);
    const fetchIngredient = async () => {
        const data = await getIngredient();
        setIngredient(data);
      };
    fetchIngredient();
  };

  const [Ingredient, setIngredient] = useState<Ingredient[]>([]);
  
    useFocusEffect(
    useCallback(() => {
      const fetchIngredient = async () => {
        const data = await getIngredient();
        setIngredient(data);
      };
      fetchIngredient();
    }, [])
  );
  
    const handleIngredientPress = (IngredientId: string) => {
      console.log('Selected Ingredient:', IngredientId);
    };
  
    const renderItem = ({ item }: { item: Ingredient }) => (
      <TouchableOpacity style={styles.card} onPress={() => handleIngredientPress(item.id)}>
        <Text style={styles.cardHeader}>{item.title}</Text>
      </TouchableOpacity>
    );

  return (
    <View style={styles.container}>

      <TextInput
        style={styles.input}
        placeholder="New Item..."
        value={title}
        onChangeText={setTitle}
      />

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>Add Ingredient</Text>
      </TouchableOpacity>

      <FlatList
              data={Ingredient}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              contentContainerStyle={styles.list}
              ListEmptyComponent={<Text>No Ingredient yet.</Text>}
            />
    </View>
  );
};

export default AddIngredientcreen;
