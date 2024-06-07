import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Menu() {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/menu")
      .then((res) => res.json())
      .then((data) => setMenu(data));
  }, []);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const goToCart = () => {
    navigate("/cart", { state: { cart } });
  };

  return (
    <>
      {menu.map((item) => (
        <div className="item" key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <h5>{item.price}$</h5>
          <img src={item.image} className="item-picture" alt={item.title} />
          <button onClick={() => addToCart(item)}>Add to Cart</button>
          <hr></hr>
        </div>
      ))}
      <div>
        <h2>Cart</h2>
        {cart.map((item, index) => (
          <div key={index}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>{item.price}$</p>
            <hr></hr>
          </div>
        ))}
      </div>
      <button onClick={goToCart}>Go to Cart</button>
    </>
  );
}

export default Menu;
