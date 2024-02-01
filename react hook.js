import React, { useState } from 'react';

// Custom hook for managing movie state
const useMovieState = () => {
  const [movies, setMovies] = useState([]);
  const [filterTitle, setFilterTitle] = useState('');
  const [filterRating, setFilterRating] = useState(0);

  // Function to add a new movie
  const addMovie = (newMovie) => {
    setMovies([...movies, newMovie]);
  };

  // Function to filter movies based on title and rating
  const filterMovies = (title, rating) => {
    setFilterTitle(title);
    setFilterRating(rating);
  };

  // Function to get filtered movies
  const getFilteredMovies = () => {
    return movies.filter((movie) => {
      const titleMatch = movie.title.toLowerCase().includes(filterTitle.toLowerCase());
      const ratingMatch = movie.rating >= filterRating;
      return titleMatch && ratingMatch;
    });
  };

  return {
    movies,
    filterTitle,
    filterRating,
    addMovie,
    filterMovies,
    getFilteredMovies,
  };
};

export default useMovieState;



import React from 'react';

// MovieCard component
const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img src={movie.posterURL} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>{movie.description}</p>
      <p>Rating: {movie.rating}</p>
    </div>
  );
};

// MovieList component
const MovieList = ({ movies }) => {
  return (
    <div className="movie-list">
      {movies.map((movie, index) => (
        <MovieCard key={index} movie={movie} />
      ))}
    </div>
  );
};

// Filter component
const Filter = ({ filterMovies }) => {
  const handleTitleChange = (e) => {
    filterMovies(e.target.value, filterRating);
  };

  const handleRatingChange = (e) => {
    filterMovies(filterTitle, parseInt(e.target.value));
  };

  return (
    <div className="filter">
      <input type="text" placeholder="Filter by title" onChange={handleTitleChange} />
      <input type="number" placeholder="Filter by rating" onChange={handleRatingChange} />
    </div>
  );
};

export { MovieCard, MovieList, Filter };


import React from 'react';
import useMovieState from './useMovieState';
import { MovieCard, MovieList, Filter } from './components';

const App = () => {
  const { movies, addMovie, filterTitle, filterRating, filterMovies, getFilteredMovies } = useMovieState();

  const handleAddMovie = () => {
    addMovie({
      title: 'New Movie',
      description: 'Description of the new movie',
      posterURL: 'https://example.com/poster.jpg',
      rating: 4,
    });
  };

  return (
    <div className="app">
      <h1>Movie Library</h1>
      <button onClick={handleAddMovie}>Add Movie</button>
      <Filter filterMovies={filterMovies} />
      <MovieList movies={getFilteredMovies()} />
    </div>
  );
};

export default App;
