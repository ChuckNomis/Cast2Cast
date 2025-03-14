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

  // ✅ Load Initial Movies for the First Actor
  useEffect(() => {
    if (currentActor) {
      setLoading(true);
      fetchMoviesByActor(currentActor.id).then((movies) => {
        setCurrentMovies(movies);
        setLoading(false);
      });
    }
  }, [currentActor]);

  // ✅ Handle Movie Click
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

  // ✅ Handle Actor Click
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

  // ✅ Win function (no full reload)
  const win = () => {
    setGameWon(true);
  };

  // ✅ Restart Game Without Reloading
  const restartGame = () => {
    setSteps(0);
    setCurrentActor(startActor);
    setCurrentMovies([]);
    setCurrentMovie(null);
    setCurrentCast([]);
    setGameWon(false);
    setLoading(true);
  };

  return (
    <div className="game-container">
      {/* Header with Steps Counter */}
      <Header actor1={startActor} actor2={targetActor} steps={steps} />

      {/* Centered Actor/Movie Card */}
      <div className="center-card">
        {currentActor && (
          <div className="actor-card center-actor">
            <img
              src={`https://image.tmdb.org/t/p/w300${currentActor.profile_path}`}
              alt={currentActor.name}
              className="actor-image"
            />
            <div className="actor-title">{currentActor.name}</div>
          </div>
        )}
        {currentMovie && (
          <div className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w300${currentMovie.poster_path}`}
              alt={currentMovie.title}
              className="movie-image"
            />
            <div className="movie-title">{currentMovie.title}</div>
          </div>
        )}
      </div>

      {/* Grid Layout for Movie/Actor Choices */}
      <div className="choices-grid">
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
                className="movie-image"
              />
              <div className="movie-title">{movie.title}</div>
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
                className="actor-image"
              />
              <div className="actor-title">{actor.name}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Game;
