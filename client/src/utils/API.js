import Axios from "axios";

export default {
  testAllPeople() {
    return Axios.get("/api/test/test-data");
  },
  testSinglePerson(personID) {
    return Axios.get(`/api/test/test-data/${personID}`);
  },
  grabRecipesForUser(email) {
    return Axios.get(`/api/recipe/mine/${email}`);
  },
  createNewRecipe(recipe) {
    return Axios.post("/api/recipe/create/", recipe);
  },
};
