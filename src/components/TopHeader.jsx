import React from "react";
import { Link } from "react-router-dom";
import "./TopHeader.css";

const TopHeader = ({
                       cart,
                       cartOpen,
                       setCartOpen,
                       handleRemoveOne,
                       goToOrderPage
                   }) => {
    // Calculate subtotal for the cart
    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    // Toggle cart open/close
    const toggleCart = () => {
        setCartOpen(!cartOpen);
    };

    return (
        <header className="top-header">
            <div className="header-left">
                <h2 className="header-logo">Gourmet 2 Go</h2>
            </div>

            <div className="header-right">
                <Link to="/login" className="login-button">Login</Link>

                {/* CART (X) link that toggles the cart popup */}
                <div className="cart-link" onClick={toggleCart}>
                    CART ({cart.length})
                </div>

                {/* CART POPUP (SCSJ style) */}
                <div className={`cart-popup ${cartOpen ? "open" : ""}`}>
                    <h3>CART ({cart.length})</h3>
                    <hr />

                    {cart.length === 0 ? (
                        <p className="empty-cart">Empty Cart</p>
                    ) : (
                        <>
                            <ul className="cart-items-list">
                                {cart.map((item, index) => (
                                    <li key={index} className="cart-item">
                                        <div className="item-info">
                                            <span className="item-name">{item.name}</span>
                                            <span className="item-qty">x{item.quantity}</span>
                                        </div>
                                        <button
                                            className="minus-btn"
                                            onClick={() => handleRemoveOne(item.id)}
                                        >
                                            -
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            <hr />
                            <div className="subtotal">Subtotal: CA${subtotal.toFixed(2)}</div>

                            <button className="checkout-btn" onClick={goToOrderPage}>
                                CHECKOUT
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default TopHeader;
