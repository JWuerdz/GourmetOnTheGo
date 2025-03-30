// src/pages/OrderPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./OrderPage.css";

const OrderPage = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load the cart from sessionStorage when the page loads
    const storedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Clear Order Button Handler
  const handleClearCart = () => {
    sessionStorage.removeItem("cart");
    setCart([]);
  };

  // Decrement or remove an item in the cart
  const handleRemoveOne = (itemId) => {
    const storedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
    const index = storedCart.findIndex((cartItem) => cartItem.id === itemId);

    if (index !== -1) {
      if (storedCart[index].quantity > 1) {
        storedCart[index].quantity -= 1;
      } else {
        storedCart.splice(index, 1);
      }
      sessionStorage.setItem("cart", JSON.stringify(storedCart));
      setCart(storedCart);
    }
  };

  // Calculate subtotal
  const subtotal = cart.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
  );

  // Checkout Button Handler (creates order in Supabase)
  const handleCheckout = async () => {
    try {
      // 1) Make a POST request to your createOrder Netlify function
      const response = await fetch("/.netlify/functions/createOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart,
          // userId: 1, // Optionally pass a userId if needed
        }),
      });

      // 2) Check if request succeeded
      if (!response.ok) {
        throw new Error("Failed to create order in database");
      }

      const data = await response.json();
      console.log("Order created:", data);

      // 3) Clear the cart & show success or navigate
      sessionStorage.removeItem("cart");
      setCart([]);
      alert("Order placed successfully!");
      // navigate("/thank-you"); // if you have a thank-you page
    } catch (error) {
      console.error(error);
      alert("Error creating order. Please try again.");
    }
  };

  return (
      <div className="order-container">
        <h1>Your Order</h1>
        {cart.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty.</p>
              <button className="back-to-menu-btn" onClick={() => navigate("/menu")}>
                Back to Menu
              </button>
            </div>
        ) : (
            <>
              <div className="order-list">
                {cart.map((item, index) => (
                    <div key={index} className="order-item">
                      <div className="item-info">
                  <span className="food-name">
                    {item.name} (x{item.quantity || 1})
                  </span>
                        <span className="food-price">
                    ${(item.price * (item.quantity || 1)).toFixed(2)}
                  </span>
                      </div>
                      <button className="minus-btn" onClick={() => handleRemoveOne(item.id)}>
                        -
                      </button>
                    </div>
                ))}
              </div>

              <div className="subtotal">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="button-group">
                <button className="clear-order-btn" onClick={handleClearCart}>
                  Clear Order
                </button>
                <button className="checkout-btn" onClick={handleCheckout}>
                  Checkout
                </button>
              </div>

              <button className="back-to-menu-btn" onClick={() => navigate("/menu")}>
                Back to Menu
              </button>
            </>
        )}
      </div>
  );
};

export default OrderPage;
