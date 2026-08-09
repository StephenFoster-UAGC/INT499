import { useState } from "react";

function StreamList() {
  const [movie, setMovie] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("StreamList user input:", movie);

    setMovie("");
  };

  return (
    <section className="streamlist">
      <div className="hero-content">
        <span className="eyebrow">YOUR PERSONAL STREAMING LIST</span>

        <h1>
          Discover something
          <span> worth watching.</span>
        </h1>

        <p>
          Build your personal watchlist by entering a movie or show below.
          More streaming features are coming soon.
        </p>

        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            placeholder="Enter a movie or show..."
            value={movie}
            onChange={(event) => setMovie(event.target.value)}
            required
          />

          <button type="submit">Add to StreamList</button>
        </form>
      </div>

      <div className="feature-card">
        <div className="feature-icon">▶</div>
        <h2>One List. Endless Entertainment.</h2>
        <p>
          Keep track of the movies and shows you want to watch in one
          convenient place.
        </p>
      </div>
    </section>
  );
}

export default StreamList;