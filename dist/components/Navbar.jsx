import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="navbar">
            <div className="nav-brand">Gourmet 2 Go</div>
            <div className="nav-links-container">
                <div className={`nav-links ${menuOpen ? "open" : ""}`}>
                    <Link to="/menu" className="nav-button">Menu</Link>
                    <Link to="/order" className="nav-button">Order</Link>
                    <Link to="/login" className="nav-button">Login</Link>
                    <Link to="/admin" className="nav-button">Admin</Link>
                    <Link to="/signup" className="nav-button">Sign Up</Link>
                </div>
                <div className="hamburger" onClick={toggleMenu}>
                    &#9776;
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
