import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  async function fetchMoviesHandler() {
    const response = await fetch("https://swapi.dev/api/films/"); // get request
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
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
