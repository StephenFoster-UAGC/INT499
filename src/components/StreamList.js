import { useEffect, useState } from "react";
import {
  FaTrash,
  FaEdit,
  FaCheck,
  FaStar
} from "react-icons/fa";
import { Link } from "react-router-dom";

function StreamList() {
  
  const [movieList, setMovieList] = useState(() => {
  const savedMovies = localStorage.getItem("streamListMovies");

  return savedMovies
    ? JSON.parse(savedMovies)
    : [];
});

  const [editingId, setEditingId] = useState(null);
  const [editedMovie, setEditedMovie] = useState("");

  const [search, setSearch] = useState("");

  

  const deleteMovie = (id) => {
    setMovieList(
      movieList.filter((movie) => movie.id !== id)
    );
  };

  const completeMovie = (id) => {
    setMovieList(
      movieList.map((movie) =>
        movie.id === id
          ? {
              ...movie,
              completed: !movie.completed
            }
          : movie
      )
    );
  };

  const startEditing = (movie) => {
    setEditingId(movie.id);
    setEditedMovie(movie.title);
  };

  const saveEdit = (id) => {
    setMovieList(
      movieList.map((movie) =>
        movie.id === id
          ? {
              ...movie,
              title: editedMovie
            }
          : movie
      )
    );

    setEditingId(null);
  };

  const favoriteMovie = (id) => {
    setMovieList(
      movieList.map((movie) =>
        movie.id === id
          ? {
              ...movie,
              favorite: !movie.favorite
            }
          : movie
      )
    );
  };
  
  const clearAllMovies = () => {
    setMovieList([]);
  };

  useEffect(() => {
    localStorage.setItem(
      "streamListMovies",
      JSON.stringify(movieList)
    );
  }, [movieList]);


  return (
    <section className="streamlist">
      <div className="hero-content">
        <span className="eyebrow">
          YOUR PERSONAL STREAMING LIST
        </span>

        <h1>
          Discover something
          <span> worth watching.</span>
        </h1>

        
        <div className="browse-movies-section">
          <p>
            Search TMDB to discover movies and add them to your StreamList.
          </p>

          <Link
            to="/movies"
            className="browse-movies-button"
          >
            Browse Movies
          </Link>
        </div>

          <input
            className="search-filter"
            type="text"
            placeholder="Search your watchlist..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />     

        <h3>Total Movies: {movieList.length}</h3>

        <h3>
          Completed:
          {
            movieList.filter(
              (movie) => movie.completed
            ).length
          }
        </h3>

        <h3>
          Favorites:
          {
            movieList.filter(
              (movie) => movie.favorite
            ).length
          }
        </h3>

        <button
          className="clear-button"
          onClick={clearAllMovies}
        >
          Clear All
        </button>   
        
        <h3>
          Movies Added: {movieList.length}
        </h3>

        {movieList
          .filter((movie) =>
            movie.title
              .toLowerCase()
              .includes(search.toLowerCase())
          )
          .map((movie) => (
            <div
              key={movie.id}
              className="movie-item"
            >
              {movie.posterPath ? (
                <img
                  className="watchlist-poster"
                  src={`https://image.tmdb.org/t/p/w200${movie.posterPath}`}
                  alt={`${movie.title} poster`}
                />
              ) : (
                <div className="watchlist-poster placeholder-poster">
                  No Poster
                </div>
              )}
              {editingId === movie.id ? (
                <>
                  <input
                    value={editedMovie}
                    onChange={(event) =>
                      setEditedMovie(
                        event.target.value
                      )
                    }
                  />

                  <button
                    onClick={() =>
                      saveEdit(movie.id)
                    }
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span
                    style={{
                      textDecoration:
                        movie.completed
                          ? "line-through"
                          : "none",
                      fontWeight:
                        movie.favorite
                          ? "bold"
                          : "normal"
                    }}
                  >
                    {movie.title}
                  </span>

                  <button
                    onClick={() =>
                      completeMovie(movie.id)
                    }
                  >
                    <FaCheck />
                  </button>

                  <button
                    onClick={() =>
                      startEditing(movie)
                    }
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() =>
                      favoriteMovie(movie.id)
                    }
                  >
                    <FaStar />
                  </button>

                  <button
                    onClick={() =>
                      deleteMovie(movie.id)
                    }
                  >
                    <FaTrash />
                  </button>
                </>
              )}
            </div>
          ))}
            </div>

      <div className="feature-card">
        <div className="feature-icon">▶</div>

        <h2>
          One List. Endless Entertainment.
        </h2>

        <p>
          Keep track of the movies and shows you
          want to watch in one convenient place.
        </p>
      </div>
    </section>
  );
}

export default StreamList;