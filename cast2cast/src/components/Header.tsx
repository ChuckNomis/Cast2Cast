import React from "react";
import "./Header.css"; // Import styles

interface HeaderProps {
  actor1: any;
  actor2: any;
}

const Header: React.FC<HeaderProps> = ({ actor1, actor2 }) => {
  return (
    <header className="game-header">
      {actor1 && actor2 ? (
        <div className="game-header-container">
          <div className="actor-card">
            <img
              src={`https://image.tmdb.org/t/p/w200${actor1.profile_path}`}
              alt={actor1.name}
            />
            <h3>{actor1.name}</h3>
          </div>
          <span className="arrow">➡</span>
          <div className="actor-card">
            <img
              src={`https://image.tmdb.org/t/p/w200${actor2.profile_path}`}
              alt={actor2.name}
            />
            <h3>{actor2.name}</h3>
          </div>
        </div>
      ) : (
        <p>Loading actors...</p>
      )}
    </header>
  );
};

export default Header;
