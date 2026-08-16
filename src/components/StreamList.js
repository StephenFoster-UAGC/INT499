import { useState } from "react";
import {
  FaTrash,
  FaEdit,
  FaCheck,
  FaStar
} from "react-icons/fa";

function StreamList() {
  const [movie, setMovie] = useState("");
  const [movieList, setMovieList] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [editedMovie, setEditedMovie] = useState("");

  const [search, setSearch] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!movie.trim()) return;

    const newMovie = {
      id: Date.now(),
      title: movie,
      completed: false,
      favorite: false
    };

    setMovieList([...movieList, newMovie]);

    setMovie("");
  };

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

        <p>
          Build your personal watchlist by entering a movie
          or show below.
        </p>

        <form
          onSubmit={handleSubmit}
          className="search-form"
        >
          <input
            type="text"
            placeholder="Enter a movie or show..."
            value={movie}
            onChange={(event) =>
              setMovie(event.target.value)
            }
            required
          />

          <button type="submit">
            Add to StreamList
          </button>
        </form>

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