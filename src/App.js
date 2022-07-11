import React, { useEffect, useState, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    // useCallBack to ensure handler is not called uneccessarily
    // first, change loading state
    setIsLoading(true);
    setError(null);
    try {
      // now make our get request
      const response = await fetch(
        "https://react-http-e0c16-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json"
      );
      // analyze response, chekc for errors
      if (!response.ok) {
        throw new Error("Something went wrong...");
        // if error, jumps straight to catch block
      }

      // returns promise
      const data = await response.json();

      const loadedMovies = [];

      // work with data response
      for (const key in data) {
        // loops through keys in data onject response
        loadedMovies.push({
          id: key,
          title: data[key].title, // drilling into nested object response, dynamically accesses property in JS
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate
        })
      }

      // return loaded movies array formatted thanks to for loop above
      setMovies(loadedMovies);
      // Loading state is now false
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [
    // dependancy array to define when useEffect is executed
    fetchMoviesHandler,
  ]);

  const addMovieHandler = async movie => {
    const res = await fetch(
      "https://react-http-e0c16-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          // not required by firebase but many other backend API databses use/require this
          "Content-Type": "application/json",
        },
      });
    const data = await res.json();
    console.log(data);
  }

  // declare content, default set to "found no movies"
  let content = <p>Found no movies.</p>;
  // conditionally rend content based on API call results
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (error) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <>
    <section>
      <AddMovie onAddMovie={addMovieHandler} />
    </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </>
  );
}

export default App;
