import React, { Fragment, useState } from "react";
import DataAPI from "../DataAPI";
import "./Pages.css";

const Home = () => {
  const [{ data, isLoading, isError }, doFetch] = DataAPI(
    "/api/test/test-data",
    { people: [] }
  );
  const [personID, setPersonID] = useState(0);

  return (
    <Fragment>
      <input
        type="number"
        value={personID}
        onChange={e => setPersonID(e.target.value)}
      ></input>
      <button
        type="button"
        onClick={() => doFetch(`/api/test/test-data/${personID}`)}
      >
        Search One
      </button>
      {isError && <div>Something went wrong...</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {data.people[0].name === undefined ? (
            <p>No user found</p>
          ) : (
            <div>User Found</div>
          )}
          {data.people.map(person => (
            <li key={person._id}>{person.name}</li>
          ))}
        </ul>
      )}
    </Fragment>
  );

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
