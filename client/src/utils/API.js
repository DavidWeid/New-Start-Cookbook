import Axios from "axios";

export default {
  testAllPeople() {
    const getAllPeople = Axios.get("/api/test/test-data");
    return getAllPeople;
  },
  testSinglePerson(personId) {
    const getSinglePersonById = Axios.get(`/api/test/test-data/${personId}`);
    return getSinglePersonById;
  },
  grabRecipesForUser(email) {
    const getAllRecipesByEmail = Axios.get(`/api/recipe/mine/${email}`);
    return getAllRecipesByEmail;
  },
  grabRecipeById(recipeId) {
    const getRecipeById = Axios.get(`/api/recipe/view/${recipeId}`);
    return getRecipeById;
  },
  createNewRecipe(recipe) {
    const createNewRecipe = Axios.post("/api/recipe/create/", recipe);
    return createNewRecipe;
  },
  deleteRecipeById(id) {
    const deleteRecipeById = Axios.delete(`/api/recipe/delete/${id}`);
    return deleteRecipeById;
  },
};
