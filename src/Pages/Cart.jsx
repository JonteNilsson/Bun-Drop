import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Cart() {
  const location = useLocation();
  const initialCart = location.state?.cart || [];
  const [cart, setCart] = useState(initialCart);
  const navigate = useNavigate();
  // Räknar ut det totala priset och uppdaterar dynamiskt om något skulle tas bort, eller läggas till
  const calculateTotalPrice = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };
  // Lägger till quantity +1 till vald vara
  const addItem = (indexToAdd) => {
    setCart(
      cart.map((item, index) =>
        index === indexToAdd ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Tar bort vald vara från varukorgen
  const removeItem = (indexToRemove, itemName) => {
    // Om varan har quantity 1 och man vill ta bort
    // Displaya ett varnings window för att bekräfta att man vill ta bort.
    if (cart[indexToRemove].quantity === 1) {
      const confirmRemove = window.confirm(
        `Are you sure you wish to remove ${itemName}?`
      );
      // Om exit är valt, behåll varan på 1 quantity
      if (!confirmRemove) return;
    }
    setCart(
      cart
        .map((item, index) =>
          index === indexToRemove
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Navigera till payment sidan och för med varukorgen dit.
  const goToPayment = () => {
    navigate("/payment", { state: { cart } });
  };

  return (
    <>
      {cart.length === 0 ? (
        // Kollar om cart är empty
        <p>Your cart is empty</p>
      ) : (
        // Om items finns, displaya
        cart.map((item, index) => (
          <div key={index}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>{item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => addItem(index)}>+</button>
            <button onClick={() => removeItem(index, item.title)}>-</button>
            <hr></hr>
          </div>
        ))
      )}
      <div>
        <h2>Total Price: ${calculateTotalPrice()}</h2>
        <button onClick={goToPayment}>Go to Payment</button>{" "}
      </div>
    </>
  );
}

export default Cart;
