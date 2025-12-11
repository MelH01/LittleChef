// Root stack for Recipes tab
export type RecipesStackParamList = {
  MyRecipes: undefined;
  RecipeDetail: { recipeId: string, recipeTitle?: string };
};

// Bottom tabs
export type RootTabParamList = {
  Recipes: undefined;     // points to RecipesStack
  AddRecipe: undefined;
  ShoppingList: undefined;
};
