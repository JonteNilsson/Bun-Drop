import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
  function goToMenu() {
    navigate("/menu");
  }

  return (
    <>
      <div className="wrapper">
        <div className="main-container">
          <div className="landing-text">
            <h2>Bun Drop</h2>
            <h2>Drone-Delivered</h2>
            <h2>Delights at Your</h2>
            <h2>Doorstep!</h2>
          </div>
          <button onClick={goToMenu} className="menu-button">
            Menu
          </button>
          <div>
            <img src="/Images/BunDrop.png" className="bun-image" />
          </div>
        </div>
        <div className="icon-container">
          <img className="icons" src="/Images/french-fries.png" />
          <img className="icons" src="/Images/hamburger.png" />
          <img className="icons" src="/Images/milkshake.png" />
          <img className="icons" src="/Images/onion-ring.png" />
        </div>
      </div>
    </>
  );
}

export default LandingPage;
