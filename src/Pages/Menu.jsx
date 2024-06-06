import React, { useState, useEffect } from "react";

function Menu() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/menu")
      .then((res) => res.json())
      .then((data) => setMenu(data));
  });
  return (
    <>
      {menu.map((item) => (
        <div className="item" key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <h5>{item.price}€</h5>
          <img src={item.image} className="item-picture" alt="Item Picture" />
        </div>
      ))}
    </>
  );
}

export default Menu;
