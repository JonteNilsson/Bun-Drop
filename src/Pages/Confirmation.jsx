import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Confirmation() {
  // Tar med formuläret från payment sidan samt priset från varukorgen så det går att displaya
  const location = useLocation();
  const state = location.state;
  const formData = state ? state.formData : {};
  const paymentMethod = formData ? formData.paymentMethod : null;
  const total = state ? state.total : null;
  // Ger en random ETA mellan 15-60 minuter
  const deliveryTime = Math.floor(Math.random() * (60 - 15 + 1)) + 15;
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const clearCart = () => {
    // Sätter varukorgen till tom
    setCart([]);
  };

  // Returnerar till menyn
  const returnToMenu = () => {
    clearCart();
    navigate("/menu");
  };
  return (
    <div>
      {paymentMethod && (
        <div className="wrapper">
          <div className="main-container-big">
            <div className="return-button-container">
              <button className="menu-return-button" onClick={returnToMenu}>
                Return to Menu
              </button>
            </div>
            <h1 className="menu-text">Confirmation</h1>
            <img className="bun-image-menu" src="/Images/BunDrop.png" />
            <div className="middle-payment-container-small">
              <p className="thank-you-text">
                Thank you for ordering with Bun-Drop!
              </p>
              <p className="eta-text">
                Your estimated time of delivery is approximately{" "}
                <strong>{deliveryTime}</strong> minutes.
              </p>
              <div className="payment-details-container">
                <p>Total Price: ${total}</p>
                <p>
                  <strong>-</strong>
                </p>
                <p className="payment-text">
                  Payment Method:{" "}
                  {paymentMethod === "swish" ? "Swish" : "Credit Card"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Confirmation;
