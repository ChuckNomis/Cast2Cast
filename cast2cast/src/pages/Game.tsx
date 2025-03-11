import { useEffect, useState } from "react";
import { fetchRandomActor, fetchMoviesByActor } from "../api/tmdb";
import Header from "../components/Header"; // Import the Header component
const Game = () => {
  const [actor1, setActor1] = useState<any>(null);
  const [actor2, setActor2] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadActors = async () => {
      setLoading(true);
      const firstActor = await fetchRandomActor();
      const secondActor = await fetchRandomActor();
      setActor1(firstActor);
      setActor2(secondActor);
      setLoading(false);
    };

    loadActors();
  }, []);

  return (
    <div>
      {/* Use the Header Component and Pass the Actors */}
      <Header actor1={actor1} actor2={actor2} />

      {/* Game Content Goes Here */}
      <main style={{ padding: "20px", textAlign: "center" }}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <p>
            Now, try to find the shortest path between these actors through
            movies!
          </p>
        )}
      </main>
    </div>
  );
};

export default Game;
