import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import TopHeader from "../components/TopHeader.jsx";
import { ItemsContext } from "../context/ItemsContext.jsx";
import { motion, useScroll, useTransform } from "framer-motion";
import Tilt from "react-parallax-tilt";
import "./MenuPage.css";

const defaultTiltOptions = {
  tiltMaxAngleX: 15,
  tiltMaxAngleY: 15,
  scale: 1.05,
  transitionSpeed: 300,
  glareEnable: true,
  glareMaxOpacity: 0.5,
  glarePosition: "all",
};

const MenuPage = () => {
  const navigate = useNavigate();
  const { items } = useContext(ItemsContext);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [addedItemId, setAddedItemId] = useState(null);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({ container: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const [gradientAngle, setGradientAngle] = useState(135);
  useEffect(() => {
    const interval = setInterval(() => {
      setGradientAngle((prev) => (prev + 0.5) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Load cart from sessionStorage (if used)
    const storedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

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
    setAddedItemId(item.id);
    setCartOpen(true);
    setTimeout(() => setAddedItemId(null), 1000);
  };

  const handleRemoveOne = (itemId) => {
    let storedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
    const itemIndex = storedCart.findIndex((item) => item.id === itemId);
    if (itemIndex !== -1) {
      if (storedCart[itemIndex].quantity > 1) {
        storedCart[itemIndex].quantity -= 1;
      } else {
        storedCart.splice(itemIndex, 1);
      }
    }
    sessionStorage.setItem("cart", JSON.stringify(storedCart));
    setCart(storedCart);
  };

  const toggleCart = () => setCartOpen(!cartOpen);

  // Only display non-null items that are not archived
  const visibleItems = items.filter((item) => item && !item.archived);

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
            handleRemoveOne={handleRemoveOne}
            goToOrderPage={() => navigate("/order")}
        />

        <nav className="nav-bar">
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/order">Order</Link>
          <Link to="/login">Login</Link>
          <Link to="/about">About</Link>
          <Link to="/admin">Admin</Link>
        </nav>

        <motion.div className="menu-container" style={{ y }} ref={containerRef}>
          <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
          >
            Our Menu
          </motion.h1>

          <div className="menu-list">
            {visibleItems.map((item) => (
                <Tilt key={item.id} {...defaultTiltOptions}>
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
                        onClick={() => handleAddToCart(item)}
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
            className="sticky-action-btn"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => navigate("/about")}
        >
          About
        </motion.button>

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
