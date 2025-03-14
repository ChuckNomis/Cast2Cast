import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css"; // Import styles
import logo from "../assets/Small-logo.png";
interface HeaderProps {
  actor1: any;
  actor2: any;
  steps: number;
}
const Header: React.FC<HeaderProps> = ({ actor1, actor2, steps }) => {
  const navigate = useNavigate(); // Enable navigation
  const handleLogoClick = () => {
    navigate("/");
  };
  return (
    <header className="game-header">
      {actor1 && actor2 ? (
        <div className="game-header-container">
          <div className="actor-card left-actor">
            <img
              src={`https://image.tmdb.org/t/p/w300${actor1.profile_path}`}
              alt={actor1.name}
              className="actor-image"
            />
            <div className="actor-title">{actor1.name}</div>
          </div>
          <div className="header-center-container">
            <img
              src={logo}
              alt="Cast2Cast Logo"
              className="top-logo"
              onClick={handleLogoClick}
            />
            <div className="steps-counter">
              <h3>Steps - {steps}</h3>
            </div>
          </div>
          <div className="actor-card right-actor">
            <img
              src={`https://image.tmdb.org/t/p/w300${actor2.profile_path}`}
              alt={actor2.name}
              className="actor-image"
            />
            <div className="actor-title">{actor2.name}</div>
          </div>
        </div>
      ) : (
        <p>Loading actors...</p>
      )}
    </header>
  );
};

export default Header;
