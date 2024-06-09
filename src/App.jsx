import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "@fontsource/roboto";
import Landingscreen from "./Pages/Landingscreen";
import Menu from "./Pages/Menu";
import Cart from "./Pages/Cart";
import Payment from "./Pages/Payment";
import Confirmation from "./Pages/Confirmation";

function App() {
  return (
    <>
      <Router>
        <></>
        <Routes>
          <Route path="/" element={<Landingscreen />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
