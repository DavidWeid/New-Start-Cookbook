import React, { useState } from "react";
import API from "../../utils/API";
import "./Pages.css";

const Home = () => {
  const [testData, setData] = useState(null);

  const callAPI = () => {
    API.testAPI()
      .then(res => setData(res)).then(showData())
      .catch(err => console.error(err));
  };

  const showData = () => console.log(testData);

  return (
    <main>
      <h1>Home Page</h1>
      <button onClick={() => callAPI()}>Test API</button>
    </main>
  );
};

export default Home;
