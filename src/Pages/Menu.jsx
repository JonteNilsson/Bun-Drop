import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Menu() {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetchar "databas" från db.json
  useEffect(() => {
    fetch("http://localhost:3000/menu")
      .then((res) => res.json())
      .then((data) => setMenu(data));
  }, []);

  // Lägger till vald vara i varukorgen och ger den en quantity
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
  // Navigera till varukorgen
  const goToCart = () => {
    navigate("/cart", { state: { cart } });
  };
  // Hanterar filtrerings klick
  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  // Filtrerar menyn beroende på vald katerogi
  const filteredMenu = selectedCategory
    ? menu.filter((item) => item.category === selectedCategory)
    : menu; // Om ingen kategori är vald, visa allt.

  return (
    <>
      <div>
        <button onClick={() => handleCategoryClick("burgers")}>Burgers</button>
        <button onClick={() => handleCategoryClick("sides")}>Sides</button>
        <button onClick={() => handleCategoryClick("desserts")}>
          Desserts
        </button>
        <button onClick={() => handleCategoryClick("drinks")}>Drinks</button>
        <button onClick={() => handleCategoryClick(null)}>All</button>
      </div>
      {filteredMenu.map((item) => (
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
