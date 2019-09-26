import Axios from "axios";

export default {
  testAPI() {
    return Axios.get("/api/test/test-data");
  }
};
