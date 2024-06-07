import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function Cart() {
  const location = useLocation();
  const initialCart = location.state?.cart || [];
  const [cart, setCart] = useState(initialCart);

  // Räknar ut det totala priset och uppdaterar dynamiskt om något skulle tas bort, eller läggas till
  const calculateTotalPrice = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const addItem = (indexToAdd) => {
    setCart(
      cart.map((item, index) =>
        index === indexToAdd ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Function to remove an item from the cart
  const removeItem = (indexToRemove, itemName) => {
    if (cart[indexToRemove].quantity === 1) {
      const confirmRemove = window.confirm(
        `Are you sure you wish to remove ${itemName}?`
      );
      if (!confirmRemove) return; // If user cancels, exit the function
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
      </div>
    </>
  );
}

export default Cart;
