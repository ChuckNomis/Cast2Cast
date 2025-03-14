import { useNavigate } from "react-router-dom";
import "./Home.css"; // Import CSS for styling
import logo from "../assets/Big-logo.png";
import settingsIcon from "../assets/settings.png";

const Home = () => {
  const navigate = useNavigate(); // Enables navigation

  return (
    <div className="home-container">
      {/* Game Logo */}
      <img src={logo} alt="Cast2Cast Logo" className="home-logo" />
      <div className="home-container-buttons">
        {/* Start Button */}
        <button className="button" onClick={() => navigate("/Select")}>
          START
        </button>
        {/* Settings Button */}
        <img src={settingsIcon} alt="Settings" className="settings-button" />
      </div>
    </div>
  );
};

export default Home;
