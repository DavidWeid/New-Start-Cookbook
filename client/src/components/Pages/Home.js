import React, { Fragment, useState, useEffect } from "react";
import { useAuth0 } from "../../react-auth0-wrapper";
import DataAPI from "../DataAPI";
import API from "../../utils/API";
import "./Pages.css";
import Axios from "axios";

const Home = () => {
  // const [{ data, isLoading, isError }, doFetch] = DataAPI("/api/user/", []);
  // const [personID, setPersonID] = useState(0);

  // const { isAuthenticated, user } = useAuth0();

  const { isAuthenticated, user } = useAuth0();

  const [recipes, setRecipes] = useState([{}]);

  useEffect(() => {
    console.log(user);
    const fetchRecipes = async () => {
      console.log(user);
      if (user) {
        console.log(user);
        const recipes = await API.grabRecipesForUser(user);
        console.log(recipes);
        setRecipes(recipes.data);
      }
    };
    fetchRecipes();
  }, [user]);

  return (
    <Fragment>
      {!isAuthenticated && <div>User Not Authenticated</div>}
      {isAuthenticated && <div>User Is Authenticated</div>}
      {/* {isError && <div>Something went wrong...</div>}
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div>
          {data.map(recipe => {
            return (
              <div key={recipe._id}>
                <h1>{recipe.title}</h1>
                <p>{recipe.owner}</p>
                <p>{recipe.description}</p>
              </div>
            );
          })}
        </div>
      )} */}
    </Fragment>
  );

  // return (
  //   <Fragment>
  //     <input
  //       type="number"
  //       value={personID}
  //       onChange={e => setPersonID(e.target.value)}
  //     ></input>
  //     <button
  //       type="button"
  //       onClick={() => doFetch(`/api/test/test-data/${personID}`)}
  //     >
  //       Search One
  //     </button>

  //     {isError && <div>Something went wrong...</div>}
  //     {isLoading ? (
  //       <div>Loading...</div>
  //     ) : (
  //       <ul>
  //         {data.map(person => (
  //           <li key={person._id}>{person.username}</li>
  //         ))}
  //       </ul>
  //     )}
  //   </Fragment>
  // );

  // const [query, setQuery] = useState("redux");
  // const [{ data, isLoading, isError }, doFetch] = DataAPI(
  //   "https://hn.algolia.com/api/v1/search?query=redux",
  //   { hits: [] }
  // );

  // return (
  //   <main>
  //     <h1>Home Page</h1>
  //     <Fragment>
  //       <form
  //         onSubmit={e => {
  //           doFetch(`https://hn.algolia.com/api/v1/search?query=${query}`);
  //           e.preventDefault();
  //         }}
  //       >
  //         <input
  //           type="text"
  //           value={query}
  //           onChange={event => setQuery(event.target.value)}
  //         />
  //         <button type="submit">Search</button>
  //       </form>

  //       {isError && <div>Something went wrong...</div>}
  //       {isLoading ? (
  //         <div>Loading...</div>
  //       ) : (
  //         <ul>
  //           {data.hits.map(item => (
  //             <li key={item.objectID}>
  //               <a href={item.url}>{item.title}</a>
  //             </li>
  //           ))}
  //         </ul>
  //       )}
  //     </Fragment>
  //   </main>
  // );
};

export default Home;
