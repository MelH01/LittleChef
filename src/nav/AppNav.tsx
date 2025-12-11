import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { RecipesStackParamList } from '../types/navigation';

import MyRecipes from '../screens/MyRecipes';
import RecipeDetail from '../screens/RecipeDetail';
import AddRecipe from '../screens/AddRecipe';
import ShoppingList from '../screens/ShoppingList';
import CreateUser from '../screens/CreateUser';
import {User} from '../types/User';
import {getUser} from '../storage/userStorage';
import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

const Tab = createBottomTabNavigator();
const RecipesStack = createNativeStackNavigator<RecipesStackParamList>();

// Named export
export function RecipesStackScreen() {
  //if user exists, load user data
  return (
    <RecipesStack.Navigator>
      <RecipesStack.Screen 
      name="MyRecipes" 
      component={MyRecipes}
      options={({title: 'My Recipes'})}
      />
      <RecipesStack.Screen 
      name="RecipeDetail" 
      component={RecipeDetail} 
      options={({ route }) => ({title: route.params.recipeTitle || 'Could not find title'
  })}/>
    </RecipesStack.Navigator>
  );
}

export default function RootNavigator() {
  const [user, setUser] = useState<User | null | undefined>(undefined); 
  // undefined = loading, null = no user

  useEffect(() => {
    const fetchUser = async () => {
      const u = await getUser();
      setUser(u || null);
    };
    fetchUser();
  }, []);

  if (user === undefined) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }
return (
    <NavigationContainer>
      {user ? (
        <Tab.Navigator>
          <Tab.Screen name="Recipes" component={RecipesStackScreen} />
          <Tab.Screen name="Add Recipe" component={AddRecipe} />
          <Tab.Screen name="Shopping List" component={ShoppingList} />
        </Tab.Navigator>
      ) : (
        <CreateUser />
      )}
    </NavigationContainer>
  );
}