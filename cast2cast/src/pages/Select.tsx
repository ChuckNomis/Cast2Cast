import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Select.css"; // Import CSS for styling
import logo from "../assets/Small-logo.png";
import arrow from "../assets/Arrow.png";
import RandomActorPhoto from "../assets/RandomActor.png";
import questionMark from "../assets/Questionmark.png";
import { fetchRandomActor, fetchActorById } from "../api/tmdb";

const Select = () => {
  const [startActor, setStartActor] = useState<any>(null);
  const [targetActor, setTargetActor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Enable navigation

  useEffect(() => {
    loadActors();
  }, []);

  // Function to fetch random actors
  const loadActors = async () => {
    setLoading(true);
    let actor1 = await fetchRandomActor();
    let actor2 = await fetchRandomActor();
    while (actor2.id === actor1.id) {
      actor2 = await fetchRandomActor();
    }
    let actor1Data = await fetchActorById(actor1.id);
    let actor2Data = await fetchActorById(actor2.id);
    setStartActor(actor1Data);
    setTargetActor(actor2Data);
    setLoading(false);
  };

  // Reroll actors by fetching new ones
  const handleReroll = () => {
    loadActors();
  };

  // Navigate to Game Page with selected actors
  const handleGoClick = () => {
    if (startActor && targetActor) {
      navigate("/game", { state: { startActor, targetActor } });
    }
  };
  //Function to go back to Home Page
  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="select-container">
      <img
        src={logo}
        alt="Cast2Cast Logo"
        className="top-logo"
        onClick={handleLogoClick}
      />
      {loading ? (
        <div className="selected-actors-container">
          <div className="actor-card">
            <img className="actor-image" src={RandomActorPhoto} />
          </div>
          <img src={arrow} alt="Arrow icon" className="arrow-icon" />
          <div className="actor-card">
            <img className="actor-image" src={RandomActorPhoto} />
          </div>
        </div>
      ) : (
        <div className="selected-actors-container">
          <div className="actor-card">
            <img
              src={`https://image.tmdb.org/t/p/w300${startActor.profile_path}`}
              alt={startActor.name}
              className="actor-image"
            />
            <div className="actor-title">{startActor.name}</div>
          </div>
          <img src={arrow} alt="Arrow icon" className="arrow-icon" />
          <div className="actor-card">
            <img
              src={`https://image.tmdb.org/t/p/w300${targetActor.profile_path}`}
              alt={targetActor.name}
              className="actor-image"
            />
            <div className="actor-title">{targetActor.name}</div>
          </div>
        </div>
      )}

      <div className="button-container">
        {/* GO Button */}
        <button className="button" onClick={handleGoClick}>
          GO
        </button>
        {/* Reroll Button */}
        <button className="button" onClick={handleReroll}>
          Reroll
        </button>
      </div>
    </div>
  );
};

export default Select;
