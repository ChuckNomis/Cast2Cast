import React from "react";

interface HeaderProps {
  actor1: any;
  actor2: any;
}

const Header: React.FC<HeaderProps> = ({ actor1, actor2 }) => {
  return (
    <header
      style={{
        textAlign: "center",
        padding: "20px",
        backgroundColor: "#282c34",
        color: "white",
      }}
    >
      <h1>Actor Connection Game</h1>
      {actor1 && actor2 ? (
        <div>
          <h2>Find a path between:</h2>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <div>
              <h3>{actor1.name}</h3>
              <img
                src={`https://image.tmdb.org/t/p/w200${actor1.profile_path}`}
                alt={actor1.name}
              />
            </div>
            <span style={{ fontSize: "24px", fontWeight: "bold" }}>VS</span>
            <div>
              <h3>{actor2.name}</h3>
              <img
                src={`https://image.tmdb.org/t/p/w200${actor2.profile_path}`}
                alt={actor2.name}
              />
            </div>
          </div>
        </div>
      ) : (
        <p>Loading actors...</p>
      )}
    </header>
  );
};

export default Header;
