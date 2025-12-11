import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { RecipesStackParamList } from '../types/navigation';

import MyRecipes from '../screens/MyRecipes';
import RecipeDetail from '../screens/RecipeDetail';
import AddRecipe from '../screens/AddRecipe';
import ShoppingList from '../screens/ShoppingList';

const Tab = createBottomTabNavigator();
const RecipesStack = createNativeStackNavigator<RecipesStackParamList>();

// Named export
export function RecipesStackScreen() {
  return (
    <RecipesStack.Navigator>
      <RecipesStack.Screen name="MyRecipes" component={MyRecipes} />
      <RecipesStack.Screen name="RecipeDetail" component={RecipeDetail} />
    </RecipesStack.Navigator>
  );
}

// Default export
export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Recipes" component={RecipesStackScreen} />
        <Tab.Screen name="AddRecipe" component={AddRecipe} />
        <Tab.Screen name="ShoppingList" component={ShoppingList} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
