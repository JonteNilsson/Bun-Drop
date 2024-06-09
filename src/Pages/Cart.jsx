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
      <div className="wrapper">
        <div className="main-container-big">
          <h1 className="menu-text">Cart</h1>
          <h2 className="total-price-text">
            Total Price: ${calculateTotalPrice()}
          </h2>
          <div className="return-button-container">
            <button onClick={goToPayment} className="menu-return-button">
              Go to payment
            </button>
          </div>

          <img className="bun-image-menu" src="/Images/BunDrop.png" />
          <div className="middle-main-container-small">
            {cart.length === 0 ? (
              // Kollar om cart är empty
              <p className="empty-cart-text">Your cart is empty</p>
            ) : (
              // Om items finns, displaya
              cart.map((item, index) => (
                <div className="item-container" key={index}>
                  <img
                    src={item.image}
                    className="item-image"
                    alt={item.title}
                  />
                  <div className="item-details">
                    <h3 className="item-title">{item.title}</h3>
                    <p className="item-description">{item.description}</p>
                  </div>
                  <h5 className="item-price">{item.price}$</h5>
                  <p className="item-quantity">Quantity: {item.quantity}</p>
                  <div className="quantity-buttons">
                    <button
                      className="quantity-button"
                      onClick={() => addItem(index)}
                    >
                      +
                    </button>
                    <button
                      className="quantity-button"
                      onClick={() => removeItem(index, item.title)}
                    >
                      -
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
