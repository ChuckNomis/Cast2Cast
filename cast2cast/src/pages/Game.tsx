import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchMoviesByActor, fetchCastByMovie } from "../api/tmdb";
import Header from "../components/Header";
import YouDidItPhoto from "../assets/YouDidIt.png";
import "./Game.css";

const Game = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { startActor, targetActor } = location.state || {};
  const [currentActor, setCurrentActor] = useState<any>(startActor);
  const [currentMovies, setCurrentMovies] = useState<any[]>([]);
  const [currentMovie, setCurrentMovie] = useState<any>(null);
  const [currentCast, setCurrentCast] = useState<any[]>([]);
  const [steps, setSteps] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    if (currentActor) {
      fetchMoviesByActor(currentActor.id).then((movies) => {
        setCurrentMovies(movies);
      });
    }
  }, [currentActor]);

  const handleMovieClick = async (movie: any) => {
    setCurrentMovie(movie);
    setCurrentActor(null);
    setCurrentMovies([]);
    const cast = await fetchCastByMovie(movie.id);
    setCurrentCast(cast);
  };

  const handleActorClick = async (actor: any) => {
    setSteps((prevSteps) => prevSteps + 1);

    if (actor.id === targetActor?.id) {
      win();
      return;
    }

    setCurrentActor(actor);
    setCurrentMovie(null);
    setCurrentCast([]);
    const movies = await fetchMoviesByActor(actor.id);
    setCurrentMovies(movies);
  };

  const win = () => {
    setGameWon(true);
  };

  return (
    <div className="game-container">
      <Header actor1={startActor} actor2={targetActor} steps={steps} />
      {gameWon ? (
        <div className="win-popup">
          <img className="ydi-img" src={YouDidItPhoto} alt="YouDidIt-img" />
          <div className="win-text-container">
            You found {targetActor?.name} in {steps} steps!
          </div>
          <div className="win-buttons-container">
            <button className="button" onClick={() => navigate("/Select")}>
              Play Again
            </button>
            <button className="button" onClick={() => navigate("/")}>
              Home
            </button>
          </div>
        </div>
      ) : (
        <>
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

          {/*Separator Line Between Center Card & Movies*/}
          <div className="divider-line"></div>

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
        </>
      )}
    </div>
  );
};

export default Game;
