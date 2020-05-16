import Axios from "axios";

export default {
  testAllPeople() {
    const getAllPeople = Axios.get("/api/test/test-data");
    return getAllPeople;
  },
  testSinglePerson(personID) {
    const getSinglePerson = Axios.get(`/api/test/test-data/${personID}`);
    return getSinglePerson;
  },
  grabRecipesForUser(email) {
    const getAllRecipesByEmail = Axios.get(`/api/recipe/mine/${email}`);
    return getAllRecipesByEmail;
  },
  createNewRecipe(recipe) {
    const createNewRecipe = Axios.post("/api/recipe/create/", recipe);
    return createNewRecipe;
  },
};
