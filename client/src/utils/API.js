import Axios from "axios";

export default {
  testAllPeople() {
    return Axios.get("/api/test/test-data");
  },
  testSinglePerson(personID) {
    return Axios.get(`/api/test/test-data/${personID}`);
  },
  grabRecipesForUser(user) {
    console.log(user);
    return Axios.get(`/api/recipe/mine/${user.email}`)
  }
};
