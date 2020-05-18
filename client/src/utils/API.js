import Axios from "axios";

export default {
  testAllPeople() {
    const getAllPeople = Axios.get("/api/test/test-data");
    return getAllPeople;
  },
  testSinglePerson(personId) {
    const getSinglePerson = Axios.get(`/api/test/test-data/${personId}`);
    return getSinglePerson;
  },
  grabRecipesForUser(email) {
    const getAllRecipesByEmail = Axios.get(`/api/recipe/mine/${email}`);
    return getAllRecipesByEmail;
  },
  grabRecipeById(recipeId) {
    const getSingleRecipe = Axios.get(`/api/recipe/view/${recipeId}`);
    return getSingleRecipe;
  },
  createNewRecipe(recipe) {
    const createNewRecipe = Axios.post("/api/recipe/create/", recipe);
    return createNewRecipe;
  },
};
