import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchMoviesHandler() {
    // first, change loading state
    setIsLoading(true);

    // now make our get request
    const response = await fetch("https://swapi.dev/api/films/");
    // returns promise
    const data = await response.json();

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
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>Found no movies.</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
