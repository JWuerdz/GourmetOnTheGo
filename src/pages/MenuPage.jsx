import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import TopHeader from "../components/TopHeader.jsx";
import { ItemsContext } from "../context/ItemsContext";
import { motion, useScroll, useTransform } from "framer-motion";
import Tilt from "react-parallax-tilt"; // Updated import
import "./MenuPage.css";

const defaultTiltOptions = {
  tiltMaxAngleX: 15, // Maximum tilt angle on the X-axis
  tiltMaxAngleY: 15, // Maximum tilt angle on the Y-axis
  scale: 1.05,       // Scale effect on hover
  transitionSpeed: 300, // Transition speed in milliseconds
  glareEnable: true, // Enable glare effect
  glareMaxOpacity: 0.5, // Maximum glare opacity
  glarePosition: "all", // Glare position
};

const MenuPage = () => {
  const navigate = useNavigate();
  const { items } = useContext(ItemsContext);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [addedItemId, setAddedItemId] = useState(null);
  const containerRef = useRef(null);

  // Parallax scroll effects
  const { scrollYProgress } = useScroll({ container: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Dynamic gradient background
  const [gradientAngle, setGradientAngle] = useState(135);
  useEffect(() => {
    const interval = setInterval(() => {
      setGradientAngle((prev) => (prev + 0.5) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Add to cart with particle effect
  const handleAddToCart = (item) => {
    let storedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
    const index = storedCart.findIndex((cartItem) => cartItem.id === item.id);
    if (index !== -1) {
      storedCart[index].quantity += 1;
    } else {
      storedCart.push({ ...item, quantity: 1 });
    }
    sessionStorage.setItem("cart", JSON.stringify(storedCart));
    setCart(storedCart);
    setAddedItemId(item.id); // Highlight the added item
    setCartOpen(true); // Open the cart

    // Reset the added item highlight after 1 second
    setTimeout(() => setAddedItemId(null), 1000);
  };

  // Toggle cart open/close
  const toggleCart = () => setCartOpen(!cartOpen);

  return (
      <motion.div
          className="menu-page"
          style={{
            background: `linear-gradient(${gradientAngle}deg, #ff9966, #ff5e62, #d35400)`,
            backgroundSize: "400% 400%",
          }}
      >
        <TopHeader
            cart={cart}
            cartOpen={cartOpen}
            setCartOpen={setCartOpen}
            handleRemoveOne={(itemId) => {
              const storedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
              const updatedCart = storedCart.filter((item) => item.id !== itemId);
              sessionStorage.setItem("cart", JSON.stringify(updatedCart));
              setCart(updatedCart);
            }}
            goToOrderPage={() => navigate("/order")}
        />

        <motion.div className="menu-container" style={{ y }} ref={containerRef}>
          <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
          >
            Our Menu
          </motion.h1>

          <div className="menu-list">
            {items.map((item) => (
                <Tilt
                    key={item.id}
                    tiltMaxAngleX={defaultTiltOptions.tiltMaxAngleX}
                    tiltMaxAngleY={defaultTiltOptions.tiltMaxAngleY}
                    scale={defaultTiltOptions.scale}
                    transitionSpeed={defaultTiltOptions.transitionSpeed}
                    glareEnable={defaultTiltOptions.glareEnable}
                    glareMaxOpacity={defaultTiltOptions.glareMaxOpacity}
                    glarePosition={defaultTiltOptions.glarePosition}
                >
                  <motion.div
                      className={`menu-item ${
                          addedItemId === item.id ? "added-animation" : ""
                      }`}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      whileHover={{ scale: 1.05 }}
                  >
                    <div className="menu-info">
                      <h3 className="food-name">{item.name}</h3>
                      <p className="food-description">{item.description}</p>
                      <div className="price-beam">
                        <span className="food-price">${item.price.toFixed(2)}</span>
                      </div>
                    </div>

                    <motion.button
                        className="add-btn"
                        onClick={(e) => handleAddToCart(item, e)}
                        whileHover={{
                          scale: 1.1,
                          background: "linear-gradient(45deg, #ff5e62, #d35400)",
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                      <span className="btn-shine"></span>
                      <span className="scanline"></span>
                      Add to Order
                    </motion.button>
                  </motion.div>
                </Tilt>
            ))}
          </div>
        </motion.div>

        <motion.button
            className="sticky-cart-btn"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            onClick={toggleCart}
        >
          🛒
          <motion.span key={cart.length} initial={{ scale: 0 }} animate={{ scale: 1 }}>
            {cart.length}
          </motion.span>
        </motion.button>
      </motion.div>
  );
};

export default MenuPage;
