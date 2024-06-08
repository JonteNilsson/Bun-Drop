import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Menu() {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const calculateTotalPrice = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const calculateTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };
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
    : menu; // Om inge  n kategori är vald, visa allt.

  return (
    <>
      <div className="wrapper">
        <div className="main-container-big">
          <h2 className="total-price-text">
            Total Price: ${calculateTotalPrice()}
          </h2>
          <h2 className="total-items-text">{calculateTotalItems()}</h2>
          <img
            onClick={goToCart}
            className="cart-icon"
            src="/Images/shopping-cart.png"
            alt="Cart"
          />
          <span className="tooltip">Go to cart</span>
          <img className="bun-image-menu" src="/Images/BunDrop.png" />
          <h1 className="menu-text">Menu</h1>
          <div className="category-buttons">
            <button onClick={() => handleCategoryClick("burgers")}>
              Burgers
            </button>
            <button onClick={() => handleCategoryClick("sides")}>Sides</button>
            <button onClick={() => handleCategoryClick("desserts")}>
              Desserts
            </button>
            <button onClick={() => handleCategoryClick("drinks")}>
              Drinks
            </button>
            <button onClick={() => handleCategoryClick(null)}>All</button>
          </div>
          <button className="cart-button" onClick={goToCart}>
            Go to Cart
          </button>
          <div className="main-container-small">
            {filteredMenu.map((item) => (
              <div className="item-container" key={item.id}>
                <img src={item.image} className="item-image" alt={item.title} />
                <div className="item-details">
                  <h3 className="item-title">{item.title}</h3>
                  <p className="item-description">{item.description}</p>
                </div>
                <h5 className="item-price">{item.price}$</h5>
                <button
                  className="add-to-cart-button"
                  onClick={() => addToCart(item)}
                >
                  Add to cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Menu;

{
  /* <div>
            <h2>Cart</h2>
            {cart.map((item, index) => (
              <div key={index}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p>{item.price}$</p>
                <hr></hr>
              </div>
            ))}
          </div> */
}
