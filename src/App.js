import React, { useEffect, useState, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

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
      const response = await fetch("https://swapi.dev/api/films/");
      // returns promise
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Something went wrong...");
        // if error, jumps straight to catch block
      }

      // transform data titles to match props in MoviesList component
      const transformedMovies = data.results.map((movieData) => {
        // return new object
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      // return transformed movies instead of just data.results
      setMovies(transformedMovies);
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
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </>
  );
}

export default App;
