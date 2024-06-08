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
      <h2>Confirmation</h2>
      {paymentMethod && (
        <div>
          <p>Thank you for ordering with Bun-Drop!</p>
          <p>
            Your estimated time of delivery is approximately {deliveryTime}{" "}
            minutes.
          </p>
          <p>Total Price: ${total}</p>
          <p>
            Payment Method:{" "}
            {paymentMethod === "swish" ? "Swish" : "Credit Card"}
          </p>
          <button onClick={returnToMenu}>Return to Menu</button>
        </div>
      )}
    </div>
  );
}

export default Confirmation;
