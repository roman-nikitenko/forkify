import { client } from "../utils/fetch";

export const getRecipes = (meal) => {
  return client.get(meal);
}

export const getRecipe = (id) => {
  return fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`)
    .then(response => response.json())
    .then(recipe => recipe.data.recipe);
}
