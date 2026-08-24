/*  
    StreamList App
    Stephen Foster
    The University of Arizona Global Campus
    INT499: Capstone for Information Technology
    Professor Amine Dehmani
    August 10, 2026
*/
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Cart from "./pages/Cart";
import About from "./pages/About";
import { useEffect, useState } from "react";
import Shop from "./components/Shop";
import "./App.css";

function App() {
  
  const [cart, setCart] = useState(() => {
  const savedCart = localStorage.getItem("streamListCart");

  return savedCart
    ? JSON.parse(savedCart)
    : [];
});
useEffect(() => {
  localStorage.setItem(
    "streamListCart",
    JSON.stringify(cart)
  );
}, [cart]);
  const handleChange = (item, change) => {
    setCart((currentCart) =>
      currentCart.map((cartItem) =>
        cartItem.id === item.id
          ? {
              ...cartItem,
              amount: Math.max(
                1,
                cartItem.amount + change
              )
            }
          : cartItem
      )
    );
  };
  const handleClick = (item) => {
  const isSubscription = item.id <= 4;

  const subscriptionInCart = cart.some(
    (cartItem) => cartItem.id <= 4
  );

  const itemExists = cart.some(
    (cartItem) => cartItem.id === item.id
  );

  // Only one subscription of any type is allowed
  if (isSubscription && subscriptionInCart) {
    alert(
      "Only one subscription plan can be added to your cart at a time."
    );
    return;
  }

  // Prevent duplicate merchandise
  if (itemExists) {
    alert(
      "This item is already in your cart. You can adjust the quantity in the Cart."
    );
    return;
  }

  setCart([
    ...cart,
    {
      ...item,
      amount: 1
    }
  ]);
};

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route
              path="/cart"
              element={
                <Cart
                  cart={cart}
                  setCart={setCart}
                  handleChange={handleChange}
              />
            }
          />
            <Route path="/about" element={<About />} />
            <Route
              path="/shop"
              element={
                <Shop
                  handleClick={handleClick}
              />
            }
          />
          </Routes>
        </main>

        <footer className="footer">
          <p>© 2026 StreamList. All rights reserved.</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
