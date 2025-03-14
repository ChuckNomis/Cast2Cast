import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  fetchMoviesByActor,
  fetchCastByMovie,
  fetchActorById,
} from "../api/tmdb";
import Header from "../components/Header";
import "./Game.css";

const Game = () => {
  const location = useLocation();
  const { startActor, targetActor } = location.state || {}; // Receive actors from Select.tsx
  const [currentActor, setCurrentActor] = useState<any>(startActor);
  const [currentMovies, setCurrentMovies] = useState<any[]>([]);
  const [currentMovie, setCurrentMovie] = useState<any>(null);
  const [currentCast, setCurrentCast] = useState<any[]>([]);
  const [steps, setSteps] = useState(0);
  const [loading, setLoading] = useState(true);
  const [gameWon, setGameWon] = useState(false);

  // Handle when a movie is clicked
  const handleMovieClick = async (movie: any) => {
    console.log(movie);
    setCurrentMovie(movie);
    setCurrentActor(null);
    setCurrentMovies([]);
    setLoading(true);
    const cast = await fetchCastByMovie(movie.id);
    setCurrentCast(cast);
    setLoading(false);
  };

  // Handle when an actor is clicked
  const handleActorClick = async (actor: any) => {
    setSteps((prevSteps) => prevSteps + 1); // Increase steps
    if (actor.id === targetActor?.id) {
      win(); // Trigger win condition
      return;
    }
    setCurrentActor(actor);
    setCurrentMovie(null);
    setCurrentCast([]);
    setLoading(true);
    const movies = await fetchMoviesByActor(actor.id);
    setCurrentMovies(movies);
    setLoading(false);
  };

  // Win function
  const win = () => {
    setGameWon(true);
  };

  return (
    <div className="game-container">
      <Header actor1={startActor} actor2={targetActor} />

      {loading ? (
        <h3>Loading...</h3>
      ) : gameWon ? (
        <div className="win-message">
          <h2>
            You found {targetActor?.name} in {steps} steps!
          </h2>
          <button onClick={() => window.location.reload()}>Play Again</button>
        </div>
      ) : (
        <>
          {/* Steps Counter */}
          <h3 className="steps-counter">Steps: {steps}</h3>

          {/* Display current actor or movie in the center */}
          <div className="center-card">
            {currentActor && (
              <div className="actor-card">
                <img
                  src={`https://image.tmdb.org/t/p/w300${currentActor.profile_path}`}
                  alt={currentActor.name}
                />
                <h3>{currentActor.name}</h3>
              </div>
            )}
            {currentMovie && (
              <div className="movie-card">
                <img
                  src={`https://image.tmdb.org/t/p/w300${currentMovie.poster_path}`}
                  alt={currentMovie.title}
                />
                <h3>{currentMovie.title}</h3>
              </div>
            )}
          </div>

          {/* Display Next Choices (Movies or Cast) */}
          <h3>Choose a {currentActor ? "movie" : "actor"}:</h3>
          <div className="choices-container">
            {currentActor &&
              currentMovies.map((movie) => (
                <div
                  key={movie.id}
                  className="movie-card"
                  onClick={() => handleMovieClick(movie)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <h3>{movie.title}</h3>
                </div>
              ))}

            {currentMovie &&
              currentCast.map((actor) => (
                <div
                  key={actor.id}
                  className="actor-card"
                  onClick={() => handleActorClick(actor)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                    alt={actor.name}
                  />
                  <h3>{actor.name}</h3>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Game;
